import { useState, useEffect } from "react";
import "./Dashboard.css";
import test from "../../assets/cardtest.png";
import { CreateTimelineModal } from "../../components/Modal";
import CreateMemoryModal from "../../components/CreateMemoryModal/CreateMemoryModal";
import { useTimeline } from "../../contexts/TimelineContext";
import { useMemory } from "../../contexts/MemoryContext";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [selectedTimeline, setSelectedTimeline] = useState(null);

  const {
    timelines,
    fetchTimelines,
    loading: timelinesLoading,
  } = useTimeline();
  const {
    memories,
    fetchMemoriesByTimeline,
    loading: memoriesLoading,
  } = useMemory();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTimelines();
    }
  }, [isAuthenticated, fetchTimelines]);

  function openModal() {
    setIsModalOpen((prev) => !prev);
  }

  const handleTimelineClick = async (timeline) => {
    if (!timeline || !timeline.id) {
      console.error("Timeline or timeline.id is undefined", timeline);
      return;
    }
    setSelectedTimeline(timeline);
    await fetchMemoriesByTimeline(timeline.id);
  };

  const handleAddMemory = () => {
    if (selectedTimeline) {
      setIsMemoryModalOpen(true);
    }
  };

  const handleBackToTimelines = () => {
    setSelectedTimeline(null);
  };

  useEffect(() => {
    if (timelines.length > 0 && !selectedTimeline) {
      const interval = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % timelines.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [timelines.length, selectedTimeline]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % timelines.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + timelines.length) % timelines.length);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Obtener la primera imagen de las memories de una timeline
  const getTimelineImage = (timeline) => {
    if (timeline.memories && timeline.memories.length > 0) {
      const memoryWithImage = timeline.memories.find((m) => m.imageUrl);
      if (memoryWithImage) {
        return memoryWithImage.imageUrl;
      }
    }
    return test; // Imagen por defecto
  };

  // Vista de memories de una timeline seleccionada
  if (selectedTimeline) {
    return (
      <section className="dashboard">
        <div className="dashboard__container">
          <div className="dashboard__container-views">
            <div className="dashboard__container-views-content">
              <button
                className="dashboard__back-btn"
                onClick={handleBackToTimelines}
              >
                ← Back
              </button>
              <p className="dashboard__container-views-content-title">
                {selectedTimeline.personName}'s Memories
              </p>
            </div>
          </div>

          <div className="dashboard__memories-container">
            {memoriesLoading ? (
              <p className="dashboard__loading">Loading memories...</p>
            ) : memories.length === 0 ? (
              <div className="dashboard__empty">
                <p>No memories yet for this timeline.</p>
                <p>Add your first memory!</p>
              </div>
            ) : (
              <div className="dashboard__memories-grid">
                {memories.map((memory) => (
                  <div key={memory.id} className="dashboard__memory-card">
                    {memory.imageUrl && (
                      <img
                        src={memory.imageUrl}
                        alt={memory.text}
                        className="dashboard__memory-image"
                      />
                    )}
                    <p className="dashboard__memory-date">
                      {formatDate(memory.date)}
                    </p>
                    <p className="dashboard__memory-text">{memory.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="dashboard__container-button"
            onClick={handleAddMemory}
          >
            Add Memory
          </button>
        </div>

        <CreateMemoryModal
          isOpen={isMemoryModalOpen}
          onClose={() => setIsMemoryModalOpen(false)}
          timelineId={selectedTimeline.id}
          timelineName={selectedTimeline.personName}
        />
      </section>
    );
  }

  // Vista principal de timelines
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
          {timelinesLoading ? (
            <p className="dashboard__loading">Loading timelines...</p>
          ) : timelines.length === 0 ? (
            <div className="dashboard__empty">
              <p>You don't have any timelines yet.</p>
              <p>Create your first one!</p>
            </div>
          ) : (
            <div className="dashboard__container-cards-wrapper">
              <button
                className="carousel-btn carousel-btn-prev"
                onClick={prevCard}
                aria-label="Previous card"
              >
                <span className="carousel-btn-icon">‹</span>
              </button>

              <div className="dashboard__container-cards-track">
                {timelines.map((timeline, index) => (
                  <div
                    key={timeline.id}
                    className={`dashboard__container-cards ${
                      index >= currentCard && index < currentCard + 2
                        ? "active"
                        : ""
                    }`}
                    style={{
                      transform: `translateX(${(index - currentCard) * 50}%)`,
                    }}
                    onClick={() => handleTimelineClick(timeline)}
                  >
                    <div className="dashboard__container-card">
                      <p className="dashboard__container-card-date">
                        {timeline.relationshipType}
                      </p>
                      <img
                        className="dashboard__container-card-img"
                        src={getTimelineImage(timeline)}
                        alt="timeline"
                      />
                    </div>
                    <p className="dashboard__container-card-description">
                      {timeline.personName}
                    </p>
                    <span className="dashboard__card-hint">
                      Click to view memories
                    </span>
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
          )}

          {timelines.length > 0 && (
            <div className="carousel-indicators">
              {timelines.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === currentCard ? "active" : ""
                  }`}
                  onClick={() => setCurrentCard(index)}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <button className="dashboard__container-button" onClick={openModal}>
          Add Timeline
        </button>
      </div>
      <CreateTimelineModal isOpen={isModalOpen} onClose={openModal} />
    </section>
  );
}
