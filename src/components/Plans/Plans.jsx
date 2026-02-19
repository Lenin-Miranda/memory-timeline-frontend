import "./Plans.css";
import CardAnimation from "../CardAnimation/CardAnimation";
import computer from "../../assets/computer.png";
import logo from "../../assets/logoGBG.png";

export default function Plans() {
  return (
    <section className="plans">
      <div className="plans__container">
        <div className="plans__image-wrapper">
          <CardAnimation />
          <p className="plans__subtitle">Every Memory Has a Story</p>
          <img src={computer} alt="Computer" className="plans__container-img" />
        </div>
      </div>
    </section>
  );
}
