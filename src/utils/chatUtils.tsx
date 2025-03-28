// utils/chatUtils.tsx
import { portfolioData, PortfolioData } from '../data/portfolioData';

interface RelevantContent {
  section: string;
  data: PortfolioData;
  match: string;
}

export function findRelevantContent(message: string): RelevantContent | null {
  const lowerMsg = message.toLowerCase();
  
  for (const [section, data] of Object.entries(portfolioData)) {
    if (data.keywords && data.keywords.some((keyword: string) => lowerMsg.includes(keyword))) {
      return {
        section,
        data,
        match: data.keywords.find((keyword: string) => lowerMsg.includes(keyword)) || ''
      };
    }
  }
  
  return null;
}

interface ResponseData {
  text: string;
  navigation: { text: string; path: string } | null;
}

export function generateResponse(relevantContent: RelevantContent | null): ResponseData {
  if (!relevantContent) {
    return {
      text: "I can help you explore Ashish's Solana projects, hackathon wins, or IPFS deployment process. What would you like to know more about?",
      navigation: null
    };
  }
  
  const { section, data } = relevantContent;
  
  switch (section) {
    case 'solana':
      return {
        text: `Ashish has extensive Solana experience: ${data.experience}`,
        navigation: {
          text: "View Solana Projects",
          path: "/projects#solana"
        }
      };
      case 'hackathons':
        return {
          text: `Ashish has won several prestigious hackathons, including ${data.wins?.map((w: { title: string }) => w.title).join(', ') || 'various competitions'}.`,
          navigation: {
            text: "View Hackathon Wins",
            path: "/awards"
          }
        };
      
        case 'ipfs':
            return {
              text: `Ashish recently deployed this portfolio on IPFS: ${data.experience}`,
              navigation: {
                text: "View IPFS Case Study",
                path: data.casestudy?.link || "/blog/ipfs-deployment"
              }
            };
          
    default:
      return {
        text: "I can help you explore Ashish's portfolio. Ask me about his Solana experience, hackathon wins, or IPFS deployment process.",
        navigation: null
      };
  }
}
