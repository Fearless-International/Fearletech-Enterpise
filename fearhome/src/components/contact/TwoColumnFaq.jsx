import Star2Img from "../../assets/images/v1/star2.png";
import QuestionImg from "../../assets/images/icon/question.svg";

const faqData = {
	faq1: [
		{
			id: crypto.randomUUID(),
			title: "What services does Fearless offer?",
			text: "Fearless provides end-to-end creative and digital solutions including website development, branding, social media management, content creation, and marketing strategy execution.",
		},
		{
			id: crypto.randomUUID(),
			title: "Can Fearless handle full brand development?",
			text: "Yes! We help businesses discover their brand identity through research, design logos, build brand guidelines, and roll out cohesive marketing materials both online and offline.",
		},
		{
			id: crypto.randomUUID(),
			title: "Do you work with companies of all sizes?",
			text: "Absolutely. Whether you're a startup like Kolmesh, a music label like Giant, or a growing company like Aurora Ghana and Fenoutech, our team customizes solutions to fit your needs and budget.",
		},
	],
	faq2: [
		{
			id: crypto.randomUUID(),
			title: "What is Fearless’ project process like?",
			text: "Our process includes discovery & strategy planning, wireframing & UI concepting, full-stack development, QA testing & launch, followed by ongoing support and optimization.",
		},
		{
			id: crypto.randomUUID(),
			title: "How do you ensure quality and timely delivery?",
			text: "We use structured project management, regular updates, and feedback loops to make sure your project stays on track and meets expectations before launch.",
		},
		{
			id: crypto.randomUUID(),
			title: "Can you showcase past work?",
			text: "Yes! We have successfully delivered websites, campaigns, and brand assets for companies like Aurora Ghana, Kolmesh, Giant Music, and Fenoutech. Our portfolio is available upon request.",
		},
	],
};

function TwoColumnFaq() {
	return (
		<div className="section aximo-section-padding">
			<div className="container">
				<div className="aximo-section-title center">
					<h2>
						Frequently Asked Questions
						<span className="aximo-title-animation">
							About Fearless
							<span className="aximo-title-icon">
								<img src={Star2Img} alt="Star" />
							</span>
						</span>
					</h2>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<div className="aximo-accordion-normal-wrap responsive-margin">
							{faqData.faq1.map((faq) => (
								<div key={faq.id} className="aximo-accordion-normal-item">
									<div className="aximo-accordion-normal-icon">
										<img src={QuestionImg} alt="Question" />
									</div>
									<div className="aximo-accordion-normal-data">
										<h3>{faq.title}</h3>
										<p>{faq.text}</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="col-lg-6">
						<div className="aximo-accordion-normal-wrap">
							{faqData.faq2.map((faq) => (
								<div key={faq.id} className="aximo-accordion-normal-item">
									<div className="aximo-accordion-normal-icon">
										<img src={QuestionImg} alt="Question" />
									</div>
									<div className="aximo-accordion-normal-data">
										<h3>{faq.title}</h3>
										<p>{faq.text}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TwoColumnFaq;
