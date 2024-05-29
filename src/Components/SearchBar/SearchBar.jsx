// import React from 'react';
import './SearchBar.css';
import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation, createSearchParams } from 'react-router-dom';
import axios from 'axios';
const SearchBar = ({setResults, setIsLoading, setIsFetch}) => {
    const [input, setInput] = useState("");
    const [isIMEActive, setIsIMEActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    async function fetchData(value) {
        navigate({ 
            pathname: '/discount/', 
            search: createSearchParams({ search: encodeURIComponent(value) }).toString() 
          });
        console.log("trigged fetch");
        setIsLoading(true);
        await axios.get('https://29skwolphl.execute-api.us-east-1.amazonaws.com/test/pull_ebay_data?search_query=' +String(value))
        .then(response => {
            setIsFetch(true);
            setResults(response.data);
        })
        .catch((error) => {
            setIsFetch(false)
            console.log(error)
        })
        .finally(() => {
            setIsLoading(false);
        });
    };
    const handleChange = (event) => {
        setInput(event.target.value);
    };
    const handleKeyDown = (event) => {
        if(isIMEActive === false && event.key === "Enter" && input !== ""){
            fetchData(input);
        };
    };
    const handleOnclick = () =>{
        if(input !== ""){
            fetchData(input);
        };
    }
    const handleCompositionStart = () => {
        setIsIMEActive(true);
      };
    const handleCompositionEnd = () => {
        setIsIMEActive(false);
    }
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('search');
        if(searchQuery){
            setInput(searchQuery);
            fetchData(searchQuery);
        }
    }, []);
  return (
    <div className="input-wrapper">
        <div className="icon-wrapper" onClick={handleOnclick}>
        <FaSearch />
        </div>
        <input type="search" placeholder="Search" value = {input}
        onChange={(event) => handleChange(event)}
        onKeyDown={handleKeyDown} 
        onCompositionEnd={handleCompositionEnd}
        onCompositionStart={handleCompositionStart}/>
    </div>
  )
};

export default SearchBar