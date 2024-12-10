import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8 bg-gradient-to-b from-gray-100 to-gray-300 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">Job Hunt</h2>
            <p className="text-sm text-gray-600 mt-2">
              © 2024 OffcampusJobs. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              "OffcampusJob is a platform connecting job seekers with top opportunities across industries. From IT and marketing to finance and management, we cater to diverse career goals. Employers can post vacancies and discover talented candidates effortlessly."
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            {[
              { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
              { href: "https://twitter.com", label: "Twitter", icon: "twitter" },
              { href: "https://linkedin.com", label: "LinkedIn", icon: "linkedin" },
              { href: "https://github.com", label: "GitHub", icon: "github" },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="transition-transform transform hover:scale-125 hover:text-gray-800"
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-8 h-8 text-gray-600 hover:text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* SVG paths for respective icons */}
                  {link.icon === "facebook" && (
                    <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
                  )}
                  {link.icon === "twitter" && (
                    <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
                  )}
                  {link.icon === "linkedin" && (
                    <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                  )}
                  {link.icon === "github" && (
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34-.45-1.14-1.11-1.45-1.11-1.45-.91-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.89 1.54 2.34 1.1 2.91.84.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.02-2.68-.1-.25-.44-1.27.1-2.64 0 0 .83-.27 2.75 1.03A9.5 9.5 0 0112 7.88c.85.004 1.71.11 2.51.32 1.91-1.3 2.74-1.03 2.74-1.03.55 1.37.2 2.39.1 2.64.63.7 1.02 1.59 1.02 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.93.68 1.87v2.77c0 .26.18.58.69.48A10.01 10.01 0 0024 12c0-5.52-4.48-10-10-10z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
