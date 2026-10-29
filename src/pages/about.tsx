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
  // Skills data for visualization
  const skills: Skill[] = [
    { name: "Solidity", level: 95, category: "Blockchain" },
    { name: "Ethereum", level: 90, category: "Blockchain" },
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
        <title>About Ashish Regmi | Senior Software Engineer</title>
        <meta name="description" content="Ashish Regmi is a Senior Software Engineer building AI systems, backend infrastructure, and full-stack products in Waterloo, Ontario." />
        <meta property="og:title" content="About Ashish Regmi | Senior Software Engineer" />
        <meta property="og:description" content="Ashish Regmi is a Senior Software Engineer building AI systems, backend infrastructure, and full-stack products in Waterloo, Ontario." />
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
                  I am a Senior Software Engineer based in Waterloo, Ontario. I build production AI systems, backend infrastructure, and full-stack products. As Lead Developer at ZKward, I work across multi-chain DeFi, automated hedging, AI risk orchestration, and secure Move smart contracts.
                </p>
                <p>
                  My experience includes enterprise backend systems and REST API integrations for financial services, as well as frontend development with React and React Native. I focus on building reliable systems that solve practical problems.
                </p>
                <p>
                  My work has earned five hackathon prizes across ETHGlobal Waterloo 2023, HackFS 2024, and StarkHack 2024. I am also a Starknet Foundation Seed Grant recipient.
                </p>
              </div>
            </div>
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
