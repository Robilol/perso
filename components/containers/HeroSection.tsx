import Image from 'next/image';
import { RiArrowDownLine } from 'react-icons/ri';
import { Link } from 'react-scroll';
import { SocialIcons } from '../elements';
import { shimmer, toBase64 } from '../../lib/utils';
import { motion } from 'framer-motion';
import { childrenAnimation } from '../../lib/motion';
import { getInformation } from '../../fetchers';
import { Spinner } from '../utils';
import TypedText from '../utils/Typed';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

const HeroSection: FC<{
  blurred: boolean
  scroll?: boolean
  typed?: boolean
}> = ({ blurred, scroll = true, typed = true }) => {
  const { data, isFetching } = useQuery({
    queryKey: ['information'],
    queryFn: getInformation,
  });

  if (isFetching) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center py-20 text-center">
        <Spinner />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="herosection relative overflow-hidden">
      {!blurred && (
        <div className="herosection-bg absolute left-0 top-0 h-full w-full"></div>
      )}
      <div
        className={`herosection-content relative z-20 bg-grey-darken  ${
          blurred ? 'bg-opacity-20' : 'bg-opacity-90'
        }`}
      >
        <div className="container relative mx-auto">
          <div className="flex min-h-screen w-full items-center justify-center">
            <div className="herosection-content relative w-full py-20 text-center md:w-3/4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                }}
                variants={childrenAnimation}
                className="absolute left-0 right-0 top-14 md:-top-4"
              >
                <span className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-grey shadow-sm lg:text-lg">
                  Disponible pour de nouvelles opportunités
                </span>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                }}
                variants={childrenAnimation}
                className="herosection-imagewrapper relative mb-5 inline-block overflow-hidden rounded-full align-middle"
              >
                <span className="herosection-imageanimation absolute left-0 top-0 z-10 h-full w-full animate-spin rounded-full bg-gradient-to-tr from-primary to-transparent"></span>
                <div className="herosection-image fiximage relative z-20 flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-full border-6 border-primary border-opacity-10 align-middle">
                  <Image
                    loader={({ src }) => src}
                    unoptimized={true}
                    src={data.thumbImage}
                    alt={data.fullName}
                    height={100}
                    width={100}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(100, 100)
                    )}`}
                  />
                </div>
              </motion.div>
              <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                }}
                variants={childrenAnimation}
                className="mb-5 text-heading"
              >
                <span className="block sm:inline">Salut, je suis</span>{' '}
                {typed ? (
                  <TypedText
                    options={{
                      loop: true,
                      typeSpeed: 100,
                      backSpeed: 20,
                      backDelay: 2000,
                      strings: [
                        data.fullName,
                        'Full Stack Developer',
                        'Next.js Developer',
                        'Node.js Developer',
                        'Typescript Developer',
                      ],
                      className: 'text-primary',
                    }}
                  />
                ) : (
                  <span className="text-primary">{data.fullName}</span>
                )}
              </motion.h1>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.6,
                }}
                variants={childrenAnimation}
                className="lead mb-0"
              >
                {data.bio}
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.8,
                }}
                variants={childrenAnimation}
                className="herosection-socialicons mt-7 text-center"
              >
                <SocialIcons data={data.socialAddress} />
              </motion.div>
            </div>
          </div>
          {scroll ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 1,
              }}
              variants={childrenAnimation}
              className="herosection-bottom absolute bottom-10 left-0 top-auto w-full justify-between text-center"
            >
              <Link
                activeClass="active"
                to="section-about"
                spy={true}
                smooth="easeInQuad"
                offset={-74}
                duration={1000}
                className="cursor-pointer text-xs font-medium uppercase tracking-widest transition-all hover:text-primary"
              >
                <RiArrowDownLine className="inline animate-bounce text-base" />
                <span className="pl-2">Scroll Down</span>
              </Link>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HeroSection
