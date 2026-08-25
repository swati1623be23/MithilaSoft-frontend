// // frontend/src/pages/dashboard/PaymentSetting.jsx
// import React, { useState } from 'react';
// import { 
//   CreditCard,
//   Wallet,
//   Banknote,
//   Globe,
//   Zap,
//   CheckCircle,
//   XCircle,
//   Save,
//   Settings,
//   DollarSign
// } from 'lucide-react';

// const PaymentSetting = () => {
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   const [methods, setMethods] = useState([
//     { id: 1, name: 'Cash on Delivery', icon: Banknote, enabled: true, fee: 0, minOrder: 0 },
//     { id: 2, name: 'Blanxer Pay', icon: Zap, enabled: true, fee: 3, minOrder: 100 },
//     { id: 3, name: 'Bank Transfer', icon: Wallet, enabled: false, fee: 0, minOrder: 0 },
//     { id: 4, name: 'E-sewa', icon: Globe, enabled: false, fee: 2, minOrder: 50 },
//   ]);

//   const handleSave = async () => {
//     setSaving(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setSaving(false);
//     setSaved(true);
//     setTimeout(() => setSaved(false), 3000);
//   };

//   const toggleMethod = (id) => {
//     setMethods(methods.map(m => 
//       m.id === id ? { ...m, enabled: !m.enabled } : m
//     ));
//   };

//   const updateMethod = (id, field, value) => {
//     setMethods(methods.map(m => 
//       m.id === id ? { ...m, [field]: value } : m
//     ));
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-title text-white">Payment Setting</h1>
//           <p className="text-gray-400 text-sm">Configure how customers pay</p>
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

//       {/* Payment Methods */}
//       <div className="space-y-4">
//         {methods.map((method) => (
//           <div key={method.id} className="bg-[#14141e] border border-gray-800 rounded-xl p-4">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className={`p-2 rounded-lg ${method.enabled ? 'bg-indigo-500/20' : 'bg-gray-800'}`}>
//                   <method.icon className={`w-5 h-5 ${method.enabled ? 'text-indigo-400' : 'text-gray-500'}`} />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-white">{method.name}</h3>
//                   <div className="flex items-center gap-3 text-xs text-gray-400">
//                     {method.fee > 0 && (
//                       <span className="flex items-center gap-1">
//                         <DollarSign className="w-3 h-3" />
//                         {method.fee}% fee
//                       </span>
//                     )}
//                     {method.minOrder > 0 && (
//                       <span>Min: ₹{method.minOrder}</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => toggleMethod(method.id)}
//                   className={`relative w-10 h-5 rounded-full transition-colors ${
//                     method.enabled ? 'bg-indigo-600' : 'bg-gray-700'
//                   }`}
//                 >
//                   <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
//                     method.enabled ? 'left-5 bg-white' : 'left-0.5 bg-gray-400'
//                   }`} />
//                 </button>
//                 <button className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
//                   <Settings className="w-4 h-4 text-gray-400 hover:text-white" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Blanxer Fee Notice */}
//       <div className="mt-6 bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4">
//         <div className="flex items-start gap-3">
//           <Zap className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="text-indigo-300 font-medium">Blanxer Pay Fee Structure</p>
//             <p className="text-gray-400 text-sm">Blanxer Pay charges a flat 3% fee per transaction. This fee is automatically deducted from the total amount.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSetting;





// src/pages/dashboard/PaymentSettings.jsx
import React, { useState, useEffect } from 'react'
import {
    Save,
    Loader2,
    CreditCard,
    Wallet,
    Banknote,
    Smartphone,
    QrCode,
    Building,
    Globe,
    CheckCircle,
    XCircle,
    Copy,
    Upload,
    Image,
    DollarSign,
    Percent,
    Settings,
    Shield,
    Zap,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const PaymentSettings = () => {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState({
        methods: {
            cod: { enabled: true, label: 'Cash on Delivery', fee: 0, instructions: '' },
            esewa: { enabled: false, label: 'eSewa', fee: 0, merchantId: '', secretKey: '', environment: 'test' },
            khalti: { enabled: false, label: 'Khalti', fee: 0, publicKey: '', secretKey: '', environment: 'test' },
            imePay: { enabled: false, label: 'IME Pay', fee: 0, merchantId: '', apiKey: '', environment: 'test' },
            fonepay: { enabled: false, label: 'Fonepay', fee: 0, merchantId: '', apiKey: '' },
            connectIPS: { enabled: false, label: 'ConnectIPS', fee: 0, merchantId: '', apiKey: '' },
            bankTransfer: { 
                enabled: false, 
                label: 'Bank Transfer', 
                fee: 0, 
                bankName: '', 
                accountNumber: '', 
                accountHolder: '', 
                branch: '',
                instructions: '' 
            },
            qrCode: { 
                enabled: false, 
                label: 'QR Code Payment', 
                fee: 0, 
                qrImage: '', 
                paymentNumber: '', 
                paymentName: '',
                provider: 'esewa',
                instructions: '' 
            },
        },
        defaultMethod: 'cod',
        rules: {
            minOrderAmount: 0,
            maxOrderAmount: 0,
            enableForGuest: true,
            enableForRegistered: true,
        },
        transaction: {
            feeType: 'fixed',
            feeAmount: 0,
            taxOnFee: false,
        },
        qrSettings: {
            phoneNumber: '',
            esewaNumber: '',
            khaltiNumber: '',
            imePayNumber: '',
            bankName: '',
            bankAccountNumber: '',
            bankAccountHolder: '',
            qrCodeImage: '',
            instructions: '',
        },
    })

    const [activeTab, setActiveTab] = useState('methods')

    // Get token
    const getToken = () => localStorage.getItem('token')

    // Fetch settings
    const fetchSettings = async () => {
        try {
            setLoading(true)
            const token = getToken()
            const response = await api.get('/payments/settings', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setSettings(response.data.settings)
            }
        } catch (error) {
            console.error('Error fetching payment settings:', error)
            toast.error('Failed to load payment settings')
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
            const response = await api.put('/payments/settings', settings, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                toast.success('Payment settings saved successfully!')
                setSettings(response.data.settings)
            }
        } catch (error) {
            console.error('Error saving payment settings:', error)
            toast.error('Failed to save settings')
        } finally {
            setSaving(false)
        }
    }

    // Toggle payment method
    const toggleMethod = async (method) => {
        try {
            const token = getToken()
            const newState = !settings.methods[method].enabled
            const response = await api.patch(`/payments/methods/${method}/toggle`, 
                { enabled: newState },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (response.data.success) {
                setSettings(prev => ({
                    ...prev,
                    methods: {
                        ...prev.methods,
                        [method]: {
                            ...prev.methods[method],
                            enabled: newState
                        }
                    }
                }))
                toast.success(`${settings.methods[method].label} ${newState ? 'enabled' : 'disabled'}`)
            }
        } catch (error) {
            console.error('Error toggling payment method:', error)
            toast.error('Failed to toggle payment method')
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

    // Update method field
    const updateMethodField = (method, field, value) => {
        setSettings(prev => ({
            ...prev,
            methods: {
                ...prev.methods,
                [method]: {
                    ...prev.methods[method],
                    [field]: value
                }
            }
        }))
    }

    // Update QR settings
    const updateQRSetting = (field, value) => {
        setSettings(prev => ({
            ...prev,
            qrSettings: {
                ...prev.qrSettings,
                [field]: value
            }
        }))
    }

    // Copy to clipboard
    const copyToClipboard = (text) => {
        if (!text) return
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard!')
        })
    }

    const tabs = [
        { id: 'methods', label: 'Payment Methods', icon: CreditCard },
        { id: 'qr', label: 'QR Settings', icon: QrCode },
        { id: 'rules', label: 'Rules & Fees', icon: Settings },
    ]

    const paymentMethods = [
        { key: 'cod', icon: Banknote, color: 'text-green-400' },
        { key: 'esewa', icon: Wallet, color: 'text-blue-400' },
        { key: 'khalti', icon: Wallet, color: 'text-purple-400' },
        { key: 'imePay', icon: Smartphone, color: 'text-cyan-400' },
        { key: 'fonepay', icon: QrCode, color: 'text-indigo-400' },
        { key: 'connectIPS', icon: Building, color: 'text-amber-400' },
        { key: 'bankTransfer', icon: Building, color: 'text-rose-400' },
        { key: 'qrCode', icon: QrCode, color: 'text-violet-400' },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                <span className="ml-2 text-gray-400">Loading payment settings...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-white">Payment Settings</h1>
                    <p className="text-gray-400 text-sm">Configure payment methods and QR settings</p>
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
                {/* Payment Methods */}
                {activeTab === 'methods' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {paymentMethods.map(({ key, icon: Icon, color }) => {
                                const method = settings.methods[key]
                                if (!method) return null
                                return (
                                    <div key={key} className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                                        method.enabled 
                                            ? 'border-indigo-500/50 bg-indigo-500/5' 
                                            : 'border-border bg-background'
                                    }`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center ${color}`}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white">{method.label}</h4>
                                                    <p className="text-xs text-gray-400">{method.enabled ? 'Active' : 'Inactive'}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleMethod(key)}
                                                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                                    method.enabled ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                                }`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                                    method.enabled ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                            </button>
                                        </div>

                                        {method.enabled && (
                                            <div className="space-y-2 mt-3 pt-3 border-t border-border">
                                                {key !== 'cod' && key !== 'qrCode' && key !== 'bankTransfer' && (
                                                    <>
                                                        <div>
                                                            <label className="block text-xs text-gray-400 mb-1">Fee ({method.fee || 0})</label>
                                                            <input
                                                                type="number"
                                                                value={method.fee || 0}
                                                                onChange={(e) => updateMethodField(key, 'fee', parseFloat(e.target.value))}
                                                                className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                            />
                                                        </div>
                                                        {key === 'esewa' && (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Merchant ID"
                                                                    value={method.merchantId || ''}
                                                                    onChange={(e) => updateMethodField(key, 'merchantId', e.target.value)}
                                                                    className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                                />
                                                                <input
                                                                    type="password"
                                                                    placeholder="Secret Key"
                                                                    value={method.secretKey || ''}
                                                                    onChange={(e) => updateMethodField(key, 'secretKey', e.target.value)}
                                                                    className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                                />
                                                                <select
                                                                    value={method.environment || 'test'}
                                                                    onChange={(e) => updateMethodField(key, 'environment', e.target.value)}
                                                                    className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                                >
                                                                    <option value="test">Test Mode</option>
                                                                    <option value="live">Live Mode</option>
                                                                </select>
                                                            </>
                                                        )}
                                                        {key === 'khalti' && (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Public Key"
                                                                    value={method.publicKey || ''}
                                                                    onChange={(e) => updateMethodField(key, 'publicKey', e.target.value)}
                                                                    className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                                />
                                                                <input
                                                                    type="password"
                                                                    placeholder="Secret Key"
                                                                    value={method.secretKey || ''}
                                                                    onChange={(e) => updateMethodField(key, 'secretKey', e.target.value)}
                                                                    className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                                />
                                                                <select
                                                                    value={method.environment || 'test'}
                                                                    onChange={(e) => updateMethodField(key, 'environment', e.target.value)}
                                                                    className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                                >
                                                                    <option value="test">Test Mode</option>
                                                                    <option value="live">Live Mode</option>
                                                                </select>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                                {key === 'bankTransfer' && (
                                                    <>
                                                        <input
                                                            type="text"
                                                            placeholder="Bank Name"
                                                            value={method.bankName || ''}
                                                            onChange={(e) => updateMethodField(key, 'bankName', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Account Number"
                                                            value={method.accountNumber || ''}
                                                            onChange={(e) => updateMethodField(key, 'accountNumber', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Account Holder Name"
                                                            value={method.accountHolder || ''}
                                                            onChange={(e) => updateMethodField(key, 'accountHolder', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                        />
                                                        <textarea
                                                            placeholder="Instructions"
                                                            value={method.instructions || ''}
                                                            onChange={(e) => updateMethodField(key, 'instructions', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                                            rows="2"
                                                        />
                                                    </>
                                                )}
                                                {key === 'qrCode' && (
                                                    <>
                                                        <input
                                                            type="text"
                                                            placeholder="Payment Number (e.g., 9801666620)"
                                                            value={method.paymentNumber || ''}
                                                            onChange={(e) => updateMethodField(key, 'paymentNumber', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Payment Name (e.g., Your Store Name)"
                                                            value={method.paymentName || ''}
                                                            onChange={(e) => updateMethodField(key, 'paymentName', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                        />
                                                        <select
                                                            value={method.provider || 'esewa'}
                                                            onChange={(e) => updateMethodField(key, 'provider', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                        >
                                                            <option value="esewa">eSewa</option>
                                                            <option value="khalti">Khalti</option>
                                                            <option value="imepay">IME Pay</option>
                                                            <option value="fonepay">Fonepay</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                        <div>
                                                            <label className="block text-xs text-gray-400 mb-1">QR Code Image URL</label>
                                                            <input
                                                                type="text"
                                                                placeholder="https://example.com/qr-code.png"
                                                                value={method.qrImage || ''}
                                                                onChange={(e) => updateMethodField(key, 'qrImage', e.target.value)}
                                                                className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                                            />
                                                        </div>
                                                        <textarea
                                                            placeholder="Instructions for QR payment"
                                                            value={method.instructions || ''}
                                                            onChange={(e) => updateMethodField(key, 'instructions', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                                            rows="2"
                                                        />
                                                    </>
                                                )}
                                                {key === 'cod' && (
                                                    <textarea
                                                        placeholder="COD Instructions"
                                                        value={method.instructions || ''}
                                                        onChange={(e) => updateMethodField(key, 'instructions', e.target.value)}
                                                        className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                                        rows="2"
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                            <h4 className="text-sm font-medium text-blue-400 flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Default Payment Method
                            </h4>
                            <select
                                value={settings.defaultMethod || 'cod'}
                                onChange={(e) => updateField('defaultMethod', e.target.value)}
                                className="mt-2 w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                            >
                                {Object.entries(settings.methods).map(([key, method]) => (
                                    method.enabled && (
                                        <option key={key} value={key}>{method.label}</option>
                                    )
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* QR Settings - Direct Payment to Your Number */}
                {activeTab === 'qr' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">QR Payment Settings</h3>
                        <p className="text-sm text-gray-400">
                            Configure your payment details so customers can pay directly to your account
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Your Phone Number</label>
                                <input
                                    type="text"
                                    value={settings.qrSettings?.phoneNumber || ''}
                                    onChange={(e) => updateQRSetting('phoneNumber', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="e.g., 9801666620"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">eSewa Number</label>
                                <input
                                    type="text"
                                    value={settings.qrSettings?.esewaNumber || ''}
                                    onChange={(e) => updateQRSetting('esewaNumber', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="e.g., 9801666620"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Khalti Number</label>
                                <input
                                    type="text"
                                    value={settings.qrSettings?.khaltiNumber || ''}
                                    onChange={(e) => updateQRSetting('khaltiNumber', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="e.g., 9801666620"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">IME Pay Number</label>
                                <input
                                    type="text"
                                    value={settings.qrSettings?.imePayNumber || ''}
                                    onChange={(e) => updateQRSetting('imePayNumber', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="e.g., 9801666620"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Bank Name</label>
                                <input
                                    type="text"
                                    value={settings.qrSettings?.bankName || ''}
                                    onChange={(e) => updateQRSetting('bankName', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="e.g., Nepal Bank Limited"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Bank Account Number</label>
                                <input
                                    type="text"
                                    value={settings.qrSettings?.bankAccountNumber || ''}
                                    onChange={(e) => updateQRSetting('bankAccountNumber', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="e.g., 0123456789"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Bank Account Holder Name</label>
                                <input
                                    type="text"
                                    value={settings.qrSettings?.bankAccountHolder || ''}
                                    onChange={(e) => updateQRSetting('bankAccountHolder', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="e.g., John Doe"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-400 mb-1.5">QR Code Image URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={settings.qrSettings?.qrCodeImage || ''}
                                        onChange={(e) => updateQRSetting('qrCodeImage', e.target.value)}
                                        className="flex-1 px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="https://example.com/qr-code.png"
                                    />
                                    <button
                                        className="px-4 py-2.5 bg-[#1E293B] hover:bg-[#2A3A4B] rounded-2xl text-gray-400 hover:text-white transition-colors duration-200"
                                        title="Upload QR Code"
                                    >
                                        <Upload className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-400 mb-1.5">Payment Instructions</label>
                                <textarea
                                    rows="3"
                                    value={settings.qrSettings?.instructions || ''}
                                    onChange={(e) => updateQRSetting('instructions', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                    placeholder="Instructions for customers on how to pay..."
                                />
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                            <h4 className="text-sm font-medium text-yellow-400 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Quick Setup for Direct Payments
                            </h4>
                            <p className="text-sm text-gray-400 mt-2">
                                1. Enter your phone number(s) above<br/>
                                2. Upload your QR code image<br/>
                                3. Customers can scan and pay directly to your account<br/>
                                4. Payment will be verified manually
                            </p>
                        </div>
                    </div>
                )}

                {/* Rules & Fees */}
                {activeTab === 'rules' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Rules & Fees</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Minimum Order Amount</label>
                                <input
                                    type="number"
                                    value={settings.rules?.minOrderAmount || 0}
                                    onChange={(e) => updateField('rules', 'minOrderAmount', parseFloat(e.target.value))}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Maximum Order Amount</label>
                                <input
                                    type="number"
                                    value={settings.rules?.maxOrderAmount || 0}
                                    onChange={(e) => updateField('rules', 'maxOrderAmount', parseFloat(e.target.value))}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    placeholder="0 (unlimited)"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                                <span className="text-sm text-gray-300">Enable for Guest Checkout</span>
                                <button
                                    onClick={() => updateField('rules', 'enableForGuest', !settings.rules?.enableForGuest)}
                                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                        settings.rules?.enableForGuest ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                    }`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                        settings.rules?.enableForGuest ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                                <span className="text-sm text-gray-300">Enable for Registered Users</span>
                                <button
                                    onClick={() => updateField('rules', 'enableForRegistered', !settings.rules?.enableForRegistered)}
                                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                        settings.rules?.enableForRegistered ? 'bg-indigo-500' : 'bg-[#1E293B]'
                                    }`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                                        settings.rules?.enableForRegistered ? 'translate-x-6' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <h4 className="text-table-body font-semibold mb-3">Transaction Fees</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1.5">Fee Type</label>
                                    <select
                                        value={settings.transaction?.feeType || 'fixed'}
                                        onChange={(e) => updateField('transaction', 'feeType', e.target.value)}
                                        className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    >
                                        <option value="fixed">Fixed</option>
                                        <option value="percentage">Percentage</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1.5">Fee Amount</label>
                                    <input
                                        type="number"
                                        value={settings.transaction?.feeAmount || 0}
                                        onChange={(e) => updateField('transaction', 'feeAmount', parseFloat(e.target.value))}
                                        className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={settings.transaction?.taxOnFee || false}
                                    onChange={(e) => updateField('transaction', 'taxOnFee', e.target.checked)}
                                    className="w-4 h-4 rounded border-border bg-background text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
                                />
                                <span className="text-sm text-gray-400">Apply tax on transaction fee</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PaymentSettings