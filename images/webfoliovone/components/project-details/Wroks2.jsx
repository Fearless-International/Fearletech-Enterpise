import React from 'react';

function Wroks2({ project }) {
  const images = project?.projectImages || [];
  
  return (
    <div className="img-column">
      <div className="container">
        <div className="row">
          {images.length >= 4 ? (
            <>
              <div className="col-lg-6">
                <div className="img md-mb30">
                  <img src={images[2].imageUrl} alt={images[2].caption || ''} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="img">
                  <img src={images[3].imageUrl} alt={images[3].caption || ''} />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Wroks2;