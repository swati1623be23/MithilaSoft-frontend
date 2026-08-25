




// // src/pages/dashboard/Analytics.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     TrendingUp,
//     TrendingDown,
//     DollarSign,
//     ShoppingBag,
//     Users,
//     BarChart3,
//     PieChart,
//     Download,
//     Calendar,
//     Filter,
//     ArrowUpRight,
//     ArrowDownRight,
//     CreditCard,
//     Wallet,
//     Truck,
//     Gift,
//     Package,
//     ShoppingCart,
//     Globe,
//     Smartphone,
//     User,
//     Zap,
//     Award,
//     Clock,
//     Eye,
//     Target,
//     Percent,
//     Activity,
//     Circle,
//     ChevronDown,
//     ChevronRight,
//     MapPin,
//     Building,
//     Crown,
//     Medal,
//     Star,
//     TrendingUp as TrendingUpIcon,
// } from 'lucide-react'
// import { 
//     LineChart, 
//     Line, 
//     AreaChart, 
//     Area, 
//     BarChart, 
//     Bar, 
//     PieChart as RePieChart, 
//     Pie, 
//     Cell, 
//     XAxis, 
//     YAxis, 
//     CartesianGrid, 
//     Tooltip, 
//     ResponsiveContainer, 
//     Legend,
//     ComposedChart,
// } from 'recharts'
// import toast from 'react-hot-toast'
// import api from '../../services/api'

// const Analytics = () => {
//     const [timePeriod, setTimePeriod] = useState('30days')
//     const [loading, setLoading] = useState(true)
//     const [data, setData] = useState(null)
//     const [selectedCategory, setSelectedCategory] = useState('all')
//     const [activeTab, setActiveTab] = useState('overview')
//     const [showExportMenu, setShowExportMenu] = useState(false)
//     const exportRef = useRef(null)

//     // Time period options
//     const periods = [
//         { value: 'today', label: 'Today' },
//         { value: 'yesterday', label: 'Yesterday' },
//         { value: '7days', label: '7 Days' },
//         { value: '30days', label: '30 Days' },
//         { value: '90days', label: '90 Days' },
//     ]

//     // Colors
//     const COLORS = ['#4F46E5', '#06B6D4', '#F59E0B', '#22C55E', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6']
    
//     // Get token
//     const getToken = () => localStorage.getItem('token')

//     // ============================================
//     // CLICK OUTSIDE HANDLER FOR EXPORT MENU
//     // ============================================
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (exportRef.current && !exportRef.current.contains(event.target)) {
//                 setShowExportMenu(false)
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [])

//     // ============================================
//     // EXPORT FUNCTION
//     // ============================================
//     const handleExport = async (type = 'sales') => {
//         try {
//             const token = getToken()
            
//             // Show loading toast
//             toast.loading('Generating report...', { id: 'export' })
            
//             const response = await api.get(`/analytics/export/${type}`, {
//                 params: { 
//                     period: timePeriod,
//                     format: 'csv'
//                 },
//                 headers: { 
//                     Authorization: `Bearer ${token}`,
//                     'Accept': 'text/csv'
//                 },
//                 responseType: 'blob' // Important for file download
//             })

//             // Create download link
//             const url = window.URL.createObjectURL(new Blob([response.data]))
//             const link = document.createElement('a')
//             link.href = url
//             link.setAttribute('download', `${type}-report-${new Date().toISOString().split('T')[0]}.csv`)
//             document.body.appendChild(link)
//             link.click()
//             link.remove()
            
//             toast.success('Report downloaded successfully!', { id: 'export' })
//         } catch (error) {
//             console.error('❌ Export error:', error)
//             toast.error('Failed to export report', { id: 'export' })
//         }
//     }

//     // ============================================
//     // FETCH ANALYTICS DATA
//     // ============================================
//     const fetchAnalytics = async () => {
//         try {
//             setLoading(true)
//             const token = getToken()
            
//             const response = await api.get('/analytics/dashboard', {
//                 params: { period: timePeriod },
//                 headers: { Authorization: `Bearer ${token}` }
//             })

//             if (response.data.success) {
//                 setData(response.data.data || response.data)
//             } else {
//                 toast.error('Failed to load analytics data')
//             }
//         } catch (error) {
//             console.error('❌ Fetch analytics error:', error)
//             toast.error('Failed to load analytics data')
//             // Set empty data structure
//             setData({
//                 summary: {
//                     revenue: 0,
//                     orders: 0,
//                     deliveryCharge: 0,
//                     onlinePayments: 0,
//                     cashPayments: 0,
//                     discountAmount: 0,
//                     uniqueCustomers: 0,
//                     averageOrderValue: 0,
//                     grossMargin: 0,
//                     grossProfit: 0,
//                     conversionRate: 0,
//                     visitors: 0,
//                 },
//                 dailyData: [],
//                 channelBreakdown: [],
//                 statusDistribution: [],
//                 paymentDistribution: [],
//                 topProducts: [],
//                 leastProducts: [],
//                 cityData: [],
//                 staffPerformance: [],
//                 revenueContribution: [],
//                 averageRevenue: 0,
//             })
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchAnalytics()
//     }, [timePeriod])

//     // Format currency
//     const formatCurrency = (value) => {
//         if (value === undefined || value === null) return '₹ 0'
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0,
//         }).format(value)
//     }

//     // Format number
//     const formatNumber = (value) => {
//         if (value === undefined || value === null) return '0'
//         return new Intl.NumberFormat('en-IN').format(value)
//     }

//     // Format percentage
//     const formatPercentage = (value) => {
//         if (value === undefined || value === null) return '0.00%'
//         return `${value.toFixed(2)}%`
//     }

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-textSecondary">Loading analytics...</p>
//                 </div>
//             </div>
//         )
//     }

