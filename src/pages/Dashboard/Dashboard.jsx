import { useState, useEffect } from "react";
import "./Dashboard.css";
import test from "../../assets/cardtest.png";

export default function Dashboard() {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      id: 1,
      date: "14th June 2024",
      description: "School Get-together",
      image: test,
    },
    {
      id: 2,
      date: "20th July 2024",
      description: "Beach Vacation",
      image: test,
    },
    {
      id: 3,
      date: "5th August 2024",
      description: "Birthday Party",
      image: test,
    },
    {
      id: 4,
      date: "12th September 2024",
      description: "Concert Night",
      image: test,
    },
    {
      id: 5,
      date: "25th October 2024",
      description: "Hiking Trip",
      image: test,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [cards.length]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__container-views">
          <div className="dashboard__container-views-content">
            <p className="dashboard__container-views-content-title">
              Your Friendship Lines
            </p>
          </div>
        </div>

        <div className="dashboard__container-carousel">
          <div className="dashboard__container-cards-wrapper">
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={prevCard}
              aria-label="Previous card"
            >
              <span className="carousel-btn-icon">‹</span>
            </button>

            <div className="dashboard__container-cards-track">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className={`dashboard__container-cards ${
                    index >= currentCard && index < currentCard + 2
                      ? "active"
                      : ""
                  }`}
                  style={{
                    transform: `translateX(${(index - currentCard) * 50}%)`,
                  }}
                >
                  <div className="dashboard__container-card">
                    <p className="dashboard__container-card-date">
                      {card.date}
                    </p>
                    <img
                      className="dashboard__container-card-img"
                      src={card.image}
                      alt="memory"
                    />
                  </div>
                  <p className="dashboard__container-card-description">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="carousel-btn carousel-btn-next"
              onClick={nextCard}
              aria-label="Next card"
            >
              <span className="carousel-btn-icon">›</span>
            </button>
          </div>

          <div className="carousel-indicators">
            {cards.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentCard ? "active" : ""}`}
                onClick={() => setCurrentCard(index)}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button className="dashboard__container-button">Add Timeline</button>
      </div>
    </section>
  );
}
