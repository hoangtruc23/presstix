<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class CassoService
{
    protected $apiKey;

    public function __construct()
    {
        // Lấy API key từ file .env
        $this->apiKey = env('CASSO_API_KEY');
    }

    public function getTransactions($fromDate = '2024-03-19', $page = 4, $pageSize = 20, $sort = 'ASC')
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://oauth.casso.vn/v2/transactions?fromDate={$fromDate}&page={$page}&pageSize={$pageSize}&sort={$sort}",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Authorization: Apikey {$this->apiKey}",
                "Content-Type: application/json"
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            // Ghi log lỗi
            Log::error("cURL Error #:" . $err);
            return null;
        } else {
            return json_decode($response, true);
        }
    }
}