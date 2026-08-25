// // frontend/src/pages/dashboard/CheckoutSetting.jsx
// import React, { useState } from 'react';
// import { 
//   ShoppingBag,
//   User,
//   MapPin,
//   Mail,
//   Phone,
//   DollarSign,
//   Truck,
//   Save,
//   CheckCircle,
//   ToggleLeft,
//   ToggleRight
// } from 'lucide-react';

// const CheckoutSetting = () => {
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   const [settings, setSettings] = useState({
//     guestCheckout: true,
//     requirePhone: true,
//     requireAddress: true,
//     requireEmail: true,
//     minOrderValue: 0,
//     shippingFlatRate: 50,
//     freeShippingThreshold: 500,
//     shippingByZone: false,
//     codEnabled: true,
//   });

//   const handleSave = async () => {
//     setSaving(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setSaving(false);
//     setSaved(true);
//     setTimeout(() => setSaved(false), 3000);
//   };

//   const toggleSetting = (key) => {
//     setSettings({...settings, [key]: !settings[key]});
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-title text-white">Checkout Setting</h1>
//           <p className="text-gray-400 text-sm">Rules governing the customer checkout flow</p>
//         </div>
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
//         >
//           {saving ? (
//             <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
//           ) : saved ? (
//             <CheckCircle className="w-4 h-4" />
//           ) : (
//             <Save className="w-4 h-4" />
//           )}
//           {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
//         </button>
//       </div>

//       <div className="space-y-6">
//         {/* Checkout Fields */}
//         <div className="bg-[#14141e] border border-gray-800 rounded-xl p-6">
//           <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//             <ShoppingBag className="w-5 h-5 text-indigo-400" />
//             Required Checkout Fields
//           </h3>
//           <div className="space-y-3">
//             {[
//               { key: 'guestCheckout', label: 'Guest Checkout', icon: User },
//               { key: 'requirePhone', label: 'Require Phone Number', icon: Phone },
//               { key: 'requireAddress', label: 'Require Shipping Address', icon: MapPin },
//               { key: 'requireEmail', label: 'Require Email Address', icon: Mail },
//             ].map((field) => (
//               <div key={field.key} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
//                 <div className="flex items-center gap-3">
//                   <field.icon className="w-4 h-4 text-gray-400" />
//                   <span className="text-gray-300">{field.label}</span>
//                 </div>
//                 <button
//                   onClick={() => toggleSetting(field.key)}
//                   className="flex items-center gap-2 text-sm"
//                 >
//                   {settings[field.key] ? (
//                     <span className="flex items-center gap-1 text-green-400">
//                       <ToggleRight className="w-5 h-5" />
//                       Enabled
//                     </span>
//                   ) : (
//                     <span className="flex items-center gap-1 text-gray-500">
//                       <ToggleLeft className="w-5 h-5" />
//                       Disabled
//                     </span>
//                   )}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Order Rules */}
//         <div className="bg-[#14141e] border border-gray-800 rounded-xl p-6">
//           <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//             <DollarSign className="w-5 h-5 text-indigo-400" />
//             Order Rules
//           </h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm text-gray-400 mb-1.5">Minimum Order Value</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
//                 <input
//                   type="number"
//                   value={settings.minOrderValue}
//                   onChange={(e) => setSettings({...settings, minOrderValue: parseFloat(e.target.value) || 0})}
//                   className="w-full pl-8 pr-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Leave 0 for no minimum</p>
//             </div>
//           </div>
//         </div>

//         {/* Shipping Rules */}
//         <div className="bg-[#14141e] border border-gray-800 rounded-xl p-6">
//           <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//             <Truck className="w-5 h-5 text-indigo-400" />
//             Shipping Rules
//           </h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm text-gray-400 mb-1.5">Flat Shipping Rate</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
//                 <input
//                   type="number"
//                   value={settings.shippingFlatRate}
//                   onChange={(e) => setSettings({...settings, shippingFlatRate: parseFloat(e.target.value) || 0})}
//                   className="w-full pl-8 pr-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm text-gray-400 mb-1.5">Free Shipping Threshold</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
//                 <input
//                   type="number"
//                   value={settings.freeShippingThreshold}
//                   onChange={(e) => setSettings({...settings, freeShippingThreshold: parseFloat(e.target.value) || 0})}
//                   className="w-full pl-8 pr-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 outline-none"
//                 />
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Orders above this amount get free shipping</p>
//             </div>
//             <div className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
//               <span className="text-gray-300">Shipping by Zone</span>
//               <button
//                 onClick={() => toggleSetting('shippingByZone')}
//                 className="flex items-center gap-2 text-sm"
//               >
//                 {settings.shippingByZone ? (
//                   <span className="flex items-center gap-1 text-green-400">
//                     <ToggleRight className="w-5 h-5" />
//                     Enabled
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-1 text-gray-500">
//                     <ToggleLeft className="w-5 h-5" />
//                     Disabled
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* COD Setting */}
//         <div className="bg-[#14141e] border border-gray-800 rounded-xl p-6">
//           <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//             <ShoppingBag className="w-5 h-5 text-indigo-400" />
//             Cash on Delivery
//           </h3>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-300">Enable Cash on Delivery</p>
//               <p className="text-sm text-gray-500">Allow customers to pay upon delivery</p>
//             </div>
//             <button
//               onClick={() => toggleSetting('codEnabled')}
//               className="flex items-center gap-2 text-sm"
//             >
//               {settings.codEnabled ? (
//                 <span className="flex items-center gap-1 text-green-400">
//                   <ToggleRight className="w-5 h-5" />
//                   Enabled
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-1 text-gray-500">
//                   <ToggleLeft className="w-5 h-5" />
//                   Disabled
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutSetting;



// src/pages/dashboard/CheckoutSettings.jsx
import React, { useState, useEffect } from 'react'
import {
    Save,
    Loader2,
    User,
    Phone,
    Mail,
    MapPin,
    Home,
    Building,
    Truck,
    Package,
    DollarSign,
    Settings,
    Shield,
    Zap,
    Plus,
    Trash2,
    Edit,
    X,
    CheckCircle,
    XCircle,
    Globe,
    Clock,
    ShoppingCart,
    CreditCard,
    Wallet,
    Hash,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const CheckoutSettings = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState(null)
    const [provinces, setProvinces] = useState([])
    const [showZoneModal, setShowZoneModal] = useState(false)
    const [editingZone, setEditingZone] = useState(null)
    const [zoneForm, setZoneForm] = useState({
        name: '',
        cities: '',
        rate: 0,
        label: 'Shipping',
        estimatedDays: '3-5 days',
    })
    const [activeTab, setActiveTab] = useState('general')

    // Get token
    const getToken = () => localStorage.getItem('token')

    // Fetch settings
    const fetchSettings = async () => {
        try {
            setLoading(true)
            const token = getToken()
            const response = await api.get('/checkout/settings', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setSettings(response.data.settings)
                setProvinces(response.data.provinces || [])
            }
        } catch (error) {
            console.error('Error fetching checkout settings:', error)
            toast.error('Failed to load checkout settings')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    // Save settings
    const saveSettings = async () => {
        try {
            setSaving(true)
            const token = getToken()
            const response = await api.put('/checkout/settings', settings, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                toast.success('Checkout settings saved successfully!')
                setSettings(response.data.settings)
            }
        } catch (error) {
            console.error('Error saving checkout settings:', error)
            toast.error('Failed to save settings')
        } finally {
            setSaving(false)
        }
    }

    // Update nested field
    const updateField = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    // Update required field
    const updateRequiredField = (field, key, value) => {
        setSettings(prev => ({
            ...prev,
            requiredFields: {
                ...prev.requiredFields,
                [field]: {
                    ...prev.requiredFields[field],
                    [key]: value
                }
            }
        }))
    }

    // Update shipping field
    const updateShippingField = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            shipping: {
                ...prev.shipping,
                [section]: {
                    ...prev.shipping[section],
                    [field]: value
                }
            }
        }))
    }

    // Toggle field
    const toggleField = (section, field) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: !prev[section]?.[field]
            }
        }))
    }

    // Toggle shipping option
    const toggleShippingOption = (option) => {
        setSettings(prev => ({
            ...prev,
            shipping: {
                ...prev.shipping,
                deliveryOptions: {
                    ...prev.shipping.deliveryOptions,
                    [option]: {
                        ...prev.shipping.deliveryOptions[option],
                        enabled: !prev.shipping.deliveryOptions[option].enabled
                    }
                }
            }
        }))
    }

    // Add zone
    const addZone = async () => {
        try {
            const token = getToken()
            const zoneData = {
                name: zoneForm.name,
                cities: zoneForm.cities.split(',').map(c => c.trim()),
                rate: zoneForm.rate,
                label: zoneForm.label,
                estimatedDays: zoneForm.estimatedDays,
            }

            const response = await api.post('/checkout/zones', zoneData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setSettings(prev => ({
                    ...prev,
                    shipping: {
                        ...prev.shipping,
                        zones: response.data.zones
                    }
                }))
                toast.success('Zone added successfully!')
                setShowZoneModal(false)
                setZoneForm({ name: '', cities: '', rate: 0, label: 'Shipping', estimatedDays: '3-5 days' })
            }
        } catch (error) {
            console.error('Error adding zone:', error)
            toast.error('Failed to add zone')
        }
    }

    // Delete zone
    const deleteZone = async (zoneId) => {
        if (!window.confirm('Are you sure you want to delete this zone?')) return

        try {
            const token = getToken()
            const response = await api.delete(`/checkout/zones/${zoneId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setSettings(prev => ({
                    ...prev,
                    shipping: {
                        ...prev.shipping,
                        zones: response.data.zones
                    }
                }))
                toast.success('Zone deleted successfully!')
            }
        } catch (error) {
            console.error('Error deleting zone:', error)
            toast.error('Failed to delete zone')
        }
    }

    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'fields', label: 'Required Fields', icon: User },
        { id: 'shipping', label: 'Shipping Rules', icon: Truck },
        { id: 'zones', label: 'Shipping Zones', icon: MapPin },
        { id: 'delivery', label: 'Delivery Options', icon: Package },
        { id: 'advanced', label: 'Advanced', icon: Shield },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                <span className="ml-2 text-gray-400">Loading checkout settings...</span>
            </div>
        )
    }

    if (!settings) return null

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-white">Checkout Settings</h1>
                    <p className="text-gray-400 text-sm">Configure customer checkout flow and rules</p>
                </div>
                <button
                    onClick={saveSettings}
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
                            Save Settings
                        </>
                    )}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-2xl text-sm transition-all duration-200 flex items-center gap-2 ${
                                isActive
                                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* Content */}
            <div className="card p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">General Checkout Settings</h3>

                        {/* Guest Checkout */}
                        <div className="p-4 rounded-2xl bg-background border border-border">
                            <h4 className="text-table-body mb-3">Guest Checkout</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Enable Guest Checkout</span>
                                    <button
                                        onClick={() => toggleField('guestCheckout', 'enabled')}
                                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                            settings.guestCheckout?.enabled ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                        }`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                            settings.guestCheckout?.enabled ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                    </button>
                                </div>
                                {settings.guestCheckout?.enabled && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300">Require Email</span>
                                            <button
                                                onClick={() => toggleField('guestCheckout', 'requireEmail')}
                                                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                                    settings.guestCheckout?.requireEmail ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                                }`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                                    settings.guestCheckout?.requireEmail ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300">Require Phone</span>
                                            <button
                                                onClick={() => toggleField('guestCheckout', 'requirePhone')}
                                                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                                    settings.guestCheckout?.requirePhone ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                                }`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                                    settings.guestCheckout?.requirePhone ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Minimum Order Value */}
                        <div className="p-4 rounded-2xl bg-background border border-border">
                            <h4 className="text-table-body mb-3">Minimum Order Value</h4>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-300">Enable Minimum Order</span>
                                <button
                                    onClick={() => toggleField('minOrderValue', 'enabled')}
                                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                        settings.minOrderValue?.enabled ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                    }`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                        settings.minOrderValue?.enabled ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>
                            {settings.minOrderValue?.enabled && (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Minimum Amount (₹)</label>
                                        <input
                                            type="number"
                                            value={settings.minOrderValue?.amount || 0}
                                            onChange={(e) => updateField('minOrderValue', 'amount', parseFloat(e.target.value))}
                                            className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            placeholder="500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Error Message</label>
                                        <input
                                            type="text"
                                            value={settings.minOrderValue?.message || ''}
                                            onChange={(e) => updateField('minOrderValue', 'message', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            placeholder="Minimum order value of ₹{amount} is required"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Required Fields */}
                {activeTab === 'fields' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Required Checkout Fields</h3>
                        <p className="text-sm text-gray-400">Toggle which fields are required during checkout</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(settings.requiredFields || {}).map(([key, field]) => (
                                <div key={key} className="p-4 rounded-2xl bg-background border border-border">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {key === 'fullName' && <User className="w-4 h-4 text-indigo-400" />}
                                            {key === 'phone' && <Phone className="w-4 h-4 text-cyan-400" />}
                                            {key === 'email' && <Mail className="w-4 h-4 text-amber-400" />}
                                            {key === 'address' && <MapPin className="w-4 h-4 text-success" />}
                                            {key === 'city' && <Building className="w-4 h-4 text-purple-400" />}
                                            {key === 'state' && <Globe className="w-4 h-4 text-pink-400" />}
                                            {key === 'zipCode' && <Hash className="w-4 h-4 text-blue-400" />}
                                            {key === 'landmark' && <Home className="w-4 h-4 text-amber-400" />}
                                            <span className="text-sm text-white font-medium capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => updateRequiredField(key, 'required', !field.required)}
                                            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                                field.required ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                            }`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                                field.required ? 'translate-x-6' : 'translate-x-1'
                                            }`} />
                                        </button>
                                    </div>
                                    {field.required && (
                                        <div className="mt-2 space-y-2">
                                            <input
                                                type="text"
                                                value={field.label || ''}
                                                onChange={(e) => updateRequiredField(key, 'label', e.target.value)}
                                                className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                placeholder="Label"
                                            />
                                            <input
                                                type="text"
                                                value={field.placeholder || ''}
                                                onChange={(e) => updateRequiredField(key, 'placeholder', e.target.value)}
                                                className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                placeholder="Placeholder"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Field Order */}
                        <div className="p-4 rounded-2xl bg-background border border-border">
                            <h4 className="text-table-body mb-3">Field Order</h4>
                            <div className="flex flex-wrap gap-2">
                                {settings.fieldOrder?.map((field, index) => (
                                    <span key={field} className="px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 text-sm">
                                        {field.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Shipping Rules */}
                {activeTab === 'shipping' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Shipping Rules</h3>

                        <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border">
                            <span className="text-sm text-gray-300">Enable Shipping</span>
                            <button
                                onClick={() => toggleField('shipping', 'enabled')}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                    settings.shipping?.enabled ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                }`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                    settings.shipping?.enabled ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                            </button>
                        </div>

                        {settings.shipping?.enabled && (
                            <>
                                {/* Default Method */}
                                <div className="p-4 rounded-2xl bg-background border border-border">
                                    <label className="block text-sm text-gray-400 mb-1.5">Default Shipping Method</label>
                                    <select
                                        value={settings.shipping?.defaultMethod || 'flat_rate'}
                                        onChange={(e) => updateField('shipping', 'defaultMethod', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    >
                                        <option value="flat_rate">Flat Rate</option>
                                        <option value="free_shipping">Free Shipping</option>
                                        <option value="zone_based">Zone Based</option>
                                    </select>
                                </div>

                                {/* Flat Rate */}
                                {settings.shipping?.defaultMethod === 'flat_rate' && (
                                    <div className="p-4 rounded-2xl bg-background border border-border">
                                        <h4 className="text-table-body mb-3">Flat Rate</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-1.5">Amount (₹)</label>
                                                <input
                                                    type="number"
                                                    value={settings.shipping?.flatRate?.amount || 0}
                                                    onChange={(e) => updateShippingField('flatRate', 'amount', parseFloat(e.target.value))}
                                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-1.5">Label</label>
                                                <input
                                                    type="text"
                                                    value={settings.shipping?.flatRate?.label || 'Standard Shipping'}
                                                    onChange={(e) => updateShippingField('flatRate', 'label', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    placeholder="Standard Shipping"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Free Shipping */}
                                <div className="p-4 rounded-2xl bg-background border border-border">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-table-body">Free Shipping</h4>
                                        <button
                                            onClick={() => toggleField('shipping', 'freeShipping', !settings.shipping?.freeShipping?.enabled)}
                                            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                                settings.shipping?.freeShipping?.enabled ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                            }`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                                settings.shipping?.freeShipping?.enabled ? 'translate-x-6' : 'translate-x-1'
                                            }`} />
                                        </button>
                                    </div>
                                    {settings.shipping?.freeShipping?.enabled && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-1.5">Threshold (₹)</label>
                                                <input
                                                    type="number"
                                                    value={settings.shipping?.freeShipping?.threshold || 0}
                                                    onChange={(e) => updateShippingField('freeShipping', 'threshold', parseFloat(e.target.value))}
                                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    placeholder="1000"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-1.5">Label</label>
                                                <input
                                                    type="text"
                                                    value={settings.shipping?.freeShipping?.label || 'Free Shipping'}
                                                    onChange={(e) => updateShippingField('freeShipping', 'label', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    placeholder="Free Shipping"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Shipping Zones */}
                {activeTab === 'zones' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Shipping Zones</h3>
                                <p className="text-sm text-gray-400">Define shipping rates by zone</p>
                            </div>
                            <button
                                onClick={() => setShowZoneModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-xl text-white text-sm transition-all duration-200"
                            >
                                <Plus className="w-4 h-4" />
                                Add Zone
                            </button>
                        </div>

                        {settings.shipping?.zones?.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">
                                <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                                <p>No shipping zones configured</p>
                                <p className="text-sm text-gray-500">Add your first shipping zone</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {settings.shipping?.zones?.map((zone, index) => (
                                    <div key={zone._id || index} className="p-4 rounded-2xl bg-background border border-border hover:border-indigo-500/30 transition-all duration-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-white">{zone.name}</h4>
                                                <p className="text-sm text-gray-400">
                                                    {zone.cities?.join(', ')} • {zone.rate} • {zone.estimatedDays}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => deleteZone(zone._id)}
                                                    className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Nepal Provinces Quick Reference */}
                        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                            <h4 className="text-sm font-medium text-blue-400 mb-2">Nepal Provinces Reference</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {provinces.map((province, index) => (
                                    <div key={index} className="p-2 rounded-xl bg-card">
                                        <p className="text-xs text-white font-medium">{province.name}</p>
                                        <p className="text-xs text-gray-400">{province.districts?.length} districts</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Delivery Options */}
                {activeTab === 'delivery' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Delivery Options</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(settings.shipping?.deliveryOptions || {}).map(([key, option]) => (
                                <div key={key} className="p-4 rounded-2xl bg-background border border-border">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium text-white capitalize">{option.label}</h4>
                                        <button
                                            onClick={() => toggleShippingOption(key)}
                                            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                                option.enabled ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                            }`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                                option.enabled ? 'translate-x-6' : 'translate-x-1'
                                            }`} />
                                        </button>
                                    </div>
                                    {option.enabled && (
                                        <div className="space-y-2">
                                            <div>
                                                <label className="block text-xs text-gray-400 mb-1">Cost (₹)</label>
                                                <input
                                                    type="number"
                                                    value={option.cost || 0}
                                                    onChange={(e) => {
                                                        const value = parseFloat(e.target.value)
                                                        setSettings(prev => ({
                                                            ...prev,
                                                            shipping: {
                                                                ...prev.shipping,
                                                                deliveryOptions: {
                                                                    ...prev.shipping.deliveryOptions,
                                                                    [key]: {
                                                                        ...prev.shipping.deliveryOptions[key],
                                                                        cost: value
                                                                    }
                                                                }
                                                            }
                                                        }))
                                                    }}
                                                    className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    placeholder="0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-400 mb-1">Estimated Days</label>
                                                <input
                                                    type="text"
                                                    value={option.estimatedDays || ''}
                                                    onChange={(e) => {
                                                        setSettings(prev => ({
                                                            ...prev,
                                                            shipping: {
                                                                ...prev.shipping,
                                                                deliveryOptions: {
                                                                    ...prev.shipping.deliveryOptions,
                                                                    [key]: {
                                                                        ...prev.shipping.deliveryOptions[key],
                                                                        estimatedDays: e.target.value
                                                                    }
                                                                }
                                                            }
                                                        }))
                                                    }}
                                                    className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                    placeholder="3-5 days"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Advanced Settings */}
                {activeTab === 'advanced' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Advanced Settings</h3>

                        <div className="space-y-3">
                            {Object.entries(settings.additionalSettings || {}).map(([key, value]) => {
                                if (key === 'termsAndConditions' || key === 'privacyPolicy') {
                                    return (
                                        <div key={key} className="p-4 rounded-2xl bg-background border border-border">
                                            <label className="block text-sm text-gray-400 mb-1.5 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            <textarea
                                                rows="3"
                                                value={value || ''}
                                                onChange={(e) => {
                                                    setSettings(prev => ({
                                                        ...prev,
                                                        additionalSettings: {
                                                            ...prev.additionalSettings,
                                                            [key]: e.target.value
                                                        }
                                                    }))
                                                }}
                                                className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                                placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').trim()}`}
                                            />
                                        </div>
                                    )
                                }
                                return (
                                    <div key={key} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border">
                                        <span className="text-sm text-gray-300 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                        <button
                                            onClick={() => {
                                                setSettings(prev => ({
                                                    ...prev,
                                                    additionalSettings: {
                                                        ...prev.additionalSettings,
                                                        [key]: !prev.additionalSettings[key]
                                                    }
                                                }))
                                            }}
                                            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                                value ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                            }`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                                value ? 'translate-x-6' : 'translate-x-1'
                                            }`} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Add Zone Modal */}
            {showZoneModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="glass rounded-3xl border border-border max-w-lg w-full">
                        <div className="p-6 border-b border-border">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white">Add Shipping Zone</h3>
                                <button
                                    onClick={() => setShowZoneModal(false)}
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Zone Name</label>
                                <input
                                    type="text"
                                    value={zoneForm.name}
                                    onChange={(e) => setZoneForm({ ...zoneForm, name: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="e.g., Kathmandu Valley"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Cities (comma separated)</label>
                                <input
                                    type="text"
                                    value={zoneForm.cities}
                                    onChange={(e) => setZoneForm({ ...zoneForm, cities: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Kathmandu, Lalitpur, Bhaktapur"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Shipping Rate (₹)</label>
                                <input
                                    type="number"
                                    value={zoneForm.rate}
                                    onChange={(e) => setZoneForm({ ...zoneForm, rate: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Label</label>
                                <input
                                    type="text"
                                    value={zoneForm.label}
                                    onChange={(e) => setZoneForm({ ...zoneForm, label: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Shipping"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Estimated Days</label>
                                <input
                                    type="text"
                                    value={zoneForm.estimatedDays}
                                    onChange={(e) => setZoneForm({ ...zoneForm, estimatedDays: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="3-5 days"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-border flex justify-end gap-3">
                            <button
                                onClick={() => setShowZoneModal(false)}
                                className="px-6 py-2.5 bg-card border border-border hover:border-indigo-500/50 rounded-2xl text-white transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addZone}
                                className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-2xl text-white font-medium transition-all duration-200"
                            >
                                Add Zone
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckoutSettings