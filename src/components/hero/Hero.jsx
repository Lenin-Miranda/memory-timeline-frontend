import { useState, useEffect } from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <p className="hero__subtitle">
          A private, intentional friendship memory creation.... Not for public
          posting. Not for performance. Just for friendship.
        </p>
      </div>
      <div className="hero__container">
        <div className="hero__container-content">
          <h1 className="hero__container-content-title">
            CREATE YOUR OWN MEMORY LANE
          </h1>
        </div>
        <div className="hero__container-content">
          <div className="hero__image-container">
            <img className="hero__container-content-image" />
          </div>
          <p className="hero__container-content-description">
            Every Memory Has a Story
          </p>
        </div>
      </div>
    </section>
  );
}
