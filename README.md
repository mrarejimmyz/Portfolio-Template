https://tinyurl.com/MAshishR

# Ashish Regmi, Senior Software Engineer

An interactive Next.js portfolio showcasing Ashish Regmi's software engineering experience, AI and backend projects, and verified awards. The production site is hosted on Vercel.

## 🚀 Features

- **Professional Portfolio Showcase**: Comprehensive display of projects, skills, and achievements
- **Interactive AI Chatbot**: Guides visitors through portfolio sections using natural language
- **Animated Transitions**: Smooth animations when navigating between sections
- **Persistent Chat History**: Conversations saved between page navigations using localStorage
- **Production Hosting**: Deployed on Vercel
- **Responsive Design**: Seamless experience on both desktop and mobile devices
- **Project Showcase**: Detailed case studies and project cards
- **Blog Integration**: MDX support for rich content creation
- **Performance Optimized**: Lazy loading and asset optimization

## 💻 Tech Stack

- Next.js
- React
- TypeScript
- TailwindCSS
- Framer Motion (for animations)
- Vercel

## 🗂️ Project Structure

```
portfolio/
├── public/           # Static assets (images, resume PDF)
├── src/              # Source code directory
│ ├── components/     # Reusable components
│ │ ├── Navbar.tsx
│ │ ├── Hero.tsx
│ │ ├── ProjectCard.tsx
│ │ ├── ChatNavigator.tsx
│ ├── pages/          # Next.js pages
│ │ ├── index.tsx     # Home page
│ │ ├── projects.tsx  # Projects page
│ │ ├── blog.tsx      # Blog page
│ │ └── projects/     # Dynamic routes for case studies
│ │     └── [id].tsx
│ ├── styles/         # Global and component-specific styles
│ │ └── globals.css   # Tailwind configuration
│ ├── hooks/          # Custom React hooks
│ │ └── useLocalStorage.ts
│ ├── utils/          # Utility functions
│ │ └── chatUtils.ts
│ └── data/           # Static data and content
│     └── portfolioData.ts
├── next.config.js    # Next.js configuration
├── tsconfig.json     # TypeScript configuration
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation
```

## 🔍 Portfolio Sections

- **Home**: Professional introduction and key highlights
- **Projects**: Showcase of web3 and blockchain development work
- **Blog**: Technical articles and case studies
- **About**: Professional background and skills
- **Contact**: Ways to get in touch

## 📊 Project Showcase

The portfolio highlights various projects including:

- Solana Transaction Monitor with real-time visualization
- P2PLend, winner of Best Sign in with Worldcoin App at ETHGlobal Waterloo 2023
- HimalayaZkBarrier, Filecoin Privacy Tools winner at HackFS 2024
- Sunya, triple winner at StarkHack 2024 and Starknet Foundation Seed Grant recipient
- Multi-chain NFT deployments across Solana, Base, and StarkWare

## 🤖 Chatbot Navigation

Click the chat icon in the bottom-right corner to start a conversation. Try asking:

- "Tell me about your project experience"
- "Show me your hackathon wins"

## 🛠️ Implementation Highlights

### Persistent Chat History

```javascript
const [messages, setMessages] = useLocalStorage('chatMessages', [
  { role: 'assistant', content: "Hi there! I'm Ashish's portfolio assistant..." },
]);
```

## 🚀 Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## 🌐 Deployment

The production site is deployed on Vercel:

- [Ashish Regmi Portfolio](https://portfolio-template-theta-eight.vercel.app/)

## 🏆 Achievements

- Best Sign in with Worldcoin App, ETHGlobal Waterloo 2023 (P2PLend)
- Filecoin Privacy Tools Winner, HackFS 2024 (HimalayaZkBarrier)
- Three StarkHack 2024 prizes for Sunya, from Herodotus, Voyager, and Dynamic
- Starknet Foundation Seed Grant recipient (Sunya)

## 📬 Contact

- LinkedIn: [Ashish Regmi](https://linkedin.com/in/ashish-regmi)
- GitHub: [ashishregmi](https://github.com/mrarejimmyz)
- Email: [ashish.regmi@zkward.com](mailto:ashish.regmi@zkward.com)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
