import React from 'react';

function Feat() {
  return (
    <section className="feat">
      <div className="container">
        <div className="sec-head mb-80">
          <div className="d-flex align-items-center mb-30">
            <h2 className="fw-600 fz-70 text-u d-rotate wow">
              <span className="rotate-text">Social Media <span className="fw-200">Strategy</span></span>
            </h2>
            <div className="ml-auto vi-more">
              <a href="#0" className="butn butn-sm butn-bord radius-30"><span>View All</span></a>
              <span className="icon ti-arrow-top-right"></span>
            </div>
          </div>
          <h6 className="sub-title main-color d-flex align-items-center">
            <span>Growth approach</span><span className="thin"></span>
          </h6>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="item-box radius-15 md-mb50">
              <div className="icon-img-70 mb-40 opacity-3"><img src="/assets/imgs/serv-icons/3.png" alt="" /></div>
              <span className="mb-30 p-color">01 .</span>
              <h6 className="mb-20">Strategy Development</h6>
              <p>Creating customized social media plans aligned with your goals.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item-box radius-15 md-mb50">
              <div className="icon-img-70 mb-40 opacity-3"><img src="/assets/imgs/serv-icons/4.png" alt="" /></div>
              <span className="mb-30 p-color">02 .</span>
              <h6 className="mb-20">Content Creation</h6>
              <p>Designing engaging posts, graphics, and videos for your audience.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item-box radius-15 sm-mb50">
              <div className="icon-img-70 mb-40 opacity-3"><img src="/assets/imgs/serv-icons/5.png" alt="" /></div>
              <span className="mb-30 p-color">03 .</span>
              <h6 className="mb-20">Community Engagement</h6>
              <p>Responding to comments and building relationships with followers.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item-box radius-15">
              <div className="icon-img-70 mb-40 opacity-3"><img src="/assets/imgs/serv-icons/6.png" alt="" /></div>
              <span className="mb-30 p-color">04 .</span>
              <h6 className="mb-20">Analytics & Optimization</h6>
              <p>Tracking metrics and refining strategy for continuous growth.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feat;