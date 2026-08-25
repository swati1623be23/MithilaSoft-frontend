// src/pages/dashboard/Leads.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MoreVertical, User, Calendar, Mail, Phone } from 'lucide-react'
import toast from 'react-hot-toast'
import { leadAPI } from '../../services/api'

const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost']

const statusBadgeColors = {
    new: 'bg-cyan-500/20 text-cyan-400',
    contacted: 'bg-indigo-500/20 text-indigo-400',
    qualified: 'bg-amber-500/20 text-amber-400',
    converted: 'bg-success/20 text-success',
    lost: 'bg-danger/20 text-danger',
}

const getStatusLabel = (status) => {
    if (!status) return 'New'
    return status.charAt(0).toUpperCase() + status.slice(1)
}

const getScoreColor = (score) => {
    if (score >= 80) return 'text-success'
    if (score >= 60) return 'text-amber-400'
    return 'text-danger'
}

const Leads = () => {
    const [leads, setLeads] = useState([])
    const [statusFilter, setStatusFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 })
    const [statusCounts, setStatusCounts] = useState({})
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        title: '',
        source: 'Website',
        status: 'new',
        score: 0,
    })
    const [isUpdating, setIsUpdating] = useState(false)
    const [editingLead, setEditingLead] = useState(null)

    const fetchLeads = async (nextPage = 1) => {
        try {
            setLoading(true)
            const params = {
                page: nextPage,
                limit: 10,
                search: searchQuery || undefined,
                status: statusFilter !== 'All' ? statusFilter.toLowerCase() : undefined,
            }
            const res = await leadAPI.getAll(params)
            setLeads(res.data.leads || [])
            setPagination(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 })
            setStatusCounts(res.data.statusCounts || {})
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to load leads')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLeads(page)
    }, [page, statusFilter, searchQuery])

    const openCreateModal = () => {
        setEditingLead(null)
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            title: '',
            source: 'Website',
            status: 'new',
            score: 0,
        })
        setShowModal(true)
    }

    const openEditModal = (lead) => {
        setEditingLead(lead)
        setFormData({
            firstName: lead.firstName || '',
            lastName: lead.lastName || '',
            email: lead.email || '',
            phone: lead.phone || '',
            company: lead.company || '',
            title: lead.title || '',
            source: lead.source || 'Website',
            status: lead.status || 'new',
            score: lead.score || 0,
        })
        setShowModal(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsUpdating(true)

        try {
            if (editingLead) {
                await leadAPI.update(editingLead._id, formData)
                toast.success('Lead updated successfully')
            } else {
                await leadAPI.create(formData)
                toast.success('Lead added successfully')
            }
            setShowModal(false)
            fetchLeads(page)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to save lead')
        } finally {
            setIsUpdating(false)
        }
    }

    const handleDelete = async (lead) => {
        const confirmed = window.confirm('Delete this lead?')
        if (!confirmed) return

        try {
            await leadAPI.delete(lead._id)
            toast.success('Lead deleted successfully')
            const nextPage = page > 1 && leads.length === 1 ? page - 1 : page
            setPage(nextPage)
            fetchLeads(nextPage)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to delete lead')
        }
    }

    const buildStatusStats = () => {
        return statuses.slice(1).map((status) => ({
            label: status,
            count: statusCounts[status.toLowerCase()] || 0,
        }))
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Leads</h1>
                    <p className="text-desc">Manage your sales leads and opportunities</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="btn-primary"
                >
                    <Plus className="w-4 h-4" />
                    Add Lead
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {buildStatusStats().map((item) => (
                    <div key={item.label} className="card p-4 text-center">
                        <div className="text-title">{item.count}</div>
                        <div className="text-sm text-textSecondary">{item.label}</div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setPage(1)
                        }}
                        className="w-full input-field pl-12"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value)
                        setPage(1)
                    }}
                    className="input-field w-40"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="card p-6 text-center text-textSecondary">Loading leads...</div>
                ) : leads.length === 0 ? (
                    <div className="card p-6 text-center text-textSecondary">No leads found.</div>
                ) : (
                    leads.map((lead, index) => (
                        <motion.div
                            key={lead._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="card p-6 hover:border-indigo-500/50 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                        {(lead.firstName || lead.lastName || 'L').charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{lead.firstName} {lead.lastName}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-textSecondary">
                                            <span className="flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                {lead.email}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Phone className="w-3 h-3" />
                                                {lead.phone || 'No phone'}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className={`text-lg font-bold ${getScoreColor(lead.score)}`}>{lead.score}%</div>
                                        <div className="text-xs text-textSecondary">Score</div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeColors[lead.status] || 'bg-[#1E293B] text-textSecondary'}`}>
                                        {getStatusLabel(lead.status)}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(lead)}
                                            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <User className="w-4 h-4 text-textSecondary hover:text-white" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(lead)}
                                            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <MoreVertical className="w-4 h-4 text-textSecondary" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <button className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 text-sm hover:bg-indigo-500/20 transition-colors duration-200">
                                    Follow Up
                                </button>
                                <button className="px-3 py-1.5 rounded-xl bg-success/10 text-success text-sm hover:bg-success/20 transition-colors duration-200">
                                    Convert
                                </button>
                                <button className="px-3 py-1.5 rounded-xl bg-background border border-border text-sm hover:border-indigo-500/50 transition-colors duration-200">
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {pagination.pages > 1 && (
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                    <p className="text-sm text-textSecondary">Page {pagination.page} of {pagination.pages}</p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm">
                            {pagination.page}
                        </button>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, pagination.pages))}
                            disabled={page >= pagination.pages}
                            className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-3xl rounded-3xl border border-border bg-[#020617] p-6 shadow-2xl">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold">{editingLead ? 'Edit Lead' : 'Add Lead'}</h2>
                                <p className="text-sm text-textSecondary mt-1">Enter lead details for your sales pipeline.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="rounded-2xl border border-border px-4 py-2 text-sm text-textSecondary hover:border-indigo-500/50"
                            >
                                Close
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm text-textSecondary">First Name</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                                    className="w-full input-field mt-2"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-textSecondary">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                                    className="w-full input-field mt-2"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-textSecondary">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                    className="w-full input-field mt-2"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-textSecondary">Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                    className="w-full input-field mt-2"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-textSecondary">Company</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                                    className="w-full input-field mt-2"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-textSecondary">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                    className="w-full input-field mt-2"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-textSecondary">Source</label>
                                <select
                                    value={formData.source}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, source: e.target.value }))}
                                    className="w-full input-field mt-2"
                                >
                                    <option value="Website">Website</option>
                                    <option value="Email">Email</option>
                                    <option value="Referral">Referral</option>
                                    <option value="Social Media">Social Media</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-textSecondary">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                                    className="w-full input-field mt-2"
                                >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="converted">Converted</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-textSecondary">Score</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.score}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, score: Number(e.target.value) }))}
                                    className="w-full input-field mt-2"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-textSecondary">Notes</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                                    className="w-full input-field mt-2 min-h-[120px]"
                                />
                            </div>
                            <div className="md:col-span-2 flex flex-wrap gap-3 justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 rounded-2xl border border-border text-sm text-textSecondary hover:border-indigo-500/50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm text-white hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-50"
                                >
                                    {isUpdating ? 'Saving...' : editingLead ? 'Update Lead' : 'Add Lead'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Leads