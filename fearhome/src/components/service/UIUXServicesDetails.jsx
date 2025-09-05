import React, { useEffect, useState } from 'react';
import { payloadClient } from '../../lib/payloadClient';

function UIUXInterfacesDetails() {
    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServices(currentPage);
    }, [currentPage]);

    const fetchServices = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await payloadClient.getUIUXInterfaces(page);
            setServices(response.docs || []);
            setTotalPages(response.totalPages || 1);
        } catch (err) {
            console.error('Error fetching services:', err);
            setError('Failed to load UI/UX interface details. Please try again later.');
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
        <div className="section aximo-section-padding2 pb-0">
            <div className="container">
                {/* Loader */}
                {loading && (
                    <div className="loader">
                        <div className="spinner"></div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger text-center">{error}</div>
                )}

                {/* Empty State */}
                {!loading && !error && services.length === 0 && (
                    <div className="text-center">No UI/UX interfaces available at the moment.</div>
                )}

                {/* Services Rendering */}
                {!loading && !error && services.map((service) => (
                    <div key={service.id} className="aximo-service-details-wrap">
                        {/* Hero Image */}
                        {service.heroImageUrl && (
                            <div className="aximo-service-details-thumb">
                                <img src={service.heroImageUrl} alt={service.title} />
                            </div>
                        )}

                        <div className="row">
                            {/* Content */}
                            <div className="col-lg-8">
                                <div className="aximo-default-content">
                                    <h2>
                                        <span className="aximo-title-animation">
                                            {service.title}
                                        </span>
                                        {service.subtitle}
                                    </h2>
                                    <p>{service.description}</p>
                                    {service.additionalDescription && (
                                        <p>{service.additionalDescription}</p>
                                    )}
                                </div>
                            </div>

                            {/* Side Image */}
                            {service.sideImageUrl && (
                                <div className="col-lg-4">
                                    <div className="aximo-service-side-thumb" style={{ border: 'none' }}>
                                        <img src={service.sideImageUrl} alt="Service Side" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Features Section */}
                        {service.serviceFeatures?.length > 0 && (
                            <div className="row">
                                {service.serviceFeatures.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="col-lg-6">
                                        <div className="aximo-user-interface">
                                            <h3>{featureIndex + 1}/ {feature.featureTitle}:</h3>
                                            <ul>
                                                {feature.featurePoints?.map((point, pointIndex) => (
                                                    <li key={pointIndex}>{point.point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Working Approach Section */}
                        {service.workingApproach?.length > 0 && (
                            <div className="aximo-working-approach mt-10">
                                <h3>Our Working Approach</h3>
                                <div className="aximo-approach-steps">
                                    {service.workingApproach.map((step, stepIndex) => (
                                        <div key={stepIndex} className="aximo-approach-item mb-5">
                                            <h4>{stepIndex + 1}. {step.stepTitle}</h4>
                                            <p>{step.stepDescription}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
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
                )}
            </div>
        </div>
    );
}

export default UIUXInterfacesDetails;
