
// // frontend/src/pages/LandingPage.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import {
//     Menu,
//     X,
//     ArrowRight,
//     Play,
//     ShoppingBag,
//     TrendingUp,
//     Users,
//     Package,
//     BarChart3,
//     Layers,
//     Settings,
//     Shield,
//     Zap,
//     CheckCircle,
//     Star,
//     ChevronDown,
//     Mail,
//     Phone,
//     MapPin,
//     Twitter,
//     Github,
//     Linkedin,
//     Youtube,
//     Facebook,
//     Instagram,
//     MessageCircle,
//     Home,
//     Briefcase,
//     Building2,
//     User,
//     FileText,
//     Users as UsersIcon,
//     Star as StarIcon,
//     Heart,
//     Megaphone,
//     PenTool,
//     Palette,
//     Film,
//     Camera,
//     Share2,
//     Video,
//     Globe,
//     Search,
// } from 'lucide-react'
// import mithilaLogo from '../assets/logo.png'

// // TikTok Icon Component (since it's not in lucide-react)
// const TikTokIcon = ({ className = "w-5 h-5" }) => (
//     <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M16.6 5.82s.51.5 0 0A4.14 4.14 0 0 1 15.54 0h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.5 2.59 2.59 0 0 1 2.59-2.5c.28 0 .55.04.81.12V6.87a5.65 5.65 0 0 0-4.31-.38 5.68 5.68 0 0 0-2.94 2.56 5.68 5.68 0 0 0-.73 3.81 5.68 5.68 0 0 0 2.61 3.92 5.68 5.68 0 0 0 4.31.38 5.68 5.68 0 0 0 2.94-2.56 5.68 5.68 0 0 0 .73-3.81V5.82z"/>
//     </svg>
// )

// // ... rest of the component code continues...

// const LandingPage = () => {
//     const [isScrolled, setIsScrolled] = useState(false)
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//     const [activeDropdown, setActiveDropdown] = useState(null)
//     const { scrollYProgress } = useScroll()
//     const heroRef = useRef(null)

//     const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
//     const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
//     const y = useTransform(scrollYProgress, [0, 0.3], [0, 50])

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY
//             if (scrollPosition > 30) {
//                 setIsScrolled(true)
//             } else {
//                 setIsScrolled(false)
//             }
//         }
//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     const navLinks = [
//         {
//             label: 'Solutions',
//             items: ['Ecommerce', 'Retail', 'B2B', 'Dropshipping', 'Marketplace'],
//         },
//         {
//             label: 'Products',
//             items: ['Inventory', 'Orders', 'Customers', 'Analytics', 'Marketing'],
//         },
//         {
//             label: 'Pricing',
//             items: ['Starter', 'Professional', 'Enterprise', 'Custom'],
//         },
//         {
//             label: 'Company',
//             items: ['About', 'Careers', 'Blog', 'Press', 'Partners'],
//         },
//         {
//             label: 'Resources',
//             items: ['Help Center', 'Documentation', 'Community', 'API', 'Status'],
//         },
//     ]

//     const features = [
//         { icon: ShoppingBag, label: 'Products', desc: 'Manage your entire product catalog with ease' },
//         { icon: Package, label: 'Orders', desc: 'Track and fulfill orders seamlessly' },
//         { icon: Users, label: 'Customers', desc: 'Build lasting customer relationships' },
//         { icon: BarChart3, label: 'Analytics', desc: 'Data-driven insights for growth' },
//         { icon: Layers, label: 'Inventory', desc: 'Real-time inventory management' },
//         { icon: Shield, label: 'Security', desc: 'Enterprise-grade security standards' },
//     ]

//     const stats = [
//         { value: '50K+', label: 'Active Stores' },
//         { value: '$2B+', label: 'GMV Processed' },
//         { value: '99.9%', label: 'Uptime' },
//         { value: '4.9', label: 'User Rating' },
//     ]

//     const testimonials = [
//         {
//             name: 'Sarah Johnson',
//             role: 'CEO, TechVibe',
//             content: 'MithilaSoft transformed our business. We doubled our sales in 3 months.',
//             rating: 5,
//         },
//         {
//             name: 'Michael Chen',
//             role: 'Founder, ShopWave',
//             content: "The best ecommerce platform I've ever used. Incredible features and support.",
//             rating: 5,
//         },
//         {
//             name: 'Emily Rodriguez',
//             role: 'Marketing Director, TrendSet',
//             content: 'Analytics and automation features are game-changing for our growth strategy.',
//             rating: 5,
//         },
//     ]

//     return (
//         <div className="min-h-screen bg-background overflow-x-hidden">
//             {/* Enhanced Navbar with Attractive Color Transitions */}
//             <motion.nav
//                 className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
//                     isScrolled
//                         ? 'bg-gradient-to-r from-[#0B1020] via-[#1a1040] to-[#0B1020] backdrop-blur-2xl border-b border-indigo-500/20 shadow-2xl shadow-indigo-500/20'
//                         : 'bg-transparent'
//                 }`}
//                 initial={{ y: -100 }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
//             >
//                 {/* Animated gradient overlay */}
//                 <div className={`absolute inset-0 transition-all duration-700 ${
//                     isScrolled 
//                         ? 'bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 opacity-100' 
//                         : 'opacity-0'
//                 }`}></div>
                
//                 {/* Glow line at bottom when scrolled */}
//                 <div className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-700 ${
//                     isScrolled 
//                         ? 'bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-100' 
//                         : 'opacity-0'
//                 }`}></div>

//                 <div className="container mx-auto px-4 md:px-6 relative z-10">
//                     <div className="flex items-center justify-between h-20">
//                         {/* Logo with MithilaSoft branding */}
//                         <Link to="/" className="flex items-center gap-3 group">
//                             <motion.div
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="flex items-center gap-2"
//                             >
//                                 <img 
//                                     src={mithilaLogo} 
//                                     alt="MithilaSoft" 
//                                     className={`h-10 w-auto transition-all duration-500 ${
//                                         isScrolled ? 'filter brightness-125 drop-shadow-[0_0_10px_rgba(79,70,229,0.3)]' : ''
//                                     }`}
//                                 />
//                                 <div className="flex flex-col">
//                                     <span className={`text-xl font-bold transition-all duration-500 ${
//                                         isScrolled ? 'text-white drop-shadow-[0_0_20px_rgba(79,70,229,0.2)]' : 'text-white'
//                                     }`}>
//                                         MithilaSoft
//                                     </span>
//                                     <span className={`text-[10px] tracking-wider transition-all duration-500 ${
//                                         isScrolled ? 'text-indigo-300 drop-shadow-[0_0_10px_rgba(79,70,229,0.2)]' : 'text-textSecondary'
//                                     }`}>
//                                         EMPOWERING BUSINESSES
//                                     </span>
//                                 </div>
//                             </motion.div>
//                         </Link>

//                         {/* Desktop Navigation */}
//                         <div className="hidden lg:flex items-center gap-8">
//                             {navLinks.map((link) => (
//                                 <div
//                                     key={link.label}
//                                     className="relative group"
//                                     onMouseEnter={() => setActiveDropdown(link.label)}
//                                     onMouseLeave={() => setActiveDropdown(null)}
//                                 >
//                                     <button className={`transition-all duration-300 flex items-center gap-1 text-sm font-medium ${
//                                         isScrolled 
//                                             ? 'text-gray-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(79,70,229,0.3)]' 
//                                             : 'text-textSecondary hover:text-white'
//                                     }`}>
//                                         {link.label}
//                                         <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
//                                             activeDropdown === link.label ? 'rotate-180 text-indigo-400' : ''
//                                         }`} />
//                                     </button>

//                                     <AnimatePresence>
//                                         {activeDropdown === link.label && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                 exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 className="absolute top-full left-0 mt-2 w-48 glass rounded-2xl border border-indigo-500/20 shadow-2xl shadow-indigo-500/20 overflow-hidden backdrop-blur-xl bg-[#0B1020]/90"
//                                             >
//                                                 {link.items.map((item) => (
//                                                     <a
//                                                         key={item}
//                                                         href="#"
//                                                         className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-cyan-500/20 transition-all duration-200"
//                                                     >
//                                                         {item}
//                                                     </a>
//                                                 ))}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Right Side */}
//                         <div className="hidden lg:flex items-center gap-4">
//                             <Link
//                                 to="/login"
//                                 className={`transition-all duration-300 text-sm font-medium ${
//                                     isScrolled 
//                                         ? 'text-gray-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(79,70,229,0.3)]' 
//                                         : 'text-textSecondary hover:text-white'
//                                 }`}
//                             >
//                                 Login
//                             </Link>
//                             <Link
//                                 to="/register"
//                                 className={`text-sm transition-all duration-500 px-6 py-3 rounded-2xl font-semibold ${
//                                     isScrolled 
//                                         ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:scale-105'
//                                         : 'btn-primary'
//                                 }`}
//                             >
//                                 Get Started
//                             </Link>
//                         </div>

//                         {/* Mobile Menu Toggle */}
//                         <button
//                             className="lg:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors duration-200"
//                             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                         >
//                             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                         </button>
//                     </div>

//                     {/* Mobile Menu */}
//                     <AnimatePresence>
//                         {mobileMenuOpen && (
//                             <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: 'auto' }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="lg:hidden overflow-hidden border-t border-indigo-500/20 py-4"
//                             >
//                                 {navLinks.map((link) => (
//                                     <div key={link.label} className="py-2">
//                                         <div className="text-gray-300 font-medium mb-1">{link.label}</div>
//                                         {link.items.map((item) => (
//                                             <a
//                                                 key={item}
//                                                 href="#"
//                                                 className="block px-4 py-1.5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
//                                             >
//                                                 {item}
//                                             </a>
//                                         ))}
//                                     </div>
//                                 ))}
//                                 <div className="flex flex-col gap-3 pt-4 border-t border-indigo-500/20">
//                                     <Link
//                                         to="/login"
//                                         className="text-center text-gray-300 hover:text-white transition-colors duration-200"
//                                     >
//                                         Login
//                                     </Link>
//                                     <Link
//                                         to="/register"
//                                         className="btn-primary text-center"
//                                     >
//                                         Get Started
//                                     </Link>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </motion.nav>

//             {/* Hero Section */}
//             <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float"></div>
//                     <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-delay"></div>
//                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl"></div>
//                 </div>

//                 <div className="container mx-auto px-4 md:px-6 relative z-10">
//                     <div className="grid lg:grid-cols-2 gap-16 items-center">
//                         <motion.div
//                             initial={{ opacity: 0, x: -50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                         >
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.4 }}
//                                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1E293B] bg-white/5 mb-6"
//                             >
//                                 <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
//                                 <span className="text-sm text-textSecondary">Trusted by 50,000+ businesses</span>
//                             </motion.div>

//                             <motion.h1
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, delay: 0.6 }}
//                                 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6"
//                             >
//                                 Build, Manage & Grow
//                                 <br />
//                                 <span className="gradient-text">Your Online Business</span>
//                                 <br />
//                                 With Confidence
//                             </motion.h1>

//                             <motion.p
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, delay: 0.8 }}
//                                 className="text-lg text-textSecondary max-w-lg mb-8 leading-relaxed"
//                             >
//                                 One platform to manage products, orders, customers, inventory, payments, analytics,
//                                 marketing and business growth.
//                             </motion.p>

//                             <motion.div
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, delay: 1 }}
//                                 className="flex flex-wrap gap-4"
//                             >
//                                 <Link to="/register" className="btn-primary flex items-center gap-2">
//                                     Start Free Trial
//                                     <ArrowRight className="w-5 h-5" />
//                                 </Link>
//                                 <button className="btn-secondary flex items-center gap-2">
//                                     <Play className="w-5 h-5" />
//                                     Watch Demo
//                                 </button>
//                             </motion.div>

//                             <motion.div
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, delay: 1.2 }}
//                                 className="grid grid-cols-4 gap-6 mt-12"
//                             >
//                                 {stats.map((stat, index) => (
//                                     <div key={index}>
//                                         <div className="text-2xl font-bold gradient-text">{stat.value}</div>
//                                         <div className="text-sm text-textSecondary">{stat.label}</div>
//                                     </div>
//                                 ))}
//                             </motion.div>
//                         </motion.div>

//                         <motion.div
//                             initial={{ opacity: 0, x: 50, scale: 0.9 }}
//                             animate={{ opacity: 1, x: 0, scale: 1 }}
//                             transition={{ duration: 0.8, delay: 0.4 }}
//                             className="relative"
//                         >
//                             <div className="relative">
//                                 <div className="glass rounded-3xl border border-[#1E293B] p-6 shadow-2xl">
//                                     <div className="flex items-center justify-between mb-6">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
//                                                 <span className="text-white font-bold text-sm">MS</span>
//                                             </div>
//                                             <div>
//                                                 <div className="text-sm font-semibold">Dashboard</div>
//                                                 <div className="text-xs text-textSecondary">Overview</div>
//                                             </div>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center">
//                                                 <span className="text-xs">🔔</span>
//                                             </div>
//                                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
//                                                 <span className="text-xs font-bold">JD</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="grid grid-cols-2 gap-3 mb-6">
//                                         {[
//                                             { label: 'Revenue', value: '$48,291', color: 'indigo' },
//                                             { label: 'Orders', value: '1,284', color: 'cyan' },
//                                             { label: 'Customers', value: '3,891', color: 'amber' },
//                                             { label: 'Products', value: '247', color: 'success' },
//                                         ].map((stat, i) => (
//                                             <div
//                                                 key={i}
//                                                 className="bg-[#0B1020]/50 rounded-2xl p-4 border border-[#1E293B]"
//                                             >
//                                                 <div className={`text-xs text-textSecondary mb-1`}>{stat.label}</div>
//                                                 <div className={`text-lg font-bold text-${
//                                                     stat.color === 'indigo' ? 'indigo-400' :
//                                                     stat.color === 'cyan' ? 'cyan-400' :
//                                                     stat.color === 'amber' ? 'amber-400' :
//                                                     'success'
//                                                 }`}>
//                                                     {stat.value}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>

//                                     <div className="bg-[#0B1020]/50 rounded-2xl p-4 border border-[#1E293B] h-32 flex items-center justify-center">
//                                         <div className="w-full h-16 flex items-end gap-2">
//                                             {[40, 60, 45, 80, 55, 70, 90].map((height, i) => (
//                                                 <div
//                                                     key={i}
//                                                     className="flex-1 bg-gradient-to-t from-indigo-500 to-cyan-500 rounded-t-lg transition-all duration-500"
//                                                     style={{ height: `${height}%` }}
//                                                 />
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <motion.div
//                                     className="absolute -top-6 -right-6 glass rounded-2xl p-4 border border-[#1E293B] shadow-2xl hidden lg:block"
//                                     animate={{
//                                         y: [0, -10, 0],
//                                     }}
//                                     transition={{
//                                         duration: 3,
//                                         repeat: Infinity,
//                                         ease: 'easeInOut',
//                                     }}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
//                                             <TrendingUp className="w-6 h-6 text-success" />
//                                         </div>
//                                         <div>
//                                             <div className="text-sm text-textSecondary">Sales Growth</div>
//                                             <div className="text-lg font-bold text-success">+23.5%</div>
//                                         </div>
//                                     </div>
//                                 </motion.div>

//                                 <motion.div
//                                     className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 border border-[#1E293B] shadow-2xl hidden lg:block"
//                                     animate={{
//                                         y: [0, 10, 0],
//                                     }}
//                                     transition={{
//                                         duration: 3.5,
//                                         repeat: Infinity,
//                                         ease: 'easeInOut',
//                                         delay: 1,
//                                     }}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
//                                             <Users className="w-6 h-6 text-amber-400" />
//                                         </div>
//                                         <div>
//                                             <div className="text-sm text-textSecondary">Active Users</div>
//                                             <div className="text-lg font-bold text-amber-400">1,247</div>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>

//             {/* Features Section */}
//             <section className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E293B] to-transparent"></div>
//                 </div>

