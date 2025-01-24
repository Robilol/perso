import Image from 'next/image';
import { shimmer, toBase64 } from '../../lib/utils';
import { motion } from 'framer-motion';
import { childrenAnimation } from '../../lib/motion';
import { getInformation } from '../../fetchers';
import { Spinner } from '../utils';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

const AboutSection = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['information'],
    queryFn: getInformation,
  });

  if (isFetching) {
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 items-center gap-7">
      <div className="col-span-2 lg:col-span-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.2,
          }}
          variants={childrenAnimation}
          className="about-image overflow-hidden rounded-lg"
        >
          <div className="about-image-inner fiximage relative border-10 border-primary border-opacity-20">
            <span className="absolute -top-2.5 left-0 z-10 h-2.5 w-10 animate-ledgerleftright rounded-full bg-gradient-to-r from-transparent to-primary"></span>
            <span className="absolute -bottom-2.5 left-auto top-auto z-10 h-2.5 w-10 animate-ledgerrightleft rounded-full bg-gradient-to-r from-primary to-transparent"></span>
            <span className="absolute -left-2.5 top-auto z-10 h-10 w-2.5 animate-ledgerbottomtop rounded-full bg-gradient-to-t from-transparent to-primary"></span>
            <span className="absolute -right-2.5 left-auto z-10 h-10 w-2.5 animate-ledgertopbottom rounded-full bg-gradient-to-b from-transparent to-primary"></span>
            <Image
              loader={({ src }) => src}
              unoptimized={true}
              src={data.largeImage}
              height={422}
              width={660}
              alt={data.fullName}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(660, 422)
              )}`}
            />
          </div>
        </motion.div>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.4,
          }}
          variants={childrenAnimation}
          className="about-content"
        >
          <h3>
            Salut, je suis <span className="text-primary">{data.fullName}</span>
          </h3>
          <ul className="styledlist">
            {data.firstName && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Prénom{' '}
                </strong>
                : {data.firstName}
              </li>
            )}
            {data.lastName && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Nom{' '}
                </strong>
                : {data.lastName}
              </li>
            )}
            {data.age && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Âge{' '}
                </strong>
                : {dayjs().diff(dayjs(data.birthday), 'year')} ans
              </li>
            )}
            {data.nationality && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Nationalité{' '}
                </strong>
                : {data.nationality}
              </li>
            )}
            {data.languages.length ? (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Langues{' '}
                </strong>
                : {data.languages.join(', ')}
              </li>
            ) : null}
            {data.address && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Adresse{' '}
                </strong>
                : {data.address}
              </li>
            )}
            {data.freelance && (
              <li className="text-lg">
                <strong className="inline-block min-w-[120px] font-medium">
                  Freelance{' '}
                </strong>
                : {data.freelance}
              </li>
            )}
          </ul>
          <a
            href="/CV - Robin Regis - Développeur Front-end Reactjs Nextjs Typescript.pdf"
            className="btn mt-3"
            target="_blank"
          >
            <span>Voir mon CV</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
