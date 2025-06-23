import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-gradient-to-r from-white/90 to-primary-50/90 backdrop-blur-sm py-4'
      }`}
    >
      <nav className="container-custom flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <motion.div
            onClick={() =>
              window.open("https://www.clinicalaiassistance.com/", "_blank")
            }
            aria-label="Homepage Logo"
            className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex items-center justify-center rounded-xl shadow-lg bg-white cursor-pointer transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src="/Img/log_dark_updated.png"
              alt="Logo"
              className="h-[38px] sm:h-[50px] object-contain"
            />
          </motion.div>

          <h1
            onClick={() => navigate("/")}
            className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide cursor-pointer text-[#001C53]"
          >
            Clinical AI Journal
          </h1>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;