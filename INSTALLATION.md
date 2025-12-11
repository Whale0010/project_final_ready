# Guide d'Installation - AMED

## Prérequis

- **Node.js** 18.17.0 ou supérieur
- **npm** 9.0.0 ou supérieur (ou yarn/pnpm)

## Étapes d'Installation

### 1. Extraire le projet

Décompressez le fichier ZIP dans le répertoire de votre choix :

\`\`\`bash
unzip amed-frontend.zip
cd amed-frontend
\`\`\`

### 2. Installer les dépendances

\`\`\`bash
npm install
\`\`\`

### 3. Configurer les variables d'environnement

Copiez le fichier `.env.example` en `.env.local` :

\`\`\`bash
cp .env.example .env.local
\`\`\`

Modifiez `.env.local` selon vos besoins (optionnel pour le développement).

### 4. Démarrer le serveur de développement

\`\`\`bash
npm run dev
\`\`\`

Le site sera accessible sur **http://localhost:3000**

## Scripts Disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Compiler pour la production
- `npm run start` - Lancer le serveur de production
- `npm run lint` - Vérifier la qualité du code
- `npm run format` - Formater le code avec Prettier

## Structure du Projet

\`\`\`
src/
├── app/                 # Pages et layouts Next.js
│   ├── layout.tsx      # Layout racine
│   ├── page.tsx        # Page d'accueil
│   ├── globals.css     # Styles globaux
│   ├── about/          # Page À Propos
│   ├── projects/       # Page Projets
│   ├── events/         # Page Événements
│   ├── blog/           # Page Blog
│   └── contact/        # Page Contact
│
├── components/         # Composants réutilisables
│   ├── layout/         # Composants layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/       # Sections principales
│       ├── Hero.tsx
│       ├── Stats.tsx
│       └── Projects.tsx
│
├── lib/                # Utilitaires
│   ├── utils.ts
│   └── constants.ts
│
├── types/              # Types TypeScript
│   └── index.ts
│
└── hooks/              # Hooks personnalisés
\`\`\`

## Technologies Utilisées

- **Next.js 14** - Framework React moderne
- **TypeScript** - Typage statique
- **Tailwind CSS 3** - Styles utilitaires
- **Framer Motion** - Animations fluides
- **Lucide React** - Icônes vector
- **shadcn/ui** - Composants réutilisables

## Déploiement

### Sur Vercel (Recommandé)

1. Poussez votre code sur GitHub
2. Connectez votre repository à Vercel
3. Cliquez sur "Deploy"

\`\`\`bash
npm run build
npm start
\`\`\`

### Sur un serveur traditionnel

\`\`\`bash
npm run build
npm start
\`\`\`

## Optimisations

- ✅ Score Lighthouse > 90
- ✅ Accessibilité WCAG 2.1 AA
- ✅ SEO optimisé (meta tags, sitemap)
- ✅ Mobile-first responsive design
- ✅ Images optimisées WebP/AVIF
- ✅ Dark mode support
- ✅ Performance optimale

## Support et Aide

Pour toute question ou problème :
- Email: contact@amed.ma
- Consultez la documentation Next.js: https://nextjs.org/docs
- Consultez Tailwind CSS: https://tailwindcss.com/docs

---

Bon développement ! 🚀
