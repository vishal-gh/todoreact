import React, { useState } from "react";
import "./Search.module.css";
import SearchResults from "./SearchResults";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [results, getResults] = useState([]);
  const [keyword, setKeyword] = useState("");

  const formSubmitController = (event) => {
    event.preventDefault();
    fetchSearchResults();
  };

  const onKeywordChangeHandler = (event) => {
    setKeyword(event.target.value);
  };

  const fetchSearchResults = async () => {
    try {
      const response = await axios.post("http://localhost:4000/search/index", {
        keyword: keyword,
      });
      if (!response.statusText === "OK") {
        throw new Error("An error has occured");
      } else {
        getResults(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={formSubmitController}>
        <br></br>
        <input
          type="text"
          id="keyword"
          name="keyword"
          placeholder="Enter keyword"
          onChange={onKeywordChangeHandler}
        ></input>
        <input type="submit" value="Search"></input>
        <br></br>
        <br></br>
      </form>
      <SearchResults items={results}></SearchResults>
      <Link to="/">Home</Link>
    </React.Fragment>
  );
};
export default Search;
