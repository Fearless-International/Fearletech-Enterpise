import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StarImg from "../../assets/images/v1/star2.png";
import { verifyEmail } from "../../services/authApi";

function VerifyEmail() {
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    
    if (!token) {
      setVerifying(false);
      setError("Invalid verification link. Missing token.");
      return;
    }
    
    const verify = async () => {
      try {
        await verifyEmail(token);
        setSuccess(true);
        setVerifying(false);
        
        // Redirect to login after 5 seconds
        setTimeout(() => {
          navigate('/sign-in');
        }, 5000);
      } catch (err) {
        setError("Email verification failed. The link may have expired or is invalid.");
        setVerifying(false);
      }
    };
    
    verify();
  }, [location, navigate]);
  
  return (
    <div className="section aximo-section-padding">
      <div className="container">
        <div className="aximo-account-title">
          <h2>
            <span className="aximo-title-animation">
              Email Verification
              <span className="aximo-title-icon">
                <img src={StarImg} alt="Star" />
              </span>
            </span>
          </h2>
        </div>
        <div className="aximo-account-wrap">
          <div className="text-center">
            {verifying && (
              <div>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Verifying your email...</p>
              </div>
            )}
            
            {success && (
              <div>
                <div className="mb-4 text-success">
                  <i className="fas fa-check-circle fa-4x"></i>
                </div>
                <h3>Email Verified Successfully!</h3>
                <p className="mb-4">
                  Your account has been activated. You can now log in to access your dashboard.
                </p>
                <p className="mb-4">
                  You will be redirected to the login page in a few seconds...
                </p>
                <div className="aximo-account-bottom m-0">
                  <p>
                    Click here to <a href="/sign-in">Login Now</a>
                  </p>
                </div>
              </div>
            )}
            
            {error && !verifying && (
              <div>
                <div className="mb-4 text-danger">
                  <i className="fas fa-times-circle fa-4x"></i>
                </div>
                <h3>Verification Failed</h3>
                <p className="mb-4">{error}</p>
                <div className="aximo-account-bottom m-0">
                  <p>
                    Return to <a href="/sign-in">Login</a> or <a href="/sign-up">Sign Up</a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;