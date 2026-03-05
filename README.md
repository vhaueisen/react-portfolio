# Vitor Haueisen — Portfolio

Personal portfolio website for **Vitor Haueisen Costa Ruas**, Senior Mobile Engineer (React Native). Features an interactive 3D scene, animated sections, and a full overview of experience, skills, and projects.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| 3D / WebGL | Three.js, React Three Fiber, Drei, Postprocessing |
| Animations | Framer Motion |
| Styling | Tailwind CSS v4 |
| Icons | React Icons |
| Linting | ESLint + typescript-eslint |

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Top navigation bar
│   └── SpaceBackground.tsx # Animated starfield canvas
└── sections/
    ├── Hero.tsx            # Landing section with 3D astronaut model
    ├── About.tsx           # Brief personal introduction
    ├── Experience.tsx      # Work history timeline
    ├── Skills.tsx          # Technical skills breakdown
    ├── Projects.tsx        # Featured project cards
    └── Contact.tsx         # Contact form / links
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

### Lint

```bash
npm run lint
```

## Contact

- Email: vitorhaueisen@gmail.com
- LinkedIn: [linkedin.com/in/vitor-ruas](https://linkedin.com/in/vitor-ruas)
- GitHub: [github.com/vhaueisen](https://github.com/vhaueisen)
