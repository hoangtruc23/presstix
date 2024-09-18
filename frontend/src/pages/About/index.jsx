
import "./about.scss"
import img1 from "../../assets/img/about.jpg"
function About() {
  return (
    <div class="container-about">
      <h1>About Us</h1>
      <div class="content">
        <div class="content-left">
          <h1>Hi, We're PressTix.</h1>
          <p>Sometimes simple works best. Like Wild One—a brand dedicated to making pet products—which offers a clear and straightforward
             approach to what it does, who it does it for, and what problem it solves. </p>
        </div>
        <div class="content-right">
          <img src={img1}></img>
        </div>
      </div>
    </div>
  )
}

export default About