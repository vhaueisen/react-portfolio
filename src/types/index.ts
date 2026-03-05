import type { ReactNode } from 'react'

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLink {
    label: string
    href: string
}

// ─── About ───────────────────────────────────────────────────────────────────

export interface StatItem {
    value: string
    label: string
}

export interface StoreLink {
    label: string
    sub: string
    icon: ReactNode
    href: string
    color: string
    bg: string
    border: string
    hoverBg: string
    hoverBorder: string
}

// ─── Experience ──────────────────────────────────────────────────────────────

export interface ExperienceItem {
    role: string
    company: string
    period: string
    type: string
    color: string
    bullets: string[]
}

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectCategory = 'All' | 'Mobile' | '3D / AR' | 'Web'

export interface ProjectItem {
    id: string
    name: string
    icon: ReactNode
    description: string
    categories: Exclude<ProjectCategory, 'All'>[]
    tags: string[]
    github?: string
    link?: string
    playStore?: string
    appStore?: string
    featured: boolean
    color: string
}

// ─── Skills ──────────────────────────────────────────────────────────────────

export interface Skill {
    name: string
    icon: ReactNode | null
}

export interface SkillGroup {
    label: string
    icon: ReactNode
    color: string
    skills: Skill[]
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactLink {
    icon: ReactNode
    label: string
    value: string
    href: string
    color: string
}
