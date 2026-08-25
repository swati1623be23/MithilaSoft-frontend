
// // src/layouts/DashboardLayout.jsx
// import React, { useState, useEffect } from 'react'
// import { Outlet, useNavigate, useLocation } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     Menu,
//     X,
//     Search,
//     Bell,
//     Sun,
//     Moon,
//     ChevronDown,
//     Home,
//     Users,
//     UserPlus,
//     Shield,
//     Grid,
//     Layers,
//     Package,
//     Box,
//     ShoppingCart,
//     Star,
//     User,
//     FileText,
//     Ticket,
//     AlertTriangle,
//     MessageSquare,
//     Gift,
//     BarChart3,
//     Image,
//     CreditCard,
//     File,
//     BookOpen,
//     Palette,
//     Settings,
//     TrendingUp,
//     HelpCircle,
//     UserCircle,
//     LogOut,
//     ChevronRight,
//     ChevronLeft,
//     Store,
//     Newspaper,
//     Puzzle,
//     ShoppingBag,
    
// } from 'lucide-react'
// import { useAuth } from '../context/AuthContext'
// import mithilaLogo from '../assets/logo.png'

// const DashboardLayout = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true)
//     const [isMobileOpen, setIsMobileOpen] = useState(false)
//     const [isDarkMode, setIsDarkMode] = useState(true)
//     const [searchQuery, setSearchQuery] = useState('')
//     const [notifications, setNotifications] = useState([
//         { id: 1, title: 'New order received', time: '2 min ago', read: false },
//         { id: 2, title: 'Low stock alert', time: '15 min ago', read: false },
//         { id: 3, title: 'Review from customer', time: '1 hour ago', read: true },
//     ])
//     const [showNotifications, setShowNotifications] = useState(false)
//     const [showProfile, setShowProfile] = useState(false)
//     const location = useLocation()
//     const navigate = useNavigate()
//     const { user, logout } = useAuth()

//     // Get store name from user
//     const storeName = user?.storeName || user?.storeId?.name || 'My Store'
//     // Get first letter of store name for logo
//     const storeInitial = storeName.charAt(0).toUpperCase()

//     // Main Menu Items (Transactions tak)
//     const mainMenuItems = [
//         { icon: Home, label: 'Home', path: '/dashboard' },
//         { icon: Users, label: 'Store Users', path: '/dashboard/store-users' },
//         { icon: Grid, label: 'Categories', path: '/dashboard/categories' },
//         { icon: Layers, label: 'Brands', path: '/dashboard/brands' },
//         { icon: Package, label: 'Products', path: '/dashboard/products' },
//         { icon: Box, label: 'Inventory', path: '/dashboard/inventory' },
//         { icon: Star, label: 'Reviews', path: '/dashboard/reviews' },
//         { icon: User, label: 'Customers', path: '/dashboard/customers' },
//         { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders' },
//         { icon: FileText, label: 'Leads', path: '/dashboard/leads' },
//         { icon: AlertTriangle, label: 'Issues', path: '/dashboard/issues' },
//         { icon: MessageSquare, label: 'SMS Marketing', path: '/dashboard/sms-marketing' },
//         { icon: Gift, label: 'Discount Coupons', path: '/dashboard/discount-coupons' },
//         { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
//         { icon: Image, label: 'Media Library', path: '/dashboard/media' },
//         { icon: CreditCard, label: 'Transactions', path: '/dashboard/transactions' },
//     ]

//     // Customizations Menu Items (Transactions ke neeche)
//     const customizationsItems = [
//         { icon: File, label: 'Pages', path: '/dashboard/pages' },
//         { icon: BookOpen, label: 'Blog', path: '/dashboard/blog' },
//         { icon: Puzzle, label: 'Plugins', path: '/dashboard/plugins' },
//         { icon: Palette, label: 'Appearance', path: '/dashboard/appearance' },
//         { icon: Store, label: 'Store Setting', path: '/dashboard/store' },
//         { icon: CreditCard, label: 'Payment Setting', path: '/dashboard/payment' },
//         { icon: ShoppingBag, label: 'Checkout Setting', path: '/dashboard/checkout' },
//     ]

//     // Other Menu Items
//     const otherItems = [
//         { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
//         { icon: TrendingUp, label: 'Reports', path: '/dashboard/reports' },
//         { icon: HelpCircle, label: 'Support', path: '/dashboard/support' },
//         { icon: UserCircle, label: 'Profile', path: '/dashboard/profile' },
//     ]

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth < 1024) {
//                 setIsSidebarOpen(false)
//             } else {
//                 setIsSidebarOpen(true)
//             }
//         }
//         handleResize()
//         window.addEventListener('resize', handleResize)
//         return () => window.removeEventListener('resize', handleResize)
//     }, [])

//     const handleLogout = () => {
//         logout()
//     }

//     const toggleSidebar = () => {
//         if (window.innerWidth < 1024) {
//             setIsMobileOpen(!isMobileOpen)
//         } else {
//             setIsSidebarOpen(!isSidebarOpen)
//         }
//     }

//     const handleNotificationClick = () => {
//         setShowNotifications(!showNotifications)
//         setShowProfile(false)
//         setNotifications(notifications.map(n => ({ ...n, read: true })))
//     }

//     const getUnreadCount = () => {
//         return notifications.filter(n => !n.read).length
//     }

//     return (
//         <div className="min-h-screen bg-background flex">
//             {/* Sidebar Overlay for Mobile */}
//             <AnimatePresence>
//                 {isMobileOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                         onClick={() => setIsMobileOpen(false)}
//                     />
//                 )}
//             </AnimatePresence>

//             {/* Sidebar - Full Height */}
//             <motion.aside
//                 className={`fixed top-0 left-0 h-screen bg-[#0B1020] border-r border-[#1E293B] z-50 transition-all duration-300 flex flex-col ${
//                     isSidebarOpen ? 'w-[280px]' : 'w-[72px]'
//                 } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
//                 initial={false}
//                 animate={{
//                     width: isSidebarOpen ? 280 : 72,
//                 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 {/* Sidebar Header - Store Name with First Letter Logo + OWNER */}
//                 <div className="flex-shrink-0 flex items-center justify-between h-20 px-4 border-b border-[#1E293B]">
//                     <AnimatePresence>
//                         {isSidebarOpen && (
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.8 }}
//                                 transition={{ duration: 0.2 }}
//                                 className="flex items-center gap-3 overflow-hidden"
//                             >
//                                 {/* Store Initial as Logo */}
//                                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/25">
//                                     <span className="text-white font-bold text-lg">
//                                         {storeInitial}
//                                     </span>
//                                 </div>
//                                 {/* Store Name and OWNER */}
//                                 <div className="flex flex-col min-w-0">
//                                     <span className="text-sm font-bold text-white truncate">
//                                         {storeName}
//                                     </span>
//                                     <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
//                                         OWNER
//                                     </span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                     <button
//                         onClick={toggleSidebar}
//                         className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white flex-shrink-0"
//                     >
//                         {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
//                     </button>
//                 </div>

//                 {/* Sidebar Navigation */}
//                 <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[#1E293B]">
//                     <nav className="px-2 space-y-0.5">
//                         {/* Main Menu Items */}
//                         {mainMenuItems.map((item) => {
//                             const isActive = location.pathname === item.path
//                             return (
//                                 <motion.button
//                                     key={item.path}
//                                     onClick={() => {
//                                         navigate(item.path)
//                                         if (window.innerWidth < 1024) {
//                                             setIsMobileOpen(false)
//                                         }
//                                     }}
//                                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border border-indigo-500/20'
//                                             : 'text-textSecondary hover:text-white hover:bg-white/5'
//                                     }`}
//                                     whileHover={{ x: 4 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
//                                     <AnimatePresence>
//                                         {isSidebarOpen && (
//                                             <motion.span
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.button>
//                             )
//                         })}

