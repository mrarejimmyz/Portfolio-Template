import Head from 'next/head';
import Image from 'next/image';
import { Geist } from "next/font/google";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import ContactForm from '../components/ContactForm';

// Configure Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Define education type
interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  description: string;
}

// Define skill type
interface Skill {
  name: string;
  level: number;
  category: string;
}

/**
 * About Page Component
 * Displays professional background, education, skills, and contact form
 */
export default function About() {
  // Education data
  const education: Education[] = [
    {
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      location: "California, USA",
      year: "2019-2021",
      description: "Specialized in Distributed Systems and Blockchain Technology. Thesis on Gas Optimization Techniques for Smart Contracts."
    },
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Indian Institute of Technology",
      location: "Delhi, India",
      year: "2015-2019",
      description: "Graduated with honors. Research focus on Cryptography and Distributed Computing."
    }
  ];

  // Skills data for visualization
  const skills: Skill[] = [
    { name: "Solidity", level: 95, category: "Blockchain" },
    { name: "Ethereum", level: 90, category: "Blockchain" },
    { name: "Rust", level: 75, category: "Blockchain" },
    { name: "Web3.js", level: 85, category: "Blockchain" },
    { name: "React", level: 90, category: "Frontend" },
    { name: "Next.js", level: 85, category: "Frontend" },
    { name: "TypeScript", level: 88, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "GraphQL", level: 75, category: "Backend" },
    { name: "AWS", level: 70, category: "DevOps" }
  ];

  // Custom colors for skill bars
  const getSkillColor = (category: string): string => {
    switch(category) {
      case "Blockchain": return "#3B82F6"; // blue
      case "Frontend": return "#8B5CF6";   // purple
      case "Backend": return "#10B981";    // green
      case "DevOps": return "#F59E0B";     // amber
      default: return "#6B7280";           // gray
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${geistSans.variable}`}>
      <Head>
        <title>About Me | Blockchain Developer</title>
        <meta name="description" content="Professional background, skills, and education of a specialized blockchain developer and smart contract engineer." />
        <meta property="og:title" content="About Me | Blockchain Developer Portfolio" />
        <meta property="og:description" content="Professional background, skills, and education of a specialized blockchain developer and smart contract engineer." />
      </Head>

  
      
      <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Professional Summary Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-xl border-4 border-gray-100 dark:border-gray-800 shadow-lg">
                <Image
                  src="/profile.jpg"
                  alt="Professional headshot"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              
              {/* Resume Download Button */}
              <div className="mt-6 flex justify-center">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center px-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h1>
              <div className="prose prose-lg dark:prose-invert">
                <p>
                  I am a specialized Blockchain Developer and Smart Contract Engineer with over 5 years of experience in the Web3 space. My expertise lies in building secure, efficient, and user-friendly decentralized applications with a focus on gas optimization and seamless user experiences.
                </p>
                <p>
                  Having worked with leading blockchain protocols including Ethereum, Solana, and Layer 2 solutions, I bring a comprehensive understanding of the blockchain ecosystem to every project. My approach combines technical excellence with practical business insights to create solutions that are not only technically sound but also aligned with real-world needs.
                </p>
                <p>
                  I'm passionate about advancing the adoption of blockchain technology through accessible and secure applications. My work has been recognized at major hackathons, including EthGlobal, StarkHack, and HackFS, where I've won multiple prizes for innovative implementations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Education</h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 py-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <span className="text-gray-600 dark:text-gray-400">{edu.year}</span>
                </div>
                <p className="text-lg">{edu.institution}, {edu.location}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Skills Visualization Section */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Technical Skills</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={skills}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Proficiency']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                  {skills.map((skill, index) => (
                    <Cell key={index} fill={getSkillColor(skill.category)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {['Blockchain', 'Frontend', 'Backend', 'DevOps'].map((category) => (
                <div key={category} className="flex items-center">
                  <div 
                    className="w-4 h-4 mr-2 rounded-full" 
                    style={{ backgroundColor: getSkillColor(category) }}
                  ></div>
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Get In Touch</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
