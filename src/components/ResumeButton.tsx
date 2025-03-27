/**
 * Resume Download Button Component
 * A reusable button that links to a downloadable resume PDF
 */
export default function ResumeButton({ className = "" }) {
    return (
      <a
        href="/resume.pdf"
        download
        className={`inline-flex items-center px-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors ${className}`}
        aria-label="Download resume as PDF"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        Download Resume
      </a>
    );
  }
  