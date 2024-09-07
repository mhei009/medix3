import { PatientForm } from "@/components/forms/PatientForm";
import Header from "@/components/Header";
import PasskeyModal from "@/components/PasskeyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <>
      <Header />
      <div className="flex h-screen max-h-screen">
        {isAdmin && <PasskeyModal />}
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px] mt-14">
            <PatientForm />
            <div className="text-16-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                © 2024 Medix
              </p>
              <Link href="/?admin=true" className="text-green-500">
                Admin
              </Link>
            </div>
          </div>
        </section>
        <video
          src="/assets/onboarding-video.mp4" // Update with your video source
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

export default Home;
