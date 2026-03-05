import { SiGoogleplay, SiAppstore } from 'react-icons/si'
import type { StatItem, StoreLink } from '../types'
import { COLORS } from '../constants/colors'

export const STATS: StatItem[] = [
  { value: '7+', label: 'Years Experience' },
  { value: '2', label: 'App Stores Shipped' },
  { value: '50%', label: 'CI/CD Overhead Cut' },
  { value: '10M+', label: 'Enterprise Users Reached' },
]

export const BIO_PARAGRAPHS: string[] = [
  'Senior Mobile Engineer with 7+ years designing scalable cross-platform architectures using React Native and Expo. Specialized in mobile modernization, white-label platforms, CI/CD automation, and brownfield native integrations.',
  "Former game developer bringing strong expertise in performance optimization, real-time systems, and polished interactive user experiences. I've shipped products for Nestlé, Coca-Cola, and Vale S.A.",
  'Based in Vitória, Brazil — overlapping US time zones, fully remote-ready, and actively pursuing US-based opportunities.',
]

export const ENTERPRISE_CLIENTS: string[] = ['Nestlé', 'Coca-Cola', 'Palmeiras', 'Vale S.A.']

export const STORE_LINKS: StoreLink[] = [
  {
    label: 'Google Play',
    sub: '5+ apps published',
    icon: <SiGoogleplay size={18} />,
    href: 'https://play.google.com/store/apps/dev?id=7255636574877532443&hl=pt',
    color: COLORS.googlePlay,
    bg: 'rgba(52,211,153,0.08)',
    border: 'rgba(52,211,153,0.25)',
    hoverBg: 'rgba(52,211,153,0.15)',
    hoverBorder: 'rgba(52,211,153,0.5)',
  },
  {
    label: 'App Store',
    sub: '5+ apps published',
    icon: <SiAppstore size={18} />,
    href: 'https://apps.apple.com/br/developer/realink-solucoes-em-jogos-eletronicos-ltda/id1563589903',
    color: COLORS.appStore,
    bg: 'rgba(96,165,250,0.08)',
    border: 'rgba(96,165,250,0.25)',
    hoverBg: 'rgba(96,165,250,0.15)',
    hoverBorder: 'rgba(96,165,250,0.5)',
  },
]
