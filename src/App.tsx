import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './router/routes'
import './App.css'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          {routes.map(route =>
            <Route path={route.path} element={route.element} />
          )}
        </Routes>
      </Router>
    </>
  )
}

export default App
