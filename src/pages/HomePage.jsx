import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {
  CheckCircle,
  User,
  AtSign,
  Building,
  MessageSquare,
  Send,
  Mail,
} from 'lucide-react';
import Blog from './BlogPage';
import main from '../assest/Topic.jpeg';
const HomePage = () => {
 


  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const serverLink = process.env.REACT_APP_BACKEND_URL;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !phone) {
      setStatus('Please enter both email and phone.');
      return;
    }

    setIsSubscribing(true);
    setStatus('');

    try {
      const response = await fetch(`${serverLink}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('✅ Thank you for subscribing!');
        setEmail('');
        setPhone('');
      } else if (data.status === 'already_subscribed') {
        setStatus('You are already subscribed.');
      } else {
        throw new Error(data.message || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      setStatus('❌ Failed to subscribe. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    subject: 'General Inquiry',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://formspree.io/f/mrbkyqyw', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            organization: '',
            message: '',
            subject: 'General Inquiry',
          });
        } else {
          throw new Error('Something went wrong on the server. Please try again.');
        }
      } catch (error) {
        setSubmitError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <section className="pt-32 pb-20 bg-white text-gray-800">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-lg"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                Improving Care with Technology
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Clinical AI is no longer the future—it’s the now. Explore
                real-world use cases, research, and expert perspectives here.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/blog"
                  className="btn bg-primary-800 text-white hover:bg-primary-600 shadow-md"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src={main}
                alt="AI in Healthcare"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section bg-gray-50">
        <Blog limit={3} />
        <div className="text-center mt-12">
          <Link to="/blog" className="btn-outline">
            View All Articles
          </Link>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-lg text-gray-600">
              See what medical experts have to say about our clinical AI
              solutions.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I want to express my heartfelt appreciation for the outstanding effort by the Clinical AI Assistance team put into developing the mental health assessment platform...",
                name: "Wellness Center",
                title: "IIT Patna",
                image: "./img/Indian_Institute_of_Technology,_Patna.svg.png",
              },
              {
                quote:
                  "Thrilled to connect with the brilliant minds of Clinical AI Assistance Pvt Ltd at the GPAI Summit 2023! Exciting to see how these talented IITians are harnessing the power of AI...",
                name: "Shivam Gupta",
                title: "Revenue Operations Manager at UTHO",
                image: "./img/shivam_gupta.jpg",
              },
              {
                quote:
                  "I appreciate the effort made by the Clinical AI Assistance team in establishing US, a community for children with Autism. Their dedication has been instrumental...",
                name: "Dr. Viyas",
                title: "Doctor at AIIMS Rishikesh",
                image: "./img/logoDarkUpdated.png",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-6 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Redesigned Subscribe Section --- */}
      <section className="section bg-gradient-to-r from-primary-800 to-indigo-900 text-white">
        <motion.div
          className="container-custom text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Ahead with Our Updates
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-100">
            Join 2,000+ subscribers to receive the latest news on medical
            technologies and AI advancements directly in your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10 w-full text-black"
                  required
                />
              </div>
              <div className="relative w-full">
                <PhoneInput
                  defaultCountry="in"
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  placeholder="Enter phone number"
                  className="w-full [&>input]:w-full [&>input]:h-full [&>input]:pl-3 [&>input]:rounded-md [&>input]:border [&>input]:border-gray-300 focus-within:[&>input]:ring-2 focus-within:[&>input]:ring-primary-600 text-black"
                />
              </div>
              <button
                type="submit"
                className="btn bg-white text-primary-800 hover:bg-gray-100 w-full md:w-auto"
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {status && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-sm ${
                  status.startsWith("✅") ? "text-green-300" : "text-yellow-300"
                }`}
              >
                {status}
              </motion.p>
            )}
          </form>
        </motion.div>
      </section>

      {/* --- Redesigned Contact Form Section --- */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="card p-6 md:p-8 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Send Us a Message</h2>
                <p className="text-gray-600 mt-2">
                  We'd love to hear from you. Please fill out the form below.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. Our team will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <div className="relative">
                        <User
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`pl-10 input-field ${
                            formErrors.name ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <div className="relative">
                        <AtSign
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={`pl-10 input-field ${
                            formErrors.email ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Organization
                      </label>
                      <div className="relative">
                        <Building
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          id="organization"
                          name="organization"
                          type="text"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="Your hospital or company"
                          className="pl-10 input-field"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option>General Inquiry</option>
                        <option>Sales Question</option>
                        <option>Technical Support</option>
                        <option>Partnership Opportunity</option>
                        <option>Request a Demo</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare
                        size={18}
                        className="absolute top-3 left-3 text-gray-400"
                      />
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className={`pl-10 input-field ${
                          formErrors.message ? "border-red-500" : ""
                        }`}
                      ></textarea>
                    </div>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.message}
                      </p>
                    )}
                  </div>
                  <div>
                    {submitError && (
                      <p className="mb-4 text-sm text-center text-red-600">
                        {submitError}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;