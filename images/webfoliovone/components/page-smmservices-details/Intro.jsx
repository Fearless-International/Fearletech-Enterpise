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
                  <h3 className="mb-30">Growing your <span className="fw-300">online presence</span> <span className="fw-300">strategically.</span></h3>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text">
                  <p className="mb-15">I manage social media presence across multiple platforms, creating engaging content and implementing strategies that grow your audience and drive engagement.</p>
                  <p>With experience managing accounts for tech companies and marketing firms, I deliver measurable results.</p>
                  <div className="mt-30">
                    <ul className="rest dot-list">
                      <li className="mb-10">Content Creation & Scheduling</li>
                      <li className="mb-10">Community Management</li>
                      <li className="mb-10">Social Media Strategy</li>
                      <li className="mb-10">Analytics & Reporting</li>
                      <li>Multi-Platform Management</li>
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
                      <h3 className="fw-300 mb-10">35%</h3>
                      <h6 className="p-color sub-title">Engagement Increase</h6>
                    </div>
                    <div className="ml-auto">
                      <div className="icon-img-40"><img src="/assets/imgs/arw0.png" alt="" /></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="item bord-thin-top pt-30 d-flex align-items-end mt-20">
                    <div>
                      <h3 className="fw-300 mb-10">5+</h3>
                      <h6 className="p-color sub-title">Companies Managed</h6>
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