//                         {/* Customizations Heading */}
//                         {isSidebarOpen && (
//                             <div className="pt-3 mt-2 border-t border-[#1E293B]">
//                                 <div className="px-3 mb-1.5">
//                                     <div className="flex items-center gap-2">
//                                         <Settings className="w-4 h-4 text-indigo-400" />
//                                         <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Customizations</span>
//                                     </div>
//                                     <div className="border-b border-[#1E293B] mt-1.5"></div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Customizations Menu Items */}
//                         {customizationsItems.map((item) => {
//                             const isActive = location.pathname === item.path
//                             return (
//                                 <motion.button
//                                     key={item.path}
//                                     onClick={() => {
//                                         navigate(item.path)
//                                         if (window.innerWidth < 1024) {
//                                             setIsMobileOpen(false)
//                                         }
//                                     }}
//                                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border border-indigo-500/20'
//                                             : 'text-textSecondary hover:text-white hover:bg-white/5'
//                                     }`}
//                                     whileHover={{ x: 4 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
//                                     <AnimatePresence>
//                                         {isSidebarOpen && (
//                                             <motion.span
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.button>
//                             )
//                         })}

//                         {/* Other Menu Items */}
//                         {otherItems.map((item) => {
//                             const isActive = location.pathname === item.path
//                             return (
//                                 <motion.button
//                                     key={item.path}
//                                     onClick={() => {
//                                         navigate(item.path)
//                                         if (window.innerWidth < 1024) {
//                                             setIsMobileOpen(false)
//                                         }
//                                     }}
//                                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border border-indigo-500/20'
//                                             : 'text-textSecondary hover:text-white hover:bg-white/5'
//                                     }`}
//                                     whileHover={{ x: 4 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
//                                     <AnimatePresence>
//                                         {isSidebarOpen && (
//                                             <motion.span
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.button>
//                             )
//                         })}
//                     </nav>
//                 </div>

//                 {/* Logout Button */}
//                 <div className="flex-shrink-0 px-2 py-4 border-t border-[#1E293B]">
//                     <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-danger hover:bg-danger/10 transition-all duration-200"
//                         whileHover={{ x: 4 }}
//                         whileTap={{ scale: 0.98 }}
//                     >
//                         <LogOut className="w-5 h-5 flex-shrink-0" />
//                         <AnimatePresence>
//                             {isSidebarOpen && (
//                                 <motion.span
//                                     initial={{ opacity: 0, width: 0 }}
//                                     animate={{ opacity: 1, width: 'auto' }}
//                                     exit={{ opacity: 0, width: 0 }}
//                                     transition={{ duration: 0.2 }}
//                                     className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                 >
//                                     Logout
//                                 </motion.span>
//                             )}
//                         </AnimatePresence>
//                     </button>
//                 </div>
//             </motion.aside>

//             {/* Main Content */}
//             <div
//                 className={`flex-1 transition-all duration-300 min-h-screen ${
//                     isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[72px]'
//                 }`}
//             >
//                 {/* Top Navbar - MithilaSoft with Logo */}
//                 <nav className="sticky top-0 z-30 glass border-b border-[#1E293B] px-6 py-3">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             {/* Mobile Menu Button */}
//                             <button
//                                 onClick={toggleSidebar}
//                                 className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white lg:hidden"
//                             >
//                                 <Menu className="w-5 h-5" />
//                             </button>

//                             {/* MithilaSoft Brand with Logo */}
//                             <div className="flex items-center gap-3">
//                                 <img 
//                                     src={mithilaLogo} 
//                                     alt="MithilaSoft" 
//                                     className="h-8 w-auto"
//                                 />
//                                 <div className="flex flex-col">
//                                     <span className="text-sm font-bold text-white">MithilaSoft</span>
//                                     <span className="text-[8px] text-textSecondary tracking-wider">
//                                         EMPOWERING BUSINESSES
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Search Bar */}
//                             <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#131A2B] border border-[#1E293B] focus-within:border-indigo-500 transition-all duration-300 ml-4">
//                                 <Search className="w-4 h-4 text-textSecondary" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className="bg-transparent border-none outline-none text-sm text-white placeholder-textSecondary w-48 md:w-64"
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-2">
//                             {/* Search Mobile */}
//                             <button className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white md:hidden">
//                                 <Search className="w-5 h-5" />
//                             </button>

//                             {/* Theme Toggle */}
//                             <button
//                                 onClick={() => setIsDarkMode(!isDarkMode)}
//                                 className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white"
//                             >
//                                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//                             </button>

//                             {/* Notifications */}
//                             <div className="relative">
//                                 <button
//                                     onClick={handleNotificationClick}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white relative"
//                                 >
//                                     <Bell className="w-5 h-5" />
//                                     {getUnreadCount() > 0 && (
//                                         <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger animate-pulse"></span>
//                                     )}
//                                 </button>

//                                 <AnimatePresence>
//                                     {showNotifications && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                                             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             transition={{ duration: 0.2 }}
//                                             className="absolute right-0 top-full mt-2 w-80 glass rounded-2xl border border-[#1E293B] shadow-2xl overflow-hidden"
//                                         >
//                                             <div className="p-4 border-b border-[#1E293B]">
//                                                 <h4 className="font-semibold">Notifications</h4>
//                                             </div>
//                                             <div className="max-h-96 overflow-y-auto">
//                                                 {notifications.length === 0 ? (
//                                                     <div className="p-4 text-center text-textSecondary text-sm">
//                                                         No notifications
//                                                     </div>
//                                                 ) : (
//                                                     notifications.map((notification) => (
//                                                         <div
//                                                             key={notification.id}
//                                                             className={`px-4 py-3 border-b border-[#1E293B] hover:bg-white/5 transition-colors duration-200 cursor-pointer ${
//                                                                 !notification.read ? 'bg-indigo-500/5' : ''
//                                                             }`}
//                                                         >
//                                                             <div className="flex items-start gap-3">
//                                                                 <div className={`w-2 h-2 rounded-full mt-1.5 ${
//                                                                     !notification.read ? 'bg-indigo-400' : 'bg-[#1E293B]'
//                                                                 }`} />
//                                                                 <div>
//                                                                     <p className="text-sm">{notification.title}</p>
//                                                                     <p className="text-xs text-textSecondary mt-0.5">{notification.time}</p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ))
//                                                 )}
//                                             </div>
//                                             <div className="p-3 border-t border-[#1E293B] text-center">
//                                                 <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
//                                                     View All
//                                                 </button>
//                                             </div>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>

//                             {/* Profile */}
//                             <div className="relative">
//                                 <button
//                                     onClick={() => setShowProfile(!showProfile)}
//                                     className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
//                                         <span className="text-white font-semibold text-sm">
//                                             {user?.ownerName?.charAt(0) || user?.name?.charAt(0) || 'U'}
//                                         </span>
//                                     </div>
//                                     <ChevronDown className="w-4 h-4 text-textSecondary" />
//                                 </button>

//                                 <AnimatePresence>
//                                     {showProfile && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                                             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             transition={{ duration: 0.2 }}
//                                             className="absolute right-0 top-full mt-2 w-56 glass rounded-2xl border border-[#1E293B] shadow-2xl overflow-hidden"
//                                         >
//                                             <div className="p-4 border-b border-[#1E293B]">
//                                                 <div className="font-semibold">{user?.ownerName || user?.name || 'User'}</div>
//                                                 <div className="text-sm text-textSecondary">{user?.email || ''}</div>
//                                                 <div className="text-xs text-indigo-400 mt-1">{user?.storeName || 'Store'}</div>
//                                             </div>
//                                             <div className="py-2">
//                                                 <button
//                                                     onClick={() => {
//                                                         navigate('/dashboard/profile')
//                                                         setShowProfile(false)
//                                                     }}
//                                                     className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <UserCircle className="w-4 h-4" />
//                                                     Profile
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         navigate('/dashboard/settings')
//                                                         setShowProfile(false)
//                                                     }}
//                                                     className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <Settings className="w-4 h-4" />
//                                                     Settings
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         navigate('/dashboard/support')
//                                                         setShowProfile(false)
//                                                     }}
//                                                     className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <HelpCircle className="w-4 h-4" />
//                                                     Help
//                                                 </button>
//                                             </div>
//                                             <div className="border-t border-[#1E293B] py-2">
//                                                 <button
//                                                     onClick={handleLogout}
//                                                     className="w-full px-4 py-2.5 text-left text-sm text-danger hover:bg-danger/10 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <LogOut className="w-4 h-4" />
//                                                     Logout
//                                                 </button>
//                                             </div>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>

