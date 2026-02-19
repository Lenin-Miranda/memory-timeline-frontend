import "./Steps.css";

export default function Steps() {
  return (
    <section className="steps">
      <div className="step__container">
        <div className="step__container-steps">
          <h3 className="step__container-steps-title">
            Steps to make your friendship memories scrapbook
          </h3>
          <ol className="step__list">
            <li className="step__item">Add New Memory</li>
            <li className="step__item">Tag a friend</li>
            <li className="step__item">Select Template or customize</li>
            <li className="step__item">Add emotions</li>
            <li className="step__item">Create scrapbook</li>
            <li className="step__item">Share Privately</li>
            <li className="step__item">Preserve the friendship forever</li>
          </ol>
        </div>
        <div className="step__container-faqs">
          <h3 className="step__container-faqs-title">FAQs</h3>
          <ol className="faq__list">
            <li className="faq__item">What can I put in Scrapbook?</li>
            <li className="faq__item">Does it need membership?</li>
            <li className="faq__item">
              How can I share it to multiple friends?
            </li>
            <li className="faq__item">Can I print the Scrapbook?</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
