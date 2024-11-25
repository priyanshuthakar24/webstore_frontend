import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  // function search(e) {
  //   e.preventDefault();
  //   var lowerCase = e.target.value.toLowerCase();
  //   setQuery(lowerCase);
  // }
  const search = async () => {
    if (query.trim() === "") {
      console.log("Search query is empty");
      return;
    }

    try {
      console.log("Fetching data for:", query);

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
