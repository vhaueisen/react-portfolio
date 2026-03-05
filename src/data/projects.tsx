import type { ReactNode } from 'react'
import { TbStethoscope, TbAugmentedReality, TbCube, TbBus, TbRocket, TbLink } from 'react-icons/tb'
import type { ProjectItem, ProjectCategory } from '../types'

// Icons must be created here as JSX — React elements, not components.
// TypeScript uses ReactNode so the data file can own them cleanly.

const icons: Record<string, ReactNode> = {
    plantao:     <TbStethoscope size={22} />,
    nestle:      <TbAugmentedReality size={22} />,
    vale:        <TbCube size={22} />,
    bulli:       <TbBus size={22} />,
    rogueunit:   <TbRocket size={22} />,
    realink:     <TbLink size={22} />,
}

export const PROJECTS: ProjectItem[] = [
    {
        id: 'plantao',
        name: 'Plantão 360',
        icon: icons.plantao,
        description:
            'Full-featured React Native app for doctors to manage shifts, finances, and documents. Includes 60+ analytics events, Fastlane CI/CD, and Firebase backend.',
        categories: ['Mobile'] as Exclude<ProjectCategory, 'All'>[],
        tags: ['React Native', 'Expo', 'Firebase', 'Fastlane', 'TypeScript'],
        github:    'https://github.com/vhaueisen/plantao-360',
        playStore: 'https://play.google.com/store/apps/details?id=com.medfinance.plantao360',
        appStore:  'https://apps.apple.com/br/app/plant%C3%A3o-360/id6748095218',
        featured: true,
        color: '#6366f1',
    },
    {
        id: 'nestle-surpresa',
        name: 'Nestlé Surpresa RA',
        icon: icons.nestle,
        description:
            'Branded web AR experience for Nestlé Chocolates — users scan packaging to bring 6 collectible Brazilian wildlife animals to life in augmented reality, paired with a Roblox integration.',
        categories: ['3D / AR', 'Web'] as Exclude<ProjectCategory, 'All'>[],
        tags: ['Web AR', 'React', 'Three.js', 'Nestlé', 'Roblox'],
        link: 'https://amostras.euqueronestle.com.br/sites/chocolates/surpresa-ra/',
        featured: true,
        color: '#22d3ee',
    },
    {
        id: 'vale-ra',
        name: 'Vale RA',
        icon: icons.vale,
        description:
            'Augmented Reality mobile app built in Unity for Vale S.A. — immersive 3D maintenance training with QR code model loading and cross-platform AR support.',
        categories: ['3D / AR'] as Exclude<ProjectCategory, 'All'>[],
        tags: ['Unity', 'C#', 'ARFoundation', 'Android', 'iOS'],
        github: 'https://github.com/vhaueisen/vale-ra',
        featured: true,
        color: '#22d3ee',
    },
    {
        id: 'bulli',
        name: 'Build-Your-Bulli',
        icon: icons.bulli,
        description:
            'Interactive 3D browser configurator for VW T1 camper vans. Real-time model swapping, live WebGL previews, PDF export, and email delivery via Node.js.',
        categories: ['3D / AR', 'Web'] as Exclude<ProjectCategory, 'All'>[],
        tags: ['React', 'Three.js', 'Node.js', 'jsPDF', 'Webpack'],
        github: 'https://github.com/vhaueisen/build-your-bulli',
        featured: true,
        color: '#a855f7',
    },
    {
        id: 'rogueunit',
        name: 'Rogueunit.gg',
        icon: icons.rogueunit,
        description:
            'Official studio website for Rogue Unit — animated carousels, project case studies, and contact forms. Built with SvelteKit and smooth transitions.',
        categories: ['Web'] as Exclude<ProjectCategory, 'All'>[],
        tags: ['SvelteKit', 'TypeScript', 'Vite', 'CSS'],
        github: 'https://github.com/vhaueisen/rogueunit-gg',
        featured: false,
        color: '#6366f1',
    },
    {
        id: 'realink',
        name: 'Realink.io',
        icon: icons.realink,
        description:
            'Institutional SvelteKit website with Gmail OAuth integration, rate-limited quote forms, product pages, and modular content system.',
        categories: ['Web'] as Exclude<ProjectCategory, 'All'>[],
        tags: ['SvelteKit', 'Gmail API', 'OAuth', 'Vite', 'JavaScript'],
        github: 'https://github.com/vhaueisen/realink-io',
        featured: false,
        color: '#22d3ee',
    },
]

export const PROJECT_TABS: ProjectCategory[] = ['All', 'Mobile', '3D / AR', 'Web']
