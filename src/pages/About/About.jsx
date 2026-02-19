import "./About.css";
import about from "../../assets/about/about.png";
export default function About() {
  return (
    <section className="about">
      <p className="about__title">
        A private, intentional friendship memory app Not for public posting. Not
        for performance. Just for friendship.
      </p>
      <div className="about__container">
        <div className="about__text-container">
          <p className="about__text">
            At MemoryLane, we believe the most meaningful moments in life aren’t
            the ones broadcasted to everyone — they’re the ones shared quietly
            between people who truly matter.
          </p>
          <p className="about__text">
            In a world designed for public feeds and endless scrolling, we
            wanted to create something more intimate. A space where friendships
            can be documented, celebrated, and revisited without pressure or
            performance.
          </p>
          <p className="about__text">
            MemoryLane is a private digital scrapbook built for close
            connections. Whether it’s a spontaneous road trip, a late-night
            conversation, or a birthday that meant everything — we help you
            preserve the moments that shape your story together.
            <br /> Because friendships aren’t timelines for the world. They’re
            journeys meant to be cherished.
          </p>
        </div>
        <img src={about} alt="About" className="about__image" />
      </div>
    </section>
  );
}
