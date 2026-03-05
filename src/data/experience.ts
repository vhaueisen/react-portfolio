import { COLORS } from '../constants/colors'
import type { ExperienceItem } from '../types'

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Mobile Developer',
    company: 'Geoforce',
    period: 'Sep 2025 – Present',
    type: 'Remote',
    color: COLORS.indigo,
    bullets: [
      "Architected the company's white-label platform: single codebase, multiple branded apps, 50% reduction in dev overhead.",
      'Automated multi-flavor Fastlane pipeline for code signing, environment config, and Play/App Store deployment.',
      'Led React Native 0.74 → 0.82 migration with zero business disruption.',
      'Directed migration from bare RN workflow to Expo managed workflow.',
    ],
  },
  {
    role: 'Mobile Developer',
    company: 'Slate Teams',
    period: 'Mar 2025 – Sep 2025',
    type: 'Remote',
    color: COLORS.cyan,
    bullets: [
      'Led brownfield React Native integration into production Swift/Kotlin apps, designing the bridging strategy.',
      'Implemented feature flagging for controlled rollouts and safer experimentation.',
      'Developed robust E2E test coverage across native and RN components.',
      'Leveraged Cursor and AI-assisted workflows to accelerate implementation.',
    ],
  },
  {
    role: 'Software Engineer & Co-Founder',
    company: 'Rogue Unit',
    period: 'Feb 2020 – Jul 2025',
    type: 'Remote',
    color: COLORS.purple,
    bullets: [
      'Led a team of 4 developers, mentoring engineers and coordinating delivery across concurrent client projects.',
      'Directed interactive web & mobile experiences for Nestlé, Coca-Cola, and Palmeiras.',
      'Designed scalable front-end architectures and animation systems inspired by game dev.',
      'Structured CI/CD pipelines and deployment workflows for multi-platform projects.',
    ],
  },
  {
    role: 'Mobile & Web Developer',
    company: 'IndustriALL',
    period: 'May 2022 – Oct 2022',
    type: 'Vitória, Brazil',
    color: COLORS.cyan,
    bullets: [
      'Refactored Angular/Ionic app — 50% performance improvement, 90% faster load times.',
      'Created CI/CD pipelines and deployed the solution on-site.',
    ],
  },
  {
    role: 'Mobile Developer Intern',
    company: 'Vale S.A.',
    period: 'Oct 2019 – Aug 2021',
    type: 'Vitória, Brazil',
    color: COLORS.indigo,
    bullets: [
      'Developed and deployed Vale RA — a gamified AR mobile training app for field maintenance.',
      'Built GC Digital, a web learning platform with dynamic content features.',
    ],
  },
]
