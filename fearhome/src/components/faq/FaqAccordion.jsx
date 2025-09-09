import Star2Img from "../../assets/images/v1/star2.png";

function FaqAccordion() {
	return (
		<div className="section aximo-section-padding3">
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						<span className="aximo-title-animation">
							These FAQs help
							<span className="aximo-title-icon">
								<img src={Star2Img} alt="Star" />
							</span>
						</span>
						clients learn about us
					</h2>
				</div>

				<div className="accordion aximo-accordion-wrap" id="aximo-accordion">
					{/* SERVICES */}
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
								What services does Fearless offer?
							</button>
						</h3>
						<div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								We provide full creative, branding, and digital solutions. Our services include website design & development, 
								UI/UX interfaces, photography, graphic design, video production, content creation, social media management, 
								software development, and marketing campaigns. Our goal is to offer a 360° solution that covers every stage of 
								your business growth.
							</div>
						</div>
					</div>

					{/* INDUSTRIES */}
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
								What industries or clients have you worked with?
							</button>
						</h3>
						<div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								We work across multiple industries including seafood (Aurora Ghana), entertainment (Giant Music), 
								technology & cybersecurity (Fenoutech), corporate training (Kolmesh Ltd), and lifestyle brands. 
								Our ability to adapt allows us to deliver solutions tailored to the needs of any business.
							</div>
						</div>
					</div>

					{/* PROCESS */}
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
								What is your working process like?
							</button>
						</h3>
						<div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								Our approach is structured and transparent: <br />
								<b>1.</b> Discovery & Strategy Planning – We research and define goals with you.<br />
								<b>2.</b> Design & Concept Development – We create wireframes, UI concepts, and creative directions.<br />
								<b>3.</b> Development & Implementation – We build, integrate, and test all features.<br />
								<b>4.</b> QA Testing & Launch – We ensure quality before going live.<br />
								<b>5.</b> Post-Launch Optimization – We provide support, updates, and marketing campaigns to keep you ahead.
							</div>
						</div>
					</div>

					{/* PORTFOLIO */}
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
								Can we see examples of your work?
							</button>
						</h3>
						<div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								Absolutely! We have an extensive portfolio showcasing websites, social media campaigns, 
								branding projects, and video content for companies like Aurora Ghana, Giant Music, and Fenoutech. 
								You can view them on our website or request a curated portfolio based on your project type.
							</div>
						</div>
					</div>

					{/* PRICING */}
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive">
								How much do your services cost?
							</button>
						</h3>
						<div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								Our pricing is flexible and depends on the project scope. We provide a transparent cost breakdown 
								for design, development, printing, branding, and marketing materials so you know exactly what you are paying for. 
								Custom packages can be created to suit your budget and goals.
							</div>
						</div>
					</div>

					{/* REVISIONS */}
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix">
								How do you handle revisions and feedback?
							</button>
						</h3>
						<div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								We prioritize collaboration. During each phase, we share updates for your feedback. 
								We offer structured revision rounds to ensure your satisfaction before finalizing deliverables.
							</div>
						</div>
					</div>

					{/* TIMELINE */}
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven">
								How long does a project take?
							</button>
						</h3>
						<div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								Timelines depend on project size and complexity. A branding project may take 2-4 weeks, 
								while a full website design and development project could take 6-10 weeks. 
								We provide detailed timelines after our discovery phase.
							</div>
						</div>
					</div>

					{/* SUPPORT */}
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight">
								Do you offer support after project completion?
							</button>
						</h3>
						<div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								Yes! We offer ongoing maintenance, content updates, security monitoring, and marketing campaigns 
								to keep your brand relevant and growing even after the project is delivered.
							</div>
						</div>
					</div>

					{/* PROMOTIONS */}
					<div className="accordion-item">
						<h3 className="accordion-header">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine">
								Do you run promotions or discounts?
							</button>
						</h3>
						<div id="collapseNine" className="accordion-collapse collapse" data-bs-parent="#aximo-accordion">
							<div className="accordion-body">
								Yes, we announce special promotions and 
								discount codes through flyers, website campaigns, and social media to engage customers 
								and drive more sales.
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

export default FaqAccordion;
