import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Bell, ChevronLeft, ChevronRight, Home, Users, Package, Boxes, ShoppingCart, UserRound, Star, FileText, AlertTriangle, BarChart3, Image, CircleDollarSign, Ticket, MessageSquare, LayoutTemplate, Settings, CreditCard, ShoppingBag, LogOut, Menu, Search, Moon, Sun, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const adminNavItems = [
    { label: 'Home', path: '/admin/dashboard', icon: Home },
    { label: 'Store Users', path: '/admin/store-users', icon: Users },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Categories', path: '/admin/categories', icon: Boxes },
    { label: 'Brands', path: '/admin/brands', icon: LayoutTemplate },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Customers', path: '/admin/customers', icon: UserRound },
    { label: 'Reviews', path: '/admin/reviews', icon: Star },
    { label: 'Leads', path: '/admin/leads', icon: FileText },
    { label: 'Issues', path: '/admin/issues', icon: AlertTriangle },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Media', path: '/admin/media', icon: Image },
    { label: 'Transactions', path: '/admin/transactions', icon: CircleDollarSign },
    { label: 'Coupons', path: '/admin/coupons', icon: Ticket },
    { label: 'SMS', path: '/admin/sms', icon: MessageSquare },
    { label: 'Pages', path: '/admin/pages', icon: FileText },
    { label: 'Blog', path: '/admin/blog', icon: FileText },
    { label: 'Plugins', path: '/admin/plugins', icon: Settings },
    { label: 'Appearance', path: '/admin/appearance', icon: LayoutTemplate },
    { label: 'Store Settings', path: '/admin/store', icon: Settings },
    { label: 'Payment Settings', path: '/admin/payment', icon: CreditCard },
    { label: 'Checkout Settings', path: '/admin/checkout', icon: ShoppingBag },
]

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('admin-theme') !== 'light')
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const { user, adminUser, adminLogout } = useAuth()

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode)
        localStorage.setItem('admin-theme', isDarkMode ? 'dark' : 'light')
    }, [isDarkMode])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false)
            } else {
                setIsSidebarOpen(true)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleLogout = () => {
        adminLogout?.()
        navigate('/admin')
    }

    const isActive = (path) => location.pathname === path

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/70 lg:hidden"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/10 bg-slate-900/95 backdrop-blur-xl transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
                initial={false}
                animate={{ width: isSidebarOpen ? 288 : 80 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-lg font-semibold text-white">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        {isSidebarOpen && (
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-white">Admin Panel</p>
                                <p className="text-xs text-slate-400">Secure access</p>
                            </div>
                        )}
                    </div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                        {isSidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-4">
                    <nav className="space-y-1">
                        {adminNavItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path)
                                        if (window.innerWidth < 1024) setIsMobileOpen(false)
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition ${isActive(item.path) ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {isSidebarOpen && <span>{item.label}</span>}
                                </button>
                            )
                        })}
                    </nav>
                </div>

                <div className="border-t border-white/10 p-3">
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10">
                        <LogOut className="h-4 w-4" />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </motion.aside>

            <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
                <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/80 px-4 py-3 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden">
                                <Menu className="h-5 w-5" />
                            </button>
                            <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-2 md:flex">
                                <Search className="h-4 w-4 text-slate-400" />
                                <input className="bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Search" />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => setIsDarkMode(!isDarkMode)} className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>
                            <div className="relative">
                                <button onClick={() => setShowNotifications(!showNotifications)} className="relative rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
                                </button>
                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl">
                                        <p className="text-sm font-semibold text-white">Notifications</p>
                                        <div className="mt-3 space-y-2 text-sm text-slate-400">
                                            <div className="rounded-xl bg-slate-950/80 p-2">New order received.</div>
                                            <div className="rounded-xl bg-slate-950/80 p-2">Low stock alert for 3 products.</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/80 px-2 py-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 font-semibold text-white">
                                        {adminUser?.ownerName?.charAt(0) || adminUser?.name?.charAt(0) || 'A'}
                                    </div>
                                    <div className="hidden text-left md:block">
                                        <p className="text-sm font-medium text-white">{adminUser?.ownerName || adminUser?.name || 'Administrator'}</p>
                                        <p className="text-xs text-slate-400">Administrator</p>
                                    </div>
                                </button>
                                {showProfile && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl">
                                        <div className="rounded-xl bg-slate-950/80 p-3 text-sm text-slate-300">
                                            <p className="font-medium text-white">{adminUser?.ownerName || adminUser?.name || user?.ownerName || user?.name || 'Administrator'}</p>
                                            <p className="text-xs text-slate-400">{adminUser?.email || user?.email || 'admin@example.com'}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
