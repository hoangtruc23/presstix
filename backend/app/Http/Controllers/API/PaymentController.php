<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Transaction;
use Carbon\Carbon;


class PaymentController extends Controller
{
    private $apiKey = 'AK_CS.fa2b0d609a6311ef95d2df3b370b378f.fhrE5CYrxuhhOQTXXecUC9kkfHYnSXHgs0brzTIXSzRt463VQ6clTxzHoPfs7zkF0AnlcDn9';
    private $secureToken = 'CHUA-CO-KEY';

    protected $expirationDate;



    public function handleTransation($transation_id = null)
    {
        $curl = curl_init();

        if ($transation_id) {
            $url = "https://oauth.casso.vn/v2/transactions/{$transation_id}";
        } else {
            $url = "https://oauth.casso.vn/v2/transactions?page=1&pageSize=20";
        }

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Authorization: Apikey {$this->apiKey}",
                "Content-Type: application/json"
            ),
        ));

        $response = curl_exec($curl);
        Log::info('API response: ' . $response);

        $err = curl_error($curl);

        curl_close($curl);

        // Kiểm tra lỗi và trả về phản hồi
        if ($err) {
            return response()->json([
                'code' => 500,
                'message' => 'cURL Error: ' . $err,
            ], 500);
        }
        return response()->json(json_decode($response), 200);
    }

    // WEBHOOK để Casso có thể gửi giao dịch qua khi có giao dịch mới 
    public function handleBankTransfer(Request $request)
    {
        try {
            // Khởi tạo cURL
            $curl = curl_init();
            $url = "https://oauth.casso.vn/v2/transactions?page=1&pageSize=1&sort=DESC";

            // Cấu hình cURL
            curl_setopt_array($curl, array(
                CURLOPT_URL => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_HTTPHEADER => array(
                    "Authorization: Apikey {$this->apiKey}",
                    "Content-Type: application/json"
                ),
            ));

            // Thực hiện yêu cầu cURL
            $response = curl_exec($curl);
            Log::info('API response: ' . $response);

            // Kiểm tra lỗi cURL
            if ($err = curl_error($curl)) {
                curl_close($curl);
                return response()->json([
                    'code' => 500,
                    'message' => 'cURL Error: ' . $err,
                ], 500);
            }

            // Đóng cURL
            curl_close($curl);

            // Giải mã phản hồi JSON
            $responseData = json_decode($response, true);

            // Kiểm tra dữ liệu giao dịch
            if (isset($responseData['data']['records']) && count($responseData['data']['records']) > 0) {
                $latestTransaction = $responseData['data']['records'][0];

                if (isset($latestTransaction['amount']) && isset($latestTransaction['description'])) {
                    $transactionID = $latestTransaction['id'];
                    $transactionAmount = $latestTransaction['amount'];
                    $transactionDesc = $latestTransaction['description'];
                    $transactionDate = $latestTransaction['when'];
                    $invoiceID = null;

                    $exitsTransaction = Transaction::where('transaction_id', $transactionID)->first();

                    if (!$exitsTransaction) {
                        $transaction = new Transaction();
                        $transaction->transaction_id = $transactionID;
                        $transaction->amount = $transactionAmount;
                        $transaction->description = $transactionDesc;
                        $transaction->date = $transactionDate;
                        $transaction->save();


                        $contentIdentifier = substr($transactionDesc, strrpos($transactionDesc, 'InvoicesTicket'));

                        Log::info('description Identifier: ' . $contentIdentifier);

                        $invoice = Invoice::where('amount', $transactionAmount)
                            ->where('description', 'like', '%' . $contentIdentifier . '%')
                            ->where('status', 'pending')
                            ->first();

                        Log::info('Invoice Found: ', ['invoice' => $invoice]);

                        if ($invoice) {
                            $invoiceID =  $invoice->id;
                            $invoice->status = 'success';
                            $invoice->transaction_id = $transactionID;
                            $invoice->save();

                            $transaction->invoice_id = $invoiceID;
                            $transaction->save();
                        } else {
                            Log::error('Không tìm thấy Invoice với các điều kiện tìm kiếm', [
                                'amount' => $transactionAmount,
                                'description' => $transactionDesc,
                                'status' => 'pending',
                            ]);
                        }
                    } else {
                        $invoiceID = $exitsTransaction->invoice_id;
                    }

                    return response()->json([
                        'code' => 200,
                        'message' => 'Thành toán thành công',
                        'status' => 'success',
                        'data' => [
                            'transaction_id' =>  $transactionID,
                            'amount' => $transactionAmount,
                            'desc' => $transactionDesc,
                            'invoice_id' => $invoiceID,
                        ],
                    ], 200);
                }
            }
            return response()->json([
                'code' => 404,
                'message' => 'No successful transactions found',
            ], 404);
        } catch (\Exception $error) {
            return response()->json([
                'code' => 500,
                'message' => 'Internal Server Error',
                'error' => $error->getMessage(),
            ], 500);
        }
    }


    public function sync(Request $request)
    {
        // Khởi tạo cURL
        $curl = curl_init();

        // Dữ liệu để đồng bộ tài khoản ngân hàng
        $data = [
            'bank_acc_id' => $request->input('bank_acc_id'),
        ];
        $postdata = json_encode($data);

        // API Key hoặc Access Token
        $apiKey = 'AK_CS.fa2b0d609a6311ef95d2df3b370b378f.fhrE5CYrxuhhOQTXXecUC9kkfHYnSXHgs0brzTIXSzRt463VQ6clTxzHoPfs7zkF0AnlcDn9';

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://oauth.casso.vn/v2/sync",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $postdata,
            CURLOPT_HTTPHEADER => array(
                "Authorization: Apikey $apiKey",
                "Content-Type: application/json"
            ),
        ));

        // Thực hiện cURL
        $response = curl_exec($curl);
        $err = curl_error($curl);

        // Đóng cURL
        curl_close($curl);

        // Kiểm tra lỗi
        if ($err) {
            return response()->json(['error' => "cURL Error #: $err"], 500);
        } else {
            return response()->json(['response' => $response]);
        }
    }
}
