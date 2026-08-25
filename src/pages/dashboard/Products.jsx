// src/pages/dashboard/Products.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Cropper from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Package,
    MoreVertical,
    Upload,
    ArrowUpDown,
    Inbox,
    Check,
    ImagePlus,
    X,
    FileEdit,
    DollarSign,
    List,
    RefreshCw,
} from 'lucide-react'
import { brandAPI, categoryAPI, galleryAPI, productAPI, storeCategoryAPI } from '../../services/api'

const initialForm = {
    title: '',
    slug: '',
    description: '',
    price: '',
    sku: '',
    categoryId: '',
    brandId: '',
    status: 'draft',
    featured: false,
    seoTitle: '',
    seoDescription: '',
    images: [''],
    variants: [{ size: '', color: '', price: '', stock: '', sku: '' }],
    currentStock: '',
    lowStockThreshold: '10',
    crossedPrice: '0',
    costPrice: '0',
    weight: '0',
    continueSelling: false,
    hasVariants: false,
    hasCustomFields: false,
    customFields: [{ id: `${Date.now()}-1`, type: 'Text', label: '', placeholder: '', required: false }],
    selectedVariantOptions: [],
    selectedSizeOptions: [],
    variantCombinations: [],
}

const isValidMongoObjectId = (value) => /^[a-f\d]{24}$/i.test(String(value || ''))

const generateCombinations = (variants, sizes) => {
    if (!variants.length || !sizes.length) return []
    const combinations = []
    for (const variant of variants) {
        for (const size of sizes) {
            combinations.push({
                name: `${variant}/${size}`,
                crossedPrice: '0',
                price: '0',
                costPrice: '0',
                weight: '0',
                stock: '0',
                sku: '',
                image: null,
            })
        }
    }
    return combinations
}

