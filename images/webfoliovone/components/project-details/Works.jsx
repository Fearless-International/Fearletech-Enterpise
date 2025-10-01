import React from 'react';

function Works({ project }) {
  const images = project?.projectImages || [];
  
  return (
    <div className="img-column">
      <div className="container">
        <div className="row">
          {images.length >= 2 ? (
            <>
              <div className="col-lg-6">
                <div className="img md-mb30">
                  <img src={images[0].imageUrl} alt={images[0].caption || ''} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="img">
                  <img src={images[1].imageUrl} alt={images[1].caption || ''} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-6">
                <div className="img md-mb30">
                  <img src="/assets/imgs/works/3/2.jpg" alt="" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="img">
                  <img src="/assets/imgs/works/3/3.jpg" alt="" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Works;