//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#1E293B] text-xs font-medium text-textSecondary mb-4">
//                             Features
//                         </span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Everything You Need to
//                             <span className="gradient-text"> Succeed Online</span>
//                         </h2>
//                         <p className="text-textSecondary text-lg">
//                             Powerful tools and features to help you build, manage, and grow your online business
//                         </p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                                 viewport={{ once: true }}
//                                 className="card-hover p-8 group"
//                             >
//                                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                                     <feature.icon className="w-7 h-7 text-indigo-400" />
//                                 </div>
//                                 <h3 className="text-xl font-semibold mb-2">{feature.label}</h3>
//                                 <p className="text-textSecondary text-sm leading-relaxed">{feature.desc}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Testimonials */}
//             <section className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E293B] to-transparent"></div>
//                     <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E293B] to-transparent"></div>
//                 </div>

//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#1E293B] text-xs font-medium text-textSecondary mb-4">
//                             Testimonials
//                         </span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             What Our Users
//                             <span className="gradient-text"> Say About Us</span>
//                         </h2>
//                     </motion.div>

//                     <div className="grid md:grid-cols-3 gap-6">
//                         {testimonials.map((testimonial, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 whileInView={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                                 viewport={{ once: true }}
//                                 className="card p-8"
//                             >
//                                 <div className="flex gap-1 mb-4">
//                                     {[...Array(5)].map((_, i) => (
//                                         <Star
//                                             key={i}
//                                             className="w-4 h-4 fill-amber-400 text-amber-400"
//                                         />
//                                     ))}
//                                 </div>
//                                 <p className="text-textSecondary text-sm leading-relaxed mb-4">
//                                     "{testimonial.content}"
//                                 </p>
//                                 <div>
//                                     <div className="font-semibold">{testimonial.name}</div>
//                                     <div className="text-sm text-textSecondary">{testimonial.role}</div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1E293B] to-transparent"></div>
//                 </div>

//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="relative overflow-hidden rounded-3xl p-12 md:p-16 bg-gradient-to-br from-indigo-500/20 via-cyan-500/10 to-amber-500/10 border border-[#1E293B]"
//                     >
//                         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
//                         <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>

//                         <div className="relative z-10 text-center max-w-3xl mx-auto">
//                             <h2 className="text-3xl md:text-5xl font-bold mb-4">
//                                 Ready to Build Your
//                                 <span className="gradient-text"> Online Empire?</span>
//                             </h2>
//                             <p className="text-textSecondary text-lg mb-8">
//                                 Join 50,000+ businesses that trust MithilaSoft to power their growth
//                             </p>
//                             <div className="flex flex-wrap justify-center gap-4">
//                                 <Link to="/register" className="btn-primary flex items-center gap-2 text-lg">
//                                     Start Free Trial
//                                     <ArrowRight className="w-5 h-5" />
//                                 </Link>
//                                 <Link to="/login" className="btn-secondary text-lg">
//                                     Sign In
//                                 </Link>
//                             </div>
//                             <p className="text-sm text-textSecondary mt-4">No credit card required • 14-day free trial</p>
//                         </div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="border-t border-[#1E293B] py-12">
//                 <div className="container mx-auto px-4 md:px-6">
//                     <div className="grid md:grid-cols-4 gap-8 mb-8">
//                         {/* Quick Links */}
//                         <div>
//                             <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
//                             <ul className="space-y-2 text-sm text-textSecondary">
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Home className="w-3 h-3" /> Home</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Briefcase className="w-3 h-3" /> Our Services</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Building2 className="w-3 h-3" /> Our Company Business</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><User className="w-3 h-3" /> About Us</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><FileText className="w-3 h-3" /> Blog</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Mail className="w-3 h-3" /> Contact Us</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><UsersIcon className="w-3 h-3" /> Our Partners / Clients</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><StarIcon className="w-3 h-3" /> Review Us</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Heart className="w-3 h-3" /> Career (Job Openings)</a></li>
//                             </ul>
//                         </div>

//                         {/* Our Services */}
//                         <div>
//                             <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
//                             <ul className="space-y-2 text-sm text-textSecondary">
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Megaphone className="w-3 h-3" /> Digital Promotions</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><FileText className="w-3 h-3" /> Content Marketing</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><PenTool className="w-3 h-3" /> Graphic Designs</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Palette className="w-3 h-3" /> Motion Graphics</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Camera className="w-3 h-3" /> Photoshoot</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Share2 className="w-3 h-3" /> Social Media Management</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Video className="w-3 h-3" /> Videography</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Globe className="w-3 h-3" /> Website Development</a></li>
//                                 <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center gap-2"><Search className="w-3 h-3" /> SEO</a></li>
//                             </ul>
//                         </div>

//                         {/* Contact Details */}
//                         <div>
//                             <h4 className="text-lg font-semibold mb-4 text-white">Contact Details</h4>
//                             <ul className="space-y-3 text-sm">
//                                 <li className="flex items-start gap-3 text-textSecondary hover:text-white transition-colors duration-200">
//                                     <Phone className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
//                                     <a href="tel:+9779801666620" className="hover:text-white transition-colors duration-200">
//                                         +977 9801666620
//                                     </a>
//                                 </li>
//                                 <li className="flex items-start gap-3 text-textSecondary hover:text-white transition-colors duration-200">
//                                     <Mail className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
//                                     <a href="mailto:info@mithilagroup.com.np" className="hover:text-white transition-colors duration-200">
//                                         info@mithilagroup.com.np
//                                     </a>
//                                 </li>
//                                 <li className="flex items-start gap-3 text-textSecondary">
//                                     <MapPin className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
//                                     <span className="text-sm leading-relaxed">
//                                         Nepal, Madhesh Pradesh, Dhanusa,<br />
//                                         Janakpur Sub-Metropolitan - 7<br />
//                                         <span className="text-xs text-textSecondary/60">Code: 456</span>
//                                     </span>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* Brand & Social */}
//                         <div>
//                             <div className="flex items-center gap-3 mb-4">
//                                 <img 
//                                     src={mithilaLogo} 
//                                     alt="MithilaSoft" 
//                                     className="h-10 w-auto"
//                                 />
//                                 <div className="flex flex-col">
//                                     <span className="text-xl font-bold text-white">MithilaSoft</span>
//                                     <span className="text-[10px] text-textSecondary tracking-wider">
//                                         EMPOWERING BUSINESSES
//                                     </span>
//                                 </div>
//                             </div>
//                             <p className="text-sm text-textSecondary mb-4">
//                                 The complete ecommerce platform for businesses of all sizes.
//                             </p>
//                             <div className="flex gap-3">
//                                 <a 
//                                     href="https://www.facebook.com/MithilaGroupOfInustires" 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="text-textSecondary hover:text-[#1877F2] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(24,119,242,0.3)]"
//                                     aria-label="Facebook"
//                                 >
//                                     <Facebook className="w-5 h-5" />
//                                 </a>
//                                 <a 
//                                     href="https://www.instagram.com/mithila_group" 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="text-textSecondary hover:text-[#E4405F] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(228,64,95,0.3)]"
//                                     aria-label="Instagram"
//                                 >
//                                     <Instagram className="w-5 h-5" />
//                                 </a>
//                                 <a 
//                                     href="https://www.linkedin.com/company/mithilagroupcompany/" 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="text-textSecondary hover:text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(10,102,194,0.3)]"
//                                     aria-label="LinkedIn"
//                                 >
//                                     <Linkedin className="w-5 h-5" />
//                                 </a>
//                                 <a 
//                                     href="https://api.whatsapp.com/send?phone=9779801666620" 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="text-textSecondary hover:text-[#25D366] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(37,211,102,0.3)]"
//                                     aria-label="WhatsApp"
//                                 >
//                                     <MessageCircle className="w-5 h-5" />
//                                 </a>
//                                 <a 
//                                     href="https://www.tiktok.com/in/about" 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="text-textSecondary hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
//                                     aria-label="TikTok"
//                                 >
//                                     <TikTokIcon className="w-5 h-5" />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="border-t border-[#1E293B] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//                         <p className="text-sm text-textSecondary">
//                             © 2026 MithilaSoft. All rights reserved.
//                         </p>
//                         <div className="flex gap-6 text-sm text-textSecondary">
//                             <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
//                             <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
//                             <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default LandingPage





// frontend/src/pages/LandingPage.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import { Menu, X, ArrowRight, Play, ShoppingBag, TrendingUp, Users, Package, BarChart3, Layers, Settings, Shield, Zap, CheckCircle, Star, ChevronDown, Mail, Phone, MapPin, Twitter, Github, Linkedin, Youtube, Facebook, Instagram, MessageCircle, Home, Briefcase, Building2, User, FileText, Users as UsersIcon, Star as StarIcon, Heart, Megaphone, PenTool, Palette, Film, Camera, Share2, Video, Globe, Search, Diamond } from 'lucide-react'
// import mithilaLogo from '../assets/logo.png'

// // TikTok Icon Component
// const TikTokIcon = ({ className = "w-5 h-5" }) => (
//     <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M16.6 5.82s.51.5 0 0A4.14 4.14 0 0 1 15.54 0h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.5 2.59 2.59 0 0 1 2.59-2.5c.28 0 .55.04.81.12V6.87a5.65 5.65 0 0 0-4.31-.38 5.68 5.68 0 0 0-2.94 2.56 5.68 5.68 0 0 0-.73 3.81 5.68 5.68 0 0 0 2.61 3.92 5.68 5.68 0 0 0 4.31.38 5.68 5.68 0 0 0 2.94-2.56 5.68 5.68 0 0 0 .73-3.81V5.82z"/>
//     </svg>
// )

// const LandingPage = () => {
//     const [isScrolled, setIsScrolled] = useState(false)
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//     const { scrollYProgress } = useScroll()
//     const heroRef = useRef(null)
//     const solutionsRef = useRef(null)
//     const productsRef = useRef(null)
//     const pricingRef = useRef(null)
//     const companyRef = useRef(null)
//     const resourcesRef = useRef(null)

//     const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
//     const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
//     const y = useTransform(scrollYProgress, [0, 0.3], [0, 50])

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY
//             setIsScrolled(scrollPosition > 30)
//         }
//         window.addEventListener('scroll', handleScroll, { passive: true })
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     // Smooth scroll to section
//     const scrollToSection = (ref) => {
//         if (ref && ref.current) {
//             ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
//             setMobileMenuOpen(false)
//         }
//     }

//     // Navigation items with section refs
//     const navItems = [
//         { label: 'Solutions', ref: solutionsRef },
//         { label: 'Products', ref: productsRef },
//         { label: 'Pricing', ref: pricingRef },
//         { label: 'Company', ref: companyRef },
//         { label: 'Resources', ref: resourcesRef },
//     ]

//     const features = [
//         { icon: ShoppingBag, label: 'Products', desc: 'Manage your entire product catalog with ease' },
//         { icon: Package, label: 'Orders', desc: 'Track and fulfill orders seamlessly' },
//         { icon: Users, label: 'Customers', desc: 'Build lasting customer relationships' },
//         { icon: BarChart3, label: 'Analytics', desc: 'Data-driven insights for growth' },
//         { icon: Layers, label: 'Inventory', desc: 'Real-time inventory management' },
//         { icon: Shield, label: 'Security', desc: 'Enterprise-grade security standards' },
//     ]

//     const stats = [
//         { value: '50K+', label: 'Active Stores' },
//         { value: '$2B+', label: 'GMV Processed' },
//         { value: '99.9%', label: 'Uptime' },
//         { value: '4.9', label: 'User Rating' },
//     ]

//     const testimonials = [
//         {
//             name: 'Sarah Johnson',
//             role: 'CEO, TechVibe',
//             content: 'MithilaSoft transformed our business. We doubled our sales in 3 months.',
//             rating: 5,
//         },
//         {
//             name: 'Michael Chen',
//             role: 'Founder, ShopWave',
//             content: "The best ecommerce platform I've ever used. Incredible features and support.",
//             rating: 5,
//         },
//         {
//             name: 'Emily Rodriguez',
//             role: 'Marketing Director, TrendSet',
//             content: 'Analytics and automation features are game-changing for our growth strategy.',
//             rating: 5,
//         },
//     ]

//     return (
//         <div className="min-h-screen bg-[#0B1020] overflow-x-hidden text-[#F8FAFC]">
//             {/* Scroll Progress Bar - Diamond & Yellow Mix */}
//             <motion.div
//                 className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left"
//                 style={{
//                     scaleX: scrollYProgress,
//                     background: 'linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B, #FCD34D, #F59E0B)',
//                     boxShadow: '0 0 20px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.3)'
//                 }}
//             />
//             {/* Diamond Glow Effect */}
//             <motion.div
//                 className="fixed top-0 left-0 right-0 h-3 z-40 pointer-events-none opacity-50"
//                 style={{
//                     scaleX: scrollYProgress,
//                     background: 'linear-gradient(90deg, transparent, #FCD34D, #F59E0B, #FCD34D, transparent)',
//                     filter: 'blur(6px)'
//                 }}
//             />


//             {/* Navbar - Transparent by default, Solid Black with blur on scroll */}
// <motion.nav
//     className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         isScrolled
//             ? 'bg-black/90 backdrop-blur-xl border-b border-[#F59E0B]/20 shadow-2xl shadow-black/50'
//             : 'bg-transparent'
//     }`}
//     initial={{ y: -100 }}
//     animate={{ y: 0 }}
//     transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
// >
//     {/* Animated gradient glow line at bottom when scrolled */}
//     <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-700 ${
//         isScrolled
//             ? 'bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-80'
//             : 'opacity-0'
//     }`} />

//     {/* Background glow effect when scrolled */}
//     <div className={`absolute inset-0 transition-all duration-700 ${
//         isScrolled
//             ? 'bg-gradient-to-r from-[#F59E0B]/5 via-transparent to-[#FCD34D]/5 opacity-100'
//             : 'opacity-0'
//     }`} />

//     <div className="container mx-auto px-4 md:px-6 relative z-10">
//         <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-3 group">
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
//                     <img
//                         src={mithilaLogo}
//                         alt="MithilaSoft"
//                         className={`h-10 w-auto transition-all duration-500 ${
//                             isScrolled ? 'filter brightness-125 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]' : ''
//                         }`}
//                     />
//                     <div className="flex flex-col">
//                         <span className={`text-xl font-bold transition-all duration-500 ${
//                             isScrolled ? 'text-white drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'text-white'
//                         }`}>
//                             MithilaSoft
//                         </span>
//                         <span className={`text-[10px] tracking-wider transition-all duration-500 ${
//                             isScrolled ? 'text-[#FCD34D] drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'text-[#94A3B8]'
//                         }`}>
//                             EMPOWERING BUSINESSES
//                         </span>
//                     </div>
//                 </motion.div>
//             </Link>

//             {/* Desktop Navigation - Clickable Sections */}
//             <div className="hidden lg:flex items-center gap-8">
//                 {navItems.map((item) => (
//                     <button
//                         key={item.label}
//                         onClick={() => scrollToSection(item.ref)}
//                         className={`transition-all duration-300 text-sm font-medium ${
//                             isScrolled
//                                 ? 'text-gray-300 hover:text-[#FCD34D] hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]'
//                                 : 'text-[#94A3B8] hover:text-white'
//                         }`}
//                     >
//                         {item.label}
//                     </button>
//                 ))}
//             </div>

//             {/* Right Side */}
//             <div className="hidden lg:flex items-center gap-4">
//                 <Link
//                     to="/login"
//                     className={`transition-all duration-300 text-sm font-medium ${
//                         isScrolled
//                             ? 'text-gray-300 hover:text-[#FCD34D] hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]'
//                             : 'text-[#94A3B8] hover:text-white'
//                     }`}
//                 >
//                     Login
//                 </Link>
//                 <Link
//                     to="/register"
//                     className={`text-sm transition-all duration-500 px-6 py-3 rounded-2xl font-semibold ${
//                         isScrolled
//                             ? 'bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black hover:from-[#F59E0B]/80 hover:to-[#FCD34D]/80 shadow-lg shadow-[#F59E0B]/30 hover:shadow-[#F59E0B]/50 transform hover:scale-105'
//                             : 'bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black hover:shadow-lg hover:shadow-[#F59E0B]/30 transition-all duration-300'
//                     }`}
//                 >
//                     Get Started
//                 </Link>
//             </div>

//             {/* Mobile Menu Toggle */}
//             <button
//                 className="lg:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors duration-200"
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 aria-label="Toggle menu"
//             >
//                 {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//             {mobileMenuOpen && (
//                 <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="lg:hidden overflow-hidden border-t border-[#F59E0B]/20 py-4"
//                 >
//                     {navItems.map((item) => (
//                         <button
//                             key={item.label}
//                             onClick={() => scrollToSection(item.ref)}
//                             className="block w-full text-left px-4 py-2.5 text-gray-300 hover:text-[#FCD34D] hover:bg-white/5 rounded-xl transition-all duration-200"
//                         >
//                             {item.label}
//                         </button>
//                     ))}
//                     <div className="flex flex-col gap-3 pt-4 border-t border-[#F59E0B]/20 mt-2">
//                         <Link
//                             to="/login"
//                             className="text-center text-gray-300 hover:text-[#FCD34D] transition-colors duration-200 py-2"
//                         >
//                             Login
//                         </Link>
//                         <Link
//                             to="/register"
//                             className="text-center font-semibold px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black hover:shadow-lg hover:shadow-[#F59E0B]/30 transition-all duration-300"
//                         >
//                             Get Started
//                         </Link>
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     </div>
// </motion.nav>


// {/* HERO SECTION */}
// <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
//     {/* Parallax Background Elements with Real-time Data Feel */}
//     <div className="absolute inset-0 pointer-events-none">
//         <motion.div
//             className="absolute top-20 left-1/4 w-96 h-96 bg-[#F59E0B]/20 rounded-full blur-3xl"
//             animate={{ y: [0, -20, 0] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//             className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FCD34D]/20 rounded-full blur-3xl"
//             animate={{ y: [0, 20, 0] }}
//             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/10 rounded-full blur-3xl" />
       
//         {/* Animated floating particles for real-time feel */}
//         {[...Array(8)].map((_, i) => (
//             <motion.div
//                 key={i}
//                 className="absolute w-1 h-1 rounded-full bg-[#F59E0B]/30"
//                 animate={{
//                     x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
//                     y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
//                     opacity: [0.2, 0.8, 0.2],
//                 }}
//                 transition={{
//                     duration: 3 + Math.random() * 4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                 }}
//                 style={{
//                     top: `${10 + Math.random() * 80}%`,
//                     left: `${10 + Math.random() * 80}%`,
//                 }}
//             />
//         ))}
//     </div>

//     <div className="container mx-auto px-4 md:px-6 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//             >
//                 {/* Real-time Status Badge */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.4 }}
//                     className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 mb-6"
//                 >
//                     <span className="relative flex h-2.5 w-2.5">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]"></span>
//                     </span>
//                     <span className="text-sm text-[#FCD34D]">Live • 1,247 active users online</span>
//                     <span className="text-xs text-[#94A3B8]">|</span>
//                     <span className="text-xs text-[#94A3B8] animate-pulse">● Real-time</span>
//                 </motion.div>

//                 <motion.h1
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.6 }}
//                     className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] mb-4"
//                 >
//                     Build, Manage & Grow
//                     <br />
//                     <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">
//                         Your Online Business
//                     </span>
//                     <br />
//                     With Confidence
//                 </motion.h1>

//                 <motion.p
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.8 }}
//                     className="text-base md:text-lg text-[#94A3B8] max-w-lg mb-8 leading-relaxed"
//                 >
//                     One platform to manage products, orders, customers, inventory, payments, analytics,
//                     marketing and business growth.
//                 </motion.p>

//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 1 }}
//                     className="flex flex-wrap gap-4"
//                 >
//                     <Link
//                         to="/register"
//                         className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black font-semibold hover:shadow-2xl hover:shadow-[#F59E0B]/30 transition-all duration-300 hover:scale-105 group"
//                     >
//                         Start Free Trial
//                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                     </Link>
//                 </motion.div>

//                 {/* Real-time Stats with animated counters - Nepal Appropriate */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 1.2 }}
//                     className="grid grid-cols-4 gap-4 mt-10"
//                 >
//                     {[
//                         { value: '5K+', label: 'Active Stores', icon: '🏪' },
//                         { value: 'Rs 1Cr+', label: 'GMV Processed', icon: '💰' },
//                         { value: '99.9%', label: 'Uptime', icon: '⚡' },
//                         { value: '4.9/5', label: 'User Rating', icon: '⭐' },
//                     ].map((stat, index) => (
//                         <motion.div
//                             key={index}
//                             whileHover={{ scale: 1.05, y: -2 }}
//                             className="text-center p-3 rounded-xl bg-[#131A2B]/40 border border-[#1E293B] hover:border-[#F59E0B]/30 transition-all duration-300"
//                         >
//                             <div className="text-2xl mb-1">{stat.icon}</div>
//                             <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">
//                                 {stat.value}
//                             </div>
//                             <div className="text-xs md:text-sm text-[#94A3B8]">{stat.label}</div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </motion.div>

//             {/* Right Dashboard Mockup with Real-time Feel */}
//             <motion.div
//                 initial={{ opacity: 0, x: 50, scale: 0.95 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 className="relative"
//             >
//                 {/* Live indicator */}
//                 <motion.div
//                     className="absolute -top-4 -right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-[#F59E0B]/30 text-xs"
//                     animate={{ opacity: [0.7, 1, 0.7] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                 >
//                     <span className="relative flex h-2 w-2">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
//                     </span>
//                     <span className="text-[#FCD34D]">Live Data</span>
//                 </motion.div>

//                 <div className="bg-[#131A2B]/60 backdrop-blur-xl border border-[#F59E0B]/20 rounded-3xl p-6 shadow-2xl shadow-[#F59E0B]/10">
//                     {/* Dashboard Header with real-time clock */}
//                     <div className="flex items-center justify-between mb-6">
//                         <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#FCD34D] flex items-center justify-center shadow-lg shadow-[#F59E0B]/30">
//                                 <span className="text-black font-bold text-sm">MS</span>
//                             </div>
//                             <div>
//                                 <div className="text-sm font-semibold text-white">Dashboard</div>
//                                 <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
//                                     <span>Overview</span>
//                                     <span className="w-1 h-1 rounded-full bg-[#94A3B8]"></span>
//                                     <span className="text-[#FCD34D] animate-pulse">● Live</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             {/* Real-time clock */}
//                             <motion.div
//                                 className="text-xs text-[#FCD34D] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20"
//                                 animate={{ opacity: [0.8, 1, 0.8] }}
//                                 transition={{ duration: 1, repeat: Infinity }}
//                             >
//                                 {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
//                             </motion.div>
//                             <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-xs hover:bg-[#F59E0B]/10 transition-colors cursor-pointer">🔔</div>
//                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#FCD34D] flex items-center justify-center text-xs font-bold text-black cursor-pointer hover:scale-105 transition-transform">
//                                 JD
//                             </div>
//                         </div>
//                     </div>

//                     {/* Live Stats Grid with animated numbers - Nepal Currency */}
//                     <div className="grid grid-cols-2 gap-3 mb-6">
//                         {[
//                             { label: 'Revenue', value: 'Rs 48.3L', change: '+12.5%', color: 'text-[#F59E0B]' },
//                             { label: 'Orders', value: '1,284', change: '+8.3%', color: 'text-[#FCD34D]' },
//                             { label: 'Customers', value: '3,891', change: '+23.5%', color: 'text-[#F59E0B]' },
//                             { label: 'Products', value: '247', change: '+5.2%', color: 'text-[#FCD34D]' },
//                         ].map((stat, i) => (
//                             <motion.div
//                                 key={i}
//                                 className="bg-[#0B1020]/50 rounded-2xl p-4 border border-[#F59E0B]/10 hover:border-[#F59E0B]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#F59E0B]/5"
//                                 whileHover={{ scale: 1.02 }}
//                             >
//                                 <div className="flex items-center justify-between">
//                                     <div className="text-xs text-[#94A3B8]">{stat.label}</div>
//                                     <span className="text-[10px] text-[#22C55E] font-medium">{stat.change}</span>
//                                 </div>
//                                 <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Live Chart with animated bars */}
//                     <div className="bg-[#0B1020]/50 rounded-2xl p-4 border border-[#F59E0B]/10">
//                         <div className="flex items-center justify-between mb-3">
//                             <span className="text-xs text-[#94A3B8]">Sales Overview (Last 7 Days)</span>
//                             <span className="text-[10px] text-[#22C55E] flex items-center gap-1">
//                                 <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
//                                 +23.5% growth
//                             </span>
//                         </div>
//                         <div className="h-24 flex items-end gap-1.5">
//                             {[40, 60, 45, 80, 55, 70, 90, 65, 75, 50, 85, 95].map((height, i) => (
//                                 <motion.div
//                                     key={i}
//                                     initial={{ height: 0 }}
//                                     animate={{ height: `${height}%` }}
//                                     transition={{ duration: 0.8, delay: i * 0.05 }}
//                                     className="flex-1 bg-gradient-to-t from-[#F59E0B] to-[#FCD34D] rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group"
//                                 >
//                                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1E293B] text-[8px] text-[#94A3B8] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                                         {height}%
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                         <div className="flex justify-between mt-2">
//                             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
//                                 <span key={i} className="text-[8px] text-[#94A3B8]">{day}</span>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Floating Cards with Real-time Updates - Nepal Currency */}
//                 <motion.div
//                     className="absolute -top-6 -right-6 bg-[#131A2B]/90 backdrop-blur-xl rounded-2xl p-4 border border-[#F59E0B]/20 shadow-2xl hidden lg:block"
//                     animate={{ y: [0, -10, 0] }}
//                     transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//                 >
//                     <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 rounded-xl bg-[#22C55E]/20 flex items-center justify-center relative">
//                             <TrendingUp className="w-6 h-6 text-[#22C55E]" />
//                             <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#22C55E] animate-ping"></span>
//                         </div>
//                         <div>
//                             <div className="text-sm text-[#94A3B8]">Sales Growth</div>
//                             <div className="text-lg font-bold text-[#22C55E]">+23.5%</div>
//                             <div className="text-[10px] text-[#94A3B8]">Updated just now</div>
//                         </div>
//                     </div>
//                 </motion.div>

//                 <motion.div
//                     className="absolute -bottom-6 -left-6 bg-[#131A2B]/90 backdrop-blur-xl rounded-2xl p-4 border border-[#F59E0B]/20 shadow-2xl hidden lg:block"
//                     animate={{ y: [0, 10, 0] }}
//                     transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
//                 >
//                     <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center relative">
//                             <Users className="w-6 h-6 text-[#F59E0B]" />
//                             <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F59E0B] animate-pulse"></span>
//                         </div>
//                         <div>
//                             <div className="text-sm text-[#94A3B8]">Active Users</div>
//                             <div className="text-lg font-bold text-[#F59E0B]">1,247</div>
//                             <div className="text-[10px] text-[#22C55E]">● 12 online now</div>
//                         </div>
//                     </div>
//                 </motion.div>

//                 {/* Bottom-left floating notification */}
//                 <motion.div
//                     className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#131A2B]/90 backdrop-blur-xl rounded-full px-4 py-2 border border-[#F59E0B]/20 shadow-2xl hidden lg:flex items-center gap-2"
//                     animate={{ y: [0, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//                 >
//                     <span className="text-xs text-[#94A3B8]">🛒</span>
//                     <span className="text-xs text-[#94A3B8]">New order from</span>
//                     <span className="text-xs font-medium text-[#FCD34D]">Sarah's Store</span>
//                     <span className="text-[10px] text-[#22C55E]">● 2 min ago</span>
//                 </motion.div>
//             </motion.div>
//         </div>
//     </div>
// </section>




//             {/* SOLUTIONS SECTION */}
//             <section ref={solutionsRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Solutions</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Enterprise-Grade <span className="gradient-text-yellow">Solutions</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">Comprehensive solutions for businesses of every size and industry</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {[
//                             { icon: ShoppingBag, label: 'Ecommerce', desc: 'Complete online store solution with powerful features' },
//                             { icon: Users, label: 'Retail', desc: 'Unified commerce for physical and digital stores' },
//                             { icon: Building2, label: 'B2B', desc: 'Wholesale and B2B commerce made simple' },
//                             { icon: Package, label: 'Dropshipping', desc: 'Automated dropshipping fulfillment system' },
//                             { icon: Globe, label: 'Marketplace', desc: 'Multi-vendor marketplace platform' },
//                             { icon: BarChart3, label: 'Analytics', desc: 'Data-driven insights for business growth' },
//                         ].map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.08 }}
//                                 viewport={{ once: true }}
//                                 className="group p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//                             >
//                                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#FCD34D]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                                     <item.icon className="w-7 h-7 text-[#F59E0B]" />
//                                 </div>
//                                 <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
//                                 <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* PRODUCTS SECTION */}
//             <section ref={productsRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Products</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Powerful <span className="gradient-text-yellow">Products</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">Everything you need to build, manage, and grow your online business</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.08 }}
//                                 viewport={{ once: true }}
//                                 className="group p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//                             >
//                                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#FCD34D]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                                     <feature.icon className="w-7 h-7 text-[#F59E0B]" />
//                                 </div>
//                                 <h3 className="text-xl font-semibold mb-2">{feature.label}</h3>
//                                 <p className="text-[#94A3B8] text-sm leading-relaxed">{feature.desc}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>


//             {/* PRICING SECTION */}
// <section ref={pricingRef} className="py-24 relative">
//     <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//     </div>
//     <div className="container mx-auto px-4 md:px-6">
//         <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center max-w-3xl mx-auto mb-16"
//         >
//             <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Pricing</span>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 Choose Your <span className="gradient-text-yellow">Plan</span>
//             </h2>
//             <p className="text-[#94A3B8] text-lg">Flexible pricing options for businesses of every size</p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//             {/* Basic Plan */}
//             <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.05 }}
//                 viewport={{ once: true }}
//                 className="p-6 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//             >
//                 <h3 className="text-lg font-bold text-white mb-1">Basic</h3>
//                 <p className="text-sm text-[#94A3B8] mb-4">For New Online Sellers</p>
               
//                 <div className="mb-2">
//                     <span className="text-3xl font-bold gradient-text-yellow">Rs 24,000</span>
//                     <span className="text-sm text-[#94A3B8] ml-1">/year</span>
//                 </div>
//                 <p className="text-sm text-[#94A3B8] mb-6">% QR Payment Fee: 3.9%</p>
               
//                 <ul className="space-y-3 text-sm">
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <span>Fonepay Dynamic QR API Included</span>
//                     </li>
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <div>
//                             <span className="text-white font-medium">Orders per Year</span>
//                             <br />
//                             <span className="text-[#94A3B8]">5,000</span>
//                         </div>
//                     </li>
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <div>
//                             <span className="text-white font-medium">Products Limit</span>
//                             <br />
//                             <span className="text-[#94A3B8]">200</span>
//                         </div>
//                     </li>
//                 </ul>
//             </motion.div>

//             {/* Premium Plan */}
//             <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 viewport={{ once: true }}
//                 className="p-6 rounded-2xl border border-[#F59E0B] bg-[#F59E0B]/10 hover:shadow-xl hover:shadow-[#F59E0B]/20 transition-all duration-300 hover:-translate-y-1 relative"
//             >
//                 <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[#F59E0B] text-black text-xs font-semibold">Popular</span>
//                 <h3 className="text-lg font-bold text-white mb-1">Premium</h3>
//                 <p className="text-sm text-[#94A3B8] mb-4">Designed for growing brands</p>
               
//                 <div className="mb-2">
//                     <span className="text-3xl font-bold gradient-text-yellow">Rs 28,000</span>
//                     <span className="text-sm text-[#94A3B8] ml-1">/year</span>
//                 </div>
//                 <p className="text-sm text-[#94A3B8] mb-6">% QR Payment Fee: 3%</p>
               