//                 {/* Page Content */}
//                 <main className="p-6">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default DashboardLayout





























// // src/layouts/DashboardLayout.jsx
// import React, { useState, useEffect } from 'react'
// import { Outlet, useNavigate, useLocation } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     Menu,
//     X,
//     Search,
//     Bell,
//     Sun,
//     Moon,
//     ChevronDown,
//     Home,
//     Users,
//     UserPlus,
//     Shield,
//     Grid,
//     Layers,
//     Package,
//     Box,
//     ShoppingCart,
//     Star,
//     User,
//     FileText,
//     Ticket,
//     AlertTriangle,
//     MessageSquare,
//     Gift,
//     BarChart3,
//     Image,
//     CreditCard,
//     File,
//     BookOpen,
//     Palette,
//     Settings,
//     TrendingUp,
//     HelpCircle,
//     UserCircle,
//     LogOut,
//     ChevronRight,
//     ChevronLeft,
//     Store,
//     Newspaper,
//     Puzzle,
//     ShoppingBag,
// } from 'lucide-react'
// import { useAuth } from '../context/AuthContext'
// import mithilaLogo from '../assets/logo.png'

// const DashboardLayout = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true)
//     const [isMobileOpen, setIsMobileOpen] = useState(false)
//     const [isDarkMode, setIsDarkMode] = useState(true)
//     const [searchQuery, setSearchQuery] = useState('')
//     const [notifications, setNotifications] = useState([
//         { id: 1, title: 'New order received', time: '2 min ago', read: false },
//         { id: 2, title: 'Low stock alert', time: '15 min ago', read: false },
//         { id: 3, title: 'Review from customer', time: '1 hour ago', read: true },
//     ])
//     const [showNotifications, setShowNotifications] = useState(false)
//     const [showProfile, setShowProfile] = useState(false)
//     const location = useLocation()
//     const navigate = useNavigate()
//     const { user, logout } = useAuth()

//     // Get store name from user
//     const storeName = user?.storeName || user?.storeId?.name || 'My Store'
//     // Get first letter of store name for logo
//     const storeInitial = storeName.charAt(0).toUpperCase()

//     // Main Menu Items (Transactions tak)
//     const mainMenuItems = [
//         { icon: Home, label: 'Home', path: '/dashboard' },
//         { icon: Users, label: 'Store Users', path: '/dashboard/store-users' },
//         { icon: Grid, label: 'Categories', path: '/dashboard/categories' },
//         { icon: Layers, label: 'Brands', path: '/dashboard/brands' },
//         { icon: Package, label: 'Products', path: '/dashboard/products' },
//         { icon: Box, label: 'Inventory', path: '/dashboard/inventory' },
//         { icon: Star, label: 'Reviews', path: '/dashboard/reviews' },
//         { icon: User, label: 'Customers', path: '/dashboard/customers' },
//         { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders' },
//         { icon: FileText, label: 'Leads', path: '/dashboard/leads' },
//         { icon: AlertTriangle, label: 'Issues', path: '/dashboard/issues' },
//         { icon: MessageSquare, label: 'SMS Marketing', path: '/dashboard/sms-marketing' },
//         { icon: Gift, label: 'Discount Coupons', path: '/dashboard/discount-coupons' },
//         { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
//         { icon: Image, label: 'Media Library', path: '/dashboard/media' },
//         { icon: CreditCard, label: 'Transactions', path: '/dashboard/transactions' },
//     ]

//     // Customizations Menu Items (Transactions ke neeche)
//     const customizationsItems = [
//         { icon: File, label: 'Pages', path: '/dashboard/pages' },
//         { icon: BookOpen, label: 'Blog', path: '/dashboard/blog' },
//         { icon: Puzzle, label: 'Plugins', path: '/dashboard/plugins' },
//         { icon: Palette, label: 'Appearance', path: '/dashboard/appearance' },
//         { icon: Store, label: 'Store Setting', path: '/dashboard/store' },
//         { icon: CreditCard, label: 'Payment Setting', path: '/dashboard/payment' },
//         { icon: ShoppingBag, label: 'Checkout Setting', path: '/dashboard/checkout' },
//     ]

//     // Settings - Removed Reports, Support, Profile
//     const settingsItems = [
//         { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
//     ]

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth < 1024) {
//                 setIsSidebarOpen(false)
//             } else {
//                 setIsSidebarOpen(true)
//             }
//         }
//         handleResize()
//         window.addEventListener('resize', handleResize)
//         return () => window.removeEventListener('resize', handleResize)
//     }, [])

//     const handleLogout = () => {
//         logout()
//     }

//     const toggleSidebar = () => {
//         if (window.innerWidth < 1024) {
//             setIsMobileOpen(!isMobileOpen)
//         } else {
//             setIsSidebarOpen(!isSidebarOpen)
//         }
//     }

//     const handleNotificationClick = () => {
//         setShowNotifications(!showNotifications)
//         setShowProfile(false)
//         setNotifications(notifications.map(n => ({ ...n, read: true })))
//     }

//     const getUnreadCount = () => {
//         return notifications.filter(n => !n.read).length
//     }

//     return (
//         <div className="min-h-screen bg-background flex">
//             {/* Sidebar Overlay for Mobile */}
//             <AnimatePresence>
//                 {isMobileOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                         onClick={() => setIsMobileOpen(false)}
//                     />
//                 )}
//             </AnimatePresence>

//             {/* Sidebar - Full Height */}
//             <motion.aside
//                 className={`fixed top-0 left-0 h-screen bg-[#0B1020] border-r border-[#1E293B] z-50 transition-all duration-300 flex flex-col ${
//                     isSidebarOpen ? 'w-[280px]' : 'w-[72px]'
//                 } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
//                 initial={false}
//                 animate={{
//                     width: isSidebarOpen ? 280 : 72,
//                 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 {/* Sidebar Header - Store Name with First Letter Logo + OWNER */}
//                 <div className="flex-shrink-0 flex items-center justify-between h-20 px-4 border-b border-[#1E293B]">
//                     <AnimatePresence>
//                         {isSidebarOpen && (
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.8 }}
//                                 transition={{ duration: 0.2 }}
//                                 className="flex items-center gap-3 overflow-hidden"
//                             >
//                                 {/* Store Initial as Logo */}
//                                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/25">
//                                     <span className="text-white font-bold text-lg">
//                                         {storeInitial}
//                                     </span>
//                                 </div>
//                                 {/* Store Name and OWNER */}
//                                 <div className="flex flex-col min-w-0">
//                                     <span className="text-sm font-bold text-white truncate">
//                                         {storeName}
//                                     </span>
//                                     <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
//                                         OWNER
//                                     </span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                     <button
//                         onClick={toggleSidebar}
//                         className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white flex-shrink-0"
//                     >
//                         {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
//                     </button>
//                 </div>

//                 {/* Sidebar Navigation */}
//                 <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[#1E293B]">
//                     <nav className="px-2 space-y-0.5">
//                         {/* Main Menu Items */}
//                         {mainMenuItems.map((item) => {
//                             const isActive = location.pathname === item.path
//                             return (
//                                 <motion.button
//                                     key={item.path}
//                                     onClick={() => {
//                                         navigate(item.path)
//                                         if (window.innerWidth < 1024) {
//                                             setIsMobileOpen(false)
//                                         }
//                                     }}
//                                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border border-indigo-500/20'
//                                             : 'text-textSecondary hover:text-white hover:bg-white/5'
//                                     }`}
//                                     whileHover={{ x: 4 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
//                                     <AnimatePresence>
//                                         {isSidebarOpen && (
//                                             <motion.span
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.button>
//                             )
//                         })}

//                         {/* Customizations Heading */}
//                         {isSidebarOpen && (
//                             <div className="pt-3 mt-2 border-t border-[#1E293B]">
//                                 <div className="px-3 mb-1.5">
//                                     <div className="flex items-center gap-2">
//                                         <Settings className="w-4 h-4 text-indigo-400" />
//                                         <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Customizations</span>
//                                     </div>
//                                     <div className="border-b border-[#1E293B] mt-1.5"></div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Customizations Menu Items */}
//                         {customizationsItems.map((item) => {
//                             const isActive = location.pathname === item.path
//                             return (
//                                 <motion.button
//                                     key={item.path}
//                                     onClick={() => {
//                                         navigate(item.path)
//                                         if (window.innerWidth < 1024) {
//                                             setIsMobileOpen(false)
//                                         }
//                                     }}
//                                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border border-indigo-500/20'
//                                             : 'text-textSecondary hover:text-white hover:bg-white/5'
//                                     }`}
//                                     whileHover={{ x: 4 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
//                                     <AnimatePresence>
//                                         {isSidebarOpen && (
//                                             <motion.span
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.button>
//                             )
//                         })}

