'use client';
import React from 'react';

function FAQS() {
  function openAccordion(event) {
    document.querySelectorAll('.accordion-info').forEach((element) => {
      element.classList.remove('active');
      element.style.maxHeight = 0;
      element.parentElement.classList.remove('active');
    });
    event.currentTarget.parentElement.classList.add('active');
    event.currentTarget.nextElementSibling.style.maxHeight = '300px';
    event.currentTarget.nextElementSibling.classList.add('active');
  }
  return (
    <section className="page-faqs section-padding pb-0 position-re">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div>
              <div className="sec-head mb-50">
                <h6 className="sub-title main-color mb-15">Why choose me?</h6>
                <h3>
                  9 years of expertise delivering <br /> exceptional digital solutions.
                </h3>
              </div>
              <div className="accordion bord">
                <div className="item active wow fadeInUp" data-wow-delay=".1s">
                  <div onClick={openAccordion} className="title">
                    <h6>Full-Stack Development Expertise</h6>
                    <span className="ico ti-plus"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="">
                      Proficient in React, Node.js, Angular, Laravel, and modern frameworks. 
                      I build scalable web applications with 15+ successful projects delivered 
                      for organizations like WHO, Aurora, and FenouTech.
                    </p>
                  </div>
                </div>

                <div className="item wow fadeInUp" data-wow-delay=".3s">
                  <div onClick={openAccordion} className="title">
                    <h6>Certified & Highly Skilled Professional</h6>
                    <span className="ico ti-plus"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="">
                      Oracle APEX Certified, Microsoft Power Platform Associate, and IBM 
                      Data Science certified. BSc in Computer Science from University of 
                      Greenwich with 100% proficiency in Adobe Creative Suite and development tools.
                    </p>
                  </div>
                </div>

                <div className="item wow fadeInUp" data-wow-delay=".5s">
                  <div onClick={openAccordion} className="title">
                    <h6>Complete Brand Identity & Design Solutions</h6>
                    <span className="ico ti-plus"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="">
                      Created 50+ logos, brochures, and brand identity systems for diverse clients. 
                      Expert in Photoshop, Illustrator, InDesign, and Figma to deliver compelling 
                      visual experiences that elevate brands.
                    </p>
                  </div>
                </div>

                <div className="item wow fadeInUp" data-wow-delay=".7s">
                  <div onClick={openAccordion} className="title">
                    <h6>Versatile & Results-Driven Approach</h6>
                    <span className="ico ti-plus"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="">
                      From database administration to social media management, video editing to 
                      e-commerce solutions, I bridge creativity and technical expertise to deliver 
                      projects that exceed expectations and drive measurable business growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="img1">
        <img src="/assets/imgs/intro/f1.png" alt="" />
      </div>
      <div className="img2">
        <img src="/assets/imgs/arw0.png" alt="" />
      </div>
      <div className="img3">
        <img src="/assets/imgs/intro/f4.png" alt="" />
      </div>
    </section>
  );
}

export default FAQS;