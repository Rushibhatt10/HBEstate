import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Contact from './pages/Contact';
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import Login from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import AddProperty from './pages/Admin/AddProperty'
import Queries from './pages/Admin/Queries';
import UserActivity from './pages/Admin/UserActivity';
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/queries"
            element={
              <ProtectedRoute>
                <Queries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-activity"
            element={
              <ProtectedRoute>
                <UserActivity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-property"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-property/:id"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