//                         {/* Settings - Only Settings, removed Reports, Support, Profile */}
//                         {settingsItems.map((item) => {
//                             const isActive = location.pathname === item.path
//                             return (
//                                 <motion.button
//                                     key={item.path}
//                                     onClick={() => {
//                                         navigate(item.path)
//                                         if (window.innerWidth < 1024) {
//                                             setIsMobileOpen(false)
//                                         }
//                                     }}
//                                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border border-indigo-500/20'
//                                             : 'text-textSecondary hover:text-white hover:bg-white/5'
//                                     }`}
//                                     whileHover={{ x: 4 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
//                                     <AnimatePresence>
//                                         {isSidebarOpen && (
//                                             <motion.span
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.button>
//                             )
//                         })}
//                     </nav>
//                 </div>

//                 {/* Logout Button */}
//                 <div className="flex-shrink-0 px-2 py-4 border-t border-[#1E293B]">
//                     <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-danger hover:bg-danger/10 transition-all duration-200"
//                         whileHover={{ x: 4 }}
//                         whileTap={{ scale: 0.98 }}
//                     >
//                         <LogOut className="w-5 h-5 flex-shrink-0" />
//                         <AnimatePresence>
//                             {isSidebarOpen && (
//                                 <motion.span
//                                     initial={{ opacity: 0, width: 0 }}
//                                     animate={{ opacity: 1, width: 'auto' }}
//                                     exit={{ opacity: 0, width: 0 }}
//                                     transition={{ duration: 0.2 }}
//                                     className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                 >
//                                     Logout
//                                 </motion.span>
//                             )}
//                         </AnimatePresence>
//                     </button>
//                 </div>
//             </motion.aside>

//             {/* Main Content */}
//             <div
//                 className={`flex-1 transition-all duration-300 min-h-screen ${
//                     isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[72px]'
//                 }`}
//             >
//                 {/* Top Navbar - MithilaSoft with Logo */}
//                 <nav className="sticky top-0 z-30 glass border-b border-[#1E293B] px-6 py-3">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             {/* Mobile Menu Button */}
//                             <button
//                                 onClick={toggleSidebar}
//                                 className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white lg:hidden"
//                             >
//                                 <Menu className="w-5 h-5" />
//                             </button>

//                             {/* MithilaSoft Brand with Logo */}
//                             <div className="flex items-center gap-3">
//                                 <img 
//                                     src={mithilaLogo} 
//                                     alt="MithilaSoft" 
//                                     className="h-8 w-auto"
//                                 />
//                                 <div className="flex flex-col">
//                                     <span className="text-sm font-bold text-white">MithilaSoft</span>
//                                     <span className="text-[8px] text-textSecondary tracking-wider">
//                                         EMPOWERING BUSINESSES
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Search Bar */}
//                             <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#131A2B] border border-[#1E293B] focus-within:border-indigo-500 transition-all duration-300 ml-4">
//                                 <Search className="w-4 h-4 text-textSecondary" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className="bg-transparent border-none outline-none text-sm text-white placeholder-textSecondary w-48 md:w-64"
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-2">
//                             {/* Search Mobile */}
//                             <button className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white md:hidden">
//                                 <Search className="w-5 h-5" />
//                             </button>

//                             {/* Theme Toggle */}
//                             <button
//                                 onClick={() => setIsDarkMode(!isDarkMode)}
//                                 className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white"
//                             >
//                                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//                             </button>

//                             {/* Notifications */}
//                             <div className="relative">
//                                 <button
//                                     onClick={handleNotificationClick}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white relative"
//                                 >
//                                     <Bell className="w-5 h-5" />
//                                     {getUnreadCount() > 0 && (
//                                         <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger animate-pulse"></span>
//                                     )}
//                                 </button>

//                                 <AnimatePresence>
//                                     {showNotifications && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                                             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             transition={{ duration: 0.2 }}
//                                             className="absolute right-0 top-full mt-2 w-80 glass rounded-2xl border border-[#1E293B] shadow-2xl overflow-hidden"
//                                         >
//                                             <div className="p-4 border-b border-[#1E293B]">
//                                                 <h4 className="font-semibold">Notifications</h4>
//                                             </div>
//                                             <div className="max-h-96 overflow-y-auto">
//                                                 {notifications.length === 0 ? (
//                                                     <div className="p-4 text-center text-textSecondary text-sm">
//                                                         No notifications
//                                                     </div>
//                                                 ) : (
//                                                     notifications.map((notification) => (
//                                                         <div
//                                                             key={notification.id}
//                                                             className={`px-4 py-3 border-b border-[#1E293B] hover:bg-white/5 transition-colors duration-200 cursor-pointer ${
//                                                                 !notification.read ? 'bg-indigo-500/5' : ''
//                                                             }`}
//                                                         >
//                                                             <div className="flex items-start gap-3">
//                                                                 <div className={`w-2 h-2 rounded-full mt-1.5 ${
//                                                                     !notification.read ? 'bg-indigo-400' : 'bg-[#1E293B]'
//                                                                 }`} />
//                                                                 <div>
//                                                                     <p className="text-sm">{notification.title}</p>
//                                                                     <p className="text-xs text-textSecondary mt-0.5">{notification.time}</p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ))
//                                                 )}
//                                             </div>
//                                             <div className="p-3 border-t border-[#1E293B] text-center">
//                                                 <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
//                                                     View All
//                                                 </button>
//                                             </div>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>

//                             {/* Profile */}
//                             <div className="relative">
//                                 <button
//                                     onClick={() => setShowProfile(!showProfile)}
//                                     className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
//                                         <span className="text-white font-semibold text-sm">
//                                             {user?.ownerName?.charAt(0) || user?.name?.charAt(0) || 'U'}
//                                         </span>
//                                     </div>
//                                     <ChevronDown className="w-4 h-4 text-textSecondary" />
//                                 </button>

//                                 <AnimatePresence>
//                                     {showProfile && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                                             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             transition={{ duration: 0.2 }}
//                                             className="absolute right-0 top-full mt-2 w-56 glass rounded-2xl border border-[#1E293B] shadow-2xl overflow-hidden"
//                                         >
//                                             <div className="p-4 border-b border-[#1E293B]">
//                                                 <div className="font-semibold">{user?.ownerName || user?.name || 'User'}</div>
//                                                 <div className="text-sm text-textSecondary">{user?.email || ''}</div>
//                                                 <div className="text-xs text-indigo-400 mt-1">{user?.storeName || 'Store'}</div>
//                                             </div>
//                                             <div className="py-2">
//                                                 <button
//                                                     onClick={() => {
//                                                         navigate('/dashboard/profile')
//                                                         setShowProfile(false)
//                                                     }}
//                                                     className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <UserCircle className="w-4 h-4" />
//                                                     Profile
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         navigate('/dashboard/settings')
//                                                         setShowProfile(false)
//                                                     }}
//                                                     className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <Settings className="w-4 h-4" />
//                                                     Settings
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         navigate('/dashboard/support')
//                                                         setShowProfile(false)
//                                                     }}
//                                                     className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <HelpCircle className="w-4 h-4" />
//                                                     Help
//                                                 </button>
//                                             </div>
//                                             <div className="border-t border-[#1E293B] py-2">
//                                                 <button
//                                                     onClick={handleLogout}
//                                                     className="w-full px-4 py-2.5 text-left text-sm text-danger hover:bg-danger/10 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <LogOut className="w-4 h-4" />
//                                                     Logout
//                                                 </button>
//                                             </div>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>

//                 {/* Page Content */}
//                 <main className="p-6">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default DashboardLayout





