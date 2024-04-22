import Link from 'next/link';
import Image from 'next/image';
import {
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import Container from './container';

const Footer = () => {
  return (
    <footer className="bg-white border-t pt-10 pb-10 mt-10">
      <Container >
        <div className="flex md:flex-row flex-col justify-between items-center gap-6">
          {/* Logo and name */}
          <div className="flex items-center">
            <Image src="/miners-black.svg" alt="Miners Jobs Logo" width={150} height={150} />
            
          </div>
          {/* Navigation links */}
          <div className="flex sm:flex-row flex-col sm:space-x-6 space-x-0 items-center justify-center gap-4">
            <Link href="/jobs">
              <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Jobs</p>
            </Link>
            <Link href="/companies">
              <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Companies</p>
            </Link>
            <Link href="/career-advice">
              <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Career Advice</p>
            </Link>
            <Link href="/contact-us">
              <p className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Contact Us</p>
            </Link>
          </div>
          {/* Social media icons */}
          <div className="flex items-center space-x-4">
            <Link href="https://www.linkedin.com">
              <p className="text-gray-600 hover:text-blue-500 transition duration-150 ease-in-out">
                <Linkedin size={24} />
              </p>
            </Link>
            <Link href="https://www.facebook.com">
              <p className="text-gray-600 hover:text-blue-700 transition duration-150 ease-in-out">
                <Facebook size={24} />
              </p>
            </Link>
            <Link href="https://www.instagram.com">
              <p className="text-gray-600 hover:text-pink-500 transition duration-150 ease-in-out">
                <Instagram size={24} />
              </p>
            </Link>
            <Link href="https://www.twitter.com">
              <p className="text-gray-600 hover:text-blue-400 transition duration-150 ease-in-out">
                <Twitter size={24} />
              </p>
            </Link>
          </div>
        </div>
        {/* Bottom text links */}
        <div className="flex sm:flex-row flex-col gap-4 justify-between items-center mt-10 text-gray-600">
          <p>© 2024 Miners Jobs. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="/terms-of-service">
              <p className="hover:text-gray-900 transition duration-150 ease-in-out">Terms of Service</p>
            </Link>
            <Link href="/privacy-policy">
              <p className="hover:text-gray-900 transition duration-150 ease-in-out">Privacy Policy</p>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
