import { Route, Routes, Navigate } from 'react-router-dom'
import AuthLayout from './components/shared/AuthLayout'
import Login from './components/pages/Login'
import PasswordReset from './components/pages/PasswordReset'
import TenantLayout from './components/shared/TenantLayout'
import Dashboard from './components/pages/tenant/Dashboard'
import './index.css'

function App() {

  return (
    <Routes>
      {/* <Route path='/home' element={<LandingPage />} /> */}
      <Route path='/auth' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='password-reset' element={<PasswordReset />} />
        <Route index element={<Navigate to='/auth/login' replace />} />
      </Route>
      <Route path='/tenant' element={<TenantLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
      {/* <Route index element={<Navigate to='/tenant/dashboard' replace />} />
      </Route> */}
    </Routes>
  )
}

export default App
