import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 ">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
            <p className="text-sm leading-relaxed">
              YourBrand is dedicated to providing top-notch services. Our mission is to deliver high-quality solutions tailored to your needs.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#"
                  className="hover:text-gray-400 transition duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  className="hover:text-gray-400 transition duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  className="hover:text-gray-400 transition duration-200"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  className="hover:text-gray-400 transition duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
            <p className="text-sm mb-4">Stay connected with us on social media:</p>
            <div className="flex space-x-4">
              <a
                href="/#"
                aria-label="Facebook"
                className="text-gray-300 hover:text-gray-400 transition duration-200"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="/#"
                aria-label="Twitter"
                className="text-gray-300 hover:text-gray-400 transition duration-200"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="/#"
                aria-label="Instagram"
                className="text-gray-300 hover:text-gray-400 transition duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="/#"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-gray-400 transition duration-200"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">
            &copy; 2025 YourBrand. All Rights Reserved. | Terms of Service | Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
