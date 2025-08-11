import React, { useEffect, useState } from 'react';
import { payloadClient } from '../../../lib/payloadClient';
import './assetss/LogoBrandingDetails.css';

function WebDesignDevelopmentDetails() {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects(currentPage);
    }, [currentPage]);

    const fetchProjects = async (page) => {
        setLoading(true);
        try {
            const response = await payloadClient.get('/projects', { params: { limit: 1, page } });
            setProjects(response.data.docs);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="aximo-projects-section">
            <div className="container">
                {loading ? (
                    <div className="loader">
                        <div className="spinner"></div> {/* CSS Spinner */}
                    </div>
                ) : (
                    projects.map((project) => (
                        <div key={project.id} className="aximo-project-single-section">
                            <div className="aximo-project-single-thumb">
                                <img
                                    src={`http://localhost:3000${project.mainImage?.url}`}
                                    alt="Project Main"
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
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`http://localhost:3000${project.secondaryImage?.url}`}
                                                    alt="Project Secondary"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="aximo-default-content m-right-gap">
                                            <h2>{project.title}</h2>
                                            <p>{project.description}</p>
                                            <div className="aximo-resolve-project-wrap">
                                                {project.steps.map((step, index) => (
                                                    <div key={index} className="aximo-resolve-project-item">
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
                    ))
                )}
                <div className="pagination-controls">
                    <button
                        className="pagination-button"
                        disabled={currentPage === 1 || loading}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <span className="pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="pagination-button"
                        disabled={currentPage === totalPages || loading}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WebDesignDevelopmentDetails;
