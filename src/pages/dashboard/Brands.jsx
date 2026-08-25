// src/pages/dashboard/Brands.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Plus, Search, Edit, Trash2, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import { brandAPI, galleryAPI } from '../../services/api'

const initialForm = {
    name: '',
    slug: '',
    description: '',
    logo: '',
    isVisible: true,
    status: 'published',
}

const Brands = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [visibilityFilter, setVisibilityFilter] = useState('all')
    const [brands, setBrands] = useState([])
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({ page: 1, limit: 8, total: 0, pages: 1 })
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingBrand, setEditingBrand] = useState(null)
    const [formData, setFormData] = useState(initialForm)
    const [uploadingImage, setUploadingImage] = useState(false)

    const fetchBrands = async (nextPage = 1) => {
        try {
            setLoading(true)
            const params = {
                page: nextPage,
                limit: 8,
                search: searchQuery,
                status: statusFilter,
                visibility: visibilityFilter,
            }
            const res = await brandAPI.getAll(params)
            setBrands(res.data.data || [])
            setPagination(res.data.pagination || { page: 1, limit: 8, total: 0, pages: 1 })
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to load brands')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBrands(page)
    }, [searchQuery, statusFilter, visibilityFilter, page])

    const openAddModal = () => {
        setEditingBrand(null)
        setFormData(initialForm)
        setShowModal(true)
    }

    const openEditModal = (brand) => {
        setEditingBrand(brand)
        setFormData({
            name: brand.name,
            slug: brand.slug,
            description: brand.description || '',
            logo: brand.logo || '',
            isVisible: brand.isVisible,
            status: brand.status === 'inactive' || brand.status === 'draft' ? 'draft' : 'published',
        })
        setShowModal(true)
    }

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        const formDataPayload = new FormData()
        formDataPayload.append('files', file)
        formDataPayload.append('folder', 'brands')

        try {
            setUploadingImage(true)
            const response = await galleryAPI.upload(formDataPayload)
            const uploadedUrl = (response.data.data || []).map((item) => item.url).find(Boolean)
            if (!uploadedUrl) throw new Error('No image returned from upload service')
            setFormData((prev) => ({ ...prev, logo: uploadedUrl }))
            toast.success('Logo uploaded successfully')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to upload logo')
        } finally {
            setUploadingImage(false)
            event.target.value = ''
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const payload = {
                ...formData,
                slug: formData.slug?.trim() || undefined,
                description: formData.description?.trim() || '',
                logo: formData.logo?.trim() || '',
                status: formData.status === 'draft' ? 'draft' : 'published',
            }
            if (editingBrand) {
                await brandAPI.update(editingBrand.id, payload)
                toast.success('Brand updated successfully')
            } else {
                await brandAPI.create(payload)
                toast.success('Brand created successfully')
            }
            setShowModal(false)
            fetchBrands(page)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to save brand')
        }
    }

    const handleDelete = async (brand) => {
        const confirmed = window.confirm(`Delete ${brand.name}?`)
        if (!confirmed) return
        try {
            await brandAPI.delete(brand.id)
            toast.success('Brand deleted successfully')
            fetchBrands(page)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to delete brand')
        }
    }

    const summaryText = useMemo(() => {
        if (!brands.length) return 'No brands found'
        return `${brands.length} brands shown`
    }, [brands.length])

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Brands</h1>
                    <p className="text-desc">Manage product brands</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="btn-primary"
                >
                    <Plus className="w-4 h-4" />
                    Add Brand
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                    <input
                        type="text"
                        placeholder="Search brands..."
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
                    className="input-field w-36"
                >
                    <option value="all">All status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <select
                    value={visibilityFilter}
                    onChange={(e) => {
                        setVisibilityFilter(e.target.value)
                        setPage(1)
                    }}
                    className="input-field w-36"
                >
                    <option value="all">All visibility</option>
                    <option value="show">Visible</option>
                    <option value="hide">Hidden</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                    <div className="md:col-span-2 lg:col-span-4 card p-10 text-center text-textSecondary">Loading brands...</div>
                ) : brands.length === 0 ? (
                    <div className="md:col-span-2 lg:col-span-4 card p-10 text-center text-textSecondary">No brands found</div>
                ) : brands.map((brand, index) => (
                    <motion.div
                        key={brand.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, delay: index * 0.04 }}
                        className="card p-6 text-center hover:border-indigo-500/50 transition-all duration-300"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                            <Building2 className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h3 className="font-semibold">{brand.name}</h3>
                        <p className="text-sm text-textSecondary">/{brand.slug}</p>
                        <p className="text-sm text-textSecondary mt-2">{brand.description || 'No description provided'}</p>
                        <div className="mt-3 flex items-center justify-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${brand.isVisible ? 'bg-success/20 text-success' : 'bg-[#1E293B] text-textSecondary'}`}>
                                {brand.isVisible ? 'Visible' : 'Hidden'}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${brand.status === 'active' ? 'bg-success/20 text-success' : 'bg-[#1E293B] text-textSecondary'}`}>
                                {brand.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => openEditModal(brand)}
                                className="flex-1 px-3 py-1.5 rounded-xl bg-background border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(brand)}
                                className="flex-1 px-3 py-1.5 rounded-xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-all duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {pagination.pages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-textSecondary">{summaryText}</p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="p-2 rounded-lg border border-border disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-textSecondary">Page {pagination.page} of {pagination.pages}</span>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, pagination.pages))}
                            disabled={page >= pagination.pages}
                            className="p-2 rounded-lg border border-border disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-xl rounded-3xl border border-border bg-background p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold">{editingBrand ? 'Edit Brand' : 'Add Brand'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-textSecondary">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-textSecondary">Name</label>
                                    <input
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input-field mt-1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-textSecondary">Slug</label>
                                    <input
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="input-field mt-1"
                                        placeholder="optional"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-textSecondary">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="input-field mt-1 min-h-[96px]"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-textSecondary">Logo URL</label>
                                <input
                                    value={formData.logo}
                                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                                    className="input-field mt-1"
                                    placeholder="https://..."
                                />
                                <div className="mt-2">
                                    <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-border bg-card px-3 py-2 text-sm text-textSecondary hover:border-indigo-500/50">
                                        <span>{uploadingImage ? 'Uploading...' : 'Upload logo'}</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-textSecondary">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="input-field mt-1"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                                <label className="flex items-center gap-2 text-sm text-textSecondary mt-7">
                                    <input
                                        type="checkbox"
                                        checked={formData.isVisible}
                                        onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                                    />
                                    Visible in storefront
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-2xl bg-card border border-border text-sm">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm">
                                    {editingBrand ? 'Update Brand' : 'Create Brand'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Brands











