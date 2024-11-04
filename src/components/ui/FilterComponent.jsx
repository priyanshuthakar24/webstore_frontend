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
    onFilterChange(filter); // Notify ProductList of the selected filter
  };
  return (
    <>
      <div className="flex items-center gap-5 justify-between mt-20 lg:mt-5 mx-3 lg:mx-16">
        <Select
          showSearch
          size="large"
          variant="filled"
          className="lg:w-[20rem]  "
          //   style={{ width: "20rem" }}
          placeholder="Sort By"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            { value: "1", label: "Jack" },
            { value: "2", label: "Lucy" },
            { value: "3", label: "Tom" },
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
            className="flex gap-3 items-center group justify-center "
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterComponent;
