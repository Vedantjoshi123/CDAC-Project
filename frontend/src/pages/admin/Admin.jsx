import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';

const Admin = () => {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <AdminSidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
          Admin Panel
        </h1>
          <Outlet />
      </main>
    </div>
  );
};

export default Admin;
