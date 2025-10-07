import React from 'react';

function Intro() {
  return (
    <section className="page-intro section-padding pb-0">
      <div className="container">
        <div className="row md-marg">
          <div className="col-lg-6">
            <div className="img md-mb80">
              <div className="row">
                <div className="col-6">
                  <img src="/assets/imgs/intro/f2.png" alt="" />
                </div>
                <div className="col-6 mt-40">
                  <img src="/assets/imgs/intro/f4.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="cont">
              <h3 className="mb-30">
                I'm a versatile{' '}
                <span className="fw-200">digital professional</span> creating
                exceptional <span className="fw-200">web solutions</span> &
                brand experiences.
              </h3>
              <p>
                With 9 years of experience in web development, graphic design, and project management, I transform complex technical challenges into elegant solutions. From building responsive websites to creating compelling brand identities, I deliver projects that drive business growth.
              </p>
              <a href="/page-services" className="underline main-color mt-40">
                <span className="text">
                  My Services <i className="ti-arrow-top-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;