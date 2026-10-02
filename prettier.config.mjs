import { fileURLToPath } from 'node:url'

/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss'],
  // Chemin absolu : la config est aussi utilisée depuis studio-perso (formatage des types générés)
  tailwindStylesheet: fileURLToPath(new URL('./app/globals.css', import.meta.url)),
}

export default config
