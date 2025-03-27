
import ContactForm from '../components/ContactForm';
import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Me | Blockchain Developer</title>
        <meta name="description" content="Get in touch with me for blockchain development opportunities and collaborations." />
      </Head>
      
      
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Get In Touch</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <ContactForm />
        </div>
      </main>
    </>
  );
}
