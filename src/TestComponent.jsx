import React from 'react';
import { useLocation,useParams } from 'react-router-dom';

// Define TestComponent
const TestComponent = () => {
  // Get the search parameter from the URL
  const search = new URLSearchParams(useLocation().search).get("search");
  console.log("this is search",useLocation().search);
  return (
    <div>
      {/* Display the search parameter */}
      <h1>{search}</h1>
    </div>
  );
};

export default TestComponent;
