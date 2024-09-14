
function InforEvent() {
    const info_ticket = [
        {
            title: `LỢI ÍCH ĐẶT MUA TRƯỚC ALBUM MỚI "ALL THE BEST" (400k). <br/>
                    Tham gia buổi chụp hình 1:1 cùng Sungha Jung và những lợi ích khác. <br />
                    Xem chi tiết và đặt mua tại ĐÂY`,
        },
    ];

    return (
        <div className="flex justify-center gap-4 flex-wrap p-4 rounded-lg">
            {info_ticket.map((item, index) => (
                <div key={index} className="w-full">
                    <h1 className="text-xl font-bold mt-4">Introduce</h1>
                    <hr className="my-2" />
                    <div className="mt-4">
                        <div className="w-full">
                            <h3 className="text-lg" dangerouslySetInnerHTML={{ __html: item.title }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InforEvent;
