import React, { useEffect, useState } from 'react';
import payloadClient from "@backend/payloadClient.ts";


function UIUXInterfacesDetails() {
    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchServices(currentPage);
    }, [currentPage]);

    const fetchServices = async (page) => {
        setLoading(true);
        try {
            const response = await payloadClient.get('/uiux-interfaces', { 
                params: { limit: 1, page, where: { isActive: { equals: true } } }
            });
            setServices(response.data.docs);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching services:', error);
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
                {loading ? (
                    <div className="loader">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    services.map((service) => (
                        <div key={service.id} className="aximo-service-details-wrap">
                            <div className="aximo-service-details-thumb">
                                <img src={service.heroImageUrl} alt={service.title} />
                            </div>
                            <div className="row">
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
                                {/* Side Image positioned here */}
                                {service.sideImageUrl && (
                                    <div className="col-lg-4">
                                        <div className="aximo-service-side-thumb" style={{ border: 'none' }}>
                                            <img
                                                src={service.sideImageUrl}
                                                alt="Service Side Image"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {service.serviceFeatures && service.serviceFeatures.length > 0 && (
                                <div className="row">
                                    {service.serviceFeatures.map((feature, featureIndex) => (
                                        <div key={featureIndex} className="col-lg-6">
                                            <div className="aximo-user-interface">
                                                <h3>{featureIndex + 1}/ {feature.featureTitle}:</h3>
                                                <ul>
                                                    {feature.featurePoints?.map((point, pointIndex) => (
                                                        <li key={pointIndex}>
                                                            {point.point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {/* Working Approach Section - moved up */}
                            {service.workingApproach && service.workingApproach.length > 0 && (
                                <div className="aximo-working-approach" style={{ marginTop: '40px' }}>
                                    <h3>Our Working Approach</h3>
                                    <div className="aximo-approach-steps">
                                        {service.workingApproach.map((step, stepIndex) => (
                                            <div key={stepIndex} className="aximo-approach-item" style={{ marginBottom: '20px' }}>
                                                <h4>{stepIndex + 1}. {step.stepTitle}</h4>
                                                <p>{step.stepDescription}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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

export default UIUXInterfacesDetails;