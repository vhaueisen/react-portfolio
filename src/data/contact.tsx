import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi'
import type { ContactLink } from '../types'

export const CONTACT_LINKS: ContactLink[] = [
  {
    icon: <FiMail size={20} />,
    label: 'Email',
    value: 'vitorhaueisen@gmail.com',
    href: 'mailto:vitorhaueisen@gmail.com',
    color: '#6366f1',
  },
  {
    icon: <FiLinkedin size={20} />,
    label: 'LinkedIn',
    value: 'in/vitor-ruas',
    href: 'https://linkedin.com/in/vitor-ruas',
    color: '#22d3ee',
  },
  {
    icon: <FiGithub size={20} />,
    label: 'GitHub',
    value: 'vhaueisen',
    href: 'https://github.com/vhaueisen',
    color: '#a855f7',
  },
]
