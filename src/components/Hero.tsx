import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

/**
 * TypeScript interface for Hero component props
 */
interface HeroProps {
  title: string;
  subtitle: string;
  achievements: Array<{
    id: string;
    label: string;
    icon?: string;
  }>;
  ctaLink: string;
  ctaText: string;
  secondaryCtaLink?: string;
  secondaryCtaText?: string;
  profileImage?: string;
}

/**
 * Hero Section Component
 * 
 * Displays the main introduction section with professional details,
 * achievements and call-to-action buttons. Fully responsive with
 * different layouts for mobile and desktop.
 */
export default function Hero({
  title,
  subtitle,
  achievements,
  ctaLink,
  ctaText,
  secondaryCtaLink,
  secondaryCtaText,
  profileImage = '/profile.jpg',
}: HeroProps): React.JSX.Element {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 animate-fade-in">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Profile Image - Visible on larger screens */}
          <div className="hidden md:block md:w-1/3 lg:w-1/4">
            <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-full border-4 border-gray-100 dark:border-gray-800 shadow-lg">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                style={{ objectFit: "cover" }}
                priority
                className="transition-transform hover:scale-105 duration-300"
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            {/* Profile Image - Mobile only */}
            <div className="md:hidden relative w-40 h-40 mx-auto overflow-hidden rounded-full border-4 border-gray-100 dark:border-gray-800 shadow-lg">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            
            {/* Title and Subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-[600px] mx-auto md:mx-0">{subtitle}</p>
            </div>
            
            {/* Achievements */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                >
                  {achievement.icon && <span className="mr-1">{achievement.icon}</span>}
                  {achievement.label}
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link 
                href={ctaLink}
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                {ctaText}
              </Link>
              
              {secondaryCtaLink && secondaryCtaText && (
                <Link 
                  href={secondaryCtaLink}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
