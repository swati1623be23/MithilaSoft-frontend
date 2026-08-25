// // src/pages/dashboard/Issues.jsx
// import React, { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import {
//     Plus,
//     Search,
//     AlertCircle,
//     AlertTriangle,
//     Clock,
//     MoreVertical,
//     User,
//     Calendar,
//     Pencil,
//     Trash2,
//     ChevronLeft,
//     ChevronRight,
// } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { issueAPI, customerAPI, orderAPI } from '../../services/api'

// const statuses = ['All', 'Open', 'In Progress', 'Resolved', 'Closed']
// const priorities = ['All', 'Low', 'Medium', 'High']

// const issueSchema = z.object({
//     title: z.string().min(2, 'Title is required'),
//     description: z.string().min(10, 'Description must be at least 10 characters'),
//     priority: z.enum(['Low', 'Medium', 'High']),
//     status: z.enum(['Open', 'In Progress', 'Resolved', 'Closed']),
//     assignedTo: z.string().optional().or(z.literal('')),
//     orderId: z.string().optional().or(z.literal('')),
//     customerId: z.string().optional().or(z.literal('')),
// })

// const getStatusBadge = (status) => {
//     const mapping = {
//         Open: 'bg-danger/20 text-danger',
//         'In Progress': 'bg-amber-500/20 text-amber-400',
//         Resolved: 'bg-success/20 text-success',
//         Closed: 'bg-[#1E293B] text-textSecondary',
//     }
//     return mapping[status] || 'bg-[#1E293B] text-textSecondary'
// }

// const getPriorityIcon = (priority) => {
//     if (priority === 'High') return <AlertCircle className="w-4 h-4 text-danger" />
//     if (priority === 'Medium') return <AlertTriangle className="w-4 h-4 text-amber-400" />
//     return <Clock className="w-4 h-4 text-textSecondary" />
// }

// const getPriorityColor = (priority) => {
//     if (priority === 'High') return 'text-danger'
//     if (priority === 'Medium') return 'text-amber-400'
//     return 'text-textSecondary'
// }

// const Issues = () => {
//     const [issues, setIssues] = useState([])
//     const [statusFilter, setStatusFilter] = useState('All')
//     const [priorityFilter, setPriorityFilter] = useState('All')
//     const [searchQuery, setSearchQuery] = useState('')
//     const [page, setPage] = useState(1)
//     const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 })
//     const [statusCounts, setStatusCounts] = useState({})
//     const [loading, setLoading] = useState(false)
//     const [showFormModal, setShowFormModal] = useState(false)
//     const [showDetailsModal, setShowDetailsModal] = useState(false)
//     const [editingIssue, setEditingIssue] = useState(null)
//     const [selectedIssue, setSelectedIssue] = useState(null)
//     const [customers, setCustomers] = useState([])
//     const [orders, setOrders] = useState([])

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors, isSubmitting },
//     } = useForm({
//         resolver: zodResolver(issueSchema),
//         defaultValues: {
//             title: '',
//             description: '',
//             priority: 'Low',
//             status: 'Open',
//             assignedTo: '',
//             customerId: '',
//             orderId: '',
//         },
//     })

//     const fetchIssues = async (nextPage = 1) => {
//         try {
//             setLoading(true)
//             const res = await issueAPI.getAll({
//                 page: nextPage,
//                 limit: 10,
//                 search: searchQuery || undefined,
//                 status: statusFilter !== 'All' ? statusFilter : undefined,
//                 priority: priorityFilter !== 'All' ? priorityFilter : undefined,
//             })
//             setIssues(res.data.issues || [])
//             setPagination(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 })
//             setStatusCounts(res.data.statusCounts || {})
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Unable to load issues')
//         } finally {
//             setLoading(false)
//         }
//     }

//     const fetchCustomers = async () => {
//         try {
//             const res = await customerAPI.getAll({ page: 1, limit: 100 })
//             setCustomers(res.data.customers || [])
//         } catch (error) {
//             toast.error('Unable to load customers')
//         }
//     }

//     const fetchOrders = async () => {
//         try {
//             const res = await orderAPI.getAll({ page: 1, limit: 100 })
//             setOrders(res.data.orders || [])
//         } catch (error) {
//             toast.error('Unable to load orders')
//         }
//     }

//     useEffect(() => {
//         fetchIssues(page)
//     }, [page, statusFilter, priorityFilter, searchQuery])

//     useEffect(() => {
//         fetchCustomers()
//         fetchOrders()
//     }, [])

//     const openCreateModal = () => {
//         setEditingIssue(null)
//         reset({ title: '', description: '', priority: 'Low', status: 'Open', assignedTo: '', customerId: '', orderId: '' })
//         setShowFormModal(true)
//     }

//     const openEditModal = (issue) => {
//         setEditingIssue(issue)
//         reset({
//             title: issue.title,
//             description: issue.description,
//             priority: issue.priority,
//             status: issue.status,
//             assignedTo: issue.assignedTo || '',
//             customerId: issue.customerId || '',
//             orderId: issue.orderId || '',
//         })
//         setShowFormModal(true)
//     }

//     const openDetailsModalHandler = (issue) => {
//         setSelectedIssue(issue)
//         setShowDetailsModal(true)
//     }

//     const onSubmit = async (values) => {
//         try {
//             if (editingIssue) {
//                 await issueAPI.update(editingIssue.id, values)
//                 toast.success('Issue updated successfully')
//             } else {
//                 await issueAPI.create(values)
//                 toast.success('Issue created successfully')
//             }
//             setShowFormModal(false)
//             fetchIssues(page)
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Unable to save issue')
//         }
//     }

//     const handleDelete = async (issue) => {
//         const confirmed = window.confirm('Delete this issue?')
//         if (!confirmed) return
//         try {
//             await issueAPI.delete(issue.id)
//             toast.success('Issue deleted successfully')
//             const nextPage = page > 1 && issues.length === 1 ? page - 1 : page
//             setPage(nextPage)
//             fetchIssues(nextPage)
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Unable to delete issue')
//         }
//     }

//     return (
//         <div className="space-y-6">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Issues</h1>
//                     <p className="text-desc">Track and manage support issues</p>
//                 </div>
//                 <button
//                     type="button"
//                     onClick={openCreateModal}
//                     className="btn-primary"
//                 >
//                     <Plus className="w-4 h-4" />
//                     New Issue
//                 </button>
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//                 {['Open', 'In Progress', 'Resolved', 'Closed'].map((label) => (
//                     <div key={label} className="card p-4 text-center">
//                         <div className="text-title">{statusCounts[label] || 0}</div>
//                         <div className="text-sm text-textSecondary">{label}</div>
//                     </div>
//                 ))}
//             </div>

//             <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1 relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
//                     <input
//                         type="text"
//                         placeholder="Search issues..."
//                         value={searchQuery}
//                         onChange={(e) => {
//                             setSearchQuery(e.target.value)
//                             setPage(1)
//                         }}
//                         className="w-full input-field pl-12"
//                     />
//                 </div>
//                 <select
//                     value={statusFilter}
//                     onChange={(e) => {
//                         setStatusFilter(e.target.value)
//                         setPage(1)
//                     }}
//                     className="input-field w-40"
//                 >
//                     {statuses.map((status) => (
//                         <option key={status} value={status}>{status}</option>
//                     ))}
//                 </select>
//                 <select
//                     value={priorityFilter}
//                     onChange={(e) => {
//                         setPriorityFilter(e.target.value)
//                         setPage(1)
//                     }}
//                     className="input-field w-40"
//                 >
//                     {priorities.map((priority) => (
//                         <option key={priority} value={priority}>{priority}</option>
//                     ))}
//                 </select>
//             </div>

//             <div className="space-y-4">
//                 {loading ? (
//                     <div className="card p-6 text-center text-textSecondary">Loading issues...</div>
//                 ) : issues.length === 0 ? (
//                     <div className="card p-6 text-center text-textSecondary">No issues found.</div>
//                 ) : (
//                     issues.map((issue, index) => (
//                         <motion.div
//                             key={issue.id}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3, delay: index * 0.05 }}
//                             className="card p-6 hover:border-indigo-500/50 transition-all duration-300"
//                         >
//                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                                 <div className="flex-1">
//                                     <div className="flex flex-wrap items-center gap-3">
//                                         <span className={getPriorityColor(issue.priority)}>
//                                             {getPriorityIcon(issue.priority)}
//                                         </span>
//                                         <h3 className="font-semibold">{issue.title}</h3>
//                                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(issue.status)}`}>
//                                             {issue.status}
//                                         </span>
//                                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                                             issue.priority === 'High' ? 'bg-danger/20 text-danger' :
//                                             issue.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
//                                             'bg-[#1E293B] text-textSecondary'
//                                         }`}>
//                                             {issue.priority}
//                                         </span>
//                                     </div>
//                                     <div className="mt-3 grid gap-2 text-sm text-textSecondary md:grid-cols-2">
//                                         <div className="flex items-center gap-2">
//                                             <User className="w-4 h-4" />
//                                             {issue.assignedTo || 'Unassigned'}
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Calendar className="w-4 h-4" />
//                                             {new Date(issue.createdAt).toLocaleDateString()}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <button
//                                         type="button"
//                                         onClick={() => openDetailsModalHandler(issue)}
//                                         className="px-3 py-2 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         View Details
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => openEditModal(issue)}
//                                         className="px-3 py-2 rounded-2xl bg-indigo-500/10 text-indigo-400 text-sm hover:bg-indigo-500/20 transition-all duration-200"
//                                     >
//                                         <Pencil className="w-4 h-4" />
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={() => handleDelete(issue)}
//                                         className="px-3 py-2 rounded-2xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-all duration-200"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))
//                 )}
//             </div>

//             {pagination.pages > 1 && (
//                 <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
//                     <p className="text-sm text-textSecondary">Page {pagination.page} of {pagination.pages}</p>
//                     <div className="flex items-center gap-2">
//                         <button
//                             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//                             disabled={page === 1}
//                             className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-colors duration-200 disabled:opacity-50"
//                         >
//                             <ChevronLeft className="w-4 h-4" />
//                         </button>
//                         <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm">
//                             {page}
//                         </button>
//                         <button
//                             onClick={() => setPage((prev) => Math.min(prev + 1, pagination.pages))}
//                             disabled={page >= pagination.pages}
//                             className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-colors duration-200 disabled:opacity-50"
//                         >
//                             <ChevronRight className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {showFormModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//                     <div className="w-full max-w-3xl rounded-3xl border border-border bg-[#020617] p-6 shadow-2xl">
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                             <div>
//                                 <h2 className="text-xl font-semibold">{editingIssue ? 'Edit Issue' : 'Create Issue'}</h2>
//                                 <p className="text-sm text-textSecondary mt-1">Record issue details and track resolution status.</p>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowFormModal(false)}
//                                 className="rounded-2xl border border-border px-4 py-2 text-sm text-textSecondary hover:border-indigo-500/50"
//                             >
//                                 Close
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
//                             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                                 <div>
//                                     <label className="text-sm text-textSecondary">Title</label>
//                                     <input type="text" {...register('title')} className="w-full input-field mt-2" />
//                                     {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
//                                 </div>
//                                 <div>
//                                     <label className="text-sm text-textSecondary">Status</label>
//                                     <select {...register('status')} className="w-full input-field mt-2">
//                                         {statuses.map((status) => (
//                                             <option key={status} value={status}>{status}</option>
//                                         ))}
//                                     </select>
//                                     {errors.status && <p className="text-xs text-danger mt-1">{errors.status.message}</p>}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="text-sm text-textSecondary">Description</label>
//                                 <textarea {...register('description')} className="w-full input-field mt-2 min-h-[120px]" />
//                                 {errors.description && <p className="text-xs text-danger mt-1">{errors.description.message}</p>}
//                             </div>

//                             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                                 <div>
//                                     <label className="text-sm text-textSecondary">Priority</label>
//                                     <select {...register('priority')} className="w-full input-field mt-2">
//                                         {priorities.slice(1).map((priority) => (
//                                             <option key={priority} value={priority}>{priority}</option>
//                                         ))}
//                                     </select>
//                                     {errors.priority && <p className="text-xs text-danger mt-1">{errors.priority.message}</p>}
//                                 </div>
//                                 <div>
//                                     <label className="text-sm text-textSecondary">Assigned Staff</label>
//                                     <input type="text" {...register('assignedTo')} className="w-full input-field mt-2" placeholder="Name or email" />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                                 <div>
//                                     <label className="text-sm text-textSecondary">Customer</label>
//                                     <select {...register('customerId')} className="w-full input-field mt-2">
//                                         <option value="">Select customer</option>
//                                         {customers.map((customer) => (
//                                             <option key={customer._id} value={customer._id}>
//                                                 {customer.firstName} {customer.lastName} ({customer.email})
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="text-sm text-textSecondary">Order</label>
//                                     <select {...register('orderId')} className="w-full input-field mt-2">
//                                         <option value="">Select order</option>
//                                         {orders.map((order) => (
//                                             <option key={order._id} value={order._id}>{order.orderNumber || order._id}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="flex flex-wrap gap-3 justify-end pt-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowFormModal(false)}
//                                     className="px-4 py-2 rounded-2xl border border-border text-sm text-textSecondary hover:border-indigo-500/50"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={isSubmitting}
//                                     className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm text-white hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-50"
//                                 >
//                                     {isSubmitting ? 'Saving...' : editingIssue ? 'Update Issue' : 'Create Issue'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {showDetailsModal && selectedIssue && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//                     <div className="w-full max-w-3xl rounded-3xl border border-border bg-[#020617] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                             <div>
//                                 <h2 className="text-xl font-semibold">Issue Details</h2>
//                                 <p className="text-sm text-textSecondary mt-1">Review issue history and linked order/customer details.</p>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowDetailsModal(false)}
//                                 className="rounded-2xl border border-border px-4 py-2 text-sm text-textSecondary hover:border-indigo-500/50"
//                             >
//                                 Close
//                             </button>
//                         </div>

//                         <div className="mt-6 grid gap-4 md:grid-cols-2">
//                             <div className="rounded-3xl border border-border bg-background p-4">
//                                 <p className="text-sm text-textSecondary">Title</p>
//                                 <p className="font-medium mt-2">{selectedIssue.title}</p>
//                             </div>
//                             <div className="rounded-3xl border border-border bg-background p-4">
//                                 <p className="text-sm text-textSecondary">Status</p>
//                                 <span className={`mt-2 inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedIssue.status)}`}>
//                                     {selectedIssue.status}
//                                 </span>
//                             </div>
//                             <div className="rounded-3xl border border-border bg-background p-4">
//                                 <p className="text-sm text-textSecondary">Priority</p>
//                                 <p className="font-medium mt-2">{selectedIssue.priority}</p>
//                             </div>
//                             <div className="rounded-3xl border border-border bg-background p-4">
//                                 <p className="text-sm text-textSecondary">Assigned To</p>
//                                 <p className="font-medium mt-2">{selectedIssue.assignedTo || 'Unassigned'}</p>
//                             </div>
//                         </div>

//                         <div className="mt-6 rounded-3xl border border-border bg-background p-4">
//                             <p className="text-sm text-textSecondary">Description</p>
//                             <p className="mt-3 text-sm leading-6">{selectedIssue.description}</p>
//                         </div>

//                         <div className="mt-6 grid gap-4 md:grid-cols-2">
//                             <div className="rounded-3xl border border-border bg-background p-4">
//                                 <p className="text-sm text-textSecondary">Customer</p>
//                                 <p className="font-medium mt-2">{selectedIssue.customerId || 'Not linked'}</p>
//                             </div>
//                             <div className="rounded-3xl border border-border bg-background p-4">
//                                 <p className="text-sm text-textSecondary">Order</p>
//                                 <p className="font-medium mt-2">{selectedIssue.orderId || 'Not linked'}</p>
//                             </div>
//                         </div>

//                         <div className="mt-6 grid gap-4 md:grid-cols-2">
//                             <div className="rounded-3xl border border-border bg-background p-4">
//                                 <p className="text-sm text-textSecondary">Created</p>
//                                 <p className="font-medium mt-2">{new Date(selectedIssue.createdAt).toLocaleString()}</p>
//                             </div>
//                             <div className="rounded-3xl border border-border bg-background p-4">
//                                 <p className="text-sm text-textSecondary">Updated</p>
//                                 <p className="font-medium mt-2">{new Date(selectedIssue.updatedAt).toLocaleString()}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Issues







// // src/pages/dashboard/Issues.jsx
// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     AlertTriangle,
//     Plus,
//     Search,
//     Filter,
//     Eye,
//     Edit,
//     Trash2,
//     CheckCircle,
//     XCircle,
//     Clock,
//     MoreVertical,
//     User,
//     Package,
//     Calendar,
//     MessageSquare,
//     Mail,
//     Phone,
//     Tag,
//     Flag,
//     AlertCircle,
//     Check,
//     X,
//     Send,
//     Paperclip,
//     Link,
//     Users,
//     RefreshCw,
//     BarChart3,
//     TrendingUp,
//     TrendingDown,
//     Zap,
//     Award,
//     Target,
//     Activity,
//     ChevronDown,
//     ChevronRight,
//     FolderOpen,
//     FileText,
//     Save,
//     X as XIcon,
//     Truck,
//     Settings,
// } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { issueAPI } from '../../services/api'

