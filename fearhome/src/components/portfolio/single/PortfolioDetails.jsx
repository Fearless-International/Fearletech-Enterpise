import React from "react";
import Single2Img from "../../../assets/images/portfolio/coming1.png"; // Replace with your "Coming Soon" image path

function PortfolioDetails() {
    return (
        <div className="coming-soon-section">
            <div className="container text-center">
                <div className="coming-soon-thumb">
                    <img
                        src={Single2Img}
                        alt="Coming Soon"
                        style={{ maxWidth: "50%", height: "auto", marginBottom: "20px", marginTop: "50px" }}
                    />
                </div>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "5px" }}>
                    Coming Soon!
                </h1>
                <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "50px" }}>
                    We are working hard to bring you an amazing portfolio experience. Stay tuned!
                </p>
            </div>
        </div>
    );
}

export default PortfolioDetails;