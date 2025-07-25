import { Route, Routes, Navigate } from 'react-router-dom'
import UserLayout from './components/shared/UserLayout'
import Login from './components/pages/Login'
import PasswordReset from './components/pages/PasswordReset'
import Rooms from './components/pages/guest/Rooms'
import SingleRooms from "./components/pages/guest/SingleRooms";
import DoubleRooms from './components/pages/guest/DoubleRooms'
import TripleRooms from './components/pages/guest/TripleRooms'
import GuestLayout from './components/shared/GuestLayout'



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
      <Route path='/guest' element={<GuestLayout />}>

      <Route path="/guest/rooms" element={<Rooms />} />
    <Route path="/guest/rooms/single" element={<SingleRooms />} />
    <Route path="/guest/rooms/double" element={<DoubleRooms />} />
    <Route path="/guest/rooms/triple" element={<TripleRooms />} />








      {/* <Route path='rooms' element={<Rooms />} />
  
      <Route path="rooms/single" element={<SingleRooms />} /> */}

        {/* <Route index element={<Navigate to='/guest/dashboard' replace />} /> */}
      </Route>
      <Route path="*" element={<div className="p-10 text-red-600 text-xl">404 Page Not Found</div>} />

    </Routes>
  )
}

export default App