// const Issues = () => {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [filterStatus, setFilterStatus] = useState('all')
//     const [filterPriority, setFilterPriority] = useState('all')
//     const [filterType, setFilterType] = useState('all')
//     const [issues, setIssues] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [selectedIssue, setSelectedIssue] = useState(null)
//     const [showDetailsModal, setShowDetailsModal] = useState(false)
//     const [showCreateModal, setShowCreateModal] = useState(false)
//     const [showFilters, setShowFilters] = useState(false)
//     const [isLoading, setIsLoading] = useState(false)
//     const [sortBy, setSortBy] = useState('newest')
//     const [pagination, setPagination] = useState({
//         page: 1,
//         limit: 20,
//         total: 0,
//         pages: 0,
//     })

//     // Stats
//     const [stats, setStats] = useState({
//         total: 0,
//         open: 0,
//         inProgress: 0,
//         resolved: 0,
//         closed: 0,
//         highPriority: 0,
//         mediumPriority: 0,
//         lowPriority: 0,
//     })

//     // Create issue form state
//     const [formData, setFormData] = useState({
//         title: '',
//         type: 'complaint',
//         priority: 'medium',
//         customerId: '',
//         customerSearch: '',
//         orderId: '',
//         description: '',
//         category: 'general',
//         source: 'email',
//         assignedTo: '',
//         tags: [],
//     })

//     // Load issues on mount
//     useEffect(() => {
//         fetchIssues()
//         fetchStats()
//     }, [])

//     // Fetch issues from API
//     const fetchIssues = async () => {
//         try {
//             setLoading(true)
//             const params = {
//                 page: pagination.page,
//                 limit: pagination.limit,
//                 search: searchQuery || undefined,
//                 status: filterStatus !== 'all' ? filterStatus : undefined,
//                 priority: filterPriority !== 'all' ? filterPriority : undefined,
//                 type: filterType !== 'all' ? filterType : undefined,
//                 sort: sortBy === 'newest' ? '-createdAt' : 
//                       sortBy === 'oldest' ? 'createdAt' :
//                       sortBy === 'priority' ? '-priority' : '-createdAt',
//             }
            
//             const response = await issueAPI.getAll(params)
//             setIssues(response.data.issues)
//             setPagination(prev => ({
//                 ...prev,
//                 total: response.data.pagination.total,
//                 pages: response.data.pagination.pages,
//             }))
//         } catch (error) {
//             console.error('Fetch issues error:', error)
//             toast.error(error.response?.data?.message || 'Failed to load issues')
//             setIssues([])
//         } finally {
//             setLoading(false)
//         }
//     }

//     // Fetch stats from API
//     const fetchStats = async () => {
//         try {
//             const response = await issueAPI.getStats()
//             const statusStats = response.data.stats.status || []
//             const priorityStats = response.data.stats.priority || []
            
//             setStats({
//                 total: response.data.stats.total || 0,
//                 open: statusStats.find(s => s._id === 'open')?.count || 0,
//                 inProgress: statusStats.find(s => s._id === 'in_progress')?.count || 0,
//                 resolved: statusStats.find(s => s._id === 'resolved')?.count || 0,
//                 closed: statusStats.find(s => s._id === 'closed')?.count || 0,
//                 highPriority: priorityStats.find(p => p._id === 'high')?.count || 0,
//                 mediumPriority: priorityStats.find(p => p._id === 'medium')?.count || 0,
//                 lowPriority: priorityStats.find(p => p._id === 'low')?.count || 0,
//             })
//         } catch (error) {
//             console.error('Fetch stats error:', error)
//         }
//     }

//     // Handle create issue
//     const handleCreateIssue = async (e) => {
//         e.preventDefault()
//         setIsLoading(true)

//         try {
//             const issueData = {
//                 title: formData.title,
//                 type: formData.type,
//                 priority: formData.priority,
//                 customerId: formData.customerId || undefined,
//                 orderId: formData.orderId || undefined,
//                 description: formData.description,
//                 category: formData.category,
//                 source: formData.source,
//                 assignedTo: formData.assignedTo || undefined,
//                 tags: formData.tags,
//             }

//             const response = await issueAPI.create(issueData)
//             setIssues([response.data.issue, ...issues])
//             fetchStats()
//             toast.success('Issue created successfully!')
//             handleCloseCreateModal()
//         } catch (error) {
//             console.error('Create issue error:', error)
//             toast.error(error.response?.data?.message || 'Failed to create issue')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Handle update issue status
//     const updateIssueStatus = async (issueId, status, resolution = '') => {
//         try {
//             setIsLoading(true)
//             await issueAPI.updateStatus(issueId, status, resolution)
            
//             // Update local state
//             const updatedIssues = issues.map(issue => {
//                 if (issue.id === issueId) {
//                     const updated = { ...issue, status }
//                     if (status === 'resolved' || status === 'closed') {
//                         updated.resolvedAt = new Date().toISOString()
//                         updated.resolvedBy = 'System'
//                         updated.resolution = resolution || 'Issue resolved'
//                     }
//                     return updated
//                 }
//                 return issue
//             })
            
//             setIssues(updatedIssues)
//             fetchStats()
//             toast.success(`Issue status updated to ${status.replace('_', ' ')}`)
//             return true
//         } catch (error) {
//             console.error('Update status error:', error)
//             toast.error(error.response?.data?.message || 'Failed to update status')
//             return false
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Handle delete issue
//     const handleDeleteIssue = async (issueId) => {
//         if (window.confirm('Are you sure you want to delete this issue?')) {
//             try {
//                 setIsLoading(true)
//                 await issueAPI.delete(issueId)
//                 setIssues(issues.filter(i => i.id !== issueId))
//                 fetchStats()
//                 toast.success('Issue deleted successfully')
//             } catch (error) {
//                 console.error('Delete issue error:', error)
//                 toast.error(error.response?.data?.message || 'Failed to delete issue')
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//     }

//     // Handle add comment
//     const handleAddComment = async (issueId, comment, isInternal = false) => {
//         if (!comment.trim()) {
//             toast.error('Please enter a comment')
//             return
//         }

//         try {
//             setIsLoading(true)
//             const response = await issueAPI.addComment(issueId, comment, isInternal)
            
//             // Update local state
//             const updatedIssues = issues.map(issue => {
//                 if (issue.id === issueId) {
//                     return {
//                         ...issue,
//                         comments: [...(issue.comments || []), response.data.comment],
//                     }
//                 }
//                 return issue
//             })
            
//             setIssues(updatedIssues)
//             toast.success('Comment added successfully')
//             return true
//         } catch (error) {
//             console.error('Add comment error:', error)
//             toast.error(error.response?.data?.message || 'Failed to add comment')
//             return false
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Handle close create modal
//     const handleCloseCreateModal = () => {
//         setShowCreateModal(false)
//         setFormData({
//             title: '',
//             type: 'complaint',
//             priority: 'medium',
//             customerId: '',
//             customerSearch: '',
//             orderId: '',
//             description: '',
//             category: 'general',
//             source: 'email',
//             assignedTo: '',
//             tags: [],
//         })
//     }

//     // Handle view issue details
//     const handleViewIssue = async (issue) => {
//         try {
//             setIsLoading(true)
//             const response = await issueAPI.getOne(issue.id)
//             setSelectedIssue(response.data.issue)
//             setShowDetailsModal(true)
//         } catch (error) {
//             console.error('View issue error:', error)
//             toast.error('Failed to load issue details')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Handle close details modal
//     const handleCloseDetailsModal = () => {
//         setShowDetailsModal(false)
//         setSelectedIssue(null)
//     }

//     // Get priority color
//     const getPriorityColor = (priority) => {
//         const colors = {
//             high: 'bg-danger/20 text-danger',
//             medium: 'bg-amber-500/20 text-amber-400',
//             low: 'bg-success/20 text-success',
//         }
//         return colors[priority] || 'bg-[#1E293B] text-textSecondary'
//     }

//     // Get priority icon
//     const getPriorityIcon = (priority) => {
//         const icons = {
//             high: <AlertCircle className="w-4 h-4" />,
//             medium: <AlertTriangle className="w-4 h-4" />,
//             low: <CheckCircle className="w-4 h-4" />,
//         }
//         return icons[priority] || null
//     }

//     // Get status color
//     const getStatusColor = (status) => {
//         const colors = {
//             open: 'bg-danger/20 text-danger',
//             in_progress: 'bg-amber-500/20 text-amber-400',
//             resolved: 'bg-indigo-500/20 text-indigo-400',
//             closed: 'bg-success/20 text-success',
//         }
//         return colors[status] || 'bg-[#1E293B] text-textSecondary'
//     }

//     // Get status label
//     const getStatusLabel = (status) => {
//         const labels = {
//             open: 'Open',
//             in_progress: 'In Progress',
//             resolved: 'Resolved',
//             closed: 'Closed',
//         }
//         return labels[status] || status
//     }

//     // Get type label
//     const getTypeLabel = (type) => {
//         const labels = {
//             complaint: 'Complaint',
//             return: 'Return',
//             delivery_issue: 'Delivery Issue',
//             damaged_goods: 'Damaged Goods',
//             refund: 'Refund',
//             technical: 'Technical',
//             other: 'Other',
//         }
//         return labels[type] || type
//     }

//     // Get type icon
//     const getTypeIcon = (type) => {
//         const icons = {
//             complaint: <AlertCircle className="w-4 h-4" />,
//             return: <RefreshCw className="w-4 h-4" />,
//             delivery_issue: <Truck className="w-4 h-4" />,
//             damaged_goods: <AlertTriangle className="w-4 h-4" />,
//             refund: <XCircle className="w-4 h-4" />,
//             technical: <Settings className="w-4 h-4" />,
//             other: <MoreVertical className="w-4 h-4" />,
//         }
//         return icons[type] || null
//     }

//     // Filter and sort issues
//     const filteredIssues = issues.filter(issue => {
//         const matchesSearch = 
//             issue.issueNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.description?.toLowerCase().includes(searchQuery.toLowerCase())
        
//         const matchesStatus = filterStatus === 'all' || issue.status === filterStatus
//         const matchesPriority = filterPriority === 'all' || issue.priority === filterPriority
//         const matchesType = filterType === 'all' || issue.type === filterType
        
//         return matchesSearch && matchesStatus && matchesPriority && matchesType
//     })

//     // Sort issues
//     const sortedIssues = [...filteredIssues].sort((a, b) => {
//         if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
//         if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
//         if (sortBy === 'priority') {
//             const priorityOrder = { high: 0, medium: 1, low: 2 }
//             return priorityOrder[a.priority] - priorityOrder[b.priority]
//         }
//         if (sortBy === 'status') {
//             const statusOrder = { open: 0, in_progress: 1, resolved: 2, closed: 3 }
//             return statusOrder[a.status] - statusOrder[b.status]
//         }
//         return 0
//     })

//     // Handle search with debounce
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             fetchIssues()
//         }, 500)
//         return () => clearTimeout(timer)
//     }, [searchQuery, filterStatus, filterPriority, filterType, sortBy, pagination.page])

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-textSecondary">Loading issues...</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Issues</h1>
//                     <p className="text-desc">
//                         Track and manage support tickets and customer issues
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <button
//                         onClick={() => setShowFilters(!showFilters)}
//                         className="btn-secondary"
//                     >
//                         <Filter className="w-4 h-4" />
//                         Filter
//                     </button>
//                     <button
//                         onClick={() => setShowCreateModal(true)}
//                         className="btn-primary shadow-lg shadow-indigo-500/25"
//                     >
//                         <Plus className="w-4 h-4" />
//                         New Issue
//                     </button>
//                 </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
//                 <div className="card p-3 text-center hover:border-indigo-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('all')}>
//                     <div className="text-title text-indigo-400">{stats.total}</div>
//                     <div className="text-xs text-textSecondary">Total</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-red-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('open')}>
//                     <div className="text-title text-danger">{stats.open}</div>
//                     <div className="text-xs text-textSecondary">Open</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('in_progress')}>
//                     <div className="text-title text-amber-400">{stats.inProgress}</div>
//                     <div className="text-xs text-textSecondary">In Progress</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-indigo-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('resolved')}>
//                     <div className="text-title text-indigo-400">{stats.resolved}</div>
//                     <div className="text-xs text-textSecondary">Resolved</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-success/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('closed')}>
//                     <div className="text-title text-success">{stats.closed}</div>
//                     <div className="text-xs text-textSecondary">Closed</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-danger/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterPriority('high')}>
//                     <div className="text-title text-danger">{stats.highPriority}</div>
//                     <div className="text-xs text-textSecondary">High Priority</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterPriority('medium')}>
//                     <div className="text-title text-amber-400">{stats.mediumPriority}</div>
//                     <div className="text-xs text-textSecondary">Medium Priority</div>
//                 </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <div className="flex-1 relative">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
//                         <input
//                             type="text"
//                             placeholder="Search issues by ID, title, customer, or order..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full input-field pl-12"
//                         />
//                     </div>
//                     <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="input-field w-40"
//                     >
//                         <option value="newest">Newest</option>
//                         <option value="oldest">Oldest</option>
//                         <option value="priority">Priority</option>
//                         <option value="status">Status</option>
//                     </select>
//                 </div>

//                 {/* Filter Row */}
//                 <AnimatePresence>
//                     {showFilters && (
//                         <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="flex flex-wrap gap-3 pt-2"
//                         >
//                             <select
//                                 value={filterStatus}
//                                 onChange={(e) => setFilterStatus(e.target.value)}
//                                 className="input-field w-40"
//                             >
//                                 <option value="all">All Status</option>
//                                 <option value="open">Open</option>
//                                 <option value="in_progress">In Progress</option>
//                                 <option value="resolved">Resolved</option>
//                                 <option value="closed">Closed</option>
//                             </select>
//                             <select
//                                 value={filterPriority}
//                                 onChange={(e) => setFilterPriority(e.target.value)}
//                                 className="input-field w-40"
//                             >
//                                 <option value="all">All Priority</option>
//                                 <option value="high">High</option>
//                                 <option value="medium">Medium</option>
//                                 <option value="low">Low</option>
//                             </select>
//                             <select
//                                 value={filterType}
//                                 onChange={(e) => setFilterType(e.target.value)}
//                                 className="input-field w-48"
//                             >
//                                 <option value="all">All Types</option>
//                                 <option value="complaint">Complaint</option>
//                                 <option value="return">Return</option>
//                                 <option value="delivery_issue">Delivery Issue</option>
//                                 <option value="damaged_goods">Damaged Goods</option>
//                                 <option value="refund">Refund</option>
//                                 <option value="technical">Technical</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>

//             {/* Issues List */}
//             <div className="space-y-4">
//                 {sortedIssues.length === 0 ? (
//                     <div className="card p-12 text-center">
//                         <AlertCircle className="w-16 h-16 text-textSecondary mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
//                         <p className="text-desc">
//                             {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || filterType !== 'all'
//                                 ? 'No issues match your search criteria'
//                                 : 'All customer issues and tickets will appear here'}
//                         </p>
//                     </div>
//                 ) : (
//                     sortedIssues.map((issue, index) => (
//                         <motion.div
//                             key={issue.id}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3, delay: index * 0.03 }}
//                             className={`card p-5 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer ${
//                                 issue.priority === 'high' ? 'border-l-4 border-l-danger' :
//                                 issue.priority === 'medium' ? 'border-l-4 border-l-amber-500' :
//                                 'border-l-4 border-l-success'
//                             }`}
//                             onClick={() => handleViewIssue(issue)}
//                         >
//                             <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//                                 <div className="flex-1">
//                                     <div className="flex flex-wrap items-center gap-2 mb-2">
//                                         <span className="text-sm font-semibold text-indigo-400">{issue.issueNumber}</span>
//                                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(issue.status)}`}>
//                                             {getStatusLabel(issue.status)}
//                                         </span>
//                                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(issue.priority)}`}>
//                                             {getPriorityIcon(issue.priority)}
//                                             {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
//                                         </span>
//                                         <span className="px-2 py-0.5 rounded-full bg-[#1E293B] text-textSecondary text-xs flex items-center gap-1">
//                                             {getTypeIcon(issue.type)}
//                                             {getTypeLabel(issue.type)}
//                                         </span>
//                                         {issue.orderNumber && issue.orderNumber !== 'N/A' && (
//                                             <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
//                                                 Order: {issue.orderNumber}
//                                             </span>
//                                         )}
//                                     </div>
//                                     <h3 className="font-semibold text-white">{issue.title}</h3>
//                                     <p className="text-sm text-textSecondary mt-1 line-clamp-2">{issue.description}</p>
//                                     <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-textSecondary">
//                                         <span className="flex items-center gap-1">
//                                             <User className="w-3 h-3" />
//                                             {issue.customer?.name || 'Unknown'}
//                                         </span>
//                                         <span className="flex items-center gap-1">
//                                             <Mail className="w-3 h-3" />
//                                             {issue.customer?.email || 'N/A'}
//                                         </span>
//                                         <span className="flex items-center gap-1">
//                                             <Calendar className="w-3 h-3" />
//                                             {new Date(issue.createdAt).toLocaleDateString()}
//                                         </span>
//                                         {issue.assignedTo && (
//                                             <span className="flex items-center gap-1">
//                                                 <Users className="w-3 h-3" />
//                                                 {issue.assignedTo}
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             handleViewIssue(issue)
//                                         }}
//                                         className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                         title="View Details"
//                                     >
//                                         <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             // Quick status update dropdown
//                                         }}
//                                         className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                         title="Update Status"
//                                     >
//                                         <RefreshCw className="w-4 h-4 text-textSecondary hover:text-white" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             handleDeleteIssue(issue.id)
//                                         }}
//                                         className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200"
//                                         title="Delete Issue"
//                                     >
//                                         <Trash2 className="w-4 h-4 text-danger" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             // More options
//                                         }}
//                                         className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                         title="More Options"
//                                     >
//                                         <MoreVertical className="w-4 h-4 text-textSecondary hover:text-white" />
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))
//                 )}
//             </div>

//             {/* Create Issue Modal */}
//             <AnimatePresence>
//                 {showCreateModal && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={handleCloseCreateModal}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-title">Create New Issue</h2>
//                                     <p className="text-sm text-textSecondary">
//                                         Log a support ticket or customer issue
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={handleCloseCreateModal}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <XIcon className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             <form onSubmit={handleCreateIssue} className="space-y-4">
//                                 {/* Title */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Issue Title *</label>
//                                     <input
//                                         type="text"
//                                         value={formData.title}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                                         placeholder="Brief summary of the issue"
//                                         className="input-field"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Type, Priority, Category */}
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Issue Type *</label>
//                                         <select
//                                             value={formData.type}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
//                                             className="input-field"
//                                             required
//                                         >
//                                             <option value="complaint">Complaint</option>
//                                             <option value="return">Return</option>
//                                             <option value="delivery_issue">Delivery Issue</option>
//                                             <option value="damaged_goods">Damaged Goods</option>
//                                             <option value="refund">Refund</option>
//                                             <option value="technical">Technical</option>
//                                             <option value="other">Other</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Priority</label>
//                                         <select
//                                             value={formData.priority}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="high">High</option>
//                                             <option value="medium">Medium</option>
//                                             <option value="low">Low</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Category</label>
//                                         <select
//                                             value={formData.category}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="general">General</option>
//                                             <option value="shipping">Shipping</option>
//                                             <option value="product">Product</option>
//                                             <option value="billing">Billing</option>
//                                             <option value="technical">Technical</option>
//                                             <option value="customer_service">Customer Service</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 {/* Customer & Order */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Customer</label>
//                                         <input
//                                             type="text"
//                                             placeholder="Search customer by name or email"
//                                             className="input-field"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Order ID</label>
//                                         <input
//                                             type="text"
//                                             value={formData.orderId}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, orderId: e.target.value }))}
//                                             placeholder="ORD-XXXX"
//                                             className="input-field"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Description */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Description *</label>
//                                     <textarea
//                                         value={formData.description}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                                         placeholder="Detailed description of the issue..."
//                                         rows="4"
//                                         className="input-field"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Source & Assigned To */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Source</label>
//                                         <select
//                                             value={formData.source}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="email">Email</option>
//                                             <option value="phone">Phone</option>
//                                             <option value="chat">Chat</option>
//                                             <option value="social_media">Social Media</option>
//                                             <option value="in_person">In Person</option>
//                                             <option value="order">From Order</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Assign To</label>
//                                         <select
//                                             value={formData.assignedTo}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="">Unassigned</option>
//                                             <option value="John Doe">John Doe</option>
//                                             <option value="Jane Smith">Jane Smith</option>
//                                             <option value="Bob Johnson">Bob Johnson</option>
//                                             <option value="Alice Brown">Alice Brown</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 {/* Tags */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Tags</label>
//                                     <input
//                                         type="text"
//                                         placeholder="Add tags separated by commas (e.g., urgent, refund, shipping)"
//                                         className="input-field"
//                                     />
//                                 </div>

//                                 {/* Buttons */}
//                                 <div className="flex gap-3 pt-4 border-t border-border">
//                                     <button
//                                         type="button"
//                                         onClick={handleCloseCreateModal}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                                 Creating...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Save className="w-4 h-4" />
//                                                 Create Issue
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </form>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Issue Details Modal */}
//             <AnimatePresence>
//                 {showDetailsModal && selectedIssue && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={handleCloseDetailsModal}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-start justify-between mb-6">
//                                 <div>
//                                     <div className="flex flex-wrap items-center gap-2">
//                                         <h2 className="text-title">{selectedIssue.issueNumber}</h2>
//                                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(selectedIssue.status)}`}>
//                                             {getStatusLabel(selectedIssue.status)}
//                                         </span>
//                                     </div>
//                                     <h3 className="text-lg font-semibold mt-1">{selectedIssue.title}</h3>
//                                 </div>
//                                 <button
//                                     onClick={handleCloseDetailsModal}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <XIcon className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             {/* Status Update */}
//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 {['open', 'in_progress', 'resolved', 'closed'].map((status) => (
//                                     <button
//                                         key={status}
//                                         onClick={() => {
//                                             updateIssueStatus(selectedIssue.id, status)
//                                             handleCloseDetailsModal()
//                                         }}
//                                         className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
//                                             selectedIssue.status === status
//                                                 ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
//                                                 : 'bg-card border border-border text-textSecondary hover:border-indigo-500/50'
//                                         }`}
//                                     >
//                                         Set {getStatusLabel(status)}
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Issue Details Grid */}
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Type</div>
//                                     <div className="text-sm font-medium flex items-center gap-1">
//                                         {getTypeIcon(selectedIssue.type)}
//                                         {getTypeLabel(selectedIssue.type)}
//                                     </div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Priority</div>
//                                     <div className={`text-sm font-medium flex items-center gap-1 ${getPriorityColor(selectedIssue.priority)}`}>
//                                         {getPriorityIcon(selectedIssue.priority)}
//                                         {selectedIssue.priority.charAt(0).toUpperCase() + selectedIssue.priority.slice(1)}
//                                     </div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Created</div>
//                                     <div className="text-sm font-medium">{new Date(selectedIssue.createdAt).toLocaleDateString()}</div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Assigned To</div>
//                                     <div className="text-sm font-medium">{selectedIssue.assignedTo || 'Unassigned'}</div>
//                                 </div>
//                             </div>

//                             {/* Customer & Order Info */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Customer</div>
//                                     <div className="text-sm font-medium">{selectedIssue.customer?.name || 'Unknown'}</div>
//                                     <div className="text-xs text-textSecondary">{selectedIssue.customer?.email || 'N/A'}</div>
//                                     <div className="text-xs text-textSecondary">{selectedIssue.customer?.phone || 'N/A'}</div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Order & Source</div>
//                                     <div className="text-sm font-medium">Order: {selectedIssue.orderNumber || 'N/A'}</div>
//                                     <div className="text-xs text-textSecondary">Source: {selectedIssue.source}</div>
//                                     <div className="text-xs text-textSecondary">Category: {selectedIssue.category}</div>
//                                 </div>
//                             </div>

//                             {/* Description */}
//                             <div className="p-3 rounded-xl bg-background border border-border mb-4">
//                                 <div className="text-xs text-textSecondary mb-1">Description</div>
//                                 <p className="text-sm">{selectedIssue.description}</p>
//                             </div>

//                             {/* Tags */}
//                             {selectedIssue.tags && selectedIssue.tags.length > 0 && (
//                                 <div className="flex flex-wrap gap-1 mb-4">
//                                     {selectedIssue.tags.map((tag, index) => (
//                                         <span key={index} className="px-2 py-0.5 rounded-full bg-[#1E293B] text-textSecondary text-xs">
//                                             #{tag}
//                                         </span>
//                                     ))}
//                                 </div>
//                             )}

//                             {/* Resolution */}
//                             {selectedIssue.resolution && (
//                                 <div className="p-3 rounded-xl bg-success/5 border border-success/20 mb-4">
//                                     <div className="text-xs text-textSecondary">Resolution</div>
//                                     <p className="text-sm text-success">{selectedIssue.resolution}</p>
//                                     <div className="text-xs text-textSecondary mt-1">Resolved by: {selectedIssue.resolvedBy} on {new Date(selectedIssue.resolvedAt).toLocaleDateString()}</div>
//                                 </div>
//                             )}

//                             {/* Comments */}
//                             <div>
//                                 <h4 className="text-sm font-medium mb-3">Comments</h4>
//                                 <div className="space-y-2 max-h-48 overflow-y-auto">
//                                     {selectedIssue.comments?.map((comment, index) => (
//                                         <div key={index} className={`p-3 rounded-xl ${comment.isInternal ? 'bg-amber-500/5 border border-amber-500/20' : 'bg-background border border-border'}`}>
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="text-sm font-medium">{comment.user}</span>
//                                                     {comment.isInternal && (
//                                                         <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px]">Internal</span>
//                                                     )}
//                                                 </div>
//                                                 <span className="text-xs text-textSecondary">{new Date(comment.timestamp).toLocaleString()}</span>
//                                             </div>
//                                             <p className="text-sm mt-1">{comment.message}</p>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Add Comment */}
//                                 <div className="flex gap-2 mt-3">
//                                     <input
//                                         type="text"
//                                         placeholder="Add a comment..."
//                                         className="flex-1 input-field"
//                                         onKeyPress={(e) => {
//                                             if (e.key === 'Enter' && e.target.value.trim()) {
//                                                 handleAddComment(selectedIssue.id, e.target.value, false)
//                                                 e.target.value = ''
//                                             }
//                                         }}
//                                     />
//                                     <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200">
//                                         <Send className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Actions */}
//                             <div className="flex gap-3 mt-6 pt-4 border-t border-border">
//                                 <button className="px-4 py-2 rounded-2xl bg-indigo-500/10 text-indigo-400 text-sm hover:bg-indigo-500/20 transition-colors duration-200 flex items-center gap-2">
//                                     <Mail className="w-4 h-4" />
//                                     Email Customer
//                                 </button>
//                                 <button className="btn-secondary">
//                                     <Link className="w-4 h-4" />
//                                     Link to Order
//                                 </button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     )
// }

// export default Issues






// // src/pages/dashboard/Issues.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     AlertTriangle,
//     Plus,
//     Search,
//     Filter,
//     Eye,
//     Edit,
//     Trash2,
//     CheckCircle,
//     XCircle,
//     Clock,
//     MoreVertical,
//     User,
//     Package,
//     Calendar,
//     MessageSquare,
//     Mail,
//     Phone,
//     Tag,
//     Flag,
//     AlertCircle,
//     Check,
//     X,
//     Send,
//     Paperclip,
//     Link,
//     Users,
//     RefreshCw,
//     BarChart3,
//     TrendingUp,
//     TrendingDown,
//     Zap,
//     Award,
//     Target,
//     Activity,
//     ChevronDown,
//     ChevronRight,
//     FolderOpen,
//     FileText,
//     Save,
//     X as XIcon,
//     Truck,
//     Settings,
//     ChevronUp,
//     ChevronLeft,
// } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { issueAPI } from '../../services/api'

// const Issues = () => {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [filterStatus, setFilterStatus] = useState('all')
//     const [filterPriority, setFilterPriority] = useState('all')
//     const [filterType, setFilterType] = useState('all')
//     const [issues, setIssues] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [selectedIssue, setSelectedIssue] = useState(null)
//     const [showDetailsModal, setShowDetailsModal] = useState(false)
//     const [showCreateModal, setShowCreateModal] = useState(false)
//     const [showFilters, setShowFilters] = useState(false)
//     const [isLoading, setIsLoading] = useState(false)
//     const [sortBy, setSortBy] = useState('newest')
//     const [showStatusDropdown, setShowStatusDropdown] = useState(null)
//     const [showMoreOptions, setShowMoreOptions] = useState(null)
//     const [pagination, setPagination] = useState({
//         page: 1,
//         limit: 20,
//         total: 0,
//         pages: 0,
//     })

//     // Stats
//     const [stats, setStats] = useState({
//         total: 0,
//         open: 0,
//         inProgress: 0,
//         resolved: 0,
//         closed: 0,
//         highPriority: 0,
//         mediumPriority: 0,
//         lowPriority: 0,
//     })

//     // Create issue form state
//     const [formData, setFormData] = useState({
//         title: '',
//         type: 'complaint',
//         priority: 'medium',
//         customerId: '',
//         customerSearch: '',
//         orderId: '',
//         description: '',
//         category: 'general',
//         source: 'email',
//         assignedTo: '',
//         tags: [],
//     })

//     // Refs for dropdowns
//     const statusDropdownRef = useRef(null)
//     const moreOptionsRef = useRef(null)

//     // Load issues on mount
//     useEffect(() => {
//         fetchIssues()
//         fetchStats()
//     }, [])

//     // Handle click outside dropdowns
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
//                 setShowStatusDropdown(null)
//             }
//             if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
//                 setShowMoreOptions(null)
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [])

//     // Fetch issues from API
//     const fetchIssues = async () => {
//         try {
//             setLoading(true)
//             const params = {
//                 page: pagination.page,
//                 limit: pagination.limit,
//                 search: searchQuery || undefined,
//                 status: filterStatus !== 'all' ? filterStatus : undefined,
//                 priority: filterPriority !== 'all' ? filterPriority : undefined,
//                 type: filterType !== 'all' ? filterType : undefined,
//                 sort: sortBy === 'newest' ? '-createdAt' : 
//                       sortBy === 'oldest' ? 'createdAt' :
//                       sortBy === 'priority' ? '-priority' : '-createdAt',
//             }
            
//             const response = await issueAPI.getAll(params)
//             setIssues(response.data.issues)
//             setPagination(prev => ({
//                 ...prev,
//                 total: response.data.pagination.total,
//                 pages: response.data.pagination.pages,
//             }))
//         } catch (error) {
//             console.error('Fetch issues error:', error)
//             toast.error(error.response?.data?.message || 'Failed to load issues')
//             setIssues([])
//         } finally {
//             setLoading(false)
//         }
//     }

//     // Fetch stats from API
//     const fetchStats = async () => {
//         try {
//             const response = await issueAPI.getStats()
//             const statusStats = response.data.stats.status || []
//             const priorityStats = response.data.stats.priority || []
            
//             setStats({
//                 total: response.data.stats.total || 0,
//                 open: statusStats.find(s => s._id === 'open')?.count || 0,
//                 inProgress: statusStats.find(s => s._id === 'in_progress')?.count || 0,
//                 resolved: statusStats.find(s => s._id === 'resolved')?.count || 0,
//                 closed: statusStats.find(s => s._id === 'closed')?.count || 0,
//                 highPriority: priorityStats.find(p => p._id === 'high')?.count || 0,
//                 mediumPriority: priorityStats.find(p => p._id === 'medium')?.count || 0,
//                 lowPriority: priorityStats.find(p => p._id === 'low')?.count || 0,
//             })
//         } catch (error) {
//             console.error('Fetch stats error:', error)
//         }
//     }

//     // Handle create issue
//     const handleCreateIssue = async (e) => {
//         e.preventDefault()
//         setIsLoading(true)

//         try {
//             const issueData = {
//                 title: formData.title,
//                 type: formData.type,
//                 priority: formData.priority,
//                 customerId: formData.customerId || undefined,
//                 orderId: formData.orderId || undefined,
//                 description: formData.description,
//                 category: formData.category,
//                 source: formData.source,
//                 assignedTo: formData.assignedTo || undefined,
//                 tags: formData.tags,
//             }

//             const response = await issueAPI.create(issueData)
//             setIssues([response.data.issue, ...issues])
//             fetchStats()
//             toast.success('Issue created successfully!')
//             handleCloseCreateModal()
//         } catch (error) {
//             console.error('Create issue error:', error)
//             toast.error(error.response?.data?.message || 'Failed to create issue')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Handle update issue status
//     const updateIssueStatus = async (issueId, status, resolution = '') => {
//         try {
//             setIsLoading(true)
//             await issueAPI.updateStatus(issueId, status, resolution)
            
//             // Update local state
//             const updatedIssues = issues.map(issue => {
//                 if (issue.id === issueId) {
//                     const updated = { ...issue, status }
//                     if (status === 'resolved' || status === 'closed') {
//                         updated.resolvedAt = new Date().toISOString()
//                         updated.resolvedBy = 'System'
//                         updated.resolution = resolution || 'Issue resolved'
//                     }
//                     return updated
//                 }
//                 return issue
//             })
            
//             setIssues(updatedIssues)
//             fetchStats()
//             setShowStatusDropdown(null)
//             toast.success(`Issue status updated to ${status.replace('_', ' ')}`)
//             return true
//         } catch (error) {
//             console.error('Update status error:', error)
//             toast.error(error.response?.data?.message || 'Failed to update status')
//             return false
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Handle delete issue
//     const handleDeleteIssue = async (issueId) => {
//         if (window.confirm('Are you sure you want to delete this issue?')) {
//             try {
//                 setIsLoading(true)
//                 await issueAPI.delete(issueId)
//                 setIssues(issues.filter(i => i.id !== issueId))
//                 fetchStats()
//                 setShowMoreOptions(null)
//                 toast.success('Issue deleted successfully')
//             } catch (error) {
//                 console.error('Delete issue error:', error)
//                 toast.error(error.response?.data?.message || 'Failed to delete issue')
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//     }

//     // Handle add comment
//     const handleAddComment = async (issueId, comment, isInternal = false) => {
//         if (!comment.trim()) {
//             toast.error('Please enter a comment')
//             return
//         }

//         try {
//             setIsLoading(true)
//             const response = await issueAPI.addComment(issueId, comment, isInternal)
            
//             // Update local state
//             const updatedIssues = issues.map(issue => {
//                 if (issue.id === issueId) {
//                     return {
//                         ...issue,
//                         comments: [...(issue.comments || []), response.data.comment],
//                     }
//                 }
//                 return issue
//             })
            
//             setIssues(updatedIssues)
//             toast.success('Comment added successfully')
//             return true
//         } catch (error) {
//             console.error('Add comment error:', error)
//             toast.error(error.response?.data?.message || 'Failed to add comment')
//             return false
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Handle close create modal
//     const handleCloseCreateModal = () => {
//         setShowCreateModal(false)
//         setFormData({
//             title: '',
//             type: 'complaint',
//             priority: 'medium',
//             customerId: '',
//             customerSearch: '',
//             orderId: '',
//             description: '',
//             category: 'general',
//             source: 'email',
//             assignedTo: '',
//             tags: [],
//         })
//     }

