import Image from "next/image";
import Link from "next/link"; // Import Link for client-side navigation

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white py-4 shadow-md z-10 px-6">
      {/* Logo */}
      <div className="flex items-center">
        <div className="max-w-[496px] w-full flex justify-center">
          <Image
            src="/assets/icons/logo-full.webp"
            height={100}
            width={100}
            alt="logo"
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6">
      <Link href="/about" className=" font-bold text-green-500  hover:text-blue-500">
          Get Started
        </Link>
        <Link href="/about" className="text-gray-700 font-bold hover:text-blue-500">
          About Us
        </Link>
        <Link href="/contact" className="text-gray-700 font-bold hover:text-blue-500">
          Contact Us
        </Link>
        <Link href="/faq" className="text-gray-700 font-bold hover:text-blue-500">
          FAQs
        </Link>
      </nav>
    </header>
  );
};

export default Header;