//                 <ul className="space-y-3 text-sm">
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <span>Fonepay Dynamic QR API Included</span>
//                     </li>
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <div>
//                             <span className="text-white font-medium">Orders per Year</span>
//                             <br />
//                             <span className="text-[#94A3B8]">20,000</span>
//                         </div>
//                     </li>
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <div>
//                             <span className="text-white font-medium">Products Limit</span>
//                             <br />
//                             <span className="text-[#94A3B8]">1,000</span>
//                         </div>
//                     </li>
//                 </ul>
//             </motion.div>

//             {/* Business Plus Plan */}
//             <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.15 }}
//                 viewport={{ once: true }}
//                 className="p-6 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//             >
//                 <h3 className="text-lg font-bold text-white mb-1">Business Plus</h3>
//                 <p className="text-sm text-[#94A3B8] mb-4">For Scaling Businesses</p>
               
//                 <div className="mb-2">
//                     <span className="text-3xl font-bold gradient-text-yellow">Rs 38,000</span>
//                     <span className="text-sm text-[#94A3B8] ml-1">/year</span>
//                 </div>
//                 <p className="text-sm text-[#94A3B8] mb-6">% QR Payment Fee: 3%</p>
               
//                 <ul className="space-y-3 text-sm">
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <span>Fonepay Dynamic QR API Included</span>
//                     </li>
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <div>
//                             <span className="text-white font-medium">Orders per Year</span>
//                             <br />
//                             <span className="text-[#94A3B8]">50,000</span>
//                         </div>
//                     </li>
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <div>
//                             <span className="text-white font-medium">Products Limit</span>
//                             <br />
//                             <span className="text-[#94A3B8]">2,000</span>
//                         </div>
//                     </li>
//                 </ul>
//             </motion.div>

//             {/* Platinum Plan */}
//             <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 viewport={{ once: true }}
//                 className="p-6 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//             >
//                 <h3 className="text-lg font-bold text-white mb-1">Platinum</h3>
//                 <p className="text-sm text-[#94A3B8] mb-4">Enterprise infrastructure tier</p>
               
//                 <div className="mb-2">
//                     <span className="text-3xl font-bold gradient-text-yellow">Rs 48,000</span>
//                     <span className="text-sm text-[#94A3B8] ml-1">/year</span>
//                 </div>
//                 <p className="text-sm text-[#94A3B8] mb-6">% QR Payment Fee: 2.75%</p>
               
//                 <ul className="space-y-3 text-sm">
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <span>Fonepay Dynamic QR API Included</span>
//                     </li>
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <div>
//                             <span className="text-white font-medium">Orders per Year</span>
//                             <br />
//                             <span className="text-[#94A3B8]">5,000</span>
//                         </div>
//                     </li>
//                     <li className="flex items-start gap-2 text-[#94A3B8]">
//                         <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <div>
//                             <span className="text-white font-medium">Products Limit</span>
//                             <br />
//                             <span className="text-[#94A3B8]">5,000</span>
//                         </div>
//                     </li>
//                 </ul>
//             </motion.div>
//         </div>
//     </div>
// </section>

//             {/* COMPANY SECTION */}
//             <section ref={companyRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Company</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Built for <span className="gradient-text-yellow">Success</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">We're on a mission to empower businesses worldwide</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {[
//                             { number: '50K+', label: 'Businesses Trust Us' },
//                             { number: '200+', label: 'Countries Served' },
//                             { number: '99.9%', label: 'Uptime Guarantee' },
//                             { number: '4.9/5', label: 'Customer Rating' },
//                         ].map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 whileInView={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 viewport={{ once: true }}
//                                 className="text-center p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 bg-[#131A2B]/40 hover:-translate-y-1"
//                             >
//                                 <div className="text-4xl font-bold gradient-text-yellow">{item.number}</div>
//                                 <div className="text-[#94A3B8] mt-2">{item.label}</div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* RESOURCES SECTION */}
//             <section ref={resourcesRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Resources</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Learn & <span className="gradient-text-yellow">Grow</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">Everything you need to succeed with MithilaSoft</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {[
//                             { icon: FileText, label: 'Documentation', desc: 'Comprehensive guides and API references' },
//                             { icon: UsersIcon, label: 'Community', desc: 'Connect with other MithilaSoft users' },
//                             { icon: Video, label: 'Video Tutorials', desc: 'Step-by-step video guides and webinars' },
//                             { icon: Settings, label: 'Help Center', desc: 'Get help from our expert support team' },
//                             { icon: Globe, label: 'Blog', desc: 'Latest updates and industry insights' },
//                             { icon: Shield, label: 'Status', desc: 'Real-time service status and updates' },
//                         ].map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.08 }}
//                                 viewport={{ once: true }}
//                                 className="group p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//                             >
//                                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#FCD34D]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                                     <item.icon className="w-7 h-7 text-[#F59E0B]" />
//                                 </div>
//                                 <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
//                                 <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>


// {/* Testimonials */}
// <section className="py-24 relative">
//     <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//     </div>
//     <div className="container mx-auto px-4 md:px-6">
//         <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center max-w-3xl mx-auto mb-16"
//         >
//             <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Testimonials</span>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                 What Our Users <span className="gradient-text-yellow">Say</span>
//             </h2>
//             <p className="text-[#94A3B8] text-lg">Trusted by businesses across Nepal</p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-6">
//             {[
//                 {
//                     name: 'Ramesh Adhikari',
//                     role: 'CEO, Himalayan Mart',
//                     content: 'MithilaSoft transformed our ecommerce business. We doubled our sales in just 3 months. The platform is incredibly powerful and easy to use.',
//                     rating: 5,
//                     location: 'Kathmandu, Nepal'
//                 },
//                 {
//                     name: 'Sita Sharma',
//                     role: 'Founder, Shop Nepal',
//                     content: "The best ecommerce platform I've ever used. Incredible features, amazing support, and the analytics tools have been game-changing for our growth strategy.",
//                     rating: 5,
//                     location: 'Pokhara, Nepal'
//                 },
//                 {
//                     name: 'Krishna Thapa',
//                     role: 'Marketing Director, TrendSet',
//                     content: 'MithilaSoft has been instrumental in our digital transformation. The automation features and real-time analytics have helped us scale like never before.',
//                     rating: 5,
//                     location: 'Biratnagar, Nepal'
//                 },
//             ].map((testimonial, index) => (
//                 <motion.div
//                     key={index}
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                     className="p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 bg-[#131A2B]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F59E0B]/5"
//                 >
//                     <div className="flex gap-1 mb-4">
//                         {[...Array(5)].map((_, i) => (
//                             <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
//                         ))}
//                     </div>
//                     <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">"{testimonial.content}"</p>
//                     <div>
//                         <div className="font-semibold text-white">{testimonial.name}</div>
//                         <div className="text-sm text-[#FCD34D]">{testimonial.role}</div>
//                         <div className="text-xs text-[#94A3B8] mt-1 flex items-center gap-1">
//                             <span>📍</span> {testimonial.location}
//                         </div>
//                     </div>
//                 </motion.div>
//             ))}
//         </div>

//         {/* Additional Trust Badges */}
//         <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             viewport={{ once: true }}
//             className="mt-12 flex flex-wrap justify-center gap-6"
//         >
//             <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#1E293B] bg-[#131A2B]/40">
//                 <span className="text-2xl">🏆</span>
//                 <div>
//                     <div className="text-sm font-semibold text-white">500+</div>
//                     <div className="text-[10px] text-[#94A3B8]">Happy Businesses</div>
//                 </div>
//             </div>
//             <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#1E293B] bg-[#131A2B]/40">
//                 <span className="text-2xl">⭐</span>
//                 <div>
//                     <div className="text-sm font-semibold text-white">4.9/5</div>
//                     <div className="text-[10px] text-[#94A3B8]">Average Rating</div>
//                 </div>
//             </div>
//             <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#1E293B] bg-[#131A2B]/40">
//                 <span className="text-2xl">🇳🇵</span>
//                 <div>
//                     <div className="text-sm font-semibold text-white">77 Districts</div>
//                     <div className="text-[10px] text-[#94A3B8]">Serving Nepal Wide</div>
//                 </div>
//             </div>
//         </motion.div>
//     </div>
// </section>


//             {/* Final CTA */}
//             <section className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="relative overflow-hidden rounded-3xl p-12 md:p-16 bg-gradient-to-br from-[#F59E0B]/20 via-[#FCD34D]/10 to-[#F59E0B]/10 border border-[#F59E0B]/30"
//                     >
//                         <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/20 rounded-full blur-3xl" />
//                         <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FCD34D]/20 rounded-full blur-3xl" />
//                         <div className="relative z-10 text-center max-w-3xl mx-auto">
//                             <h2 className="text-3xl md:text-5xl font-bold mb-4">
//                                 Ready to Build Your
//                                 <span className="gradient-text-yellow"> Online Empire?</span>
//                             </h2>
//                             <p className="text-[#94A3B8] text-lg mb-8">
//                                 Join 50,000+ businesses that trust MithilaSoft to power their growth
//                             </p>
//                             <div className="flex flex-wrap justify-center gap-4">
//                                 <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black font-semibold hover:shadow-2xl hover:shadow-[#F59E0B]/30 transition-all duration-300 hover:scale-105">
//                                     Start Free Trial
//                                     <ArrowRight className="w-5 h-5" />
//                                 </Link>
//                                 <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#F59E0B]/30 hover:border-[#F59E0B] text-white font-medium transition-all duration-300 hover:bg-[#F59E0B]/10">
//                                     Sign In
//                                 </Link>
//                             </div>
//                             <p className="text-sm text-[#94A3B8] mt-4">No credit card required • 14-day free trial</p>
//                         </div>
//                     </motion.div>
//                 </div>
//             </section>

//            {/* Footer */}
// <footer className="border-t border-[#F59E0B]/20 py-12">
//     <div className="container mx-auto px-4 md:px-6">
//         <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//                 <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
//                 <ul className="space-y-2 text-sm text-[#94A3B8]">
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Home className="w-3 h-3" /> Home</a></li>
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Briefcase className="w-3 h-3" /> Our Services</a></li>
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Building2 className="w-3 h-3" /> Company</a></li>
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><User className="w-3 h-3" /> About Us</a></li>
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><FileText className="w-3 h-3" /> Blog</a></li>
//                 </ul>
//             </div>

//             <div>
//                 <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
//                 <ul className="space-y-2 text-sm text-[#94A3B8]">
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Megaphone className="w-3 h-3" /> Digital Promotions</a></li>
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><PenTool className="w-3 h-3" /> Graphic Design</a></li>
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Palette className="w-3 h-3" /> Motion Graphics</a></li>
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Camera className="w-3 h-3" /> Photoshoot</a></li>
//                     <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Share2 className="w-3 h-3" /> Social Media</a></li>
//                 </ul>
//             </div>

//             <div>
//                 <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
//                 <ul className="space-y-3 text-sm">
//                     <li className="flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">
//                         <Phone className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <a href="tel:+9779801666620" className="hover:text-[#FCD34D] transition-colors duration-200">
//                             +977 9801666620
//                         </a>
//                     </li>
//                     <li className="flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">
//                         <Mail className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <a
//                             href="mailto:info@mithilagroup.com.np"
//                             className="hover:text-[#FCD34D] transition-colors duration-200"
//                             onClick={(e) => {
//                                 e.preventDefault();
//                                 window.location.href = 'mailto:info@mithilagroup.com.np';
//                             }}
//                         >
//                             info@mithilagroup.com.np
//                         </a>
//                     </li>
//                     <li className="flex items-start gap-3 text-[#94A3B8]">
//                         <MapPin className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                         <span className="text-sm leading-relaxed   flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">
//                             Nepal, Madhesh Pradesh, Dhanusa,<br />
//                             Janakpur Sub-Metropolitan - 7<br />
                           
//                         </span>
//                     </li>
//                 </ul>
//             </div>

//             <div>
//                 <div className="flex items-center gap-3 mb-4">
//                     <img src={mithilaLogo} alt="MithilaSoft" className="h-10 w-auto" />
//                     <div>
//                         <span className="text-xl font-bold text-white">MithilaSoft</span>
//                         <span className="block text-[9px] text-[#FCD34D] tracking-widest -mt-0.5">EMPOWERING BUSINESSES</span>
//                     </div>
//                 </div>
//                 <p className="text-sm text-[#94A3B8] mb-4    flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">The complete ecommerce platform for businesses of all sizes.</p>
//                 <div className="flex gap-3">
//                     <a
//                         href="https://www.facebook.com/MithilaGroupOfInustires"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#94A3B8] hover:text-[#1877F2] transition-all duration-300 hover:scale-110"
//                         aria-label="Facebook"
//                     >
//                         <Facebook className="w-5 h-5" />
//                     </a>
//                     <a
//                         href="https://www.instagram.com/mithila_group"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#94A3B8] hover:text-[#E4405F] transition-all duration-300 hover:scale-110"
//                         aria-label="Instagram"
//                     >
//                         <Instagram className="w-5 h-5" />
//                     </a>
//                     <a
//                         href="https://www.linkedin.com/company/mithilagroupcompany/"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#94A3B8] hover:text-[#0A66C2] transition-all duration-300 hover:scale-110"
//                         aria-label="LinkedIn"
//                     >
//                         <Linkedin className="w-5 h-5" />
//                     </a>
//                     <a
//                         href="https://api.whatsapp.com/send?phone=9779801666620"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#94A3B8] hover:text-[#25D366] transition-all duration-300 hover:scale-110"
//                         aria-label="WhatsApp"
//                     >
//                         <MessageCircle className="w-5 h-5" />
//                     </a>
//                     <a
//                         href="#"
//                         className="text-[#94A3B8] hover:text-[#F59E0B] transition-all duration-300 hover:scale-110"
//                         aria-label="TikTok"
//                     >
//                         <TikTokIcon className="w-5 h-5" />
//                     </a>
//                 </div>
//             </div>
//         </div>

//         <div className="border-t border-[#F59E0B]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//             <p className="text-sm text-[#94A3B8]">© 2026 MithilaSoft. All rights reserved.</p>
//             <div className="flex gap-6 text-sm text-[#94A3B8]">
//                 <a href="#" className="hover:text-[#FCD34D] transition-colors duration-200">Privacy Policy</a>
//                 <a href="#" className="hover:text-[#FCD34D] transition-colors duration-200">Terms of Service</a>
//                 <a href="#" className="hover:text-[#FCD34D] transition-colors duration-200">Cookie Policy</a>
//             </div>
//         </div>
//     </div>
// </footer>
//         </div>
//     )
// }

// export default LandingPage




// // frontend/src/pages/LandingPage.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import { Menu, X, ArrowRight, Play, ShoppingBag, TrendingUp, Users, Package, BarChart3, Layers, Settings, Shield, Zap, CheckCircle, Star, ChevronDown, Mail, Phone, MapPin, Twitter, Github, Linkedin, Youtube, Facebook, Instagram, MessageCircle, Home, Briefcase, Building2, User, FileText, Users as UsersIcon, Star as StarIcon, Heart, Megaphone, PenTool, Palette, Film, Camera, Share2, Video, Globe, Search, Diamond } from 'lucide-react'
// import mithilaLogo from '../assets/logo.png'

// // TikTok Icon Component
// const TikTokIcon = ({ className = "w-5 h-5" }) => (
//     <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M16.6 5.82s.51.5 0 0A4.14 4.14 0 0 1 15.54 0h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.5 2.59 2.59 0 0 1 2.59-2.5c.28 0 .55.04.81.12V6.87a5.65 5.65 0 0 0-4.31-.38 5.68 5.68 0 0 0-2.94 2.56 5.68 5.68 0 0 0-.73 3.81 5.68 5.68 0 0 0 2.61 3.92 5.68 5.68 0 0 0 4.31.38 5.68 5.68 0 0 0 2.94-2.56 5.68 5.68 0 0 0 .73-3.81V5.82z"/>
//     </svg>
// )

// // Gradient Text Yellow Class
// const gradientTextYellow = "bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent"

