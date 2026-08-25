


// src/pages/dashboard/StoreSettings.jsx
import React, { useState, useEffect } from 'react'
import {
    Save,
    X,
    Loader2,
    Store,
    Mail,
    Phone,
    MapPin,
    Building,
    Globe,
    DollarSign,
    Clock,
    Languages,
    Shield,
    Palette,
    Image,
    Link,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Linkedin,
    Smartphone,
    CheckCircle,
    XCircle,
    Copy,
    RefreshCw,
    AlertCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'
import generateStoreSlug from '../../utils/generateStoreSlug'

const StoreSettings = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState('general')

    // ⚠️ CRITICAL: Make sure this state structure matches the API response
    const [settings, setSettings] = useState({
        name: '',
        description: '',
        isActive: true,
        isVerified: false,
        subscription: {
            plan: 'free',
            status: 'active',
        },
        contactInfo: {
            email: '',
            phone: '',
            alternatePhone: '',
            whatsapp: '',
            website: '',
        },
        address: {
            street: '',
            city: '',
            state: '',
            country: 'Nepal',
            zipCode: '',
            landmark: '',
        },
        businessDetails: {
            registrationNumber: '',
            panNumber: '',
            vatNumber: '',
            businessType: 'sole_proprietorship',
            establishedYear: '',
            description: '',
        },
        settings: {
            currency: 'NPR',
            currencySymbol: 'Rs.',
            timezone: 'Asia/Kathmandu',
            language: 'en',
            dateFormat: 'DD/MM/YYYY',
            timeFormat: '24h',
            weightUnit: 'kg',
            dimensionUnit: 'cm',
        },
        domain: {
            customDomain: '',
            subdomain: '',
            verified: false,
            sslEnabled: false,
            isPremium: false,
            dnsRecords: {},
        },
        branding: {
            logo: '',
            favicon: '',
            primaryColor: '#4F46E5',
            secondaryColor: '#06B6D4',
            accentColor: '#F59E0B',
            fontFamily: 'Inter',
        },
        socialMedia: {
            facebook: '',
            instagram: '',
            twitter: '',
            youtube: '',
            linkedin: '',
            tiktok: '',
        },
        seo: {
            title: '',
            description: '',
            keywords: [],
            ogImage: '',
        },
        tax: {
            defaultRate: 13,
            includedInPrice: false,
            taxId: '',
        },
        shippingDefaults: {
            defaultOrigin: '',
            defaultWeight: 1,
            handlingFee: 0,
        },
        notifications: {
            orderConfirmation: true,
            orderShipping: true,
            orderDelivery: true,
            lowStock: true,
            newCustomer: true,
            newReview: true,
            promotional: false,
        },
    })

    // Get token
    const getToken = () => localStorage.getItem('token')

    // ✅ FIX: Fetch settings with proper error handling
    const fetchSettings = async () => {
        try {
            setLoading(true)
            const token = getToken()
            console.log('📤 Fetching store settings...')
            
            const response = await api.get('/stores/settings', {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log('📦 Settings response:', response.data)

            if (response.data.success) {
                // ✅ FIX: Merge response data with default state
                const storeData = response.data.store || {}
                setSettings(prev => ({
                    ...prev,
                    ...storeData,
                    contactInfo: { ...prev.contactInfo, ...storeData.contactInfo },
                    address: { ...prev.address, ...storeData.address },
                    businessDetails: { ...prev.businessDetails, ...storeData.businessDetails },
                    settings: { ...prev.settings, ...storeData.settings },
                    domain: { ...prev.domain, ...storeData.domain },
                    branding: { ...prev.branding, ...storeData.branding },
                    socialMedia: { ...prev.socialMedia, ...storeData.socialMedia },
                    seo: { ...prev.seo, ...storeData.seo },
                    tax: { ...prev.tax, ...storeData.tax },
                    shippingDefaults: { ...prev.shippingDefaults, ...storeData.shippingDefaults },
                    notifications: { ...prev.notifications, ...storeData.notifications },
                }))
                toast.success('Settings loaded successfully')
            } else {
                toast.error('Failed to load settings')
            }
        } catch (error) {
            console.error('❌ Error fetching settings:', error)
            toast.error('Failed to load store settings')
        } finally {
            setLoading(false)
        }
    }

    // ✅ FIX: Save settings with proper API call
    const saveSettings = async () => {
        try {
            setSaving(true)
            const token = getToken()
            
            console.log('📤 Saving settings:', settings)
            
            // ✅ FIX: Clean data before sending - remove empty strings and null values
            const cleanData = JSON.parse(JSON.stringify(settings))

            if (cleanData.name) {
                cleanData.domain = {
                    ...(cleanData.domain || {}),
                    subdomain: cleanData.domain?.subdomain || generateStoreSlug(cleanData.name, ''),
                }
            }
            
            const response = await api.put('/stores/settings', cleanData, {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log('📦 Save response:', response.data)

            if (response.data.success) {
                toast.success('Settings saved successfully!')
                // ✅ FIX: Update local state with response data
                if (response.data.store) {
                    setSettings(prev => ({
                        ...prev,
                        ...response.data.store,
                        contactInfo: { ...prev.contactInfo, ...response.data.store.contactInfo },
                        address: { ...prev.address, ...response.data.store.address },
                        businessDetails: { ...prev.businessDetails, ...response.data.store.businessDetails },
                        settings: { ...prev.settings, ...response.data.store.settings },
                        domain: { ...prev.domain, ...response.data.store.domain },
                        branding: { ...prev.branding, ...response.data.store.branding },
                        socialMedia: { ...prev.socialMedia, ...response.data.store.socialMedia },
                        seo: { ...prev.seo, ...response.data.store.seo },
                        tax: { ...prev.tax, ...response.data.store.tax },
                        shippingDefaults: { ...prev.shippingDefaults, ...response.data.store.shippingDefaults },
                        notifications: { ...prev.notifications, ...response.data.store.notifications },
                    }))
                }
            } else {
                toast.error(response.data.message || 'Failed to save settings')
            }
        } catch (error) {
            console.error('❌ Error saving settings:', error)
            const errorMsg = error.response?.data?.message || 'Failed to save settings'
            toast.error(errorMsg)
        } finally {
            setSaving(false)
        }
    }

    // ✅ FIX: Generic update function for all fields
    const updateField = (section, field, value) => {
        console.log(`🔄 Updating ${section}.${field} =`, value)
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    const handleStoreNameChange = (value) => {
        setSettings(prev => {
            const previousGeneratedSlug = generateStoreSlug(prev.name || '')
            const currentSubdomain = prev.domain?.subdomain || ''
            const shouldAutoUpdate = !currentSubdomain || currentSubdomain === previousGeneratedSlug

            return {
                ...prev,
                name: value,
                domain: {
                    ...prev.domain,
                    subdomain: shouldAutoUpdate ? generateStoreSlug(value, prev.name || '') : currentSubdomain,
                },
            }
        })
    }

    // ✅ FIX: Update nested fields (for contactInfo, address, etc.)
    const updateNestedField = (section, field, value) => {
        console.log(`🔄 Updating ${section}.${field} =`, value)
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    // ✅ FIX: Update deep nested fields (for settings.currency, etc.)
    const updateDeepField = (section, subsection, field, value) => {
        console.log(`🔄 Updating ${section}.${subsection}.${field} =`, value)
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subsection]: {
                    ...prev[section]?.[subsection],
                    [field]: value
                }
            }
        }))
    }

    // ✅ FIX: Toggle boolean values
    const toggleField = (section, field) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: !prev[section]?.[field]
            }
        }))
    }

    // ✅ FIX: Copy to clipboard
    const copyToClipboard = (text) => {
        if (!text) {
            toast.error('Nothing to copy')
            return
        }
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard!')
        }).catch(() => {
            toast.error('Failed to copy')
        })
    }

    // ✅ FIX: Load settings on mount
    useEffect(() => {
        fetchSettings()
    }, [])

    const tabs = [
        { id: 'general', label: 'General', icon: Store },
        { id: 'contact', label: 'Contact', icon: Mail },
        { id: 'address', label: 'Address', icon: MapPin },
        { id: 'business', label: 'Business', icon: Building },
        { id: 'localization', label: 'Localization', icon: Globe },
        { id: 'domain', label: 'Domain', icon: Link },
        { id: 'branding', label: 'Branding', icon: Palette },
        { id: 'social', label: 'Social Media', icon: Facebook },
        { id: 'seo', label: 'SEO', icon: Globe },
        { id: 'tax', label: 'Tax', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Mail },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                <span className="ml-2 text-gray-400">Loading store settings...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-white">Store Settings</h1>
                    <p className="text-gray-400 text-sm">Configure your store details and preferences</p>
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
                {/* ✅ GENERAL SETTINGS */}
                {activeTab === 'general' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">General Settings</h3>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Store Name</label>
                            <input
                                type="text"
                                value={settings.name || ''}
                                onChange={(e) => handleStoreNameChange(e.target.value)}
                                className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                placeholder="Enter store name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Store Description</label>
                            <textarea
                                rows="3"
                                value={settings.description || ''}
                                onChange={(e) => updateField('description', e.target.value)}
                                className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                placeholder="Brief description of your store"
                            />
                        </div>
                    </div>
                )}

                {/* ✅ CONTACT SETTINGS */}
                {activeTab === 'contact' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    value={settings.contactInfo?.email || ''}
                                    onChange={(e) => updateNestedField('contactInfo', 'email', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="store@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Phone</label>
                                <input
                                    type="tel"
                                    value={settings.contactInfo?.phone || ''}
                                    onChange={(e) => updateNestedField('contactInfo', 'phone', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="+977 9801666620"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Alternate Phone</label>
                                <input
                                    type="tel"
                                    value={settings.contactInfo?.alternatePhone || ''}
                                    onChange={(e) => updateNestedField('contactInfo', 'alternatePhone', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="+977 9801666621"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">WhatsApp</label>
                                <input
                                    type="tel"
                                    value={settings.contactInfo?.whatsapp || ''}
                                    onChange={(e) => updateNestedField('contactInfo', 'whatsapp', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="+977 9801666620"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-400 mb-1.5">Website</label>
                                <input
                                    type="url"
                                    value={settings.contactInfo?.website || ''}
                                    onChange={(e) => updateNestedField('contactInfo', 'website', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="https://yourstore.com"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ ADDRESS SETTINGS */}
                {activeTab === 'address' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Store Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-400 mb-1.5">Street</label>
                                <input
                                    type="text"
                                    value={settings.address?.street || ''}
                                    onChange={(e) => updateNestedField('address', 'street', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Street address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">City</label>
                                <input
                                    type="text"
                                    value={settings.address?.city || ''}
                                    onChange={(e) => updateNestedField('address', 'city', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Kathmandu"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">State/Province</label>
                                <input
                                    type="text"
                                    value={settings.address?.state || ''}
                                    onChange={(e) => updateNestedField('address', 'state', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Bagmati"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Country</label>
                                <input
                                    type="text"
                                    value={settings.address?.country || 'Nepal'}
                                    onChange={(e) => updateNestedField('address', 'country', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Nepal"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Zip Code</label>
                                <input
                                    type="text"
                                    value={settings.address?.zipCode || ''}
                                    onChange={(e) => updateNestedField('address', 'zipCode', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="44600"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-400 mb-1.5">Landmark</label>
                                <input
                                    type="text"
                                    value={settings.address?.landmark || ''}
                                    onChange={(e) => updateNestedField('address', 'landmark', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Near landmark"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ BUSINESS DETAILS */}
                {activeTab === 'business' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Business Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Registration Number</label>
                                <input
                                    type="text"
                                    value={settings.businessDetails?.registrationNumber || ''}
                                    onChange={(e) => updateNestedField('businessDetails', 'registrationNumber', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Business registration number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">PAN Number</label>
                                <input
                                    type="text"
                                    value={settings.businessDetails?.panNumber || ''}
                                    onChange={(e) => updateNestedField('businessDetails', 'panNumber', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="PAN number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">VAT Number</label>
                                <input
                                    type="text"
                                    value={settings.businessDetails?.vatNumber || ''}
                                    onChange={(e) => updateNestedField('businessDetails', 'vatNumber', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="VAT number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Business Type</label>
                                <select
                                    value={settings.businessDetails?.businessType || 'sole_proprietorship'}
                                    onChange={(e) => updateNestedField('businessDetails', 'businessType', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="sole_proprietorship">Sole Proprietorship</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="llc">LLC</option>
                                    <option value="corporation">Corporation</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Established Year</label>
                                <input
                                    type="number"
                                    value={settings.businessDetails?.establishedYear || ''}
                                    onChange={(e) => updateNestedField('businessDetails', 'establishedYear', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="2020"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-400 mb-1.5">Business Description</label>
                                <textarea
                                    rows="3"
                                    value={settings.businessDetails?.description || ''}
                                    onChange={(e) => updateNestedField('businessDetails', 'description', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                    placeholder="Describe your business"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ LOCALIZATION SETTINGS */}
                {activeTab === 'localization' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Localization Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Currency</label>
                                <select
                                    value={settings.settings?.currency || 'NPR'}
                                    onChange={(e) => updateDeepField('settings', 'currency', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="NPR">NPR - Nepalese Rupee</option>
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="INR">INR - Indian Rupee</option>
                                    <option value="AUD">AUD - Australian Dollar</option>
                                    <option value="CAD">CAD - Canadian Dollar</option>
                                    <option value="JPY">JPY - Japanese Yen</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Currency Symbol</label>
                                <input
                                    type="text"
                                    value={settings.settings?.currencySymbol || 'Rs.'}
                                    onChange={(e) => updateDeepField('settings', 'currencySymbol', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Rs."
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Timezone</label>
                                <select
                                    value={settings.settings?.timezone || 'Asia/Kathmandu'}
                                    onChange={(e) => updateDeepField('settings', 'timezone', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="Asia/Kathmandu">Asia/Kathmandu (UTC+5:45)</option>
                                    <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
                                    <option value="Asia/Dubai">Asia/Dubai (UTC+4)</option>
                                    <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                                    <option value="America/New_York">America/New_York (UTC-5)</option>
                                    <option value="America/Los_Angeles">America/Los_Angeles (UTC-8)</option>
                                    <option value="Europe/London">Europe/London (UTC+0)</option>
                                    <option value="Europe/Paris">Europe/Paris (UTC+1)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Language</label>
                                <select
                                    value={settings.settings?.language || 'en'}
                                    onChange={(e) => updateDeepField('settings', 'language', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="en">English</option>
                                    <option value="ne">Nepali</option>
                                    <option value="hi">Hindi</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="es">Spanish</option>
                                    <option value="zh">Chinese</option>
                                    <option value="ar">Arabic</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Date Format</label>
                                <select
                                    value={settings.settings?.dateFormat || 'DD/MM/YYYY'}
                                    onChange={(e) => updateDeepField('settings', 'dateFormat', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                    <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                                    <option value="MMMM DD, YYYY">MMMM DD, YYYY</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Time Format</label>
                                <select
                                    value={settings.settings?.timeFormat || '24h'}
                                    onChange={(e) => updateDeepField('settings', 'timeFormat', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="12h">12-hour (AM/PM)</option>
                                    <option value="24h">24-hour</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Weight Unit</label>
                                <select
                                    value={settings.settings?.weightUnit || 'kg'}
                                    onChange={(e) => updateDeepField('settings', 'weightUnit', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="kg">Kilograms (kg)</option>
                                    <option value="g">Grams (g)</option>
                                    <option value="lb">Pounds (lb)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Dimension Unit</label>
                                <select
                                    value={settings.settings?.dimensionUnit || 'cm'}
                                    onChange={(e) => updateDeepField('settings', 'dimensionUnit', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="cm">Centimeters (cm)</option>
                                    <option value="in">Inches (in)</option>
                                    <option value="ft">Feet (ft)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ DOMAIN SETTINGS */}
                {activeTab === 'domain' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Domain Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Custom Domain</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={settings.domain?.customDomain || ''}
                                        onChange={(e) => updateNestedField('domain', 'customDomain', e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="yourstore.com"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(settings.domain?.customDomain || '')}
                                        className="px-4 py-2.5 bg-[#1E293B] hover:bg-[#2A3A4B] rounded-2xl text-gray-400 hover:text-white transition-colors duration-200"
                                        title="Copy domain"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                    {settings.domain?.verified ? (
                                        <span className="text-sm text-green-400 flex items-center gap-1">
                                            <CheckCircle className="w-4 h-4" />
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="text-sm text-yellow-400 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            Not Verified
                                        </span>
                                    )}
                                    {settings.domain?.sslEnabled && (
                                        <span className="text-sm text-green-400 flex items-center gap-1">
                                            <Shield className="w-4 h-4" />
                                            SSL Enabled
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Store Slug</label>
                                <input
                                    type="text"
                                    value={settings.domain?.subdomain || ''}
                                    onChange={(e) => updateNestedField('domain', 'subdomain', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="mithila-soft"
                                />
                                <p className="mt-2 text-xs text-gray-500">This updates your storefront URL automatically when the store name changes.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ BRANDING SETTINGS */}
                {activeTab === 'branding' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Branding</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Logo URL</label>
                                <input
                                    type="text"
                                    value={settings.branding?.logo || ''}
                                    onChange={(e) => updateNestedField('branding', 'logo', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="https://example.com/logo.png"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Favicon URL</label>
                                <input
                                    type="text"
                                    value={settings.branding?.favicon || ''}
                                    onChange={(e) => updateNestedField('branding', 'favicon', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="https://example.com/favicon.ico"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Primary Color</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="color"
                                        value={settings.branding?.primaryColor || '#4F46E5'}
                                        onChange={(e) => updateNestedField('branding', 'primaryColor', e.target.value)}
                                        className="w-12 h-12 rounded-xl cursor-pointer bg-card border border-border"
                                    />
                                    <input
                                        type="text"
                                        value={settings.branding?.primaryColor || '#4F46E5'}
                                        onChange={(e) => updateNestedField('branding', 'primaryColor', e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Secondary Color</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="color"
                                        value={settings.branding?.secondaryColor || '#06B6D4'}
                                        onChange={(e) => updateNestedField('branding', 'secondaryColor', e.target.value)}
                                        className="w-12 h-12 rounded-xl cursor-pointer bg-card border border-border"
                                    />
                                    <input
                                        type="text"
                                        value={settings.branding?.secondaryColor || '#06B6D4'}
                                        onChange={(e) => updateNestedField('branding', 'secondaryColor', e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Accent Color</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="color"
                                        value={settings.branding?.accentColor || '#F59E0B'}
                                        onChange={(e) => updateNestedField('branding', 'accentColor', e.target.value)}
                                        className="w-12 h-12 rounded-xl cursor-pointer bg-card border border-border"
                                    />
                                    <input
                                        type="text"
                                        value={settings.branding?.accentColor || '#F59E0B'}
                                        onChange={(e) => updateNestedField('branding', 'accentColor', e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Font Family</label>
                                <select
                                    value={settings.branding?.fontFamily || 'Inter'}
                                    onChange={(e) => updateNestedField('branding', 'fontFamily', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="Inter">Inter</option>
                                    <option value="Poppins">Poppins</option>
                                    <option value="Roboto">Roboto</option>
                                    <option value="Open Sans">Open Sans</option>
                                    <option value="Lato">Lato</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Raleway">Raleway</option>
                                    <option value="Nunito">Nunito</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ SOCIAL MEDIA SETTINGS */}
                {activeTab === 'social' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Social Media</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
                                    <Facebook className="w-4 h-4 text-blue-500" /> Facebook
                                </label>
                                <input
                                    type="url"
                                    value={settings.socialMedia?.facebook || ''}
                                    onChange={(e) => updateNestedField('socialMedia', 'facebook', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="https://facebook.com/yourstore"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
                                    <Instagram className="w-4 h-4 text-pink-500" /> Instagram
                                </label>
                                <input
                                    type="url"
                                    value={settings.socialMedia?.instagram || ''}
                                    onChange={(e) => updateNestedField('socialMedia', 'instagram', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="https://instagram.com/yourstore"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
                                    <Twitter className="w-4 h-4 text-blue-400" /> Twitter/X
                                </label>
                                <input
                                    type="url"
                                    value={settings.socialMedia?.twitter || ''}
                                    onChange={(e) => updateNestedField('socialMedia', 'twitter', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="https://twitter.com/yourstore"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
                                    <Youtube className="w-4 h-4 text-red-500" /> YouTube
                                </label>
                                <input
                                    type="url"
                                    value={settings.socialMedia?.youtube || ''}
                                    onChange={(e) => updateNestedField('socialMedia', 'youtube', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="https://youtube.com/yourstore"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
                                    <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
                                </label>
                                <input
                                    type="url"
                                    value={settings.socialMedia?.linkedin || ''}
                                    onChange={(e) => updateNestedField('socialMedia', 'linkedin', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="https://linkedin.com/company/yourstore"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1.5 flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-black" /> TikTok
                                </label>
                                <input
                                    type="url"
                                    value={settings.socialMedia?.tiktok || ''}
                                    onChange={(e) => updateNestedField('socialMedia', 'tiktok', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="https://tiktok.com/@yourstore"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ SEO SETTINGS */}
                {activeTab === 'seo' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">SEO Settings</h3>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">SEO Title</label>
                            <input
                                type="text"
                                value={settings.seo?.title || ''}
                                onChange={(e) => updateNestedField('seo', 'title', e.target.value)}
                                className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                placeholder="Your store name - Best Products"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">SEO Description</label>
                            <textarea
                                rows="3"
                                value={settings.seo?.description || ''}
                                onChange={(e) => updateNestedField('seo', 'description', e.target.value)}
                                className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                placeholder="Your store description for search engines"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">SEO Keywords</label>
                            <input
                                type="text"
                                value={settings.seo?.keywords?.join(', ') || ''}
                                onChange={(e) => {
                                    const keywords = e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                                    updateNestedField('seo', 'keywords', keywords)
                                }}
                                className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                placeholder="keyword1, keyword2, keyword3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">OG Image URL</label>
                            <input
                                type="text"
                                value={settings.seo?.ogImage || ''}
                                onChange={(e) => updateNestedField('seo', 'ogImage', e.target.value)}
                                className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                placeholder="https://example.com/og-image.jpg"
                            />
                        </div>
                    </div>
                )}

                {/* ✅ TAX SETTINGS */}
                {activeTab === 'tax' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Tax Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Default Tax Rate (%)</label>
                                <input
                                    type="number"
                                    value={settings.tax?.defaultRate || 13}
                                    onChange={(e) => updateNestedField('tax', 'defaultRate', parseFloat(e.target.value))}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="13"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Tax ID</label>
                                <input
                                    type="text"
                                    value={settings.tax?.taxId || ''}
                                    onChange={(e) => updateNestedField('tax', 'taxId', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="Your tax identification number"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.tax?.includedInPrice || false}
                                        onChange={(e) => updateNestedField('tax', 'includedInPrice', e.target.checked)}
                                        className="w-4 h-4 rounded border-border bg-background text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
                                    />
                                    <span className="text-sm text-gray-400">Tax included in product prices</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ NOTIFICATION SETTINGS */}
                {activeTab === 'notifications' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
                        <div className="space-y-3">
                            {Object.entries(settings.notifications || {}).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                                    <label className="text-sm text-gray-300 cursor-pointer">
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </label>
                                    <button
                                        onClick={() => toggleField('notifications', key)}
                                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                            value ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                        }`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                            value ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StoreSettings