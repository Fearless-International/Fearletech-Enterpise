import React from 'react';

function Challenge({ project }) {
  const formatDate = (dateString) => {
    if (!dateString) return '7 August 2021';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <section className="section-padding">
      <div className="container">
        <div className="info mb-80 pb-20 bord-thin-bottom">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="item mb-30">
                <span className="opacity-8 mb-5">Category :</span>
                <h6>{project?.category || 'Development'}</h6>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="item mb-30">
                <span className="opacity-8 mb-5">Client :</span>
                <h6>{project?.client || 'Envato'}</h6>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="item mb-30">
                <span className="opacity-8 mb-5">Start Date :</span>
                <h6>{formatDate(project?.startDate)}</h6>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="item">
                <span className="opacity-8 mb-5">Designer :</span>
                <h6>{project?.designer || 'UiCamp'}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row">
              <div className="col-lg-5">
                <h4 className="mb-50">{project?.challengeTitle || '01 . The Challenge'}</h4>
              </div>
              <div className="col-lg-7">
                <div className="text">
                  {project?.challengeHeading && (
                    <h5 className="mb-30 fw-400 line-height-40">
                      {project.challengeHeading}
                    </h5>
                  )}
                  <p className="fz-18">
                    {project?.challengeDescription || 'The goal is there are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Challenge;