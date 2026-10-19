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
      text: "I can help you explore Ashish's projects, experience, and verified hackathon wins. What would you like to know more about?",
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
          text: `Ashish's verified awards include ${data.wins?.map((w: { title: string }) => w.title).join(', ') || 'multiple hackathon prizes'}.`,
          navigation: {
            text: "View Hackathon Wins",
            path: "/"
          }
        };
      
        case 'ipfs':
            return {
              text: `Ashish's portfolio is hosted on Vercel. An older blog post covers IPFS: ${data.experience}`,
              navigation: {
                text: "View IPFS Case Study",
                path: data.casestudy?.link || "/blog/ipfs-deployment"
              }
            };
          
    default:
      return {
        text: "I can help you explore Ashish's projects, experience, and verified hackathon wins.",
        navigation: null
      };
  }
}
