import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Search } from "lucide-react";
import { message } from "antd";

const Searchbar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const search = async () => {
    if (query.trim() === "") {
      navigate("/shop");
      message.info("Search query is empty");
      return;
    }

    try {
      // Make your API call here
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/search/product`,
        {
          params: { search: query },
        }
      );
      if (response) {
        // Redirect to the product page with the search results
        navigate("/searchproduct", {
          state: { products: response.data || [] },
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error(error.response.data.message);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };
  return (
    <div className="flex-center  gap-x-5 ml-10">
      <button className="text-white text-xl">
        <Search />
      </button>
      <input
        type="text"
        placeholder="Search"
        className="bg-black outline-none text-white p-2 rounded-r w-full"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Trigger search on Enter key press
        value={query}
      />
    </div>
  );
};

export default Searchbar;
