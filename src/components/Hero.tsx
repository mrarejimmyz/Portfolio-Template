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
  tertiaryCtaLink?: string;
  tertiaryCtaText?: string;
  contactLinks: Array<{
    href: string;
    label: string;
  }>;
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
  tertiaryCtaLink,
  tertiaryCtaText,
  contactLinks,
  profileImage = '/profile.jpg',
}: HeroProps): React.JSX.Element {
  return (
    <section className="relative isolate mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 px-5 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-12 lg:py-12 animate-fade-in">
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-10">
          {/* Profile Image - Visible on larger screens */}
          <div className="hidden shrink-0 md:block md:w-1/3 lg:w-1/4">
            <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-full border-4 border-white shadow-xl ring-1 ring-slate-200 lg:h-60 lg:w-60">
              <Image
                src={profileImage}
                alt="Ashish Regmi"
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(min-width: 1024px) 240px, 208px"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="min-w-0 flex-1 space-y-5 text-center md:text-left">
            {/* Profile Image - Mobile only */}
            <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-xl ring-1 ring-slate-200 md:hidden">
              <Image
                src={profileImage}
                alt="Ashish Regmi"
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="144px"
              />
            </div>
            
            {/* Title and Subtitle */}
            <div className="space-y-3">
              <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl md:mx-0">{title}</h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg md:mx-0">{subtitle}</p>
              <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-600 sm:text-base md:justify-start">
                {contactLinks.map((contact, index) => (
                  <React.Fragment key={contact.href}>
                    {index > 0 && <span className="text-slate-300" aria-hidden="true">·</span>}
                    <a className="rounded-sm underline-offset-4 hover:text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" href={contact.href}>
                      {contact.label}
                    </a>
                  </React.Fragment>
                ))}
              </p>
            </div>
            
            {/* Achievements */}
            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex min-w-0 items-start gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 text-left text-xs font-medium leading-snug text-slate-700 shadow-sm sm:text-sm"
                >
                  {achievement.icon && <span className="shrink-0">{achievement.icon}</span>}
                  <span className="min-w-0 break-words">{achievement.label}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <Link 
                href={ctaLink}
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                {ctaText}
              </Link>
              
              {secondaryCtaLink && secondaryCtaText && (
                <Link 
                  href={secondaryCtaLink}
                  className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  {secondaryCtaText}
                </Link>
              )}
              {tertiaryCtaLink && tertiaryCtaText && (
                <Link
                  href={tertiaryCtaLink}
                  className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  {tertiaryCtaText}
                </Link>
              )}
            </div>
          </div>
      </div>
    </section>
  );
}
