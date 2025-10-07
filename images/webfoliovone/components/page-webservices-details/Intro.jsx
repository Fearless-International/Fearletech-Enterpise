import React from 'react';

function Intro() {
  return (
    <section className="intro section-padding">
      <div className="container">
        <div className="row lg-marg">
          <div className="col-lg-8">
            <div className="row lg-marg">
              <div className="col-md-6">
                <div>
                  <h6 className="sub-title main-color mb-15">Description</h6>
                  <h3 className="mb-30">Building responsive and <span className="fw-300">scalable</span> <span className="fw-300">web solutions.</span></h3>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text">
                  <p className="mb-15">I develop modern web applications using cutting-edge technologies like React, Node.js, Angular, and Laravel to deliver exceptional digital experiences.</p>
                  <p>With 9 years of experience, I transform complex technical challenges into elegant, user-friendly solutions that drive business growth.</p>
                  <div className="mt-30">
                    <ul className="rest dot-list">
                      <li className="mb-10">React & Next.js Development</li>
                      <li className="mb-10">Node.js & Express Backend</li>
                      <li className="mb-10">Angular & Vue.js Applications</li>
                      <li className="mb-10">Laravel & PHP Solutions</li>
                      <li>Responsive & Mobile-First Design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="numbers mt-80 md-mb50">
              <div className="row lg-marg">
                <div className="col-md-6">
                  <div className="item bord-thin-top pt-30 d-flex align-items-end mt-20 sm-mb30">
                    <div>
                      <h3 className="fw-300 mb-10">25%</h3>
                      <h6 className="p-color sub-title">Reduced Cart Abandonment</h6>
                    </div>
                    <div className="ml-auto">
                      <div className="icon-img-40"><img src="/assets/imgs/arw0.png" alt="" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="img-full fit-img"><img src="/assets/imgs/intro/2.jpg" alt="" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;