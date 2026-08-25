// src/pages/dashboard/Reports.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Calendar, BarChart3, TrendingUp, Users, ShoppingBag, DollarSign, FileText, Printer, Filter } from 'lucide-react'

const Reports = () => {
    const [reportType, setReportType] = useState('sales')
    const [dateRange, setDateRange] = useState('this_month')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const reportTypes = [
        { id: 'sales', label: 'Sales Report', icon: ShoppingBag, color: 'indigo' },
        { id: 'revenue', label: 'Revenue Report', icon: DollarSign, color: 'cyan' },
        { id: 'customers', label: 'Customer Report', icon: Users, color: 'amber' },
        { id: 'products', label: 'Product Report', icon: BarChart3, color: 'success' },
        { id: 'orders', label: 'Order Report', icon: FileText, color: 'purple' },
    ]

    const generateReport = () => {
        console.log('Generating report:', reportType, dateRange, { startDate, endDate })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Reports</h1>
                    <p className="text-desc">Generate and export business reports</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary">
                        <Calendar className="w-4 h-4" />
                        Schedule Report
                    </button>
                    <button
                        onClick={generateReport}
                        className="btn-primary"
                    >
                        <Download className="w-4 h-4" />
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Report Type Selection */}
            <div className="flex flex-wrap gap-2">
                {reportTypes.map((type) => {
                    const Icon = type.icon
                    return (
                        <button
                            key={type.id}
                            onClick={() => setReportType(type.id)}
                            className={`px-4 py-2 rounded-2xl text-sm transition-all duration-200 flex items-center gap-2 ${
                                reportType === type.id
                                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                                    : 'bg-card border border-border text-textSecondary hover:border-indigo-500/50'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {type.label}
                        </button>
                    )
                })}
            </div>

            {/* Date Range */}
            <div className="flex flex-col md:flex-row gap-4">
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="input-field md:w-48"
                >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="this_week">This Week</option>
                    <option value="last_week">Last Week</option>
                    <option value="this_month">This Month</option>
                    <option value="last_month">Last Month</option>
                    <option value="this_quarter">This Quarter</option>
                    <option value="this_year">This Year</option>
                    <option value="custom">Custom Range</option>
                </select>
                {dateRange === 'custom' && (
                    <div className="flex gap-2">
                        <input 
                            type="date" 
                            className="input-field" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className="flex items-center text-textSecondary">to</span>
                        <input 
                            type="date" 
                            className="input-field"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                )}
            </div>

            {/* Report Preview */}
            <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Report Preview</h3>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200 flex items-center gap-1">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200 flex items-center gap-1">
                            <Printer className="w-4 h-4" />
                            Print
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Report Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 rounded-2xl bg-background border border-border">
                            <div className="text-sm text-textSecondary">Total Revenue</div>
                            <div className="text-title text-indigo-400">$48,291</div>
                            <div className="text-xs text-success">+12.5% vs last period</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-background border border-border">
                            <div className="text-sm text-textSecondary">Total Orders</div>
                            <div className="text-title text-cyan-400">1,284</div>
                            <div className="text-xs text-success">+8.2% vs last period</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-background border border-border">
                            <div className="text-sm text-textSecondary">Average Order Value</div>
                            <div className="text-title text-amber-400">$37.61</div>
                            <div className="text-xs text-success">+4.1% vs last period</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-background border border-border">
                            <div className="text-sm text-textSecondary">Conversion Rate</div>
                            <div className="text-title text-success">3.2%</div>
                            <div className="text-xs text-success">+0.4% vs last period</div>
                        </div>
                    </div>

                    {/* Report Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-table-header border-b border-border">
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Metric</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Current Period</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Previous Period</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Change</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { metric: 'Revenue', current: '$48,291', previous: '$42,580', change: '+13.4%', trend: 'up' },
                                    { metric: 'Orders', current: '1,284', previous: '1,186', change: '+8.3%', trend: 'up' },
                                    { metric: 'Customers', current: '3,891', previous: '3,374', change: '+15.3%', trend: 'up' },
                                    { metric: 'Products Sold', current: '2,847', previous: '2,543', change: '+12.0%', trend: 'up' },
                                    { metric: 'Refunds', current: '$1,245', previous: '$890', change: '+39.9%', trend: 'down' },
                                ].map((row, index) => (
                                    <motion.tr
                                        key={row.metric}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="py-3 font-medium">{row.metric}</td>
                                        <td className="py-3">{row.current}</td>
                                        <td className="py-3">{row.previous}</td>
                                        <td className={`py-3 font-semibold ${
                                            row.trend === 'up' ? 'text-success' : 'text-danger'
                                        }`}>
                                            {row.change}
                                        </td>
                                        <td className="py-3">
                                            <span className={`inline-block w-8 h-2 rounded-full ${
                                                row.trend === 'up' ? 'bg-success' : 'bg-danger'
                                            }`} />
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Export Options */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                        <button className="btn-secondary">
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                        <button className="btn-secondary">
                            <Download className="w-4 h-4" />
                            Download CSV
                        </button>
                        <button className="btn-secondary">
                            <Download className="w-4 h-4" />
                            Download Excel
                        </button>
                        <button className="btn-primary">
                            <Download className="w-4 h-4" />
                            Download All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports