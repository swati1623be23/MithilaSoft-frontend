
























// src/pages/dashboard/DashboardHome.jsx
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    TrendingDown,
    ShoppingBag,
    Users,
    Package,
    Clock,
    ArrowUpRight,
    Eye,
    Star,
    ShoppingCart,
    AlertCircle,
    Calendar,
    DollarSign,
    BarChart3,
    Activity,
    MessageSquare,
    Gift,
    Truck,
    CheckCircle,
    XCircle,
    Zap,
    Target,
    Watch,
    Award,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { dashboardAPI, analyticsAPI } from '../../services/api'
import { 
    LineChart, 
    Line, 
    AreaChart, 
    Area, 
    BarChart, 
    Bar, 
    PieChart, 
    Pie, 
    Cell, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer, 
    Legend 
} from 'recharts'

const DashboardHome = () => {
    const { user } = useAuth()
    const [currentTime, setCurrentTime] = useState(new Date())
    const [greeting, setGreeting] = useState('Good Morning')
    const [selectedPeriod, setSelectedPeriod] = useState('weekly')
    const [isLoading, setIsLoading] = useState(false)
    const [stats, setStats] = useState(null)
    const [salesOverview, setSalesOverview] = useState([])
    const [visitorOverview, setVisitorOverview] = useState([])
    const [topProductsState, setTopProductsState] = useState([])
    const [lowStockState, setLowStockState] = useState([])
    const [trafficSourcesState, setTrafficSourcesState] = useState([])
    const [dashboardError, setDashboardError] = useState('')
    const pollRef = useRef(null)

    // Get owner name (prefer actual user name over owner/store name)
    const ownerName = user?.name || user?.ownerName || 'User'

    // Get today's date
    const today = new Date()
    const dateString = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    // Update greeting based on time of day
    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting('Good Morning')
        else if (hour < 17) setGreeting('Good Afternoon')
        else setGreeting('Good Evening')
    }, [])

    // ============================================
    // REAL-TIME STATS DATA
    // ============================================

    // Today's Stats (derived from backend when available)
    const formatCurrencyIN = (v) => `₹ ${Number(v || 0).toLocaleString('en-IN')}`

    const todayStats = [
        { 
            label: 'Revenue', 
            value: stats ? formatCurrencyIN(stats.revenue?.today) : '0',
            change: stats ? `${Number(stats.revenue?.growth || 0).toFixed(1)}%` : '0%',
            trend: 'up',
            icon: DollarSign,
            color: 'indigo',
            bgColor: 'bg-indigo-500/10',
            borderColor: 'border-indigo-500/20'
        },
        { 
            label: 'Orders', 
            value: stats ? String(stats.orders?.today || 0) : '0', 
            change: '0%',
            trend: 'up',
            icon: ShoppingBag,
            color: 'cyan',
            bgColor: 'bg-cyan-500/10',
            borderColor: 'border-cyan-500/20'
        },
        { 
            label: 'Average Order Value', 
            value: stats ? formatCurrencyIN((stats.revenue?.today || 0) / Math.max(stats.orders?.today || 1, 1)) : '0', 
            change: '0%',
            trend: 'up',
            icon: BarChart3,
            color: 'amber',
            bgColor: 'bg-amber-500/10',
            borderColor: 'border-amber-500/20'
        },
        { 
            label: 'Visitors', 
            value: visitorOverview && visitorOverview.length ? String(Math.round(visitorOverview.reduce((s, d) => s + (d.visitors || 0), 0) / visitorOverview.length)) : '0', 
            change: '0%',
            trend: 'up',
            icon: Users,
            color: 'success',
            bgColor: 'bg-success/10',
            borderColor: 'border-success/20'
        },
    ]

    // Order Pipeline (derive from stats.byStatus)
    const orderStatusMap = Object.fromEntries((stats?.orders?.byStatus || []).map((s) => [s._id, s.count]))
    const orderPipeline = [
        { status: 'New', count: orderStatusMap.new || orderStatusMap.newOrder || 0, color: 'bg-indigo-500', icon: Zap },
        { status: 'Pending', count: orderStatusMap.pending || 0, color: 'bg-amber-500', icon: Clock },
        { status: 'Processing', count: orderStatusMap.processing || 0, color: 'bg-cyan-500', icon: Package },
        { status: 'Shipped', count: orderStatusMap.shipped || 0, color: 'bg-blue-500', icon: Truck },
        { status: 'Delivered', count: orderStatusMap.delivered || 0, color: 'bg-success', icon: CheckCircle },
    ]

    const chartPlaceholder = (message) => (
        <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border text-sm text-textSecondary">
            {message}
        </div>
    )

    // Daily Revenue Breakdown (from salesOverview)
    const dailyRevenue = (salesOverview && salesOverview.length) ? salesOverview.slice(0, 7).map((d) => ({ day: d.label || d.day || '', revenue: d.revenue || 0, orders: d.orders || 0 })) : []

    // Monthly Performance Trends (use salesOverview when appropriate)
    const monthlyTrends = (salesOverview && salesOverview.length) ? salesOverview.map((d) => ({ month: d.label, revenue: d.revenue || 0, orders: d.orders || 0, customers: d.customers || 0 })) : []

    // Top Selling Products (from API)
    const topProducts = (topProductsState && topProductsState.length) ? topProductsState.map((p) => ({ name: p.name || 'Product', sales: p.totalSold || 0, revenue: p.totalRevenue || 0, growth: p.growth || '' })) : []

    // Low Stock Alerts (from API)
    const lowStockItems = (lowStockState && lowStockState.length) ? lowStockState.map((p) => {
        const qty = p.inventory?.quantity ?? 0
        const thresh = p.inventory?.lowStockThreshold ?? 0
        return { name: p.name || 'Product', stock: qty, threshold: thresh, status: qty <= Math.max(5, Math.floor(thresh * 0.5)) ? 'Critical' : 'Low' }
    }) : []

    const COLORS = ['#4F46E5', '#06B6D4', '#F59E0B', '#22C55E', '#EF4444']

    // Traffic Sources (from API)
    const trafficSources = (trafficSourcesState && trafficSourcesState.length) ? trafficSourcesState.map((s, i) => ({ name: s.name, value: s.value, color: s.color || COLORS[i % COLORS.length] })) : []

    // Visitor Stats (from API)
    const visitorStats = (visitorOverview && visitorOverview.length) ? visitorOverview.map((d) => ({ day: d.day, visitors: d.visitors || 0, newCustomers: d.newCustomers || 0, returning: d.returning || 0 })) : [
        { day: 'Mon', visitors: 1200, newCustomers: 180, returning: 220 },
        { day: 'Tue', visitors: 1500, newCustomers: 220, returning: 280 },
        { day: 'Wed', visitors: 1800, newCustomers: 280, returning: 340 },
        { day: 'Thu', visitors: 1600, newCustomers: 240, returning: 300 },
        { day: 'Fri', visitors: 2000, newCustomers: 310, returning: 380 },
        { day: 'Sat', visitors: 1400, newCustomers: 200, returning: 260 },
        { day: 'Sun', visitors: 1000, newCustomers: 150, returning: 190 },
    ]

    // Polling: fetch dashboard data and keep it live
    useEffect(() => {
        const POLL_INTERVAL = 10000 // 10s
        let mounted = true

        const fetchAll = async () => {
            try {
                setIsLoading(true)
                setDashboardError('')
                        const [statsRes, salesRes, visitorRes, topRes, lowRes, trafficRes] = await Promise.all([
                    dashboardAPI.getStats(),
                    dashboardAPI.getSalesOverview(selectedPeriod),
                    dashboardAPI.getVisitorOverview(),
                    dashboardAPI.getTopProducts(5),
                    dashboardAPI.getLowStock(5),
                    dashboardAPI.getTrafficSources(),
                ])

                if (!mounted) return

                setStats(statsRes?.data?.data || null)
                setSalesOverview(salesRes?.data?.data || [])
                setVisitorOverview(visitorRes?.data?.data || [])
                setTopProductsState(topRes?.data?.data || [])
                setLowStockState(lowRes?.data?.data || [])
                setTrafficSourcesState(trafficRes?.data?.data || [])
            } catch (err) {
                console.error('Failed to fetch dashboard data', err)
                if (mounted) setDashboardError('Unable to refresh dashboard data. Showing the latest available information.')
            } finally {
                if (mounted) setIsLoading(false)
            }
        }

        // initial
        fetchAll()

        // clear any existing interval
        if (pollRef.current) clearInterval(pollRef.current)
        pollRef.current = setInterval(fetchAll, POLL_INTERVAL)

        return () => {
            mounted = false
            if (pollRef.current) clearInterval(pollRef.current)
            pollRef.current = null
        }
    }, [selectedPeriod])

    return (
        <div className="space-y-6">
            {dashboardError && <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-600 dark:text-amber-300"><span>{dashboardError}</span><button type="button" onClick={() => setDashboardError('')} className="font-semibold">Dismiss</button></div>}
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-textPrimary">
                        {greeting}, {ownerName} 👋
                    </h1>
                    <p className="text-desc">
                        Here's what's happening with your store today
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-card rounded-2xl p-1 border border-border">
                        <button 
                            onClick={() => setSelectedPeriod('daily')}
                            className={`px-3 py-1.5 rounded-xl text-xs transition-all duration-200 ${
                                selectedPeriod === 'daily' 
                                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white' 
                                    : 'text-textSecondary hover:text-textPrimary'
                            }`}
                        >
                            Daily
                        </button>
                        <button 
                            onClick={() => setSelectedPeriod('weekly')}
                            className={`px-3 py-1.5 rounded-xl text-xs transition-all duration-200 ${
                                selectedPeriod === 'weekly' 
                                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white' 
                                    : 'text-textSecondary hover:text-textPrimary'
                            }`}
                        >
                            Weekly
                        </button>
                        <button 
                            onClick={() => setSelectedPeriod('monthly')}
                            className={`px-3 py-1.5 rounded-xl text-xs transition-all duration-200 ${
                                selectedPeriod === 'monthly' 
                                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white' 
                                    : 'text-textSecondary hover:text-textPrimary'
                            }`}
                        >
                            Monthly
                        </button>
                    </div>
                    <button className="btn-secondary">
                        <Calendar className="w-4 h-4" />
                        {dateString}
                    </button>
                </div>
            </div>

            {/* Today's Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {todayStats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`card p-6 hover:${stat.borderColor} transition-all duration-300 border ${stat.borderColor}`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-textSecondary">{stat.label}</p>
                                <h3 className="text-title mt-1 text-textPrimary">{stat.value}</h3>
                                <div className={`flex items-center gap-1 mt-2 text-sm ${
                                    stat.trend === 'up' ? 'text-success' : 'text-danger'
                                }`}>
                                    {stat.trend === 'up' ? (
                                        <TrendingUp className="w-4 h-4" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4" />
                                    )}
                                    {stat.change}
                                </div>
                            </div>
                            <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Order Pipeline & Daily Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Pipeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="card p-6 lg:col-span-1"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-textPrimary">Order Pipeline</h3>
                            <p className="text-sm text-textSecondary">Real-time order status</p>
                        </div>
                        <ShoppingCart className="w-5 h-5 text-textSecondary" />
                    </div>
                    <div className="space-y-3">
                        {orderPipeline.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <div 
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border hover:border-indigo-500/30 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-xl ${item.color}/20 flex items-center justify-center`}>
                                            <Icon className={`w-4 h-4 ${item.color}`} />
                                        </div>
                                        <span className="text-sm text-textSecondary">{item.status}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-bold text-textPrimary">{item.count}</span>
                                        <div className="w-16 h-1.5 rounded-full bg-[#1E293B] overflow-hidden">
                                            <div 
                                                className={`h-full ${item.color} rounded-full`}
                                                style={{ width: `${(item.count / 45) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Daily Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="card p-6 lg:col-span-2"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-textPrimary">Daily Revenue</h3>
                            <p className="text-sm text-textSecondary">Revenue & orders breakdown</p>
                        </div>
                        <TrendingUp className="w-5 h-5 text-textSecondary" />
                    </div>
                        <div className="h-64">
                        {isLoading && !dailyRevenue.length ? chartPlaceholder('Loading revenue...') : dailyRevenue.length ? <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyRevenue}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis yAxisId="left" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis yAxisId="right" orientation="right" stroke="var(--text-muted)" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        padding: '12px',
                                    }}
                                    labelStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Legend />
                                <Bar yAxisId="left" dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Revenue (₹)" />
                                <Bar yAxisId="right" dataKey="orders" fill="#06B6D4" radius={[4, 4, 0, 0]} name="Orders" />
                            </BarChart>
                        </ResponsiveContainer> : chartPlaceholder('No revenue data yet.')}
                    </div>
                </motion.div>
            </div>

            {/* Monthly Performance & Visitor Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Performance Trends */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="card p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-textPrimary">Monthly Performance</h3>
                            <p className="text-sm text-textSecondary">Revenue & customer growth</p>
                        </div>
                        <Award className="w-5 h-5 text-textSecondary" />
                    </div>
                    <div className="h-64">
                        {monthlyTrends.length ? <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyTrends}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        padding: '12px',
                                    }}
                                    labelStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.2} name="Revenue (₹)" />
                                <Area type="monotone" dataKey="customers" stackId="2" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.2} name="Customers" />
                            </AreaChart>
                        </ResponsiveContainer> : chartPlaceholder('No monthly data yet.')}
                    </div>
                </motion.div>

                {/* Visitor Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="card p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-textPrimary">Visitor Traffic</h3>
                            <p className="text-sm text-textSecondary">Daily visitor analytics</p>
                        </div>
                        <Eye className="w-5 h-5 text-textSecondary" />
                    </div>
                    <div className="h-64">
                        {visitorStats.length ? <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={visitorStats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        padding: '12px',
                                    }}
                                    labelStyle={{ color: 'var(--text-primary)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="visitors" stroke="#4F46E5" strokeWidth={2} dot={{ fill: '#4F46E5' }} name="Visitors" />
                                <Line type="monotone" dataKey="newCustomers" stroke="#06B6D4" strokeWidth={2} dot={{ fill: '#06B6D4' }} name="New Customers" />
                                <Line type="monotone" dataKey="returning" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B' }} name="Returning" />
                            </LineChart>
                        </ResponsiveContainer> : chartPlaceholder('No visitor data yet.')}
                    </div>
                </motion.div>
            </div>

            {/* Top Products & Low Stock Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Selling Products */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="card p-6 lg:col-span-2"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-textPrimary">Top Selling Products</h3>
                            <p className="text-sm text-textSecondary">Best performing products</p>
                        </div>
                        <Star className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-table-header border-b border-border">
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Product</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-center">Sales</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Revenue</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map((product, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="py-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                    index === 0 ? 'bg-amber-500/20 text-amber-400' :
                                                    index === 1 ? 'bg-gray-400/20 text-gray-400' :
                                                    index === 2 ? 'bg-amber-600/20 text-amber-600' :
                                                    'bg-[#1E293B] text-textSecondary'
                                                }`}>
                                                    #{index + 1}
                                                </div>
                                                <span className="text-table-body">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-center text-sm">{product.sales}</td>
                                        <td className="py-3 text-right text-sm font-semibold text-indigo-400">₹{product.revenue.toLocaleString()}</td>
                                        <td className="py-3 text-right text-sm text-success">{product.growth}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Low Stock Alerts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="card p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-textPrimary">Low Stock Alerts</h3>
                            <p className="text-sm text-textSecondary">Products below threshold</p>
                        </div>
                        <AlertCircle className="w-5 h-5 text-danger" />
                    </div>
                    <div className="space-y-3">
                        {lowStockItems.map((item, index) => (
                            <div 
                                key={index}
                                className="p-3 rounded-2xl bg-background border border-border hover:border-danger/30 transition-all duration-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-table-body">{item.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-textSecondary">Stock: {item.stock}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                item.status === 'Critical' 
                                                    ? 'bg-danger/20 text-danger' 
                                                    : 'bg-amber-500/20 text-amber-400'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-16 h-1.5 rounded-full bg-[#1E293B] overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full ${
                                                item.status === 'Critical' ? 'bg-danger' : 'bg-amber-500'
                                            }`}
                                            style={{ width: `${(item.stock / item.threshold) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 rounded-xl bg-[#1E293B] text-sm text-textSecondary hover:text-textPrimary hover:bg-[#2A3A4B] transition-all duration-200">
                        View All Inventory
                    </button>
                </motion.div>
            </div>

            {/* Traffic Sources */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="card p-6"
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-semibold text-textPrimary">Traffic Sources</h3>
                        <p className="text-sm text-textSecondary">Where your visitors come from</p>
                    </div>
                    <Target className="w-5 h-5 text-textSecondary" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={trafficSources}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {trafficSources.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '12px',
                                        padding: '12px',
                                    }}
                                    labelStyle={{ color: 'var(--text-primary)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center space-y-3">
                        {trafficSources.map((source, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[index] }} />
                                    <span className="text-sm text-textSecondary">{source.name}</span>
                                </div>
                                <span className="text-table-body font-semibold">{source.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default DashboardHome