//     // Handle view issue details
//     const handleViewIssue = async (issue) => {
//         try {
//             setIsLoading(true)
//             const response = await issueAPI.getOne(issue.id)
//             setSelectedIssue(response.data.issue)
//             setShowDetailsModal(true)
//         } catch (error) {
//             console.error('View issue error:', error)
//             toast.error('Failed to load issue details')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Handle close details modal
//     const handleCloseDetailsModal = () => {
//         setShowDetailsModal(false)
//         setSelectedIssue(null)
//     }

//     // Get priority color
//     const getPriorityColor = (priority) => {
//         const colors = {
//             high: 'bg-danger/20 text-danger',
//             medium: 'bg-amber-500/20 text-amber-400',
//             low: 'bg-success/20 text-success',
//         }
//         return colors[priority] || 'bg-[#1E293B] text-textSecondary'
//     }

//     // Get priority icon
//     const getPriorityIcon = (priority) => {
//         const icons = {
//             high: <AlertCircle className="w-4 h-4" />,
//             medium: <AlertTriangle className="w-4 h-4" />,
//             low: <CheckCircle className="w-4 h-4" />,
//         }
//         return icons[priority] || null
//     }

//     // Get status color
//     const getStatusColor = (status) => {
//         const colors = {
//             open: 'bg-danger/20 text-danger',
//             in_progress: 'bg-amber-500/20 text-amber-400',
//             resolved: 'bg-indigo-500/20 text-indigo-400',
//             closed: 'bg-success/20 text-success',
//         }
//         return colors[status] || 'bg-[#1E293B] text-textSecondary'
//     }

//     // Get status label
//     const getStatusLabel = (status) => {
//         const labels = {
//             open: 'Open',
//             in_progress: 'In Progress',
//             resolved: 'Resolved',
//             closed: 'Closed',
//         }
//         return labels[status] || status
//     }

//     // Get type label
//     const getTypeLabel = (type) => {
//         const labels = {
//             complaint: 'Complaint',
//             return: 'Return',
//             delivery_issue: 'Delivery Issue',
//             damaged_goods: 'Damaged Goods',
//             refund: 'Refund',
//             technical: 'Technical',
//             other: 'Other',
//         }
//         return labels[type] || type
//     }

//     // Get type icon
//     const getTypeIcon = (type) => {
//         const icons = {
//             complaint: <AlertCircle className="w-4 h-4" />,
//             return: <RefreshCw className="w-4 h-4" />,
//             delivery_issue: <Truck className="w-4 h-4" />,
//             damaged_goods: <AlertTriangle className="w-4 h-4" />,
//             refund: <XCircle className="w-4 h-4" />,
//             technical: <Settings className="w-4 h-4" />,
//             other: <MoreVertical className="w-4 h-4" />,
//         }
//         return icons[type] || null
//     }

//     // Filter and sort issues
//     const filteredIssues = issues.filter(issue => {
//         const matchesSearch = 
//             issue.issueNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             issue.description?.toLowerCase().includes(searchQuery.toLowerCase())
        
//         const matchesStatus = filterStatus === 'all' || issue.status === filterStatus
//         const matchesPriority = filterPriority === 'all' || issue.priority === filterPriority
//         const matchesType = filterType === 'all' || issue.type === filterType
        
//         return matchesSearch && matchesStatus && matchesPriority && matchesType
//     })

//     // Sort issues
//     const sortedIssues = [...filteredIssues].sort((a, b) => {
//         if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
//         if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
//         if (sortBy === 'priority') {
//             const priorityOrder = { high: 0, medium: 1, low: 2 }
//             return priorityOrder[a.priority] - priorityOrder[b.priority]
//         }
//         if (sortBy === 'status') {
//             const statusOrder = { open: 0, in_progress: 1, resolved: 2, closed: 3 }
//             return statusOrder[a.status] - statusOrder[b.status]
//         }
//         return 0
//     })

//     // Handle search with debounce
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             fetchIssues()
//         }, 500)
//         return () => clearTimeout(timer)
//     }, [searchQuery, filterStatus, filterPriority, filterType, sortBy, pagination.page])

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-textSecondary">Loading issues...</p>
//                 </div>
//             </div>
//         )
//     }

//     // Status options for dropdown
//     const statusOptions = [
//         { value: 'open', label: 'Open', icon: <AlertCircle className="w-3 h-3 text-danger" /> },
//         { value: 'in_progress', label: 'In Progress', icon: <Clock className="w-3 h-3 text-amber-400" /> },
//         { value: 'resolved', label: 'Resolved', icon: <CheckCircle className="w-3 h-3 text-indigo-400" /> },
//         { value: 'closed', label: 'Closed', icon: <CheckCircle className="w-3 h-3 text-success" /> },
//     ]

//     // More options for dropdown
//     const moreOptions = [
//         { label: 'View Details', icon: <Eye className="w-4 h-4" />, action: 'view' },
//         { label: 'Edit Issue', icon: <Edit className="w-4 h-4" />, action: 'edit' },
//         { label: 'Delete Issue', icon: <Trash2 className="w-4 h-4 text-danger" />, action: 'delete' },
//         { label: 'Email Customer', icon: <Mail className="w-4 h-4" />, action: 'email' },
//     ]

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Issues</h1>
//                     <p className="text-desc">
//                         Track and manage support tickets and customer issues
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <button
//                         onClick={() => setShowFilters(!showFilters)}
//                         className="btn-secondary"
//                     >
//                         <Filter className="w-4 h-4" />
//                         Filter
//                     </button>
//                     <button
//                         onClick={() => setShowCreateModal(true)}
//                         className="btn-primary shadow-lg shadow-indigo-500/25"
//                     >
//                         <Plus className="w-4 h-4" />
//                         New Issue
//                     </button>
//                 </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
//                 <div className="card p-3 text-center hover:border-indigo-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('all')}>
//                     <div className="text-title text-indigo-400">{stats.total}</div>
//                     <div className="text-xs text-textSecondary">Total</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-red-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('open')}>
//                     <div className="text-title text-danger">{stats.open}</div>
//                     <div className="text-xs text-textSecondary">Open</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('in_progress')}>
//                     <div className="text-title text-amber-400">{stats.inProgress}</div>
//                     <div className="text-xs text-textSecondary">In Progress</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-indigo-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('resolved')}>
//                     <div className="text-title text-indigo-400">{stats.resolved}</div>
//                     <div className="text-xs text-textSecondary">Resolved</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-success/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('closed')}>
//                     <div className="text-title text-success">{stats.closed}</div>
//                     <div className="text-xs text-textSecondary">Closed</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-danger/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterPriority('high')}>
//                     <div className="text-title text-danger">{stats.highPriority}</div>
//                     <div className="text-xs text-textSecondary">High Priority</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterPriority('medium')}>
//                     <div className="text-title text-amber-400">{stats.mediumPriority}</div>
//                     <div className="text-xs text-textSecondary">Medium Priority</div>
//                 </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <div className="flex-1 relative">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
//                         <input
//                             type="text"
//                             placeholder="Search issues by ID, title, customer, or order..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full input-field pl-12"
//                         />
//                     </div>
//                     <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="input-field w-40"
//                     >
//                         <option value="newest">Newest</option>
//                         <option value="oldest">Oldest</option>
//                         <option value="priority">Priority</option>
//                         <option value="status">Status</option>
//                     </select>
//                 </div>

//                 {/* Filter Row */}
//                 <AnimatePresence>
//                     {showFilters && (
//                         <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="flex flex-wrap gap-3 pt-2"
//                         >
//                             <select
//                                 value={filterStatus}
//                                 onChange={(e) => setFilterStatus(e.target.value)}
//                                 className="input-field w-40"
//                             >
//                                 <option value="all">All Status</option>
//                                 <option value="open">Open</option>
//                                 <option value="in_progress">In Progress</option>
//                                 <option value="resolved">Resolved</option>
//                                 <option value="closed">Closed</option>
//                             </select>
//                             <select
//                                 value={filterPriority}
//                                 onChange={(e) => setFilterPriority(e.target.value)}
//                                 className="input-field w-40"
//                             >
//                                 <option value="all">All Priority</option>
//                                 <option value="high">High</option>
//                                 <option value="medium">Medium</option>
//                                 <option value="low">Low</option>
//                             </select>
//                             <select
//                                 value={filterType}
//                                 onChange={(e) => setFilterType(e.target.value)}
//                                 className="input-field w-48"
//                             >
//                                 <option value="all">All Types</option>
//                                 <option value="complaint">Complaint</option>
//                                 <option value="return">Return</option>
//                                 <option value="delivery_issue">Delivery Issue</option>
//                                 <option value="damaged_goods">Damaged Goods</option>
//                                 <option value="refund">Refund</option>
//                                 <option value="technical">Technical</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>

//             {/* Issues List */}
//             <div className="space-y-4">
//                 {sortedIssues.length === 0 ? (
//                     <div className="card p-12 text-center">
//                         <AlertCircle className="w-16 h-16 text-textSecondary mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
//                         <p className="text-desc">
//                             {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || filterType !== 'all'
//                                 ? 'No issues match your search criteria'
//                                 : 'All customer issues and tickets will appear here'}
//                         </p>
//                     </div>
//                 ) : (
//                     sortedIssues.map((issue, index) => (
//                         <motion.div
//                             key={issue.id}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3, delay: index * 0.03 }}
//                             className={`card p-5 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer ${
//                                 issue.priority === 'high' ? 'border-l-4 border-l-danger' :
//                                 issue.priority === 'medium' ? 'border-l-4 border-l-amber-500' :
//                                 'border-l-4 border-l-success'
//                             }`}
//                             onClick={() => handleViewIssue(issue)}
//                         >
//                             <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//                                 <div className="flex-1">
//                                     <div className="flex flex-wrap items-center gap-2 mb-2">
//                                         <span className="text-sm font-semibold text-indigo-400">{issue.issueNumber}</span>
//                                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(issue.status)}`}>
//                                             {getStatusLabel(issue.status)}
//                                         </span>
//                                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(issue.priority)}`}>
//                                             {getPriorityIcon(issue.priority)}
//                                             {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
//                                         </span>
//                                         <span className="px-2 py-0.5 rounded-full bg-[#1E293B] text-textSecondary text-xs flex items-center gap-1">
//                                             {getTypeIcon(issue.type)}
//                                             {getTypeLabel(issue.type)}
//                                         </span>
//                                         {issue.orderNumber && issue.orderNumber !== 'N/A' && (
//                                             <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
//                                                 Order: {issue.orderNumber}
//                                             </span>
//                                         )}
//                                     </div>
//                                     <h3 className="font-semibold text-white">{issue.title}</h3>
//                                     <p className="text-sm text-textSecondary mt-1 line-clamp-2">{issue.description}</p>
//                                     <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-textSecondary">
//                                         <span className="flex items-center gap-1">
//                                             <User className="w-3 h-3" />
//                                             {issue.customer?.name || 'Unknown'}
//                                         </span>
//                                         <span className="flex items-center gap-1">
//                                             <Mail className="w-3 h-3" />
//                                             {issue.customer?.email || 'N/A'}
//                                         </span>
//                                         <span className="flex items-center gap-1">
//                                             <Calendar className="w-3 h-3" />
//                                             {new Date(issue.createdAt).toLocaleDateString()}
//                                         </span>
//                                         {issue.assignedTo && (
//                                             <span className="flex items-center gap-1">
//                                                 <Users className="w-3 h-3" />
//                                                 {issue.assignedTo}
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     {/* View Button */}
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             handleViewIssue(issue)
//                                         }}
//                                         className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                         title="View Details"
//                                     >
//                                         <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
//                                     </button>

//                                     {/* Status Update Dropdown */}
//                                     <div className="relative" ref={statusDropdownRef}>
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 setShowStatusDropdown(showStatusDropdown === issue.id ? null : issue.id)
//                                                 setShowMoreOptions(null)
//                                             }}
//                                             className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                             title="Update Status"
//                                         >
//                                             <RefreshCw className="w-4 h-4 text-textSecondary hover:text-white" />
//                                         </button>
                                        
//                                         <AnimatePresence>
//                                             {showStatusDropdown === issue.id && (
//                                                 <motion.div
//                                                     initial={{ opacity: 0, scale: 0.95, y: -5 }}
//                                                     animate={{ opacity: 1, scale: 1, y: 0 }}
//                                                     exit={{ opacity: 0, scale: 0.95, y: -5 }}
//                                                     className="absolute right-0 top-full mt-1 w-48 glass rounded-2xl border border-border shadow-2xl overflow-hidden z-20"
//                                                     onClick={(e) => e.stopPropagation()}
//                                                 >
//                                                     <div className="py-1">
//                                                         {statusOptions.map((option) => (
//                                                             <button
//                                                                 key={option.value}
//                                                                 onClick={() => {
//                                                                     updateIssueStatus(issue.id, option.value)
//                                                                 }}
//                                                                 className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-2 ${
//                                                                     issue.status === option.value ? 'bg-indigo-500/10 text-indigo-400' : 'text-textSecondary'
//                                                                 }`}
//                                                             >
//                                                                 {option.icon}
//                                                                 {option.label}
//                                                                 {issue.status === option.value && (
//                                                                     <Check className="w-3 h-3 ml-auto text-indigo-400" />
//                                                                 )}
//                                                             </button>
//                                                         ))}
//                                                     </div>
//                                                 </motion.div>
//                                             )}
//                                         </AnimatePresence>
//                                     </div>

//                                     {/* Delete Button */}
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             handleDeleteIssue(issue.id)
//                                         }}
//                                         className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200"
//                                         title="Delete Issue"
//                                     >
//                                         <Trash2 className="w-4 h-4 text-danger" />
//                                     </button>

//                                     {/* More Options Dropdown */}
//                                     <div className="relative" ref={moreOptionsRef}>
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 setShowMoreOptions(showMoreOptions === issue.id ? null : issue.id)
//                                                 setShowStatusDropdown(null)
//                                             }}
//                                             className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                             title="More Options"
//                                         >
//                                             <MoreVertical className="w-4 h-4 text-textSecondary hover:text-white" />
//                                         </button>

//                                         <AnimatePresence>
//                                             {showMoreOptions === issue.id && (
//                                                 <motion.div
//                                                     initial={{ opacity: 0, scale: 0.95, y: -5 }}
//                                                     animate={{ opacity: 1, scale: 1, y: 0 }}
//                                                     exit={{ opacity: 0, scale: 0.95, y: -5 }}
//                                                     className="absolute right-0 top-full mt-1 w-48 glass rounded-2xl border border-border shadow-2xl overflow-hidden z-20"
//                                                     onClick={(e) => e.stopPropagation()}
//                                                 >
//                                                     <div className="py-1">
//                                                         {moreOptions.map((option, idx) => (
//                                                             <button
//                                                                 key={idx}
//                                                                 onClick={() => {
//                                                                     if (option.action === 'view') {
//                                                                         handleViewIssue(issue)
//                                                                     } else if (option.action === 'delete') {
//                                                                         handleDeleteIssue(issue.id)
//                                                                     } else if (option.action === 'edit') {
//                                                                         // Handle edit
//                                                                         toast.info('Edit functionality coming soon')
//                                                                     } else if (option.action === 'email') {
//                                                                         toast.info('Email customer functionality coming soon')
//                                                                     }
//                                                                     setShowMoreOptions(null)
//                                                                 }}
//                                                                 className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-2 ${
//                                                                     option.action === 'delete' ? 'text-danger' : 'text-textSecondary'
//                                                                 }`}
//                                                             >
//                                                                 {option.icon}
//                                                                 {option.label}
//                                                             </button>
//                                                         ))}
//                                                     </div>
//                                                 </motion.div>
//                                             )}
//                                         </AnimatePresence>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))
//                 )}
//             </div>

//             {/* Create Issue Modal */}
//             <AnimatePresence>
//                 {showCreateModal && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={handleCloseCreateModal}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-title">Create New Issue</h2>
//                                     <p className="text-sm text-textSecondary">
//                                         Log a support ticket or customer issue
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={handleCloseCreateModal}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <XIcon className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             <form onSubmit={handleCreateIssue} className="space-y-4">
//                                 {/* Title */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Issue Title *</label>
//                                     <input
//                                         type="text"
//                                         value={formData.title}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                                         placeholder="Brief summary of the issue"
//                                         className="input-field"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Type, Priority, Category */}
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Issue Type *</label>
//                                         <select
//                                             value={formData.type}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
//                                             className="input-field"
//                                             required
//                                         >
//                                             <option value="complaint">Complaint</option>
//                                             <option value="return">Return</option>
//                                             <option value="delivery_issue">Delivery Issue</option>
//                                             <option value="damaged_goods">Damaged Goods</option>
//                                             <option value="refund">Refund</option>
//                                             <option value="technical">Technical</option>
//                                             <option value="other">Other</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Priority</label>
//                                         <select
//                                             value={formData.priority}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="high">High</option>
//                                             <option value="medium">Medium</option>
//                                             <option value="low">Low</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Category</label>
//                                         <select
//                                             value={formData.category}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="general">General</option>
//                                             <option value="shipping">Shipping</option>
//                                             <option value="product">Product</option>
//                                             <option value="billing">Billing</option>
//                                             <option value="technical">Technical</option>
//                                             <option value="customer_service">Customer Service</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 {/* Customer & Order */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Customer</label>
//                                         <input
//                                             type="text"
//                                             placeholder="Search customer by name or email"
//                                             className="input-field"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Order ID</label>
//                                         <input
//                                             type="text"
//                                             value={formData.orderId}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, orderId: e.target.value }))}
//                                             placeholder="ORD-XXXX"
//                                             className="input-field"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Description */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Description *</label>
//                                     <textarea
//                                         value={formData.description}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                                         placeholder="Detailed description of the issue..."
//                                         rows="4"
//                                         className="input-field"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Source & Assigned To */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Source</label>
//                                         <select
//                                             value={formData.source}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="email">Email</option>
//                                             <option value="phone">Phone</option>
//                                             <option value="chat">Chat</option>
//                                             <option value="social_media">Social Media</option>
//                                             <option value="in_person">In Person</option>
//                                             <option value="order">From Order</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Assign To</label>
//                                         <select
//                                             value={formData.assignedTo}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="">Unassigned</option>
//                                             <option value="John Doe">John Doe</option>
//                                             <option value="Jane Smith">Jane Smith</option>
//                                             <option value="Bob Johnson">Bob Johnson</option>
//                                             <option value="Alice Brown">Alice Brown</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 {/* Tags */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Tags</label>
//                                     <input
//                                         type="text"
//                                         placeholder="Add tags separated by commas (e.g., urgent, refund, shipping)"
//                                         className="input-field"
//                                     />
//                                 </div>

