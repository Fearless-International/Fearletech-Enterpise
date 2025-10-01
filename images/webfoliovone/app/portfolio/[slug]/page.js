// app/portfolio/[slug]/page.js
import Script from "next/script";
import PortfolioDetailWrapper from "@/components/portfolio/PortfolioDetailWrapper";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Cursor from "@/components/common/cusor";
import Lines from "@/components/common/Lines";
import ProgressScroll from "@/components/common/ProgressScroll";
import LoadingScreen from "@/components/common/loader";
import generateStylesheetObject from "@/common/generateStylesheetsObject";

export async function generateStaticParams() {
  try {
    const PAYLOAD_API_URL =
      process.env.VITE_PAYLOAD_URL ||
      "https://fearletech-enterpise.onrender.com";

    const response = await fetch(
      `${PAYLOAD_API_URL}/api/feaportfolio?limit=100`
    );
    const data = await response.json();

    return (
      data.docs?.map((project) => ({
        slug: project.slug,
      })) || []
    );
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export const metadata = {
  title: "Portfolio Details - webfolio",
  icons: {
    icon: "/assets/imgs/favicon.ico",
    shortcut: "/assets/imgs/favicon.ico",
    other: generateStylesheetObject([
      "/assets/css/plugins.css",
      "/assets/css/style.css",
      "https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap",
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap",
    ]),
  },
};

export default function PortfolioPage({ params }) {
  return (
    <>
      <LoadingScreen />
      <Cursor />
      <ProgressScroll />
      <Lines />
      <Navbar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="main-bg o-hidden">
            <PortfolioDetailWrapper slug={params.slug} />
          </main>
          <Footer />
        </div>
      </div>

      <Script src="/assets/js/ScrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/ScrollSmoother.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/plugins.js" strategy="beforeInteractive" />
      <Script src="/assets/js/TweenMax.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/charming.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/countdown.js" strategy="beforeInteractive" />
      <Script src="/assets/js/gsap.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/splitting.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/isotope.pkgd.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/imgReveal/imagesloaded.pkgd.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/scripts.js" />
    </>
  );
}
