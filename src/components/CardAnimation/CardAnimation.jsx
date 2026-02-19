import { useEffect, useState } from "react";
import "./CardAnimation.css";

import Apicture from "../../assets/HeroAnimation/Apicture.png";
import Bpicture from "../../assets/HeroAnimation/Bpicture.png";
import Cpicture from "../../assets/HeroAnimation/Cpicture.png";
import Dpicture from "../../assets/HeroAnimation/Dpicture.png";
import Epicture from "../../assets/HeroAnimation/Epicture.png";
import Fpicture from "../../assets/HeroAnimation/Fpicture.png";
import Gpicture from "../../assets/HeroAnimation/Gpicture.png";
import pinkHeart from "../../assets/HeroAnimation/pinkHeart.svg";
import yellowHeart from "../../assets/HeroAnimation/yellowHeart.svg";

const topRow = [
  { img: Gpicture, title: "College" },
  { img: Bpicture, title: "With Maxie" },
  { img: Dpicture, title: "Bikers" },
  { img: Fpicture, title: "Besties" },
];
const bottomRow = [
  { img: Apicture, title: "Team" },
  { img: Cpicture, title: "Hiking" },
  { img: Epicture, title: "Childhood" },
];

export default function CardAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const durations = [1500, 1200, 1200, 1200, 1200, 1200, 1200];
    let timeout;
    let cancelled = false;

    const runPhase = (currentPhase) => {
      if (cancelled) return;
      if (currentPhase > 6) {
        timeout = setTimeout(() => runPhase(0), 800);
        return;
      }
      setPhase(currentPhase);
      timeout = setTimeout(
        () => runPhase(currentPhase + 1),
        durations[currentPhase],
      );
    };

    runPhase(0);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  const getCardClass = (row, index, title) => {
    let cls = "ca__card";

    if (phase >= 1) {
      const isEven = index % 2 === 0;
      cls += isEven ? " ca__card--rotate-left" : " ca__card--rotate-right";

      if (title === "Bikers") {
        cls += " ca__card--translate-center";
      }
    }

    if (phase >= 4) {
      const isEven = index % 2 === 0;
      cls = cls.replace("ca__card--rotate-left", "ca__card--rotate-right");
      cls = cls.replace("ca__card--rotate-right", "ca__card--rotate-left");
    }

    if (phase >= 5) {
      cls +=
        row === "top" ? " ca__card--spread-top" : " ca__card--spread-bottom";
      cls +=
        index % 2 === 0 ? " ca__card--spread-left" : " ca__card--spread-right";
    }

    if (phase >= 6) {
      cls = "ca__card ca__card--return";
    }

    return cls;
  };

  return (
    <div className="ca">
      <div className="ca__grid">
        <div className="ca__row ca__row--top">
          {topRow.map((card, i) => (
            <div
              key={`top-${i}`}
              className={getCardClass("top", i, card.title)}
            >
              <img src={card.img} alt={card.title} className="ca__card-img" />
              <span className="ca__card-title">{card.title}</span>
              {card.title === "With Maxie" && (
                <img
                  src={pinkHeart}
                  alt=""
                  className={`ca__heart-on-card ca__heart-on-card--left ${
                    phase >= 2 ? "ca__heart-on-card--visible" : ""
                  } ${phase >= 3 ? "ca__heart-on-card--hidden" : ""}`}
                />
              )}
              {card.title === "College" && (
                <img
                  src={yellowHeart}
                  alt=""
                  className={`ca__heart-on-card ca__heart-on-card--bottom-left ${
                    phase >= 3 ? "ca__heart-on-card--visible" : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="ca__row ca__row--bottom">
          {bottomRow.map((card, i) => (
            <div
              key={`bot-${i}`}
              className={getCardClass("bottom", i, card.title)}
            >
              <img src={card.img} alt={card.title} className="ca__card-img" />
              <span className="ca__card-title">{card.title}</span>
              {card.title === "Childhood" && (
                <img
                  src={pinkHeart}
                  alt=""
                  className={`ca__heart-on-card ca__heart-on-card--corner ${
                    phase >= 2 ? "ca__heart-on-card--visible" : ""
                  } ${phase >= 3 ? "ca__heart-on-card--hidden" : ""}`}
                />
              )}
              {card.title === "Childhood" && (
                <img
                  src={yellowHeart}
                  alt=""
                  className={`ca__heart-on-card ca__heart-on-card--top-left ${
                    phase >= 3 ? "ca__heart-on-card--visible" : ""
                  }`}
                />
              )}
              {card.title === "Childhood" && (
                <img
                  src={yellowHeart}
                  alt=""
                  className={`ca__heart-on-card ca__heart-on-card--bottom-right ${
                    phase >= 3 ? "ca__heart-on-card--visible" : ""
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