//                                 {/* Buttons */}
//                                 <div className="flex gap-3 pt-4 border-t border-border">
//                                     <button
//                                         type="button"
//                                         onClick={handleCloseCreateModal}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                                 Creating...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Save className="w-4 h-4" />
//                                                 Create Issue
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </form>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Issue Details Modal */}
//             <AnimatePresence>
//                 {showDetailsModal && selectedIssue && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={handleCloseDetailsModal}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-start justify-between mb-6">
//                                 <div>
//                                     <div className="flex flex-wrap items-center gap-2">
//                                         <h2 className="text-title">{selectedIssue.issueNumber}</h2>
//                                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(selectedIssue.status)}`}>
//                                             {getStatusLabel(selectedIssue.status)}
//                                         </span>
//                                     </div>
//                                     <h3 className="text-lg font-semibold mt-1">{selectedIssue.title}</h3>
//                                 </div>
//                                 <button
//                                     onClick={handleCloseDetailsModal}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <XIcon className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             {/* Status Update */}
//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 {['open', 'in_progress', 'resolved', 'closed'].map((status) => (
//                                     <button
//                                         key={status}
//                                         onClick={() => {
//                                             updateIssueStatus(selectedIssue.id, status)
//                                             handleCloseDetailsModal()
//                                         }}
//                                         className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
//                                             selectedIssue.status === status
//                                                 ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
//                                                 : 'bg-card border border-border text-textSecondary hover:border-indigo-500/50'
//                                         }`}
//                                     >
//                                         Set {getStatusLabel(status)}
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Issue Details Grid */}
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Type</div>
//                                     <div className="text-sm font-medium flex items-center gap-1">
//                                         {getTypeIcon(selectedIssue.type)}
//                                         {getTypeLabel(selectedIssue.type)}
//                                     </div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Priority</div>
//                                     <div className={`text-sm font-medium flex items-center gap-1 ${getPriorityColor(selectedIssue.priority)}`}>
//                                         {getPriorityIcon(selectedIssue.priority)}
//                                         {selectedIssue.priority.charAt(0).toUpperCase() + selectedIssue.priority.slice(1)}
//                                     </div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Created</div>
//                                     <div className="text-sm font-medium">{new Date(selectedIssue.createdAt).toLocaleDateString()}</div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Assigned To</div>
//                                     <div className="text-sm font-medium">{selectedIssue.assignedTo || 'Unassigned'}</div>
//                                 </div>
//                             </div>

//                             {/* Customer & Order Info */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Customer</div>
//                                     <div className="text-sm font-medium">{selectedIssue.customer?.name || 'Unknown'}</div>
//                                     <div className="text-xs text-textSecondary">{selectedIssue.customer?.email || 'N/A'}</div>
//                                     <div className="text-xs text-textSecondary">{selectedIssue.customer?.phone || 'N/A'}</div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Order & Source</div>
//                                     <div className="text-sm font-medium">Order: {selectedIssue.orderNumber || 'N/A'}</div>
//                                     <div className="text-xs text-textSecondary">Source: {selectedIssue.source}</div>
//                                     <div className="text-xs text-textSecondary">Category: {selectedIssue.category}</div>
//                                 </div>
//                             </div>

//                             {/* Description */}
//                             <div className="p-3 rounded-xl bg-background border border-border mb-4">
//                                 <div className="text-xs text-textSecondary mb-1">Description</div>
//                                 <p className="text-sm">{selectedIssue.description}</p>
//                             </div>

//                             {/* Tags */}
//                             {selectedIssue.tags && selectedIssue.tags.length > 0 && (
//                                 <div className="flex flex-wrap gap-1 mb-4">
//                                     {selectedIssue.tags.map((tag, index) => (
//                                         <span key={index} className="px-2 py-0.5 rounded-full bg-[#1E293B] text-textSecondary text-xs">
//                                             #{tag}
//                                         </span>
//                                     ))}
//                                 </div>
//                             )}

//                             {/* Resolution */}
//                             {selectedIssue.resolution && (
//                                 <div className="p-3 rounded-xl bg-success/5 border border-success/20 mb-4">
//                                     <div className="text-xs text-textSecondary">Resolution</div>
//                                     <p className="text-sm text-success">{selectedIssue.resolution}</p>
//                                     <div className="text-xs text-textSecondary mt-1">Resolved by: {selectedIssue.resolvedBy} on {new Date(selectedIssue.resolvedAt).toLocaleDateString()}</div>
//                                 </div>
//                             )}

//                             {/* Comments */}
//                             <div>
//                                 <h4 className="text-sm font-medium mb-3">Comments</h4>
//                                 <div className="space-y-2 max-h-48 overflow-y-auto">
//                                     {selectedIssue.comments?.map((comment, index) => (
//                                         <div key={index} className={`p-3 rounded-xl ${comment.isInternal ? 'bg-amber-500/5 border border-amber-500/20' : 'bg-background border border-border'}`}>
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="text-sm font-medium">{comment.user}</span>
//                                                     {comment.isInternal && (
//                                                         <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px]">Internal</span>
//                                                     )}
//                                                 </div>
//                                                 <span className="text-xs text-textSecondary">{new Date(comment.timestamp).toLocaleString()}</span>
//                                             </div>
//                                             <p className="text-sm mt-1">{comment.message}</p>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Add Comment */}
//                                 <div className="flex gap-2 mt-3">
//                                     <input
//                                         type="text"
//                                         placeholder="Add a comment..."
//                                         className="flex-1 input-field"
//                                         onKeyPress={(e) => {
//                                             if (e.key === 'Enter' && e.target.value.trim()) {
//                                                 handleAddComment(selectedIssue.id, e.target.value, false)
//                                                 e.target.value = ''
//                                             }
//                                         }}
//                                     />
//                                     <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200">
//                                         <Send className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Actions */}
//                             <div className="flex gap-3 mt-6 pt-4 border-t border-border">
//                                 <button className="px-4 py-2 rounded-2xl bg-indigo-500/10 text-indigo-400 text-sm hover:bg-indigo-500/20 transition-colors duration-200 flex items-center gap-2">
//                                     <Mail className="w-4 h-4" />
//                                     Email Customer
//                                 </button>
//                                 <button className="btn-secondary">
//                                     <Link className="w-4 h-4" />
//                                     Link to Order
//                                 </button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     )
// }

// export default Issues





// src/pages/dashboard/Issues.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     AlertTriangle,
//     Plus,
//     Search,
//     Filter,
//     Eye,
//     Edit,
//     Trash2,
//     CheckCircle,
//     XCircle,
//     Clock,
//     MoreVertical,
//     User,
//     Package,
//     Calendar,
//     MessageSquare,
//     Mail,
//     Phone,
//     Tag,
//     Flag,
//     AlertCircle,
//     Check,
//     X,
//     Send,
//     Paperclip,
//     Link,
//     Users,
//     RefreshCw,
//     BarChart3,
//     TrendingUp,
//     TrendingDown,
//     Zap,
//     Award,
//     Target,
//     Activity,
//     ChevronDown,
//     ChevronRight,
//     FolderOpen,
//     FileText,
//     Save,
//     X as XIcon,
//     Truck,
//     Settings,
//     ChevronUp,
//     ChevronLeft,
// } from 'lucide-react'
// import toast from 'react-hot-toast'
// import api from '../../services/api'

// const Issues = () => {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [filterStatus, setFilterStatus] = useState('all')
//     const [filterPriority, setFilterPriority] = useState('all')
//     const [filterType, setFilterType] = useState('all')
//     const [issues, setIssues] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [selectedIssue, setSelectedIssue] = useState(null)
//     const [showDetailsModal, setShowDetailsModal] = useState(false)
//     const [showCreateModal, setShowCreateModal] = useState(false)
//     const [showFilters, setShowFilters] = useState(false)
//     const [isLoading, setIsLoading] = useState(false)
//     const [sortBy, setSortBy] = useState('newest')
//     const [showStatusDropdown, setShowStatusDropdown] = useState(null)
//     const [showMoreOptions, setShowMoreOptions] = useState(null)
//     const [pagination, setPagination] = useState({
//         page: 1,
//         limit: 20,
//         total: 0,
//         pages: 0,
//     })

//     // Stats
//     const [stats, setStats] = useState({
//         total: 0,
//         open: 0,
//         inProgress: 0,
//         resolved: 0,
//         closed: 0,
//         highPriority: 0,
//         mediumPriority: 0,
//         lowPriority: 0,
//     })

//     // Create issue form state
//     const [formData, setFormData] = useState({
//         title: '',
//         type: 'complaint',
//         priority: 'medium',
//         customerId: '',
//         customerSearch: '',
//         orderId: '',
//         description: '',
//         category: 'general',
//         source: 'email',
//         assignedTo: '',
//         tags: [],
//     })

//     // Refs for dropdowns
//     const statusDropdownRef = useRef(null)
//     const moreOptionsRef = useRef(null)

//     // Get auth token
//     const getToken = () => localStorage.getItem('token')

//     // ============================================
//     // DIRECT API CALLS - NO DEPENDENCY ON issueAPI
//     // ============================================

//     // Fetch issues from API
//     const fetchIssues = async () => {
//         try {
//             setLoading(true)
//             console.log('📤 Fetching issues...')
            
//             const token = getToken()
//             const response = await api.get('/issues', {
//                 params: {
//                     page: pagination.page,
//                     limit: pagination.limit,
//                     search: searchQuery || undefined,
//                     status: filterStatus !== 'all' ? filterStatus : undefined,
//                     priority: filterPriority !== 'all' ? filterPriority : undefined,
//                     type: filterType !== 'all' ? filterType : undefined,
//                 },
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
            
//             console.log('✅ Issues fetched:', response.data)
            
//             if (response.data.success) {
//                 setIssues(response.data.issues || [])
//                 setPagination(prev => ({
//                     ...prev,
//                     total: response.data.pagination?.total || 0,
//                     pages: response.data.pagination?.pages || 0,
//                 }))
//             } else {
//                 toast.error(response.data.message || 'Failed to load issues')
//             }
//         } catch (error) {
//             console.error('❌ Fetch issues error:', error)
//             console.error('❌ Error response:', error.response?.data)
//             toast.error(error.response?.data?.message || 'Failed to load issues')
//             setIssues([])
//         } finally {
//             setLoading(false)
//         }
//     }

//     // Fetch stats from API
//     const fetchStats = async () => {
//         try {
//             console.log('📤 Fetching stats...')
//             const token = getToken()
//             const response = await api.get('/issues/stats', {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
            
//             console.log('✅ Stats fetched:', response.data)
            
//             if (response.data.success) {
//                 const statusStats = response.data.stats?.status || []
//                 const priorityStats = response.data.stats?.priority || []
                
//                 setStats({
//                     total: response.data.stats?.total || 0,
//                     open: statusStats.find(s => s._id === 'open')?.count || 0,
//                     inProgress: statusStats.find(s => s._id === 'in_progress')?.count || 0,
//                     resolved: statusStats.find(s => s._id === 'resolved')?.count || 0,
//                     closed: statusStats.find(s => s._id === 'closed')?.count || 0,
//                     highPriority: priorityStats.find(p => p._id === 'high')?.count || 0,
//                     mediumPriority: priorityStats.find(p => p._id === 'medium')?.count || 0,
//                     lowPriority: priorityStats.find(p => p._id === 'low')?.count || 0,
//                 })
//             }
//         } catch (error) {
//             console.error('❌ Fetch stats error:', error)
//         }
//     }

//     // Create issue
//     const handleCreateIssue = async (e) => {
//         e.preventDefault()
//         setIsLoading(true)

//         try {
//             console.log('📝 Creating issue with data:', formData)
            
//             const token = getToken()
//             const issueData = {
//                 title: formData.title,
//                 type: formData.type,
//                 priority: formData.priority,
//                 customerId: formData.customerId || undefined,
//                 orderId: formData.orderId || undefined,
//                 description: formData.description,
//                 category: formData.category,
//                 source: formData.source,
//                 assignedTo: formData.assignedTo || undefined,
//                 tags: formData.tags,
//             }

//             const response = await api.post('/issues', issueData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
            
//             console.log('✅ Issue created:', response.data)
            
//             if (response.data.success) {
//                 setIssues([response.data.issue, ...issues])
//                 fetchStats()
//                 toast.success('Issue created successfully!')
//                 handleCloseCreateModal()
//             } else {
//                 toast.error(response.data.message || 'Failed to create issue')
//             }
//         } catch (error) {
//             console.error('❌ Create issue error:', error)
//             console.error('❌ Error response:', error.response?.data)
//             toast.error(error.response?.data?.message || 'Failed to create issue')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Update issue status
//     const updateIssueStatus = async (issueId, status, resolution = '') => {
//         try {
//             setIsLoading(true)
//             console.log(`📝 Updating issue ${issueId} status to:`, status)
            
//             const token = getToken()
//             const response = await api.patch(`/issues/${issueId}/status`, { status, resolution }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
            
//             console.log('✅ Status updated:', response.data)
            
//             if (response.data.success) {
//                 // Update local state
//                 const updatedIssues = issues.map(issue => {
//                     if (issue._id === issueId || issue.id === issueId) {
//                         const updated = { ...issue, status }
//                         if (status === 'resolved' || status === 'closed') {
//                             updated.resolvedAt = new Date().toISOString()
//                             updated.resolvedBy = 'System'
//                             updated.resolution = resolution || 'Issue resolved'
//                         }
//                         return updated
//                     }
//                     return issue
//                 })
                
//                 setIssues(updatedIssues)
//                 fetchStats()
//                 setShowStatusDropdown(null)
//                 toast.success(`Issue status updated to ${status.replace('_', ' ')}`)
//             } else {
//                 toast.error(response.data.message || 'Failed to update status')
//             }
//         } catch (error) {
//             console.error('❌ Update status error:', error)
//             toast.error(error.response?.data?.message || 'Failed to update status')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Delete issue
//     const handleDeleteIssue = async (issueId) => {
//         if (window.confirm('Are you sure you want to delete this issue?')) {
//             try {
//                 setIsLoading(true)
//                 console.log(`🗑️ Deleting issue:`, issueId)
                
//                 const token = getToken()
//                 const response = await api.delete(`/issues/${issueId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 })
                
//                 console.log('✅ Issue deleted:', response.data)
                
//                 if (response.data.success) {
//                     setIssues(issues.filter(i => i._id !== issueId && i.id !== issueId))
//                     fetchStats()
//                     setShowMoreOptions(null)
//                     toast.success('Issue deleted successfully')
//                 } else {
//                     toast.error(response.data.message || 'Failed to delete issue')
//                 }
//             } catch (error) {
//                 console.error('❌ Delete issue error:', error)
//                 toast.error(error.response?.data?.message || 'Failed to delete issue')
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//     }

//     // View issue details
//     const handleViewIssue = async (issue) => {
//         try {
//             setIsLoading(true)
//             const issueId = issue._id || issue.id
//             console.log(`👁️ Viewing issue:`, issueId)
            
//             const token = getToken()
//             const response = await api.get(`/issues/${issueId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
            
//             console.log('✅ Issue details fetched:', response.data)
            
//             if (response.data.success) {
//                 setSelectedIssue(response.data.issue)
//                 setShowDetailsModal(true)
//             } else {
//                 toast.error(response.data.message || 'Failed to load issue details')
//             }
//         } catch (error) {
//             console.error('❌ View issue error:', error)
//             toast.error('Failed to load issue details')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Add comment
//     const handleAddComment = async (issueId, comment, isInternal = false) => {
//         if (!comment.trim()) {
//             toast.error('Please enter a comment')
//             return
//         }

//         try {
//             setIsLoading(true)
//             console.log(`💬 Adding comment to issue ${issueId}:`, comment)
            
//             const token = getToken()
//             const response = await api.post(`/issues/${issueId}/comments`, { message: comment, isInternal }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
            
//             console.log('✅ Comment added:', response.data)
            
//             if (response.data.success) {
//                 // Update local state
//                 const updatedIssues = issues.map(issue => {
//                     const id = issue._id || issue.id
//                     if (id === issueId) {
//                         return {
//                             ...issue,
//                             comments: [...(issue.comments || []), response.data.comment],
//                         }
//                     }
//                     return issue
//                 })
                
//                 setIssues(updatedIssues)
                
//                 // Update selected issue if open
//                 if (selectedIssue) {
//                     const selectedId = selectedIssue._id || selectedIssue.id
//                     if (selectedId === issueId) {
//                         setSelectedIssue({
//                             ...selectedIssue,
//                             comments: [...(selectedIssue.comments || []), response.data.comment],
//                         })
//                     }
//                 }
                
