import { getInformation, getPortfolioFilters } from '../../fetchers'
import { useQuery } from '@tanstack/react-query'

const PortfolioFilters = ({ currentFilter, filterHandler }) => {
  const { data, isFetching } = useQuery({ queryKey: ['portfolio-filters'], queryFn: getPortfolioFilters })

    if (!data) return null;

    return (
        <div className="portfolio-filters flex flex-wrap justify-center gap-4">
            <button
                className={`btn btn-small ${
                    currentFilter === "" ? "" : "btn-transparent"
                }`}
                onClick={() => filterHandler("")}
            >
                <span>Tout</span>
            </button>
            {data?.map((filter, index) => (
                <button
                    className={`btn btn-small ${
                        currentFilter === filter.value
                            ? "before:invisible"
                            : "btn-transparent"
                    }`}
                    onClick={() => filterHandler(filter.value)}
                    key={index}
                >
                    <span>{filter.title}</span>
                </button>
            ))}
        </div>
    );
};

export default PortfolioFilters;
