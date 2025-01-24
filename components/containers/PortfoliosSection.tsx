import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { getPortfolios } from '../../fetchers';
import { Portfolio } from '../elements';
import { PortfolioFilters, Spinner } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { Project } from '../../types'

const PortfoliosSection = () => {
  // Initialiser avec un tableau vide plutôt que undefined
  const [visiblePortfolios, setVisiblePortfolios] = useState<Project[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data, isFetching } = useQuery({
    queryKey: ['portfolios'],
    queryFn: getPortfolios,
  });

  useEffect(() => {
    // S'assurer que data existe et est un tableau
    if (Array.isArray(data)) {
      setVisiblePortfolios(data.slice(0, 6));
    }
  }, [data]);

  // Portfolio Filter function
  const handleFilter = useCallback(
    (value: string) => {
      setCurrentFilter(value);
      if (!Array.isArray(data)) return; // Protection supplémentaire

      if (value === '') {
        setVisiblePortfolios(data.slice(0, pageNumber * 6));
      } else {
        setVisiblePortfolios(
          data
            .slice(0, pageNumber * 6)
            .filter((portfolio) => portfolio.filters.includes(value))
        );
      }
    },
    [data, pageNumber]
  );

  // Load more function
  const handleLoadmore = useCallback(() => {
    if (!Array.isArray(data)) return; // Protection supplémentaire

    setPageNumber((prevNumber) => prevNumber + 1);
    if (currentFilter === '') {
      setVisiblePortfolios(data.slice(0, (pageNumber + 1) * 6));
    } else {
      setVisiblePortfolios(
        data
          .slice(0, (pageNumber + 1) * 6)
          .filter((portfolio) => portfolio.filters.includes(currentFilter))
      );
    }
  }, [currentFilter, data, pageNumber]);

  if (isFetching) {
    return (
      <div className="block py-20 text-center">
        <Spinner />
      </div>
    );
  }

  if (!data) return null;

  return (
    <>
      <PortfolioFilters
        currentFilter={currentFilter}
        filterHandler={handleFilter}
      />
      <motion.div layout className="mt-12 grid grid-cols-6 gap-7">
        {Array.isArray(visiblePortfolios) && visiblePortfolios.map((portfolio) => (
          <motion.div
            layout
            exit={{ scale: 0 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.4,
            }}
            className="col-span-6 sm:col-span-3 lg:col-span-2"
            key={portfolio.id}
          >
            <Portfolio portfolio={portfolio} />
          </motion.div>
        ))}
      </motion.div>
      {visiblePortfolios.length < (data?.length ?? 0) && (
        <div className="mt-12 text-center">
          <button className="btn btn-small" onClick={handleLoadmore}>
            <span>Voir plus</span>
          </button>
        </div>
      )}
    </>
  );
};

export default PortfoliosSection;
