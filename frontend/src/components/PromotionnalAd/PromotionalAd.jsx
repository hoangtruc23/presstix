import React from 'react';
import promo from '../../assets/img/ticket.png';
import './PromotionalAd.scss';
function PromotionalAd() {
    const info_promotional = [
        {
            title: 'SĂN VÉ MƯỢT MÀ, ƯU ĐÃI THẢ GA',
            picProArray: [
                promo,
                promo,
                promo,
            ],
            note: (
                <span className="note">
                    Khi thanh toán (mua vé) trên
                    <a href="https://presstix.vn" className="text-red-500 font-bold hover:underline inline mx-1">Ứng dụng PressTix</a>
                    hoặc
                    <a href="https://presstix.vn" className="text-blue-500 hover:underline inline mx-1">PressTix.vn</a>
                    bằng ví ShoppePay.
                </span>
            ),
        },
    ];

    return (
        <div className="promotional-ad">
            {info_promotional.map((item, index) => (
                <div key={index} className="w-full">
                    <div className="mt-4">
                        <div className="w-full">
                            <h3 className="title">{item.title}</h3>
                            <div className="img-container">
                                {item.picProArray.map((pic, index) => (
                                    <img key={index} src={pic} alt={`Promotional ${index + 1}`} />
                                ))}
                            </div>
                            <p className="note">{item.note}</p>
                            <div className="button-container">
                                <button className="btn-primary">
                                    GET CODE NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PromotionalAd;
