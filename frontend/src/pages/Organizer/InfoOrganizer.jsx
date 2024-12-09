import { useEffect, useState } from "react";
import { getUploadWallet, postInfoOrganizer } from "../../services/apiService";
import OrganizerSetup from '../../components/Organizer/OrganizerSetup';
import { Button } from 'react-bootstrap';
import ModalWithDraw from "../../components/Modals/ModalWithDraw";
import { formatPrice } from '../../assets/js/main.js';

function InfoOrganizer() {
    const [imageLogo, setImageLogo] = useState(null);
    const [formData, setFormData] = useState({
        wallet: '',
        image_url: '',
        name: '',
        description: '',
        bank: '',
        account_name: '',
        account_number: '',
    });

    const fetchInfoOrganizer = async () => {
        try {
            const res = await postInfoOrganizer();

            setFormData(res.data.organizer);
            if (res.data.image_url) {
                setImageLogo(res.data.organizer.image_url);
            }

        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
        }
    }

    const fetchUpdateWallet = async () => {
        try {
            await getUploadWallet();
        } catch (error) {
            console.error('Lỗi wallet', error);
        }
    }

    useEffect(() => {
        fetchInfoOrganizer();
        fetchUpdateWallet();
    }, [formData.wallet]);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="flex flex-wrap justify-between gap-8">

                <div className="flex-1 min-w-[300px]">
                    <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Thông tin ban tổ chức</h3>
                    <OrganizerSetup imageLogo={imageLogo} formData={formData} setFormData={setFormData} />
                </div>

                <div className="flex-1 min-w-[300px]">
                    <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Ví</h3>
                    <div className="max-w-lg mx-auto p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
                        <div className="text-xl font-medium text-gray-700">Tổng tiền: </div>
                        <div className="d-flex justify-between">
                            <div className="text-2xl font-bold text-blue-500">{formatPrice(formData.wallet)}</div>
                            <Button variant="danger" onClick={handleShow}>
                                Rút tiền
                            </Button>
                        </div>
                    </div>

                    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-white">
                        <div className="mb-4">
                            <label htmlFor="bank" className="block text-sm font-medium text-gray-700">Ngân hàng</label>
                            <input
                                type="text"
                                id="bank"
                                value={formData.bank}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="account_name" className="block text-sm font-medium text-gray-700">Tên tài khoản</label>
                            <input
                                type="text"
                                id="account_name"
                                value={formData.account_name}

                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="numbber_account" className="block text-sm font-medium text-gray-700">Số tài khoản</label>
                            <input
                                type="number"
                                id="numbber_account"
                                value={formData.account_number}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button className='btn bg-primary text-white'>Cập nhật</button>
                    </div>

                    <ModalWithDraw
                        bank={formData.bank}
                        account_name={formData.account_name}
                        account_number={formData.account_number}
                        totalWallet={formData.wallet} show={show} handleClose={handleClose} />
                </div>


            </div >
        </>
    );
}

export default InfoOrganizer;