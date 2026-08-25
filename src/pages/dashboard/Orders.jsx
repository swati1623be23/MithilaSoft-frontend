// src/pages/dashboard/Orders.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    Search,
    Eye,
    Printer,
    Truck,
    MoreVertical,
    Plus,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { orderAPI, customerAPI, productAPI } from '../../services/api'

const statuses = ['All', 'Pending', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Returned']
const paymentStatusColors = {
    paid: 'text-success',
    pending: 'text-amber-400',
    refunded: 'text-danger',
    failed: 'text-danger',
}

const statusBadgeColors = {
    delivered: 'bg-success/20 text-success',
    processing: 'bg-cyan-500/20 text-cyan-400',
    shipped: 'bg-indigo-500/20 text-indigo-400',
    pending: 'bg-amber-500/20 text-amber-400',
    cancelled: 'bg-danger/20 text-danger',
    returned: 'bg-[#1E293B] text-textSecondary',
    packed: 'bg-blue-500/20 text-blue-400',
}

const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '$0.00'
    return `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 })
    const [statusCounts, setStatusCounts] = useState({})
    const [loading, setLoading] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [invoiceData, setInvoiceData] = useState(null)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [creatingOrder, setCreatingOrder] = useState(false)
    const [createOrderForm, setCreateOrderForm] = useState({
        customerId: '',
        fullName: '',
        email: '',
        phone: '',
        city: '',
        shippingAddress: '',
        landmark: '',
        shippingMethod: 'Standard',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Unpaid',
        deliveryCharge: -1,
        discountAmount: 0,
        notes: '',
        items: [{ product: '', quantity: 1 }],
    })
    const [formErrors, setFormErrors] = useState({})
    const [detailLoading, setDetailLoading] = useState(false)

    const statusCountsMap = {
        All: pagination.total || 0,
        Pending: statusCounts.pending || 0,
        Processing: statusCounts.processing || 0,
        Packed: statusCounts.packed || 0,
        Shipped: statusCounts.shipped || 0,
        Delivered: statusCounts.delivered || 0,
        Cancelled: statusCounts.cancelled || 0,
        Returned: statusCounts.returned || 0,
    }

    const fetchOrders = async (nextPage = 1) => {
        try {
            setLoading(true)
            const params = {
                page: nextPage,
                limit: 10,
                search: searchQuery || undefined,
                status: statusFilter !== 'All' ? statusFilter.toLowerCase() : undefined,
            }
            const res = await orderAPI.getAll(params)
            setOrders(res.data.orders || [])
            setPagination(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 })
            const counts = (res.data.statusCounts || []).reduce((acc, item) => {
                acc[item._id] = item.count
                return acc
            }, {})
            setStatusCounts(counts)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to load orders')
        } finally {
            setLoading(false)
        }
    }

    const fetchCustomers = async () => {
        try {
            const res = await customerAPI.getAll({ page: 1, limit: 100 })
            setCustomers(res.data.customers || [])
        } catch (error) {
            console.error(error)
            toast.error('Unable to load customers')
        }
    }

    const fetchProducts = async () => {
        try {
            const res = await productAPI.getAll({ page: 1, limit: 100 })
            setProducts(res.data.products || [])
        } catch (error) {
            console.error(error)
            toast.error('Unable to load products')
        }
    }

    useEffect(() => {
        fetchOrders(page)
    }, [page, statusFilter, searchQuery])

    useEffect(() => {
        fetchCustomers()
        fetchProducts()
    }, [])

    const openDetails = async (orderId) => {
        try {
            setDetailLoading(true)
            const res = await orderAPI.getOne(orderId)
            setSelectedOrder(res.data.order)
            setInvoiceData(null)
            setShowDetailsModal(true)
        } catch (error) {
            console.error(error)
            toast.error('Unable to load order details')
        } finally {
            setDetailLoading(false)
        }
    }

    const openCreateModal = () => {
        setCreateOrderForm({
            customerId: customers[0]?._id || '',
            fullName: '',
            email: '',
            phone: '',
            city: '',
            shippingAddress: '',
            landmark: '',
            shippingMethod: 'Standard',
            paymentMethod: 'Credit Card',
            paymentStatus: 'Unpaid',
            deliveryCharge: -1,
            discountAmount: 0,
            notes: '',
            items: [{ product: '', quantity: 1 }],
        })
        setFormErrors({})
        setShowCreateModal(true)
    }

    const validateCreateForm = () => {
        const errors = {}
        if (!createOrderForm.customerId) {
            errors.customerId = 'Select a customer'
        }
        if (!createOrderForm.shippingAddress.trim()) {
            errors.shippingAddress = 'Shipping address is required'
        }
        if (!createOrderForm.fullName.trim()) {
            errors.fullName = 'Full name is required'
        }
        if (!createOrderForm.phone.trim()) {
            errors.phone = 'Phone number is required'
        }
        createOrderForm.items.forEach((item, index) => {
            if (!item.product) {
                errors[`items.${index}.product`] = 'Select a product'
            }
            if (!item.quantity || item.quantity < 1) {
                errors[`items.${index}.quantity`] = 'Quantity must be at least 1'
            }
        })
        return errors
    }

    const handleAddItem = () => {
        setCreateOrderForm((prev) => ({
            ...prev,
            items: [...prev.items, { product: '', quantity: 1 }],
        }))
    }

    const handleRemoveItem = (indexToRemove) => {
        setCreateOrderForm((prev) => ({
            ...prev,
            items: prev.items.filter((_, index) => index !== indexToRemove),
        }))
    }

    const handleCreateOrder = async (event) => {
        event.preventDefault()
        const errors = validateCreateForm()
        if (Object.keys(errors).length) {
            setFormErrors(errors)
            return
        }

        try {
            setCreatingOrder(true)
            const payload = {
                customerId: createOrderForm.customerId,
                items: createOrderForm.items.map((item) => ({
                    product: item.product,
                    quantity: item.quantity,
                })),
                shipping: {
                    address: {
                        street: createOrderForm.shippingAddress,
                        city: createOrderForm.city,
                        country: 'Nepal',
                    },
                    city: createOrderForm.city,
                    landmark: createOrderForm.landmark,
                    method: createOrderForm.shippingMethod,
                    cost: Number(createOrderForm.deliveryCharge) || 0,
                },
                payment: {
                    method: createOrderForm.paymentMethod,
                    status: createOrderForm.paymentStatus === 'Unpaid' ? 'pending' : createOrderForm.paymentStatus.toLowerCase(),
                },
                discounts: Number(createOrderForm.discountAmount) > 0 ? [{ amount: Number(createOrderForm.discountAmount), type: 'fixed' }] : [],
                customer: {
                    name: createOrderForm.fullName,
                    email: createOrderForm.email,
                    phone: createOrderForm.phone,
                },
                notes: createOrderForm.notes,
            }
            await orderAPI.create(payload)
            toast.success('Order created successfully')
            setShowCreateModal(false)
            setPage(1)
            fetchOrders(1)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to create order')
        } finally {
            setCreatingOrder(false)
        }
    }

    const handleFetchInvoice = async (orderId) => {
        try {
            setDetailLoading(true)
            const res = await orderAPI.getInvoice(orderId)
            setInvoiceData(res.data.invoice)
            toast.success('Invoice loaded')
        } catch (error) {
            console.error(error)
            toast.error('Unable to load invoice')
        } finally {
            setDetailLoading(false)
        }
    }

    const handleCancelOrder = async (orderId) => {
        const confirmed = window.confirm('Cancel this order?')
        if (!confirmed) return

        try {
            setDetailLoading(true)
            await orderAPI.cancel(orderId)
            toast.success('Order cancelled successfully')
            fetchOrders(page)
            setShowDetailsModal(false)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to cancel order')
        } finally {
            setDetailLoading(false)
        }
    }

    const handleStatusUpdate = async (status) => {
        if (!selectedOrder) return
        try {
            setDetailLoading(true)
            await orderAPI.updateStatus(selectedOrder._id, { status })
            toast.success('Order status updated')
            fetchOrders(page)
            openDetails(selectedOrder._id)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to update order status')
        } finally {
            setDetailLoading(false)
        }
    }

    const availableStatusOptions = (currentStatus) => {
        const transitions = {
            pending: ['processing', 'cancelled'],
            processing: ['packed', 'cancelled'],
            packed: ['shipped', 'cancelled'],
            shipped: ['delivered', 'returned'],
            delivered: ['returned'],
            cancelled: [],
            returned: ['refunded'],
        }
        return transitions[currentStatus] || []
    }

    const renderOrderStatus = (status) => {
        const label = status?.charAt(0).toUpperCase() + status?.slice(1)
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeColors[status] || 'bg-[#1E293B] text-textSecondary'}`}>
                {label}
            </span>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Orders</h1>
                    <p className="text-desc">Manage all orders from your store</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setPage(1)
                            fetchOrders(1)
                        }}
                        className="btn-secondary"
                    >
                        <Printer className="w-4 h-4" />
                        Export
                    </button>
                    <button
                        onClick={openCreateModal}
                        className="btn-primary"
                    >
                        <Plus className="w-4 h-4" />
                        New Order
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => {
                            setStatusFilter(status)
                            setPage(1)
                        }}
                        className={`px-4 py-2 rounded-2xl text-sm transition-all duration-200 ${
                            statusFilter === status
                                ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                                : 'bg-card border border-border text-textSecondary hover:border-indigo-500/50'
                        }`}
                    >
                        {status} ({statusCountsMap[status] || 0})
                    </button>
                ))}
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                <input
                    type="text"
                    placeholder="Search orders by ID, customer name, or email..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setPage(1)
                    }}
                    className="w-full input-field pl-12"
                />
            </div>

            <div className="card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-table-header border-b border-border">
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Order ID</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Customer</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Items</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Total</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Status</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Payment</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Date</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="py-8 text-center text-textSecondary">
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-8 text-center text-textSecondary">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order, index) => (
                                    <motion.tr
                                        key={order._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="py-3">
                                            <span className="font-medium text-indigo-400">{order.orderNumber || `#${order._id}`}</span>
                                        </td>
                                        <td className="py-3">
                                            {order.customer?.firstName || order.customer?.email || 'Customer'} {order.customer?.lastName || ''}
                                        </td>
                                        <td className="py-3 text-sm text-textSecondary">{order.items?.length || 0}</td>
                                        <td className="py-3 font-semibold">{formatCurrency(order.total)}</td>
                                        <td className="py-3">{renderOrderStatus(order.status)}</td>
                                        <td className={`py-3 text-sm font-medium ${paymentStatusColors[order.payment?.status] || 'text-textSecondary'}`}>
                                            {order.payment?.status ? order.payment.status.charAt(0).toUpperCase() + order.payment.status.slice(1) : 'Pending'}
                                        </td>
                                        <td className="py-3 text-sm text-textSecondary">{formatDate(order.createdAt)}</td>
                                        <td className="py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openDetails(order._id)}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleFetchInvoice(order._id)}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                                    title="Print Invoice"
                                                >
                                                    <Printer className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                                <button
                                                    onClick={() => openDetails(order._id)}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                                    title="Update Status"
                                                >
                                                    <Truck className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                                <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200" title="More">
                                                    <MoreVertical className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                    <p className="text-sm text-textSecondary">
                        Showing {orders.length === 0 ? 0 : (page - 1) * pagination.limit + 1} - {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} orders
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-colors duration-200 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm">
                            {page}
                        </button>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, pagination.pages))}
                            disabled={page >= pagination.pages}
                            className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-colors duration-200 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-3 sm:p-6">
                    <div className="mx-auto min-h-full w-full max-w-6xl border border-gray-200 bg-white text-gray-900 shadow-2xl dark:border-gray-700 dark:bg-black dark:text-white">
                        <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-4 dark:border-gray-700"><button type="button" onClick={() => setShowCreateModal(false)} className="text-purple-600">←</button><h2 className="text-lg font-bold">Create Order</h2></div>
                        <form onSubmit={handleCreateOrder} className="space-y-4 p-3 sm:p-5">
                            <section className="border border-gray-100 p-4 dark:border-gray-800"><div className="mb-3 flex items-center justify-between"><h3 className="font-bold">Products</h3><button type="button" onClick={handleAddItem} className="text-xs font-semibold text-sky-600">Add custom item</button></div>{createOrderForm.items.map((item, index) => <div key={index} className="mb-2 flex flex-col gap-2 sm:flex-row"><select value={item.product} onChange={(event) => setCreateOrderForm((prev) => ({ ...prev, items: prev.items.map((row, idx) => idx === index ? { ...row, product: event.target.value } : row) }))} className="input-field flex-1"><option value="">Select Products</option>{products.map((product) => <option key={product._id} value={product._id}>{product.name || product.title}</option>)}</select><input type="number" min="1" value={item.quantity} onChange={(event) => setCreateOrderForm((prev) => ({ ...prev, items: prev.items.map((row, idx) => idx === index ? { ...row, quantity: Number(event.target.value) } : row) }))} className="input-field w-full sm:w-28" placeholder="Qty" />{createOrderForm.items.length > 1 && <button type="button" onClick={() => handleRemoveItem(index)} className="px-3 text-sm text-red-500">Remove</button>}{formErrors[`items.${index}.product`] && <p className="text-xs text-red-500">{formErrors[`items.${index}.product`]}</p>}</div>)}</section>
                            <section className="border border-gray-100 p-4 dark:border-gray-800"><h3 className="mb-3 font-bold">Customer Details</h3><div className="grid gap-3 md:grid-cols-3"><Field label="Full Name *" value={createOrderForm.fullName} placeholder="eg: Ram Bahadur" error={formErrors.fullName} onChange={(value) => setCreateOrderForm((prev) => ({ ...prev, fullName: value }))} /><Field label="Email" value={createOrderForm.email} placeholder="eg: john@gmail.com" onChange={(value) => setCreateOrderForm((prev) => ({ ...prev, email: value }))} /><Field label="Phone Number *" value={createOrderForm.phone} placeholder="eg: 986220000" error={formErrors.phone} onChange={(value) => setCreateOrderForm((prev) => ({ ...prev, phone: value }))} /><Field label="City / District *" value={createOrderForm.city} placeholder="Select one" onChange={(value) => setCreateOrderForm((prev) => ({ ...prev, city: value }))} /><Field label="Address *" value={createOrderForm.shippingAddress} placeholder="eg: Tinkune, Subidhanagar" error={formErrors.shippingAddress} onChange={(value) => setCreateOrderForm((prev) => ({ ...prev, shippingAddress: value }))} /><Field label="Landmark" value={createOrderForm.landmark} placeholder="eg: Near Madhan Bhandari park" onChange={(value) => setCreateOrderForm((prev) => ({ ...prev, landmark: value }))} /><div className="md:col-span-3"><Field label="Order Note" value={createOrderForm.notes} placeholder="eg: this is urgent" onChange={(value) => setCreateOrderForm((prev) => ({ ...prev, notes: value }))} /></div></div><div className="mt-3"><label className="text-xs font-semibold">Customer account</label><select value={createOrderForm.customerId} onChange={(event) => setCreateOrderForm((prev) => ({ ...prev, customerId: event.target.value }))} className="input-field mt-1 w-full"><option value="">Select existing customer</option>{customers.map((customer) => <option key={customer._id} value={customer._id}>{customer.firstName} {customer.lastName} ({customer.email})</option>)}</select>{formErrors.customerId && <p className="text-xs text-red-500">{formErrors.customerId}</p>}</div></section>
                            <section className="border border-gray-100 p-4 dark:border-gray-800"><h3 className="mb-3 font-bold">ⓘ Delivery Charge &amp; Discounts</h3><div className="grid gap-3 md:grid-cols-2"><Field label="Delivery Charge (default = -1)" type="number" value={createOrderForm.deliveryCharge} placeholder="-1" onChange={(value) => setCreateOrderForm((prev) => ({ ...prev, deliveryCharge: value }))} /><Field label="Custom Discount Amount (Rs.)" type="number" value={createOrderForm.discountAmount} placeholder="0" onChange={(value) => setCreateOrderForm((prev) => ({ ...prev, discountAmount: value }))} /></div></section>
                            <section className="border border-gray-100 p-4 dark:border-gray-800"><h3 className="mb-3 font-bold">ⓘ Payment</h3><div className="grid gap-3 md:grid-cols-2"><div><label className="text-xs font-semibold">Payment Status</label><select value={createOrderForm.paymentStatus} onChange={(event) => setCreateOrderForm((prev) => ({ ...prev, paymentStatus: event.target.value }))} className="input-field mt-1 w-full"><option>Unpaid</option><option>Paid</option><option>Pending</option><option>Refunded</option></select></div><div><label className="text-xs font-semibold">Payment Method</label><select value={createOrderForm.paymentMethod} onChange={(event) => setCreateOrderForm((prev) => ({ ...prev, paymentMethod: event.target.value }))} className="input-field mt-1 w-full"><option>Credit Card</option><option>Cash On Delivery</option><option>Fonepay</option><option>Other</option></select></div></div></section>
                            <div className="flex justify-end border-t border-gray-200 pt-3 dark:border-gray-700"><button type="submit" disabled={creatingOrder} className="rounded bg-purple-600 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50">{creatingOrder ? 'Creating...' : 'Create Order'}</button></div>
                        </form>
                    </div>
                </div>
            )}

            {showDetailsModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-3xl rounded-3xl border border-border bg-[#020617] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold">Order Details</h2>
                                <p className="text-sm text-textSecondary mt-1">Review and manage this order.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowDetailsModal(false)}
                                className="rounded-2xl border border-border px-4 py-2 text-sm text-textSecondary hover:border-indigo-500/50"
                            >
                                Close
                            </button>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <div className="text-sm text-textSecondary">Order</div>
                                <div className="text-lg font-semibold text-indigo-400">{selectedOrder.orderNumber}</div>
                                <div className="text-sm text-textSecondary">{formatDate(selectedOrder.createdAt)}</div>
                            </div>
                            <div className="space-y-2 text-right">
                                <div className="text-sm text-textSecondary">Status</div>
                                {renderOrderStatus(selectedOrder.status)}
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2 rounded-3xl border border-border p-4 bg-background">
                                <div className="text-sm text-textSecondary">Customer</div>
                                <div className="font-medium">{selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}</div>
                                <div className="text-sm text-textSecondary">{selectedOrder.customer?.email}</div>
                                <div className="text-sm text-textSecondary">{selectedOrder.customer?.phone || 'No phone provided'}</div>
                            </div>
                            <div className="space-y-2 rounded-3xl border border-border p-4 bg-background">
                                <div className="text-sm text-textSecondary">Payment</div>
                                <div className="font-medium">{selectedOrder.payment?.method || 'N/A'}</div>
                                <div className={`${paymentStatusColors[selectedOrder.payment?.status] || 'text-textSecondary'} text-sm font-medium`}>{selectedOrder.payment?.status || 'Pending'}</div>
                                <div className="text-sm text-textSecondary">Total: {formatCurrency(selectedOrder.total)}</div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="text-sm text-textSecondary">Shipping Address</div>
                            <div className="rounded-3xl border border-border p-4 bg-background mt-2 text-sm">
                                {selectedOrder.shipping?.address || 'No address provided'}
                            </div>
                        </div>

                        <div className="mt-6 overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-textSecondary border-b border-border">
                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Item</th>
                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Qty</th>
                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Price</th>
                                        <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.items?.map((item, idx) => (
                                        <tr key={idx} className="border-b border-border last:border-0">
                                            <td className="py-3 text-sm text-textSecondary">{item.name || item.product?.name}</td>
                                            <td className="py-3">{item.quantity}</td>
                                            <td className="py-3">{formatCurrency(item.price)}</td>
                                            <td className="py-3 text-right">{formatCurrency(item.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {invoiceData && (
                            <div className="mt-6 rounded-3xl border border-border bg-background p-4">
                                <div className="text-sm text-textSecondary">Invoice</div>
                                <div className="mt-2 text-sm">Invoice #: {invoiceData.number}</div>
                                <div className="text-sm">Order #: {invoiceData.orderNumber}</div>
                                <div className="text-sm">Total: {formatCurrency(invoiceData.total)}</div>
                                <div className="text-sm">Generated: {formatDate(invoiceData.generatedAt)}</div>
                            </div>
                        )}

                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <button
                                type="button"
                                onClick={() => handleFetchInvoice(selectedOrder._id)}
                                className="px-4 py-2 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                            >
                                Invoice
                            </button>
                            <select
                                value=""
                                onChange={(e) => {
                                    const nextStatus = e.target.value
                                    if (nextStatus) handleStatusUpdate(nextStatus)
                                }}
                                className="w-full input-field"
                            >
                                <option value="">Update status</option>
                                {availableStatusOptions(selectedOrder.status).map((status) => (
                                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => handleCancelOrder(selectedOrder._id)}
                                className="px-4 py-2 rounded-2xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-all duration-200"
                            >
                                Cancel Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const Field = ({ label, value, placeholder, onChange, error, type = 'text' }) => (
    <div>
        <label className="text-xs font-semibold">{label}</label>
        <input type={type} value={value ?? ''} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="input-field mt-1 w-full" />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
)

export default Orders