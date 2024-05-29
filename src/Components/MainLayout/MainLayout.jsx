import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header'; // Assuming this is your Header component

const MainLayout = ({ setResults, setIsLoading, setIsFetch, setUserData }) => {
  return (
    <>
      <Header setResults={setResults} setIsLoading={setIsLoading} setIsFetch={setIsFetch} setUserData={setUserData} />
      <Outlet />
    </>
  );
};

export default MainLayout;
