import { Route, Routes, Navigate } from 'react-router-dom'
import UserLayout from './components/shared/UserLayout'
import Login from './components/pages/Login'
import PasswordReset from './components/pages/PasswordReset'


import './index.css'

function App() {

  return (
    <Routes>
      {/* <Route path='/home' element={<LandingPage />} /> */}
      <Route path='/user' element={<UserLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='password-reset' element={<PasswordReset />} />
        <Route index element={<Navigate to='/user/login' replace />} />
      </Route>
      <Route path='/tenant' element={<UserLayout />}>
        <Route index element={<Navigate to='/tenant/dashboard' replace />} />
      </Route>
    </Routes>
  )
}

export default App
