import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../../components/student/StudentSidebar';

const Student = () => {
  return (
    <div className="flex flex-col text-default">
     
      <div className="flex flex-1"> 
          <StudentSidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Student;
