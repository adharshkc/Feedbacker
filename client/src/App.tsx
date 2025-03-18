
import { BrowserRouter, Route, Routes } from 'react-router'
import UserRoute from './routes/UserRoute'
import './App.css'

function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/*' element={<UserRoute/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
