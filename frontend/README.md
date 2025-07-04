# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Démarrage de l'application

Cette application est construite avec React et Vite, et utilise Tailwind CSS pour le style.

### Étapes pour démarrer le projet

1. **Installer les dépendances**

   Après avoir cloné le dépôt, ouvrez un terminal à la racine du projet et lancez la commande suivante pour installer toutes les dépendances nécessaires :

   ```
   npm install
   ```

2. **Installer Tailwind CSS (si ce n'est pas déjà fait)**

    pour voir si il est installer allez dans le packagee.json puis regarder si vous voyez tailwind dans les dépendance 

    "dependencies": {
        "@tailwindcss/vite": "^4.1.11",
        "react": "^19.1.0",
        "react-dom": "^19.1.0",
        "tailwindcss": "^4.1.11"
    },

   Si Tailwind CSS n'est pas installé automatiquement avec les dépendances, vous pouvez l'installer avec :

   ```
   npm install tailwindcss @tailwindcss/vite
   ```
   si possible pour plus d'information https://tailwindcss.com/docs/installation/using-vite

3. **Lancer l'application**

   Pour démarrer le serveur de développement et voir l'application dans votre navigateur, exécutez :

   ```
   npm run dev
   ```

   L'application sera accessible à l'adresse indiquée dans le terminal (généralement http://localhost:5173).

N'hésitez pas à consulter la documentation officielle de Vite, React ou Tailwind CSS pour plus d'informations.
