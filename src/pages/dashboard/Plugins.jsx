// // frontend/src/pages/dashboard/Plugins.jsx
// import React, { useState } from 'react';
// import { 
//   Puzzle,
//   Package,
//   Truck,
//   TrendingUp,
//   Printer,
//   Power,
//   Settings,
//   Key,
//   Globe,
//   CheckCircle,
//   XCircle
// } from 'lucide-react';

// const Plugins = () => {
//   const [plugins, setPlugins] = useState([
//     { 
//       id: 1, 
//       name: 'Pathao', 
//       category: 'Logistics', 
//       description: 'Integrated delivery service',
//       status: 'active',
//       hasConfig: true
//     },
//     { 
//       id: 2, 
//       name: 'NCM', 
//       category: 'Logistics', 
//       description: 'Nepal Courier Management',
//       status: 'active',
//       hasConfig: true
//     },
//     { 
//       id: 3, 
//       name: 'Aramex', 
//       category: 'Logistics', 
//       description: 'International shipping',
//       status: 'inactive',
//       hasConfig: true
//     },
//     { 
//       id: 4, 
//       name: 'Dash', 
//       category: 'Logistics', 
//       description: 'Fast delivery service',
//       status: 'active',
//       hasConfig: false
//     },
//     { 
//       id: 5, 
//       name: 'Facebook Pixel', 
//       category: 'Marketing', 
//       description: 'Track conversions and retarget',
//       status: 'inactive',
//       hasConfig: true
//     },
//     { 
//       id: 6, 
//       name: 'Thermal Printer', 
//       category: 'Hardware', 
//       description: 'Order receipt printing',
//       status: 'inactive',
//       hasConfig: true
//     },
//     { 
//       id: 7, 
//       name: 'Upaya', 
//       category: 'Logistics', 
//       description: 'Payment and delivery integration',
//       status: 'inactive',
//       hasConfig: true
//     },
//     { 
//       id: 8, 
//       name: 'Fabbud', 
//       category: 'Logistics', 
//       description: 'Fulfillment service',
//       status: 'inactive',
//       hasConfig: true
//     },
//     { 
//       id: 9, 
//       name: 'Pick & Drop', 
//       category: 'Logistics', 
//       description: 'Pickup and delivery service',
//       status: 'inactive',
//       hasConfig: true
//     },
//   ]);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedPlugin, setSelectedPlugin] = useState(null);

//   const categories = ['all', ...new Set(plugins.map(p => p.category))];

//   const filteredPlugins = plugins.filter(p => 
//     selectedCategory === 'all' || p.category === selectedCategory
//   );

//   const togglePlugin = (id) => {
//     setPlugins(plugins.map(p => 
//       p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
//     ));
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-title text-white">Plugins</h1>
//           <p className="text-gray-400 text-sm">Integrations and add-ons that extend store functionality</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-400">Active: {plugins.filter(p => p.status === 'active').length}</span>
//           <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
//             {plugins.filter(p => p.status === 'active').length} / {plugins.length}
//           </span>
//         </div>
//       </div>

//       {/* Category Filter */}
//       <div className="bg-[#14141e] border border-gray-800 rounded-xl p-4 mb-6">
//         <div className="flex flex-wrap gap-2">
//           {categories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
//                 selectedCategory === cat
//                   ? 'bg-indigo-600 text-white'
//                   : 'bg-gray-800 text-gray-400 hover:text-white'
//               }`}
//             >
//               {cat === 'all' ? 'All' : cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Plugins Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredPlugins.map((plugin) => {
//           const getCategoryIcon = (category) => {
//             switch(category) {
//               case 'Logistics': return <Truck className="w-5 h-5" />;
//               case 'Marketing': return <TrendingUp className="w-5 h-5" />;
//               case 'Hardware': return <Printer className="w-5 h-5" />;
//               default: return <Package className="w-5 h-5" />;
//             }
//           };

