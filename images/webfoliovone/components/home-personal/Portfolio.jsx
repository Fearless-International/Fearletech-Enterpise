'use client';
import React, { useEffect, useState } from 'react';
import { payloadClient } from '../lib/payloadClient';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    setLoading(true);
    try {
      const response = await payloadClient.getPortfolioItems(1, 5);
      setPortfolioItems(response.docs);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  function Playing() {
    gsap.registerPlugin(ScrollTrigger);

    const cards = document.querySelectorAll('.cards .card-item');
    
    if (cards.length === 0) return;

    // Clear any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(st => st.kill());

    let stickDistance = 0;

    const firstCardST = ScrollTrigger.create({
      trigger: cards[0],
      start: 'center center',
    });

    const lastCardST = ScrollTrigger.create({
      trigger: cards[cards.length - 1],
      start: 'bottom bottom',
    });

    cards.forEach((card, index) => {
      // Improved scaling calculation
      const scale = 1 - (cards.length - index - 1) * 0.02; // Reduced scale factor
      
      // Set initial transform origin to center
      gsap.set(card, {
        transformOrigin: '50% 50%'
      });

      const scaleDown = gsap.to(card, {
        scale: scale,
        transformOrigin: '50% 50%', // Keep origin at center
        ease: 'none',
        paused: true
      });

      ScrollTrigger.create({
        trigger: card,
        start: 'center center',
        end: () => lastCardST.start + stickDistance,
        pin: true,
        pinSpacing: false,
        animation: scaleDown,
        toggleActions: 'restart none none reverse',
        onUpdate: (self) => {
          // Update scale based on scroll progress
          scaleDown.progress(self.progress);
        }
      });
    });
  }

  useEffect(() => {
    if (!loading && portfolioItems.length > 0) {
      // Add a small delay to ensure DOM is ready
      setTimeout(() => {
        Playing();
      }, 100);
    }

    // Clean up function
    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, [loading, portfolioItems]);

  return (
    <section className="work-card section-padding pb-0">
      <div className="container">
        <div className="sec-head mb-80">
          <div className="d-flex align-items-center">
            <div>
              <span className="sub-title main-color mb-5">Our Portfolio</span>
              <h3 className="fw-600 fz-50 text-u d-rotate wow">
                <span className="rotate-text">
                  Selected <span className="fw-200">Works.</span>
                </span>
              </h3>
            </div>
            <div className="ml-auto vi-more">
              <a
                href="/portfolio-grid"
                className="butn butn-sm butn-bord radius-30"
              >
                <span>View All</span>
              </a>
              <span className="icon ti-arrow-top-right"></span>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="cards" style={{ overflow: 'visible' }}>
            {portfolioItems.map((item, index) => (
              <div key={item.id} className="card-item sub-bg" style={{ 
                position: 'relative',
                zIndex: portfolioItems.length - index,
                marginBottom: index < portfolioItems.length - 1 ? '2rem' : '0'
              }}>
                <div className="row">
                  <div className="col-lg-5">
                    <div className="cont">
                      <div>
                        <div className="mb-15">
                          {item.tags?.map((tagItem, tagIndex) => (
                            <a key={tagIndex} href={item.portfolioLink} className="tag">
                              {tagItem.tag}
                            </a>
                          ))}
                        </div>
                        <h4>{item.title}</h4>
                      </div>
                      <div>
                        <p>{item.description}</p>
                        <a href={item.detailsLink} className="underline mt-15">
                          <span className="text main-color sub-title">
                            View Details <i className="ti-arrow-top-right"></i>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div 
                      className="img" 
                      style={{ 
                        overflow: 'hidden', 
                        borderRadius: '12px', 
                        width: '100%',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={`https://fearletech-enterpise.onrender.com${item.image?.url}`}
                        alt={item.image?.alt || item.title}
                        style={{ 
                          display: 'block', 
                          width: '100%', 
                          height: 'auto', 
                          objectFit: 'cover',
                          maxHeight: '400px' // Limit image height
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sec-bottom mt-100">
        <div className="main-bg d-flex align-items-center">
          <h6 className="fz-14 fw-400">
            More than <span className="fw-600"> 200+ companies</span>
            trusted us worldwide
          </h6>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;