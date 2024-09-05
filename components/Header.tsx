
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex  bg-white py-4 shadow-md z-10">
      <div className="max-w-[496px] w-full flex justify-center">
        <Image
          src="/assets/icons/logo-full.webp"
          height={1000}
          width={1000}
          alt="logo"
          className="h-10 w-auto"
        />
      </div>
    </header>
  );
};

export default Header;
