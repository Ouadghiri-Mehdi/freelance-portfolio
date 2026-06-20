# Mehdi — Portfolio

Site personnel — Next.js 14 (App Router), React, Three.js pour le fond animé.
Aucune dépendance CSS externe : tout le style est en CSS custom (variables CSS,
pas de Tailwind) injecté directement dans le composant.

## Démarrer en local

```bash
npm install
npm run dev
```

Puis ouvre http://localhost:3000

## Build de production

```bash
npm run build
npm start
```

## Déploiement (Vercel)

Connecte le repo GitHub à Vercel depuis leur dashboard — zéro config nécessaire.

## Stack

- Next.js 14 / React 18
- Three.js (fond WebGL animé)
- Zéro CSS framework — variables CSS dans `STYLES` dans `app/page.js`
- Formulaire de contact via `mailto:` (aucun backend requis)
