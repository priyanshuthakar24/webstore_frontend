import React, { useState } from "react";
import { Search } from 'lucide-react';

const Searchbar = () => {
  const [query, setQuery] = useState("");
  function search(e) {
    e.preventDefault();
    var lowerCase = e.target.value.toLowerCase();
    setQuery(lowerCase);
  }
  return (
    <div className="flex-center  gap-x-5 ml-10">
        <button className="text-white text-xl"><Search/></button>
      <input
        type="text"
        placeholder="Search"
        className="bg-black outline-none text-white"
        onChange={search}
        value={query}
      />
    </div>
  );
};

export default Searchbar;
