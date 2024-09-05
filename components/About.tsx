import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            <h1 className="text-2xl font-bold mb-4 text-blue-500">
              About <span className="text-green-500">Medix</span>
            </h1>
            <p>Welcome to the About Us page! Here you can learn more about our company and team.</p>

            <div className="text-16-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">© 2024 Medix</p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <video
          src="/assets/onboarding-video.mp4"
          height="1000"
          width="1000"
          className="side-img max-w-[50%]"
          autoPlay
          muted
          loop
        />
      </div>
    </>
  );
};

export default AboutUs;
