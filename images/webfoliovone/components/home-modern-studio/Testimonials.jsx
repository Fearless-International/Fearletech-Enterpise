'use client';
import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function Testimonials() {
  const swiperOptions = {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    breakpoints: {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 'auto' },
    },
    navigation: {
      nextEl: '.testim-modern .swiper-button-next',
      prevEl: '.testim-modern .swiper-button-prev',
    },
  };

  return (
    <section className="testim-modern section-padding sub-bg bord-top-grd bord-bottom-grd">
      <div className="container">
        <div className="sec-head mb-80">
          <div className="d-flex align-items-center">
            <div>
              <span className="sub-title main-color mb-5">Testimonials</span>
              <h3 className="fw-600 fz-50 text-u d-rotate wow">
                <span className="rotate-text">
                  Trusted <span className="fw-200">by Clients.</span>
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

        <div className="testim-swiper3 out-right">
          <Swiper {...swiperOptions}>

            <SwiperSlide>
              <div className="item">
                <div className="cont">
                  <h6 className="sub-title mb-15">Website Delivered Perfectly!</h6>
                  <div className="text">
                    <p>
                      “Marius - Junior FRANCISCO built our new seafood website, and the result was flawless.
                      Fast, professional, and exactly what Aurora Ghana needed.”
                    </p>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex align-items-center">
                    <div className="img fit-img">
                      <img src="/assets/imgs/testim/t1.jpg" alt="" />
                    </div>
                    <div className="ml-20">
                      <h6 className="fz-18">M. Dekruijff</h6>
                      <span className="p-color opacity-8 fz-15 mt-5">
                        Aurora Ghana
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="item">
                <div className="cont">
                  <h6 className="sub-title mb-15">Our Brand Looks Amazing</h6>
                  <div className="text">
                    <p>
                      “Marius - Junior FRANCISCO built Kolmesh’s website from scratch, and it completely changed how our company is seen. Clean, modern, and professional.”
                    </p>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex align-items-center">
                    <div className="img fit-img">
                      <img src="/assets/imgs/testim/t2.jpg" alt="" />
                    </div>
                    <div className="ml-20">
                      <h6 className="fz-18">Gary</h6>
                      <span className="p-color opacity-8 fz-15 mt-5">
                        Manager, Kolmesh Ltd
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="item">
                <div className="cont">
                  <h6 className="sub-title mb-15">Community Management Experts</h6>
                  <div className="text">
                    <p>
                      “Marius - Junior FRANCISCO manages Giant’s online community with creativity and consistency.
                      Our fan engagement has never been stronger.”
                    </p>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex align-items-center">
                    <div className="img fit-img">
                      <img src="/assets/imgs/testim/t3.jpg" alt="" />
                    </div>
                    <div className="ml-20">
                      <h6 className="fz-18">M. KOTAN</h6>
                      <span className="p-color opacity-8 fz-15 mt-5">
                        Head, Giant Music Label
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="item">
                <div className="cont">
                  <h6 className="sub-title mb-15">Complete Digital Makeover</h6>
                  <div className="text">
                    <p>
                      “Marius - Junior FRANCISCO built Fenoutech’s website and runs our social media.
                      The results speak for themselves — we now look like an industry leader.”
                    </p>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex align-items-center">
                    <div className="img fit-img">
                      <img src="/assets/imgs/testim/t4.jpg" alt="" />
                    </div>
                    <div className="ml-20">
                      <h6 className="fz-18">H. Houngnandan</h6>
                      <span className="p-color opacity-8 fz-15 mt-5">
                        Cyber Security Expert, Fenoutech
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
