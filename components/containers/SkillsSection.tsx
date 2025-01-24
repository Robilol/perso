import React from 'react';
import Image from 'next/image';
import { childrenAnimation } from '../../lib/motion';
import { motion } from 'framer-motion';

const SkillsSection = () => {
  return (
    <div className="skills-wrapper">
      {/* <TechSkills /> */}
      <div className="py-7"></div>
      {/* <LanguageSkills /> */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.2,
        }}
        variants={childrenAnimation}
        className=""
      >
        <p className="mx-auto max-w-4xl text-center text-xl text-body">
          Cela fait maintenant plusieurs années que je me consacre à la
          programmation, enrichissant mon parcours de divers langages,
          frameworks et outils techniques. Mon expérience s'étend aussi bien au
          Frontend qu'au Backend, m'offrant ainsi une vision globale et la
          capacité d'intervenir sur l'intégralité de la chaîne de développement.
        </p>
        <Image
          loader={({ src }) => src}
          src="https://skillicons.dev/icons?i=apollo,astro,aws,bootstrap,bun,css,cypress,docker,express,figma,git,github,gitlab,graphql,html,idea,js,jest,jquery,laravel,mongodb,mysql,nestjs,nextjs,nodejs,npm,php,planetscale,pnpm,postgres,postman,prisma,react,redux,sass,styledcomponents,sublime,supabase,solidjs,vite,svelte,vercel,symfony,tailwind,webpack&perline=15"
          alt="My Skills"
          className="relative mx-auto mt-20 hidden h-full w-full max-w-6xl md:block"
          width={500}
          height={500}
        />
        <Image
          loader={({ src }) => src}
          src="https://skillicons.dev/icons?i=apollo,astro,aws,bootstrap,bun,css,cypress,docker,express,figma,git,github,gitlab,graphql,html,idea,js,jest,jquery,laravel,mongodb,mysql,nestjs,nextjs,nodejs,npm,php,planetscale,pnpm,postgres,postman,prisma,react,redux,sass,styledcomponents,sublime,supabase,solidjs,vite,svelte,vercel,symfony,tailwind,webpack&perline=6"
          alt="My Skills"
          className="relative mx-auto mt-20 h-full w-full max-w-6xl md:hidden"
          width={500}
          height={500}
        />
        <p className="mx-auto mt-20 max-w-4xl text-center text-xl text-body">
          J'utilise le plus souvent Next.js, TailwindCss, Node.js, PostgreSQl et
          Docker pour livrer les produits le plus rapidement possible.
        </p>
      </motion.div>
    </div>
  );
};

export default SkillsSection
