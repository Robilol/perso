import { motion } from 'framer-motion';
import { getServices } from '../../fetchers';
import { childrenAnimation } from '../../lib/motion';
import { Service } from '../elements';
import { Spinner } from '../utils';
import { useQuery } from '@tanstack/react-query';

const ServicesSection = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
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
    <div className="services-wrapper grid grid-cols-3 gap-7">
      {data?.map((service, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.2 * index,
          }}
          variants={childrenAnimation}
          className="col-span-3 lg:col-span-1"
          key={index}
        >
          <Service service={service} />
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesSection;
