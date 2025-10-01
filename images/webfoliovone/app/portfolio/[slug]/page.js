import Lines from '@/components/common/Lines';
import ProgressScroll from '@/components/common/ProgressScroll';
import Cursor from '@/components/common/cusor';
import LoadingScreen from '@/components/common/loader';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import Script from 'next/script';
import Header from '@/components/project-details/Header';
import Challenge from '@/components/project-details/Challenge';
import Works from '@/components/project-details/Works';
import Solution from '@/components/project-details/Solution';
import Wroks2 from '@/components/project-details/Wroks2';
import Next from '@/components/project-details/Next';

// ✅ Server-only function (static params)
export async function generateStaticParams() {
  try {
    const PAYLOAD_API_URL =
      process.env.VITE_PAYLOAD_URL || 'https://fearletech-enterpise.onrender.com';
    const response = await fetch(`${PAYLOAD_API_URL}/api/feaportfolio?limit=100`);
    const data = await response.json();

    return (
      data.docs?.map((project) => ({
        slug: project.slug,
      })) || []
    );
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// ✅ Helper to fetch project by slug (server-side)
async function getProject(slug) {
  try {
    const PAYLOAD_API_URL =
      process.env.VITE_PAYLOAD_URL || 'https://fearletech-enterpise.onrender.com';
    const response = await fetch(
      `${PAYLOAD_API_URL}/api/feaportfolio?where[slug][equals]=${slug}`,
      { cache: 'no-store' } // use "force-cache" if you want SSG
    );
    const data = await response.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// ✅ Page component (server-side)
export default async function PortfolioPage({ params }) {
  const project = await getProject(params.slug);

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <body>
      <LoadingScreen />
      <Cursor />
      <ProgressScroll />
      <Lines />
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="main-bg o-hidden">
            <Header project={project} />
            <Challenge project={project} />
            <Works project={project} />
            <Solution project={project} />
            <Wroks2 project={project} />
            <Next />
          </main>
          <Footer />
        </div>
      </div>

      <Script src="/assets/js/ScrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/ScrollSmoother.min.js" strategy="beforeInteractive" />
      <Script strategy="beforeInteractive" src="/assets/js/plugins.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/TweenMax.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/charming.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/countdown.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/gsap.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/splitting.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/isotope.pkgd.min.js"></Script>
      <Script
        strategy="beforeInteractive"
        src="/assets/js/imgReveal/imagesloaded.pkgd.min.js"
      ></Script>
      <Script src="/assets/js/scripts.js"></Script>
    </body>
  );
}