//     // Safe data access
//     const summary = data?.summary || {
//         revenue: 0,
//         orders: 0,
//         deliveryCharge: 0,
//         onlinePayments: 0,
//         cashPayments: 0,
//         discountAmount: 0,
//         uniqueCustomers: 0,
//         averageOrderValue: 0,
//         grossMargin: 0,
//         grossProfit: 0,
//         conversionRate: 0,
//         visitors: 0,
//     }

//     const dailyData = data?.dailyData || []
//     const channelBreakdown = data?.channelBreakdown || []
//     const statusDistribution = data?.statusDistribution || []
//     const paymentDistribution = data?.paymentDistribution || []
//     const topProducts = data?.topProducts || []
//     const leastProducts = data?.leastProducts || []
//     const cityData = data?.cityData || []
//     const staffPerformance = data?.staffPerformance || []
//     const revenueContribution = data?.revenueContribution || []
//     const averageRevenue = data?.averageRevenue || 0

//     return (
//         <div className="space-y-6">
//             {/* ========================================== */}
//             {/* HEADER WITH EXPORT DROPDOWN */}
//             {/* ========================================== */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Analytics</h1>
//                     <p className="text-desc">
//                         Deep performance reporting and insights
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <div className="flex bg-card rounded-2xl p-1 border border-border">
//                         {periods.map((period) => (
//                             <button
//                                 key={period.value}
//                                 onClick={() => setTimePeriod(period.value)}
//                                 className={`px-3 py-1.5 rounded-xl text-xs transition-all duration-200 ${
//                                     timePeriod === period.value
//                                         ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
//                                         : 'text-textSecondary hover:text-white'
//                                 }`}
//                             >
//                                 {period.label}
//                             </button>
//                         ))}
//                     </div>

//                     {/* EXPORT BUTTON WITH DROPDOWN */}
//                     <div className="relative" ref={exportRef}>
//                         <button
//                             onClick={() => setShowExportMenu(!showExportMenu)}
//                             className="btn-secondary"
//                         >
//                             <Download className="w-4 h-4" />
//                             Export
//                             <ChevronDown className="w-3 h-3" />
//                         </button>
                        
//                         <AnimatePresence>
//                             {showExportMenu && (
//                                 <motion.div
//                                     initial={{ opacity: 0, scale: 0.95, y: -5 }}
//                                     animate={{ opacity: 1, scale: 1, y: 0 }}
//                                     exit={{ opacity: 0, scale: 0.95, y: -5 }}
//                                     className="absolute right-0 top-full mt-1 w-48 glass rounded-2xl border border-border shadow-2xl overflow-hidden z-20"
//                                 >
//                                     <div className="py-1">
//                                         <button
//                                             onClick={() => { 
//                                                 handleExport('sales'); 
//                                                 setShowExportMenu(false) 
//                                             }}
//                                             className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-2"
//                                         >
//                                             <DollarSign className="w-4 h-4" />
//                                             Sales Report
//                                         </button>
//                                         <button
//                                             onClick={() => { 
//                                                 handleExport('revenue'); 
//                                                 setShowExportMenu(false) 
//                                             }}
//                                             className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-2"
//                                         >
//                                             <BarChart3 className="w-4 h-4" />
//                                             Revenue Report
//                                         </button>
//                                         <button
//                                             onClick={() => { 
//                                                 handleExport('customers'); 
//                                                 setShowExportMenu(false) 
//                                             }}
//                                             className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-2"
//                                         >
//                                             <Users className="w-4 h-4" />
//                                             Customer Report
//                                         </button>
//                                         <button
//                                             onClick={() => { 
//                                                 handleExport('products'); 
//                                                 setShowExportMenu(false) 
//                                             }}
//                                             className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-2"
//                                         >
//                                             <Package className="w-4 h-4" />
//                                             Product Report
//                                         </button>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </div>
//                 </div>
//             </div>

//             {/* Tabs */}
//             <div className="flex flex-wrap gap-2 border-b border-border pb-4">
//                 {[
//                     { id: 'overview', label: 'Sales Overview', icon: BarChart3 },
//                     { id: 'channels', label: 'Channel Distribution', icon: Globe },
//                     { id: 'products', label: 'Product Performance', icon: Package },
//                     { id: 'staff', label: 'Staff Performance', icon: Users },
//                 ].map((tab) => {
//                     const Icon = tab.icon
//                     const isActive = activeTab === tab.id
//                     return (
//                         <button
//                             key={tab.id}
//                             onClick={() => setActiveTab(tab.id)}
//                             className={`px-4 py-2 rounded-2xl text-sm transition-all duration-200 flex items-center gap-2 ${
//                                 isActive
//                                     ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
//                                     : 'text-textSecondary hover:text-white hover:bg-white/5'
//                             }`}
//                         >
//                             <Icon className="w-4 h-4" />
//                             {tab.label}
//                         </button>
//                     )
//                 })}
//             </div>

//             {/* Content */}
//             <motion.div
//                 key={activeTab}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 {/* Sales Overview Tab */}
//                 {activeTab === 'overview' && (
//                     <div className="space-y-6">
//                         {/* Summary Cards */}
//                         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-indigo-400">{formatCurrency(summary.revenue)}</div>
//                                 <div className="text-xs text-textSecondary">Revenue</div>
//                             </div>
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-cyan-400">{formatNumber(summary.orders)}</div>
//                                 <div className="text-xs text-textSecondary">Orders</div>
//                             </div>
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-amber-400">{formatCurrency(summary.deliveryCharge)}</div>
//                                 <div className="text-xs text-textSecondary">Delivery Charge</div>
//                             </div>
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-success">{formatCurrency(summary.onlinePayments)}</div>
//                                 <div className="text-xs text-textSecondary">Online Payments</div>
//                             </div>
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-amber-400">{formatCurrency(summary.cashPayments)}</div>
//                                 <div className="text-xs text-textSecondary">Cash Payments</div>
//                             </div>
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-danger">{formatCurrency(summary.discountAmount)}</div>
//                                 <div className="text-xs text-textSecondary">Discount Amount</div>
//                             </div>
//                         </div>

