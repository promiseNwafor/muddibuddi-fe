import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarContainer from '@/components/navigation/NavbarContainer'
import SidebarContainer from '@/components/navigation/SidebarContainer'

const DashboardLayout = () => {
  return (
    <React.Fragment>
      <div className="flex w-full relative container mx-auto divide-x-2 divide-white/25">
        <SidebarContainer />
        <div className="flex-1 lg:absolute left-60 right-0 bg-background">
          <NavbarContainer />
          <main className="p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DashboardLayout
