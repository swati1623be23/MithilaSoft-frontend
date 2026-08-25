// src/pages/dashboard/Customers.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, User, Mail, Phone, MoreVertical, Eye, Ban, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { customerAPI } from '../../services/api'

const statusOptions = ['All', 'Active', 'Inactive', 'Blocked']
const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'active',
}

const Customers = () => {
    const [customers, setCustomers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('All')
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 1 })
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCustomer, setEditingCustomer] = useState(null)
    const [formData, setFormData] = useState(initialFormState)
    const [formErrors, setFormErrors] = useState({})
    const [saving, setSaving] = useState(false)

    const fetchCustomers = async (nextPage = 1) => {
        try {
            setLoading(true)
            const params = {
                page: nextPage,
                limit: 12,
                search: searchQuery || undefined,
                status: filterStatus !== 'All' ? filterStatus.toLowerCase() : undefined,
            }
            const res = await customerAPI.getAll(params)
            setCustomers(res.data.customers || [])
            setPagination(res.data.pagination || { page: 1, limit: 12, total: 0, pages: 1 })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to load customers')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomers(page)
    }, [searchQuery, filterStatus, page])

    const openCreateModal = () => {
        setEditingCustomer(null)
        setFormData(initialFormState)
        setFormErrors({})
        setIsModalOpen(true)
    }

    const openEditModal = (customer) => {
        setEditingCustomer(customer)
        setFormData({
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            email: customer.email || '',
            phone: customer.phone || '',
            status: customer.status || 'active',
        })
        setFormErrors({})
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingCustomer(null)
        setFormErrors({})
    }

    const validateForm = () => {
        const errors = {}
        if (!formData.firstName.trim()) errors.firstName = 'First name is required'
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
        if (!formData.email.trim()) {
            errors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Enter a valid email address'
        }
        return errors
    }

    const handleSaveCustomer = async (event) => {
        event.preventDefault()
        const errors = validateForm()
        if (Object.keys(errors).length) {
            setFormErrors(errors)
            return
        }

        try {
            setSaving(true)
            const payload = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim() || undefined,
                status: formData.status,
            }

            if (editingCustomer) {
                await customerAPI.update(editingCustomer._id || editingCustomer.id, payload)
                toast.success('Customer updated successfully')
                fetchCustomers(page)
            } else {
                await customerAPI.create(payload)
                toast.success('Customer added successfully')
                setPage(1)
                fetchCustomers(1)
            }

            closeModal()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to save customer')
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteCustomer = async (customer) => {
        const confirmed = window.confirm('Delete this customer permanently?')
        if (!confirmed) return

        try {
            await customerAPI.delete(customer._id || customer.id)
            toast.success('Customer deleted successfully')
            const nextPage = page > 1 && customers.length === 1 ? page - 1 : page
            setPage(nextPage)
            fetchCustomers(nextPage)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to delete customer')
        }
    }

    const toggleBlock = async (customer) => {
        try {
            const nextStatus = customer.status === 'blocked' ? 'active' : 'blocked'
            await customerAPI.update(customer._id || customer.id, { status: nextStatus })
            toast.success(`Customer ${nextStatus === 'blocked' ? 'blocked' : 'activated'}`)
            fetchCustomers(page)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to update customer status')
        }
    }

    const formatMoney = (value) => {
        if (value === undefined || value === null) return '$0.00'
        if (typeof value === 'number') {
            return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        }
        return value
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Customers</h1>
                    <p className="text-desc">Manage your customer base</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => toast('Export started')}
                        className="px-4 py-2 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                    >
                        Export
                    </button>
                    <button
                        onClick={openCreateModal}
                        className="btn-primary"
                    >
                        <User className="w-4 h-4" />
                        Add Customer
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setPage(1)
                        }}
                        className="w-full input-field pl-12"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => {
                        setFilterStatus(e.target.value)
                        setPage(1)
                    }}
                    className="input-field w-40"
                >
                    {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="card p-6 text-center text-textSecondary">Loading customers...</div>
            ) : !customers.length ? (
                <div className="card p-6 text-center text-textSecondary">No customers found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {customers.map((customer, index) => {
                        const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.email || 'Customer'
                        const orderCount = customer.orderCount ?? customer.orders?.length ?? 0
                        const customerStatus = (customer.status || 'active').charAt(0).toUpperCase() + (customer.status || 'active').slice(1)
                        return (
                            <motion.div
                                key={customer._id || customer.id || index}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="card p-6 hover:border-indigo-500/50 transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                                            {fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{fullName}</h3>
                                            <div className="flex items-center gap-2 text-sm text-textSecondary mt-2">
                                                <Mail className="w-3 h-3" />
                                                {customer.email || 'No email'}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-textSecondary mt-1">
                                                <Phone className="w-3 h-3" />
                                                {customer.phone || 'No phone'}
                                            </div>
                                        </div>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <MoreVertical className="w-5 h-5 text-textSecondary" />
                                    </button>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                                    <div className="p-3 rounded-xl bg-background">
                                        <div className="text-lg font-bold">{orderCount}</div>
                                        <div className="text-xs text-textSecondary">Orders</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-background">
                                        <div className="text-lg font-bold text-indigo-400">{formatMoney(customer.totalSpent)}</div>
                                        <div className="text-xs text-textSecondary">Spent</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-background">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            customer.status === 'active' ? 'bg-success/20 text-success' : 'bg-[#1E293B] text-textSecondary'
                                        }`}>
                                            {customerStatus}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => openEditModal(customer)}
                                        className="flex-1 px-3 py-1.5 rounded-xl bg-background border border-border text-sm hover:border-indigo-500/50 transition-all duration-200 flex items-center justify-center gap-1"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toggleBlock(customer)}
                                        className="flex-1 px-3 py-1.5 rounded-xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-all duration-200 flex items-center justify-center gap-1"
                                    >
                                        <Ban className="w-4 h-4" />
                                        {customer.status === 'blocked' ? 'Unblock' : 'Block'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteCustomer(customer)}
                                        className="flex-1 px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-red-500/50 transition-all duration-200 flex items-center justify-center gap-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}

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

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-2xl rounded-3xl border border-border bg-[#020617] p-6 shadow-2xl">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold">{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
                                <p className="text-sm text-textSecondary mt-1">Save customer data for this store.</p>
                            </div>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-2xl border border-border px-4 py-2 text-sm text-textSecondary hover:border-indigo-500/50"
                            >
                                Close
                            </button>
                        </div>

                        <form onSubmit={handleSaveCustomer} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm text-textSecondary">First Name</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full input-field mt-2"
                                />
                                {formErrors.firstName && <p className="text-xs text-danger mt-1">{formErrors.firstName}</p>}
                            </div>
                            <div>
                                <label className="text-sm text-textSecondary">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full input-field mt-2"
                                />
                                {formErrors.lastName && <p className="text-xs text-danger mt-1">{formErrors.lastName}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-textSecondary">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full input-field mt-2"
                                />
                                {formErrors.email && <p className="text-xs text-danger mt-1">{formErrors.email}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-textSecondary">Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full input-field mt-2"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm text-textSecondary">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full input-field mt-2"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="blocked">Blocked</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 flex flex-wrap gap-3 justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 rounded-2xl border border-border text-sm text-textSecondary hover:border-indigo-500/50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-sm text-white hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : editingCustomer ? 'Update Customer' : 'Add Customer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Customers
