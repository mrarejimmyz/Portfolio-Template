import Layout from '../../components/Layout';
import AnimatedSection from '../../components/AnimatedSection';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function IPFSDeploymentCaseStudy() {
  const router = useRouter();
  const isHighlighted = router.asPath.includes('#ipfs-deployment');
  
  return (
    <Layout>
      <AnimatedSection id="ipfs-deployment" isHighlighted={isHighlighted}>
        <h1 className="text-3xl font-bold mb-6">Decentralizing My Portfolio with IPFS</h1>
        
        <div className="prose max-w-none">
          <p className="lead">
            Deploying a Next.js application on IPFS presented unique challenges due to how IPFS handles content addressing and path resolution.
            Here&apos;s how I overcame these obstacles to create a fully decentralized portfolio.
          </p>
          
          <h2>The Challenge</h2>
          <p>
            Next.js applications typically expect to be served from a specific domain with server-side capabilities.
            IPFS, however, is content-addressed and doesn&apos;t have traditional servers. This created several issues:
          </p>
          
          <ul>
            <li>Asset paths breaking when accessed through IPFS gateways</li>
            <li>Client-side routing conflicts with IPFS gateway URL structures</li>
            <li>Next.js font optimization requiring specific path configurations</li>
            <li>Content Security Policy restrictions blocking inline scripts</li>
          </ul>
          
          <h2>The Solution</h2>
          
          <h3>1. Configuring Next.js for Static Export</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`// next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  assetPrefix: '/',
}`}</code>
          </pre>
          
          <h3>2. Adding Runtime Path Resolution</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`// pages/_document.js
const scriptTxt = \`
(function () {
  const { pathname } = window.location
  const ipfsMatch = /.*\\/Qm\\w{44}\\//.exec(pathname)
  const base = document.createElement('base')
  base.href = ipfsMatch ? ipfsMatch : '/'
  document.head.append(base)
})();
\`;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{__html: scriptTxt}}/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}`}</code>
          </pre>
          
          <h3>3. Handling Content Security Policy</h3>
          <p>
            To address CSP issues with inline scripts, I added appropriate headers:
          </p>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`<meta 
  http-equiv="Content-Security-Policy" 
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
/>`}</code>
          </pre>
          
          <h3>4. Gateway Configuration</h3>
          <p>
            I set up a dedicated IPFS gateway through Filebase to serve my content:
          </p>
          <div className="my-6">
            <Image 
              src="/gateway-config.png" 
              alt="IPFS Gateway Configuration" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-md"
            />
          </div>
          
          <h2>Results and Lessons</h2>
          <p>
            The final deployment is completely decentralized and accessible through multiple IPFS gateways:
          </p>
          <ul>
            <li>My dedicated gateway: <code>https://inland-coffee-junglefowl.myfilebase.com/</code></li>
            <li>Public IPFS gateway: <code>https://ipfs.io/ipfs/Qma19cD7S3axMZjrXGMEer7SSSrM8JKrt3cLEe3eee4ark/</code></li>
          </ul>
          
          <p>
            Key lessons learned:
          </p>
          <ul>
            <li>Content addressing requires rethinking how assets are referenced</li>
            <li>Static generation is essential for IPFS compatibility</li>
            <li>Runtime path resolution is crucial for proper navigation</li>
            <li>CSP configurations need special attention in decentralized environments</li>
          </ul>
        </div>
      </AnimatedSection>
    </Layout>
  );
}
