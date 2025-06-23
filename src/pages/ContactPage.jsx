import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  AtSign,
  MessageSquare,
  Building,
  CheckCircle
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    subject: 'General Inquiry'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null); // To handle submission errors

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null); 

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://formspree.io/f/mgvyywdn', {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            organization: '',
            message: '',
            subject: 'General Inquiry'
          });
        } else {
          // Handle server-side errors from Formspree
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
    <div className="pt-24 pb-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have questions about our clinical AI solutions? Get in touch with our team for information, demos, or support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          {[
            {
              icon: <Phone size={24} className="text-primary-600" />,
              title: 'Phone',
              content: '+91 8017153137',
              link: 'tel:+91 8017153137'
            },
            {
              icon: <Mail size={24} className="text-primary-600" />,
              title: 'Email',
              content: 'info@clinicalaiassistance.com',
              link: 'mailto:info@clinicalaiassistance.com'
            },
            {
              icon: <MapPin size={24} className="text-primary-600" />,
              title: 'Office',
              content: 'Model Town, Gurugram Haryana, 122001, India',
              link: 'https://maps.app.goo.gl/dmDV1AeXj3gYGYrt8'
            }
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target={item.title === 'Office' ? '_blank' : undefined}
              rel={item.title === 'Office' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.content}</p>
            </motion.a>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <div className="md:col-span-2 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card overflow-hidden h-full"
            >
              <div className="aspect-w-4 aspect-h-3 md:aspect-none md:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28062.42064568826!2d77.018956!3d28.455367!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d182f7e6cbfbd%3A0xbb9053509ff70bfa!2sModel%20Town%2C%20Sector%2011%2C%20Gurugram%2C%20Haryana%20122001!5e0!3m2!1sen!2sin!4v1749880301598!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '300px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ClinicalAI Office Location"
                ></iframe>
              </div>
              <div className="p-4 bg-gray-50">
                <h5 className="font-semibold mb-1">ClinicalAI Headquarters</h5>
                <p className="text-sm text-gray-600">Model Town, Gurugram Haryana, 122001, India</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 order-1 md:order-2"
          >
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`pl-10 input-field ${formErrors.name ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <AtSign size={18} className="text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={`pl-10 input-field ${formErrors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                        Organization
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building size={18} className="text-gray-400" />
                        </div>
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
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Sales Question">Sales Question</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Partnership Opportunity">Partnership Opportunity</option>
                        <option value="Request a Demo">Request a Demo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                        <MessageSquare size={18} className="text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className={`pl-10 input-field ${formErrors.message ? 'border-red-500' : ''}`}
                      ></textarea>
                    </div>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                    )}
                  </div>

                  <div>
                     {submitError && (
                        <p className="mb-4 text-sm text-center text-red-600">{submitError}</p>
                      )}
                    <button
                      type="submit"
                      className="btn-primary flex items-center justify-center"
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
      </div>
    </div>
  );
};

export default ContactPage;