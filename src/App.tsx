import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Search from './pages/Search';

// Customer Pages
import CustomerDashboard from './pages/Customer/Dashboard';
import OrderHistory from './pages/Customer/OrderHistory';
import OrderDetail from './pages/Customer/OrderDetail';
import Profile from './pages/Customer/Profile';
import Wishlist from './pages/Customer/Wishlist';
import Support from './pages/Customer/Support';
import TicketDetail from './pages/Customer/TicketDetail';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/Products';
import AdminOrders from './pages/Admin/Orders';
import AdminUsers from './pages/Admin/Users';
import AdminSupport from './pages/Admin/Support';
import AdminAnalytics from './pages/Admin/Analytics';

// Delivery Pages
import DeliveryDashboard from './pages/Delivery/Dashboard';
import DeliveryOrders from './pages/Delivery/Orders';
import DeliveryHistory from './pages/Delivery/History';

// Support Pages
import SupportDashboard from './pages/Support/Dashboard';
import SupportTickets from './pages/Support/Tickets';
import SupportTicketDetail from './pages/Support/TicketDetail';

// Static Pages
import About from './pages/About';
import Contact from './pages/Contact';
import BulkOrders from './pages/BulkOrders';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bulk-orders" element={<BulkOrders />} />
            
            {/* Protected Routes - Customer */}
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute roles={['customer']}>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order-success" 
              element={
                <ProtectedRoute roles={['customer']}>
                  <OrderSuccess />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute roles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute roles={['customer']}>
                  <OrderHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order/:id" 
              element={
                <ProtectedRoute roles={['customer']}>
                  <OrderDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute roles={['customer']}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <ProtectedRoute roles={['customer']}>
                  <Wishlist />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/support" 
              element={
                <ProtectedRoute roles={['customer']}>
                  <Support />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ticket/:id" 
              element={
                <ProtectedRoute roles={['customer']}>
                  <TicketDetail />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminProducts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/orders" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminOrders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/support" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminSupport />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminAnalytics />
                </ProtectedRoute>
              } 
            />
            
            {/* Delivery Routes */}
            <Route 
              path="/delivery" 
              element={
                <ProtectedRoute roles={['delivery']}>
                  <DeliveryDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/delivery/orders" 
              element={
                <ProtectedRoute roles={['delivery']}>
                  <DeliveryOrders />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/delivery/history" 
              element={
                <ProtectedRoute roles={['delivery']}>
                  <DeliveryHistory />
                </ProtectedRoute>
              } 
            />
            
            {/* Support Routes */}
            <Route 
              path="/support-dashboard" 
              element={
                <ProtectedRoute roles={['support']}>
                  <SupportDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/support-tickets" 
              element={
                <ProtectedRoute roles={['support']}>
                  <SupportTickets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/support-ticket/:id" 
              element={
                <ProtectedRoute roles={['support']}>
                  <SupportTicketDetail />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;