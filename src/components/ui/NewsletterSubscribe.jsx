import { useState } from 'react';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: null,
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus({
        type: 'success',
        message: 'Thank you for subscribing to our newsletter!',
      });
      setEmail('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-grow py-3 px-4 rounded-md border border-primary-400 focus:outline-none focus:ring-2 focus:ring-white"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="btn bg-white text-primary-600 hover:bg-gray-100 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status.message && (
        <div
          className={`mt-3 text-sm ${
            status.type === 'success' ? 'text-green-200' : 'text-red-200'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscribe;