// const LandingPage = () => {
//     const [isScrolled, setIsScrolled] = useState(false)
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//     const { scrollYProgress } = useScroll()
//     const heroRef = useRef(null)
//     const solutionsRef = useRef(null)
//     const productsRef = useRef(null)
//     const pricingRef = useRef(null)
//     const companyRef = useRef(null)
//     const resourcesRef = useRef(null)
//     const testimonialsRef = useRef(null)
//     const ctaRef = useRef(null)

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollPosition = window.scrollY
//             setIsScrolled(scrollPosition > 30)
//         }
//         window.addEventListener('scroll', handleScroll, { passive: true })
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     // Smooth scroll to section
//     const scrollToSection = (ref) => {
//         if (ref && ref.current) {
//             ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
//             setMobileMenuOpen(false)
//         }
//     }

//     // Navigation items with section refs
//     const navItems = [
//         { label: 'Solutions', ref: solutionsRef },
//         { label: 'Products', ref: productsRef },
//         { label: 'Pricing', ref: pricingRef },
//         { label: 'Company', ref: companyRef },
//         { label: 'Resources', ref: resourcesRef },
//         { label: 'Testimonials', ref: testimonialsRef },
//     ]

//     const features = [
//         { icon: ShoppingBag, label: 'Products', desc: 'Manage your entire product catalog with ease' },
//         { icon: Package, label: 'Orders', desc: 'Track and fulfill orders seamlessly' },
//         { icon: Users, label: 'Customers', desc: 'Build lasting customer relationships' },
//         { icon: BarChart3, label: 'Analytics', desc: 'Data-driven insights for growth' },
//         { icon: Layers, label: 'Inventory', desc: 'Real-time inventory management' },
//         { icon: Shield, label: 'Security', desc: 'Enterprise-grade security standards' },
//     ]

//     return (
//         <div className="min-h-screen bg-[#0B1020] overflow-x-hidden text-[#F8FAFC]">
//             {/* Scroll Progress Bar - Diamond & Yellow Mix */}
//             <motion.div
//                 className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left"
//                 style={{
//                     scaleX: scrollYProgress,
//                     background: 'linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B, #FCD34D, #F59E0B)',
//                     boxShadow: '0 0 20px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.3)'
//                 }}
//             />
//             <motion.div
//                 className="fixed top-0 left-0 right-0 h-3 z-40 pointer-events-none opacity-50"
//                 style={{
//                     scaleX: scrollYProgress,
//                     background: 'linear-gradient(90deg, transparent, #FCD34D, #F59E0B, #FCD34D, transparent)',
//                     filter: 'blur(6px)'
//                 }}
//             />

//             {/* Navbar */}
//             <motion.nav
//                 className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//                     isScrolled
//                         ? 'bg-black/90 backdrop-blur-xl border-b border-[#F59E0B]/20 shadow-2xl shadow-black/50'
//                         : 'bg-transparent'
//                 }`}
//                 initial={{ y: -100 }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 20 }}
//             >
//                 <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-700 ${
//                     isScrolled
//                         ? 'bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-80'
//                         : 'opacity-0'
//                 }`} />

//                 <div className={`absolute inset-0 transition-all duration-700 ${
//                     isScrolled
//                         ? 'bg-gradient-to-r from-[#F59E0B]/5 via-transparent to-[#FCD34D]/5 opacity-100'
//                         : 'opacity-0'
//                 }`} />

//                 <div className="container mx-auto px-4 md:px-6 relative z-10">
//                     <div className="flex items-center justify-between h-20">
//                         {/* Logo */}
//                         <Link to="/" className="flex items-center gap-3 group">
//                             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
//                                 <img
//                                     src={mithilaLogo}
//                                     alt="MithilaSoft"
//                                     className={`h-10 w-auto transition-all duration-500 ${
//                                         isScrolled ? 'filter brightness-125 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]' : ''
//                                     }`}
//                                 />
//                                 <div className="flex flex-col">
//                                     <span className={`text-xl font-bold transition-all duration-500 ${
//                                         isScrolled ? 'text-white drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'text-white'
//                                     }`}>
//                                         MithilaSoft
//                                     </span>
//                                     <span className={`text-[10px] tracking-wider transition-all duration-500 ${
//                                         isScrolled ? 'text-[#FCD34D] drop-shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'text-[#94A3B8]'
//                                     }`}>
//                                         EMPOWERING BUSINESSES
//                                     </span>
//                                 </div>
//                             </motion.div>
//                         </Link>

//                         {/* Desktop Navigation */}
//                         <div className="hidden lg:flex items-center gap-6 xl:gap-8">
//                             {navItems.map((item) => (
//                                 <button
//                                     key={item.label}
//                                     onClick={() => scrollToSection(item.ref)}
//                                     className={`transition-all duration-300 text-sm font-medium ${
//                                         isScrolled
//                                             ? 'text-gray-300 hover:text-[#FCD34D] hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]'
//                                             : 'text-[#94A3B8] hover:text-white'
//                                     }`}
//                                 >
//                                     {item.label}
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Right Side */}
//                         <div className="hidden lg:flex items-center gap-4">
//                             <Link
//                                 to="/login"
//                                 className={`transition-all duration-300 text-sm font-medium ${
//                                     isScrolled
//                                         ? 'text-gray-300 hover:text-[#FCD34D] hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]'
//                                         : 'text-[#94A3B8] hover:text-white'
//                                 }`}
//                             >
//                                 Login
//                             </Link>
//                             <Link
//                                 to="/register"
//                                 className={`text-sm transition-all duration-500 px-6 py-3 rounded-2xl font-semibold ${
//                                     isScrolled
//                                         ? 'bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black hover:from-[#F59E0B]/80 hover:to-[#FCD34D]/80 shadow-lg shadow-[#F59E0B]/30 hover:shadow-[#F59E0B]/50 transform hover:scale-105'
//                                         : 'bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black hover:shadow-lg hover:shadow-[#F59E0B]/30 transition-all duration-300'
//                                 }`}
//                             >
//                                 Get Started
//                             </Link>
//                         </div>

//                         {/* Mobile Menu Toggle */}
//                         <button
//                             className="lg:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors duration-200"
//                             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                             aria-label="Toggle menu"
//                         >
//                             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//                         </button>
//                     </div>

//                     {/* Mobile Menu */}
//                     <AnimatePresence>
//                         {mobileMenuOpen && (
//                             <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: 'auto' }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="lg:hidden overflow-hidden border-t border-[#F59E0B]/20 py-4"
//                             >
//                                 {navItems.map((item) => (
//                                     <button
//                                         key={item.label}
//                                         onClick={() => scrollToSection(item.ref)}
//                                         className="block w-full text-left px-4 py-2.5 text-gray-300 hover:text-[#FCD34D] hover:bg-white/5 rounded-xl transition-all duration-200"
//                                     >
//                                         {item.label}
//                                     </button>
//                                 ))}
//                                 <div className="flex flex-col gap-3 pt-4 border-t border-[#F59E0B]/20 mt-2">
//                                     <Link
//                                         to="/login"
//                                         className="text-center text-gray-300 hover:text-[#FCD34D] transition-colors duration-200 py-2"
//                                     >
//                                         Login
//                                     </Link>
//                                     <Link
//                                         to="/register"
//                                         className="text-center font-semibold px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black hover:shadow-lg hover:shadow-[#F59E0B]/30 transition-all duration-300"
//                                     >
//                                         Get Started
//                                     </Link>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </motion.nav>

//             {/* HERO SECTION */}
//             <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
//                 {/* ... Hero content (keep as is) ... */}
//                 <div className="absolute inset-0 pointer-events-none">
//                     <motion.div
//                         className="absolute top-20 left-1/4 w-96 h-96 bg-[#F59E0B]/20 rounded-full blur-3xl"
//                         animate={{ y: [0, -20, 0] }}
//                         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//                     />
//                     <motion.div
//                         className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FCD34D]/20 rounded-full blur-3xl"
//                         animate={{ y: [0, 20, 0] }}
//                         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//                     />
//                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/10 rounded-full blur-3xl" />
//                     {[...Array(8)].map((_, i) => (
//                         <motion.div
//                             key={i}
//                             className="absolute w-1 h-1 rounded-full bg-[#F59E0B]/30"
//                             animate={{
//                                 x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
//                                 y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
//                                 opacity: [0.2, 0.8, 0.2],
//                             }}
//                             transition={{
//                                 duration: 3 + Math.random() * 4,
//                                 repeat: Infinity,
//                                 ease: "easeInOut",
//                             }}
//                             style={{
//                                 top: `${10 + Math.random() * 80}%`,
//                                 left: `${10 + Math.random() * 80}%`,
//                             }}
//                         />
//                     ))}
//                 </div>

//                 <div className="container mx-auto px-4 md:px-6 relative z-10">
//                     <div className="grid lg:grid-cols-2 gap-12 items-center">
//                         <motion.div
//                             initial={{ opacity: 0, x: -50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                         >
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.4 }}
//                                 className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 mb-6"
//                             >
//                                 <span className="relative flex h-2.5 w-2.5">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]"></span>
//                                 </span>
//                                 <span className="text-sm text-[#FCD34D]">Live • 1,247 active users online</span>
//                                 <span className="text-xs text-[#94A3B8]">|</span>
//                                 <span className="text-xs text-[#94A3B8] animate-pulse">● Real-time</span>
//                             </motion.div>

//                             <motion.h1
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, delay: 0.6 }}
//                                 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] mb-4"
//                             >
//                                 Build, Manage & Grow
//                                 <br />
//                                 <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">
//                                     Your Online Business
//                                 </span>
//                                 <br />
//                                 With Confidence
//                             </motion.h1>

//                             <motion.p
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, delay: 0.8 }}
//                                 className="text-base md:text-lg text-[#94A3B8] max-w-lg mb-8 leading-relaxed"
//                             >
//                                 One platform to manage products, orders, customers, inventory, payments, analytics,
//                                 marketing and business growth.
//                             </motion.p>

//                             <motion.div
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, delay: 1 }}
//                                 className="flex flex-wrap gap-4"
//                             >
//                                 <Link
//                                     to="/register"
//                                     className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black font-semibold hover:shadow-2xl hover:shadow-[#F59E0B]/30 transition-all duration-300 hover:scale-105 group"
//                                 >
//                                     Start Free Trial
//                                     <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                                 </Link>
//                             </motion.div>

//                             <motion.div
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.8, delay: 1.2 }}
//                                 className="grid grid-cols-4 gap-4 mt-10"
//                             >
//                                 {[
//                                     { value: '5K+', label: 'Active Stores', icon: '🏪' },
//                                     { value: 'Rs 1Cr+', label: 'GMV Processed', icon: '💰' },
//                                     { value: '99.9%', label: 'Uptime', icon: '⚡' },
//                                     { value: '4.9/5', label: 'User Rating', icon: '⭐' },
//                                 ].map((stat, index) => (
//                                     <motion.div
//                                         key={index}
//                                         whileHover={{ scale: 1.05, y: -2 }}
//                                         className="text-center p-3 rounded-xl bg-[#131A2B]/40 border border-[#1E293B] hover:border-[#F59E0B]/30 transition-all duration-300"
//                                     >
//                                         <div className="text-2xl mb-1">{stat.icon}</div>
//                                         <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">
//                                             {stat.value}
//                                         </div>
//                                         <div className="text-xs md:text-sm text-[#94A3B8]">{stat.label}</div>
//                                     </motion.div>
//                                 ))}
//                             </motion.div>
//                         </motion.div>

//                         <motion.div
//                             initial={{ opacity: 0, x: 50, scale: 0.95 }}
//                             animate={{ opacity: 1, x: 0, scale: 1 }}
//                             transition={{ duration: 0.8, delay: 0.4 }}
//                             className="relative"
//                         >
//                             <motion.div
//                                 className="absolute -top-4 -right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-[#F59E0B]/30 text-xs"
//                                 animate={{ opacity: [0.7, 1, 0.7] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                             >
//                                 <span className="relative flex h-2 w-2">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
//                                 </span>
//                                 <span className="text-[#FCD34D]">Live Data</span>
//                             </motion.div>

//                             <div className="bg-[#131A2B]/60 backdrop-blur-xl border border-[#F59E0B]/20 rounded-3xl p-6 shadow-2xl shadow-[#F59E0B]/10">
//                                 <div className="flex items-center justify-between mb-6">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#FCD34D] flex items-center justify-center shadow-lg shadow-[#F59E0B]/30">
//                                             <span className="text-black font-bold text-sm">MS</span>
//                                         </div>
//                                         <div>
//                                             <div className="text-sm font-semibold text-white">Dashboard</div>
//                                             <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
//                                                 <span>Overview</span>
//                                                 <span className="w-1 h-1 rounded-full bg-[#94A3B8]"></span>
//                                                 <span className="text-[#FCD34D] animate-pulse">● Live</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <motion.div
//                                             className="text-xs text-[#FCD34D] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20"
//                                             animate={{ opacity: [0.8, 1, 0.8] }}
//                                             transition={{ duration: 1, repeat: Infinity }}
//                                         >
//                                             {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
//                                         </motion.div>
//                                         <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-xs hover:bg-[#F59E0B]/10 transition-colors cursor-pointer">🔔</div>
//                                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#FCD34D] flex items-center justify-center text-xs font-bold text-black cursor-pointer hover:scale-105 transition-transform">
//                                             JD
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-3 mb-6">
//                                     {[
//                                         { label: 'Revenue', value: 'Rs 48.3L', change: '+12.5%', color: 'text-[#F59E0B]' },
//                                         { label: 'Orders', value: '1,284', change: '+8.3%', color: 'text-[#FCD34D]' },
//                                         { label: 'Customers', value: '3,891', change: '+23.5%', color: 'text-[#F59E0B]' },
//                                         { label: 'Products', value: '247', change: '+5.2%', color: 'text-[#FCD34D]' },
//                                     ].map((stat, i) => (
//                                         <motion.div
//                                             key={i}
//                                             className="bg-[#0B1020]/50 rounded-2xl p-4 border border-[#F59E0B]/10 hover:border-[#F59E0B]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#F59E0B]/5"
//                                             whileHover={{ scale: 1.02 }}
//                                         >
//                                             <div className="flex items-center justify-between">
//                                                 <div className="text-xs text-[#94A3B8]">{stat.label}</div>
//                                                 <span className="text-[10px] text-[#22C55E] font-medium">{stat.change}</span>
//                                             </div>
//                                             <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
//                                         </motion.div>
//                                     ))}
//                                 </div>

//                                 <div className="bg-[#0B1020]/50 rounded-2xl p-4 border border-[#F59E0B]/10">
//                                     <div className="flex items-center justify-between mb-3">
//                                         <span className="text-xs text-[#94A3B8]">Sales Overview (Last 7 Days)</span>
//                                         <span className="text-[10px] text-[#22C55E] flex items-center gap-1">
//                                             <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></span>
//                                             +23.5% growth
//                                         </span>
//                                     </div>
//                                     <div className="h-24 flex items-end gap-1.5">
//                                         {[40, 60, 45, 80, 55, 70, 90, 65, 75, 50, 85, 95].map((height, i) => (
//                                             <motion.div
//                                                 key={i}
//                                                 initial={{ height: 0 }}
//                                                 animate={{ height: `${height}%` }}
//                                                 transition={{ duration: 0.8, delay: i * 0.05 }}
//                                                 className="flex-1 bg-gradient-to-t from-[#F59E0B] to-[#FCD34D] rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group"
//                                             >
//                                                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1E293B] text-[8px] text-[#94A3B8] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                                                     {height}%
//                                                 </div>
//                                             </motion.div>
//                                         ))}
//                                     </div>
//                                     <div className="flex justify-between mt-2">
//                                         {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
//                                             <span key={i} className="text-[8px] text-[#94A3B8]">{day}</span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <motion.div
//                                 className="absolute -top-6 -right-6 bg-[#131A2B]/90 backdrop-blur-xl rounded-2xl p-4 border border-[#F59E0B]/20 shadow-2xl hidden lg:block"
//                                 animate={{ y: [0, -10, 0] }}
//                                 transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-12 h-12 rounded-xl bg-[#22C55E]/20 flex items-center justify-center relative">
//                                         <TrendingUp className="w-6 h-6 text-[#22C55E]" />
//                                         <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#22C55E] animate-ping"></span>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-[#94A3B8]">Sales Growth</div>
//                                         <div className="text-lg font-bold text-[#22C55E]">+23.5%</div>
//                                         <div className="text-[10px] text-[#94A3B8]">Updated just now</div>
//                                     </div>
//                                 </div>
//                             </motion.div>