// // src/layouts/DashboardLayout.jsx
// import React, { useState, useEffect } from 'react'
// import { Outlet, useNavigate, useLocation } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     Menu,
//     X,
//     Search,
//     Bell,
//     Sun,
//     Moon,
//     ChevronDown,
//     Home,
//     Users,
//     UserPlus,
//     Shield,
//     Grid,
//     Layers,
//     Package,
//     Box,
//     ShoppingCart,
//     Star,
//     User,
//     FileText,
//     Ticket,
//     AlertTriangle,
//     MessageSquare,
//     Gift,
//     BarChart3,
//     Image,
//     CreditCard,
//     File,
//     BookOpen,
//     Palette,
//     Settings,
//     TrendingUp,
//     HelpCircle,
//     UserCircle,
//     LogOut,
//     ChevronRight,
//     ChevronLeft,
//     Store,
//     Newspaper,
//     Puzzle,
//     ShoppingBag,
// } from 'lucide-react'
// import { useAuth } from '../context/AuthContext'
// import mithilaLogo from '../assets/logo.png'

// const DashboardLayout = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true)
//     const [isMobileOpen, setIsMobileOpen] = useState(false)
//     const [isDarkMode, setIsDarkMode] = useState(true)
//     const [searchQuery, setSearchQuery] = useState('')
//     const [notifications, setNotifications] = useState([
//         { id: 1, title: 'New order received', time: '2 min ago', read: false },
//         { id: 2, title: 'Low stock alert', time: '15 min ago', read: false },
//         { id: 3, title: 'Review from customer', time: '1 hour ago', read: true },
//     ])
//     const [showNotifications, setShowNotifications] = useState(false)
//     const [showProfile, setShowProfile] = useState(false)
//     const location = useLocation()
//     const navigate = useNavigate()
//     const { user, logout } = useAuth()

//     // Get store name from user
//     const storeName = user?.storeName || user?.storeId?.name || 'My Store'
//     // Get first letter of store name for logo
//     const storeInitial = storeName.charAt(0).toUpperCase()

//     // Main Menu Items (Transactions tak)
//     const mainMenuItems = [
//         { icon: Home, label: 'Home', path: '/dashboard' },
//         { icon: Users, label: 'Store Users', path: '/dashboard/store-users' },
//         { icon: Grid, label: 'Categories', path: '/dashboard/categories' },
//         { icon: Layers, label: 'Brands', path: '/dashboard/brands' },
//         { icon: Package, label: 'Products', path: '/dashboard/products' },
//         { icon: Box, label: 'Inventory', path: '/dashboard/inventory' },
//         { icon: Star, label: 'Reviews', path: '/dashboard/reviews' },
//         { icon: User, label: 'Customers', path: '/dashboard/customers' },
//         { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders' },
//         { icon: FileText, label: 'Leads', path: '/dashboard/leads' },
//         { icon: AlertTriangle, label: 'Issues', path: '/dashboard/issues' },
//         { icon: MessageSquare, label: 'SMS Marketing', path: '/dashboard/sms-marketing' },
//         { icon: Gift, label: 'Discount Coupons', path: '/dashboard/discount-coupons' },
//         { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
//         { icon: Image, label: 'Media Library', path: '/dashboard/media' },
//         { icon: CreditCard, label: 'Transactions', path: '/dashboard/transactions' },
//     ]

//     // Customizations Menu Items (Transactions ke neeche)
//     const customizationsItems = [
//         { icon: File, label: 'Pages', path: '/dashboard/pages' },
//         { icon: BookOpen, label: 'Blog', path: '/dashboard/blog' },
//         { icon: Puzzle, label: 'Plugins', path: '/dashboard/plugins' },
//         { icon: Palette, label: 'Appearance', path: '/dashboard/appearance' },
//         { icon: Store, label: 'Store Setting', path: '/dashboard/store' },
//         { icon: CreditCard, label: 'Payment Setting', path: '/dashboard/payment' },
//         { icon: ShoppingBag, label: 'Checkout Setting', path: '/dashboard/checkout' },
//     ]

//     // ✅ Settings - REMOVED (Ab koi Settings item nahi hai)
//     const settingsItems = [
//         // Settings REMOVED ✅
//     ]

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth < 1024) {
//                 setIsSidebarOpen(false)
//             } else {
//                 setIsSidebarOpen(true)
//             }
//         }
//         handleResize()
//         window.addEventListener('resize', handleResize)
//         return () => window.removeEventListener('resize', handleResize)
//     }, [])

//     const handleLogout = () => {
//         logout()
//     }

//     const toggleSidebar = () => {
//         if (window.innerWidth < 1024) {
//             setIsMobileOpen(!isMobileOpen)
//         } else {
//             setIsSidebarOpen(!isSidebarOpen)
//         }
//     }

//     const handleNotificationClick = () => {
//         setShowNotifications(!showNotifications)
//         setShowProfile(false)
//         setNotifications(notifications.map(n => ({ ...n, read: true })))
//     }

//     const getUnreadCount = () => {
//         return notifications.filter(n => !n.read).length
//     }

//     return (
//         <div className="min-h-screen bg-background flex">
//             {/* Sidebar Overlay for Mobile */}
//             <AnimatePresence>
//                 {isMobileOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                         onClick={() => setIsMobileOpen(false)}
//                     />
//                 )}
//             </AnimatePresence>

//             {/* Sidebar - Full Height */}
//             <motion.aside
//                 className={`fixed top-0 left-0 h-screen bg-[#0B1020] border-r border-[#1E293B] z-50 transition-all duration-300 flex flex-col ${
//                     isSidebarOpen ? 'w-[280px]' : 'w-[72px]'
//                 } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
//                 initial={false}
//                 animate={{
//                     width: isSidebarOpen ? 280 : 72,
//                 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 {/* Sidebar Header - Store Name with First Letter Logo + OWNER */}
//                 <div className="flex-shrink-0 flex items-center justify-between h-20 px-4 border-b border-[#1E293B]">
//                     <AnimatePresence>
//                         {isSidebarOpen && (
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.8 }}
//                                 transition={{ duration: 0.2 }}
//                                 className="flex items-center gap-3 overflow-hidden"
//                             >
//                                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/25">
//                                     <span className="text-white font-bold text-lg">
//                                         {storeInitial}
//                                     </span>
//                                 </div>
//                                 <div className="flex flex-col min-w-0">
//                                     <span className="text-sm font-bold text-white truncate">
//                                         {storeName}
//                                     </span>
//                                     <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
//                                         OWNER
//                                     </span>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                     <button
//                         onClick={toggleSidebar}
//                         className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white flex-shrink-0"
//                     >
//                         {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
//                     </button>
//                 </div>

//                 {/* Sidebar Navigation */}
//                 <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-[#1E293B]">
//                     <nav className="px-2 space-y-0.5">
//                         {/* Main Menu Items */}
//                         {mainMenuItems.map((item) => {
//                             const isActive = location.pathname === item.path
//                             return (
//                                 <motion.button
//                                     key={item.path}
//                                     onClick={() => {
//                                         navigate(item.path)
//                                         if (window.innerWidth < 1024) {
//                                             setIsMobileOpen(false)
//                                         }
//                                     }}
//                                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border border-indigo-500/20'
//                                             : 'text-textSecondary hover:text-white hover:bg-white/5'
//                                     }`}
//                                     whileHover={{ x: 4 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
//                                     <AnimatePresence>
//                                         {isSidebarOpen && (
//                                             <motion.span
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.button>
//                             )
//                         })}

//                         {/* Customizations Heading */}
//                         {isSidebarOpen && (
//                             <div className="pt-3 mt-2 border-t border-[#1E293B]">
//                                 <div className="px-3 mb-1.5">
//                                     <div className="flex items-center gap-2">
//                                         <Settings className="w-4 h-4 text-indigo-400" />
//                                         <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Customizations</span>
//                                     </div>
//                                     <div className="border-b border-[#1E293B] mt-1.5"></div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Customizations Menu Items */}
//                         {customizationsItems.map((item) => {
//                             const isActive = location.pathname === item.path
//                             return (
//                                 <motion.button
//                                     key={item.path}
//                                     onClick={() => {
//                                         navigate(item.path)
//                                         if (window.innerWidth < 1024) {
//                                             setIsMobileOpen(false)
//                                         }
//                                     }}
//                                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border border-indigo-500/20'
//                                             : 'text-textSecondary hover:text-white hover:bg-white/5'
//                                     }`}
//                                     whileHover={{ x: 4 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : ''}`} />
//                                     <AnimatePresence>
//                                         {isSidebarOpen && (
//                                             <motion.span
//                                                 initial={{ opacity: 0, width: 0 }}
//                                                 animate={{ opacity: 1, width: 'auto' }}
//                                                 exit={{ opacity: 0, width: 0 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                             >
//                                                 {item.label}
//                                             </motion.span>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.button>
//                             )
//                         })}