//                 toast.success('Comment added successfully')
//             } else {
//                 toast.error(response.data.message || 'Failed to add comment')
//             }
//         } catch (error) {
//             console.error('❌ Add comment error:', error)
//             toast.error(error.response?.data?.message || 'Failed to add comment')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Load issues on mount
//     useEffect(() => {
//         console.log('🔄 Issues component mounted')
//         fetchIssues()
//         fetchStats()
//     }, [])

//     // Handle search with debounce
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             fetchIssues()
//         }, 500)
//         return () => clearTimeout(timer)
//     }, [searchQuery, filterStatus, filterPriority, filterType, sortBy, pagination.page])

//     // Handle click outside dropdowns
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
//                 setShowStatusDropdown(null)
//             }
//             if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
//                 setShowMoreOptions(null)
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => document.removeEventListener('mousedown', handleClickOutside)
//     }, [])

//     // Handle close create modal
//     const handleCloseCreateModal = () => {
//         setShowCreateModal(false)
//         setFormData({
//             title: '',
//             type: 'complaint',
//             priority: 'medium',
//             customerId: '',
//             customerSearch: '',
//             orderId: '',
//             description: '',
//             category: 'general',
//             source: 'email',
//             assignedTo: '',
//             tags: [],
//         })
//     }

//     // Handle close details modal
//     const handleCloseDetailsModal = () => {
//         setShowDetailsModal(false)
//         setSelectedIssue(null)
//     }

//     // Get priority color
//     const getPriorityColor = (priority) => {
//         const colors = {
//             high: 'bg-danger/20 text-danger',
//             medium: 'bg-amber-500/20 text-amber-400',
//             low: 'bg-success/20 text-success',
//         }
//         return colors[priority] || 'bg-[#1E293B] text-textSecondary'
//     }

//     // Get priority icon
//     const getPriorityIcon = (priority) => {
//         const icons = {
//             high: <AlertCircle className="w-4 h-4" />,
//             medium: <AlertTriangle className="w-4 h-4" />,
//             low: <CheckCircle className="w-4 h-4" />,
//         }
//         return icons[priority] || null
//     }

//     // Get status color
//     const getStatusColor = (status) => {
//         const colors = {
//             open: 'bg-danger/20 text-danger',
//             in_progress: 'bg-amber-500/20 text-amber-400',
//             resolved: 'bg-indigo-500/20 text-indigo-400',
//             closed: 'bg-success/20 text-success',
//         }
//         return colors[status] || 'bg-[#1E293B] text-textSecondary'
//     }

//     // Get status label
//     const getStatusLabel = (status) => {
//         const labels = {
//             open: 'Open',
//             in_progress: 'In Progress',
//             resolved: 'Resolved',
//             closed: 'Closed',
//         }
//         return labels[status] || status
//     }

//     // Get type label
//     const getTypeLabel = (type) => {
//         const labels = {
//             complaint: 'Complaint',
//             return: 'Return',
//             delivery_issue: 'Delivery Issue',
//             damaged_goods: 'Damaged Goods',
//             refund: 'Refund',
//             technical: 'Technical',
//             other: 'Other',
//         }
//         return labels[type] || type
//     }

//     // Get type icon
//     const getTypeIcon = (type) => {
//         const icons = {
//             complaint: <AlertCircle className="w-4 h-4" />,
//             return: <RefreshCw className="w-4 h-4" />,
//             delivery_issue: <Truck className="w-4 h-4" />,
//             damaged_goods: <AlertTriangle className="w-4 h-4" />,
//             refund: <XCircle className="w-4 h-4" />,
//             technical: <Settings className="w-4 h-4" />,
//             other: <MoreVertical className="w-4 h-4" />,
//         }
//         return icons[type] || null
//     }

//     // Status options for dropdown
//     const statusOptions = [
//         { value: 'open', label: 'Open', icon: <AlertCircle className="w-3 h-3 text-danger" /> },
//         { value: 'in_progress', label: 'In Progress', icon: <Clock className="w-3 h-3 text-amber-400" /> },
//         { value: 'resolved', label: 'Resolved', icon: <CheckCircle className="w-3 h-3 text-indigo-400" /> },
//         { value: 'closed', label: 'Closed', icon: <CheckCircle className="w-3 h-3 text-success" /> },
//     ]

//     // More options
//     const moreOptions = [
//         { label: 'View Details', icon: <Eye className="w-4 h-4" />, action: 'view' },
//         { label: 'Edit Issue', icon: <Edit className="w-4 h-4" />, action: 'edit' },
//         { label: 'Delete Issue', icon: <Trash2 className="w-4 h-4 text-danger" />, action: 'delete' },
//         { label: 'Email Customer', icon: <Mail className="w-4 h-4" />, action: 'email' },
//     ]

//     // Filter and sort issues
//     const filteredIssues = issues.filter(issue => {
//         const issueNumber = issue.issueNumber || ''
//         const title = issue.title || ''
//         const customerName = issue.customer?.name || ''
//         const customerEmail = issue.customer?.email || ''
//         const orderNumber = issue.orderNumber || ''
//         const description = issue.description || ''
        
//         const matchesSearch = 
//             issueNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             description.toLowerCase().includes(searchQuery.toLowerCase())
        
//         const matchesStatus = filterStatus === 'all' || issue.status === filterStatus
//         const matchesPriority = filterPriority === 'all' || issue.priority === filterPriority
//         const matchesType = filterType === 'all' || issue.type === filterType
        
//         return matchesSearch && matchesStatus && matchesPriority && matchesType
//     })

//     // Sort issues
//     const sortedIssues = [...filteredIssues].sort((a, b) => {
//         if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
//         if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
//         if (sortBy === 'priority') {
//             const priorityOrder = { high: 0, medium: 1, low: 2 }
//             return priorityOrder[a.priority] - priorityOrder[b.priority]
//         }
//         if (sortBy === 'status') {
//             const statusOrder = { open: 0, in_progress: 1, resolved: 2, closed: 3 }
//             return statusOrder[a.status] - statusOrder[b.status]
//         }
//         return 0
//     })

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-textSecondary">Loading issues...</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Issues</h1>
//                     <p className="text-desc">
//                         Track and manage support tickets and customer issues
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <button
//                         onClick={() => setShowFilters(!showFilters)}
//                         className="btn-secondary"
//                     >
//                         <Filter className="w-4 h-4" />
//                         Filter
//                     </button>
//                     <button
//                         onClick={() => setShowCreateModal(true)}
//                         className="btn-primary shadow-lg shadow-indigo-500/25"
//                     >
//                         <Plus className="w-4 h-4" />
//                         New Issue
//                     </button>
//                 </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
//                 <div className="card p-3 text-center hover:border-indigo-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('all')}>
//                     <div className="text-title text-indigo-400">{stats.total}</div>
//                     <div className="text-xs text-textSecondary">Total</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-red-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('open')}>
//                     <div className="text-title text-danger">{stats.open}</div>
//                     <div className="text-xs text-textSecondary">Open</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('in_progress')}>
//                     <div className="text-title text-amber-400">{stats.inProgress}</div>
//                     <div className="text-xs text-textSecondary">In Progress</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-indigo-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('resolved')}>
//                     <div className="text-title text-indigo-400">{stats.resolved}</div>
//                     <div className="text-xs text-textSecondary">Resolved</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-success/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('closed')}>
//                     <div className="text-title text-success">{stats.closed}</div>
//                     <div className="text-xs text-textSecondary">Closed</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-danger/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterPriority('high')}>
//                     <div className="text-title text-danger">{stats.highPriority}</div>
//                     <div className="text-xs text-textSecondary">High Priority</div>
//                 </div>
//                 <div className="card p-3 text-center hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterPriority('medium')}>
//                     <div className="text-title text-amber-400">{stats.mediumPriority}</div>
//                     <div className="text-xs text-textSecondary">Medium Priority</div>
//                 </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <div className="flex-1 relative">
//                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
//                         <input
//                             type="text"
//                             placeholder="Search issues by ID, title, customer, or order..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full input-field pl-12"
//                         />
//                     </div>
//                     <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="input-field w-40"
//                     >
//                         <option value="newest">Newest</option>
//                         <option value="oldest">Oldest</option>
//                         <option value="priority">Priority</option>
//                         <option value="status">Status</option>
//                     </select>
//                 </div>

//                 {/* Filter Row */}
//                 <AnimatePresence>
//                     {showFilters && (
//                         <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="flex flex-wrap gap-3 pt-2"
//                         >
//                             <select
//                                 value={filterStatus}
//                                 onChange={(e) => setFilterStatus(e.target.value)}
//                                 className="input-field w-40"
//                             >
//                                 <option value="all">All Status</option>
//                                 <option value="open">Open</option>
//                                 <option value="in_progress">In Progress</option>
//                                 <option value="resolved">Resolved</option>
//                                 <option value="closed">Closed</option>
//                             </select>
//                             <select
//                                 value={filterPriority}
//                                 onChange={(e) => setFilterPriority(e.target.value)}
//                                 className="input-field w-40"
//                             >
//                                 <option value="all">All Priority</option>
//                                 <option value="high">High</option>
//                                 <option value="medium">Medium</option>
//                                 <option value="low">Low</option>
//                             </select>
//                             <select
//                                 value={filterType}
//                                 onChange={(e) => setFilterType(e.target.value)}
//                                 className="input-field w-48"
//                             >
//                                 <option value="all">All Types</option>
//                                 <option value="complaint">Complaint</option>
//                                 <option value="return">Return</option>
//                                 <option value="delivery_issue">Delivery Issue</option>
//                                 <option value="damaged_goods">Damaged Goods</option>
//                                 <option value="refund">Refund</option>
//                                 <option value="technical">Technical</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>

//             {/* Issues List */}
//             <div className="space-y-4">
//                 {sortedIssues.length === 0 ? (
//                     <div className="card p-12 text-center">
//                         <AlertCircle className="w-16 h-16 text-textSecondary mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
//                         <p className="text-desc">
//                             {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || filterType !== 'all'
//                                 ? 'No issues match your search criteria'
//                                 : 'All customer issues and tickets will appear here'}
//                         </p>
//                     </div>
//                 ) : (
//                     sortedIssues.map((issue, index) => {
//                         const issueId = issue._id || issue.id
//                         return (
//                             <motion.div
//                                 key={issueId}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3, delay: index * 0.03 }}
//                                 className={`card p-5 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer ${
//                                     issue.priority === 'high' ? 'border-l-4 border-l-danger' :
//                                     issue.priority === 'medium' ? 'border-l-4 border-l-amber-500' :
//                                     'border-l-4 border-l-success'
//                                 }`}
//                                 onClick={() => handleViewIssue(issue)}
//                             >
//                                 <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
//                                     <div className="flex-1">
//                                         <div className="flex flex-wrap items-center gap-2 mb-2">
//                                             <span className="text-sm font-semibold text-indigo-400">{issue.issueNumber}</span>
//                                             <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(issue.status)}`}>
//                                                 {getStatusLabel(issue.status)}
//                                             </span>
//                                             <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(issue.priority)}`}>
//                                                 {getPriorityIcon(issue.priority)}
//                                                 {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
//                                             </span>
//                                             <span className="px-2 py-0.5 rounded-full bg-[#1E293B] text-textSecondary text-xs flex items-center gap-1">
//                                                 {getTypeIcon(issue.type)}
//                                                 {getTypeLabel(issue.type)}
//                                             </span>
//                                             {issue.orderNumber && issue.orderNumber !== 'N/A' && (
//                                                 <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
//                                                     Order: {issue.orderNumber}
//                                                 </span>
//                                             )}
//                                         </div>
//                                         <h3 className="font-semibold text-white">{issue.title}</h3>
//                                         <p className="text-sm text-textSecondary mt-1 line-clamp-2">{issue.description}</p>
//                                         <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-textSecondary">
//                                             <span className="flex items-center gap-1">
//                                                 <User className="w-3 h-3" />
//                                                 {issue.customer?.name || 'Unknown'}
//                                             </span>
//                                             <span className="flex items-center gap-1">
//                                                 <Mail className="w-3 h-3" />
//                                                 {issue.customer?.email || 'N/A'}
//                                             </span>
//                                             <span className="flex items-center gap-1">
//                                                 <Calendar className="w-3 h-3" />
//                                                 {new Date(issue.createdAt).toLocaleDateString()}
//                                             </span>
//                                             {issue.assignedTo && (
//                                                 <span className="flex items-center gap-1">
//                                                     <Users className="w-3 h-3" />
//                                                     {issue.assignedTo}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         {/* View Button */}
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 handleViewIssue(issue)
//                                             }}
//                                             className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                             title="View Details"
//                                         >
//                                             <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
//                                         </button>

//                                         {/* Status Update Dropdown */}
//                                         <div className="relative" ref={statusDropdownRef}>
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation()
//                                                     setShowStatusDropdown(showStatusDropdown === issueId ? null : issueId)
//                                                     setShowMoreOptions(null)
//                                                 }}
//                                                 className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                                 title="Update Status"
//                                             >
//                                                 <RefreshCw className="w-4 h-4 text-textSecondary hover:text-white" />
//                                             </button>
                                            
//                                             <AnimatePresence>
//                                                 {showStatusDropdown === issueId && (
//                                                     <motion.div
//                                                         initial={{ opacity: 0, scale: 0.95, y: -5 }}
//                                                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                                                         exit={{ opacity: 0, scale: 0.95, y: -5 }}
//                                                         className="absolute right-0 top-full mt-1 w-48 glass rounded-2xl border border-border shadow-2xl overflow-hidden z-20"
//                                                         onClick={(e) => e.stopPropagation()}
//                                                     >
//                                                         <div className="py-1">
//                                                             {statusOptions.map((option) => (
//                                                                 <button
//                                                                     key={option.value}
//                                                                     onClick={() => {
//                                                                         updateIssueStatus(issueId, option.value)
//                                                                     }}
//                                                                     className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-2 ${
//                                                                         issue.status === option.value ? 'bg-indigo-500/10 text-indigo-400' : 'text-textSecondary'
//                                                                     }`}
//                                                                 >
//                                                                     {option.icon}
//                                                                     {option.label}
//                                                                     {issue.status === option.value && (
//                                                                         <Check className="w-3 h-3 ml-auto text-indigo-400" />
//                                                                     )}
//                                                                 </button>
//                                                             ))}
//                                                         </div>
//                                                     </motion.div>
//                                                 )}
//                                             </AnimatePresence>
//                                         </div>

//                                         {/* Delete Button */}
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 handleDeleteIssue(issueId)
//                                             }}
//                                             className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200"
//                                             title="Delete Issue"
//                                         >
//                                             <Trash2 className="w-4 h-4 text-danger" />
//                                         </button>

//                                         {/* More Options Dropdown */}
//                                         <div className="relative" ref={moreOptionsRef}>
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation()
//                                                     setShowMoreOptions(showMoreOptions === issueId ? null : issueId)
//                                                     setShowStatusDropdown(null)
//                                                 }}
//                                                 className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                                 title="More Options"
//                                             >
//                                                 <MoreVertical className="w-4 h-4 text-textSecondary hover:text-white" />
//                                             </button>

//                                             <AnimatePresence>
//                                                 {showMoreOptions === issueId && (
//                                                     <motion.div
//                                                         initial={{ opacity: 0, scale: 0.95, y: -5 }}
//                                                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                                                         exit={{ opacity: 0, scale: 0.95, y: -5 }}
//                                                         className="absolute right-0 top-full mt-1 w-48 glass rounded-2xl border border-border shadow-2xl overflow-hidden z-20"
//                                                         onClick={(e) => e.stopPropagation()}
//                                                     >
//                                                         <div className="py-1">
//                                                             {moreOptions.map((option, idx) => (
//                                                                 <button
//                                                                     key={idx}
//                                                                     onClick={() => {
//                                                                         if (option.action === 'view') {
//                                                                             handleViewIssue(issue)
//                                                                         } else if (option.action === 'delete') {
//                                                                             handleDeleteIssue(issueId)
//                                                                         } else if (option.action === 'edit') {
//                                                                             toast.info('Edit functionality coming soon')
//                                                                         } else if (option.action === 'email') {
//                                                                             toast.info('Email customer functionality coming soon')
//                                                                         }
//                                                                         setShowMoreOptions(null)
//                                                                     }}
//                                                                     className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-2 ${
//                                                                         option.action === 'delete' ? 'text-danger' : 'text-textSecondary'
//                                                                     }`}
//                                                                 >
//                                                                     {option.icon}
//                                                                     {option.label}
//                                                                 </button>
//                                                             ))}
//                                                         </div>
//                                                     </motion.div>
//                                                 )}
//                                             </AnimatePresence>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         )
//                     })
//                 )}
//             </div>

