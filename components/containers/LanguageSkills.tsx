import { motion } from 'framer-motion';
import { getLanguageskills } from '../../fetchers';
import { childrenAnimation } from '../../lib/motion';
import { ProgressBar } from '../elements';
import { useQuery } from '@tanstack/react-query';

const LanguageSkills = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['language-skills'],
    queryFn: getLanguageskills,
  });

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 gap-7">
      {data?.map((skill, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.2 * index,
          }}
          variants={childrenAnimation}
          className="col-span-2 md:col-span-1"
          key={index}
        >
          <ProgressBar skill={skill} />
        </motion.div>
      ))}
    </div>
  );
};

export default LanguageSkills
