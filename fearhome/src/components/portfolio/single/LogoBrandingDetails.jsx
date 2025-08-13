import { useEffect, useState } from "react";
import { payloadClient } from '../../../lib/payloadClient';
import Star2Img from "../../../assets/images/v1/star2.png";
import './assetss/LogoBrandingDetails.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function LogoBrandingDetails() {
    const [project, setProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await payloadClient.getLogoBrandingProjects(currentPage);
        setProject(response.docs[0]);
        setTotalPages(response.totalPages);
    } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project. Please try again later.");
    } finally {
        setLoading(false);
    }
};
        fetchProject();
    }, [currentPage]);

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="aximo-projects-section">
            <div className="container">
                {loading ? (
                    <div className="loader">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    project && (
                        <div className="aximo-project-single-section">
                            <div className="aximo-project-single-thumb">
                                <LazyLoadImage
                                    src={`http://localhost:3000${project.mainImage?.url}`}
                                    alt={project.mainImage?.alt || "Main Project"}
                                    effect="blur"
                                />
                            </div>
                            <div className="aximo-project-info-wrap">
                                <div className="aximo-project-info">
                                    <h3>Client:</h3>
                                    <p>{project.client}</p>
                                </div>
                                <div className="aximo-project-info">
                                    <h3>Date:</h3>
                                    <p>{project.date}</p>
                                </div>
                                <div className="aximo-project-info">
                                    <h3>Duration:</h3>
                                    <p>{project.duration}</p>
                                </div>
                                <div className="aximo-project-info">
    <button
        className="contact-button"
        onClick={() => window.location.href = '/contact-us'}
        style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#FF007F",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            textAlign: "center",
        }}
    >
        Pricing ?
    </button>
</div>
                            </div>
                            <div className="aximo-project-single-wrap">
                                <div className="row">
                                    <div className="col-lg-4 order-lg-2">
                                        <div className="aximo-project-single-thumb2" style={{ border: 'none' }}>
                                            {project.secondaryImages?.map((image, index) => (
                                                <LazyLoadImage
                                                    key={index}
                                                    src={`http://localhost:3000${image.image?.url}`}
                                                    alt={image.alt || `Secondary Image ${index + 1}`}
                                                    effect="blur"
                                                    style={{ marginBottom: "30px" }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="aximo-default-content m-right-gap">
                                            <h2>{project.title}</h2>
                                            <p>{project.description}</p>
                                            <div className="aximo-resolve-project-wrap">
                                                {project.steps.map((step, index) => (
                                                    <div key={step.id} className="aximo-resolve-project-item">
                                                        <h3>
                                                            {index + 1}. {step.title}:
                                                        </h3>
                                                        <p>{step.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}

                <div className="pagination-controls">
                    <button
                        className="pagination-button"
                        disabled={currentPage === 1 || loading}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                    <span className="pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="pagination-button"
                        disabled={currentPage === totalPages || loading}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoBrandingDetails;