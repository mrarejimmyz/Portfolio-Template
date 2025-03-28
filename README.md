# Portfolio with Interactive Navigator Chatbot

An interactive Next.js-powered portfolio with an AI chatbot assistant, deployed on IPFS for a fully decentralized experience. This project combines a professional portfolio showcase with an innovative navigation system.

## 🚀 Features

- **Professional Portfolio Showcase**: Comprehensive display of projects, skills, and achievements
- **Interactive AI Chatbot**: Guides visitors through portfolio sections using natural language
- **Animated Transitions**: Smooth animations when navigating between sections
- **Persistent Chat History**: Conversations saved between page navigations using localStorage
- **Fully Decentralized**: Deployed on IPFS with no server dependencies
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
- IPFS (for decentralized hosting)

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
- ZK Proof implementations with WorldCoin integration
- Meta-transaction systems with significant gas optimization
- Multi-chain NFT deployments across Solana, Base, and StarkWare

## 🤖 Chatbot Navigation

Click the chat icon in the bottom-right corner to start a conversation. Try asking:

- "Tell me about your Solana experience"
- "Show me your hackathon wins"
- "Explain your IPFS deployment process"

## 🛠️ Implementation Highlights

### Dynamic Base Tag for IPFS

```javascript
const scriptTxt = `
(function () {
  const { pathname } = window.location
  const ipfsMatch = /.*\\/Qm\\w{44}\\//.exec(pathname)
  const base = document.createElement('base')
  base.href = ipfsMatch ? ipfsMatch : '/'
  document.head.append(base)
})();
`;
```

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
5. Export static files: `npm run export`

## 🌐 Deployment

Deployed on IPFS for decentralized hosting:

- [Public IPFS Gateway](https://bafybeig7psijlskmzikljfqpgqrt6m6g4vf7aoctpocfgkc73yhoqsnfcm.ipfs.dweb.link/)

## 🏆 Achievements

- EthGlobal 2023 Winner: zkAuth with WorldCoin/Sybil integration (92% Sybil attack reduction)
- HackFS Grand Prize: ZK+FHE Storage Solution for Filecoin + Protocol Labs
- StarkHack: Meta transactions with 98% gas reduction

## 📬 Contact

- LinkedIn: [Ashish Regmi](https://linkedin.com/in/ashishregmi)
- GitHub: [ashishregmi](https://github.com/mrarejimmyz)
- Email: [mrarejimmy@jimpsons.org](mailto:mrarejimmy@jimpsons.org)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