//                             <motion.div
//                                 className="absolute -bottom-6 -left-6 bg-[#131A2B]/90 backdrop-blur-xl rounded-2xl p-4 border border-[#F59E0B]/20 shadow-2xl hidden lg:block"
//                                 animate={{ y: [0, 10, 0] }}
//                                 transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center relative">
//                                         <Users className="w-6 h-6 text-[#F59E0B]" />
//                                         <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F59E0B] animate-pulse"></span>
//                                     </div>
//                                     <div>
//                                         <div className="text-sm text-[#94A3B8]">Active Users</div>
//                                         <div className="text-lg font-bold text-[#F59E0B]">1,247</div>
//                                         <div className="text-[10px] text-[#22C55E]">● 12 online now</div>
//                                     </div>
//                                 </div>
//                             </motion.div>

//                             <motion.div
//                                 className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#131A2B]/90 backdrop-blur-xl rounded-full px-4 py-2 border border-[#F59E0B]/20 shadow-2xl hidden lg:flex items-center gap-2"
//                                 animate={{ y: [0, -5, 0] }}
//                                 transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//                             >
//                                 <span className="text-xs text-[#94A3B8]">🛒</span>
//                                 <span className="text-xs text-[#94A3B8]">New order from</span>
//                                 <span className="text-xs font-medium text-[#FCD34D]">Sarah's Store</span>
//                                 <span className="text-[10px] text-[#22C55E]">● 2 min ago</span>
//                             </motion.div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>

//             {/* SOLUTIONS SECTION */}
//             <section ref={solutionsRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Solutions</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Enterprise-Grade <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Solutions</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">Comprehensive solutions for businesses of every size and industry</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {[
//                             { icon: ShoppingBag, label: 'Ecommerce', desc: 'Complete online store solution with powerful features' },
//                             { icon: Users, label: 'Retail', desc: 'Unified commerce for physical and digital stores' },
//                             { icon: Building2, label: 'B2B', desc: 'Wholesale and B2B commerce made simple' },
//                             { icon: Package, label: 'Dropshipping', desc: 'Automated dropshipping fulfillment system' },
//                             { icon: Globe, label: 'Marketplace', desc: 'Multi-vendor marketplace platform' },
//                             { icon: BarChart3, label: 'Analytics', desc: 'Data-driven insights for business growth' },
//                         ].map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.08 }}
//                                 viewport={{ once: true }}
//                                 className="group p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//                             >
//                                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#FCD34D]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                                     <item.icon className="w-7 h-7 text-[#F59E0B]" />
//                                 </div>
//                                 <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
//                                 <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* PRODUCTS SECTION */}
//             <section ref={productsRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Products</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Powerful <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Products</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">Everything you need to build, manage, and grow your online business</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.08 }}
//                                 viewport={{ once: true }}
//                                 className="group p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//                             >
//                                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#FCD34D]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                                     <feature.icon className="w-7 h-7 text-[#F59E0B]" />
//                                 </div>
//                                 <h3 className="text-xl font-semibold mb-2">{feature.label}</h3>
//                                 <p className="text-[#94A3B8] text-sm leading-relaxed">{feature.desc}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* PRICING SECTION */}
//             <section ref={pricingRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Pricing</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Choose Your <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Plan</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">Flexible pricing options for businesses of every size</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//                         {/* Basic Plan */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0.05 }}
//                             viewport={{ once: true }}
//                             className="p-6 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//                         >
//                             <h3 className="text-lg font-bold text-white mb-1">Basic</h3>
//                             <p className="text-sm text-[#94A3B8] mb-4">For New Online Sellers</p>
//                             <div className="mb-2">
//                                 <span className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">Rs 24,000</span>
//                                 <span className="text-sm text-[#94A3B8] ml-1">/year</span>
//                             </div>
//                             <p className="text-sm text-[#94A3B8] mb-6">% QR Payment Fee: 3.9%</p>
//                             <ul className="space-y-3 text-sm">
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <span>Fonepay Dynamic QR API Included</span>
//                                 </li>
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <span className="text-white font-medium">Orders per Year</span>
//                                         <br />
//                                         <span className="text-[#94A3B8]">5,000</span>
//                                     </div>
//                                 </li>
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <span className="text-white font-medium">Products Limit</span>
//                                         <br />
//                                         <span className="text-[#94A3B8]">200</span>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </motion.div>

//                         {/* Premium Plan */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0.1 }}
//                             viewport={{ once: true }}
//                             className="p-6 rounded-2xl border border-[#F59E0B] bg-[#F59E0B]/10 hover:shadow-xl hover:shadow-[#F59E0B]/20 transition-all duration-300 hover:-translate-y-1 relative"
//                         >
//                             <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[#F59E0B] text-black text-xs font-semibold">Popular</span>
//                             <h3 className="text-lg font-bold text-white mb-1">Premium</h3>
//                             <p className="text-sm text-[#94A3B8] mb-4">Designed for growing brands</p>
//                             <div className="mb-2">
//                                 <span className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">Rs 28,000</span>
//                                 <span className="text-sm text-[#94A3B8] ml-1">/year</span>
//                             </div>
//                             <p className="text-sm text-[#94A3B8] mb-6">% QR Payment Fee: 3%</p>
//                             <ul className="space-y-3 text-sm">
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <span>Fonepay Dynamic QR API Included</span>
//                                 </li>
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <span className="text-white font-medium">Orders per Year</span>
//                                         <br />
//                                         <span className="text-[#94A3B8]">20,000</span>
//                                     </div>
//                                 </li>
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <span className="text-white font-medium">Products Limit</span>
//                                         <br />
//                                         <span className="text-[#94A3B8]">1,000</span>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </motion.div>

//                         {/* Business Plus Plan */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0.15 }}
//                             viewport={{ once: true }}
//                             className="p-6 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//                         >
//                             <h3 className="text-lg font-bold text-white mb-1">Business Plus</h3>
//                             <p className="text-sm text-[#94A3B8] mb-4">For Scaling Businesses</p>
//                             <div className="mb-2">
//                                 <span className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">Rs 38,000</span>
//                                 <span className="text-sm text-[#94A3B8] ml-1">/year</span>
//                             </div>
//                             <p className="text-sm text-[#94A3B8] mb-6">% QR Payment Fee: 3%</p>
//                             <ul className="space-y-3 text-sm">
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <span>Fonepay Dynamic QR API Included</span>
//                                 </li>
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <span className="text-white font-medium">Orders per Year</span>
//                                         <br />
//                                         <span className="text-[#94A3B8]">50,000</span>
//                                     </div>
//                                 </li>
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <span className="text-white font-medium">Products Limit</span>
//                                         <br />
//                                         <span className="text-[#94A3B8]">2,000</span>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </motion.div>

//                         {/* Platinum Plan */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: 0.2 }}
//                             viewport={{ once: true }}
//                             className="p-6 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//                         >
//                             <h3 className="text-lg font-bold text-white mb-1">Platinum</h3>
//                             <p className="text-sm text-[#94A3B8] mb-4">Enterprise infrastructure tier</p>
//                             <div className="mb-2">
//                                 <span className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">Rs 48,000</span>
//                                 <span className="text-sm text-[#94A3B8] ml-1">/year</span>
//                             </div>
//                             <p className="text-sm text-[#94A3B8] mb-6">% QR Payment Fee: 2.75%</p>
//                             <ul className="space-y-3 text-sm">
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <span>Fonepay Dynamic QR API Included</span>
//                                 </li>
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <span className="text-white font-medium">Orders per Year</span>
//                                         <br />
//                                         <span className="text-[#94A3B8]">5,000</span>
//                                     </div>
//                                 </li>
//                                 <li className="flex items-start gap-2 text-[#94A3B8]">
//                                     <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <span className="text-white font-medium">Products Limit</span>
//                                         <br />
//                                         <span className="text-[#94A3B8]">5,000</span>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>

//             {/* COMPANY SECTION */}
//             <section ref={companyRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Company</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Built for <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Success</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">We're on a mission to empower businesses worldwide</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {[
//                             { number: '5K+', label: 'Businesses Trust Us' },
//                             { number: '77+', label: 'Districts Served' },
//                             { number: '99.9%', label: 'Uptime Guarantee' },
//                             { number: '4.9/5', label: 'Customer Rating' },
//                         ].map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 whileInView={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                                 viewport={{ once: true }}
//                                 className="text-center p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 bg-[#131A2B]/40 hover:-translate-y-1"
//                             >
//                                 <div className="text-4xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">{item.number}</div>
//                                 <div className="text-[#94A3B8] mt-2">{item.label}</div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* RESOURCES SECTION */}
//             <section ref={resourcesRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Resources</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             Learn & <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Grow</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">Everything you need to succeed with MithilaSoft</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {[
//                             { icon: FileText, label: 'Documentation', desc: 'Comprehensive guides and API references' },
//                             { icon: UsersIcon, label: 'Community', desc: 'Connect with other MithilaSoft users' },
//                             { icon: Video, label: 'Video Tutorials', desc: 'Step-by-step video guides and webinars' },
//                             { icon: Settings, label: 'Help Center', desc: 'Get help from our expert support team' },
//                             { icon: Globe, label: 'Blog', desc: 'Latest updates and industry insights' },
//                             { icon: Shield, label: 'Status', desc: 'Real-time service status and updates' },
//                         ].map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.5, delay: index * 0.08 }}
//                                 viewport={{ once: true }}
//                                 className="group p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm hover:-translate-y-1"
//                             >
//                                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#FCD34D]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
//                                     <item.icon className="w-7 h-7 text-[#F59E0B]" />
//                                 </div>
//                                 <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
//                                 <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* TESTIMONIALS SECTION */}
//             <section ref={testimonialsRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                     <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-center max-w-3xl mx-auto mb-16"
//                     >
//                         <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">Testimonials</span>
//                         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//                             What Our Users <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Say</span>
//                         </h2>
//                         <p className="text-[#94A3B8] text-lg">Trusted by businesses across Nepal</p>
//                     </motion.div>

//                     <div className="grid md:grid-cols-3 gap-6">
//                         {[
//                             {
//                                 name: 'Ramesh Adhikari',
//                                 role: 'CEO, Himalayan Mart',
//                                 content: 'MithilaSoft transformed our ecommerce business. We doubled our sales in just 3 months. The platform is incredibly powerful and easy to use.',
//                                 rating: 5,
//                                 location: 'Kathmandu, Nepal'
//                             },
//                             {
//                                 name: 'Sita Sharma',
//                                 role: 'Founder, Shop Nepal',
//                                 content: "The best ecommerce platform I've ever used. Incredible features, amazing support, and the analytics tools have been game-changing for our growth strategy.",
//                                 rating: 5,
//                                 location: 'Pokhara, Nepal'
//                             },
//                             {
//                                 name: 'Krishna Thapa',
//                                 role: 'Marketing Director, TrendSet',
//                                 content: 'MithilaSoft has been instrumental in our digital transformation. The automation features and real-time analytics have helped us scale like never before.',
//                                 rating: 5,
//                                 location: 'Biratnagar, Nepal'
//                             },
//                         ].map((testimonial, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 whileInView={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                                 viewport={{ once: true }}
//                                 className="group p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] hover:shadow-2xl hover:shadow-[#F59E0B]/20 hover:-translate-y-2 transition-all duration-300 bg-[#131A2B]/40 backdrop-blur-sm cursor-pointer relative overflow-hidden"
//                             >
//                                 <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/0 via-[#F59E0B]/0 to-[#FCD34D]/0 group-hover:from-[#F59E0B]/5 group-hover:via-[#F59E0B]/5 group-hover:to-[#FCD34D]/5 transition-all duration-500"></div>
//                                 <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
//                                     background: 'linear-gradient(135deg, #F59E0B, #FCD34D, #F59E0B)',
//                                     padding: '1px',
//                                     WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//                                     WebkitMaskComposite: 'xor',
//                                     maskComposite: 'exclude'
//                                 }}></div>

//                                 <div className="relative z-10">
//                                     <div className="flex gap-1 mb-4">
//                                         {[...Array(5)].map((_, i) => (
//                                             <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B] group-hover:scale-110 transition-transform duration-300" />
//                                         ))}
//                                     </div>
//                                     <p className="text-[#94A3B8] text-sm leading-relaxed mb-4 group-hover:text-[#F8FAFC] transition-colors duration-300">"{testimonial.content}"</p>
//                                     <div>
//                                         <div className="font-semibold text-white group-hover:text-[#FCD34D] transition-colors duration-300">{testimonial.name}</div>
//                                         <div className="text-sm text-[#FCD34D] group-hover:text-[#F59E0B] transition-colors duration-300">{testimonial.role}</div>
//                                         <div className="text-xs text-[#94A3B8] mt-1 flex items-center gap-1 group-hover:text-[#94A3B8]/80 transition-colors duration-300">
//                                             <span>📍</span> {testimonial.location}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>

//                     {/* Trust Badges */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: 0.3 }}
//                         viewport={{ once: true }}
//                         className="mt-12 flex flex-wrap justify-center gap-6"
//                     >
//                         <motion.div
//                             whileHover={{ scale: 1.05, y: -3 }}
//                             className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#1E293B] bg-[#131A2B]/40 hover:border-[#F59E0B] hover:shadow-lg hover:shadow-[#F59E0B]/10 transition-all duration-300 cursor-pointer"
//                         >
//                             <span className="text-2xl">🏆</span>
//                             <div>
//                                 <div className="text-sm font-semibold text-white">500+</div>
//                                 <div className="text-[10px] text-[#94A3B8]">Happy Businesses</div>
//                             </div>
//                         </motion.div>
//                         <motion.div
//                             whileHover={{ scale: 1.05, y: -3 }}
//                             className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#1E293B] bg-[#131A2B]/40 hover:border-[#F59E0B] hover:shadow-lg hover:shadow-[#F59E0B]/10 transition-all duration-300 cursor-pointer"
//                         >
//                             <span className="text-2xl">⭐</span>
//                             <div>
//                                 <div className="text-sm font-semibold text-white">4.9/5</div>
//                                 <div className="text-[10px] text-[#94A3B8]">Average Rating</div>
//                             </div>
//                         </motion.div>
//                         <motion.div
//                             whileHover={{ scale: 1.05, y: -3 }}
//                             className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#1E293B] bg-[#131A2B]/40 hover:border-[#F59E0B] hover:shadow-lg hover:shadow-[#F59E0B]/10 transition-all duration-300 cursor-pointer"
//                         >
//                             <span className="text-2xl">🇳🇵</span>
//                             <div>
//                                 <div className="text-sm font-semibold text-white">77 Districts</div>
//                                 <div className="text-[10px] text-[#94A3B8]">Serving Nepal Wide</div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* FINAL CTA SECTION */}
//             <section ref={ctaRef} className="py-24 relative">
//                 <div className="absolute inset-0 pointer-events-none">
//                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />
//                 </div>
//                 <div className="container mx-auto px-4 md:px-6">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="relative overflow-hidden rounded-3xl p-12 md:p-16 bg-gradient-to-br from-[#F59E0B]/20 via-[#FCD34D]/10 to-[#F59E0B]/10 border border-[#F59E0B]/30"
//                     >
//                         <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/20 rounded-full blur-3xl" />
//                         <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FCD34D]/20 rounded-full blur-3xl" />
//                         <div className="relative z-10 text-center max-w-3xl mx-auto">
//                             <h2 className="text-3xl md:text-5xl font-bold mb-4">
//                                 Ready to Build Your
//                                 <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent"> Online Empire?</span>
//                             </h2>
//                             <p className="text-[#94A3B8] text-lg mb-8">
//                                 Join 5,000+ businesses that trust MithilaSoft to power their growth
//                             </p>
//                             <div className="flex flex-wrap justify-center gap-4">
//                                 <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black font-semibold hover:shadow-2xl hover:shadow-[#F59E0B]/30 transition-all duration-300 hover:scale-105">
//                                     Start Free Trial
//                                     <ArrowRight className="w-5 h-5" />
//                                 </Link>
//                                 <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-[#F59E0B]/30 hover:border-[#F59E0B] text-white font-medium transition-all duration-300 hover:bg-[#F59E0B]/10">
//                                     Sign In
//                                 </Link>
//                             </div>
//                             <p className="text-sm text-[#94A3B8] mt-4">No credit card required • 14-day free trial</p>
//                         </div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* FOOTER */}
//             <footer className="border-t border-[#F59E0B]/20 py-12">
//                 <div className="container mx-auto px-4 md:px-6">
//                     <div className="grid md:grid-cols-4 gap-8 mb-8">
//                         <div>
//                             <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
//                             <ul className="space-y-2 text-sm text-[#94A3B8]">
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Home className="w-3 h-3" /> Home</a></li>
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Briefcase className="w-3 h-3" /> Our Services</a></li>
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Building2 className="w-3 h-3" /> Company</a></li>
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><User className="w-3 h-3" /> About Us</a></li>
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><FileText className="w-3 h-3" /> Blog</a></li>
//                             </ul>
//                         </div>

