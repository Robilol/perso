import { motion } from "framer-motion";
import { RiBookLine } from "react-icons/ri";
import { getEducationBackground, getInformation } from '../../fetchers'
import { childrenAnimation } from "../../lib/motion";
import { TimelineItem } from "../elements";
import { useQuery } from '@tanstack/react-query'

const EducationTimeline = () => {
  const { data, isFetching } = useQuery({ queryKey: ['education-background'], queryFn: getEducationBackground })

    if (!data) return null;

    return (
        <div className="education-timeline">
            <h4>
                <RiBookLine className="mr-2 inline-block text-primary" />
                Formations
            </h4>
            {data?.map((timeline, index) => (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 * index }}
                    variants={childrenAnimation}
                    className="timeline-wrap"
                    key={index}
                >
                    <TimelineItem timeline={timeline} />
                </motion.div>
            ))}
        </div>
    );
};

export default EducationTimeline;
