import { FiZap, FiBox, FiCloud, FiTool } from 'react-icons/fi'
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiExpo,
  SiFirebase,
  SiGithubactions,
  SiAngular,
  SiSvelte,
  SiPython,
  SiUnity,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'
import type { SkillGroup } from '../types'

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Mobile',
    icon: <TbBrandReactNative size={16} />,
    color: '#6366f1',
    skills: [
      { name: 'React Native', icon: <SiReact size={14} /> },
      { name: 'Expo', icon: <SiExpo size={14} /> },
      { name: 'Reanimated', icon: <FiZap size={14} /> },
      { name: 'Gesture Handler', icon: <FiBox size={14} /> },
      { name: 'React Navigation', icon: null },
      { name: 'Feature Flagging', icon: null },
      { name: 'App Store / Play Store', icon: null },
    ],
  },
  {
    label: 'Web / Frontend',
    icon: <FiBox size={16} />,
    color: '#22d3ee',
    skills: [
      { name: 'React', icon: <SiReact size={14} /> },
      { name: 'SvelteKit', icon: <SiSvelte size={14} /> },
      { name: 'Angular', icon: <SiAngular size={14} /> },
      { name: 'Three.js', icon: <FiBox size={14} /> },
      { name: 'Framer Motion', icon: <FiZap size={14} /> },
      { name: 'Tailwind CSS', icon: null },
    ],
  },
  {
    label: 'DevOps & CI/CD',
    icon: <FiTool size={16} />,
    color: '#a855f7',
    skills: [
      { name: 'Fastlane', icon: <FiZap size={14} /> },
      { name: 'GitHub Actions', icon: <SiGithubactions size={14} /> },
      { name: 'EAS Build', icon: <SiExpo size={14} /> },
      { name: 'CI/CD Pipelines', icon: null },
      { name: 'White-label Builds', icon: null },
    ],
  },
  {
    label: 'Backend & Cloud',
    icon: <FiCloud size={16} />,
    color: '#22d3ee',
    skills: [
      { name: 'Firebase', icon: <SiFirebase size={14} /> },
      { name: 'Firestore', icon: <SiFirebase size={14} /> },
      { name: 'Cloud Functions', icon: <SiFirebase size={14} /> },
      { name: 'REST APIs', icon: null },
      { name: 'React Query', icon: null },
      { name: 'Zustand', icon: null },
    ],
  },
  {
    label: 'Languages',
    icon: <FiZap size={16} />,
    color: '#6366f1',
    skills: [
      { name: 'TypeScript', icon: <SiTypescript size={14} /> },
      { name: 'JavaScript', icon: <SiJavascript size={14} /> },
      { name: 'C# / Unity', icon: <SiUnity size={14} /> },
      { name: 'Python', icon: <SiPython size={14} /> },
    ],
  },
]