//             {/* Create Issue Modal */}
//             <AnimatePresence>
//                 {showCreateModal && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={handleCloseCreateModal}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-title">Create New Issue</h2>
//                                     <p className="text-sm text-textSecondary">
//                                         Log a support ticket or customer issue
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={handleCloseCreateModal}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <XIcon className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             <form onSubmit={handleCreateIssue} className="space-y-4">
//                                 {/* Title */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Issue Title *</label>
//                                     <input
//                                         type="text"
//                                         value={formData.title}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                                         placeholder="Brief summary of the issue"
//                                         className="input-field"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Type, Priority, Category */}
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Issue Type *</label>
//                                         <select
//                                             value={formData.type}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
//                                             className="input-field"
//                                             required
//                                         >
//                                             <option value="complaint">Complaint</option>
//                                             <option value="return">Return</option>
//                                             <option value="delivery_issue">Delivery Issue</option>
//                                             <option value="damaged_goods">Damaged Goods</option>
//                                             <option value="refund">Refund</option>
//                                             <option value="technical">Technical</option>
//                                             <option value="other">Other</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Priority</label>
//                                         <select
//                                             value={formData.priority}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="high">High</option>
//                                             <option value="medium">Medium</option>
//                                             <option value="low">Low</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Category</label>
//                                         <select
//                                             value={formData.category}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="general">General</option>
//                                             <option value="shipping">Shipping</option>
//                                             <option value="product">Product</option>
//                                             <option value="billing">Billing</option>
//                                             <option value="technical">Technical</option>
//                                             <option value="customer_service">Customer Service</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 {/* Customer & Order */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Customer</label>
//                                         <input
//                                             type="text"
//                                             placeholder="Search customer by name or email"
//                                             className="input-field"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Order ID</label>
//                                         <input
//                                             type="text"
//                                             value={formData.orderId}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, orderId: e.target.value }))}
//                                             placeholder="ORD-XXXX"
//                                             className="input-field"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Description */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Description *</label>
//                                     <textarea
//                                         value={formData.description}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                                         placeholder="Detailed description of the issue..."
//                                         rows="4"
//                                         className="input-field"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Source & Assigned To */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Source</label>
//                                         <select
//                                             value={formData.source}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="email">Email</option>
//                                             <option value="phone">Phone</option>
//                                             <option value="chat">Chat</option>
//                                             <option value="social_media">Social Media</option>
//                                             <option value="in_person">In Person</option>
//                                             <option value="order">From Order</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1.5">Assign To</label>
//                                         <select
//                                             value={formData.assignedTo}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
//                                             className="input-field"
//                                         >
//                                             <option value="">Unassigned</option>
//                                             <option value="John Doe">John Doe</option>
//                                             <option value="Jane Smith">Jane Smith</option>
//                                             <option value="Bob Johnson">Bob Johnson</option>
//                                             <option value="Alice Brown">Alice Brown</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 {/* Tags */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Tags</label>
//                                     <input
//                                         type="text"
//                                         placeholder="Add tags separated by commas (e.g., urgent, refund, shipping)"
//                                         className="input-field"
//                                     />
//                                 </div>

//                                 {/* Buttons */}
//                                 <div className="flex gap-3 pt-4 border-t border-border">
//                                     <button
//                                         type="button"
//                                         onClick={handleCloseCreateModal}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                                 Creating...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Save className="w-4 h-4" />
//                                                 Create Issue
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </form>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Issue Details Modal */}
//             <AnimatePresence>
//                 {showDetailsModal && selectedIssue && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={handleCloseDetailsModal}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-start justify-between mb-6">
//                                 <div>
//                                     <div className="flex flex-wrap items-center gap-2">
//                                         <h2 className="text-title">{selectedIssue.issueNumber}</h2>
//                                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(selectedIssue.status)}`}>
//                                             {getStatusLabel(selectedIssue.status)}
//                                         </span>
//                                     </div>
//                                     <h3 className="text-lg font-semibold mt-1">{selectedIssue.title}</h3>
//                                 </div>
//                                 <button
//                                     onClick={handleCloseDetailsModal}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <XIcon className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             {/* Status Update */}
//                             <div className="flex flex-wrap gap-2 mb-4">
//                                 {['open', 'in_progress', 'resolved', 'closed'].map((status) => (
//                                     <button
//                                         key={status}
//                                         onClick={() => {
//                                             const issueId = selectedIssue._id || selectedIssue.id
//                                             updateIssueStatus(issueId, status)
//                                             handleCloseDetailsModal()
//                                         }}
//                                         className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
//                                             selectedIssue.status === status
//                                                 ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
//                                                 : 'bg-card border border-border text-textSecondary hover:border-indigo-500/50'
//                                         }`}
//                                     >
//                                         Set {getStatusLabel(status)}
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Issue Details Grid */}
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Type</div>
//                                     <div className="text-sm font-medium flex items-center gap-1">
//                                         {getTypeIcon(selectedIssue.type)}
//                                         {getTypeLabel(selectedIssue.type)}
//                                     </div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Priority</div>
//                                     <div className={`text-sm font-medium flex items-center gap-1 ${getPriorityColor(selectedIssue.priority)}`}>
//                                         {getPriorityIcon(selectedIssue.priority)}
//                                         {selectedIssue.priority.charAt(0).toUpperCase() + selectedIssue.priority.slice(1)}
//                                     </div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Created</div>
//                                     <div className="text-sm font-medium">{new Date(selectedIssue.createdAt).toLocaleDateString()}</div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Assigned To</div>
//                                     <div className="text-sm font-medium">{selectedIssue.assignedTo || 'Unassigned'}</div>
//                                 </div>
//                             </div>

//                             {/* Customer & Order Info */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Customer</div>
//                                     <div className="text-sm font-medium">{selectedIssue.customer?.name || 'Unknown'}</div>
//                                     <div className="text-xs text-textSecondary">{selectedIssue.customer?.email || 'N/A'}</div>
//                                     <div className="text-xs text-textSecondary">{selectedIssue.customer?.phone || 'N/A'}</div>
//                                 </div>
//                                 <div className="p-3 rounded-xl bg-background border border-border">
//                                     <div className="text-xs text-textSecondary">Order & Source</div>
//                                     <div className="text-sm font-medium">Order: {selectedIssue.orderNumber || 'N/A'}</div>
//                                     <div className="text-xs text-textSecondary">Source: {selectedIssue.source}</div>
//                                     <div className="text-xs text-textSecondary">Category: {selectedIssue.category}</div>
//                                 </div>
//                             </div>

//                             {/* Description */}
//                             <div className="p-3 rounded-xl bg-background border border-border mb-4">
//                                 <div className="text-xs text-textSecondary mb-1">Description</div>
//                                 <p className="text-sm">{selectedIssue.description}</p>
//                             </div>

//                             {/* Tags */}
//                             {selectedIssue.tags && selectedIssue.tags.length > 0 && (
//                                 <div className="flex flex-wrap gap-1 mb-4">
//                                     {selectedIssue.tags.map((tag, index) => (
//                                         <span key={index} className="px-2 py-0.5 rounded-full bg-[#1E293B] text-textSecondary text-xs">
//                                             #{tag}
//                                         </span>
//                                     ))}
//                                 </div>
//                             )}

//                             {/* Resolution */}
//                             {selectedIssue.resolution && (
//                                 <div className="p-3 rounded-xl bg-success/5 border border-success/20 mb-4">
//                                     <div className="text-xs text-textSecondary">Resolution</div>
//                                     <p className="text-sm text-success">{selectedIssue.resolution}</p>
//                                     <div className="text-xs text-textSecondary mt-1">Resolved by: {selectedIssue.resolvedBy} on {new Date(selectedIssue.resolvedAt).toLocaleDateString()}</div>
//                                 </div>
//                             )}

//                             {/* Comments */}
//                             <div>
//                                 <h4 className="text-sm font-medium mb-3">Comments</h4>
//                                 <div className="space-y-2 max-h-48 overflow-y-auto">
//                                     {selectedIssue.comments?.map((comment, index) => (
//                                         <div key={index} className={`p-3 rounded-xl ${comment.isInternal ? 'bg-amber-500/5 border border-amber-500/20' : 'bg-background border border-border'}`}>
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="text-sm font-medium">{comment.user}</span>
//                                                     {comment.isInternal && (
//                                                         <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px]">Internal</span>
//                                                     )}
//                                                 </div>
//                                                 <span className="text-xs text-textSecondary">{new Date(comment.timestamp).toLocaleString()}</span>
//                                             </div>
//                                             <p className="text-sm mt-1">{comment.message}</p>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Add Comment */}
//                                 <div className="flex gap-2 mt-3">
//                                     <input
//                                         type="text"
//                                         placeholder="Add a comment..."
//                                         className="flex-1 input-field"
//                                         onKeyPress={(e) => {
//                                             if (e.key === 'Enter' && e.target.value.trim()) {
//                                                 const issueId = selectedIssue._id || selectedIssue.id
//                                                 handleAddComment(issueId, e.target.value, false)
//                                                 e.target.value = ''
//                                             }
//                                         }}
//                                     />
//                                     <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200">
//                                         <Send className="w-4 h-4" />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Actions */}
//                             <div className="flex gap-3 mt-6 pt-4 border-t border-border">
//                                 <button className="px-4 py-2 rounded-2xl bg-indigo-500/10 text-indigo-400 text-sm hover:bg-indigo-500/20 transition-colors duration-200 flex items-center gap-2">
//                                     <Mail className="w-4 h-4" />
//                                     Email Customer
//                                 </button>
//                                 <button className="btn-secondary">
//                                     <Link className="w-4 h-4" />
//                                     Link to Order
//                                 </button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     )
// }

// export default Issues




