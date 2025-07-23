import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/teacher/Sidebar';

const Teacher = () => {
  return (
    <div className="flex flex-col text-default">
     
      <div className="flex flex-1"> 
          <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
