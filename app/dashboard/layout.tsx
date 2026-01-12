import React from 'react'
import DashboardSideBar from '../../components/layout/DashboardSideBar';
import { NewFeaturesNotification } from '@/components/NewFeaturesNotification';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <div className="md:grid md:grid-cols-[280px_1fr] h-full">
        <DashboardSideBar />
        <main className="overflow-auto">
          {children}
        </main>
      </div>
      <NewFeaturesNotification />
    </div>
  )
}