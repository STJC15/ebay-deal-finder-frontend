import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header'; // Assuming this is your Header component

const MainLayout = ({ setResults, setIsLoading, setIsFetch, setUserData, currentUser }) => {
  return (
    <>
      <Header setResults={setResults} setIsLoading={setIsLoading} setIsFetch={setIsFetch} setUserData={setUserData} currentUser={currentUser}/>
      <Outlet />
    </>
  );
};

export default MainLayout;