//           return (
//             <div key={plugin.id} className="bg-[#14141e] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex items-center gap-3">
//                   <div className={`p-2 rounded-lg ${plugin.status === 'active' ? 'bg-indigo-500/20' : 'bg-gray-800'}`}>
//                     {getCategoryIcon(plugin.category)}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-white">{plugin.name}</h3>
//                     <p className="text-xs text-gray-500">{plugin.category}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => togglePlugin(plugin.id)}
//                   className={`relative w-10 h-5 rounded-full transition-colors ${
//                     plugin.status === 'active' ? 'bg-indigo-600' : 'bg-gray-700'
//                   }`}
//                 >
//                   <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
//                     plugin.status === 'active' ? 'left-5 bg-white' : 'left-0.5 bg-gray-400'
//                   }`} />
//                 </button>
//               </div>
//               <p className="text-sm text-gray-400 mb-3">{plugin.description}</p>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-1">
//                   {plugin.status === 'active' ? (
//                     <CheckCircle className="w-3 h-3 text-green-400" />
//                   ) : (
//                     <XCircle className="w-3 h-3 text-gray-500" />
//                   )}
//                   <span className={`text-xs ${plugin.status === 'active' ? 'text-green-400' : 'text-gray-500'}`}>
//                     {plugin.status === 'active' ? 'Active' : 'Inactive'}
//                   </span>
//                 </div>
//                 {plugin.hasConfig && (
//                   <button
//                     onClick={() => setSelectedPlugin(plugin)}
//                     className="flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-300 transition-colors"
//                   >
//                     <Settings className="w-3 h-3" />
//                     Configure
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Plugin Config Modal */}
//       {selectedPlugin && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#14141e] border border-gray-800 rounded-2xl max-w-md w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <div className="flex items-center gap-3">
//                 <Key className="w-5 h-5 text-indigo-400" />
//                 <h3 className="text-xl font-bold text-white">Configure {selectedPlugin.name}</h3>
//               </div>
//               <button onClick={() => setSelectedPlugin(null)} className="text-gray-400 hover:text-white text-2xl">✕</button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1.5">API Key / Token</label>
//                 <input
//                   type="text"
//                   placeholder="Enter API key"
//                   className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1.5">Webhook URL</label>
//                 <input
//                   type="text"
//                   placeholder="https://your-domain.com/webhook"
//                   className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1.5">Status</label>
//                 <select className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>
//             </div>
//             <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end gap-3">
//               <button
//                 onClick={() => setSelectedPlugin(null)}
//                 className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setSelectedPlugin(null)}
//                 className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors"
//               >
//                 Save Configuration
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Plugins;





