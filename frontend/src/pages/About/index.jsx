import img1 from "../../assets/img/about.jpg";

function About() {
  const members = [
    {
      name: 'Hoàng Bảo Trúc',
      position: 'Backend Developer',
    },
    {
      name: 'Hoàng Hạnh Nhân',
      position: 'Frontend Developer',
    },
    {
      name: 'Nguyễn Thị Huỳnh Nghi',
      position: 'Frontend Developer',
    }
  ];

  return (
    <div className="container my-36 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-blue-500">Giới thiệu</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Hi, Chúng tôi là PressTix.</h2>
        <p className="text-lg text-gray-600 leading-relaxed mx-auto ">
          PressTix hy vọng mang đến cho mọi người một website thân thiện, có thể mua vé dễ dàng và tiện lợi. <br />
          Đồng thời cũng giúp các ban tổ chức nhỏ lẻ có thể quản lý sự kiện của mình dễ dàng và linh hoạt hơn
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <div key={index} className="member-card relative group">
            <div className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 transform group-hover:scale-105">
              <img
                src={img1}
                alt={member.name}
                className="w-full h-[250px] object-cover rounded-xl"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-md font-semibold text-gray-300">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;