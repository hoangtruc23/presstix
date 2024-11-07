import host from '../../assets/img/Host.webp';

function HostEvent() {
    const info_host = [
        {
            name: 'VieOn',
        },
    ];

    return (
        <div className="flex justify-center gap-3 flex-wrap">
            {info_host.map((item, index) => (
                <div key={index} className="w-full mx-auto">
                    <h2 className="font-semibold">Ban Tổ Chức</h2>
                    <div className="flex flex-col md:flex-row gap-5 mt-4">
                        <div className="w-full md:w-[20%]">
                            <img src={host} alt="Host Event" className="w-[80%] h-[80%] rounded-lg object-cover" />
                        </div>
                        <div className="w-full md:w-[50%]">
                            <h4 className="font-semibold md:text-left">{item.name}</h4>
                            <div className="flex flex-col md:flex-row gap-2 mt-2">
                                <button className="btn btn-primary w-full md:w-[25%]">Liên hệ</button>
                                <button className="btn btn-primary w-full md:w-[25%]">Theo dõi</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default HostEvent;
