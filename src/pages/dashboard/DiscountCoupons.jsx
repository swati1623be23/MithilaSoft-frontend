// // src/pages/dashboard/DiscountCoupons.jsx
// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Plus, Search, Edit, Trash2, Copy, Gift, Calendar, Users, MoreVertical } from 'lucide-react'

// const DiscountCoupons = () => {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [filterType, setFilterType] = useState('All')

//     const coupons = [
//         { id: 1, code: 'WELCOME10', type: 'Percentage', value: '10%', uses: 45, maxUses: 100, expires: '2024-02-15', status: 'Active' },
//         { id: 2, code: 'SAVE20', type: 'Fixed', value: '$20', uses: 32, maxUses: 50, expires: '2024-01-30', status: 'Active' },
//         { id: 3, code: 'FREESHIP', type: 'Free Shipping', value: 'Free', uses: 12, maxUses: 25, expires: '2024-01-20', status: 'Expired' },
//         { id: 4, code: 'BLACKFRIDAY', type: 'Percentage', value: '25%', uses: 120, maxUses: 200, expires: '2024-11-30', status: 'Scheduled' },
//         { id: 5, code: 'FLASH15', type: 'Percentage', value: '15%', uses: 8, maxUses: 30, expires: '2024-01-18', status: 'Active' },
//     ]

//     const types = ['All', 'Percentage', 'Fixed', 'Free Shipping']

//     return (
//         <div className="space-y-6">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Discount Coupons</h1>
//                     <p className="text-desc">Create and manage promotional coupons</p>
//                 </div>
//                 <button className="btn-primary">
//                     <Plus className="w-4 h-4" />
//                     Create Coupon
//                 </button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-indigo-400">8</div>
//                     <div className="text-sm text-textSecondary">Active Coupons</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-cyan-400">217</div>
//                     <div className="text-sm text-textSecondary">Total Uses</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-amber-400">3</div>
//                     <div className="text-sm text-textSecondary">Expired</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-success">$4,250</div>
//                     <div className="text-sm text-textSecondary">Total Discount</div>
//                 </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1 relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
//                     <input
//                         type="text"
//                         placeholder="Search coupons..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full input-field pl-12"
//                     />
//                 </div>
//                 <select
//                     value={filterType}
//                     onChange={(e) => setFilterType(e.target.value)}
//                     className="input-field w-40"
//                 >
//                     {types.map((type) => (
//                         <option key={type} value={type}>{type}</option>
//                     ))}
//                 </select>
//             </div>

//             {/* Coupons Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {coupons.map((coupon, index) => (
//                     <motion.div
//                         key={coupon.id}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.3, delay: index * 0.05 }}
//                         className="card p-6 hover:border-indigo-500/50 transition-all duration-300 group"
//                     >
//                         <div className="flex items-start justify-between">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
//                                     <Gift className="w-6 h-6 text-amber-400" />
//                                 </div>
//                                 <div>
//                                     <div className="font-mono font-bold text-lg">{coupon.code}</div>
//                                     <div className="text-sm text-textSecondary">{coupon.type}</div>
//                                 </div>
//                             </div>
//                             <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                 <MoreVertical className="w-5 h-5 text-textSecondary" />
//                             </button>
//                         </div>

//                         <div className="mt-4 text-center">
//                             <div className="text-3xl font-bold gradient-text">{coupon.value}</div>
//                             <div className="text-sm text-textSecondary mt-1">Discount Value</div>
//                         </div>

//                         <div className="mt-4 grid grid-cols-2 gap-3">
//                             <div className="text-center p-2 rounded-xl bg-background">
//                                 <div className="text-sm font-medium">{coupon.uses}/{coupon.maxUses}</div>
//                                 <div className="text-xs text-textSecondary">Uses</div>
//                             </div>
//                             <div className="text-center p-2 rounded-xl bg-background">
//                                 <div className="text-sm font-medium flex items-center justify-center gap-1">
//                                     <Calendar className="w-3 h-3" />
//                                     {coupon.expires}
//                                 </div>
//                                 <div className="text-xs text-textSecondary">Expires</div>
//                             </div>
//                         </div>

