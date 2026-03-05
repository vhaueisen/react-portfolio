import type { ReactNode } from 'react'
import {
    SiReact, SiTypescript, SiJavascript, SiExpo, SiFirebase,
    SiGithubactions, SiAngular, SiSvelte, SiPython, SiUnity,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'
import { FiZap, FiBox, FiCloud, FiTool } from 'react-icons/fi'
import type { SkillGroup } from '../types'

const r = (node: ReactNode) => node

export const SKILL_GROUPS: SkillGroup[] = [
    {
        label: 'Mobile',
        icon: r(<TbBrandReactNative size={16} />),
        color: '#6366f1',
        skills: [
            { name: 'React Native',          icon: r(<SiReact size={14} />) },
            { name: 'Expo',                  icon: r(<SiExpo size={14} />) },
            { name: 'Reanimated',            icon: r(<FiZap size={14} />) },
            { name: 'Gesture Handler',       icon: r(<FiBox size={14} />) },
            { name: 'React Navigation',      icon: null },
            { name: 'Feature Flagging',      icon: null },
            { name: 'App Store / Play Store', icon: null },
        ],
    },
    {
        label: 'Web / Frontend',
        icon: r(<FiBox size={16} />),
        color: '#22d3ee',
        skills: [
            { name: 'React',         icon: r(<SiReact size={14} />) },
            { name: 'SvelteKit',     icon: r(<SiSvelte size={14} />) },
            { name: 'Angular',       icon: r(<SiAngular size={14} />) },
            { name: 'Three.js',      icon: r(<FiBox size={14} />) },
            { name: 'Framer Motion', icon: r(<FiZap size={14} />) },
            { name: 'Tailwind CSS',  icon: null },
        ],
    },
    {
        label: 'DevOps & CI/CD',
        icon: r(<FiTool size={16} />),
        color: '#a855f7',
        skills: [
            { name: 'Fastlane',          icon: r(<FiZap size={14} />) },
            { name: 'GitHub Actions',    icon: r(<SiGithubactions size={14} />) },
            { name: 'EAS Build',         icon: r(<SiExpo size={14} />) },
            { name: 'CI/CD Pipelines',   icon: null },
            { name: 'White-label Builds', icon: null },
        ],
    },
    {
        label: 'Backend & Cloud',
        icon: r(<FiCloud size={16} />),
        color: '#22d3ee',
        skills: [
            { name: 'Firebase',        icon: r(<SiFirebase size={14} />) },
            { name: 'Firestore',       icon: r(<SiFirebase size={14} />) },
            { name: 'Cloud Functions', icon: r(<SiFirebase size={14} />) },
            { name: 'REST APIs',       icon: null },
            { name: 'React Query',     icon: null },
            { name: 'Zustand',         icon: null },
        ],
    },
    {
        label: 'Languages',
        icon: r(<FiZap size={16} />),
        color: '#6366f1',
        skills: [
            { name: 'TypeScript',  icon: r(<SiTypescript size={14} />) },
            { name: 'JavaScript',  icon: r(<SiJavascript size={14} />) },
            { name: 'C# / Unity',  icon: r(<SiUnity size={14} />) },
            { name: 'Python',      icon: r(<SiPython size={14} />) },
        ],
    },
]
