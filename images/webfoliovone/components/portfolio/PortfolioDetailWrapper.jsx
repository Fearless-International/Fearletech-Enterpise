'use client';
import { useEffect, useState } from 'react';
import { payloadClient } from '@/components/lib/payloadClient';
import LoadingScreen from '@/components/common/loader';
import Header from '@/components/project-details/Header';
import Challenge from '@/components/project-details/Challenge';
import Works from '@/components/project-details/Works';
import Solution from '@/components/project-details/Solution';
import Wroks2 from '@/components/project-details/Wroks2';
import Next from '@/components/project-details/Next';

export default function PortfolioDetailWrapper({ slug }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const response = await payloadClient.getPortfolioBySlug(slug);
      setProject(response);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header project={project} />
      <Challenge project={project} />
      <Works project={project} />
      <Solution project={project} />
      <Wroks2 project={project} />
      <Next />
    </>
  );
}