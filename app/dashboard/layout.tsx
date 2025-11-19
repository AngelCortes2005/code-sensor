import React from 'react'
import DashboardSideBar from '../../components/layout/DashboardSideBar';
export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="md:grid-cols-[256px_1fr] sm:grid">
        <DashboardSideBar />
        {children}
    </div>
  )
}