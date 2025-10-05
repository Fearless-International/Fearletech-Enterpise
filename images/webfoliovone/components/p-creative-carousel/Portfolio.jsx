'use client';
import React, { useEffect, useState } from 'react';
import { payloadClient } from '../lib/payloadClient';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function Portfolio() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const response = await payloadClient.getFeaPortfolioItems(1, 10);
      setData(response.docs || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const swiperOptions = {
    modules: [Pagination, Navigation],
    slidesPerView: 'auto',
    spaceBetween: 80,
    loop: data.length > 1,
    touchRatio: 0.2,
    speed: 1500,
    pagination: {
      el: '.work-crev .swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.work-crev .swiper-button-next',
      prevEl: '.work-crev .swiper-button-prev',
    },
  };

  if (loading) {
    return (
      <section className="work-crev section-padding">
        <div className="container">
          <div className="loader">Loading...</div>
        </div>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="work-crev section-padding">
        <div className="container">
          <p>No portfolio items found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="work-crev section-padding">
      <div className="container position-re pb-80">
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
            <div className="ml-auto">
              <div className="swiper-arrow-control">
                <div className="swiper-button-prev">
                  <span className="ti-arrow-left"></span>
                </div>
                <div className="swiper-button-next">
                  <span className="ti-arrow-right"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="work-swiper out-right">
          <Swiper {...swiperOptions}>
            {data.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="item d-flex align-items-center">
                  <div className="cont">
                    <h6 className="sub-title main-color mb-15">{item.category || 'UI/UX Design'}</h6>
                    <h2>
                      {item.title} <br /> {item.subTitle}
                    </h2>
                    
                    <a
                      href={`/portfolio/${item.slug}`}
                      className="butn-crev d-flex align-items-center mt-30"
                    >
                      <span className="hover-this">
                        <span className="circle hover-anim">
                          <i className="ti-arrow-top-right"></i>
                        </span>
                      </span>
                      <span className="text">View Project</span>
                    </a>
                  </div>
                  <div className="img">
                    <img 
                      src={item.thumbnailImage || item.mainImage || '/assets/imgs/works/1/1.jpg'} 
                      alt={item.title || ''} 
                      className="radius-15" 
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;