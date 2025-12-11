# AMED - Association Marocaine de l'Environnement et la Digitalisation

Plateforme web moderne pour l'AMED, dédiée à la promotion de la protection environnementale et de la transformation digitale au Maroc.

## Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

1. Clonez le projet
\`\`\`bash
git clone <repo-url>
cd amed-frontend
\`\`\`

2. Installez les dépendances
\`\`\`bash
npm install
\`\`\`

3. Lancez le serveur de développement
\`\`\`bash
npm run dev
\`\`\`

4. Ouvrez [http://localhost:3000](http://localhost:3000)

## Scripts Disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Compiler pour la production
- `npm run start` - Lancer le serveur de production
- `npm run lint` - Exécuter ESLint
- `npm run format` - Formater le code avec Prettier

## Structure du Projet

\`\`\`
src/
├── app/              # Pages et layouts Next.js
├── components/       # Composants réutilisables
├── lib/             # Utilitaires et constantes
├── types/           # Types TypeScript
└── hooks/           # Hooks personnalisés
\`\`\`

## Technologies Utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Framer Motion** - Animations
- **Lucide React** - Icônes

## Optimisations

- Score Lighthouse > 90
- Accessibilité WCAG 2.1 AA
- SEO optimisé
- Mobile-first responsive
- Images optimisées WebP/AVIF

## Déploiement

Le projet est prêt à être déployé sur Vercel:

\`\`\`bash
npm run build
npm start
\`\`\`

## Support

Pour toute question ou problème, contactez contact@amed.ma