// src/pages/dashboard/Plugins.jsx
import React, { useState, useEffect } from 'react'
import {
    Plus,
    Edit,
    Trash2,
    Search,
    Package,
    TrendingUp,
    Printer,
    CreditCard,
    BarChart3,
    CheckCircle,
    XCircle,
    RefreshCw,
    Save,
    X,
    Loader2,
    Settings,
    Power,
    PowerOff,
    ExternalLink,
    AlertCircle,
    ChevronDown,
    ChevronRight,
    Layers,
    Truck,
    Smartphone,
    Globe,
    Shield,
    Zap,
    Box,
    ShoppingCart,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const Plugins = () => {
    const [plugins, setPlugins] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [selectedPlugin, setSelectedPlugin] = useState(null)
    const [showConfigModal, setShowConfigModal] = useState(false)
    const [stats, setStats] = useState({
        total: 0,
        enabled: 0,
        active: 0,
        inactive: 0,
        error: 0,
    })
    const [typeCounts, setTypeCounts] = useState([])
    const [configForm, setConfigForm] = useState({})
    const [credentialsForm, setCredentialsForm] = useState({})

    // Get token
    const getToken = () => localStorage.getItem('token')

    // Fetch plugins
    useEffect(() => {
        fetchPlugins()
    }, [filterType])

    const fetchPlugins = async () => {
        try {
            setLoading(true)
            const token = getToken()
            const params = {}

            if (searchTerm) params.search = searchTerm
            if (filterType !== 'all') params.type = filterType

            const response = await api.get('/plugins', {
                params,
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setPlugins(response.data.plugins || [])
                setTypeCounts(response.data.typeCounts || [])
                calculateStats(response.data)
            }
        } catch (error) {
            console.error('Error fetching plugins:', error)
            toast.error('Failed to load plugins')
        } finally {
            setLoading(false)
        }
    }

    const calculateStats = (data) => {
        setStats({
            total: data.total || 0,
            enabled: data.enabledCount || 0,
            active: data.statusCounts?.find(s => s._id === 'active')?.count || 0,
            inactive: data.statusCounts?.find(s => s._id === 'inactive')?.count || 0,
            error: data.statusCounts?.find(s => s._id === 'error')?.count || 0,
        })
    }

    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPlugins()
        }, 500)
        return () => clearTimeout(timer)
    }, [searchTerm])

    // Toggle plugin
    const togglePlugin = async (pluginId) => {
        try {
            const token = getToken()
            const response = await api.patch(`/plugins/${pluginId}/toggle`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                toast.success(`Plugin ${response.data.plugin.enabled ? 'enabled' : 'disabled'}`)
                fetchPlugins()
            }
        } catch (error) {
            console.error('Error toggling plugin:', error)
            toast.error('Failed to toggle plugin')
        }
    }

    // Open config modal
    const openConfig = (plugin) => {
        setSelectedPlugin(plugin)
        setConfigForm(plugin.config || {})
        setCredentialsForm(plugin.credentials || {})
        setShowConfigModal(true)
    }

    // Save plugin configuration
    const saveConfig = async () => {
        try {
            setSaving(true)
            const token = getToken()

            const data = {
                config: configForm,
                credentials: credentialsForm,
                enabled: selectedPlugin.enabled,
                status: selectedPlugin.status,
            }

            const response = await api.put(`/plugins/${selectedPlugin._id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                toast.success('Plugin configuration saved!')
                setShowConfigModal(false)
                fetchPlugins()
            }
        } catch (error) {
            console.error('Error saving config:', error)
            toast.error('Failed to save configuration')
        } finally {
            setSaving(false)
        }
    }

    // Get type icon
    const getTypeIcon = (type) => {
        const icons = {
            logistics: <Truck className="w-5 h-5" />,
            marketing: <TrendingUp className="w-5 h-5" />,
            hardware: <Printer className="w-5 h-5" />,
            payment: <CreditCard className="w-5 h-5" />,
            analytics: <BarChart3 className="w-5 h-5" />,
        }
        return icons[type] || <Box className="w-5 h-5" />
    }

    const getTypeColor = (type) => {
        const colors = {
            logistics: 'text-blue-400',
            marketing: 'text-green-400',
            hardware: 'text-purple-400',
            payment: 'text-amber-400',
            analytics: 'text-cyan-400',
        }
        return colors[type] || 'text-gray-400'
    }

    const getStatusBadge = (status) => {
        const badges = {
            active: 'bg-green-500/20 text-green-400',
            inactive: 'bg-gray-500/20 text-gray-400',
            pending: 'bg-yellow-500/20 text-yellow-400',
            error: 'bg-red-500/20 text-red-400',
        }
        return badges[status] || 'bg-gray-500/20 text-gray-400'
    }

    const getPluginIcon = (plugin) => {
        const icons = {
            pathao: '🚚',
            ncm: '📦',
            aramex: '✈️',
            dash: '🏃',
            upaya: '📦',
            fabbud: '📮',
            'pick-drop': '📬',
            'facebook-pixel': '📊',
            'thermal-printer': '🖨️',
        }
        return icons[plugin.slug] || plugin.icon || '🔌'
    }

    const pluginTypes = [
        { value: 'all', label: 'All' },
        { value: 'logistics', label: 'Logistics' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'hardware', label: 'Hardware' },
        { value: 'payment', label: 'Payment' },
        { value: 'analytics', label: 'Analytics' },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                <span className="ml-2 text-gray-400">Loading plugins...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-white">Plugins</h1>
                    <p className="text-gray-400 text-sm">Manage integrations and add-ons for your store</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-white font-semibold">{stats.total}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-green-400">Enabled: {stats.enabled}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-4 text-center">
                    <div className="text-title text-indigo-400">{stats.total}</div>
                    <div className="text-sm text-gray-400">Total Plugins</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-green-400">{stats.active}</div>
                    <div className="text-sm text-gray-400">Active</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-gray-400">{stats.inactive}</div>
                    <div className="text-sm text-gray-400">Inactive</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-red-400">{stats.error}</div>
                    <div className="text-sm text-gray-400">Error</div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search plugins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none w-48"
                >
                    {pluginTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                </select>
            </div>

            {/* Plugin Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plugins.length === 0 ? (
                    <div className="col-span-full card p-12 text-center">
                        <Package className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">No plugins found</p>
                    </div>
                ) : (
                    plugins.map((plugin) => (
                        <div key={plugin._id} className="card p-5 hover:border-indigo-500/50 transition-all duration-300">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center text-2xl">
                                        {getPluginIcon(plugin)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{plugin.name}</h3>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className={`text-xs ${getTypeColor(plugin.type)}`}>
                                                {plugin.type}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadge(plugin.status)}`}>
                                                {plugin.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => togglePlugin(plugin._id)}
                                    className={`p-2 rounded-xl transition-all duration-200 ${
                                        plugin.enabled
                                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                            : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                                    }`}
                                    title={plugin.enabled ? 'Disable' : 'Enable'}
                                >
                                    {plugin.enabled ? (
                                        <Power className="w-4 h-4" />
                                    ) : (
                                        <PowerOff className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                                {plugin.description || 'No description available'}
                            </p>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    {plugin.lastUsed && (
                                        <span>Last used: {new Date(plugin.lastUsed).toLocaleDateString()}</span>
                                    )}
                                    {plugin.enabled && (
                                        <span className="flex items-center gap-1 text-green-400">
                                            <CheckCircle className="w-3 h-3" />
                                            Connected
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openConfig(plugin)}
                                        className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                                        title="Configure"
                                    >
                                        <Settings className="w-4 h-4 text-gray-400 hover:text-white" />
                                    </button>
                                    <button
                                        className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                                        title="View Details"
                                    >
                                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Configure Modal */}
            {showConfigModal && selectedPlugin && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="glass rounded-3xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 glass border-b border-border z-10 p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-white">
                                        Configure {selectedPlugin.name}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {selectedPlugin.description || 'Configure plugin settings'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowConfigModal(false)}
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* API Keys / Credentials */}
                            <div className="space-y-3">
                                <h4 className="text-table-body font-semibold">API Credentials</h4>
                                {Object.keys(credentialsForm).length === 0 ? (
                                    <p className="text-sm text-gray-500">No credentials required</p>
                                ) : (
                                    Object.entries(credentialsForm).map(([key, value]) => (
                                        <div key={key}>
                                            <label className="block text-sm text-gray-400 mb-1.5 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            <input
                                                type={key.includes('secret') || key.includes('password') || key.includes('token') ? 'password' : 'text'}
                                                value={value || ''}
                                                onChange={(e) => setCredentialsForm({
                                                    ...credentialsForm,
                                                    [key]: e.target.value
                                                })}
                                                className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Configuration */}
                            <div className="pt-4 border-t border-border space-y-3">
                                <h4 className="text-table-body font-semibold">Configuration Settings</h4>
                                {Object.keys(configForm).length === 0 ? (
                                    <p className="text-sm text-gray-500">No configuration required</p>
                                ) : (
                                    Object.entries(configForm).map(([key, value]) => (
                                        <div key={key}>
                                            <label className="block text-sm text-gray-400 mb-1.5 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            {typeof value === 'boolean' ? (
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => setConfigForm({
                                                            ...configForm,
                                                            [key]: !configForm[key]
                                                        })}
                                                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                                                            configForm[key] ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                                        }`}
                                                    >
                                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                                            configForm[key] ? 'translate-x-7' : 'translate-x-1'
                                                        }`} />
                                                    </button>
                                                    <span className="text-sm text-gray-400">
                                                        {configForm[key] ? 'Enabled' : 'Disabled'}
                                                    </span>
                                                </div>
                                            ) : (
                                                <input
                                                    type={key.includes('secret') || key.includes('key') ? 'password' : 'text'}
                                                    value={value || ''}
                                                    onChange={(e) => setConfigForm({
                                                        ...configForm,
                                                        [key]: e.target.value
                                                    })}
                                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                                                />
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Status */}
                            <div className="pt-4 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-table-body font-semibold">Status</h4>
                                        <p className="text-sm text-gray-400">Current plugin status</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(selectedPlugin.status)}`}>
                                        {selectedPlugin.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-background border-t border-border p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfigModal(false)}
                                className="px-6 py-2.5 bg-card border border-border hover:border-indigo-500/50 rounded-2xl text-white transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveConfig}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-2xl text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Configuration
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Plugins