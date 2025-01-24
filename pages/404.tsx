import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { shimmer, toBase64 } from '../lib/utils';

const NotFound = () => {
  return (
    <Layout blurred>
      <Head>
        <title>
          Page non trouvée - Robin Regis - Développeur Front-end React.js /
          Next.js / Typescript
        </title>
      </Head>

      {/* Start NotFound Section */}
      <section className="section-notfound absolute inset-0 flex items-center justify-center">
        <div className="not-found-wrapper pb-24 pt-10 lg:pb-28 lg:pt-14 xl:pb-32 xl:pt-16">
          <div className="container mx-auto">
            <div className="not-found text-center">
              <Image
                loader={({ src }) => src}
                unoptimized={true}
                src="/images/notfound.svg"
                height={700}
                width={700}
                alt="not found"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(500, 500)
                )}`}
              />
              <div>
                <Link href="/" className="btn btn-large">
                  <span>Retourner à l'accueil</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End NotFound Section */}
    </Layout>
  );
};

export default NotFound
