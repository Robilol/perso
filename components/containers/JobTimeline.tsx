import { motion, AnimatePresence } from 'framer-motion'
import { RiBriefcaseLine } from 'react-icons/ri'
import { getJobExperience } from '../../fetchers'
import { childrenAnimation } from '../../lib/motion'
import { TimelineItem } from '../elements'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const JobTimeline = () => {
  const {
    data,
    isFetching
  } = useQuery({
    queryKey: ['job-experience'],
    queryFn: getJobExperience
  })
  const [showAll, setShowAll] = useState(false)

  if (!data) return null

  const initialItems = data.slice(0, 5)
  const additionalItems = data.slice(5)
  const hasMore = data.length > 5

  const additionalItemVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      height: 0,
      transformOrigin: 'top'
    },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transformOrigin: 'top',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="job-experience">
      <h4>
        <RiBriefcaseLine className="mr-2 inline-block text-primary"/>
        Expériences professionnelles
      </h4>

      {/* Premiers 5 éléments avec animation originale */}
      {initialItems.map((timeline, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.2 * index
          }}
          variants={childrenAnimation}
          className="timeline-wrap"
          key={index}
        >
          <TimelineItem timeline={timeline}/>
        </motion.div>
      ))}

      {/* Éléments additionnels avec effet de défilement */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            {additionalItems.map((timeline, index) => (
              <motion.div
                variants={additionalItemVariants}
                className="timeline-wrap"
                key={`additional-${index}`}
              >
                <TimelineItem timeline={timeline}/>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {hasMore && (
        <div
          className="timeline relative block items-start rounded-full border-white border-opacity-20 first:mt-0 md:flex">
            <span
              className="timeline-year absolute top-0 left-12 mt-7 mr-12 min-w-[115px] rounded-full  p-1 text-center text-sm leading-none md:relative md:left-0">
            </span>
          <div className="timeline-right relative border-l-4 border-white border-opacity-20 pt-16 pl-12 md:pt-6">
                <span className="absolute -left-3 top-0 mt-1 h-full w-0 rounded-full bg-white bg-opacity-20">
                  <motion.button
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAll(!showAll)}
                    className="absolute md:-left-16 top-6 z-10 inline-block h-6 w-36 transform rounded-full border-4 border-white border-opacity-20 bg-grey">
          {showAll ? 'Voir moins' : 'Voir plus'}
        </motion.button>
                </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobTimeline