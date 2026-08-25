// // frontend/src/App.jsx
import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layouts/DashboardLayout'
import AdminLayout from './layouts/AdminLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import Products from './pages/dashboard/Products'
import Orders from './pages/dashboard/Orders'
import Customers from './pages/dashboard/Customers'
import Analytics from './pages/dashboard/Analytics'
import Media from './pages/dashboard/Media'
import Settings from './pages/dashboard/Settings'
import StoreUsers from './pages/dashboard/StoreUsers'
import Categories from './pages/dashboard/Categories'
import Brands from './pages/dashboard/Brands'
import Inventory from './pages/dashboard/Inventory'
import Reviews from './pages/dashboard/Reviews'
import Leads from './pages/dashboard/Leads'
import Issues from './pages/dashboard/Issues'
import SMSMarketing from './pages/dashboard/SMSMarketing'
import DiscountCoupons from './pages/dashboard/DiscountCoupons'
import Transactions from './pages/dashboard/Transactions'
import Reports from './pages/dashboard/Reports'
import Support from './pages/dashboard/Support'
import Profile from './pages/dashboard/Profile'
import AcceptInvite from './pages/AcceptInvite'
import SetPassword from './pages/SetPassword'

// ========== CUSTOMIZATIONS SETTINGS IMPORTS ==========
import Pages from './pages/dashboard/Pages'
import PageEditor from './pages/dashboard/PageEditor'
import Blog from './pages/dashboard/Blog'
import Plugins from './pages/dashboard/Plugins'
import Appearance from './pages/dashboard/Appearance'
import StoreSetting from './pages/dashboard/StoreSetting'
import PaymentSetting from './pages/dashboard/PaymentSetting'
import CheckoutSetting from './pages/dashboard/CheckoutSetting'
import StorefrontPreview from './pages/StorefrontPreview'
// ========== END SETTINGS IMPORTS ==========

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'

function App() {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <AuthProvider>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {/* ============================================================ */}
                    {/* PUBLIC ROUTES */}
                    {/* ============================================================ */}
                    <Route path="/" element={<LandingPage />} />
                    
                    <Route element={<PublicRoute />}>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                    
                    <Route path="/admin" element={<AdminLoginPage />} />
                    <Route path="/accept-invite" element={<AcceptInvite />} />
                    <Route path="/set-password" element={<SetPassword />} />

                    {/* ============================================================ */}
                    {/* PROTECTED ROUTES - DASHBOARD */}
                    {/* ============================================================ */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardLayout />}>
                            {/* Dashboard Home */}
                            <Route index element={<DashboardHome />} />
                            
                            {/* Store Management */}
                            <Route path="store-users" element={<StoreUsers />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="brands" element={<Brands />} />
                            
                            {/* Product Management */}
                            <Route path="products" element={<Products />} />
                            <Route path="inventory" element={<Inventory />} />
                            <Route path="reviews" element={<Reviews />} />
                            
                            {/* Customer & Orders */}
                            <Route path="customers" element={<Customers />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="leads" element={<Leads />} />
                            <Route path="issues" element={<Issues />} />
                            
                            {/* Marketing */}
                            <Route path="sms-marketing" element={<SMSMarketing />} />
                            <Route path="discount-coupons" element={<DiscountCoupons />} />
                            
                            {/* Analytics & Media */}
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="media" element={<Media />} />
                            
                            {/* Transactions */}
                            <Route path="transactions" element={<Transactions />} />
                            
                            {/* ====================================================== */}
                            {/* CUSTOMIZATIONS - Dashboard ke andar hi */}
                            {/* ====================================================== */}
                            <Route path="pages" element={<Pages />} />
                            <Route path="pages/:pageId/editor" element={<PageEditor />} />
                            <Route path="blog" element={<Blog />} />
                            <Route path="plugins" element={<Plugins />} />
                            <Route path="appearance" element={<Appearance />} />
                            <Route path="store" element={<StoreSetting />} />
                            <Route path="payment" element={<PaymentSetting />} />
                            <Route path="checkout" element={<CheckoutSetting />} />
                            {/* ====================================================== */}
                            
                            {/* Settings (Old) */}
                            <Route path="settings" element={<Settings />} />
                            
                            {/* Reports & Support */}
                            <Route path="reports" element={<Reports />} />
                            <Route path="support" element={<Support />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Route>
                    {/* ============================================================ */}

                    <Route element={<AdminProtectedRoute />}>
                        <Route path="/admin/*" element={<AdminLayout />}>
                            <Route path="dashboard" element={<AdminDashboardPage />} />
                            <Route path="store-users" element={<StoreUsers />} />
                            <Route path="products" element={<Products />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="brands" element={<Brands />} />
                            <Route path="inventory" element={<Inventory />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="customers" element={<Customers />} />
                            <Route path="reviews" element={<Reviews />} />
                            <Route path="leads" element={<Leads />} />
                            <Route path="issues" element={<Issues />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="media" element={<Media />} />
                            <Route path="transactions" element={<Transactions />} />
                            <Route path="coupons" element={<DiscountCoupons />} />
                            <Route path="plugins" element={<Plugins />} />
                            <Route path="appearance" element={<Appearance />} />
                            <Route path="store" element={<StoreSetting />} />
                            <Route path="payment" element={<PaymentSetting />} />
                            <Route path="checkout" element={<CheckoutSetting />} />
                        </Route>
                    </Route>

                    {/* ============================================================ */}
                    {/* STOREFRONT - Public storefront for landing pages */}
                    {/* ============================================================ */}
                    <Route path="/storefront/:storeName" element={<StorefrontPreview />} />

                    {/* 404 - Not Found */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AnimatePresence>
        </AuthProvider>
    )
}

export default App












