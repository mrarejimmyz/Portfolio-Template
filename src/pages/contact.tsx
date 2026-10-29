import ContactForm from '../components/ContactForm';
import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Ashish Regmi | Senior Software Engineer</title>
        <meta name="description" content="Get in touch with me for blockchain development opportunities and collaborations." />
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Get In Touch</h1>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
          Prefer email?{' '}
          <a className="font-semibold text-blue-600 hover:underline" href="mailto:ashish.regmi@zkward.com">
            ashish.regmi@zkward.com
          </a>
          {' · '}
          <a className="font-semibold text-blue-600 hover:underline" href="tel:+15199039794">
            +1 519 903 9794
          </a>
          <br />
          Waterloo, Ontario, Canada. Open to remote roles worldwide.
        </p>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <ContactForm />
        </div>
      </main>
    </>
  );
}
