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
                  <h3 className="mb-30">Crafting engaging <span className="fw-300">multimedia content</span> <span className="fw-300">professionally.</span></h3>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text">
                  <p className="mb-15">I create professional video content using Premiere Pro, After Effects, DaVinci Resolve, and InShot for engaging multimedia experiences.</p>
                  <p>From promotional videos to social media content, I bring stories to life through creative editing and motion graphics.</p>
                  <div className="mt-30">
                    <ul className="rest dot-list">
                      <li className="mb-10">Video Editing & Post-Production</li>
                      <li className="mb-10">Motion Graphics & Animation</li>
                      <li className="mb-10">Color Grading & Correction</li>
                      <li className="mb-10">Social Media Video Content</li>
                      <li>Promotional & Marketing Videos</li>
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
                      <h3 className="fw-300 mb-10">100%</h3>
                      <h6 className="p-color sub-title">Premiere Pro Expertise</h6>
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
                      <h6 className="p-color sub-title">After Effects Skills</h6>
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