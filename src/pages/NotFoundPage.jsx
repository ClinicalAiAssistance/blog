import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 flex items-center">
      <div className="container-custom max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <Brain size={64} className="text-primary-600" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>

          <p className="text-lg text-gray-600 mb-10">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary flex items-center justify-center">
              <Home size={18} className="mr-2" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline flex items-center justify-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