//                         {/* ✅ Settings Section - COMPLETELY REMOVED */}
//                         {/* Settings items removed - no Settings, no Reports, no Support, no Profile */}
//                     </nav>
//                 </div>

//                 {/* Logout Button */}
//                 <div className="flex-shrink-0 px-2 py-4 border-t border-[#1E293B]">
//                     <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-danger hover:bg-danger/10 transition-all duration-200"
//                         whileHover={{ x: 4 }}
//                         whileTap={{ scale: 0.98 }}
//                     >
//                         <LogOut className="w-5 h-5 flex-shrink-0" />
//                         <AnimatePresence>
//                             {isSidebarOpen && (
//                                 <motion.span
//                                     initial={{ opacity: 0, width: 0 }}
//                                     animate={{ opacity: 1, width: 'auto' }}
//                                     exit={{ opacity: 0, width: 0 }}
//                                     transition={{ duration: 0.2 }}
//                                     className="text-sm font-medium whitespace-nowrap overflow-hidden"
//                                 >
//                                     Logout
//                                 </motion.span>
//                             )}
//                         </AnimatePresence>
//                     </button>
//                 </div>
//             </motion.aside>

//             {/* Main Content */}
//             <div
//                 className={`flex-1 transition-all duration-300 min-h-screen ${
//                     isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[72px]'
//                 }`}
//             >
//                 {/* Top Navbar - MithilaSoft with Logo */}
//                 <nav className="sticky top-0 z-30 glass border-b border-[#1E293B] px-6 py-3">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <button
//                                 onClick={toggleSidebar}
//                                 className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white lg:hidden"
//                             >
//                                 <Menu className="w-5 h-5" />
//                             </button>

//                             <div className="flex items-center gap-3">
//                                 <img 
//                                     src={mithilaLogo} 
//                                     alt="MithilaSoft" 
//                                     className="h-8 w-auto"
//                                 />
//                                 <div className="flex flex-col">
//                                     <span className="text-sm font-bold text-white">MithilaSoft</span>
//                                     <span className="text-[8px] text-textSecondary tracking-wider">
//                                         EMPOWERING BUSINESSES
//                                     </span>
//                                 </div>
//                             </div>

//                             <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#131A2B] border border-[#1E293B] focus-within:border-indigo-500 transition-all duration-300 ml-4">
//                                 <Search className="w-4 h-4 text-textSecondary" />
//                                 <input
//                                     type="text"
//                                     placeholder="Search..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     className="bg-transparent border-none outline-none text-sm text-white placeholder-textSecondary w-48 md:w-64"
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-2">
//                             <button className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white md:hidden">
//                                 <Search className="w-5 h-5" />
//                             </button>

//                             <button
//                                 onClick={() => setIsDarkMode(!isDarkMode)}
//                                 className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white"
//                             >
//                                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//                             </button>

//                             <div className="relative">
//                                 <button
//                                     onClick={handleNotificationClick}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200 text-textSecondary hover:text-white relative"
//                                 >
//                                     <Bell className="w-5 h-5" />
//                                     {getUnreadCount() > 0 && (
//                                         <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger animate-pulse"></span>
//                                     )}
//                                 </button>

//                                 <AnimatePresence>
//                                     {showNotifications && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                                             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             transition={{ duration: 0.2 }}
//                                             className="absolute right-0 top-full mt-2 w-80 glass rounded-2xl border border-[#1E293B] shadow-2xl overflow-hidden"
//                                         >
//                                             <div className="p-4 border-b border-[#1E293B]">
//                                                 <h4 className="font-semibold">Notifications</h4>
//                                             </div>
//                                             <div className="max-h-96 overflow-y-auto">
//                                                 {notifications.length === 0 ? (
//                                                     <div className="p-4 text-center text-textSecondary text-sm">
//                                                         No notifications
//                                                     </div>
//                                                 ) : (
//                                                     notifications.map((notification) => (
//                                                         <div
//                                                             key={notification.id}
//                                                             className={`px-4 py-3 border-b border-[#1E293B] hover:bg-white/5 transition-colors duration-200 cursor-pointer ${
//                                                                 !notification.read ? 'bg-indigo-500/5' : ''
//                                                             }`}
//                                                         >
//                                                             <div className="flex items-start gap-3">
//                                                                 <div className={`w-2 h-2 rounded-full mt-1.5 ${
//                                                                     !notification.read ? 'bg-indigo-400' : 'bg-[#1E293B]'
//                                                                 }`} />
//                                                                 <div>
//                                                                     <p className="text-sm">{notification.title}</p>
//                                                                     <p className="text-xs text-textSecondary mt-0.5">{notification.time}</p>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ))
//                                                 )}
//                                             </div>
//                                             <div className="p-3 border-t border-[#1E293B] text-center">
//                                                 <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
//                                                     View All
//                                                 </button>
//                                             </div>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>

//                             <div className="relative">
//                                 <button
//                                     onClick={() => setShowProfile(!showProfile)}
//                                     className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
//                                         <span className="text-white font-semibold text-sm">
//                                             {user?.ownerName?.charAt(0) || user?.name?.charAt(0) || 'U'}
//                                         </span>
//                                     </div>
//                                     <ChevronDown className="w-4 h-4 text-textSecondary" />
//                                 </button>

//                                 <AnimatePresence>
//                                     {showProfile && (
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                                             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             transition={{ duration: 0.2 }}
//                                             className="absolute right-0 top-full mt-2 w-56 glass rounded-2xl border border-[#1E293B] shadow-2xl overflow-hidden"
//                                         >
//                                             <div className="p-4 border-b border-[#1E293B]">
//                                                 <div className="font-semibold">{user?.ownerName || user?.name || 'User'}</div>
//                                                 <div className="text-sm text-textSecondary">{user?.email || ''}</div>
//                                                 <div className="text-xs text-indigo-400 mt-1">{user?.storeName || 'Store'}</div>
//                                             </div>
//                                             <div className="py-2">
//                                                 <button
//                                                     onClick={() => {
//                                                         navigate('/dashboard/profile')
//                                                         setShowProfile(false)
//                                                     }}
//                                                     className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <UserCircle className="w-4 h-4" />
//                                                     Profile
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         navigate('/dashboard/settings')
//                                                         setShowProfile(false)
//                                                     }}
//                                                     className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <Settings className="w-4 h-4" />
//                                                     Settings
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         navigate('/dashboard/support')
//                                                         setShowProfile(false)
//                                                     }}
//                                                     className="w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <HelpCircle className="w-4 h-4" />
//                                                     Help
//                                                 </button>
//                                             </div>
//                                             <div className="border-t border-[#1E293B] py-2">
//                                                 <button
//                                                     onClick={handleLogout}
//                                                     className="w-full px-4 py-2.5 text-left text-sm text-danger hover:bg-danger/10 transition-colors duration-200 flex items-center gap-3"
//                                                 >
//                                                     <LogOut className="w-4 h-4" />
//                                                     Logout
//                                                 </button>
//                                             </div>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>

//                 {/* Page Content */}
//                 <main className="p-6">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default DashboardLayout







//src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Menu,
    X,
    Search,
    Bell,
    Sun,
    Moon,
    ChevronDown,
    Home,
    Users,
    UserPlus,
    Shield,
    Grid,
    Layers,
    Package,
    Box,
    ShoppingCart,
    Star,
    User,
    FileText,
    Ticket,
    AlertTriangle,
    MessageSquare,
    Gift,
    BarChart3,
    Image,
    CreditCard,
    File,
    BookOpen,
    Palette,
    Settings,
    TrendingUp,
    HelpCircle,
    UserCircle,
    LogOut,
    ChevronRight,
    ChevronLeft,
    Store,
    Newspaper,
    Puzzle,
    ShoppingBag,
    Rocket,
    Globe,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import ViewWebsiteModal from '../components/dashboard/ViewWebsiteModal'