// src/pages/dashboard/Issues.jsx
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    AlertTriangle,
    Plus,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    MoreVertical,
    User,
    Package,
    Calendar,
    MessageSquare,
    Mail,
    Phone,
    Tag,
    Flag,
    AlertCircle,
    Check,
    X,
    Send,
    Paperclip,
    Link,
    Users,
    RefreshCw,
    BarChart3,
    TrendingUp,
    TrendingDown,
    Zap,
    Award,
    Target,
    Activity,
    ChevronDown,
    ChevronRight,
    FolderOpen,
    FileText,
    Save,
    X as XIcon,
    Truck,
    Settings,
    ChevronUp,
    ChevronLeft,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const Issues = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterPriority, setFilterPriority] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sortBy, setSortBy] = useState('newest')
    const [showStatusDropdown, setShowStatusDropdown] = useState(null)
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        pages: 0,
    })

    // Stats
    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0,
        highPriority: 0,
        mediumPriority: 0,
        lowPriority: 0,
    })

    // Create issue form state
    const [formData, setFormData] = useState({
        title: '',
        type: 'complaint',
        priority: 'medium',
        customerId: '',
        customerSearch: '',
        orderId: '',
        description: '',
        category: 'general',
        source: 'email',
        assignedTo: '',
        tags: [],
    })

    // Refs for dropdowns
    const statusDropdownRef = useRef(null)

    // Get auth token
    const getToken = () => localStorage.getItem('token')

    // Fetch issues from API
    const fetchIssues = async () => {
        try {
            setLoading(true)
            console.log('📤 Fetching issues...')
            
            const token = getToken()
            const response = await api.get('/issues', {
                params: {
                    page: pagination.page,
                    limit: pagination.limit,
                    search: searchQuery || undefined,
                    status: filterStatus !== 'all' ? filterStatus : undefined,
                    priority: filterPriority !== 'all' ? filterPriority : undefined,
                    type: filterType !== 'all' ? filterType : undefined,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            console.log('✅ Issues fetched:', response.data)
            
            if (response.data.success) {
                setIssues(response.data.issues || [])
                setPagination(prev => ({
                    ...prev,
                    total: response.data.pagination?.total || 0,
                    pages: response.data.pagination?.pages || 0,
                }))
            } else {
                toast.error(response.data.message || 'Failed to load issues')
            }
        } catch (error) {
            console.error('❌ Fetch issues error:', error)
            toast.error(error.response?.data?.message || 'Failed to load issues')
            setIssues([])
        } finally {
            setLoading(false)
        }
    }

    // Fetch stats from API
    const fetchStats = async () => {
        try {
            console.log('📤 Fetching stats...')
            const token = getToken()
            const response = await api.get('/issues/stats', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            console.log('✅ Stats fetched:', response.data)
            
            if (response.data.success) {
                const statusStats = response.data.stats?.status || []
                const priorityStats = response.data.stats?.priority || []
                
                setStats({
                    total: response.data.stats?.total || 0,
                    open: statusStats.find(s => s._id === 'open')?.count || 0,
                    inProgress: statusStats.find(s => s._id === 'in_progress')?.count || 0,
                    resolved: statusStats.find(s => s._id === 'resolved')?.count || 0,
                    closed: statusStats.find(s => s._id === 'closed')?.count || 0,
                    highPriority: priorityStats.find(p => p._id === 'high')?.count || 0,
                    mediumPriority: priorityStats.find(p => p._id === 'medium')?.count || 0,
                    lowPriority: priorityStats.find(p => p._id === 'low')?.count || 0,
                })
            }
        } catch (error) {
            console.error('❌ Fetch stats error:', error)
        }
    }

    // Create issue
    const handleCreateIssue = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            console.log('📝 Creating issue with data:', formData)
            
            const token = getToken()
            const issueData = {
                title: formData.title,
                type: formData.type,
                priority: formData.priority,
                customerId: formData.customerId || undefined,
                orderId: formData.orderId || undefined,
                description: formData.description,
                category: formData.category,
                source: formData.source,
                assignedTo: formData.assignedTo || undefined,
                tags: formData.tags,
            }

            const response = await api.post('/issues', issueData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            console.log('✅ Issue created:', response.data)
            
            if (response.data.success) {
                setIssues([response.data.issue, ...issues])
                fetchStats()
                toast.success('Issue created successfully!')
                handleCloseCreateModal()
            } else {
                toast.error(response.data.message || 'Failed to create issue')
            }
        } catch (error) {
            console.error('❌ Create issue error:', error)
            toast.error(error.response?.data?.message || 'Failed to create issue')
        } finally {
            setIsLoading(false)
        }
    }

    // Update issue status
    const updateIssueStatus = async (issueId, status, resolution = '') => {
        try {
            setIsLoading(true)
            console.log(`📝 Updating issue ${issueId} status to:`, status)
            
            const token = getToken()
            const response = await api.patch(`/issues/${issueId}/status`, { status, resolution }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            console.log('✅ Status updated:', response.data)
            
            if (response.data.success) {
                const updatedIssues = issues.map(issue => {
                    if (issue._id === issueId || issue.id === issueId) {
                        const updated = { ...issue, status }
                        if (status === 'resolved' || status === 'closed') {
                            updated.resolvedAt = new Date().toISOString()
                            updated.resolvedBy = 'System'
                            updated.resolution = resolution || 'Issue resolved'
                        }
                        return updated
                    }
                    return issue
                })
                
                setIssues(updatedIssues)
                fetchStats()
                setShowStatusDropdown(null)
                toast.success(`Issue status updated to ${status.replace('_', ' ')}`)
            } else {
                toast.error(response.data.message || 'Failed to update status')
            }
        } catch (error) {
            console.error('❌ Update status error:', error)
            toast.error(error.response?.data?.message || 'Failed to update status')
        } finally {
            setIsLoading(false)
        }
    }

    // Delete issue
    const handleDeleteIssue = async (issueId) => {
        if (window.confirm('Are you sure you want to delete this issue?')) {
            try {
                setIsLoading(true)
                console.log(`🗑️ Deleting issue:`, issueId)
                
                const token = getToken()
                const response = await api.delete(`/issues/${issueId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                console.log('✅ Issue deleted:', response.data)
                
                if (response.data.success) {
                    setIssues(issues.filter(i => i._id !== issueId && i.id !== issueId))
                    fetchStats()
                    toast.success('Issue deleted successfully')
                } else {
                    toast.error(response.data.message || 'Failed to delete issue')
                }
            } catch (error) {
                console.error('❌ Delete issue error:', error)
                toast.error(error.response?.data?.message || 'Failed to delete issue')
            } finally {
                setIsLoading(false)
            }
        }
    }

    // View issue details
    const handleViewIssue = async (issue) => {
        try {
            setIsLoading(true)
            const issueId = issue._id || issue.id
            console.log(`👁️ Viewing issue:`, issueId)
            
            const token = getToken()
            const response = await api.get(`/issues/${issueId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            console.log('✅ Issue details fetched:', response.data)
            
            if (response.data.success) {
                setSelectedIssue(response.data.issue)
                setShowDetailsModal(true)
            } else {
                toast.error(response.data.message || 'Failed to load issue details')
            }
        } catch (error) {
            console.error('❌ View issue error:', error)
            toast.error('Failed to load issue details')
        } finally {
            setIsLoading(false)
        }
    }

    // Add comment
    const handleAddComment = async (issueId, comment, isInternal = false) => {
        if (!comment.trim()) {
            toast.error('Please enter a comment')
            return
        }

        try {
            setIsLoading(true)
            console.log(`💬 Adding comment to issue ${issueId}:`, comment)
            
            const token = getToken()
            const response = await api.post(`/issues/${issueId}/comments`, { message: comment, isInternal }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            console.log('✅ Comment added:', response.data)
            
            if (response.data.success) {
                const updatedIssues = issues.map(issue => {
                    const id = issue._id || issue.id
                    if (id === issueId) {
                        return {
                            ...issue,
                            comments: [...(issue.comments || []), response.data.comment],
                        }
                    }
                    return issue
                })
                
                setIssues(updatedIssues)
                
                if (selectedIssue) {
                    const selectedId = selectedIssue._id || selectedIssue.id
                    if (selectedId === issueId) {
                        setSelectedIssue({
                            ...selectedIssue,
                            comments: [...(selectedIssue.comments || []), response.data.comment],
                        })
                    }
                }
                
                toast.success('Comment added successfully')
            } else {
                toast.error(response.data.message || 'Failed to add comment')
            }
        } catch (error) {
            console.error('❌ Add comment error:', error)
            toast.error(error.response?.data?.message || 'Failed to add comment')
        } finally {
            setIsLoading(false)
        }
    }

    // Load issues on mount
    useEffect(() => {
        console.log('🔄 Issues component mounted')
        fetchIssues()
        fetchStats()
    }, [])

    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchIssues()
        }, 500)
        return () => clearTimeout(timer)
    }, [searchQuery, filterStatus, filterPriority, filterType, sortBy, pagination.page])

    // Handle click outside dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setShowStatusDropdown(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Handle close create modal
    const handleCloseCreateModal = () => {
        setShowCreateModal(false)
        setFormData({
            title: '',
            type: 'complaint',
            priority: 'medium',
            customerId: '',
            customerSearch: '',
            orderId: '',
            description: '',
            category: 'general',
            source: 'email',
            assignedTo: '',
            tags: [],
        })
    }

    // Handle close details modal
    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false)
        setSelectedIssue(null)
    }

    // Get priority color
    const getPriorityColor = (priority) => {
        const colors = {
            high: 'bg-danger/20 text-danger',
            medium: 'bg-amber-500/20 text-amber-400',
            low: 'bg-success/20 text-success',
        }
        return colors[priority] || 'bg-[#1E293B] text-textSecondary'
    }

    // Get priority icon
    const getPriorityIcon = (priority) => {
        const icons = {
            high: <AlertCircle className="w-4 h-4" />,
            medium: <AlertTriangle className="w-4 h-4" />,
            low: <CheckCircle className="w-4 h-4" />,
        }
        return icons[priority] || null
    }

    // Get status color
    const getStatusColor = (status) => {
        const colors = {
            open: 'bg-danger/20 text-danger',
            in_progress: 'bg-amber-500/20 text-amber-400',
            resolved: 'bg-indigo-500/20 text-indigo-400',
            closed: 'bg-success/20 text-success',
        }
        return colors[status] || 'bg-[#1E293B] text-textSecondary'
    }

    // Get status label
    const getStatusLabel = (status) => {
        const labels = {
            open: 'Open',
            in_progress: 'In Progress',
            resolved: 'Resolved',
            closed: 'Closed',
        }
        return labels[status] || status
    }

    // Get type label
    const getTypeLabel = (type) => {
        const labels = {
            complaint: 'Complaint',
            return: 'Return',
            delivery_issue: 'Delivery Issue',
            damaged_goods: 'Damaged Goods',
            refund: 'Refund',
            technical: 'Technical',
            other: 'Other',
        }
        return labels[type] || type
    }

    // Get type icon
    const getTypeIcon = (type) => {
        const icons = {
            complaint: <AlertCircle className="w-4 h-4" />,
            return: <RefreshCw className="w-4 h-4" />,
            delivery_issue: <Truck className="w-4 h-4" />,
            damaged_goods: <AlertTriangle className="w-4 h-4" />,
            refund: <XCircle className="w-4 h-4" />,
            technical: <Settings className="w-4 h-4" />,
            other: <MoreVertical className="w-4 h-4" />,
        }
        return icons[type] || null
    }

    // Status options for dropdown
    const statusOptions = [
        { value: 'open', label: 'Open', icon: <AlertCircle className="w-3 h-3 text-danger" /> },
        { value: 'in_progress', label: 'In Progress', icon: <Clock className="w-3 h-3 text-amber-400" /> },
        { value: 'resolved', label: 'Resolved', icon: <CheckCircle className="w-3 h-3 text-indigo-400" /> },
        { value: 'closed', label: 'Closed', icon: <CheckCircle className="w-3 h-3 text-success" /> },
    ]

    // Filter and sort issues
    const filteredIssues = issues.filter(issue => {
        const issueNumber = issue.issueNumber || ''
        const title = issue.title || ''
        const customerName = issue.customer?.name || ''
        const customerEmail = issue.customer?.email || ''
        const orderNumber = issue.orderNumber || ''
        const description = issue.description || ''
        
        const matchesSearch = 
            issueNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            description.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesStatus = filterStatus === 'all' || issue.status === filterStatus
        const matchesPriority = filterPriority === 'all' || issue.priority === filterPriority
        const matchesType = filterType === 'all' || issue.type === filterType
        
        return matchesSearch && matchesStatus && matchesPriority && matchesType
    })

    // Sort issues
    const sortedIssues = [...filteredIssues].sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
        if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
        if (sortBy === 'priority') {
            const priorityOrder = { high: 0, medium: 1, low: 2 }
            return priorityOrder[a.priority] - priorityOrder[b.priority]
        }
        if (sortBy === 'status') {
            const statusOrder = { open: 0, in_progress: 1, resolved: 2, closed: 3 }
            return statusOrder[a.status] - statusOrder[b.status]
        }
        return 0
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-textSecondary">Loading issues...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Issues</h1>
                    <p className="text-desc">
                        Track and manage support tickets and customer issues
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-secondary"
                    >
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="btn-primary shadow-lg shadow-indigo-500/25"
                    >
                        <Plus className="w-4 h-4" />
                        New Issue
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                <div className="card p-3 text-center hover:border-indigo-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('all')}>
                    <div className="text-title text-indigo-400">{stats.total}</div>
                    <div className="text-xs text-textSecondary">Total</div>
                </div>
                <div className="card p-3 text-center hover:border-red-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('open')}>
                    <div className="text-title text-danger">{stats.open}</div>
                    <div className="text-xs text-textSecondary">Open</div>
                </div>
                <div className="card p-3 text-center hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('in_progress')}>
                    <div className="text-title text-amber-400">{stats.inProgress}</div>
                    <div className="text-xs text-textSecondary">In Progress</div>
                </div>
                <div className="card p-3 text-center hover:border-indigo-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('resolved')}>
                    <div className="text-title text-indigo-400">{stats.resolved}</div>
                    <div className="text-xs text-textSecondary">Resolved</div>
                </div>
                <div className="card p-3 text-center hover:border-success/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterStatus('closed')}>
                    <div className="text-title text-success">{stats.closed}</div>
                    <div className="text-xs text-textSecondary">Closed</div>
                </div>
                <div className="card p-3 text-center hover:border-danger/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterPriority('high')}>
                    <div className="text-title text-danger">{stats.highPriority}</div>
                    <div className="text-xs text-textSecondary">High Priority</div>
                </div>
                <div className="card p-3 text-center hover:border-amber-500/50 transition-all duration-300 cursor-pointer" onClick={() => setFilterPriority('medium')}>
                    <div className="text-title text-amber-400">{stats.mediumPriority}</div>
                    <div className="text-xs text-textSecondary">Medium Priority</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                        <input
                            type="text"
                            placeholder="Search issues by ID, title, customer, or order..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full input-field pl-12"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input-field w-40"
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="priority">Priority</option>
                        <option value="status">Status</option>
                    </select>
                </div>

                {/* Filter Row */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-wrap gap-3 pt-2"
                        >
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="input-field w-40"
                            >
                                <option value="all">All Status</option>
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="input-field w-40"
                            >
                                <option value="all">All Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="input-field w-48"
                            >
                                <option value="all">All Types</option>
                                <option value="complaint">Complaint</option>
                                <option value="return">Return</option>
                                <option value="delivery_issue">Delivery Issue</option>
                                <option value="damaged_goods">Damaged Goods</option>
                                <option value="refund">Refund</option>
                                <option value="technical">Technical</option>
                                <option value="other">Other</option>
                            </select>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Issues List */}
            <div className="space-y-4">
                {sortedIssues.length === 0 ? (
                    <div className="card p-12 text-center">
                        <AlertCircle className="w-16 h-16 text-textSecondary mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
                        <p className="text-desc">
                            {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' || filterType !== 'all'
                                ? 'No issues match your search criteria'
                                : 'All customer issues and tickets will appear here'}
                        </p>
                    </div>
                ) : (
                    sortedIssues.map((issue, index) => {
                        const issueId = issue._id || issue.id
                        return (
                            <motion.div
                                key={issueId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                className={`card p-5 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer ${
                                    issue.priority === 'high' ? 'border-l-4 border-l-danger' :
                                    issue.priority === 'medium' ? 'border-l-4 border-l-amber-500' :
                                    'border-l-4 border-l-success'
                                }`}
                                onClick={() => handleViewIssue(issue)}
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="text-sm font-semibold text-indigo-400">{issue.issueNumber}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(issue.status)}`}>
                                                {getStatusLabel(issue.status)}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(issue.priority)}`}>
                                                {getPriorityIcon(issue.priority)}
                                                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-[#1E293B] text-textSecondary text-xs flex items-center gap-1">
                                                {getTypeIcon(issue.type)}
                                                {getTypeLabel(issue.type)}
                                            </span>
                                            {issue.orderNumber && issue.orderNumber !== 'N/A' && (
                                                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
                                                    Order: {issue.orderNumber}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-white">{issue.title}</h3>
                                        <p className="text-sm text-textSecondary mt-1 line-clamp-2">{issue.description}</p>
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-textSecondary">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3" />
                                                {issue.customer?.name || 'Unknown'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                {issue.customer?.email || 'N/A'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(issue.createdAt).toLocaleDateString()}
                                            </span>
                                            {issue.assignedTo && (
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    {issue.assignedTo}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {/* View Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleViewIssue(issue)
                                            }}
                                            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
                                        </button>

                                        {/* Status Update Dropdown */}
                                        <div className="relative" ref={statusDropdownRef}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setShowStatusDropdown(showStatusDropdown === issueId ? null : issueId)
                                                }}
                                                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                                title="Update Status"
                                            >
                                                <RefreshCw className="w-4 h-4 text-textSecondary hover:text-white" />
                                            </button>
                                            
                                            <AnimatePresence>
                                                {showStatusDropdown === issueId && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                                        className="absolute right-0 top-full mt-1 w-48 glass rounded-2xl border border-border shadow-2xl overflow-hidden z-20"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <div className="py-1">
                                                            {statusOptions.map((option) => (
                                                                <button
                                                                    key={option.value}
                                                                    onClick={() => {
                                                                        updateIssueStatus(issueId, option.value)
                                                                    }}
                                                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors duration-200 flex items-center gap-2 ${
                                                                        issue.status === option.value ? 'bg-indigo-500/10 text-indigo-400' : 'text-textSecondary'
                                                                    }`}
                                                                >
                                                                    {option.icon}
                                                                    {option.label}
                                                                    {issue.status === option.value && (
                                                                        <Check className="w-3 h-3 ml-auto text-indigo-400" />
                                                                    )}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Delete Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteIssue(issueId)
                                            }}
                                            className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200"
                                            title="Delete Issue"
                                        >
                                            <Trash2 className="w-4 h-4 text-danger" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })
                )}
            </div>

            {/* Create Issue Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={handleCloseCreateModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass rounded-3xl border border-border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-title">Create New Issue</h2>
                                    <p className="text-sm text-textSecondary">
                                        Log a support ticket or customer issue
                                    </p>
                                </div>
                                <button
                                    onClick={handleCloseCreateModal}
                                    className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                >
                                    <XIcon className="w-5 h-5 text-textSecondary hover:text-white" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateIssue} className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Issue Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Brief summary of the issue"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                {/* Type, Priority, Category */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Issue Type *</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                                            className="input-field"
                                            required
                                        >
                                            <option value="complaint">Complaint</option>
                                            <option value="return">Return</option>
                                            <option value="delivery_issue">Delivery Issue</option>
                                            <option value="damaged_goods">Damaged Goods</option>
                                            <option value="refund">Refund</option>
                                            <option value="technical">Technical</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Priority</label>
                                        <select
                                            value={formData.priority}
                                            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                                            className="input-field"
                                        >
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                            className="input-field"
                                        >
                                            <option value="general">General</option>
                                            <option value="shipping">Shipping</option>
                                            <option value="product">Product</option>
                                            <option value="billing">Billing</option>
                                            <option value="technical">Technical</option>
                                            <option value="customer_service">Customer Service</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Customer & Order */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Customer</label>
                                        <input
                                            type="text"
                                            placeholder="Search customer by name or email"
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Order ID</label>
                                        <input
                                            type="text"
                                            value={formData.orderId}
                                            onChange={(e) => setFormData(prev => ({ ...prev, orderId: e.target.value }))}
                                            placeholder="ORD-XXXX"
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Description *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Detailed description of the issue..."
                                        rows="4"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                {/* Source & Assigned To */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Source</label>
                                        <select
                                            value={formData.source}
                                            onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                                            className="input-field"
                                        >
                                            <option value="email">Email</option>
                                            <option value="phone">Phone</option>
                                            <option value="chat">Chat</option>
                                            <option value="social_media">Social Media</option>
                                            <option value="in_person">In Person</option>
                                            <option value="order">From Order</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Assign To</label>
                                        <select
                                            value={formData.assignedTo}
                                            onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                                            className="input-field"
                                        >
                                            <option value="">Unassigned</option>
                                            <option value="John Doe">John Doe</option>
                                            <option value="Jane Smith">Jane Smith</option>
                                            <option value="Bob Johnson">Bob Johnson</option>
                                            <option value="Alice Brown">Alice Brown</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Tags</label>
                                    <input
                                        type="text"
                                        placeholder="Add tags separated by commas (e.g., urgent, refund, shipping)"
                                        className="input-field"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-border">
                                    <button
                                        type="button"
                                        onClick={handleCloseCreateModal}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Create Issue
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Issue Details Modal */}
            <AnimatePresence>
                {showDetailsModal && selectedIssue && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={handleCloseDetailsModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass rounded-3xl border border-border p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="text-title">{selectedIssue.issueNumber}</h2>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(selectedIssue.status)}`}>
                                            {getStatusLabel(selectedIssue.status)}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold mt-1">{selectedIssue.title}</h3>
                                </div>
                                <button
                                    onClick={handleCloseDetailsModal}
                                    className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                >
                                    <XIcon className="w-5 h-5 text-textSecondary hover:text-white" />
                                </button>
                            </div>

                            {/* Status Update */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {['open', 'in_progress', 'resolved', 'closed'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            const issueId = selectedIssue._id || selectedIssue.id
                                            updateIssueStatus(issueId, status)
                                            handleCloseDetailsModal()
                                        }}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                                            selectedIssue.status === status
                                                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                                                : 'bg-card border border-border text-textSecondary hover:border-indigo-500/50'
                                        }`}
                                    >
                                        Set {getStatusLabel(status)}
                                    </button>
                                ))}
                            </div>

                            {/* Issue Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-background border border-border">
                                    <div className="text-xs text-textSecondary">Type</div>
                                    <div className="text-sm font-medium flex items-center gap-1">
                                        {getTypeIcon(selectedIssue.type)}
                                        {getTypeLabel(selectedIssue.type)}
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-background border border-border">
                                    <div className="text-xs text-textSecondary">Priority</div>
                                    <div className={`text-sm font-medium flex items-center gap-1 ${getPriorityColor(selectedIssue.priority)}`}>
                                        {getPriorityIcon(selectedIssue.priority)}
                                        {selectedIssue.priority.charAt(0).toUpperCase() + selectedIssue.priority.slice(1)}
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-background border border-border">
                                    <div className="text-xs text-textSecondary">Created</div>
                                    <div className="text-sm font-medium">{new Date(selectedIssue.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div className="p-3 rounded-xl bg-background border border-border">
                                    <div className="text-xs text-textSecondary">Assigned To</div>
                                    <div className="text-sm font-medium">{selectedIssue.assignedTo || 'Unassigned'}</div>
                                </div>
                            </div>

                            {/* Customer & Order Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-background border border-border">
                                    <div className="text-xs text-textSecondary">Customer</div>
                                    <div className="text-sm font-medium">{selectedIssue.customer?.name || 'Unknown'}</div>
                                    <div className="text-xs text-textSecondary">{selectedIssue.customer?.email || 'N/A'}</div>
                                    <div className="text-xs text-textSecondary">{selectedIssue.customer?.phone || 'N/A'}</div>
                                </div>
                                <div className="p-3 rounded-xl bg-background border border-border">
                                    <div className="text-xs text-textSecondary">Order & Source</div>
                                    <div className="text-sm font-medium">Order: {selectedIssue.orderNumber || 'N/A'}</div>
                                    <div className="text-xs text-textSecondary">Source: {selectedIssue.source}</div>
                                    <div className="text-xs text-textSecondary">Category: {selectedIssue.category}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="p-3 rounded-xl bg-background border border-border mb-4">
                                <div className="text-xs text-textSecondary mb-1">Description</div>
                                <p className="text-sm">{selectedIssue.description}</p>
                            </div>

                            {/* Tags */}
                            {selectedIssue.tags && selectedIssue.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {selectedIssue.tags.map((tag, index) => (
                                        <span key={index} className="px-2 py-0.5 rounded-full bg-[#1E293B] text-textSecondary text-xs">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Resolution */}
                            {selectedIssue.resolution && (
                                <div className="p-3 rounded-xl bg-success/5 border border-success/20 mb-4">
                                    <div className="text-xs text-textSecondary">Resolution</div>
                                    <p className="text-sm text-success">{selectedIssue.resolution}</p>
                                    <div className="text-xs text-textSecondary mt-1">Resolved by: {selectedIssue.resolvedBy} on {new Date(selectedIssue.resolvedAt).toLocaleDateString()}</div>
                                </div>
                            )}

                            {/* Comments */}
                            <div>
                                <h4 className="text-sm font-medium mb-3">Comments</h4>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {selectedIssue.comments?.map((comment, index) => (
                                        <div key={index} className={`p-3 rounded-xl ${comment.isInternal ? 'bg-amber-500/5 border border-amber-500/20' : 'bg-background border border-border'}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">{comment.user}</span>
                                                    {comment.isInternal && (
                                                        <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px]">Internal</span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-textSecondary">{new Date(comment.timestamp).toLocaleString()}</span>
                                            </div>
                                            <p className="text-sm mt-1">{comment.message}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Add Comment */}
                                <div className="flex gap-2 mt-3">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="flex-1 input-field"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && e.target.value.trim()) {
                                                const issueId = selectedIssue._id || selectedIssue.id
                                                handleAddComment(issueId, e.target.value, false)
                                                e.target.value = ''
                                            }
                                        }}
                                    />
                                    <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                                <button className="px-4 py-2 rounded-2xl bg-indigo-500/10 text-indigo-400 text-sm hover:bg-indigo-500/20 transition-colors duration-200 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Customer
                                </button>
                                <button className="btn-secondary">
                                    <Link className="w-4 h-4" />
                                    Link to Order
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Issues