
// import "./about.scss"
import img1 from "../../assets/img/about.jpg"
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
  ]
  return (
    <div className="container my-36">


      <div className="d-flex gap-5">
        <div className="w-[35%]">
          <h1>About Us</h1>
          <h1>Hi, Were PressTix.</h1>
          <p>Sometimes simple works best. Like Wild One—a brand dedicated to making pet products—which offers a clear and straightforward
            approach to what it does, who it does it for, and what problem it solves. </p>
        </div>

        <div className="d-flex gap-5">
          {members.map((member, index) => (
            <div key={index} className="member-card">
              <img src={img1} className='w-[400px] h-[350px] rounded-2xl'></img>
              <h3 className='mb-1'>{member.name}</h3>
              <p className='font-semibold'>{member.position}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default About