//                         <div>
//                             <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
//                             <ul className="space-y-2 text-sm text-[#94A3B8]">
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Megaphone className="w-3 h-3" /> Digital Promotions</a></li>
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><PenTool className="w-3 h-3" /> Graphic Design</a></li>
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Palette className="w-3 h-3" /> Motion Graphics</a></li>
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Camera className="w-3 h-3" /> Photoshoot</a></li>
//                                 <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Share2 className="w-3 h-3" /> Social Media</a></li>
//                             </ul>
//                         </div>

//                         <div>
//                             <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
//                             <ul className="space-y-3 text-sm">
//                                 <li className="flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">
//                                     <Phone className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <a href="tel:+9779801666620" className="hover:text-[#FCD34D] transition-colors duration-200">
//                                         +977 9801666620
//                                     </a>
//                                 </li>
//                                 <li className="flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">
//                                     <Mail className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <a
//                                         href="mailto:info@mithilagroup.com.np"
//                                         className="hover:text-[#FCD34D] transition-colors duration-200"
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             window.location.href = 'mailto:info@mithilagroup.com.np';
//                                         }}
//                                     >
//                                         info@mithilagroup.com.np
//                                     </a>
//                                 </li>
//                                 <li className="flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">
//                                     <MapPin className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
//                                     <span className="text-sm leading-relaxed">
//                                         Nepal, Madhesh Pradesh, Dhanusa,<br />
//                                         Janakpur Sub-Metropolitan - 7
//                                     </span>
//                                 </li>
//                             </ul>
//                         </div>

//                         <div>
//                             <div className="flex items-center gap-3 mb-4">
//                                 <img src={mithilaLogo} alt="MithilaSoft" className="h-10 w-auto" />
//                                 <div>
//                                     <span className="text-xl font-bold text-white">MithilaSoft</span>
//                                     <span className="block text-[9px] text-[#FCD34D] tracking-widest -mt-0.5">EMPOWERING BUSINESSES</span>
//                                 </div>
//                             </div>
//                             <p className="text-sm text-[#94A3B8] mb-4">The complete ecommerce platform for businesses of all sizes.</p>
//                             <div className="flex gap-3">
//                                 <a
//                                     href="https://www.facebook.com/MithilaGroupOfInustires"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-[#94A3B8] hover:text-[#1877F2] transition-all duration-300 hover:scale-110"
//                                     aria-label="Facebook"
//                                 >
//                                     <Facebook className="w-5 h-5" />
//                                 </a>
//                                 <a
//                                     href="https://www.instagram.com/mithila_group"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-[#94A3B8] hover:text-[#E4405F] transition-all duration-300 hover:scale-110"
//                                     aria-label="Instagram"
//                                 >
//                                     <Instagram className="w-5 h-5" />
//                                 </a>
//                                 <a
//                                     href="https://www.linkedin.com/company/mithilagroupcompany/"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-[#94A3B8] hover:text-[#0A66C2] transition-all duration-300 hover:scale-110"
//                                     aria-label="LinkedIn"
//                                 >
//                                     <Linkedin className="w-5 h-5" />
//                                 </a>
//                                 <a
//                                     href="https://api.whatsapp.com/send?phone=9779801666620"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-[#94A3B8] hover:text-[#25D366] transition-all duration-300 hover:scale-110"
//                                     aria-label="WhatsApp"
//                                 >
//                                     <MessageCircle className="w-5 h-5" />
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="text-[#94A3B8] hover:text-[#F59E0B] transition-all duration-300 hover:scale-110"
//                                     aria-label="TikTok"
//                                 >
//                                     <TikTokIcon className="w-5 h-5" />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="border-t border-[#F59E0B]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//                         <p className="text-sm text-[#94A3B8]">© 2026 MithilaSoft. All rights reserved.</p>
//                         <div className="flex gap-6 text-sm text-[#94A3B8]">
//                             <a href="#" className="hover:text-[#FCD34D] transition-colors duration-200">Privacy Policy</a>
//                             <a href="#" className="hover:text-[#FCD34D] transition-colors duration-200">Terms of Service</a>
//                             <a href="#" className="hover:text-[#FCD34D] transition-colors duration-200">Cookie Policy</a>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default LandingPage




// frontend/src/pages/LandingPage.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowRight, ShoppingBag, TrendingUp, Users, Package, BarChart3, Layers, Settings, Shield, Zap, CheckCircle, Star, Mail, Phone, MapPin, Linkedin, Youtube, Facebook, Instagram, MessageCircle, Home, Briefcase, Building2, User, FileText, Users as UsersIcon, Megaphone, PenTool, Palette, Camera, Share2, Video, Globe } from 'lucide-react'
import mithilaLogo from '../assets/logo.png'

