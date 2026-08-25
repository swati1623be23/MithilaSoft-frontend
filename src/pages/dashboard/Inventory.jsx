// src/pages/dashboard/Inventory.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Plus, Search, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { productAPI } from '../../services/api'

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedVariant, setSelectedVariant] = useState('')
    const [adjustmentModal, setAdjustmentModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState('1')
    const [actionType, setActionType] = useState('increase')
    const [loading, setLoading] = useState(true)

    const fetchInventory = async () => {
        try {
            setLoading(true)
            const res = await productAPI.getInventory({ search: searchQuery })
            setInventoryItems(res.data.data || [])
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to load inventory')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchInventory()
    }, [searchQuery])

    const openAdjustModal = (product) => {
        setSelectedProduct(product)
        setSelectedVariant('')
        setQuantity('1')
        setActionType('increase')
        setAdjustmentModal(true)
    }

    const handleAdjust = async (event) => {
        event.preventDefault()
        if (!selectedProduct) return
        try {
            await productAPI.adjustStock(selectedProduct.id || selectedProduct._id, {
                action: actionType,
                quantity: Number(quantity || 0),
                variantId: selectedVariant || undefined,
                note: `${actionType === 'increase' ? 'Stock increase' : 'Stock decrease'} via inventory UI`,
            })
            toast.success('Inventory updated successfully')
            setAdjustmentModal(false)
            fetchInventory()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to update inventory')
        }
    }

    const getStatusColor = (stock, threshold) => {
        if (stock <= 0) return 'bg-danger/20 text-danger'
        if (stock <= threshold) return 'bg-amber-500/20 text-amber-400'
        return 'bg-success/20 text-success'
    }

    const summary = useMemo(() => {
        const total = inventoryItems.length
        const inStock = inventoryItems.filter((item) => Number(item.inventory?.currentStock ?? item.currentStock ?? 0) > 0).length
        const lowStock = inventoryItems.filter((item) => Number(item.inventory?.currentStock ?? item.currentStock ?? 0) <= Number(item.inventory?.lowStockThreshold ?? item.lowStockThreshold ?? 10)).length
        const outOfStock = inventoryItems.filter((item) => Number(item.inventory?.currentStock ?? item.currentStock ?? 0) <= 0).length
        return { total, inStock, lowStock, outOfStock }
    }, [inventoryItems])

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Inventory</h1>
                    <p className="text-desc">Manage your stock and warehouse</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => toast.success('Bulk upload is ready for future integration')} className="btn-secondary">
                        <Plus className="w-4 h-4" />
                        Add Stock
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-textSecondary">Total Products</p>
                            <h3 className="text-title">{summary.total}</h3>
                        </div>
                        <Package className="w-8 h-8 text-indigo-400" />
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-textSecondary">In Stock</p>
                            <h3 className="text-title text-success">{summary.inStock}</h3>
                        </div>
                        <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-textSecondary">Low Stock</p>
                            <h3 className="text-title text-amber-400">{summary.lowStock}</h3>
                        </div>
                        <AlertCircle className="w-8 h-8 text-amber-400" />
                    </div>
                </div>
                <div className="card p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-textSecondary">Out of Stock</p>
                            <h3 className="text-title text-danger">{summary.outOfStock}</h3>
                        </div>
                        <Clock className="w-8 h-8 text-danger" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                    <input type="text" placeholder="Search inventory..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full input-field pl-12" />
                </div>
            </div>

            <div className="card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-table-header border-b border-border">
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Product</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">SKU</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Current Stock</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Threshold</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Status</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="py-8 text-center text-textSecondary">Loading inventory...</td></tr>
                            ) : inventoryItems.length === 0 ? (
                                <tr><td colSpan="6" className="py-8 text-center text-textSecondary">No inventory data found</td></tr>
                            ) : inventoryItems.map((item, index) => {
                                const stock = Number(item.inventory?.currentStock ?? item.currentStock ?? 0)
                                const threshold = Number(item.inventory?.lowStockThreshold ?? item.lowStockThreshold ?? 10)
                                const variantOptions = item.variants || []
                                return (
                                    <motion.tr key={item.id || item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.04 }} className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200">
                                        <td className="py-3 font-medium">{item.title || item.name}</td>
                                        <td className="py-3 text-sm text-textSecondary">{item.sku || '—'}</td>
                                        <td className="py-3 font-semibold">{stock}</td>
                                        <td className="py-3 text-sm text-textSecondary">{threshold}</td>
                                        <td className="py-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(stock, threshold)}`}>
                                                {stock <= 0 ? 'Out of Stock' : stock <= threshold ? 'Low Stock' : 'In Stock'}
                                            </span>
                                        </td>
                                        <td className="py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {variantOptions.length > 0 ? (
                                                    <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)} className="input-field w-28 text-sm">
                                                        <option value="">All variants</option>
                                                        {variantOptions.map((variant, variantIndex) => (
                                                            <option key={variantIndex} value={variantIndex}>{variant.size || 'Variant'} / {variant.color || '—'}</option>
                                                        ))}
                                                    </select>
                                                ) : null}
                                                <button onClick={() => openAdjustModal(item)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200">
                                                    <Plus className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {adjustmentModal && selectedProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-md rounded-3xl border border-border bg-background p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold">Adjust Inventory</h3>
                            <button onClick={() => setAdjustmentModal(false)} className="text-textSecondary">✕</button>
                        </div>
                        <form onSubmit={handleAdjust} className="space-y-4">
                            <div>
                                <label className="text-sm text-textSecondary">Action</label>
                                <select value={actionType} onChange={(e) => setActionType(e.target.value)} className="input-field mt-1">
                                    <option value="increase">Stock Increase</option>
                                    <option value="decrease">Stock Decrease</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-textSecondary">Quantity</label>
                                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input-field mt-1" min="1" required />
                            </div>
                            {(selectedProduct.variants || []).length > 0 && (
                                <div>
                                    <label className="text-sm text-textSecondary">Variant</label>
                                    <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)} className="input-field mt-1">
                                        <option value="">All variants</option>
                                        {(selectedProduct.variants || []).map((variant, index) => (
                                            <option key={index} value={index}>{variant.size || 'Variant'} / {variant.color || '—'}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setAdjustmentModal(false)} className="px-4 py-2 rounded-2xl bg-card border border-border text-sm">Cancel</button>
                                <button type="submit" className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm">Save Adjustment</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Inventory