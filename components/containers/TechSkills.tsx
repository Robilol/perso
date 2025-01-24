import { motion } from "framer-motion";
import { getInformation, getTechskills } from '../../fetchers'
import { childrenAnimation } from "../../lib/motion";
import { ProgressCircle } from "../elements";
import { useQuery } from '@tanstack/react-query'

const TechSkills = () => {
  const { data, isFetching } = useQuery({ queryKey: ['tech-skills'], queryFn: getTechskills })


  if (!data) return null;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-7`}>
      {data?.map((skill, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 * index }}
          variants={childrenAnimation}
          className=""
          key={index}
        >
          <ProgressCircle skill={skill} />
        </motion.div>
      ))}
    </div>
  );
};

export default TechSkills;