// ============================================
// ANIMATION VARIANTS - Premium & Elegant
// ============================================
const variants = {
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  },
  fadeUp: {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  blurReveal: {
    hidden: { opacity: 0, filter: 'blur(12px)', scale: 1.02 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  textReveal: {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  cardHover: {
    rest: { 
      scale: 1, 
      y: 0,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    hover: {
      scale: 1.03,
      y: -8,
      boxShadow: '0 30px 60px rgba(245,158,11,0.15)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  buttonHover: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  imageReveal: {
    hidden: { 
      opacity: 0, 
      scale: 1.05,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  float: {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },
  slowFloat: {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  },
  glowPulse: {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  }
}

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Premium Section Wrapper
const Section = memo(({ children, className = '', id, ref }) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2,
    margin: '-100px 0px'
  })

  return (
    <section 
      ref={ref || sectionRef}
      id={id}
      className={`relative scroll-mt-24 ${className}`}
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants.fadeUp}
      >
        {children}
      </motion.div>
    </section>
  )
})

// Premium Card - FIXED (removed duplicate initial)
const PremiumCard = memo(({ icon: Icon, label, desc, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants.staggerItem}
      custom={index}
      whileHover="hover"
      className="group p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-500 hover:shadow-2xl hover:shadow-[#F59E0B]/10 bg-[#131A2B]/40 backdrop-blur-sm cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/0 via-[#F59E0B]/0 to-[#FCD34D]/0 group-hover:from-[#F59E0B]/5 group-hover:via-[#F59E0B]/5 group-hover:to-[#FCD34D]/5 transition-all duration-700" />
      <motion.div 
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F59E0B]/20 to-[#FCD34D]/20 flex items-center justify-center mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.4 }}
      >
        <Icon className="w-7 h-7 text-[#F59E0B]" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">{label}</h3>
      <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
})

// Premium Button
const PremiumButton = memo(({ children, to, className = '', variant = 'primary' }) => {
  const isPrimary = variant === 'primary'
  
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      variants={variants.buttonHover}
      className="inline-block"
    >
      <Link
        to={to}
        className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 ${
          isPrimary
            ? 'bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black hover:shadow-2xl hover:shadow-[#F59E0B]/30 hover:scale-105'
            : 'border-2 border-[#F59E0B]/30 text-white hover:bg-[#F59E0B]/10 hover:border-[#F59E0B]/50 hover:shadow-xl hover:shadow-[#F59E0B]/10'
        } ${className}`}
      >
        {children}
        {isPrimary && (
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.span>
        )}
      </Link>
    </motion.div>
  )
})

// TikTok Icon
const TikTokIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.6 5.82s.51.5 0 0A4.14 4.14 0 0 1 15.54 0h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.5 2.59 2.59 0 0 1 2.59-2.5c.28 0 .55.04.81.12V6.87a5.65 5.65 0 0 0-4.31-.38 5.68 5.68 0 0 0-2.94 2.56 5.68 5.68 0 0 0-.73 3.81 5.68 5.68 0 0 0 2.61 3.92 5.68 5.68 0 0 0 4.31.38 5.68 5.68 0 0 0 2.94-2.56 5.68 5.68 0 0 0 .73-3.81V5.82z"/>
  </svg>
)

// ============================================
// MAIN COMPONENT
// ============================================

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Create refs for all sections
  const heroRef = useRef(null)
  const solutionsRef = useRef(null)
  const productsRef = useRef(null)
  const pricingRef = useRef(null)
  const companyRef = useRef(null)
  const resourcesRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // FIXED: Smooth scroll to section with navbar offset
  const scrollToSection = useCallback((sectionRef, sectionId) => {
    // First close mobile menu
    setMobileMenuOpen(false)
    
    // Use a small delay to ensure menu closes before scrolling
    setTimeout(() => {
      // Try using the ref first
      if (sectionRef && sectionRef.current) {
        const element = sectionRef.current
        const navbarHeight = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        return
      }
      
      // Fallback: use the ID if ref fails
      if (sectionId) {
        const element = document.getElementById(sectionId)
        if (element) {
          const navbarHeight = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }, 150) // Increased delay for better mobile performance
  }, [])

  // Handle prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms')
    }
  }, [])

  // Navigation items with section refs and IDs
  const navItems = useMemo(() => [
    { label: 'Solutions', ref: solutionsRef, id: 'solutions' },
    { label: 'Products', ref: productsRef, id: 'products' },
    { label: 'Pricing', ref: pricingRef, id: 'pricing' },
    { label: 'Company', ref: companyRef, id: 'company' },
    { label: 'Resources', ref: resourcesRef, id: 'resources' },
    { label: 'Testimonials', ref: testimonialsRef, id: 'testimonials' },
  ], [])

  const features = useMemo(() => [
    { icon: ShoppingBag, label: 'Products', desc: 'Manage your entire product catalog with ease' },
    { icon: Package, label: 'Orders', desc: 'Track and fulfill orders seamlessly' },
    { icon: Users, label: 'Customers', desc: 'Build lasting customer relationships' },
    { icon: BarChart3, label: 'Analytics', desc: 'Data-driven insights for growth' },
    { icon: Layers, label: 'Inventory', desc: 'Real-time inventory management' },
    { icon: Shield, label: 'Security', desc: 'Enterprise-grade security standards' },
  ], [])

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-[#0B1020] overflow-x-hidden text-[#F8FAFC] antialiased">
      
      {/* Premium Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ 
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B)',
          boxShadow: '0 0 30px rgba(245, 158, 11, 0.5), 0 0 60px rgba(245, 158, 11, 0.3)'
        }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[6px] z-40 pointer-events-none"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, transparent, #FCD34D, #F59E0B, #FCD34D, transparent)',
          filter: 'blur(8px)',
          opacity: 0.4
        }}
      />

      {/* ========================================== */}
      {/* PREMIUM NAVBAR */}
      {/* ========================================== */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled || mobileMenuOpen
            ? 'bg-black/90 backdrop-blur-2xl border-b border-[#F59E0B]/10 shadow-2xl shadow-black/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-all duration-1000 ${
          isScrolled || mobileMenuOpen
            ? 'bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent opacity-100' 
            : 'opacity-0'
        }`} />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                <img 
                  src={mithilaLogo} 
                  alt="MithilaSoft" 
                  className={`h-10 w-auto transition-all duration-700 ${
                    isScrolled || mobileMenuOpen ? 'filter brightness-125 drop-shadow-[0_0_20px_rgba(245,158,11,0.2)]' : ''
                  }`}
                  loading="eager"
                />
                <div className="flex flex-col">
                  <span className={`text-xl font-bold transition-all duration-700 ${
                    isScrolled || mobileMenuOpen ? 'text-white' : 'text-white'
                  }`}>
                    MithilaSoft
                  </span>
                  <span className={`text-[10px] tracking-[0.2em] transition-all duration-700 ${
                    isScrolled || mobileMenuOpen ? 'text-[#FCD34D]' : 'text-[#94A3B8]'
                  }`}>
                    EMPOWERING BUSINESSES
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.ref, item.id)}
                  className="relative text-sm font-medium text-[#94A3B8] hover:text-[#FCD34D] transition-all duration-300 group cursor-pointer"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] group-hover:w-full transition-all duration-500" />
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-medium text-[#94A3B8] hover:text-[#FCD34D] transition-all duration-300"
              >
                Login
              </Link>
              <PremiumButton to="/register" variant="primary">
                Get Started
              </PremiumButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="lg:hidden overflow-hidden border-t border-[#F59E0B]/10 bg-black/95 backdrop-blur-2xl rounded-b-2xl"
              >
                <div className="py-4">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.ref, item.id)}
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:text-[#FCD34D] hover:bg-white/5 rounded-xl transition-all duration-200 text-base font-medium cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="flex flex-col gap-3 pt-4 border-t border-[#F59E0B]/10 mt-2 px-4">
                    <Link
                      to="/login"
                      className="text-center text-gray-300 hover:text-[#FCD34D] transition-colors duration-200 py-2 text-base"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-center font-semibold px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-black hover:shadow-lg hover:shadow-[#F59E0B]/30 transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* ========================================== */}
      {/* PREMIUM HERO SECTION */}
      {/* ========================================== */}
      <section 
        ref={heroRef} 
        id="hero"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden scroll-mt-24"
      >
        {/* Premium Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#F59E0B]/10 rounded-full blur-3xl"
            variants={variants.glowPulse}
            initial="initial"
            animate="animate"
          />
          <motion.div 
            className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-[#FCD34D]/10 rounded-full blur-3xl"
            variants={variants.glowPulse}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F59E0B]/5 rounded-full blur-3xl" />
          
          {/* Premium Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#F59E0B]/20"
              variants={variants.slowFloat}
              initial="initial"
              animate="animate"
              style={{
                top: `${5 + Math.random() * 90}%`,
                left: `${5 + Math.random() * 90}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              {/* Live Badge */}
              <motion.div
                variants={variants.fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 mb-6"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22C55E]" />
                </span>
                <span className="text-sm text-[#FCD34D]">Live • 1,247 active users online</span>
              </motion.div>

              {/* Premium Headline */}
              <motion.h1
                variants={variants.textReveal}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4"
              >
                Build, Manage & Grow
                <br />
                <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                  Your Online Business
                </span>
                <br />
                With Confidence
              </motion.h1>

              <motion.p
                variants={variants.fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="text-base md:text-lg text-[#94A3B8] max-w-lg mb-8 leading-relaxed"
              >
                One platform to manage products, orders, customers, inventory, payments, analytics,
                marketing and business growth.
              </motion.p>

              <motion.div
                variants={variants.fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <PremiumButton to="/register" variant="primary">
                  Start Free Trial
                </PremiumButton>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={variants.staggerContainer}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="grid grid-cols-4 gap-4 mt-10"
              >
                {[
                  { value: '5K+', label: 'Active Stores', icon: '🏪' },
                  { value: 'Rs 1Cr+', label: 'GMV Processed', icon: '💰' },
                  { value: '99.9%', label: 'Uptime', icon: '⚡' },
                  { value: '4.9/5', label: 'User Rating', icon: '⭐' },
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    variants={variants.staggerItem}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="text-center p-3 rounded-xl bg-[#131A2B]/40 border border-[#1E293B] hover:border-[#F59E0B]/30 transition-all duration-500"
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-[#94A3B8]">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Dashboard Preview */}
            <motion.div
              variants={variants.imageReveal}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <motion.div 
                className="absolute -top-4 -right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-[#F59E0B]/30 text-xs"
                variants={variants.float}
                initial="initial"
                animate="animate"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
                </span>
                <span className="text-[#FCD34D]">Live Data</span>
              </motion.div>

              <div className="bg-[#131A2B]/60 backdrop-blur-xl border border-[#F59E0B]/20 rounded-3xl p-6 shadow-2xl shadow-[#F59E0B]/10">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#FCD34D] flex items-center justify-center shadow-lg shadow-[#F59E0B]/30">
                      <span className="text-black font-bold text-sm">MS</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Dashboard</div>
                      <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <span>Overview</span>
                        <span className="w-1 h-1 rounded-full bg-[#94A3B8]" />
                        <span className="text-[#FCD34D] animate-pulse">● Live</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="text-xs text-[#FCD34D] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </motion.div>
                    <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center text-xs hover:bg-[#F59E0B]/10 transition-colors cursor-pointer">🔔</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#FCD34D] flex items-center justify-center text-xs font-bold text-black cursor-pointer hover:scale-105 transition-transform">
                      JD
                    </div>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: 'Revenue', value: 'Rs 48.3L', change: '+12.5%', color: 'text-[#F59E0B]' },
                    { label: 'Orders', value: '1,284', change: '+8.3%', color: 'text-[#FCD34D]' },
                    { label: 'Customers', value: '3,891', change: '+23.5%', color: 'text-[#F59E0B]' },
                    { label: 'Products', value: '247', change: '+5.2%', color: 'text-[#FCD34D]' },
                  ].map((stat, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-[#0B1020]/50 rounded-2xl p-4 border border-[#F59E0B]/10 hover:border-[#F59E0B]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#F59E0B]/5"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-[#94A3B8]">{stat.label}</div>
                        <span className="text-[10px] text-[#22C55E] font-medium">{stat.change}</span>
                      </div>
                      <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Sales Chart */}
                <div className="bg-[#0B1020]/50 rounded-2xl p-4 border border-[#F59E0B]/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#94A3B8]">Sales Overview (Last 7 Days)</span>
                    <span className="text-[10px] text-[#22C55E] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                      +23.5% growth
                    </span>
                  </div>
                  <div className="h-24 flex items-end gap-1.5">
                    {[40, 60, 45, 80, 55, 70, 90, 65, 75, 50, 85, 95].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex-1 bg-gradient-to-t from-[#F59E0B] to-[#FCD34D] rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group"
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1E293B] text-[8px] text-[#94A3B8] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {height}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <span key={i} className="text-[8px] text-[#94A3B8]">{day}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-[#131A2B]/90 backdrop-blur-xl rounded-2xl p-4 border border-[#F59E0B]/20 shadow-2xl hidden lg:block"
                variants={variants.float}
                initial="initial"
                animate="animate"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#22C55E]/20 flex items-center justify-center relative">
                    <TrendingUp className="w-6 h-6 text-[#22C55E]" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#22C55E] animate-ping" />
                  </div>
                  <div>
                    <div className="text-sm text-[#94A3B8]">Sales Growth</div>
                    <div className="text-lg font-bold text-[#22C55E]">+23.5%</div>
                    <div className="text-[10px] text-[#94A3B8]">Updated just now</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 bg-[#131A2B]/90 backdrop-blur-xl rounded-2xl p-4 border border-[#F59E0B]/20 shadow-2xl hidden lg:block"
                variants={variants.float}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center relative">
                    <Users className="w-6 h-6 text-[#F59E0B]" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F59E0B] animate-pulse" />
                  </div>
                  <div>
                    <div className="text-sm text-[#94A3B8]">Active Users</div>
                    <div className="text-lg font-bold text-[#F59E0B]">1,247</div>
                    <div className="text-[10px] text-[#22C55E]">● 12 online now</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SOLUTIONS SECTION */}
      {/* ========================================== */}
      <section 
        ref={solutionsRef} 
        id="solutions"
        className="py-24 relative scroll-mt-24"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">
              Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise-Grade <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-[#94A3B8] text-lg">Comprehensive solutions for businesses of every size and industry</p>
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: ShoppingBag, label: 'Ecommerce', desc: 'Complete online store solution with powerful features' },
              { icon: Users, label: 'Retail', desc: 'Unified commerce for physical and digital stores' },
              { icon: Building2, label: 'B2B', desc: 'Wholesale and B2B commerce made simple' },
              { icon: Package, label: 'Dropshipping', desc: 'Automated dropshipping fulfillment system' },
              { icon: Globe, label: 'Marketplace', desc: 'Multi-vendor marketplace platform' },
              { icon: BarChart3, label: 'Analytics', desc: 'Data-driven insights for business growth' },
            ].map((item, index) => (
              <PremiumCard
                key={index}
                icon={item.icon}
                label={item.label}
                desc={item.desc}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* PRODUCTS SECTION */}
      {/* ========================================== */}
      <section 
        ref={productsRef} 
        id="products"
        className="py-24 relative scroll-mt-24"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">
              Products
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-[#94A3B8] text-lg">Everything you need to build, manage, and grow your online business</p>
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <PremiumCard
                key={index}
                icon={feature.icon}
                label={feature.label}
                desc={feature.desc}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* PRICING SECTION */}
      {/* ========================================== */}
      <section 
        ref={pricingRef} 
        id="pricing"
        className="py-24 relative scroll-mt-24"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Plan</span>
            </h2>
            <p className="text-[#94A3B8] text-lg">Flexible pricing options for businesses of every size</p>
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {[
              { name: 'Basic', price: 'Rs 24,000', orders: '5,000', products: '200', fee: '3.9%', popular: false },
              { name: 'Premium', price: 'Rs 28,000', orders: '20,000', products: '1,000', fee: '3%', popular: true },
              { name: 'Business Plus', price: 'Rs 38,000', orders: '50,000', products: '2,000', fee: '3%', popular: false },
              { name: 'Platinum', price: 'Rs 48,000', orders: '5,000', products: '5,000', fee: '2.75%', popular: false },
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={variants.staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`p-6 rounded-2xl border ${
                  plan.popular 
                    ? 'border-[#F59E0B] bg-[#F59E0B]/10 hover:shadow-2xl hover:shadow-[#F59E0B]/20' 
                    : 'border-[#1E293B] hover:border-[#F59E0B] hover:shadow-xl hover:shadow-[#F59E0B]/10'
                } transition-all duration-500 bg-[#131A2B]/40 backdrop-blur-sm relative`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[#F59E0B] text-black text-xs font-semibold">
                    Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-[#94A3B8] mb-4">
                  {plan.popular ? 'Designed for growing brands' : 'For businesses of all sizes'}
                </p>
                <div className="mb-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-sm text-[#94A3B8] ml-1">/year</span>
                </div>
                <p className="text-sm text-[#94A3B8] mb-6">% QR Payment Fee: {plan.fee}</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 text-[#94A3B8]">
                    <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                    <span>Fonepay Dynamic QR API Included</span>
                  </li>
                  <li className="flex items-start gap-2 text-[#94A3B8]">
                    <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Orders per Year</span>
                      <br />
                      <span className="text-[#94A3B8]">{plan.orders}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2 text-[#94A3B8]">
                    <CheckCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Products Limit</span>
                      <br />
                      <span className="text-[#94A3B8]">{plan.products}</span>
                    </div>
                  </li>
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* COMPANY SECTION */}
      {/* ========================================== */}
      <section 
        ref={companyRef} 
        id="company"
        className="py-24 relative scroll-mt-24"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">
              Company
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-[#94A3B8] text-lg">We're on a mission to empower businesses worldwide</p>
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { number: '5K+', label: 'Businesses Trust Us' },
              { number: '77+', label: 'Districts Served' },
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '4.9/5', label: 'Customer Rating' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={variants.staggerItem}
                whileHover={{ scale: 1.05, y: -4 }}
                className="text-center p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] transition-all duration-500 bg-[#131A2B]/40"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent">
                  {item.number}
                </div>
                <div className="text-[#94A3B8] mt-2">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* RESOURCES SECTION */}
      {/* ========================================== */}
      <section 
        ref={resourcesRef} 
        id="resources"
        className="py-24 relative scroll-mt-24"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">
              Resources
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Learn & <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Grow</span>
            </h2>
            <p className="text-[#94A3B8] text-lg">Everything you need to succeed with MithilaSoft</p>
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: FileText, label: 'Documentation', desc: 'Comprehensive guides and API references' },
              { icon: UsersIcon, label: 'Community', desc: 'Connect with other MithilaSoft users' },
              { icon: Video, label: 'Video Tutorials', desc: 'Step-by-step video guides and webinars' },
              { icon: Settings, label: 'Help Center', desc: 'Get help from our expert support team' },
              { icon: Globe, label: 'Blog', desc: 'Latest updates and industry insights' },
              { icon: Shield, label: 'Status', desc: 'Real-time service status and updates' },
            ].map((item, index) => (
              <PremiumCard
                key={index}
                icon={item.icon}
                label={item.label}
                desc={item.desc}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* TESTIMONIALS SECTION */}
      {/* ========================================== */}
      <section 
        ref={testimonialsRef} 
        id="testimonials"
        className="py-24 relative scroll-mt-24"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#F59E0B]/30 text-xs font-medium text-[#FCD34D] mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent">Say</span>
            </h2>
            <p className="text-[#94A3B8] text-lg">Trusted by businesses across Nepal</p>
          </motion.div>

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                name: 'Ramesh Adhikari',
                role: 'CEO, Himalayan Mart',
                content: 'MithilaSoft transformed our ecommerce business. We doubled our sales in just 3 months. The platform is incredibly powerful and easy to use.',
                rating: 5,
                location: 'Kathmandu, Nepal'
              },
              {
                name: 'Sita Sharma',
                role: 'Founder, Shop Nepal',
                content: "The best ecommerce platform I've ever used. Incredible features, amazing support, and the analytics tools have been game-changing for our growth strategy.",
                rating: 5,
                location: 'Pokhara, Nepal'
              },
              {
                name: 'Krishna Thapa',
                role: 'Marketing Director, TrendSet',
                content: 'MithilaSoft has been instrumental in our digital transformation. The automation features and real-time analytics have helped us scale like never before.',
                rating: 5,
                location: 'Biratnagar, Nepal'
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={variants.staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 rounded-2xl border border-[#1E293B] hover:border-[#F59E0B] hover:shadow-2xl hover:shadow-[#F59E0B]/20 transition-all duration-500 bg-[#131A2B]/40 backdrop-blur-sm cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/0 via-[#F59E0B]/0 to-[#FCD34D]/0 group-hover:from-[#F59E0B]/5 group-hover:via-[#F59E0B]/5 group-hover:to-[#FCD34D]/5 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white group-hover:text-[#FCD34D] transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[#FCD34D]">{testimonial.role}</div>
                    <div className="text-xs text-[#94A3B8] mt-1 flex items-center gap-1">
                      <span>📍</span> {testimonial.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: '🏆', label: '500+', sub: 'Happy Businesses' },
              { icon: '⭐', label: '4.9/5', sub: 'Average Rating' },
              { icon: '🇳🇵', label: '77 Districts', sub: 'Serving Nepal Wide' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={variants.staggerItem}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-[#1E293B] bg-[#131A2B]/40 hover:border-[#F59E0B] hover:shadow-lg hover:shadow-[#F59E0B]/10 transition-all duration-500 cursor-pointer"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white">{item.label}</div>
                  <div className="text-[10px] text-[#94A3B8]">{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* FINAL CTA SECTION */}
      {/* ========================================== */}
      <section ref={ctaRef} className="py-16 relative scroll-mt-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={variants.scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-2xl p-8 md:p-10 bg-gradient-to-br from-[#F59E0B]/20 via-[#FCD34D]/10 to-[#F59E0B]/10 border border-[#F59E0B]/30"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FCD34D]/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h2
                variants={variants.textReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-bold mb-4"
              >
                Ready to Build Your
                <span className="bg-gradient-to-r from-[#F59E0B] via-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent"> Online Empire?</span>
              </motion.h2>

              <motion.p
                variants={variants.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-[#94A3B8] text-sm md:text-base mb-8 max-w-2xl mx-auto"
              >
                Join 5,000+ businesses across Nepal that trust MithilaSoft to power their growth
              </motion.p>

              <motion.div
                variants={variants.staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
              >
                {[
                  { icon: '📞', label: 'Call Us', value: '+977 9801666620', link: 'tel:+9779801666620' },
                  { icon: '📧', label: 'Email Us', value: 'info@mithilagroup.com.np', link: 'mailto:info@mithilagroup.com.np' },
                  { icon: '💬', label: 'WhatsApp', value: 'Chat with us', link: 'https://api.whatsapp.com/send?phone=9779801666620' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={variants.staggerItem}
                    whileHover={{ y: -4 }}
                    className="p-3 rounded-xl bg-[#131A2B]/40 border border-[#1E293B] hover:border-[#F59E0B]/30 transition-all duration-500"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs text-[#94A3B8]">{item.label}</div>
                    <a 
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="text-[#FCD34D] text-sm font-medium hover:text-[#F59E0B] transition-colors block"
                    >
                      {item.value}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* FOOTER */}
      {/* ========================================== */}
      <footer className="border-t border-[#F59E0B]/20 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Home className="w-3 h-3" /> Home</a></li>
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Briefcase className="w-3 h-3" /> Our Services</a></li>
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Building2 className="w-3 h-3" /> Company</a></li>
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><User className="w-3 h-3" /> About Us</a></li>
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><FileText className="w-3 h-3" /> Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Megaphone className="w-3 h-3" /> Digital Promotions</a></li>
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><PenTool className="w-3 h-3" /> Graphic Design</a></li>
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Palette className="w-3 h-3" /> Motion Graphics</a></li>
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Camera className="w-3 h-3" /> Photoshoot</a></li>
                <li><a href="#" className="hover:text-[#FCD34D] transition-colors duration-200 flex items-center gap-2"><Share2 className="w-3 h-3" /> Social Media</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">
                  <Phone className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <a href="tel:+9779801666620" className="hover:text-[#FCD34D] transition-colors duration-200">
                    +977 9801666620
                  </a>
                </li>
                <li className="flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">
                  <Mail className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <a 
                    href="mailto:info@mithilagroup.com.np" 
                    className="hover:text-[#FCD34D] transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = 'mailto:info@mithilagroup.com.np';
                    }}
                  >
                    info@mithilagroup.com.np
                  </a>
                </li>
                <li className="flex items-start gap-3 text-[#94A3B8] hover:text-[#FCD34D] transition-colors duration-200">
                  <MapPin className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">
                    Nepal, Madhesh Pradesh, Dhanusa,<br />
                    Janakpur Sub-Metropolitan - 7
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={mithilaLogo} alt="MithilaSoft" className="h-10 w-auto" />
                <div>
                  <span className="text-xl font-bold text-white">MithilaSoft</span>
                  <span className="block text-[9px] text-[#FCD34D] tracking-widest -mt-0.5">EMPOWERING BUSINESSES</span>
                </div>
              </div>
              <p className="text-sm text-[#94A3B8] mb-4">The complete ecommerce platform for businesses of all sizes.</p>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/MithilaGroupOfInustires" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#94A3B8] hover:text-[#1877F2] transition-all duration-300 hover:scale-110" 
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/mithila_group" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#94A3B8] hover:text-[#E4405F] transition-all duration-300 hover:scale-110" 
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/mithilagroupcompany/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#94A3B8] hover:text-[#0A66C2] transition-all duration-300 hover:scale-110" 
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://api.whatsapp.com/send?phone=9779801666620" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#94A3B8] hover:text-[#25D366] transition-all duration-300 hover:scale-110" 
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-[#94A3B8] hover:text-[#F59E0B] transition-all duration-300 hover:scale-110" 
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F59E0B]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#94A3B8]">© 2026 MithilaSoft. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-[#94A3B8]">
              <a href="#" className="hover:text-[#FCD34D] transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-[#FCD34D] transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-[#FCD34D] transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage