import Head from "next/head";
import { Element as Section } from "react-scroll";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  PortfoliosSection,
  ResumeSection,
  ServicesSection,
  SkillsSection,
} from "../components/containers";
import { Layout } from "../components/layout";
import { SectionHeading } from "../components/utils";
import { getPostsByPage } from "../lib/blogging";

const Index = ({ posts }) => {
  return (
    <Layout blurred={false}>
      <Head>
        <title>Robin Regis - Développeur Front-end React.js / Next.js / Typescript</title>
      </Head>

      {/* Start Hero Section */}
      <Section name="section-home">
        <HeroSection blurred={false} />
      </Section>
      {/* End Hero Section */}

      {/* Start About Section */}
      <Section
        name="section-about"
        className="about-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading animated={false} title="À propos de moi" watermark="À propos" />
          <AboutSection />
        </div>
      </Section>
      {/* End About Section */}

      {/* Start Skills Section */}
      <Section
        name="section-skills"
        className="skills-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading animated={false} title="Mes compétences" watermark="Compétences" />
          <SkillsSection />
        </div>
      </Section>
      {/* End Skills Section */}

      {/* Start Service Section */}
      <Section
        name="section-service"
        className="services-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading animated={false} title="Mes services" watermark="Services" />
          <ServicesSection />
        </div>
      </Section>
      {/* End Service Section */}

      {/* Start Resume Section */}
      <Section
        name="section-resume"
        className="resume-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading animated={false} title="Mon expérience" watermark="Expérience" />
          <ResumeSection />
        </div>
      </Section>
      {/* End Resume Section */}

      {/* Start Portfolios Section */}
      <Section
        name="section-portfolios"
        className="portfolios-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading animated={false} title="Mes réalisations" watermark="Réalisations" />
          <PortfoliosSection />
        </div>
      </Section>
      {/* End Portfolios Section */}

      {/* Start Reviews Section */}
      {/*<Section*/}
      {/*  name="section-reviews"*/}
      {/*  className="reviews-section pt-24 lg:pt-28 xl:pt-32"*/}
      {/*>*/}
      {/*  <div className="container mx-auto">*/}
      {/*    <SectionHeading animated={false} title="Avis" watermark="Avis" />*/}
      {/*    <ReviewsSection />*/}
      {/*  </div>*/}
      {/*</Section>*/}
      {/* End Reviews Section */}

      {/* Start Blog Section */}
      {/*<Section*/}
      {/*  name="section-blog"*/}
      {/*  className="news-section pt-24 lg:pt-28 xl:pt-32"*/}
      {/*>*/}
      {/*  <div className="container mx-auto">*/}
      {/*    <SectionHeading animated={false} title="Latest Blogs" watermark="Blogs" />*/}
      {/*    <BlogSection posts={posts} />*/}
      {/*  </div>*/}
      {/*</Section>*/}
      {/* End Blog Section */}

      {/* Start Contact Section */}
      <Section
        name="section-contact"
        className="contact-section pt-24 lg:pt-28 xl:pt-32"
      >
        <div className="container mx-auto">
          <SectionHeading animated={false} title="Me contacter" watermark="Contact" />
          <ContactSection />
        </div>
      </Section>
      {/* End Contact Section */}

      <span className="block pb-24 lg:pb-28 xl:pb-32"></span>
    </Layout>
  );
};

export default Index;

export function getStaticProps() {
  const { posts } = getPostsByPage();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
