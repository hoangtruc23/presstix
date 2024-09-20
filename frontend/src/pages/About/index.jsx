
import "./about.scss"
import img1 from "../../assets/img/about.jpg"
function About() {
  return (
    <div className="container-about">
      <h1>About Us</h1>
      <div className="content">
        <div className="content-left">
          <h1>Hi, Were PressTix.</h1>
          <p>Sometimes simple works best. Like Wild One—a brand dedicated to making pet products—which offers a clear and straightforward
             approach to what it does, who it does it for, and what problem it solves. </p>
        </div>
        <div className="content-right">
          <img src={img1}></img>
        </div>
      </div>
    </div>
  )
}

export default About