const Products = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedBrand, setSelectedBrand] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [sortOrder, setSortOrder] = useState('-createdAt')
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({ page: 1, limit: 8, total: 0, pages: 1 })
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])
    const [formData, setFormData] = useState(initialForm)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [showActionsMenu, setShowActionsMenu] = useState(false)
    const [activeTab, setActiveTab] = useState('active')
    const [productStep, setProductStep] = useState(1)
    const [cropImage, setCropImage] = useState('')
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [cropRatio, setCropRatio] = useState({ label: '4:5', value: 4 / 5 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [openRowMenuId, setOpenRowMenuId] = useState(null)
    const [statusProduct, setStatusProduct] = useState(null)
    const [statusSaving, setStatusSaving] = useState(false)
    const [showVariantImageModal, setShowVariantImageModal] = useState(false)
    const [variantImageCrop, setVariantImageCrop] = useState({ x: 0, y: 0 })
    const [variantImageZoom, setVariantImageZoom] = useState(1)
    const [variantImageRatio, setVariantImageRatio] = useState({ label: '4:5', value: 4 / 5 })
    const [variantImageCropPixels, setVariantImageCropPixels] = useState(null)
    const [variantImageFile, setVariantImageFile] = useState(null)
    const [currentVariantImageIndex, setCurrentVariantImageIndex] = useState(null)

    const fetchProducts = async (nextPage = 1) => {
        try {
            setLoading(true)
            const params = {
                page: nextPage,
                limit: 8,
                search: searchQuery,
                category: selectedCategory !== 'all' ? selectedCategory : '',
                brand: selectedBrand !== 'all' ? selectedBrand : '',
                status: selectedStatus !== 'all' ? selectedStatus : '',
                sort: sortOrder,
            }
            const res = await productAPI.getAll(params)
            setProducts(res.data.data || res.data.products || [])
            setPagination(res.data.pagination || { page: 1, limit: 8, total: 0, pages: 1 })
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to load products')
        } finally {
            setLoading(false)
        }
    }

    const fetchCatalog = async () => {
        let localCategories = []
        try {
            const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]')
            localCategories = Array.isArray(savedCategories) ? savedCategories : []
        } catch {
            localCategories = []
        }

        try {
            const categoryRes = await categoryAPI.getAll({ page: 1, limit: 100 })
            const apiCategories = categoryRes.data.data || categoryRes.data.categories || []
            const mergedCategories = [...apiCategories, ...localCategories].filter((category, index, list) => (
                category?.id && list.findIndex((item) => String(item.id) === String(category.id)) === index
            ))
            setCategories(mergedCategories)
        } catch (error) {
            setCategories(localCategories)
            console.error('Unable to load API categories, using Store Categories:', error)
        }

        try {
            const brandRes = await brandAPI.getAll({ page: 1, limit: 100 })
            setBrands(brandRes.data.data || brandRes.data.brands || [])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCatalog()
    }, [])

    useEffect(() => {
        fetchProducts(page)
    }, [searchQuery, selectedCategory, selectedBrand, selectedStatus, sortOrder, page])

    const openAddModal = () => {
        setEditingProduct(null)
        setFormData(initialForm)
        setProductStep(1)
        setShowModal(true)
    }

    const openEditModal = (product) => {
        setEditingProduct(product)
        const hasVariants = Boolean(product.hasVariants || (product.variants && product.variants.length > 0))
        const variants = (product.variants || []).map((variant) => ({
            size: variant.size || '',
            color: variant.color || '',
            price: variant.price ?? '',
            stock: variant.stock ?? '',
            sku: variant.sku || '',
        })) || [{ size: '', color: '', price: '', stock: '', sku: '' }]
        
        let selectedVariants = []
        let selectedSizes = []
        let variantCombinations = []
        
        if (hasVariants && product.variants && product.variants.length > 0) {
            selectedVariants = [...new Set(product.variants.map(v => v.color).filter(Boolean))]
            selectedSizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))]
            variantCombinations = product.variants.map((v) => ({
                name: `${v.color || ''}/${v.size || ''}`.replace(/^\/|\/$/g, ''),
                price: v.price ?? '0',
                stock: v.stock ?? '0',
                sku: v.sku || '',
                crossedPrice: v.crossedPrice || '0',
                costPrice: v.costPrice || '0',
                weight: v.weight || '0',
            }))
        }
        
        setFormData({
            title: product.title || product.name || '',
            slug: product.slug || '',
            description: product.description || '',
            price: product.price ?? product.pricing?.price ?? '',
            sku: product.sku || '',
            categoryId: product.categoryId || product.category || '',
            brandId: product.brandId || product.brand || '',
            status: product.status || 'draft',
            featured: Boolean(product.featured),
            seoTitle: product.seo?.title || product.seoTitle || '',
            seoDescription: product.seo?.description || product.seoDescription || '',
            images: (product.images || []).map((image) => image.imageUrl || image.url || image).filter(Boolean) || [''],
            variants: variants,
            currentStock: product.inventory?.currentStock ?? '',
            lowStockThreshold: product.inventory?.lowStockThreshold ?? '10',
            crossedPrice: product.crossedPrice || '0',
            costPrice: product.costPrice || '0',
            weight: product.weight || '0',
            continueSelling: Boolean(product.continueSelling),
            hasVariants: hasVariants,
            hasCustomFields: Boolean(product.hasCustomFields),
            customFields: product.customFields?.length ? product.customFields : [{ id: `${Date.now()}-1`, type: 'Text', label: '', placeholder: '', required: false }],
            selectedVariantOptions: selectedVariants,
            selectedSizeOptions: selectedSizes,
            variantCombinations: variantCombinations,
        })
        setProductStep(1)
        setShowModal(true)
    }

    const openViewModal = (product) => {
        setSelectedProduct(product)
        setShowDetailsModal(true)
    }

    const handleVariantChange = (index, field, value) => {
        const next = [...formData.variants]
        next[index][field] = value
        setFormData({ ...formData, variants: next })
    }

    const addVariant = () => {
        setFormData({ ...formData, variants: [...formData.variants, { size: '', color: '', price: '', stock: '', sku: '' }] })
    }

    const removeVariant = (index) => {
        if (formData.variants.length === 1) return
        const next = formData.variants.filter((_, itemIndex) => itemIndex !== index)
        setFormData({ ...formData, variants: next })
    }

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            setCropImage(reader.result)
            setCrop({ x: 0, y: 0 })
            setZoom(1)
            setCroppedAreaPixels(null)
        }
        reader.readAsDataURL(file)
        event.target.value = ''
    }

    const applyProductCrop = async () => {
        if (!cropImage || !croppedAreaPixels) return
        const sourceImage = await new Promise((resolve, reject) => {
            const imageElement = new Image()
            imageElement.onload = () => resolve(imageElement)
            imageElement.onerror = reject
            imageElement.src = cropImage
        })
        const canvas = document.createElement('canvas')
        canvas.width = croppedAreaPixels.width
        canvas.height = croppedAreaPixels.height
        const context = canvas.getContext('2d')
        context.drawImage(sourceImage, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, croppedAreaPixels.width, croppedAreaPixels.height)
        setFormData((previous) => ({ ...previous, images: [...previous.images.filter(Boolean), canvas.toDataURL('image/jpeg', 0.92)] }))
        setCropImage('')
    }

    const applyVariantImageCrop = async () => {
        if (!variantImageFile || !variantImageCropPixels || currentVariantImageIndex === null) return
        const sourceImage = await new Promise((resolve, reject) => {
            const imageElement = new Image()
            imageElement.onload = () => resolve(imageElement)
            imageElement.onerror = reject
            imageElement.src = variantImageFile
        })
        const canvas = document.createElement('canvas')
        canvas.width = variantImageCropPixels.width
        canvas.height = variantImageCropPixels.height
        const context = canvas.getContext('2d')
        context.drawImage(sourceImage, variantImageCropPixels.x, variantImageCropPixels.y, variantImageCropPixels.width, variantImageCropPixels.height, 0, 0, variantImageCropPixels.width, variantImageCropPixels.height)
        const croppedImageData = canvas.toDataURL('image/jpeg', 0.92)
        
        setFormData((previous) => {
            const updated = { ...previous }
            const combinations = [...updated.variantCombinations]
            combinations[currentVariantImageIndex].image = croppedImageData
            return { ...updated, variantCombinations: combinations }
        })
        
        setShowVariantImageModal(false)
        setVariantImageFile(null)
        setCurrentVariantImageIndex(null)
        setVariantImageCrop({ x: 0, y: 0 })
        setVariantImageZoom(1)
        setVariantImageCropPixels(null)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            let categoryId = formData.categoryId?.trim()
            const selectedCategory = categories.find((category) => String(category.id) === String(categoryId))
            if (categoryId && !isValidMongoObjectId(categoryId)) {
                const response = await storeCategoryAPI.create({
                    name: selectedCategory?.name || categoryId,
                    image: selectedCategory?.image || '',
                })
                const savedCategory = response.data?.data || response.data
                categoryId = savedCategory.id
                setCategories((current) => current.map((category) => (
                    String(category.id) === String(formData.categoryId) ? savedCategory : category
                )))
                try {
                    const localCategories = JSON.parse(localStorage.getItem('categories') || '[]')
                    localStorage.setItem('categories', JSON.stringify(localCategories.map((category) => (
                        String(category.id) === String(formData.categoryId) ? savedCategory : category
                    ))))
                } catch {
                    // The product can still be saved when local category storage is unavailable.
                }
            }

            if (categoryId && !isValidMongoObjectId(categoryId)) {
                toast.error('Please select a valid category')
                return
            }
            const payload = {
                title: formData.title.trim(),
                slug: formData.slug.trim() || undefined,
                description: formData.description.trim(),
                price: Number(formData.price || 0),
                pricing: { price: Number(formData.price || 0) },
                sku: formData.sku.trim(),
                categoryId: categoryId || undefined,
                brandId: formData.brandId || undefined,
                status: formData.status,
                featured: formData.featured,
                seoTitle: formData.seoTitle.trim(),
                seoDescription: formData.seoDescription.trim(),
                seo: {
                    title: formData.seoTitle.trim(),
                    description: formData.seoDescription.trim(),
                },
                images: formData.images.filter(Boolean),
                variants: formData.hasVariants
                    ? formData.variantCombinations.map((combo) => ({
                        size: combo.name.split('/')[1] || '',
                        color: combo.name.split('/')[0] || '',
                        price: Number(combo.price || 0),
                        stock: Number(combo.stock || 0),
                        sku: combo.sku.trim() || '',
                    }))
                    : formData.variants.filter((variant) => variant.size || variant.color || variant.price || variant.stock || variant.sku).map((variant) => ({
                        size: variant.size.trim(),
                        color: variant.color.trim(),
                        price: Number(variant.price || 0),
                        stock: Number(variant.stock || 0),
                        sku: variant.sku.trim(),
                    })),
                inventory: {
                    currentStock: formData.hasVariants 
                        ? formData.variantCombinations.reduce((sum, combo) => sum + Number(combo.stock || 0), 0)
                        : Number(formData.currentStock || 0),
                    lowStockThreshold: Number(formData.lowStockThreshold || 10),
                },
                currentStock: formData.hasVariants 
                    ? formData.variantCombinations.reduce((sum, combo) => sum + Number(combo.stock || 0), 0)
                    : Number(formData.currentStock || 0),
                lowStockThreshold: Number(formData.lowStockThreshold || 10),
                crossedPrice: formData.hasVariants ? 0 : Number(formData.crossedPrice || 0),
                costPrice: formData.hasVariants ? 0 : Number(formData.costPrice || 0),
                weight: formData.hasVariants 
                    ? formData.variantCombinations.reduce((sum, combo) => sum + Number(combo.weight || 0), 0) / Math.max(formData.variantCombinations.length, 1)
                    : Number(formData.weight || 0),
                continueSelling: Boolean(formData.continueSelling),
                hasVariants: Boolean(formData.hasVariants),
                hasCustomFields: Boolean(formData.hasCustomFields),
                customFields: formData.hasCustomFields ? formData.customFields : [],
            }
            if (editingProduct) {
                await productAPI.update(editingProduct.id || editingProduct._id, payload)
                toast.success('Product updated successfully')
            } else {
                await productAPI.create(payload)
                toast.success('Product created successfully')
            }
            setShowModal(false)
            fetchProducts(page)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to save product')
        }
    }

    const handleDelete = async (product) => {
        const confirmed = window.confirm(`Delete ${product.title || product.name}?`)
        if (!confirmed) return
        try {
            await productAPI.delete(product.id || product._id)
            toast.success('Product deleted successfully')
            fetchProducts(page)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to delete product')
        }
    }

    const handleStatusUpdate = async (product, status) => {
        try {
            setStatusSaving(true)
            await productAPI.updateStatus(product.id || product._id, status)
            toast.success('Product status updated successfully')
            setStatusProduct(null)
            setOpenRowMenuId(null)
            fetchProducts(page)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to update product status')
        } finally {
            setStatusSaving(false)
        }
    }

    const handleMenuAction = (action, product) => {
        setOpenRowMenuId(null)
        if (action === 'view') openViewModal(product)
        if (action === 'general') openEditModal(product) // Open Edit General Info Modal
        if (action === 'price') openEditModal(product) // Open Edit Price & Inventory Modal
        if (action === 'custom') openEditModal(product) // Open Edit Custom Fields Modal
        if (action === 'seo') openEditModal(product) // Open Update SEO Metadata Modal
        if (action === 'status') setStatusProduct(product)
        if (action === 'delete') handleDelete(product)
    }

    const handleBulkDelete = async () => {
        if (!selectedIds.length) return
        const confirmed = window.confirm('Delete the selected products?')
        if (!confirmed) return
        try {
            await productAPI.bulkDelete(selectedIds)
            toast.success('Selected products deleted successfully')
            setSelectedIds([])
            fetchProducts(page)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to delete selected products')
        }
    }

    const handleBulkStatus = async (status) => {
        if (!selectedIds.length) return
        try {
            await productAPI.bulkStatusUpdate(selectedIds, status)
            toast.success('Selected products updated successfully')
            setSelectedIds([])
            fetchProducts(page)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to update selected products')
        }
    }

    const toggleSelection = (id) => {
        setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
    }

    const getStatusColor = (status) => {
        const normalized = String(status || '').toLowerCase()
        const colors = {
            published: 'bg-success/20 text-success',
            active: 'bg-success/20 text-success',
            draft: 'bg-[#1E293B] text-textSecondary',
            inactive: 'bg-[#1E293B] text-textSecondary',
            low_stock: 'bg-amber-500/20 text-amber-400',
            out_of_stock: 'bg-danger/20 text-danger',
        }
        return colors[normalized] || 'bg-[#1E293B] text-textSecondary'
    }

    const summaryText = useMemo(() => {
        if (!products.length) return 'No products found'
        return `${products.length} products shown`
    }, [products.length])

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        setSelectedStatus(tab === 'active' ? 'published' : tab)
        setPage(1)
    }

    const toggleAllProducts = () => {
        const visibleIds = products.map((product) => product.id || product._id).filter(Boolean)
        setSelectedIds((current) => current.length === visibleIds.length ? [] : visibleIds)
    }

    return (
        <div className="min-h-full space-y-4 bg-white text-gray-900 dark:bg-black dark:text-white">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-4">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <div className="flex items-center rounded-md bg-gray-100 p-1 dark:bg-gray-900">
                        {['active', 'draft', 'archived'].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => handleTabChange(tab)}
                                className={`rounded px-4 py-2 text-sm font-medium capitalize ${activeTab === tab ? 'bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(event) => { setSearchQuery(event.target.value); setPage(1) }}
                            className="h-10 w-full rounded border border-gray-300 bg-white pl-9 pr-3 text-sm text-gray-900 outline-none focus:border-purple-500 dark:border-gray-800 dark:bg-black dark:text-white"
                        />
                    </div>
                    <div className="relative">
                        <button type="button" onClick={() => setShowActionsMenu((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded border border-gray-300 bg-white text-purple-600 hover:bg-gray-100 dark:border-gray-800 dark:bg-black dark:text-purple-400 dark:hover:bg-gray-900" aria-label="Product actions">
                            <MoreVertical className="h-5 w-5" />
                        </button>
                        {showActionsMenu && (
                            <div className="absolute right-0 top-11 z-20 w-40 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-950">
                                <button type="button" onClick={() => { setShowActionsMenu(false); openAddModal() }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-purple-600 hover:bg-gray-100 dark:text-purple-400 dark:hover:bg-gray-900">
                                    <Plus className="h-4 w-4" /> Add Product
                                </button>
                                <button type="button" onClick={() => setShowActionsMenu(false)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900">
                                    <Upload className="h-4 w-4" /> Bulk Upload
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-visible rounded border border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
                <table className="min-w-[900px] w-full table-fixed text-left">
                    <thead className="border-b border-gray-200 text-[11px] uppercase text-gray-500 dark:border-gray-800 dark:text-gray-400">
                        <tr>
                            <th className="w-10 px-2 py-3"><input type="checkbox" checked={products.length > 0 && selectedIds.length === products.length} onChange={toggleAllProducts} aria-label="Select all products" /></th>
                            <th className="w-10 px-2 py-3">#</th>
                            {['NAME', 'PRICE', 'INVENTORY', 'STATUS', 'CREATED', 'ACTIONS'].map((header) => (
                                <th key={header} className="px-3 py-3 font-semibold">
                                    <span className="inline-flex items-center gap-1">{header}{['NAME', 'PRICE', 'INVENTORY', 'CREATED'].includes(header) && <ArrowUpDown className="h-3 w-3" />}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
                {loading ? (
                    <div className="flex h-32 items-center justify-center text-sm text-gray-500 dark:text-gray-400">Loading products...</div>
                ) : products.length === 0 ? (
                    <div className="flex h-32 flex-col items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Inbox className="h-7 w-7 text-gray-400" />
                        <span>No records</span>
                    </div>
                ) : (
                    <table className="min-w-[900px] w-full table-fixed text-left">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {products.map((product, index) => {
                                const productId = product.id || product._id
                                const stock = Number(product.inventory?.currentStock ?? product.currentStock ?? 0)
                                const imageUrl = product.images?.[0]?.imageUrl || product.images?.[0]?.url || product.images?.[0] || ''
                                const createdDate = product.createdAt ? new Date(product.createdAt).toLocaleDateString() : '—'
                                return (
                                    <tr key={productId} className="text-sm hover:bg-gray-50 dark:hover:bg-gray-950">
                                        <td className="w-10 px-2 py-3"><input type="checkbox" checked={selectedIds.includes(productId)} onChange={() => toggleSelection(productId)} aria-label={`Select ${product.title || product.name}`} /></td>
                                        <td className="w-10 px-2 py-3 text-gray-500">{index + 1}</td>
                                        <td className="px-3 py-3"><div className="flex items-center gap-2"><div className="h-8 w-8 overflow-hidden rounded bg-gray-100 dark:bg-gray-900">{imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : <Package className="m-2 h-4 w-4 text-gray-400" />}</div><span className="truncate font-medium">{product.title || product.name || 'Untitled product'}</span></div></td>
                                        <td className="px-3 py-3">{Number(product.price ?? 0).toFixed(2)}</td>
                                        <td className="px-3 py-3">{stock}</td>
                                        <td className="px-3 py-3"><span className={`rounded-full px-2 py-1 text-xs capitalize ${getStatusColor(product.status)}`}>{product.status || 'draft'}</span></td>
                                        <td className="px-3 py-3 text-gray-500">{createdDate}</td>
                                        <td className="relative px-3 py-3"><button type="button" onClick={() => setOpenRowMenuId(openRowMenuId === productId ? null : productId)} className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-purple-600 dark:hover:bg-gray-900" aria-label="Open product actions"><MoreVertical className="h-5 w-5" /></button>{openRowMenuId === productId && <ProductActionMenu product={product} onAction={handleMenuAction} />}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && false && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-3xl rounded-3xl border border-border bg-background p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-textSecondary">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-textSecondary">Title</label>
                                    <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-field mt-1" required />
                                </div>
                                <div>
                                    <label className="text-sm text-textSecondary">SKU</label>
                                    <input value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} className="input-field mt-1" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-textSecondary">Slug</label>
                                <input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="input-field mt-1" placeholder="optional" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-textSecondary">Price</label>
                                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="input-field mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm text-textSecondary">Current Stock</label>
                                    <input type="number" value={formData.currentStock} onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })} className="input-field mt-1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-textSecondary">Category</label>
                                    <select value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} className="input-field mt-1">
                                        <option value="">Select Category</option>
                                        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm text-textSecondary">Brand</label>
                                    <select value={formData.brandId} onChange={(e) => setFormData({ ...formData, brandId: e.target.value })} className="input-field mt-1">
                                        <option value="">Select Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-textSecondary">Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field mt-1 min-h-[96px]" />
                            </div>

                            <div>
                                <label className="text-sm text-textSecondary">Images (one per line)</label>
                                <textarea value={formData.images.join('\n')} onChange={(e) => setFormData({ ...formData, images: e.target.value.split(/\n|,/).map((item) => item.trim()).filter(Boolean) })} className="input-field mt-1 min-h-[80px]" />
                                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-border bg-card px-3 py-2 text-sm text-textSecondary hover:border-indigo-500/50">
                                        <span>{uploadingImage ? 'Uploading...' : 'Upload image'}</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                                    </label>
                                    <p className="text-xs text-textSecondary">Uploads go directly to the gallery and are added to this product.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-textSecondary">Status</label>
                                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field mt-1">
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm text-textSecondary mt-7">
                                        <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                                        Featured product
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-textSecondary">Low Stock Threshold</label>
                                    <input type="number" value={formData.lowStockThreshold} onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })} className="input-field mt-1" />
                                </div>
                                <div>
                                    <label className="text-sm text-textSecondary">SEO Title</label>
                                    <input value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} className="input-field mt-1" />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-textSecondary">SEO Description</label>
                                <textarea value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} className="input-field mt-1 min-h-[80px]" />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Variants</h4>
                                    <button type="button" onClick={addVariant} className="text-sm text-cyan-400">+ Add Variant</button>
                                </div>
                                {formData.variants.map((variant, index) => (
                                    <div key={index} className="rounded-2xl border border-border p-3 space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                            <input placeholder="Size" value={variant.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)} className="input-field" />
                                            <input placeholder="Color" value={variant.color} onChange={(e) => handleVariantChange(index, 'color', e.target.value)} className="input-field" />
                                            <input type="number" placeholder="Price" value={variant.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} className="input-field" />
                                            <input type="number" placeholder="Stock" value={variant.stock} onChange={(e) => handleVariantChange(index, 'stock', e.target.value)} className="input-field" />
                                            <input placeholder="SKU" value={variant.sku} onChange={(e) => handleVariantChange(index, 'sku', e.target.value)} className="input-field" />
                                        </div>
                                        {formData.variants.length > 1 && (
                                            <div className="flex justify-end">
                                                <button type="button" onClick={() => removeVariant(index)} className="text-sm text-danger">Remove</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-2xl bg-card border border-border text-sm">Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm">{editingProduct ? 'Update Product' : 'Create Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showModal && (
                <ProductWizardModal
                    formData={formData}
                    setFormData={setFormData}
                    categories={categories}
                    productStep={productStep}
                    setProductStep={setProductStep}
                    onClose={() => { setShowModal(false); setCropImage('') }}
                    onSubmit={handleSubmit}
                    onImageSelect={handleImageUpload}
                    cropImage={cropImage}
                    crop={crop}
                    setCrop={setCrop}
                    zoom={zoom}
                    setZoom={setZoom}
                    cropRatio={cropRatio}
                    setCropRatio={setCropRatio}
                    setCroppedAreaPixels={setCroppedAreaPixels}
                    applyCrop={applyProductCrop}
                    onVariantChange={handleVariantChange}
                    onAddVariant={addVariant}
                    onRemoveVariant={removeVariant}
                    editingProduct={editingProduct}
                    showVariantImageModal={showVariantImageModal}
                    setShowVariantImageModal={setShowVariantImageModal}
                    variantImageFile={variantImageFile}
                    setVariantImageFile={setVariantImageFile}
                    variantImageCrop={variantImageCrop}
                    setVariantImageCrop={setVariantImageCrop}
                    variantImageZoom={variantImageZoom}
                    setVariantImageZoom={setVariantImageZoom}
                    variantImageRatio={variantImageRatio}
                    setVariantImageRatio={setVariantImageRatio}
                    variantImageCropPixels={variantImageCropPixels}
                    setVariantImageCropPixels={setVariantImageCropPixels}
                    currentVariantImageIndex={currentVariantImageIndex}
                    setCurrentVariantImageIndex={setCurrentVariantImageIndex}
                    applyVariantImageCrop={applyVariantImageCrop}
                />
            )}

            {showDetailsModal && selectedProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-2xl rounded-3xl border border-border bg-background p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold">Product Details</h3>
                            <button onClick={() => setShowDetailsModal(false)} className="text-textSecondary">✕</button>
                        </div>
                        <div className="space-y-3 text-sm text-textSecondary">
                            <p><span className="text-white">Title:</span> {selectedProduct.title || selectedProduct.name}</p>
                            <p><span className="text-white">Description:</span> {selectedProduct.description}</p>
                            <p><span className="text-white">Price:</span> {Number(selectedProduct.price ?? 0).toFixed(2)}</p>
                            <p><span className="text-white">SKU:</span> {selectedProduct.sku}</p>
                            <p><span className="text-white">Category:</span> {selectedProduct.category?.name || selectedProduct.categoryName || '—'}</p>
                            <p><span className="text-white">Brand:</span> {selectedProduct.brand?.name || selectedProduct.brandName || '—'}</p>
                            <p><span className="text-white">Status:</span> {selectedProduct.status}</p>
                            <p><span className="text-white">Featured:</span> {selectedProduct.featured ? 'Yes' : 'No'}</p>
                            <p><span className="text-white">SEO Title:</span> {selectedProduct.seo?.title || selectedProduct.seoTitle || '—'}</p>
                            <p><span className="text-white">SEO Description:</span> {selectedProduct.seo?.description || selectedProduct.seoDescription || '—'}</p>
                            <div>
                                <span className="text-white">Variants:</span>
                                <ul className="mt-2 space-y-1">
                                    {(selectedProduct.variants || []).map((variant, index) => (
                                        <li key={index}>{variant.size || '—'} / {variant.color || '—'} — Stock {variant.stock || 0}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {statusProduct && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-black dark:text-white">
                        <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Update Status</h3><button type="button" onClick={() => setStatusProduct(null)}><X className="h-5 w-5 text-gray-500" /></button></div>
                        <div className="space-y-2">{['active', 'inactive', 'draft'].map((status) => <button key={status} type="button" disabled={statusSaving} onClick={() => handleStatusUpdate(statusProduct, status)} className="flex w-full items-center justify-between rounded px-3 py-2 text-left capitalize hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-900">{status}<RefreshCw className="h-4 w-4 text-gray-400" /></button>)}</div>
                    </div>
                </div>
            )}
        </div>
    )
}

const ProductActionMenu = ({ product, onAction }) => {
    const items = [
        ['view', Eye, 'View'],
        ['general', FileEdit, 'Edit General Information'],
        ['price', DollarSign, 'Edit Price & Inventory'],
        ['custom', List, 'Edit Custom Fields'],
        ['status', RefreshCw, 'Update Status'],
        ['seo', Search, 'Update SEO Metadata'],
    ]

    return (
        <div className="absolute right-3 top-12 z-50 w-64 rounded-md border border-gray-200 bg-white py-1 text-gray-900 shadow-xl dark:border-gray-800 dark:bg-[#1f1f1f] dark:text-white">
            {items.map(([action, Icon, label]) => <button key={action} type="button" onClick={() => onAction(action, product)} className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900"><Icon className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />{label}</button>)}
            <hr className="my-1 border-gray-200 dark:border-gray-800" />
            <p className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400">Danger zone</p>
            <button type="button" onClick={() => onAction('delete', product)} className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"><Trash2 className="h-4 w-4" />Delete</button>
        </div>
    )
}

const cropRatios = [
    { label: '4:9', value: 4 / 9 },
    { label: '4:5', value: 4 / 5 },
    { label: '9:16', value: 9 / 16 },
    { label: '16:9', value: 16 / 9 },
]

const ProductWizardModal = ({
    formData,
    setFormData,
    categories,
    productStep,
    setProductStep,
    onClose,
    onSubmit,
    onImageSelect,
    cropImage,
    crop,
    setCrop,
    zoom,
    setZoom,
    cropRatio,
    setCropRatio,
    setCroppedAreaPixels,
    applyCrop,
    onVariantChange,
    onAddVariant,
    onRemoveVariant,
    editingProduct,
    showVariantImageModal,
    setShowVariantImageModal,
    variantImageFile,
    setVariantImageFile,
    variantImageCrop,
    setVariantImageCrop,
    variantImageZoom,
    setVariantImageZoom,
    variantImageRatio,
    setVariantImageRatio,
    variantImageCropPixels,
    setVariantImageCropPixels,
    currentVariantImageIndex,
    setCurrentVariantImageIndex,
    applyVariantImageCrop,
}) => {
    const update = (key, value) => setFormData((previous) => ({ ...previous, [key]: value }))
    const addVariantValues = (key, value) => {
        const values = value.split(',').map((item) => item.trim()).filter(Boolean)
        if (!values.length) return []
        const currentValues = formData[key] || []
        const updatedValues = [...currentValues, ...values.filter((item) => !currentValues.includes(item))]
        update(key, updatedValues)
        update('variantCombinations', generateCombinations(
            key === 'selectedVariantOptions' ? updatedValues : formData.selectedVariantOptions || [],
            key === 'selectedSizeOptions' ? updatedValues : formData.selectedSizeOptions || []
        ))
        return updatedValues
    }
    const inputClass = 'mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:bg-black dark:text-white'
    const labelClass = 'block text-sm font-semibold text-gray-800 dark:text-white'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white text-gray-900 shadow-2xl dark:bg-black dark:text-white">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                    <h2 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                    <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" aria-label="Close"><X className="h-6 w-6" /></button>
                </div>

                <div className="border-b border-gray-200 bg-purple-50 px-5 py-4 dark:border-gray-800 dark:bg-[#1f1f1f]">
                    <div className="flex items-center justify-between gap-2">
                        {[
                            ['General Information', 1],
                            ['Variants & Inventory', 2],
                            ['Custom Fields', 3],
                        ].map(([title, step], index) => (
                            <React.Fragment key={title}>
                                <div className="flex min-w-0 items-center gap-2">
                                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${productStep > step ? 'border-purple-600 bg-purple-600 text-white' : productStep === step ? 'border-purple-600 text-purple-700 dark:text-purple-300' : 'border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-400'}`}>
                                        {productStep > step ? <Check className="h-5 w-5" /> : step}
                                    </div>
                                    <div className="hidden min-w-0 sm:block">
                                        <p className="text-xs font-bold">STEP {step}</p>
                                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{title}</p>
                                    </div>
                                </div>
                                {index < 2 && <div className={`h-0.5 flex-1 ${productStep > step ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <form onSubmit={onSubmit} className="min-h-0 flex-1 overflow-y-auto p-6">
                    {productStep === 1 && (
                        <div className="space-y-5">
                            <div>
                                <label className={labelClass}>Product Name *</label>
                                <input value={formData.title} onChange={(event) => update('title', event.target.value)} placeholder="eg: Red Doko Styled T-shirt" required className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Categories *</label>
                                <select value={formData.categoryId} onChange={(event) => update('categoryId', event.target.value)} className={inputClass}>
                                    <option value="">Select product categories</option>
                                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Product Description *</label>
                                <textarea value={formData.description} onChange={(event) => update('description', event.target.value)} placeholder={'Good & converting description contains:\n• Solutions to customer pain points.\n• Simple language that highlights value.\n• Clear and concise key features and benefits.\n• Context to help customers imagine using the product.'} required rows={6} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Product Images *</label>
                                <label className="mt-1 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-5 text-center dark:border-gray-700 dark:bg-[#111111]">
                                    {formData.images.filter(Boolean).length > 0 ? (
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {formData.images.filter(Boolean).map((image, index) => <img key={`${image}-${index}`} src={image} alt={`Product ${index + 1}`} className="h-20 w-20 rounded-lg object-cover" />)}
                                        </div>
                                    ) : (
                                        <><ImagePlus className="mb-2 h-10 w-10 text-gray-400" /><span className="text-sm text-gray-500 dark:text-gray-400">Click to upload product image</span></>
                                    )}
                                    <input type="file" accept="image/*" onChange={onImageSelect} className="hidden" />
                                </label>
                            </div>
                            <div className="flex justify-end border-t border-gray-200 pt-4 dark:border-gray-800">
                                <button type="button" onClick={() => setProductStep(2)} className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700">Next: Variants &amp; Inventory</button>
                            </div>
                        </div>
                    )}

                    {productStep === 2 && (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                                <div><p className="font-semibold">Enable Product Variants</p><p className="text-sm text-gray-500 dark:text-gray-400">Whenever you have multiple color/sizes/specs for any product</p></div>
                                <button type="button" onClick={() => {
                                    update('hasVariants', !formData.hasVariants)
                                    if (!formData.hasVariants) {
                                        update('selectedVariantOptions', [])
                                        update('selectedSizeOptions', [])
                                        update('variantCombinations', [])
                                    }
                                }} className={`relative h-7 w-14 rounded-full transition ${formData.hasVariants ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`} aria-label="Toggle variants"><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${formData.hasVariants ? 'left-8' : 'left-1'}`} /></button>
                            </div>

                            {!formData.hasVariants ? (
                                <>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        {[['Crossed Price', 'crossedPrice'], ['Selling Price *', 'price'], ['Cost Price', 'costPrice']].map(([label, key]) => (
                                            <div key={label}><label className={labelClass}>{label}</label><input type="number" value={formData[key] || '0'} onChange={(event) => update(key, event.target.value)} className={inputClass} /></div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div><label className={labelClass}>Quantity</label><input type="number" value={formData.currentStock || '0'} onChange={(event) => update('currentStock', event.target.value)} className={inputClass} /></div>
                                        <div><label className={labelClass}>Weight (per unit, in KG) *</label><input type="number" value={formData.weight || '0'} onChange={(event) => update('weight', event.target.value)} className={inputClass} /></div>
                                        <div><label className={labelClass}>SKU</label><input value={formData.sku} onChange={(event) => update('sku', event.target.value)} placeholder="eg: PROD-NP-101" className={inputClass} /></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        <div>
                                            <label className={labelClass}>Colors</label>
                                            <div className="mt-1 flex flex-wrap gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:border-gray-700 dark:bg-[#1a1a1a]">
                                                {(formData.selectedVariantOptions || []).map((variant, index) => (
                                                    <span key={index} className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                                        {variant} <button type="button" onClick={() => update('selectedVariantOptions', (formData.selectedVariantOptions || []).filter((_, i) => i !== index))} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">×</button>
                                                    </span>
                                                ))}
                                                <input type="text" placeholder="eg: Red, Green" onChange={(event) => {
                                                    if (event.currentTarget.value.includes(',')) {
                                                        addVariantValues('selectedVariantOptions', event.currentTarget.value)
                                                        event.currentTarget.value = ''
                                                    }
                                                }} onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ',') {
                                                        if (event.currentTarget.value.trim()) {
                                                            addVariantValues('selectedVariantOptions', event.currentTarget.value)
                                                            event.currentTarget.value = ''
                                                        }
                                                        event.preventDefault()
                                                    }
                                                }} onBlur={(event) => {
                                                    if (event.currentTarget.value.trim()) {
                                                        addVariantValues('selectedVariantOptions', event.currentTarget.value)
                                                        event.currentTarget.value = ''
                                                    }
                                                }} className="flex-1 min-w-[100px] border-none bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass}>Size</label>
                                            <div className="mt-1 flex flex-wrap gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3 dark:border-gray-700 dark:bg-[#1a1a1a]">
                                                {(formData.selectedSizeOptions || []).map((size, index) => (
                                                    <span key={index} className="inline-flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                                        {size} <button type="button" onClick={() => update('selectedSizeOptions', (formData.selectedSizeOptions || []).filter((_, i) => i !== index))} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">×</button>
                                                    </span>
                                                ))}
                                                <input type="text" placeholder="eg: M, L, XL" onChange={(event) => {
                                                    if (event.currentTarget.value.includes(',')) {
                                                        addVariantValues('selectedSizeOptions', event.currentTarget.value)
                                                        event.currentTarget.value = ''
                                                    }
                                                }} onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ',') {
                                                        if (event.currentTarget.value.trim()) {
                                                            addVariantValues('selectedSizeOptions', event.currentTarget.value)
                                                            event.currentTarget.value = ''
                                                        }
                                                        event.preventDefault()
                                                    }
                                                }} onBlur={(event) => {
                                                    if (event.currentTarget.value.trim()) {
                                                        addVariantValues('selectedSizeOptions', event.currentTarget.value)
                                                        event.currentTarget.value = ''
                                                    }
                                                }} className="flex-1 min-w-[100px] border-none bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {(formData.variantCombinations && formData.variantCombinations.length > 0) && (
                                        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
                                            <table className="w-full text-sm">
                                                <thead className="bg-gray-50 dark:bg-[#1a1a1a]">
                                                    <tr className="border-b border-gray-200 dark:border-gray-800">
                                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">VARIANT</th>
                                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">GROSSED PRICE</th>
                                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">SELLING PRICE</th>
                                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">COST PRICE</th>
                                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">WEIGHT</th>
                                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">QUANTITY</th>
                                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">SKU</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(formData.variantCombinations || []).map((combo, idx) => (
                                                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-[#1a1a1a]">
                                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                                <div className="flex items-center gap-3">
                                                                    <button type="button" onClick={() => {
                                                                        const input = document.createElement('input')
                                                                        input.type = 'file'
                                                                        input.accept = 'image/*'
                                                                        input.onchange = (e) => {
                                                                            const file = e.target.files?.[0]
                                                                            if (file) {
                                                                                const reader = new FileReader()
                                                                                reader.onload = () => {
                                                                                    setVariantImageFile(reader.result)
                                                                                    setCurrentVariantImageIndex(idx)
                                                                                    setShowVariantImageModal(true)
                                                                                    setVariantImageCrop({ x: 0, y: 0 })
                                                                                    setVariantImageZoom(1)
                                                                                    setVariantImageCropPixels(null)
                                                                                }
                                                                                reader.readAsDataURL(file)
                                                                            }
                                                                        }
                                                                        input.click()
                                                                    }} className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-purple-500 hover:bg-purple-50 dark:border-gray-600 dark:bg-[#1a1a1a] dark:hover:border-purple-400 dark:hover:bg-purple-950/20">
                                                                        {combo.image ? (
                                                                            <img src={combo.image} alt={combo.name} className="h-full w-full rounded object-cover" />
                                                                        ) : (
                                                                            <Upload className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                                                        )}
                                                                    </button>
                                                                    <span className="font-semibold">{combo.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3"><input type="number" placeholder="0" value={combo.crossedPrice || '0'} onChange={(e) => {
                                                                const updated = [...formData.variantCombinations]
                                                                updated[idx].crossedPrice = e.target.value
                                                                update('variantCombinations', updated)
                                                            }} className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 dark:border-gray-700 dark:bg-[#222] dark:text-white" /></td>
                                                            <td className="px-4 py-3"><input type="number" placeholder="0" value={combo.price || '0'} onChange={(e) => {
                                                                const updated = [...formData.variantCombinations]
                                                                updated[idx].price = e.target.value
                                                                update('variantCombinations', updated)
                                                            }} className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 dark:border-gray-700 dark:bg-[#222] dark:text-white" /></td>
                                                            <td className="px-4 py-3"><input type="number" placeholder="0" value={combo.costPrice || '0'} onChange={(e) => {
                                                                const updated = [...formData.variantCombinations]
                                                                updated[idx].costPrice = e.target.value
                                                                update('variantCombinations', updated)
                                                            }} className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 dark:border-gray-700 dark:bg-[#222] dark:text-white" /></td>
                                                            <td className="px-4 py-3"><input type="number" placeholder="0" value={combo.weight || '0'} onChange={(e) => {
                                                                const updated = [...formData.variantCombinations]
                                                                updated[idx].weight = e.target.value
                                                                update('variantCombinations', updated)
                                                            }} className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 dark:border-gray-700 dark:bg-[#222] dark:text-white" /></td>
                                                            <td className="px-4 py-3"><input type="number" placeholder="0" value={combo.stock || '0'} onChange={(e) => {
                                                                const updated = [...formData.variantCombinations]
                                                                updated[idx].stock = e.target.value
                                                                update('variantCombinations', updated)
                                                            }} className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 dark:border-gray-700 dark:bg-[#222] dark:text-white" /></td>
                                                            <td className="px-4 py-3"><input type="text" placeholder="SKU" value={combo.sku || ''} onChange={(e) => {
                                                                const updated = [...formData.variantCombinations]
                                                                updated[idx].sku = e.target.value
                                                                update('variantCombinations', updated)
                                                            }} className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 dark:border-gray-700 dark:bg-[#222] dark:text-white" /></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}

                            <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={formData.continueSelling || false} onChange={(event) => update('continueSelling', event.target.checked)} className="h-4 w-4 accent-purple-600" />Continue selling even after product is out of stock</label>
                            <div className="flex justify-between border-t border-gray-200 pt-4 dark:border-gray-800"><button type="button" onClick={() => setProductStep(1)} className="rounded-lg border border-purple-600 px-5 py-2.5 text-sm font-semibold text-purple-700 dark:text-purple-300">Previous: General Information</button><button type="button" onClick={() => setProductStep(3)} className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700">Next: Custom Fields</button></div>
                        </div>
                    )}

                    {productStep === 3 && (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                                <div><p className="font-semibold">Enable Custom Fields?</p><p className="text-sm text-gray-500 dark:text-gray-400">Whenever you need specific information like (text, image, date, time) for the product</p></div>
                                <button type="button" onClick={() => update('hasCustomFields', !formData.hasCustomFields)} className={`relative h-7 w-14 rounded-full transition ${formData.hasCustomFields ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-700'}`} aria-label="Toggle custom fields"><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${formData.hasCustomFields ? 'left-8' : 'left-1'}`} /></button>
                            </div>
                            {formData.hasCustomFields && (
                                <div className="space-y-3">
                                    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
                                        <table className="w-full min-w-[760px] text-sm">
                                            <thead className="bg-gray-50 dark:bg-[#1a1a1a]"><tr className="border-b border-gray-200 dark:border-gray-800">{['SN', 'Type', 'Label', 'Placeholder', 'Required', 'Actions'].map((heading) => <th key={heading} className="px-3 py-3 text-left font-semibold text-gray-900 dark:text-white">{heading}</th>)}</tr></thead>
                                            <tbody>
                                                {(formData.customFields || []).map((field, index) => (
                                                    <tr key={field.id} className="border-b border-gray-200 dark:border-gray-800">
                                                        <td className="px-3 py-2 text-gray-900 dark:text-white">{index + 1}</td>
                                                        <td className="px-3 py-2"><select value={field.type || 'Text'} onChange={(event) => update('customFields', (formData.customFields || []).map((item) => item.id === field.id ? { ...item, type: event.target.value } : item))} className="w-full rounded border border-gray-300 bg-white px-2 py-2 text-gray-900 dark:border-gray-700 dark:bg-black dark:text-white"><option>Image</option><option>Text</option><option>Date</option><option>Time</option></select></td>
                                                        <td className="px-3 py-2"><input type="text" value={field.label || ''} placeholder="eg: any label" onChange={(event) => update('customFields', (formData.customFields || []).map((item) => item.id === field.id ? { ...item, label: event.target.value } : item))} className="w-full rounded border border-gray-300 bg-white px-2 py-2 text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-black dark:text-white" /></td>
                                                        <td className="px-3 py-2"><input type="text" value={field.placeholder || ''} placeholder="eg: any placeholder" onChange={(event) => update('customFields', (formData.customFields || []).map((item) => item.id === field.id ? { ...item, placeholder: event.target.value } : item))} className="w-full rounded border border-gray-300 bg-white px-2 py-2 text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-black dark:text-white" /></td>
                                                        <td className="px-3 py-2 text-center"><input type="checkbox" checked={Boolean(field.required)} onChange={(event) => update('customFields', (formData.customFields || []).map((item) => item.id === field.id ? { ...item, required: event.target.checked } : item))} className="h-4 w-4 accent-purple-600" /></td>
                                                        <td className="px-3 py-2 text-center"><button type="button" onClick={() => update('customFields', (formData.customFields || []).filter((item) => item.id !== field.id))} className="text-red-500 hover:text-red-700 dark:text-red-400" aria-label={`Remove custom field ${index + 1}`}><Trash2 className="h-4 w-4" /></button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button type="button" onClick={() => update('customFields', [...(formData.customFields || []), { id: `${Date.now()}-${Math.random()}`, type: 'Text', label: '', placeholder: '', required: false }])} className="rounded-lg border border-purple-600 px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/20">+ Add Custom Field</button>
                                </div>
                            )}
                            <div className="flex justify-between border-t border-gray-200 pt-4 dark:border-gray-800"><button type="button" onClick={() => setProductStep(2)} className="rounded-lg border border-purple-600 px-5 py-2.5 text-sm font-semibold text-purple-700 dark:text-purple-300">Previous: Variants &amp; Inventory</button><button type="submit" className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-700">Confirm Add Product</button></div>
                        </div>
                    )}
                </form>

                {cropImage && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 p-4">
                        <div className="w-full max-w-2xl rounded-xl bg-white p-5 text-gray-900 dark:bg-[#111111] dark:text-white">
                            <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">Crop Product Image</h3><button type="button" onClick={() => setCropImage('')} aria-label="Close crop"><X className="h-5 w-5" /></button></div>
                            <div className="relative h-64 overflow-hidden rounded-lg bg-black"><Cropper image={cropImage} crop={crop} zoom={zoom} aspect={cropRatio.value} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)} showGrid restrictPosition /></div>
                            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{cropRatios.map((ratio) => <button key={ratio.label} type="button" onClick={() => setCropRatio(ratio)} className={`rounded border px-3 py-2 text-sm ${cropRatio.label === ratio.label ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-300 dark:border-gray-700'}`}>{ratio.label}</button>)}</div>
                            <div className="mt-4"><div className="mb-1 flex justify-between text-xs text-gray-500"><span>Zoom</span><span>{Math.round(zoom * 100)}%</span></div><input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="w-full accent-purple-600" /></div>
                            <div className="mt-4 flex justify-end gap-3"><button type="button" onClick={() => setCropImage('')} className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700">Cancel</button><button type="button" onClick={applyCrop} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white">Apply Crop</button></div>
                        </div>
                    </div>
                )}

                {showVariantImageModal && variantImageFile && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 p-4">
                        <div className="w-full max-w-2xl rounded-xl bg-white p-5 text-gray-900 dark:bg-[#111111] dark:text-white">
                            <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-bold">Crop Variant Image</h3><button type="button" onClick={() => { setShowVariantImageModal(false); setVariantImageFile(null); }} aria-label="Close crop"><X className="h-5 w-5" /></button></div>
                            <div className="relative h-64 overflow-hidden rounded-lg bg-black"><Cropper image={variantImageFile} crop={variantImageCrop} zoom={variantImageZoom} aspect={variantImageRatio.value} onCropChange={setVariantImageCrop} onZoomChange={setVariantImageZoom} onCropComplete={(_, pixels) => setVariantImageCropPixels(pixels)} showGrid restrictPosition /></div>
                            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{cropRatios.map((ratio) => <button key={ratio.label} type="button" onClick={() => setVariantImageRatio(ratio)} className={`rounded border px-3 py-2 text-sm ${variantImageRatio.label === ratio.label ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-300 dark:border-gray-700'}`}>{ratio.label}</button>)}</div>
                            <div className="mt-4"><div className="mb-1 flex justify-between text-xs text-gray-500"><span>Zoom</span><span>{Math.round(variantImageZoom * 100)}%</span></div><input type="range" min="1" max="3" step="0.1" value={variantImageZoom} onChange={(event) => setVariantImageZoom(Number(event.target.value))} className="w-full accent-purple-600" /></div>
                            <div className="mt-4 flex justify-end gap-3"><button type="button" onClick={() => { setShowVariantImageModal(false); setVariantImageFile(null); }} className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700">Cancel</button><button type="button" onClick={applyVariantImageCrop} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white">Apply Crop</button></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products