import mithilaLogo from '../assets/logo.png'

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    // ✅ Dark Mode State - Default dark
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved ? saved === 'dark' : true
    })
    const [searchQuery, setSearchQuery] = useState('')
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New order received', time: '2 min ago', read: false },
        { id: 2, title: 'Low stock alert', time: '15 min ago', read: false },
        { id: 3, title: 'Review from customer', time: '1 hour ago', read: true },
    ])
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [showViewWebsiteModal, setShowViewWebsiteModal] = useState(false)
    const [showLaunchModal, setShowLaunchModal] = useState(false)
    const [editingStoreName, setEditingStoreName] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    // Get store name from user
    const storeName = user?.storeName || user?.storeId?.name || 'My Store'
    const storeInitial = storeName.charAt(0).toUpperCase()

    // ✅ Apply theme to document
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [isDarkMode])

    // ✅ Toggle Dark Mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    const mainMenuItems = [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: Users, label: 'Store Users', path: '/dashboard/store-users' },
        { icon: Grid, label: 'Categories', path: '/dashboard/categories' },
        { icon: Layers, label: 'Brands', path: '/dashboard/brands' },
        { icon: Package, label: 'Products', path: '/dashboard/products' },
        { icon: Box, label: 'Inventory', path: '/dashboard/inventory' },
        { icon: Star, label: 'Reviews', path: '/dashboard/reviews' },
        { icon: User, label: 'Customers', path: '/dashboard/customers' },
        { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders' },
        { icon: FileText, label: 'Leads', path: '/dashboard/leads' },
        { icon: AlertTriangle, label: 'Issues', path: '/dashboard/issues' },
        { icon: MessageSquare, label: 'SMS Marketing', path: '/dashboard/sms-marketing' },
        { icon: Gift, label: 'Discount Coupons', path: '/dashboard/discount-coupons' },
        { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
        { icon: Image, label: 'Media Library', path: '/dashboard/media' },
        { icon: CreditCard, label: 'Transactions', path: '/dashboard/transactions' },
    ]

    const customizationsItems = [
        { icon: File, label: 'Pages', path: '/dashboard/pages' },
        { icon: BookOpen, label: 'Blog', path: '/dashboard/blog' },
        { icon: Puzzle, label: 'Plugins', path: '/dashboard/plugins' },
        { icon: Palette, label: 'Appearance', path: '/dashboard/appearance' },
        { icon: Store, label: 'Store Setting', path: '/dashboard/store' },
        { icon: CreditCard, label: 'Payment Setting', path: '/dashboard/payment' },
        { icon: ShoppingBag, label: 'Checkout Setting', path: '/dashboard/checkout' },
    ]

    const settingsItems = []

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
        logout()
        // Clear localStorage
        localStorage.removeItem('userName')
        localStorage.removeItem('token')
        localStorage.removeItem('storeName')
        // Redirect to login
        navigate('/login')
    }

    const getStorefrontUrl = (storeNameValue = localStorage.getItem('storeName') || storeName || user?.storeName || user?.storeSlug || 'store') => {
        const cleanedStoreName = String(storeNameValue || '').trim()
        const finalStoreName = cleanedStoreName || 'store'
        return `${window.location.origin}/storefront/${encodeURIComponent(finalStoreName)}`
    }

    const handleOpenStorefront = () => {
        const storefrontUrl = getStorefrontUrl()
        window.open(storefrontUrl, '_blank', 'noopener,noreferrer')
    }

    // ✅ Handle Launch Button Click - Open Modal
    const handleLaunch = () => {
        const savedName = localStorage.getItem('storeName') || storeName || user?.storeName || user?.storeSlug || ''
        setEditingStoreName(savedName)
        setShowLaunchModal(true)
    }

    // ✅ Handle Launch Now - Save and Open Storefront
    const handleLaunchNow = () => {
        if (editingStoreName.trim()) {
            const trimmedStoreName = editingStoreName.trim()
            localStorage.setItem('storeName', trimmedStoreName)
            setShowLaunchModal(false)
            handleOpenStorefront()
        }
    }

    // ✅ Handle Cancel Modal
    const handleCancelLaunchModal = () => {
        setShowLaunchModal(false)
        setEditingStoreName('')
    }

    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setIsMobileOpen(!isMobileOpen)
        } else {
            setIsSidebarOpen(!isSidebarOpen)
        }
    }

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications)
        setShowProfile(false)
        setNotifications(notifications.map(n => ({ ...n, read: true })))
    }

    const getUnreadCount = () => {
        return notifications.filter(n => !n.read).length
    }

    // ✅ Global Theme CSS Variable Classes
    const bgPrimary = 'bg-background'
    const bgSecondary = 'bg-sidebar'
    const bgCard = 'bg-card'
    const bgHover = 'hover:bg-cardHover'
    const bgInput = 'bg-background'
    const bgNav = 'bg-navbar border-b border-border'

    // Text colors
    const textPrimary = 'text-textPrimary'
    const textSecondary = 'text-textSecondary'
    const textMuted = 'text-textMuted'
    const textHover = 'hover:text-textPrimary'

    // Border colors
    const borderColor = 'border-border'
    const borderLight = 'border-border'

    // Shadow
    const shadow = 'shadow-sm dark:shadow-none'

    // Glass effect for dark mode
    const glassBg = 'bg-card'

    return (
        <div className={`min-h-screen ${bgPrimary} transition-colors duration-300`}>
            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-40 lg:hidden"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - Full Height - DeepSeek Style */}
            <motion.aside
                className={`fixed top-0 left-0 h-screen ${bgSecondary} border-r ${borderColor} z-50 transition-all duration-300 flex flex-col ${
                    isSidebarOpen ? 'w-[280px]' : 'w-[72px]'
                } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
                initial={false}
                animate={{
                    width: isSidebarOpen ? 280 : 72,
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Sidebar Header */}
                <div className={`flex-shrink-0 flex items-center justify-between h-20 px-4 border-b ${borderColor}`}>
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-3 overflow-hidden"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/25">
                                    <span className="text-white font-bold text-lg">
                                        {storeInitial}
                                    </span>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className={`text-sm font-bold truncate ${textPrimary}`}>
                                        {storeName}
                                    </span>
                                    <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                                        OWNER
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={toggleSidebar}
                        className={`p-2 rounded-xl ${bgHover} transition-colors duration-200 ${textSecondary} ${textHover}`}
                    >
                        {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 overflow-y-auto py-4 sidebar-scroll">
                    <nav className="px-2 space-y-0.5">
                        {mainMenuItems.map((item) => {
                            const isActive = item.path === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(item.path)
                            return (
                                <motion.button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path)
                                        if (window.innerWidth < 1024) {
                                            setIsMobileOpen(false)
                                        }
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
                                        isActive
                                            ? `bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium`
                                            : `${textSecondary} ${bgHover} ${textHover}`
                                    }`}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-sm font-medium whitespace-nowrap overflow-hidden"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            )
                        })}

                        {/* Customizations Heading */}
                        {isSidebarOpen && (
                            <div className={`pt-3 mt-2 border-t ${borderColor}`}>
                                <div className="px-3 mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <Settings className="w-4 h-4 text-indigo-400" />
                                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Customizations</span>
                                    </div>
                                    <div className={`border-b ${borderColor} mt-1.5`}></div>
                                </div>
                            </div>
                        )}

                        {customizationsItems.map((item) => {
                            const isActive = location.pathname.startsWith(item.path)
                            return (
                                <motion.button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path)
                                        if (window.innerWidth < 1024) {
                                            setIsMobileOpen(false)
                                        }
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${
                                        isActive
                                            ? `bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium`
                                            : `${textSecondary} ${bgHover} ${textHover}`
                                    }`}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="text-sm font-medium whitespace-nowrap overflow-hidden"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            )
                        })}
                    </nav>
                </div>


            </motion.aside>

            {/* Main Content */}
            <div
                className={`flex-1 transition-all duration-300 min-h-screen ${
                    isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[72px]'
                }`}
            >
                {/* Top Navbar - DeepSeek Style */}
                <nav className={`sticky top-0 z-30 ${bgNav} px-6 py-3 transition-colors duration-300`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleSidebar}
                                className="btn-icon lg:hidden"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-3">
                                <img 
                                    src={mithilaLogo} 
                                    alt="MithilaSoft" 
                                    className={`h-8 w-auto transition-all duration-300 dark:brightness-200`}
                                />
                                <div className="flex flex-col">
                                    <span className={`text-sm font-bold ${textPrimary}`}>MithilaSoft</span>
                                    <span className={`text-[8px] ${textSecondary} tracking-wider`}>
                                        EMPOWERING BUSINESSES
                                    </span>
                                </div>
                            </div>

                            <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl ${bgInput} border ${borderColor} focus-within:border-indigo-500 transition-all duration-300 ml-4`}>
                                <Search className={`w-4 h-4 ${textSecondary}`} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`bg-transparent border-none outline-none text-sm ${textPrimary} placeholder:${textSecondary} w-48 md:w-64`}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="btn-icon md:hidden">
                                <Search className="w-5 h-5" />
                            </button>

                            {/* ✅ Launch Button - Green with Rocket Icon */}
                            <button
                                onClick={handleLaunch}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-semibold text-sm"
                                title="Launch storefront in new tab"
                            >
                                <Rocket className="w-4 h-4" />
                                <span>Launch</span>
                            </button>

                            {/* ✅ Dark/Light Mode Toggle - DeepSeek Style */}
                            <button
                                onClick={toggleDarkMode}
                                className="btn-icon"
                                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-400 hover:text-yellow-300" />
                                ) : (
                                    <Moon className="w-5 h-5 text-indigo-400 hover:text-indigo-300" />
                                )}
                            </button>

                            <div className="relative">
                                <button
                                    onClick={handleNotificationClick}
                                    className="btn-icon relative"
                                >
                                    <Bell className="w-5 h-5" />
                                    {getUnreadCount() > 0 && (
                                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {showNotifications && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className={`absolute right-0 top-full mt-2 w-80 ${bgCard} rounded-2xl border ${borderColor} ${shadow} overflow-hidden`}
                                        >
                                            <div className={`p-4 border-b ${borderColor}`}>
                                                <h4 className={`font-semibold ${textPrimary}`}>Notifications</h4>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className={`p-4 text-center ${textSecondary} text-sm`}>
                                                        No notifications
                                                    </div>
                                                ) : (
                                                    notifications.map((notification) => (
                                                        <div
                                                            key={notification.id}
                                                            className={`px-4 py-3 border-b ${borderColor} ${bgHover} transition-colors duration-200 cursor-pointer ${
                                                                !notification.read ? 'bg-indigo-500/5' : ''
                                                            }`}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                                                                    !notification.read ? 'bg-indigo-400' : 'bg-white/10'
                                                                }`} />
                                                                <div>
                                                                    <p className={`text-sm ${textPrimary}`}>{notification.title}</p>
                                                                    <p className={`text-xs ${textSecondary} mt-0.5`}>{notification.time}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                            <div className={`p-3 border-t ${borderColor} text-center`}>
                                                <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                                                    View All
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="btn-icon w-auto px-2 border-transparent bg-transparent hover:bg-cardHover"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                        <span className="text-white font-semibold text-sm">
                                            {(() => {
                                                const userName = localStorage.getItem('userName')
                                                if (userName) {
                                                    const names = userName.trim().split(' ')
                                                    const initials = names.map(n => n.charAt(0).toUpperCase()).join('')
                                                    return initials.slice(0, 2) || 'U'
                                                }
                                                return user?.ownerName?.charAt(0) || user?.name?.charAt(0) || 'U'
                                            })()}
                                        </span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 ${textSecondary}`} />
                                </button>

                                <AnimatePresence>
                                    {showProfile && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className={`absolute right-0 top-full mt-2 w-56 ${bgCard} rounded-2xl border ${borderColor} ${shadow} overflow-hidden`}
                                        >
                                            <div className={`p-4 border-b ${borderColor}`}>
                                                <div className={`font-semibold ${textPrimary}`}>{localStorage.getItem('userName') || user?.ownerName || user?.name || 'User'}</div>
                                                <div className={`text-sm ${textSecondary}`}>{user?.email || ''}</div>
                                                <div className="text-xs text-indigo-400 mt-1">{user?.storeName || 'Store'}</div>
                                            </div>
                                            <div className="py-2">
                                                <button
                                                    onClick={() => {
                                                        navigate('/dashboard/profile')
                                                        setShowProfile(false)
                                                    }}
                                                    className={`w-full px-4 py-2.5 text-left text-sm ${bgHover} transition-colors duration-200 flex items-center gap-3 ${textPrimary}`}
                                                >
                                                    <UserCircle className="w-4 h-4" />
                                                    Profile
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleOpenStorefront()
                                                        setShowProfile(false)
                                                    }}
                                                    className={`w-full px-4 py-2.5 text-left text-sm ${bgHover} transition-colors duration-200 flex items-center gap-3 ${textPrimary}`}
                                                >
                                                    <Globe className="w-4 h-4" />
                                                    View Website
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigate('/dashboard/settings')
                                                        setShowProfile(false)
                                                    }}
                                                    className={`w-full px-4 py-2.5 text-left text-sm ${bgHover} transition-colors duration-200 flex items-center gap-3 ${textPrimary}`}
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    Settings
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigate('/dashboard/support')
                                                        setShowProfile(false)
                                                    }}
                                                    className={`w-full px-4 py-2.5 text-left text-sm ${bgHover} transition-colors duration-200 flex items-center gap-3 ${textPrimary}`}
                                                >
                                                    <HelpCircle className="w-4 h-4" />
                                                    Help
                                                </button>
                                            </div>
                                            <div className={`border-t ${borderColor} py-2`}>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200 flex items-center gap-3"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>

            <ViewWebsiteModal
                isOpen={showViewWebsiteModal}
                onClose={() => setShowViewWebsiteModal(false)}
                storeName={user?.storeName || user?.storeId?.name || 'My Store'}
                storeSlug={user?.storeSlug || user?.store?.slug || ''}
            />

            {/* ✅ Launch Modal */}
            <AnimatePresence>
                {showLaunchModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={handleCancelLaunchModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`${bgCard} rounded-2xl border ${borderColor} ${shadow} w-full max-w-md p-6`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                        <Rocket className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className={`text-lg font-bold ${textPrimary}`}>Launch Storefront</h2>
                                        <p className={`text-xs ${textSecondary}`}>Configure your storefront settings</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCancelLaunchModal}
                                    className={`p-2 rounded-lg ${bgHover} hover:bg-red-500/10 transition-colors duration-200`}
                                >
                                    <X className={`w-5 h-5 ${textSecondary}`} />
                                </button>
                            </div>

                            {/* Store Name Input */}
                            <div className="mb-4">
                                <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>
                                    Store Name
                                </label>
                                <input
                                    type="text"
                                    value={editingStoreName}
                                    onChange={(e) => setEditingStoreName(e.target.value)}
                                    placeholder="Enter store name"
                                    className={`w-full px-4 py-3 rounded-lg ${bgInput} border ${borderColor} focus:border-green-500 outline-none transition-all duration-200 ${textPrimary} placeholder:${textSecondary}`}
                                />
                            </div>

                            {/* URL Preview */}
                            <div className="mb-6">
                                <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>
                                    Storefront URL Preview
                                </label>
                                <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${bgInput} border ${borderColor}`}>
                                    <Globe className={`w-4 h-4 ${textSecondary} flex-shrink-0`} />
                                    <span className={`text-sm ${textSecondary} break-all`}>
                                        {window.location.origin}/storefront/{editingStoreName.trim() || 'your-store'}
                                    </span>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleCancelLaunchModal}
                                    className={`flex-1 px-4 py-2.5 rounded-lg border ${borderColor} ${textPrimary} font-semibold hover:${bgHover} transition-all duration-200`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLaunchNow}
                                    disabled={!editingStoreName.trim()}
                                    className="flex-1 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                                >
                                    <Rocket className="w-4 h-4" />
                                    Launch Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default DashboardLayout





















