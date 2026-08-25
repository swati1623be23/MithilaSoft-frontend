import React, { useEffect, useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity, AlertTriangle, BadgeCheck, BarChart3, CheckCircle2, CircleDollarSign, Clock3, Package, ShoppingCart, Truck, Users } from 'lucide-react'
import { dashboardAPI } from '../../services/api'

const formatCurrency = (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
}).format(Number(value || 0))

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(Number(value || 0))

const statusMeta = {
    pending: { label: 'Pending', icon: Clock3, className: 'text-amber-400' },
    processing: { label: 'Processing', icon: Activity, className: 'text-sky-400' },
    shipped: { label: 'Shipped', icon: Truck, className: 'text-violet-400' },
    delivered: { label: 'Delivered', icon: CheckCircle2, className: 'text-emerald-400' },
}

const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null)
    const [salesData, setSalesData] = useState([])
    const [recentOrders, setRecentOrders] = useState([])
    const [recentCustomers, setRecentCustomers] = useState([])
    const [topProducts, setTopProducts] = useState([])
    const [lowStockProducts, setLowStockProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [statsResponse, salesResponse, ordersResponse, customersResponse, productsResponse, lowStockResponse] = await Promise.all([
                    dashboardAPI.getStats(),
                    dashboardAPI.getSalesOverview('daily'),
                    dashboardAPI.getRecentOrders(6),
                    dashboardAPI.getRecentCustomers(5),
                    dashboardAPI.getTopProducts(5),
                    dashboardAPI.getLowStock(5),
                ])

                setStats(statsResponse?.data?.data || null)
                setSalesData(salesResponse?.data?.data || [])
                setRecentOrders(ordersResponse?.data?.data || [])
                setRecentCustomers(customersResponse?.data?.data || [])
                setTopProducts(productsResponse?.data?.data || [])
                setLowStockProducts(lowStockResponse?.data?.data || [])
            } catch (error) {
                console.error('Failed to load admin dashboard data', error)
            } finally {
                setLoading(false)
            }
        }

        loadDashboard()
    }, [])

    const orderStatusSummary = useMemo(() => {
        const byStatus = stats?.orders?.byStatus || []
        const statusMap = Object.fromEntries(byStatus.map((item) => [item._id, item.count]))

        return {
            pending: statusMap.pending || 0,
            processing: statusMap.processing || 0,
            shipped: statusMap.shipped || 0,
            delivered: statusMap.delivered || 0,
        }
    }, [stats])

    const metrics = useMemo(() => [
        {
            title: 'Today\'s Revenue',
            value: formatCurrency(stats?.revenue?.today),
            icon: CircleDollarSign,
            accent: 'from-emerald-500 to-cyan-500',
            helper: `${Number(stats?.revenue?.growth || 0).toFixed(1)}% vs yesterday`,
        },
        {
            title: 'Today\'s Orders',
            value: formatNumber(stats?.orders?.today),
            icon: ShoppingCart,
            accent: 'from-indigo-500 to-violet-500',
            helper: `${formatNumber(stats?.orders?.total || 0)} total orders`,
        },
        {
            title: 'Average Order Value',
            value: formatCurrency((stats?.revenue?.today || 0) / Math.max(stats?.orders?.today || 0, 1)),
            icon: BarChart3,
            accent: 'from-fuchsia-500 to-rose-500',
            helper: 'Based on today\'s activity',
        },
        {
            title: 'Pending Orders',
            value: formatNumber(stats?.orders?.pending || orderStatusSummary.pending),
            icon: Clock3,
            accent: 'from-amber-500 to-orange-500',
            helper: 'Awaiting action',
        },
    ], [orderStatusSummary.pending, stats])

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-400">Admin Dashboard</p>
                        <h1 className="mt-2 text-2xl font-semibold text-white">Welcome back, Administrator</h1>
                        <p className="mt-2 text-sm text-slate-400">Live store insights from your MongoDB-backed commerce data.</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                        <div className="flex items-center gap-2 font-medium">
                            <BadgeCheck className="h-4 w-4" />
                            {loading ? 'Loading live metrics...' : 'All systems online'}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => {
                    const Icon = metric.icon
                    return (
                        <div key={metric.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400">{metric.title}</p>
                                    <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                                </div>
                                <div className={`rounded-2xl bg-gradient-to-br ${metric.accent} p-3 text-white`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-slate-400">{metric.helper}</p>
                        </div>
                    )
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Object.entries(statusMeta).map(([key, item]) => {
                    const Icon = item.icon
                    const count = orderStatusSummary[key] || 0
                    return (
                        <div key={key} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400">{item.label}</p>
                                    <p className="mt-2 text-2xl font-semibold text-white">{formatNumber(count)}</p>
                                </div>
                                <div className={`rounded-2xl bg-slate-950/80 p-3 ${item.className}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CircleDollarSign className="h-5 w-5 text-emerald-400" />
                            <h2 className="text-lg font-semibold text-white">Revenue Chart</h2>
                        </div>
                        <span className="text-sm text-slate-400">Last 7 days</span>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip formatter={(value) => formatCurrency(value)} />
                                <Area type="monotone" dataKey="revenue" stroke="#22c55e" fillOpacity={1} fill="url(#revenueFill)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-indigo-400" />
                            <h2 className="text-lg font-semibold text-white">Orders Chart</h2>
                        </div>
                        <span className="text-sm text-slate-400">Daily trend</span>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip formatter={(value) => formatNumber(value)} />
                                <Line type="monotone" dataKey="orders" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
                    <div className="mb-4 flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5 text-indigo-400" />
                        <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
                    </div>
                    <div className="space-y-3">
                        {recentOrders.length === 0 ? (
                            <p className="text-sm text-slate-400">No recent orders yet.</p>
                        ) : recentOrders.map((order) => (
                            <div key={order._id || order.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3">
                                <div>
                                    <p className="text-sm font-medium text-white">{order.orderNumber}</p>
                                    <p className="text-xs text-slate-400">{order.customer?.firstName || order.customer?.name || 'Customer'} {order.customer?.lastName || ''}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-white">{formatCurrency(order.total)}</p>
                                    <p className="text-xs capitalize text-slate-400">{order.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
                    <div className="mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-cyan-400" />
                        <h2 className="text-lg font-semibold text-white">Latest Customers</h2>
                    </div>
                    <div className="space-y-3">
                        {recentCustomers.length === 0 ? (
                            <p className="text-sm text-slate-400">No customer activity reported yet.</p>
                        ) : recentCustomers.map((customer) => (
                            <div key={customer._id || customer.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3">
                                <div>
                                    <p className="text-sm font-medium text-white">{customer.firstName} {customer.lastName}</p>
                                    <p className="text-xs text-slate-400">{customer.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-white">{formatCurrency(customer.totalSpent || 0)}</p>
                                    <p className="text-xs text-slate-400">{customer.orderCount || 0} orders</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
                    <div className="mb-4 flex items-center gap-2">
                        <Package className="h-5 w-5 text-fuchsia-400" />
                        <h2 className="text-lg font-semibold text-white">Top Selling Products</h2>
                    </div>
                    <div className="space-y-3">
                        {topProducts.length === 0 ? (
                            <p className="text-sm text-slate-400">No sales activity recorded yet.</p>
                        ) : topProducts.map((product) => (
                            <div key={product._id || product.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3">
                                <div>
                                    <p className="text-sm font-medium text-white">{product.name}</p>
                                    <p className="text-xs text-slate-400">{formatNumber(product.totalSold || 0)} units sold</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-white">{formatCurrency(product.totalRevenue || 0)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
                    <div className="mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-400" />
                        <h2 className="text-lg font-semibold text-white">Low Stock Alerts</h2>
                    </div>
                    <div className="space-y-3">
                        {lowStockProducts.length === 0 ? (
                            <p className="text-sm text-slate-400">All products are comfortably stocked.</p>
                        ) : lowStockProducts.map((product) => (
                            <div key={product._id || product.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3">
                                <div>
                                    <p className="text-sm font-medium text-white">{product.name}</p>
                                    <p className="text-xs text-slate-400">Threshold {product.inventory?.lowStockThreshold || 0}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-amber-400">{product.inventory?.quantity || 0} left</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardPage
