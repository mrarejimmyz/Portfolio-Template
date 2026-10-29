const experience = [
  {
    role: 'Lead Developer',
    company: 'ZKward',
    dates: 'Sep 2025 to Present',
    location: 'Waterloo, Ontario',
    highlights: [
      'Architected and deployed an AI-managed DeFi platform with automated hedging on Sui mainnet, with every agent action recorded on-chain.',
      'Built a six-agent AI risk-orchestration framework that monitors market volatility and adjusts hedging parameters automatically.',
      'Write and optimize secure Move smart contracts; led the protocol rebrand end to end.',
    ],
  },
  {
    role: 'Senior Software Developer',
    company: 'Revolent Group',
    dates: 'Jan 2022 to Aug 2024',
    location: 'Toronto, client placement at Manulife',
    highlights: [
      'Built and customized enterprise backend systems: workflow automation, data models, validation rules, reports, and dashboards for a major financial-services client.',
      'Integrated enterprise systems with external platforms via REST APIs; led data migration and deployments across environments.',
    ],
  },
  {
    role: 'Technical Operator',
    company: 'Shaw Communications',
    dates: 'Mar 2019 to Aug 2020',
    location: '',
    highlights: [
      'Diagnosed and resolved network and service issues remotely using diagnostic tooling.',
      'Automated diagnostic routines so a soft refresh ran instantly when a customer requested it.',
      'Tracked cases through CRM and Netcracker diagnostic tools from report to resolution.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'GamerLink',
    dates: 'Jan 2018 to Dec 2018',
    location: '',
    highlights: ['Developed frontend features with React and React Native.'],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 space-y-7">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-slate-950 sm:text-3xl">Experience</h2>
        <p className="text-slate-600">
          Engineering leadership and software development across AI, backend, and full-stack systems.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {experience.map((job) => (
          <article key={job.company} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {job.role} <span className="text-slate-400">at</span> {job.company}
              </h3>
              <p className="w-fit shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">{job.dates}</p>
            </div>
            {job.location && (
              <p className="mt-2 text-sm text-slate-500">{job.location}</p>
            )}
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-blue-500">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
