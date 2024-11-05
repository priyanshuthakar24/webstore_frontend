import { useState } from "react";
import { Select } from "antd";

import { motion, AnimatePresence } from "framer-motion";
import { ListFilter } from "lucide-react";

const FilterComponent = ({ onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(undefined);
  const handleClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    onFilterChange({ filter, sortOrder: selectedSort }); // Notify ProductList of the selected filter
  };
  const handleSortChange = (value) => {
    setSelectedSort(value);
    onFilterChange({ filter: selectedFilter, sortOrder: value }); // Update sort order and filter together
  };
  const [selectedSort, setSelectedSort] = useState(undefined);
  return (
    <>
      <div className="flex items-center gap-5 justify-between mt-20 lg:mt-5 mx-3 lg:mx-16">
        <Select
          size="large"
          variant="filled"
          className="lg:w-[20rem]  "
          //   style={{ width: "20rem" }}
          placeholder="Sort By"
          optionFilterProp="label"
          onChange={handleSortChange}
          options={[
            { value: "Popular", label: "Popular" },
            { value: "Old", label: "Old" },
            { value: "New", label: "Latest" },
          ]}
        />
        <ListFilter size={35} onClick={handleClick} />
      </div>
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row justify-center gap-5 items-center"
          >
            <div className="flex gap-3 items-center group justify-center ">
              {["Fashion", "Electronics", "Jackets", "Hats"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => handleFilterClick(item)}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  type="button"
                  className={`border-black border-2 px-2 lg:px-10 py-2 ${
                    selectedFilter === item ? "bg-black text-white" : ""
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>
            <div
              className="hover:underline hover:text-blue-600 cursor-pointer font-sans text-lg"
              onClick={() => handleFilterClick(undefined)}
            >
              clear Filter
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterComponent;
