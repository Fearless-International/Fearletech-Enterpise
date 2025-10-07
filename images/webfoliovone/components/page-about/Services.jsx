import React from 'react';

function Services() {
  return (
    <section className="services-inline2 section-padding sub-bg bord-bottom-grd bord-top-grd">
      <div className="container ontop">
        <div className="sec-head mb-80">
          <div className="d-flex align-items-center">
            <div>
              <span className="sub-title main-color mb-5">My Expertise</span>
              <h3 className="fw-600 fz-50 text-u d-rotate wow">
                <span className="rotate-text">
                  Featured <span className="fw-200">Services.</span>
                </span>
              </h3>
            </div>

            {/* ✅ Fixed structure: replaced div with <a> */}
            <a
              href="/page-services"
              className="ml-auto vi-more butn butn-sm butn-bord radius-30"
            >
              <span>View All</span>
              <span className="icon ti-arrow-top-right"></span>
            </a>
          </div>
        </div>

        {/* Service Item 1 */}
        <div className="item">
          <div className="row md-marg align-items-end">
            <div className="col-lg-4">
              <div>
                <span className="num">01</span>
                <div>
                  <span className="sub-title main-color mb-10">Design</span>
                  <h2>
                    UI / UX <span className="fw-200">Design</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text md-mb80">
                <p>
                  Designing intuitive interfaces that combine clean visual design
                  with seamless user experience using Figma and modern UX
                  principles.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="img fit-img">
                <img src="/assets/imgs/serv-img/f1.png" alt="UI/UX Design" />
                <a href="/page-services-details">
                  <span className="ti-arrow-top-right"></span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Service Item 2 */}
        <div className="item">
          <div className="row md-marg align-items-end">
            <div className="col-lg-4">
              <div>
                <span className="num">02</span>
                <div>
                  <span className="sub-title main-color mb-10">Development</span>
                  <h2>
                    Web <span className="fw-200">Development</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text md-mb80">
                <p>
                  Building responsive, scalable web applications using React,
                  Node.js, Angular, and Laravel with 15+ websites developed
                  successfully.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="img fit-img">
                <img src="/assets/imgs/serv-img/f2.png" alt="Web Development" />
                <a href="/page-services-details">
                  <span className="ti-arrow-top-right"></span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Service Item 3 */}
        <div className="item pb-0">
          <div className="row md-marg align-items-end">
            <div className="col-lg-4">
              <div>
                <span className="num">03</span>
                <div>
                  <span className="sub-title main-color mb-10">Marketing</span>
                  <h2>
                    SEO / <span className="fw-200">Marketing</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text md-mb80">
                <p>
                  Optimizing websites for search engines using RankMath and
                  implementing digital marketing strategies to increase online
                  visibility.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="img fit-img">
                <img src="/assets/imgs/serv-img/f5.png" alt="SEO Marketing" />
                <a href="/page-services-details">
                  <span className="ti-arrow-top-right"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
