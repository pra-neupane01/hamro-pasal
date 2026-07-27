import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Sales } from './pages/Sales';
import { Inventory } from './pages/Inventory';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Customers } from './pages/Customers';
import { Suppliers } from './pages/Suppliers';
import { Unauthorized } from './pages/Unauthorized';

// Layout wrapper that conditionally shows Header/Footer for authenticated routes
function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  
  // Don't show app header/footer on landing page or auth pages
  if (isLandingPage || isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout>
          <Routes>
            {/* Public landing page */}
            <Route path="/" element={<Landing />} />
            
            {/* Public pages */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Both roles */}
            <Route path="/dashboard"  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/sales"      element={<ProtectedRoute><Sales /></ProtectedRoute>} />
            <Route path="/customers"  element={<ProtectedRoute><Customers /></ProtectedRoute>} />

            {/* Admin only */}
            <Route path="/products"   element={<ProtectedRoute requireAdmin><Products /></ProtectedRoute>} />
            <Route path="/inventory"  element={<ProtectedRoute requireAdmin><Inventory /></ProtectedRoute>} />
            <Route path="/reports"    element={<ProtectedRoute requireAdmin><Reports /></ProtectedRoute>} />
            <Route path="/suppliers"  element={<ProtectedRoute requireAdmin><Suppliers /></ProtectedRoute>} />
            <Route path="/settings"   element={<ProtectedRoute requireAdmin><Settings /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
