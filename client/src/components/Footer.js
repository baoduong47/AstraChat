import React from "react";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-white py-4 text-gray-700"
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(5px)",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 text-sm">
          <a
            href="/about"
            className="hover:text-indigo-500 transition duration-300"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="hover:text-indigo-500 transition duration-300"
          >
            Contact
          </a>
          <a
            href="/privacy"
            className="hover:text-indigo-500 transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-indigo-500 transition duration-300"
          >
            Terms of Service
          </a>
        </div>

        {/* Center - Social Media */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition duration-300"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition duration-300"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition duration-300"
          >
            <FaFacebook size={20} />
          </a>
        </div>

        {/* Right - Copyright */}
        <div className="text-xs text-gray-500 mt-4 md:mt-0">
          © 2024 Wisteria. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
