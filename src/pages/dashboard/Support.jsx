// src/pages/dashboard/Support.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MessageSquare, HelpCircle, Mail, Phone, Clock, MoreVertical, CheckCircle, AlertCircle, XCircle, Send } from 'lucide-react'

const Support = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('All')
    const [message, setMessage] = useState('')

    const tickets = [
        { 
            id: 1, 
            subject: 'Payment gateway integration issue', 
            status: 'Open', 
            priority: 'High', 
            customer: 'Sarah Johnson',
            email: 'sarah@example.com',
            date: '2024-01-15',
            lastUpdate: '2 hours ago',
            messages: 3
        },
        { 
            id: 2, 
            subject: 'Need help with product import', 
            status: 'In Progress', 
            priority: 'Medium', 
            customer: 'Michael Chen',
            email: 'michael@example.com',
            date: '2024-01-14',
            lastUpdate: '1 day ago',
            messages: 5
        },
        { 
            id: 3, 
            subject: 'Shipping label not generating', 
            status: 'Resolved', 
            priority: 'Low', 
            customer: 'Emily Davis',
            email: 'emily@example.com',
            date: '2024-01-13',
            lastUpdate: '3 days ago',
            messages: 4
        },
        { 
            id: 4, 
            subject: 'Account login problems', 
            status: 'Open', 
            priority: 'High', 
            customer: 'James Wilson',
            email: 'james@example.com',
            date: '2024-01-12',
            lastUpdate: '4 hours ago',
            messages: 2
        },
        { 
            id: 5, 
            subject: 'How to set up tax rates', 
            status: 'Closed', 
            priority: 'Low', 
            customer: 'Lisa Brown',
            email: 'lisa@example.com',
            date: '2024-01-11',
            lastUpdate: '5 days ago',
            messages: 6
        },
    ]

    const statuses = ['All', 'Open', 'In Progress', 'Resolved', 'Closed']
    const statusColors = {
        'Open': 'bg-danger/20 text-danger border-danger/20',
        'In Progress': 'bg-amber-500/20 text-amber-400 border-amber-500/20',
        'Resolved': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/20',
        'Closed': 'bg-success/20 text-success border-success/20',
    }

    const priorityColors = {
        'High': 'bg-danger/20 text-danger',
        'Medium': 'bg-amber-500/20 text-amber-400',
        'Low': 'bg-[#1E293B] text-textSecondary',
    }

    const handleSendMessage = () => {
        if (message.trim()) {
            console.log('Sending message:', message)
            setMessage('')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Support</h1>
                    <p className="text-desc">Manage support tickets and help center</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary">
                        <HelpCircle className="w-4 h-4" />
                        Help Center
                    </button>
                    <button className="btn-primary">
                        <Plus className="w-4 h-4" />
                        New Ticket
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card p-4 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <MessageSquare className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <div className="font-medium">Live Chat</div>
                            <div className="text-sm text-textSecondary">Chat with support team</div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-success/20 text-success text-xs">Available</span>
                        </div>
                    </div>
                </div>
                <div className="card p-4 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Mail className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <div className="font-medium">Email Support</div>
                            <div className="text-sm text-textSecondary">support@nexuscommerce.com</div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs">Response in 24h</span>
                        </div>
                    </div>
                </div>
                <div className="card p-4 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                            <div className="font-medium">Phone Support</div>
                            <div className="text-sm text-textSecondary">+1 800 123 4567</div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs">Business Hours</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-4 text-center">
                    <div className="text-title text-danger">2</div>
                    <div className="text-sm text-textSecondary">Open Tickets</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-amber-400">1</div>
                    <div className="text-sm text-textSecondary">In Progress</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-indigo-400">1</div>
                    <div className="text-sm text-textSecondary">Resolved</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-success">1</div>
                    <div className="text-sm text-textSecondary">Closed</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                    <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full input-field pl-12"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="input-field w-40"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
                {tickets.map((ticket, index) => (
                    <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="card p-6 hover:border-indigo-500/50 transition-all duration-300"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="font-semibold">{ticket.subject}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[ticket.status]}`}>
                                        {ticket.status}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[ticket.priority]}`}>
                                        {ticket.priority}
                                    </span>
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-textSecondary">
                                    <span>From: {ticket.customer}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Mail className="w-3 h-3" />
                                        {ticket.email}
                                    </span>
                                    <span>•</span>
                                    <span>{ticket.date}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" />
                                        {ticket.messages} messages
                                    </span>
                                </div>
                                <div className="mt-1 text-xs text-textSecondary">
                                    Last update: {ticket.lastUpdate}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 text-sm hover:bg-indigo-500/20 transition-colors duration-200 flex items-center gap-1">
                                    <MessageSquare className="w-3 h-3" />
                                    Reply
                                </button>
                                <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200">
                                    <MoreVertical className="w-4 h-4 text-textSecondary" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Reply */}
            <div className="card p-6">
                <h3 className="font-semibold mb-4">Quick Reply</h3>
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your reply here..."
                        className="flex-1 input-field"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Support