import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import LandingPage from '@/pages/LandingPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import DashboardLayout from '@/layout/DashboardLayout'
import AnalyticsPage from '@/pages/AnalyticsPage'
import SettingsPage from '@/pages/SettingsPage'
import AddEntryPage from '@/pages/AddEntryPage'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-entry" element={<AddEntryPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
