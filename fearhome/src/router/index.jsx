import { createBrowserRouter } from "react-router-dom";
import LayoutEight from "../components/layout/LayoutEight.jsx";
import LayoutFive from "../components/layout/LayoutFive.jsx";
import LayoutFour from "../components/layout/LayoutFour.jsx";
import LayoutOne from "../components/layout/LayoutOne.jsx";
import LayoutSeven from "../components/layout/LayoutSeven.jsx";
import LayoutSix from "../components/layout/LayoutSix.jsx";
import LayoutThree from "../components/layout/LayoutThree.jsx";
import LayoutTwo from "../components/layout/LayoutTwo.jsx";
import Layout from "../components/layout/index.jsx";
import ErrorPage from "../error-page";
import AboutUs from "../page/AboutUs";
import ContactUs from "../page/ContactUs";
import Pricing from "../page/Pricing";
import Reset from "../page/auth/ResetPassword.jsx";
import SignIn from "../page/auth/SignIn";
import SignUp from "../page/auth/SignUp";
import BlogGridPage from "../page/blog/BlogGridPage.jsx";
import BlogPage from "../page/blog/BlogPage.jsx";
import SingleBlogPage from "../page/blog/SingleBlog.jsx";
import HomeFive from "../page/home/HomeFive.jsx";
import HomeFour from "../page/home/HomeFour.jsx";
import HomeOne from "../page/home/HomeOne.jsx";
import HomeSeven from "../page/home/HomeSeven.jsx";
import HomeSix from "../page/home/HomeSix.jsx";
import HomeThree from "../page/home/HomeThree.jsx";
import HomeTwo from "../page/home/HomeTwo.jsx";
import PortfolioOneColumn from "../page/portfolio/PortfolioOneColoum";
import PortfolioTwoColumn from "../page/portfolio/PortfolioTwoColumn";
import SinglePortfolio from "../page/portfolio/SinglePortfolio";
import WebDesignDevelopment from "../page/portfolio/WebDesignDevelopment";
import LogoBranding from "../page/portfolio/LogoBranding";
import Service from "../page/service";
import SingleService from "../page/service/SingleService.jsx";
import Team from "../page/team";
import SingleTeam from "../page/team/SingleTeam.jsx";
import CommingSoon from "../page/utility/CommingSoon.jsx";
import Faq from "../page/utility/Faq.jsx";
import TestimonialPage from "../page/utility/Testimonial.jsx";
import VideoEditingAnimation from "../page/portfolio/VideoEditingAnimation.jsx";
import CreativeBranding from "../page/portfolio/CreativeBranding.jsx";
import Smm from "../page/portfolio/Smm.jsx";
import ContentCreation from "../page/portfolio/ContentCreation.jsx";
import WebServices from "../page/service/WebServices.jsx";
import VerificationSent from '../components/auth/VerificationSent';
import VerifyEmail from '../components/auth/VerifyEmail';
import VideoServices from "../page/service/VideoServices.jsx";
import CreativeBrandingServices from "../page/service/CreativeBrandingServices.jsx";
import UIUXServices from "../page/service/UIUXServices.jsx";
import MobileAppDevelopmentServices from "../page/service/MobileAppDevelopmentServices.jsx";
import SoftwareDevelopmentServices from "../page/service/SoftwareDevelopmentServices.jsx";
import DatabaseCreationandManagementServices from "../page/service/DatabaseCreationandManagementServices.jsx";
import PhotographyGraphicDesigningContentCreationServices from "../page/service/PhotographyGraphicDesigningContentCreationServices.jsx";
import SocialMediaManagementServices from "../page/service/SocialMediaManagementServices.jsx";
export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <LayoutOne />,
				children: [
					{
						path: "/",
						element: <HomeOne />,
					},
					{
						path: "/about-us",
						element: <AboutUs />,
					},
					{
						path: "/contact-us",
						element: <ContactUs />,
					},
					{
						path: "/faq",
						element: <Faq />,
					},

					{
						path: "/testimonial",
						element: <TestimonialPage />,
					},

					{
						path: "/pricing",
						element: <Pricing />,
					},
					{
						path: "/blog",
						element: <BlogPage />,
					},
					{
						path: "/single-blog",
						element: <SingleBlogPage />,
					},
					{
						path: "/blog-grid",
						element: <BlogGridPage />,
					},
					{
						path: "/service",
						element: <Service />,
					},
					{
						path: "/single-service",
						element: <SingleService />,
					},
					{
						path: "/web-services",
						element: <WebServices />,
					},
					{
						path: "/video-services",
						element: <VideoServices />,
					},
					{
						path: "/creative-branding-services",
						element: <CreativeBrandingServices />,
					},
					{
						path: "/uiux-interfaces",
						element: <UIUXServices />,
					},
					{
						path: "/mobile-app-development",
						element: <MobileAppDevelopmentServices />,
					},
					{
						path: "/software-development",
						element: <SoftwareDevelopmentServices />,
					},
					{
						path: "/database-creation-and-management",
						element: <DatabaseCreationandManagementServices />,
					},
					{
						path: "/pgc",
						element: <PhotographyGraphicDesigningContentCreationServices />,
					},
					{
						path: "/social-media-management",
						element: <SocialMediaManagementServices />,
					},
					{
						path: "/team",
						element: <Team />,
					},
					{
						path: "/single-team",
						element: <SingleTeam />,
					},
					{
						path: "/portfolio-one",
						element: <PortfolioOneColumn />,
					},
					{
						path: "/portfolio-two",
						element: <PortfolioTwoColumn />,
					},
					{
						path: "/single-portfolio",
						element: <SinglePortfolio />,
					},
					{
						path: "/web-design-development",
						element: <WebDesignDevelopment />,
					},
					{
						path: "/video-editing-and-animation",
						element: <VideoEditingAnimation />,
					},
					{
						path: "/creative-branding",
						element: <CreativeBranding />,
					},
					{
						path: "/social-media-management",
						element: <Smm />,
					},
					{
						path: "/content-creation",
						element: <ContentCreation />,
					},
					{
						path: "/logo-branding",
						element: <LogoBranding />,
					},
					{
						path: "*",
						element: <ErrorPage />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutTwo />,
				children: [
					{
						path: "/home-two",
						element: <HomeTwo />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutThree />,
				children: [
					{
						path: "/home-three",
						element: <HomeThree />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutFour />,
				children: [
					{
						path: "/home-four",
						element: <HomeFour />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutFive />,
				children: [
					{
						path: "/home-five",
						element: <HomeFive />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutSix />,
				children: [
					{
						path: "/home-six",
						element: <HomeSix />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutSeven />,
				children: [
					{
						path: "/home-seven",
						element: <HomeSeven />,
					},
				],
			},
			{
				path: "/",
				element: <LayoutEight />,
				children: [
					{
						path: "/coming-soon",
						element: <CommingSoon />,
					},
					{
						path: "/reset-password",
						element: <Reset />,
					},
					{
						path: "/sign-up",
						element: <SignUp />,
					},
					{
						path: "/sign-in",
						element: <SignIn />,
					},
					{
						path: "/verification-sent",
						element: <VerificationSent />,
					},
					{
						path: "/verify-email",
						element: <VerifyEmail />,
					}
				],
			},
		],
	},
]);
