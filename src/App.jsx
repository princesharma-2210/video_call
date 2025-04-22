import './App.css'
import { Routes, Route } from 'react-router-dom'
import VideoHome from './pages/VideoHome.jsx'
import Room from './pages/Room.jsx'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<VideoHome/>}/>
        <Route path="room/:roomId" element={<Room/>}/>
      </Routes>
    </>
  )
}

export default App
