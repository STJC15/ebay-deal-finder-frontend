import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header'; // Assuming this is your Header component

const MainLayout = ({ setResults, setIsLoading, setIsFetch }) => {
  return (
    <>
      <Header setResults={setResults} setIsLoading={setIsLoading} setIsFetch={setIsFetch} />
      <Outlet />
    </>
  );
};

export default MainLayout;