//                         {/* More Stats */}
//                         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-indigo-400">{formatNumber(summary.uniqueCustomers)}</div>
//                                 <div className="text-xs text-textSecondary">Unique Customers</div>
//                             </div>
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-cyan-400">{formatCurrency(summary.averageOrderValue)}</div>
//                                 <div className="text-xs text-textSecondary">Avg Order Value</div>
//                             </div>
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-amber-400">{formatPercentage(summary.grossMargin)}</div>
//                                 <div className="text-xs text-textSecondary">Gross Margin</div>
//                             </div>
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-success">{formatCurrency(summary.grossProfit)}</div>
//                                 <div className="text-xs text-textSecondary">Gross Profit</div>
//                             </div>
//                             <div className="card p-4 text-center hover:border-indigo-500/50 transition-all duration-300">
//                                 <div className="text-title text-rose-400">{formatPercentage(summary.conversionRate)}</div>
//                                 <div className="text-xs text-textSecondary">Conversion Rate</div>
//                             </div>
//                         </div>

//                         {/* Average Revenue */}
//                         <div className="card p-6">
//                             <div className="flex items-center justify-between mb-4">
//                                 <div>
//                                     <h3 className="font-semibold">Average Revenue</h3>
//                                     <p className="text-sm text-textSecondary">Daily average revenue</p>
//                                 </div>
//                                 <div className="text-3xl font-bold text-indigo-400">{formatCurrency(averageRevenue)}</div>
//                             </div>
//                             <div className="h-64">
//                                 {dailyData.length > 0 ? (
//                                     <ResponsiveContainer width="100%" height="100%">
//                                         <AreaChart data={dailyData}>
//                                             <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
//                                             <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} />
//                                             <YAxis stroke="#94A3B8" fontSize={12} />
//                                             <Tooltip
//                                                 contentStyle={{
//                                                     background: '#131A2B',
//                                                     border: '1px solid #1E293B',
//                                                     borderRadius: '12px',
//                                                     padding: '12px',
//                                                 }}
//                                                 labelStyle={{ color: '#F8FAFC' }}
//                                                 formatter={(value) => formatCurrency(value)}
//                                             />
//                                             <Area 
//                                                 type="monotone" 
//                                                 dataKey="revenue" 
//                                                 stroke="#4F46E5" 
//                                                 fill="#4F46E5" 
//                                                 fillOpacity={0.2}
//                                                 name="Revenue"
//                                             />
//                                         </AreaChart>
//                                     </ResponsiveContainer>
//                                 ) : (
//                                     <div className="flex items-center justify-center h-full text-textSecondary">
//                                         <div className="text-center">
//                                             <BarChart3 className="w-12 h-12 mx-auto mb-2 text-textSecondary/30" />
//                                             <p>No data available for this period</p>
//                                             <p className="text-xs">Information will appear here once orders are placed</p>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Channel Distribution Tab */}
//                 {activeTab === 'channels' && (
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         {/* Order Channel Distribution */}
//                         <div className="card p-6">
//                             <h3 className="font-semibold mb-4">Order Channel Distribution</h3>
//                             {channelBreakdown.length > 0 ? (
//                                 <div className="space-y-4">
//                                     <div className="h-48">
//                                         <ResponsiveContainer width="100%" height="100%">
//                                             <RePieChart>
//                                                 <Pie
//                                                     data={channelBreakdown}
//                                                     cx="50%"
//                                                     cy="50%"
//                                                     labelLine={false}
//                                                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                                                     outerRadius={70}
//                                                     dataKey="value"
//                                                 >
//                                                     {channelBreakdown.map((entry, index) => (
//                                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                                     ))}
//                                                 </Pie>
//                                                 <Tooltip
//                                                     contentStyle={{
//                                                         background: '#131A2B',
//                                                         border: '1px solid #1E293B',
//                                                         borderRadius: '12px',
//                                                         padding: '12px',
//                                                     }}
//                                                 />
//                                             </RePieChart>
//                                         </ResponsiveContainer>
//                                     </div>
//                                     <div className="grid grid-cols-2 gap-2">
//                                         {channelBreakdown.map((channel, index) => (
//                                             <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-background border border-border">
//                                                 <span className="text-sm">{channel.name}</span>
//                                                 <span className="text-sm font-semibold">{channel.value}%</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="flex items-center justify-center h-48 text-textSecondary">
//                                     <div className="text-center">
//                                         <Globe className="w-12 h-12 mx-auto mb-2 text-textSecondary/30" />
//                                         <p>No channel data available</p>
//                                         <p className="text-xs">Information will appear here once orders are placed</p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Order Status Distribution */}
//                         <div className="card p-6">
//                             <h3 className="font-semibold mb-4">Order Status Distribution</h3>
//                             {statusDistribution.length > 0 ? (
//                                 <div className="space-y-3">
//                                     {statusDistribution.map((status, index) => (
//                                         <div key={index}>
//                                             <div className="flex items-center justify-between text-sm">
//                                                 <span>{status.status}</span>
//                                                 <span className="font-semibold">{status.count}</span>
//                                             </div>
//                                             <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden mt-1">
//                                                 <div
//                                                     className="h-full rounded-full transition-all duration-500"
//                                                     style={{
//                                                         width: `${(status.count / statusDistribution.reduce((sum, s) => sum + s.count, 1)) * 100}%`,
//                                                         background: status.color || COLORS[index % COLORS.length],
//                                                     }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="flex items-center justify-center h-48 text-textSecondary">
//                                     <div className="text-center">
//                                         <Package className="w-12 h-12 mx-auto mb-2 text-textSecondary/30" />
//                                         <p>No status data available</p>
//                                         <p className="text-xs">Information will appear here once orders are placed</p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Product Performance Tab */}
//                 {activeTab === 'products' && (
//                     <div className="space-y-6">
//                         {/* Top 10 Cities */}
//                         <div className="card p-6">
//                             <h3 className="font-semibold mb-4">Top 10 Cities by Orders</h3>
//                             {cityData.length > 0 ? (
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full">
//                                         <thead>
//                                             <tr className="text-table-header border-b border-border">
//                                                 <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">City</th>
//                                                 <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Count</th>
//                                                 <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Amount</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {cityData.map((city, index) => (
//                                                 <tr key={index} className="border-b border-border last:border-0">
//                                                     <td className="py-3">{city.name}</td>
//                                                     <td className="py-3 text-center">{city.count}</td>
//                                                     <td className="py-3 text-right font-semibold text-indigo-400">{formatCurrency(city.amount)}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             ) : (
//                                 <div className="flex items-center justify-center h-32 text-textSecondary">
//                                     <div className="text-center">
//                                         <MapPin className="w-12 h-12 mx-auto mb-2 text-textSecondary/30" />
//                                         <p>No city data available</p>
//                                         <p className="text-xs">City information will appear here once orders are placed</p>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Filter by Category */}
//                         <div className="flex items-center gap-4">
//                             <label className="text-sm text-textSecondary">Filter by Category:</label>
//                             <select
//                                 value={selectedCategory}
//                                 onChange={(e) => setSelectedCategory(e.target.value)}
//                                 className="input-field w-48"
//                             >
//                                 <option value="all">All Categories</option>
//                                 <option value="electronics">Electronics</option>
//                                 <option value="clothing">Clothing</option>
//                                 <option value="accessories">Accessories</option>
//                             </select>
//                         </div>

