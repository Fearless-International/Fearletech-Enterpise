import { useEffect, useState } from "react";
import { payloadClient } from '../../../lib/payloadClient';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./assetss/SocialMediaManagementDetails.css";
import { BsChevronDown } from "react-icons/bs"; // Icon for accordion
import leftArrowImg from './assetss/left-arrow.png';
import rightArrowImg from './assetss/right-arrow.png';


function SocialMediaManagementDetails() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    useEffect(() => {
        const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await payloadClient.getSocialMediaManagementProjects();
        setProjects(response.docs);
    } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
    } finally {
        setLoading(false);
    }
};

        fetchProjects();
    }, []);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

	const handleImageClick = (src, gallery) => {
		let currentIndex = gallery.indexOf(src);
	
		const modal = document.createElement("div");
		modal.style.position = "fixed";
		modal.style.top = "0";
		modal.style.left = "0";
		modal.style.width = "100%";
		modal.style.height = "100%";
		modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
		modal.style.display = "flex";
		modal.style.justifyContent = "center";
		modal.style.alignItems = "center";
		modal.style.zIndex = "1000";
	
		const img = document.createElement("img");
		img.src = src;
		img.style.maxWidth = "80%";
		img.style.maxHeight = "80%";
		img.style.borderRadius = "10px";
		img.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
	
		const closeButton = document.createElement("button");
		closeButton.innerText = "X";
		closeButton.style.width = "50px";
		closeButton.style.position = "absolute";
		closeButton.style.top = "10px";
		closeButton.style.right = "10px";
		closeButton.style.backgroundColor = "#FF007F";
		closeButton.style.color = "#fff";
		closeButton.style.border = "none";
		closeButton.style.padding = "10px";
		closeButton.style.fontSize = "20px";
		closeButton.style.borderRadius = "20%";
		closeButton.style.cursor = "pointer";
		closeButton.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
		closeButton.addEventListener("click", () => {
			document.body.removeChild(modal);
		});
	
		const leftArrow = document.createElement("button");
		leftArrow.innerHTML = `<img src="${leftArrowImg}" alt="Left Arrow" style="width: 30px; height: auto; max-width: 100%; max-height: 100%; margin-top: -10px;" />`;
		leftArrow.style.position = "absolute";
		leftArrow.style.left = "20px";
		leftArrow.style.top = "50%";
		leftArrow.style.transform = "translateY(-50%)";
		leftArrow.style.backgroundColor = "transparent";
		leftArrow.style.color = "#fff";
		leftArrow.style.border = "none";
		leftArrow.style.fontSize = "20px";
		leftArrow.style.cursor = "pointer";
		leftArrow.style.zIndex = "1001";
		leftArrow.addEventListener("click", () => {
			currentIndex = (currentIndex - 1 + gallery.length) % gallery.length;
			img.src = gallery[currentIndex];
		});
	
		const rightArrow = document.createElement("button");
		rightArrow.innerHTML = `<img src="${rightArrowImg}" alt="Right Arrow" style="width: 30px; height: auto; max-width: 100%; max-height: 100%; margin-top: -10px;" />`;
		rightArrow.style.position = "absolute";
		rightArrow.style.right = "20px";
		rightArrow.style.top = "50%";
		rightArrow.style.transform = "translateY(-50%)";
		rightArrow.style.backgroundColor = "transparent";
		rightArrow.style.color = "#fff";
		rightArrow.style.border = "none";
		rightArrow.style.fontSize = "20px";
		rightArrow.style.cursor = "pointer";
		rightArrow.style.zIndex = "1001";
		rightArrow.addEventListener("click", () => {
			currentIndex = (currentIndex + 1) % gallery.length;
			img.src = gallery[currentIndex];
		});
	
		modal.appendChild(img);
		modal.appendChild(closeButton);
		modal.appendChild(leftArrow);
		modal.appendChild(rightArrow);
		document.body.appendChild(modal);
	};
    if (error) {
        return <p className="error-message">{error}</p>;
    }

    const paginatedProjects = projects.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="aximo-projects-section">
            <div className="container">
                {loading ? (
                    <div className="loader">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>
                        <div className="accordion">
                            {paginatedProjects.map((project, index) => (
                                <div key={index} className="accordion-item">
                                    <div
                                        className={`accordion-header ${activeAccordion === index ? "active" : ""}`}
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <h3>{project.title}</h3>
                                        <BsChevronDown className="arrow-icon" />
                                    </div>

                                    {activeAccordion === index && (
                                        <div className="accordion-content">
                                            <div className="aximo-project-single-thumb">
                                                <LazyLoadImage
                                                    src={project.mainImageUrl}
                                                    alt={project.title || "Main Project"}
                                                    effect="blur"
                                                />
                                            </div>

                                            <div className="aximo-default-content">
                                                <p>{project.description}</p>
                                            </div>

                                            <div className="aximo-project-gallery">
                                                <h4>Gallery</h4>
                                                <div className="gallery-grid">
                                                    {project.gallery?.map((image, index) => (
                                                        <div
                                                            key={index}
                                                            className="gallery-item"
                                                            onClick={() => handleImageClick(image.imageUrl)}
                                                        >
                                                            <LazyLoadImage
                                                                src={image.imageUrl}
                                                                alt={image.alt || `Gallery Image ${index + 1}`}
                                                                effect="blur"
																onClick={() => handleImageClick(image.imageUrl, project.gallery.map(img => img.imageUrl))}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="pagination-controls">
                            <button
                                className="pagination-button"
                                disabled={currentPage === 1 || loading}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                                Previous
                            </button>
                            <span className="pagination-info">
                                Page {currentPage} of {Math.ceil(projects.length / itemsPerPage)}
                            </span>
                            <button
                                className="pagination-button"
                                disabled={currentPage === Math.ceil(projects.length / itemsPerPage) || loading}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default SocialMediaManagementDetails;
