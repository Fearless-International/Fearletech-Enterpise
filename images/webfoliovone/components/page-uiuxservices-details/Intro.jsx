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
                  <h3 className="mb-30">Designing intuitive <span className="fw-300">user experiences</span> <span className="fw-300">that delight.</span></h3>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text">
                  <p className="mb-15">I create beautiful, intuitive interfaces that combine clean visual design with seamless user experience using Figma and modern UX principles.</p>
                  <p>Every design decision is driven by user needs, accessibility, and business goals to create meaningful digital experiences.</p>
                  <div className="mt-30">
                    <ul className="rest dot-list">
                      <li className="mb-10">User Interface Design</li>
                      <li className="mb-10">User Experience Research</li>
                      <li className="mb-10">Wireframing & Prototyping</li>
                      <li className="mb-10">Usability Testing</li>
                      <li>Design Systems & Style Guides</li>
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
                      <h3 className="fw-300 mb-10">40%</h3>
                      <h6 className="p-color sub-title">Improved User Engagement</h6>
                    </div>
                    <div className="ml-auto">
                      <div className="icon-img-40"><img src="/assets/imgs/arw0.png" alt="" /></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="item bord-thin-top pt-30 d-flex align-items-end mt-20">
                    <div>
                      <h3 className="fw-300 mb-10">100%</h3>
                      <h6 className="p-color sub-title">User-Centered Approach</h6>
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