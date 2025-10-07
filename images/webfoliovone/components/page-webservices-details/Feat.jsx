import React from 'react';

function Feat() {
  return (
    <section className="feat">
      <div className="container">
        <div className="sec-head mb-80">
          <div className="d-flex align-items-center mb-30">
            <h2 className="fw-600 fz-70 text-u d-rotate wow">
              <span className="rotate-text">E-Commerce <span className="fw-200">Development</span></span>
            </h2>
            <div className="ml-auto vi-more">
              <a href="#0" className="butn butn-sm butn-bord radius-30"><span>View All</span></a>
              <span className="icon ti-arrow-top-right"></span>
            </div>
          </div>
          <h6 className="sub-title main-color d-flex align-items-center">
            <span>Build process</span><span className="thin"></span>
          </h6>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="item-box radius-15 md-mb50">
              <div className="icon-img-70 mb-40 opacity-3"><img src="/assets/imgs/serv-icons/3.png" alt="" /></div>
              <span className="mb-30 p-color">01 .</span>
              <h6 className="mb-20">Platform Selection</h6>
              <p>Choosing the right e-commerce technology for your business needs.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item-box radius-15 md-mb50">
              <div className="icon-img-70 mb-40 opacity-3"><img src="/assets/imgs/serv-icons/4.png" alt="" /></div>
              <span className="mb-30 p-color">02 .</span>
              <h6 className="mb-20">Store Development</h6>
              <p>Building your online store with product catalogs and checkout flows.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item-box radius-15 sm-mb50">
              <div className="icon-img-70 mb-40 opacity-3"><img src="/assets/imgs/serv-icons/5.png" alt="" /></div>
              <span className="mb-30 p-color">03 .</span>
              <h6 className="mb-20">Payment Integration</h6>
              <p>Implementing secure payment gateways and processing systems.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item-box radius-15">
              <div className="icon-img-70 mb-40 opacity-3"><img src="/assets/imgs/serv-icons/6.png" alt="" /></div>
              <span className="mb-30 p-color">04 .</span>
              <h6 className="mb-20">Launch & Optimization</h6>
              <p>Going live and continuously improving conversion rates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feat;