//                         {/* Top & Least Selling Products */}
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                             {/* Top Selling Products */}
//                             <div className="card p-6">
//                                 <h3 className="font-semibold mb-4 flex items-center gap-2">
//                                     <TrendingUpIcon className="w-5 h-5 text-success" />
//                                     Top Selling Products
//                                 </h3>
//                                 {topProducts.length > 0 ? (
//                                     <div className="overflow-x-auto">
//                                         <table className="w-full">
//                                             <thead>
//                                                 <tr className="text-table-header border-b border-border">
//                                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Product</th>
//                                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Qty Sold</th>
//                                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Amount</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {topProducts.map((product, index) => (
//                                                     <tr key={index} className="border-b border-border last:border-0">
//                                                         <td className="py-3 flex items-center gap-2">
//                                                             <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
//                                                                 index === 0 ? 'bg-amber-500/20 text-amber-400' :
//                                                                 index === 1 ? 'bg-gray-400/20 text-gray-400' :
//                                                                 index === 2 ? 'bg-amber-600/20 text-amber-600' :
//                                                                 'bg-[#1E293B] text-textSecondary'
//                                                             }`}>
//                                                                 {index + 1}
//                                                             </div>
//                                                             {product.name}
//                                                         </td>
//                                                         <td className="py-3 text-center">{product.qty}</td>
//                                                         <td className="py-3 text-right font-semibold text-indigo-400">{formatCurrency(product.amount)}</td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 ) : (
//                                     <div className="text-center py-8 text-textSecondary">
//                                         No records
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Least Selling Products */}
//                             <div className="card p-6">
//                                 <h3 className="font-semibold mb-4 flex items-center gap-2">
//                                     <TrendingDown className="w-5 h-5 text-danger" />
//                                     Least Selling Products
//                                 </h3>
//                                 {leastProducts.length > 0 ? (
//                                     <div className="overflow-x-auto">
//                                         <table className="w-full">
//                                             <thead>
//                                                 <tr className="text-table-header border-b border-border">
//                                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Product</th>
//                                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Qty Sold</th>
//                                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Amount</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {leastProducts.map((product, index) => (
//                                                     <tr key={index} className="border-b border-border last:border-0">
//                                                         <td className="py-3">{product.name}</td>
//                                                         <td className="py-3 text-center">{product.qty}</td>
//                                                         <td className="py-3 text-right text-textSecondary">{formatCurrency(product.amount)}</td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 ) : (
//                                     <div className="text-center py-8 text-textSecondary">
//                                         No records
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Revenue Contribution By Product */}
//                         <div className="card p-6">
//                             <h3 className="font-semibold mb-4">Revenue Contribution By Product</h3>
//                             {revenueContribution.length > 0 ? (
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full">
//                                         <thead>
//                                             <tr className="text-table-header border-b border-border">
//                                                 <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Product</th>
//                                                 <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Qty Sold</th>
//                                                 <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Amount</th>
//                                                 <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">% Revenue</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {revenueContribution.map((product, index) => (
//                                                 <tr key={index} className="border-b border-border last:border-0">
//                                                     <td className="py-3">{product.name}</td>
//                                                     <td className="py-3 text-center">{product.qty}</td>
//                                                     <td className="py-3 text-right font-semibold text-indigo-400">{formatCurrency(product.amount)}</td>
//                                                     <td className="py-3 text-right text-amber-400">{product.percentage}%</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             ) : (
//                                 <div className="text-center py-8 text-textSecondary">
//                                     No records
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Staff Performance Tab */}
//                 {activeTab === 'staff' && (
//                     <div className="card p-6">
//                         <h3 className="font-semibold mb-4">Staff Sales Performance</h3>
//                         {staffPerformance.length > 0 ? (
//                             <div className="overflow-x-auto">
//                                 <table className="w-full">
//                                     <thead>
//                                         <tr className="text-table-header border-b border-border">
//                                             <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Staff</th>
//                                             <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Roles</th>
//                                             <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Orders Created</th>
//                                             <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Successful Orders</th>
//                                             <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Revenue Generated</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {staffPerformance.map((staff, index) => (
//                                             <tr key={index} className="border-b border-border last:border-0">
//                                                 <td className="py-3 flex items-center gap-2">
//                                                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
//                                                         {staff.name.charAt(0)}
//                                                     </div>
//                                                     {staff.name}
//                                                 </td>
//                                                 <td className="py-3">
//                                                     <span className="px-2 py-0.5 rounded-full bg-[#1E293B] text-textSecondary text-xs">
//                                                         {staff.role}
//                                                     </span>
//                                                 </td>
//                                                 <td className="py-3 text-center">{staff.ordersCreated}</td>
//                                                 <td className="py-3 text-center text-success">{staff.successfulOrders}</td>
//                                                 <td className="py-3 text-right font-semibold text-indigo-400">{formatCurrency(staff.revenue)}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         ) : (
//                             <div className="text-center py-12 text-textSecondary">
//                                 <Users className="w-16 h-16 mx-auto mb-4 text-textSecondary/30" />
//                                 <p>No records</p>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </motion.div>
//         </div>
//     )
// }