//                         <div className="mt-4 flex items-center justify-between">
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                                 coupon.status === 'Active' ? 'bg-success/20 text-success' :
//                                 coupon.status === 'Scheduled' ? 'bg-cyan-500/20 text-cyan-400' :
//                                 'bg-[#1E293B] text-textSecondary'
//                             }`}>
//                                 {coupon.status}
//                             </span>
//                             <div className="flex gap-2">
//                                 <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200">
//                                     <Copy className="w-4 h-4 text-textSecondary hover:text-white" />
//                                 </button>
//                                 <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200">
//                                     <Edit className="w-4 h-4 text-textSecondary hover:text-white" />
//                                 </button>
//                                 <button className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200">
//                                     <Trash2 className="w-4 h-4 text-danger" />
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default DiscountCoupons



// src/pages/dashboard/DiscountCoupons.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Gift,
    Plus,
    Search,
    Edit,
    Trash2,
    Copy,
    MoreVertical,
    Calendar,
    Users,
    Tag,
    DollarSign,
    Percent,
    Truck,
    CheckCircle,
    XCircle,
    Clock,
    Filter,
    Download,
    X,
    Save,
    Eye,
    EyeOff,
    Link,
    Layers,
    Package,
    ShoppingBag,
    AlertCircle,
    Check,
    ChevronDown,
    ChevronRight,
    RefreshCw,
    Zap,
    Award,
    Target,
    Activity,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const DiscountCoupons = () => {
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterType, setFilterType] = useState('all')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editingCoupon, setEditingCoupon] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCoupon, setSelectedCoupon] = useState(null)
    const [showDetailsModal, setShowDetailsModal] = useState(false)

    // Stats
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        expired: 0,
        scheduled: 0,
        totalUses: 0,
        totalDiscount: 0,
    })

    // Form state
    const [formData, setFormData] = useState({
        code: '',
        type: 'percentage',
        value: '',
        minOrder: '',
        maxDiscount: '',
        startDate: '',
        endDate: '',
        usageLimit: '',
        perUserLimit: '',
        status: 'active',
        products: [],
        categories: [],
        description: '',
        applyTo: 'all', // all, specific_products, specific_categories
    })

    // Product & Category search
    const [productSearch, setProductSearch] = useState('')
    const [productResults, setProductResults] = useState([])
    const [categorySearch, setCategorySearch] = useState('')
    const [categoryResults, setCategoryResults] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    // Get token
    const getToken = () => localStorage.getItem('token')

    // Fetch coupons
    const fetchCoupons = async () => {
        try {
            setLoading(true)
            const token = getToken()
            const response = await api.get('/coupons', {
                params: {
                    search: searchQuery || undefined,
                    status: filterStatus !== 'all' ? filterStatus : undefined,
                    type: filterType !== 'all' ? filterType : undefined,
                },
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setCoupons(response.data.coupons || [])
                calculateStats(response.data.coupons || [])
            }
        } catch (error) {
            console.error('❌ Fetch coupons error:', error)
            toast.error('Failed to load coupons')
            setCoupons([])
        } finally {
            setLoading(false)
        }
    }

    // Calculate stats
    const calculateStats = (couponsData) => {
        const total = couponsData.length
        const active = couponsData.filter(c => c.status === 'active').length
        const expired = couponsData.filter(c => c.status === 'expired').length
        const scheduled = couponsData.filter(c => c.status === 'scheduled').length
        const totalUses = couponsData.reduce((sum, c) => sum + (c.usedCount || 0), 0)
        const totalDiscount = couponsData.reduce((sum, c) => sum + (c.totalDiscount || 0), 0)

        setStats({ total, active, expired, scheduled, totalUses, totalDiscount })
    }

    // Load coupons on mount
    useEffect(() => {
        fetchCoupons()
    }, [])

    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCoupons()
        }, 500)
        return () => clearTimeout(timer)
    }, [searchQuery, filterStatus, filterType])

    // Create coupon
    const handleCreateCoupon = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const token = getToken()
            const couponData = {
                code: formData.code.toUpperCase(),
                type: formData.type,
                value: parseFloat(formData.value),
                minOrder: formData.minOrder ? parseFloat(formData.minOrder) : 0,
                maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
                startDate: formData.startDate || new Date().toISOString(),
                endDate: formData.endDate,
                usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
                perUserLimit: formData.perUserLimit ? parseInt(formData.perUserLimit) : 1,
                status: formData.status,
                description: formData.description,
                products: selectedProducts.map(p => p.id),
                categories: selectedCategories.map(c => c.id),
            }

            const response = await api.post('/coupons', couponData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setCoupons([response.data.coupon, ...coupons])
                calculateStats([response.data.coupon, ...coupons])
                toast.success('Coupon created successfully!')
                handleCloseModal()
            }
        } catch (error) {
            console.error('❌ Create coupon error:', error)
            toast.error(error.response?.data?.message || 'Failed to create coupon')
        } finally {
            setIsLoading(false)
        }
    }

    // Update coupon
    const handleUpdateCoupon = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const token = getToken()
            const couponData = {
                code: formData.code.toUpperCase(),
                type: formData.type,
                value: parseFloat(formData.value),
                minOrder: formData.minOrder ? parseFloat(formData.minOrder) : 0,
                maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
                startDate: formData.startDate,
                endDate: formData.endDate,
                usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
                perUserLimit: formData.perUserLimit ? parseInt(formData.perUserLimit) : 1,
                status: formData.status,
                description: formData.description,
                products: selectedProducts.map(p => p.id),
                categories: selectedCategories.map(c => c.id),
            }

            const response = await api.put(`/coupons/${editingCoupon._id}`, couponData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setCoupons(coupons.map(c => 
                    c._id === editingCoupon._id ? response.data.coupon : c
                ))
                calculateStats(coupons.map(c => 
                    c._id === editingCoupon._id ? response.data.coupon : c
                ))
                toast.success('Coupon updated successfully!')
                handleCloseModal()
            }
        } catch (error) {
            console.error('❌ Update coupon error:', error)
            toast.error(error.response?.data?.message || 'Failed to update coupon')
        } finally {
            setIsLoading(false)
        }
    }

    // Delete coupon
    const handleDeleteCoupon = async (couponId) => {
        if (!window.confirm('Are you sure you want to delete this coupon?')) return

        try {
            const token = getToken()
            const response = await api.delete(`/coupons/${couponId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setCoupons(coupons.filter(c => c._id !== couponId))
                calculateStats(coupons.filter(c => c._id !== couponId))
                toast.success('Coupon deleted successfully')
            }
        } catch (error) {
            console.error('❌ Delete coupon error:', error)
            toast.error('Failed to delete coupon')
        }
    }

    // Duplicate coupon
    const handleDuplicateCoupon = async (coupon) => {
        try {
            const token = getToken()
            const newCode = `${coupon.code}_COPY`
            const couponData = {
                code: newCode,
                type: coupon.type,
                value: coupon.value,
                minOrder: coupon.minOrder || 0,
                maxDiscount: coupon.maxDiscount || null,
                startDate: coupon.startDate,
                endDate: coupon.endDate,
                usageLimit: coupon.usageLimit || null,
                perUserLimit: coupon.perUserLimit || 1,
                status: 'active',
                description: coupon.description || '',
                products: coupon.products || [],
                categories: coupon.categories || [],
            }

            const response = await api.post('/coupons', couponData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setCoupons([response.data.coupon, ...coupons])
                calculateStats([response.data.coupon, ...coupons])
                toast.success('Coupon duplicated successfully!')
            }
        } catch (error) {
            console.error('❌ Duplicate coupon error:', error)
            toast.error('Failed to duplicate coupon')
        }
    }

    // Open edit modal
    const handleEdit = (coupon) => {
        setEditingCoupon(coupon)
        setFormData({
            code: coupon.code,
            type: coupon.type,
            value: coupon.value,
            minOrder: coupon.minOrder || '',
            maxDiscount: coupon.maxDiscount || '',
            startDate: coupon.startDate ? coupon.startDate.split('T')[0] : '',
            endDate: coupon.endDate ? coupon.endDate.split('T')[0] : '',
            usageLimit: coupon.usageLimit || '',
            perUserLimit: coupon.perUserLimit || 1,
            status: coupon.status,
            description: coupon.description || '',
            applyTo: coupon.products?.length > 0 ? 'specific_products' : 
                     coupon.categories?.length > 0 ? 'specific_categories' : 'all',
        })
        setSelectedProducts(coupon.products || [])
        setSelectedCategories(coupon.categories || [])
        setShowCreateModal(true)
    }

    // Open create modal
    const handleCreate = () => {
        setEditingCoupon(null)
        setFormData({
            code: '',
            type: 'percentage',
            value: '',
            minOrder: '',
            maxDiscount: '',
            startDate: '',
            endDate: '',
            usageLimit: '',
            perUserLimit: 1,
            status: 'active',
            description: '',
            applyTo: 'all',
        })
        setSelectedProducts([])
        setSelectedCategories([])
        setShowCreateModal(true)
    }

    // Close modal
    const handleCloseModal = () => {
        setShowCreateModal(false)
        setEditingCoupon(null)
        setShowDetailsModal(false)
        setSelectedCoupon(null)
    }

    // View coupon details
    const handleViewDetails = (coupon) => {
        setSelectedCoupon(coupon)
        setShowDetailsModal(true)
    }

    // Get status badge
    const getStatusBadge = (status) => {
        const badges = {
            active: 'bg-success/20 text-success',
            expired: 'bg-danger/20 text-danger',
            scheduled: 'bg-amber-500/20 text-amber-400',
        }
        return badges[status] || 'bg-[#1E293B] text-textSecondary'
    }

    // Get type label
    const getTypeLabel = (type) => {
        const labels = {
            percentage: 'Percentage',
            fixed: 'Flat',
            free_shipping: 'Free Shipping',
        }
        return labels[type] || type
    }

    // Get type icon
    const getTypeIcon = (type) => {
        const icons = {
            percentage: <Percent className="w-4 h-4" />,
            fixed: <DollarSign className="w-4 h-4" />,
            free_shipping: <Truck className="w-4 h-4" />,
        }
        return icons[type] || null
    }

    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    // Format date
    const formatDate = (date) => {
        if (!date) return '-'
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    // Copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Coupon code copied!')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-textSecondary">Loading coupons...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Discount & Coupons</h1>
                    <p className="text-desc">
                        Create and manage promotional coupons for your store
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card border border-border">
                        <Gift className="w-4 h-4 text-indigo-400" />
                        <span className="text-table-body font-semibold">{stats.total}</span>
                        <span className="text-xs text-textSecondary">Available Coupons</span>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="btn-primary shadow-lg shadow-indigo-500/25"
                    >
                        <Plus className="w-4 h-4" />
                        Create Coupon
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="card p-4 text-center">
                    <div className="text-title text-indigo-400">{stats.total}</div>
                    <div className="text-sm text-textSecondary">Total</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-success">{stats.active}</div>
                    <div className="text-sm text-textSecondary">Active</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-amber-400">{stats.scheduled}</div>
                    <div className="text-sm text-textSecondary">Scheduled</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-danger">{stats.expired}</div>
                    <div className="text-sm text-textSecondary">Expired</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-cyan-400">{stats.totalUses}</div>
                    <div className="text-sm text-textSecondary">Total Uses</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                        <input
                            type="text"
                            placeholder="Search coupons by code..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full input-field pl-12"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-secondary"
                    >
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-wrap gap-3"
                        >
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="input-field w-40"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="expired">Expired</option>
                            </select>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="input-field w-48"
                            >
                                <option value="all">All Types</option>
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Flat Discount</option>
                                <option value="free_shipping">Free Shipping</option>
                            </select>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Coupons Table */}
            <div className="card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-table-header border-b border-border">
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">#</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Coupon Code</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Type</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Value</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Min Order</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Uses</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Status</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Created</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="py-8 text-center text-textSecondary">
                                        <div className="flex flex-col items-center gap-2">
                                            <Gift className="w-12 h-12 text-textSecondary/30" />
                                            <p>No coupons found</p>
                                            <p className="text-xs">Create your first coupon to get started</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                coupons.map((coupon, index) => (
                                    <motion.tr
                                        key={coupon._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="py-3 text-sm text-textSecondary">{index + 1}</td>
                                        <td className="py-3">
                                            <button
                                                onClick={() => copyToClipboard(coupon.code)}
                                                className="font-mono font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-200 flex items-center gap-2"
                                            >
                                                {coupon.code}
                                                <Copy className="w-3 h-3 text-textSecondary hover:text-white" />
                                            </button>
                                        </td>
                                        <td className="py-3">
                                            <span className="flex items-center gap-1 text-sm text-textSecondary">
                                                {getTypeIcon(coupon.type)}
                                                {getTypeLabel(coupon.type)}
                                            </span>
                                        </td>
                                        <td className="py-3 font-semibold">
                                            {coupon.type === 'percentage' ? `${coupon.value}%` : 
                                             coupon.type === 'free_shipping' ? 'Free' : 
                                             formatCurrency(coupon.value)}
                                        </td>
                                        <td className="py-3 text-sm text-textSecondary">
                                            {coupon.minOrder ? formatCurrency(coupon.minOrder) : '-'}
                                        </td>
                                        <td className="py-3 text-sm">
                                            <span className="font-medium">{coupon.usedCount || 0}</span>
                                            <span className="text-textSecondary"> / {coupon.usageLimit || '∞'}</span>
                                        </td>
                                        <td className="py-3">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(coupon.status)}`}>
                                                {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-textSecondary">{formatDate(coupon.createdAt)}</td>
                                        <td className="py-3 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleViewDetails(coupon)}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(coupon)}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                                    title="Edit Coupon"
                                                >
                                                    <Edit className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleDuplicateCoupon(coupon)}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                                    title="Duplicate Coupon"
                                                >
                                                    <Copy className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCoupon(coupon._id)}
                                                    className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200"
                                                    title="Delete Coupon"
                                                >
                                                    <Trash2 className="w-4 h-4 text-danger" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Coupon Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={handleCloseModal}
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
                                    <h2 className="text-title">
                                        {editingCoupon ? 'Edit Coupon' : 'Create Coupon'}
                                    </h2>
                                    <p className="text-sm text-textSecondary">
                                        {editingCoupon ? 'Update coupon details' : 'Create a new promotional coupon'}
                                    </p>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                >
                                    <X className="w-5 h-5 text-textSecondary hover:text-white" />
                                </button>
                            </div>

                            <form onSubmit={editingCoupon ? handleUpdateCoupon : handleCreateCoupon} className="space-y-4">
                                {/* Coupon Code */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Coupon Code *</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                                        <input
                                            type="text"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                            placeholder="e.g., SUMMER20"
                                            className="input-field pl-12 font-mono uppercase"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Coupon Type & Value */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Discount Type *</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="input-field"
                                            required
                                        >
                                            <option value="percentage">Percentage Discount</option>
                                            <option value="fixed">Flat Discount</option>
                                            <option value="free_shipping">Free Shipping</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Discount Value *</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={formData.value}
                                                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                                placeholder={formData.type === 'percentage' ? 'e.g., 20' : 'e.g., 100'}
                                                className="input-field"
                                                required
                                                min="0"
                                                step="0.01"
                                            />
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-desc">
                                                {formData.type === 'percentage' ? '%' : '₹'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Min Order & Max Discount */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Minimum Order Value</label>
                                        <input
                                            type="number"
                                            value={formData.minOrder}
                                            onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                                            placeholder="e.g., 500"
                                            className="input-field"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Maximum Discount</label>
                                        <input
                                            type="number"
                                            value={formData.maxDiscount}
                                            onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                                            placeholder="e.g., 200"
                                            className="input-field"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Start Date</label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">End Date</label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                {/* Usage Limits */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Total Usage Limit</label>
                                        <input
                                            type="number"
                                            value={formData.usageLimit}
                                            onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                                            placeholder="Leave empty for unlimited"
                                            className="input-field"
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Per Customer Limit</label>
                                        <input
                                            type="number"
                                            value={formData.perUserLimit}
                                            onChange={(e) => setFormData({ ...formData, perUserLimit: e.target.value })}
                                            placeholder="e.g., 1"
                                            className="input-field"
                                            min="1"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe the coupon and its terms..."
                                        rows="2"
                                        className="input-field"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="input-field"
                                    >
                                        <option value="active">Active</option>
                                        <option value="scheduled">Scheduled</option>
                                        <option value="expired">Expired</option>
                                    </select>
                                </div>

                                {/* Product/Category Restrictions */}
                                <div className="pt-4 border-t border-border">
                                    <h4 className="text-sm font-semibold mb-3">Restrictions</h4>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Apply To</label>
                                        <select
                                            value={formData.applyTo}
                                            onChange={(e) => setFormData({ ...formData, applyTo: e.target.value })}
                                            className="input-field"
                                        >
                                            <option value="all">All Products</option>
                                            <option value="specific_products">Specific Products</option>
                                            <option value="specific_categories">Specific Categories</option>
                                        </select>
                                    </div>

                                    {formData.applyTo === 'specific_products' && (
                                        <div className="mt-3">
                                            <label className="block text-sm font-medium mb-1.5">Select Products</label>
                                            <div className="p-3 rounded-2xl bg-background border border-border min-h-[60px]">
                                                {selectedProducts.length === 0 ? (
                                                    <p className="text-sm text-textSecondary">No products selected</p>
                                                ) : (
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedProducts.map((product, idx) => (
                                                            <span key={idx} className="px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs flex items-center gap-1">
                                                                {product.name}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setSelectedProducts(selectedProducts.filter((_, i) => i !== idx))}
                                                                    className="hover:text-white"
                                                                >
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Search products..."
                                                    value={productSearch}
                                                    onChange={(e) => setProductSearch(e.target.value)}
                                                    className="flex-1 input-field"
                                                />
                                                <button type="button" className="px-3 py-2 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200">
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {formData.applyTo === 'specific_categories' && (
                                        <div className="mt-3">
                                            <label className="block text-sm font-medium mb-1.5">Select Categories</label>
                                            <div className="p-3 rounded-2xl bg-background border border-border min-h-[60px]">
                                                {selectedCategories.length === 0 ? (
                                                    <p className="text-sm text-textSecondary">No categories selected</p>
                                                ) : (
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedCategories.map((category, idx) => (
                                                            <span key={idx} className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs flex items-center gap-1">
                                                                {category.name}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setSelectedCategories(selectedCategories.filter((_, i) => i !== idx))}
                                                                    className="hover:text-white"
                                                                >
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Search categories..."
                                                    value={categorySearch}
                                                    onChange={(e) => setCategorySearch(e.target.value)}
                                                    className="flex-1 input-field"
                                                />
                                                <button type="button" className="px-3 py-2 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200">
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-border">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
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
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Coupon Details Modal */}
            <AnimatePresence>
                {showDetailsModal && selectedCoupon && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-title">{selectedCoupon.code}</h2>
                                    <p className="text-sm text-textSecondary">Coupon Details</p>
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                >
                                    <X className="w-5 h-5 text-textSecondary hover:text-white" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between p-3 rounded-xl bg-background border border-border">
                                    <span className="text-sm text-textSecondary">Type</span>
                                    <span className="text-sm font-medium flex items-center gap-1">
                                        {getTypeIcon(selectedCoupon.type)}
                                        {getTypeLabel(selectedCoupon.type)}
                                    </span>
                                </div>
                                <div className="flex justify-between p-3 rounded-xl bg-background border border-border">
                                    <span className="text-sm text-textSecondary">Value</span>
                                    <span className="text-sm font-medium">
                                        {selectedCoupon.type === 'percentage' ? `${selectedCoupon.value}%` : 
                                         selectedCoupon.type === 'free_shipping' ? 'Free Shipping' : 
                                         formatCurrency(selectedCoupon.value)}
                                    </span>
                                </div>
                                <div className="flex justify-between p-3 rounded-xl bg-background border border-border">
                                    <span className="text-sm text-textSecondary">Min Order</span>
                                    <span className="text-sm font-medium">
                                        {selectedCoupon.minOrder ? formatCurrency(selectedCoupon.minOrder) : 'No minimum'}
                                    </span>
                                </div>
                                <div className="flex justify-between p-3 rounded-xl bg-background border border-border">
                                    <span className="text-sm text-textSecondary">Uses</span>
                                    <span className="text-sm font-medium">
                                        {selectedCoupon.usedCount || 0} / {selectedCoupon.usageLimit || '∞'}
                                    </span>
                                </div>
                                <div className="flex justify-between p-3 rounded-xl bg-background border border-border">
                                    <span className="text-sm text-textSecondary">Status</span>
                                    <span className={`text-sm font-medium ${getStatusBadge(selectedCoupon.status)}`}>
                                        {selectedCoupon.status.charAt(0).toUpperCase() + selectedCoupon.status.slice(1)}
                                    </span>
                                </div>
                                <div className="flex justify-between p-3 rounded-xl bg-background border border-border">
                                    <span className="text-sm text-textSecondary">Valid</span>
                                    <span className="text-sm font-medium">
                                        {formatDate(selectedCoupon.startDate)} - {formatDate(selectedCoupon.endDate)}
                                    </span>
                                </div>
                                {selectedCoupon.description && (
                                    <div className="p-3 rounded-xl bg-background border border-border">
                                        <span className="text-sm text-textSecondary">Description</span>
                                        <p className="text-sm font-medium mt-1">{selectedCoupon.description}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleCloseModal}
                                className="w-full mt-6 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default DiscountCoupons