// components/NewsletterSignup.tsx
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export function NewsletterSignup() {
  
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const templateParams = {
        email: email,
        to_name: 'Subscriber',
        from_name: 'Portfolio Blog',
      };
      
      const response = await emailjs.send(
        'service_tdeuj11', 
        'template_vpea59e', 
        templateParams,
        'Cq1YMJTkTlpQbx_No' // Public key
      );
      
      if (response.status === 200) {
        setStatus({ 
          type: 'success', 
          message: 'Thanks for subscribing! You\'ll receive updates when new articles are published.' 
        });
        setEmail('');
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again later.' 
      });
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-20 bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 sm:p-10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Subscribe to receive notifications when new articles are published.
        </p>
        
        {status.message && (
          <div className={`mb-4 p-3 rounded-lg ${
            status.type === 'success' 
              ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400'
          }`}>
            {status.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="sm:flex justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white transition-all ${
              isSubmitting 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-gray-900 hover:bg-gray-800'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
