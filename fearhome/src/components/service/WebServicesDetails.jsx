import React, { useEffect, useState } from 'react';
import { payloadClient } from '../../lib/payloadClient'; 

function WebServicesDetails() {
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
            const response = await payloadClient.getWebServices(page);
            setServices(response.docs);
            setTotalPages(response.totalPages);
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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {services.map((service) => (
                            <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                                {/* Hero Image */}
                                <div className="relative h-64 sm:h-80 overflow-hidden">
                                    <img 
                                        src={service.heroImageUrl} 
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>

                                <div className="p-6 lg:p-8">
                                    {/* Main Content Row */}
                                    <div className="grid lg:grid-cols-4 gap-8 mb-8">
                                        <div className="lg:col-span-3">
                                            <div className="space-y-4">
                                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                        {service.title}
                                                    </span>
                                                    {service.subtitle && (
                                                        <span className="block text-lg font-medium text-gray-600 mt-2">
                                                            {service.subtitle}
                                                        </span>
                                                    )}
                                                </h2>
                                                <p className="text-base text-gray-700 leading-relaxed">
                                                    {service.description}
                                                </p>
                                                {service.additionalDescription && (
                                                    <p className="text-base text-gray-600 leading-relaxed">
                                                        {service.additionalDescription}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Side Image */}
                                        {service.sideImageUrl && (
                                            <div className="lg:col-span-1">
                                                <div className="bg-gray-100 rounded-lg overflow-hidden h-48 lg:h-full shadow-md">
                                                    <img
                                                        src={service.sideImageUrl}
                                                        alt="Service Side Image"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Service Features */}
                                    {service.serviceFeatures && service.serviceFeatures.length > 0 && (
                                        <div className="mb-10">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Service Features</h3>
                                            <div className="grid lg:grid-cols-2 gap-6">
                                                {service.serviceFeatures.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100">
                                                        <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                                                            <span className="bg-blue-600 text-white text-sm font-bold px-2.5 py-1 rounded-full mr-3">
                                                                {featureIndex + 1}
                                                            </span>
                                                            {feature.featureTitle}
                                                        </h4>
                                                        {feature.featurePoints && feature.featurePoints.length > 0 && (
                                                            <ul className="space-y-2">
                                                                {feature.featurePoints.map((point, pointIndex) => (
                                                                    <li key={pointIndex} className="flex items-start">
                                                                        <svg className="w-4 h-4 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <span className="text-sm text-gray-700 leading-relaxed">
                                                                            {point.point}
                                                                        </span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Working Approach Section */}
                                    {service.workingApproach && service.workingApproach.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Working Approach</h3>
                                            <div className="space-y-4">
                                                {service.workingApproach.map((step, stepIndex) => (
                                                    <div key={stepIndex} className="flex items-start p-5 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                                                            {stepIndex + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-base font-semibold text-gray-900 mb-2">
                                                                {step.stepTitle}
                                                            </h4>
                                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                                {step.stepDescription}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Pagination */}
                <div className="mt-12 flex justify-center items-center space-x-4">
                    <button
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        disabled={currentPage === 1 || loading}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>
                    
                    <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-blue-50 border border-blue-200 rounded-lg">
                        Page {currentPage} of {totalPages}
                    </div>
                    
                    <button
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        disabled={currentPage === totalPages || loading}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WebServicesDetails;