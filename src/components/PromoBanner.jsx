import React, { useState, useEffect } from "react";
import { apiService } from "../services/api";
import { transformPromos } from "../utils/dataTransform";
import "../styles/PromoBanner.css";

const PromoBanner = () => {
  const [promos, setPromos] = useState([]);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPromos = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(
          "Attempting to fetch promos from:",
          `${
            import.meta.env.VITE_API_BASE_URL || "http://147.93.153.136/api"
          }/promos/active`
        );
        const apiPromos = await apiService.fetchPromos();
        console.log("Received promos:", apiPromos);
        const transformedPromos = transformPromos(apiPromos);
        console.log("Transformed promos:", transformedPromos);
        setPromos(transformedPromos);
      } catch (err) {
        console.error("Error loading promos:", err);
        setError(err.message);
        // Set empty array to prevent component from breaking
        setPromos([]);
      } finally {
        setLoading(false);
      }
    };

    loadPromos();
  }, []);

  useEffect(() => {
    if (promos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promos.length);
      }, 7000); // Change every 7 seconds

      return () => clearInterval(interval);
    }
  }, [promos.length]);

  const goToSlide = (index) => {
    setCurrentPromoIndex(index);
  };

  const nextSlide = () => {
    setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promos.length);
  };

  const prevSlide = () => {
    setCurrentPromoIndex(
      (prevIndex) => (prevIndex - 1 + promos.length) % promos.length
    );
  };

  if (loading) {
    return (
      <div className="promo-banner">
        <div className="promo-skeleton">
          <div className="skeleton-loader"></div>
        </div>
      </div>
    );
  }

  if (error || promos.length === 0) {
    return null; // Don't render anything if there's an error or no promos
  }

  const currentPromo = promos[currentPromoIndex];

  return (
    <div className="promo-banner">
      <div className="promo-container">
        <div
          className="promo-slides"
          style={{
            transform: `translateX(-${currentPromoIndex * 100}%)`,
          }}
        >
          {promos.map((promo) => (
            <div key={promo.id} className="promo-slide">
              <img
                src={promo.imageUrl}
                alt={promo.title || "Promotional offer"}
                className="promo-image"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {(promo.title || promo.description) && (
                <div className="promo-overlay">
                  {promo.title && (
                    <h2 className="promo-title">{promo.title}</h2>
                  )}
                  {promo.description && (
                    <p className="promo-description">{promo.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {promos.length > 1 && (
          <>
            <button
              className="promo-nav prev"
              onClick={prevSlide}
              aria-label="Previous promo"
            >
              ‹
            </button>
            <button
              className="promo-nav next"
              onClick={nextSlide}
              aria-label="Next promo"
            >
              ›
            </button>

            <div className="promo-indicators">
              {promos.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === currentPromoIndex ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Show promo ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PromoBanner;
