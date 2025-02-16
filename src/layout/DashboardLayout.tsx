import React from 'react'
import NavbarContainer from '@/components/nav/NavbarContainer'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <React.Fragment>
      <NavbarContainer />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </React.Fragment>
  )
}

export default DashboardLayout