// export default Analytics

















// src/pages/dashboard/Analytics.jsx
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingBag,
    Users,
    BarChart3,
    PieChart,
    Download,
    Calendar,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    Wallet,
    Truck,
    Gift,
    Package,
    ShoppingCart,
    Globe,
    Smartphone,
    User,
    Zap,
    Award,
    Clock,
    Eye,
    Target,
    Percent,
    Activity,
    Circle,
    ChevronDown,
    ChevronRight,
    MapPin,
    Building,
    Crown,
    Medal,
    Star,
    TrendingUp as TrendingUpIcon,
} from 'lucide-react'
import { 
    LineChart, 
    Line, 
    AreaChart, 
    Area, 
    BarChart, 
    Bar, 
    PieChart as RePieChart, 
    Pie, 
    Cell, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    Legend,
    ComposedChart,
} from 'recharts'
import toast from 'react-hot-toast'
import api from '../../services/api'

const Analytics = () => {
    const [timePeriod, setTimePeriod] = useState('30days')
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [activeTab, setActiveTab] = useState('overview')
    const [showExportMenu, setShowExportMenu] = useState(false)
    const exportRef = useRef(null)
    
    // ✅ Get dark mode from localStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved ? saved === 'dark' : true
    })

    // ✅ Listen for theme changes
    useEffect(() => {
        const handleThemeChange = () => {
            const saved = localStorage.getItem('theme')
            setIsDarkMode(saved ? saved === 'dark' : true)
        }
        
        window.addEventListener('storage', handleThemeChange)
        
        // Check for theme changes in the document
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark')
            setIsDarkMode(isDark)
        })
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })
        
        return () => {
            window.removeEventListener('storage', handleThemeChange)
            observer.disconnect()
        }
    }, [])

    // Time period options
    const periods = [
        { value: 'today', label: 'Today' },
        { value: 'yesterday', label: 'Yesterday' },
        { value: '7days', label: '7 Days' },
        { value: '30days', label: '30 Days' },
        { value: '90days', label: '90 Days' },
    ]

    // Colors
    const COLORS = ['#4F46E5', '#06B6D4', '#F59E0B', '#22C55E', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6']
    
    // Get token
    const getToken = () => localStorage.getItem('token')

    // Click outside handler for export menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (exportRef.current && !exportRef.current.contains(event.target)) {
                setShowExportMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Fetch analytics data
    const fetchAnalytics = async () => {
        try {
            setLoading(true)
            const token = getToken()
            
            const response = await api.get('/analytics/dashboard', {
                params: { period: timePeriod },
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setData(response.data.data || response.data)
            } else {
                toast.error('Failed to load analytics data')
            }
        } catch (error) {
            console.error('❌ Fetch analytics error:', error)
            toast.error('Failed to load analytics data')
            // Set empty data structure
            setData({
                summary: {
                    revenue: 0,
                    orders: 0,
                    deliveryCharge: 0,
                    onlinePayments: 0,
                    cashPayments: 0,
                    discountAmount: 0,
                    uniqueCustomers: 0,
                    averageOrderValue: 0,
                    grossMargin: 0,
                    grossProfit: 0,
                    conversionRate: 0,
                    visitors: 0,
                },
                dailyData: [],
                channelBreakdown: [],
                statusDistribution: [],
                paymentDistribution: [],
                topProducts: [],
                leastProducts: [],
                cityData: [],
                staffPerformance: [],
                revenueContribution: [],
                averageRevenue: 0,
            })
        } finally {
            setLoading(false)
        }
    }

    // ============================================
    // EXPORT FUNCTION
    // ============================================
    const handleExport = async (type = 'sales') => {
        try {
            const token = getToken()
            
            toast.loading('Generating report...', { id: 'export' })
            
            const response = await api.get(`/analytics/export/${type}`, {
                params: { 
                    period: timePeriod,
                    format: 'csv'
                },
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Accept': 'text/csv'
                },
                responseType: 'blob'
            })

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${type}-report-${new Date().toISOString().split('T')[0]}.csv`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            
            toast.success('Report downloaded successfully!', { id: 'export' })
        } catch (error) {
            console.error('❌ Export error:', error)
            toast.error('Failed to export report', { id: 'export' })
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [timePeriod])

    // Format currency
    const formatCurrency = (value) => {
        if (value === undefined || value === null) return '₹ 0'
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    // Format number
    const formatNumber = (value) => {
        if (value === undefined || value === null) return '0'
        return new Intl.NumberFormat('en-IN').format(value)
    }

    // Format percentage
    const formatPercentage = (value) => {
        if (value === undefined || value === null) return '0.00%'
        return `${value.toFixed(2)}%`
    }

    // ✅ Dynamic styles based on theme
    const isDark = isDarkMode
    
    // Background colors
    const bgPrimary = isDark ? 'bg-black' : 'bg-gray-50'
    const bgCard = isDark ? 'bg-[#111111] border border-white/5' : 'bg-white border border-gray-200'
    const bgHover = isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'
    const bgInput = isDark ? 'bg-[#1a1a1a]' : 'bg-gray-100'
    
    // Text colors
    const textPrimary = isDark ? 'text-white' : 'text-gray-900'
    const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600'
    const textMuted = isDark ? 'text-gray-500' : 'text-gray-400'
    const textHover = isDark ? 'hover:text-white' : 'hover:text-gray-900'
    
    // Border colors
    const borderColor = isDark ? 'border-white/5' : 'border-gray-200'
    
    // Shadow
    const shadow = isDark ? 'shadow-2xl shadow-black/50' : 'shadow-2xl shadow-gray-200/50'

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className={textSecondary}>Loading analytics...</p>
                </div>
            </div>
        )
    }

    // Safe data access
    const summary = data?.summary || {
        revenue: 0,
        orders: 0,
        deliveryCharge: 0,
        onlinePayments: 0,
        cashPayments: 0,
        discountAmount: 0,
        uniqueCustomers: 0,
        averageOrderValue: 0,
        grossMargin: 0,
        grossProfit: 0,
        conversionRate: 0,
        visitors: 0,
    }

    const dailyData = data?.dailyData || []
    const channelBreakdown = data?.channelBreakdown || []
    const statusDistribution = data?.statusDistribution || []
    const paymentDistribution = data?.paymentDistribution || []
    const topProducts = data?.topProducts || []
    const leastProducts = data?.leastProducts || []
    const cityData = data?.cityData || []
    const staffPerformance = data?.staffPerformance || []
    const revenueContribution = data?.revenueContribution || []
    const averageRevenue = data?.averageRevenue || 0

    return (
        <div className={`min-h-screen ${bgPrimary} transition-colors duration-300 p-6`}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-title">Analytics</h1>
                        <p className="text-desc">
                            Deep performance reporting and insights
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`flex ${bgInput} rounded-2xl p-1 border ${borderColor}`}>
                            {periods.map((period) => (
                                <button
                                    key={period.value}
                                    onClick={() => setTimePeriod(period.value)}
                                    className={
                                        timePeriod === period.value
                                            ? 'btn-primary h-8 px-3 text-xs'
                                            : 'btn-secondary h-8 px-3 text-xs border-transparent bg-transparent'
                                    }
                                >
                                    {period.label}
                                </button>
                            ))}
                        </div>

                        {/* Export Button with Dropdown */}
                        <div className="relative" ref={exportRef}>
                            <button
                                onClick={() => setShowExportMenu(!showExportMenu)}
                                className="btn-secondary"
                            >
                                <Download className="w-4 h-4" />
                                Export
                                <ChevronDown className="w-3 h-3" />
                            </button>
                            
                            <AnimatePresence>
                                {showExportMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                        className={`absolute right-0 top-full mt-1 w-48 ${bgCard} rounded-2xl border ${borderColor} ${shadow} overflow-hidden z-20`}
                                    >
                                        <div className="py-1">
                                            <button
                                                onClick={() => { handleExport('sales'); setShowExportMenu(false) }}
                                                className={`w-full px-4 py-2 text-left text-sm ${bgHover} transition-colors duration-200 flex items-center gap-2 ${textSecondary} ${textHover}`}
                                            >
                                                <DollarSign className="w-4 h-4" />
                                                Sales Report
                                            </button>
                                            <button
                                                onClick={() => { handleExport('revenue'); setShowExportMenu(false) }}
                                                className={`w-full px-4 py-2 text-left text-sm ${bgHover} transition-colors duration-200 flex items-center gap-2 ${textSecondary} ${textHover}`}
                                            >
                                                <BarChart3 className="w-4 h-4" />
                                                Revenue Report
                                            </button>
                                            <button
                                                onClick={() => { handleExport('customers'); setShowExportMenu(false) }}
                                                className={`w-full px-4 py-2 text-left text-sm ${bgHover} transition-colors duration-200 flex items-center gap-2 ${textSecondary} ${textHover}`}
                                            >
                                                <Users className="w-4 h-4" />
                                                Customer Report
                                            </button>
                                            <button
                                                onClick={() => { handleExport('products'); setShowExportMenu(false) }}
                                                className={`w-full px-4 py-2 text-left text-sm ${bgHover} transition-colors duration-200 flex items-center gap-2 ${textSecondary} ${textHover}`}
                                            >
                                                <Package className="w-4 h-4" />
                                                Product Report
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={`flex flex-wrap gap-2 border-b ${borderColor} pb-4`}>
                    {[
                        { id: 'overview', label: 'Sales Overview', icon: BarChart3 },
                        { id: 'channels', label: 'Channel Distribution', icon: Globe },
                        { id: 'products', label: 'Product Performance', icon: Package },
                        { id: 'staff', label: 'Staff Performance', icon: Users },
                    ].map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-2xl text-sm transition-all duration-200 flex items-center gap-2 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                                        : `${textSecondary} ${textHover}`
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                {/* Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Sales Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-indigo-400">{formatCurrency(summary.revenue)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Revenue</div>
                                </div>
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-cyan-400">{formatNumber(summary.orders)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Orders</div>
                                </div>
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-amber-400">{formatCurrency(summary.deliveryCharge)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Delivery Charge</div>
                                </div>
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-green-400">{formatCurrency(summary.onlinePayments)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Online Payments</div>
                                </div>
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-amber-400">{formatCurrency(summary.cashPayments)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Cash Payments</div>
                                </div>
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-red-400">{formatCurrency(summary.discountAmount)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Discount Amount</div>
                                </div>
                            </div>

                            {/* More Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-indigo-400">{formatNumber(summary.uniqueCustomers)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Unique Customers</div>
                                </div>
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-cyan-400">{formatCurrency(summary.averageOrderValue)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Avg Order Value</div>
                                </div>
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-amber-400">{formatPercentage(summary.grossMargin)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Gross Margin</div>
                                </div>
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-green-400">{formatCurrency(summary.grossProfit)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Gross Profit</div>
                                </div>
                                <div className={`${bgCard} rounded-2xl p-4 text-center transition-all duration-300 hover:border-indigo-500/50`}>
                                    <div className="text-title text-rose-400">{formatPercentage(summary.conversionRate)}</div>
                                    <div className={`text-xs ${textSecondary}`}>Conversion Rate</div>
                                </div>
                            </div>

                            {/* Average Revenue */}
                            <div className={`${bgCard} rounded-2xl p-6 transition-all duration-300`}>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className={`font-semibold ${textPrimary}`}>Average Revenue</h3>
                                        <p className={`text-sm ${textSecondary}`}>Daily average revenue</p>
                                    </div>
                                    <div className="text-3xl font-bold text-indigo-400">{formatCurrency(averageRevenue)}</div>
                                </div>
                                <div className="h-64">
                                    {dailyData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={dailyData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#e5e7eb"} />
                                                <XAxis dataKey="date" stroke={isDark ? "#666" : "#9ca3af"} fontSize={12} />
                                                <YAxis stroke={isDark ? "#666" : "#9ca3af"} fontSize={12} />
                                                <Tooltip
                                                    contentStyle={{
                                                        background: isDark ? '#111111' : '#ffffff',
                                                        border: isDark ? '1px solid #333' : '1px solid #e5e7eb',
                                                        borderRadius: '12px',
                                                        padding: '12px',
                                                        color: isDark ? '#ffffff' : '#111827',
                                                    }}
                                                    labelStyle={{ color: isDark ? '#ffffff' : '#111827' }}
                                                    formatter={(value) => formatCurrency(value)}
                                                />
                                                <Area 
                                                    type="monotone" 
                                                    dataKey="revenue" 
                                                    stroke="#4F46E5" 
                                                    fill="#4F46E5" 
                                                    fillOpacity={0.2}
                                                    name="Revenue"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <div className="text-center">
                                                <BarChart3 className={`w-12 h-12 mx-auto mb-2 ${textSecondary}/30`} />
                                                <p className={textSecondary}>No data available for this period</p>
                                                <p className={`text-xs ${textSecondary}`}>Information will appear here once orders are placed</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Channel Distribution Tab */}
                    {activeTab === 'channels' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Order Channel Distribution */}
                            <div className={`${bgCard} rounded-2xl p-6 transition-all duration-300`}>
                                <h3 className={`font-semibold ${textPrimary} mb-4`}>Order Channel Distribution</h3>
                                {channelBreakdown.length > 0 ? (
                                    <div className="space-y-4">
                                        <div className="h-48">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RePieChart>
                                                    <Pie
                                                        data={channelBreakdown}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                        outerRadius={70}
                                                        dataKey="value"
                                                    >
                                                        {channelBreakdown.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{
                                                            background: isDark ? '#111111' : '#ffffff',
                                                            border: isDark ? '1px solid #333' : '1px solid #e5e7eb',
                                                            borderRadius: '12px',
                                                            padding: '12px',
                                                            color: isDark ? '#ffffff' : '#111827',
                                                        }}
                                                        labelStyle={{ color: isDark ? '#ffffff' : '#111827' }}
                                                    />
                                                </RePieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            {channelBreakdown.map((channel, index) => (
                                                <div key={index} className={`flex items-center justify-between p-2 rounded-xl ${bgInput} border ${borderColor}`}>
                                                    <span className={`text-sm ${textSecondary}`}>{channel.name}</span>
                                                    <span className={`text-sm font-semibold ${textPrimary}`}>{channel.value}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-48">
                                        <div className="text-center">
                                            <Globe className={`w-12 h-12 mx-auto mb-2 ${textSecondary}/30`} />
                                            <p className={textSecondary}>No channel data available</p>
                                            <p className={`text-xs ${textSecondary}`}>Information will appear here once orders are placed</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Order Status Distribution */}
                            <div className={`${bgCard} rounded-2xl p-6 transition-all duration-300`}>
                                <h3 className={`font-semibold ${textPrimary} mb-4`}>Order Status Distribution</h3>
                                {statusDistribution.length > 0 ? (
                                    <div className="space-y-3">
                                        {statusDistribution.map((status, index) => (
                                            <div key={index}>
                                                <div className={`flex items-center justify-between text-sm ${textSecondary}`}>
                                                    <span>{status.status}</span>
                                                    <span className={`font-semibold ${textPrimary}`}>{status.count}</span>
                                                </div>
                                                <div className={`w-full h-2 ${isDark ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden mt-1`}>
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${(status.count / statusDistribution.reduce((sum, s) => sum + s.count, 1)) * 100}%`,
                                                            background: status.color || COLORS[index % COLORS.length],
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-48">
                                        <div className="text-center">
                                            <Package className={`w-12 h-12 mx-auto mb-2 ${textSecondary}/30`} />
                                            <p className={textSecondary}>No status data available</p>
                                            <p className={`text-xs ${textSecondary}`}>Information will appear here once orders are placed</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Product Performance Tab */}
                    {activeTab === 'products' && (
                        <div className="space-y-6">
                            {/* Top 10 Cities */}
                            <div className={`${bgCard} rounded-2xl p-6 transition-all duration-300`}>
                                <h3 className={`font-semibold ${textPrimary} mb-4`}>Top 10 Cities by Orders</h3>
                                {cityData.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className={`text-left text-sm ${textSecondary} border-b ${borderColor}`}>
                                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">City</th>
                                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Count</th>
                                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cityData.map((city, index) => (
                                                    <tr key={index} className={`border-b ${borderColor} last:border-0`}>
                                                        <td className={`py-3 ${textPrimary}`}>{city.name}</td>
                                                        <td className={`py-3 text-center ${textSecondary}`}>{city.count}</td>
                                                        <td className={`py-3 text-right font-semibold text-indigo-400`}>{formatCurrency(city.amount)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-32">
                                        <div className="text-center">
                                            <MapPin className={`w-12 h-12 mx-auto mb-2 ${textSecondary}/30`} />
                                            <p className={textSecondary}>No city data available</p>
                                            <p className={`text-xs ${textSecondary}`}>City information will appear here once orders are placed</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Filter by Category */}
                            <div className="flex items-center gap-4">
                                <label className={`text-sm ${textSecondary}`}>Filter by Category:</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className={`px-4 py-2.5 ${bgInput} border ${borderColor} rounded-2xl ${textPrimary} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-48`}
                                >
                                    <option value="all">All Categories</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>

                            {/* Top & Least Selling Products */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Top Selling Products */}
                                <div className={`${bgCard} rounded-2xl p-6 transition-all duration-300`}>
                                    <h3 className={`font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                                        <TrendingUpIcon className="w-5 h-5 text-green-400" />
                                        Top Selling Products
                                    </h3>
                                    {topProducts.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className={`text-left text-sm ${textSecondary} border-b ${borderColor}`}>
                                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Product</th>
                                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Qty Sold</th>
                                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {topProducts.map((product, index) => (
                                                        <tr key={index} className={`border-b ${borderColor} last:border-0`}>
                                                            <td className={`py-3 flex items-center gap-2 ${textPrimary}`}>
                                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                                    index === 0 ? 'bg-amber-500/20 text-amber-400' :
                                                                    index === 1 ? 'bg-gray-400/20 text-gray-400' :
                                                                    index === 2 ? 'bg-amber-600/20 text-amber-600' :
                                                                    'bg-white/10 text-textSecondary'
                                                                }`}>
                                                                    {index + 1}
                                                                </div>
                                                                {product.name}
                                                            </td>
                                                            <td className={`py-3 text-center ${textSecondary}`}>{product.qty}</td>
                                                            <td className={`py-3 text-right font-semibold text-indigo-400`}>{formatCurrency(product.amount)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className={`text-center py-8 ${textSecondary}`}>
                                            No records
                                        </div>
                                    )}
                                </div>

                                {/* Least Selling Products */}
                                <div className={`${bgCard} rounded-2xl p-6 transition-all duration-300`}>
                                    <h3 className={`font-semibold ${textPrimary} mb-4 flex items-center gap-2`}>
                                        <TrendingDown className="w-5 h-5 text-red-400" />
                                        Least Selling Products
                                    </h3>
                                    {leastProducts.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className={`text-left text-sm ${textSecondary} border-b ${borderColor}`}>
                                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Product</th>
                                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Qty Sold</th>
                                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {leastProducts.map((product, index) => (
                                                        <tr key={index} className={`border-b ${borderColor} last:border-0`}>
                                                            <td className={`py-3 ${textPrimary}`}>{product.name}</td>
                                                            <td className={`py-3 text-center ${textSecondary}`}>{product.qty}</td>
                                                            <td className={`py-3 text-right ${textSecondary}`}>{formatCurrency(product.amount)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className={`text-center py-8 ${textSecondary}`}>
                                            No records
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Revenue Contribution By Product */}
                            <div className={`${bgCard} rounded-2xl p-6 transition-all duration-300`}>
                                <h3 className={`font-semibold ${textPrimary} mb-4`}>Revenue Contribution By Product</h3>
                                {revenueContribution.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className={`text-left text-sm ${textSecondary} border-b ${borderColor}`}>
                                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Product</th>
                                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Qty Sold</th>
                                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Amount</th>
                                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">% Revenue</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {revenueContribution.map((product, index) => (
                                                    <tr key={index} className={`border-b ${borderColor} last:border-0`}>
                                                        <td className={`py-3 ${textPrimary}`}>{product.name}</td>
                                                        <td className={`py-3 text-center ${textSecondary}`}>{product.qty}</td>
                                                        <td className={`py-3 text-right font-semibold text-indigo-400`}>{formatCurrency(product.amount)}</td>
                                                        <td className={`py-3 text-right text-amber-400`}>{product.percentage}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className={`text-center py-8 ${textSecondary}`}>
                                        No records
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Staff Performance Tab */}
                    {activeTab === 'staff' && (
                        <div className={`${bgCard} rounded-2xl p-6 transition-all duration-300`}>
                            <h3 className={`font-semibold ${textPrimary} mb-4`}>Staff Sales Performance</h3>
                            {staffPerformance.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className={`text-left text-sm ${textSecondary} border-b ${borderColor}`}>
                                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Staff</th>
                                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Roles</th>
                                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Orders Created</th>
                                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Successful Orders</th>
                                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Revenue Generated</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {staffPerformance.map((staff, index) => (
                                                <tr key={index} className={`border-b ${borderColor} last:border-0`}>
                                                    <td className={`py-3 flex items-center gap-2 ${textPrimary}`}>
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                                                            {staff.name.charAt(0)}
                                                        </div>
                                                        {staff.name}
                                                    </td>
                                                    <td>
                                                        <span className={`px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-100'} ${textSecondary} text-xs`}>
                                                            {staff.role}
                                                        </span>
                                                    </td>
                                                    <td className={`py-3 text-center ${textSecondary}`}>{staff.ordersCreated}</td>
                                                    <td className={`py-3 text-center text-green-400`}>{staff.successfulOrders}</td>
                                                    <td className={`py-3 text-right font-semibold text-indigo-400`}>{formatCurrency(staff.revenue)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className={`text-center py-12 ${textSecondary}`}>
                                    <Users className={`w-16 h-16 mx-auto mb-4 ${textSecondary}/30`} />
                                    <p>No records</p>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

export default Analytics