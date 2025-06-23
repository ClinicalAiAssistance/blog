import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";  
import { motion } from "framer-motion";


import { Shield, ChevronDown, Edit, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ShiningText = ({ children, className = "" }) => (
  <span
    className={`relative inline-block bg-gradient-to-r from-pink-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent animate-shine ${className}`}
    style={{
      backgroundSize: "200% auto",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {children}
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 animate-shine-glow" />
  </span>
);

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.2, duration: 0.7, type: "spring" },
  }),
};


const Footer = () => {
  const { user, logout } = useAuth();
  return (
    <footer className="bg-gradient-to-br from-purple-800 via-indigo-700 to-pink-600 text-white py-12 px-6 md:px-20 shadow-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-in">
        {/* Contact Us Section */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h3 className=" text-2xl font-bold mb-4 tracking-wide">
            {" "}
            <ShiningText>Contact Us</ShiningText>{" "}
          </h3>
          <div className="space-y-1 text-sm leading-relaxed">
            <p>
              {" "}
              <span className="font-semibold text-pink-200 animate-shine">
                Clinical AI Assistance
              </span>{" "}
            </p>
            <p>Model Town, Gurugram</p>
            <p>Haryana, 122001, India</p>
            <p>
              {" "}
              Email:{" "}
              <a
                href="mailto:info@clinicalaiassistance.com"
                className="text-pink-200 hover:underline transition-colors duration-200"
              >
                {" "}
                info@clinicalaiassistance.com{" "}
              </a>{" "}
            </p>
            <p>Mob: +91 8017153137</p>
          </div>
          <p className="mt-6 text-xs text-gray-200">
            {" "}
            &copy; 2023–2025{" "}
            <span className="font-bold animate-shine">
              Clinical AI Assistance
            </span>
            . <br />{" "}
            <NavLink className="underline hover:text-white" to="/Tc">
              {" "}
              Terms & Policy{" "}
            </NavLink>{" "}
          </p>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="flex flex-col items-start md:items-center"
        >
          <a
            href="https://www.linkedin.com/company/clinical-ai-assistance/jobs/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold mb-4 hover:text-pink-200 transition-transform transform hover:scale-105"
          >
            {" "}
            <ShiningText>Careers</ShiningText>{" "}
          </a>

          
          <div className="flex items-center space-x-2 md:space-x-4 mb-6 md:mb-8">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 md:space-x-3 text-gray-700 hover:text-indigo-600 bg-white px-3 py-2 md:px-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-md">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Shield size={18} className="text-indigo-600" />
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-2">
                      <span className="font-medium text-sm text-gray-800">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        Administrator
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className="transition-transform group-hover:rotate-180 text-gray-500 ml-1 md:ml-0"
                  />
                </button>

                <div className="absolute right-0 mb-2 w-[calc(100%+20px)] sm:w-56 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 z-10">
                  <div className="px-4 py-1 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <Edit size={16} className="text-indigo-600" />
                      <span className="font-medium text-gray-800">
                        Blog Management
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Manage content and settings
                    </p>
                  </div>
                  <Link
                    to="/admin/blog/new"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <Plus size={16} className="mr-3 text-gray-500" /> Create New
                    Post
                  </Link>
                  <Link
                    to="/admin/blog/manage"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  >
                    <Edit size={16} className="mr-3 text-gray-500" /> Manage
                    Posts
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={logout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Shield size={16} className="mr-3 text-red-500" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 flex items-center space-x-2 px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Shield size={16} />
                <span>Admin Login</span>
              </Link>
            )}
          </div>

          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            {[
              {
                icon: <FaLinkedin size={20} />,
                href: "https://www.linkedin.com/company/clinical-ai-assistance",
              },
              {
                icon: <FaTwitter size={20} />,
                href: "https://twitter.com/_Clinical_AI_/",
              },
              {
                icon: <FaFacebook size={20} />,
                href: "https://www.facebook.com/ClinicalAIAssistance",
              },
              {
                icon: <FaInstagram size={20} />,
                href: "https://www.instagram.com/clinicalaiassistance/",
              },
            ].map(({ icon, href }, idx) => (
              <motion.a
                key={idx}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 16px 4px #f472b6, 0 0 32px 8px #818cf8",
                  backgroundColor: "#f472b6",
                  color: "#fff",
                }}
                className="p-3 rounded-full bg-white text-indigo-800 hover:bg-pink-500 hover:text-white transition duration-300 shadow-md hover:shadow-lg"
                style={{
                  transition: "box-shadow 0.3s, background 0.3s, color 0.3s",
                }}
              >
                {" "}
                {icon}{" "}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="md:text-right"
        >
          <h3 className="text-xl font-bold mb-4">
            {" "}
            <ShiningText>Supported By</ShiningText>{" "}
          </h3>
          <div className="flex flex-col md:items-end items-start gap-4">
            {[
              { src: "/img/Microsoft.jpeg", alt: "Microsoft" },
              { src: "/img/fist2.png", alt: "FIST" },
            ].map(({ src, alt }, idx) => (
              <motion.img
                key={alt}
                src={src}
                alt={alt}
                className="h-16 w-40 rounded-xl transition-all duration-300 shadow"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 24px 4px #f472b6, 0 0 32px 8px #818cf8",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <style>
        {`
          .animate-fade-in { animation: fadeIn 1s ease-in forwards; }
          .animate-slide-up { opacity: 0; transform: translateY(40px); animation: slideUp 0.8s forwards; }
          .delay-100 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.6s; }
          .shining-text::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); animation: shine1 3s infinite; }
          .glow-icon { box-shadow: 0 0 10px rgba(255, 255, 255, 0.4); }
          .glow-img { box-shadow: 0 0 15px rgba(255, 255, 255, 0.3); }
          .glow-input { box-shadow: 0 0 12px rgba(255, 255, 255, 0.3), inset 0 0 6px rgba(255, 255, 255, 0.1); transition: all 0.4s ease; }
          .glow-input:focus { box-shadow: 0 0 16px rgba(255, 192, 203, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.3); }
          .glow-button { box-shadow: 0 0 15px rgba(255, 105, 180, 0.6); position: relative; overflow: hidden; }
          .glow-button::after { content: ''; position: absolute; top: 0; left: -75%; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0)); transform: skewX(-25deg); animation: shine1 2s infinite ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
          @keyframes shine1 { 0% { left: -75%; } 50% { left: 100%; } 100% { left: 100%; } }
          @keyframes shine { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
          .animate-shine { background-image: linear-gradient(90deg, #f472b6 0%, #818cf8 50%, #f472b6 100%); background-size: 200% auto; animation: shine 1.5s linear infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        `}
      </style>
    </footer>
  );
};

export default Footer;