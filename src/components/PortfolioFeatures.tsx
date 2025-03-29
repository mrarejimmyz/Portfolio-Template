// components/PortfolioFeatures.tsx
import { FileText, Zap, Globe, Smartphone, Cpu } from 'lucide-react';

const features = [
  { icon: FileText, title: "Compressed Size", description: "Just 1.8 MB after compression and optimization" },
  { icon: Globe, title: "Fully Decentralized", description: "Deployed on IPFS with no server dependencies" },
  { icon: Zap, title: "Performance Optimized", description: "Lazy loading and asset optimization" },
  { icon: Smartphone, title: "Responsive Design", description: "Seamless experience on both desktop and mobile" },
  { icon: Cpu, title: "Interactive AI Chatbot", description: "Natural language navigation through portfolio sections" },
];

export default function PortfolioFeatures() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why This Portfolio is Special</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex items-center">
              <div className="mr-4">
                <feature.icon className="w-10 h-10 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}