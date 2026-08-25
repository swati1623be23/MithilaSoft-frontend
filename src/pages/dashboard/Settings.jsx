// src/pages/dashboard/Settings.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Store, CreditCard, Truck, Receipt, Mail, Bell, Palette, Image, User, Save } from 'lucide-react'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('store')

    const tabs = [
        { id: 'store', label: 'Store Settings', icon: Store },
        { id: 'payment', label: 'Payment Settings', icon: CreditCard },
        { id: 'shipping', label: 'Shipping Settings', icon: Truck },
        { id: 'tax', label: 'Tax Settings', icon: Receipt },
        { id: 'email', label: 'Email Settings', icon: Mail },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'theme', label: 'Theme & Logo', icon: Palette },
        { id: 'profile', label: 'Profile', icon: User },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-title">Settings</h1>
                <p className="text-desc">Configure your store settings</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <div className="md:w-64 flex-shrink-0">
                    <div className="card p-2 sticky top-24">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white border border-indigo-500/20'
                                            : 'text-textSecondary hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{tab.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="card p-6"
                    >
                        {activeTab === 'store' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Store Settings</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Store Name</label>
                                        <input type="text" className="input-field" placeholder="My Awesome Store" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Store Domain</label>
                                        <input type="text" className="input-field" placeholder="mystore.nexuscommerce.com" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1.5">Store Description</label>
                                        <textarea className="input-field" rows="3" placeholder="Describe your store..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Currency</label>
                                        <select className="input-field">
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Timezone</label>
                                        <select className="input-field">
                                            <option value="UTC">UTC</option>
                                            <option value="EST">EST</option>
                                            <option value="PST">PST</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </button>
                            </div>
                        )}

                        {activeTab === 'payment' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Payment Settings</h2>
                                <div className="space-y-4">
                                    {['Stripe', 'PayPal', 'Razorpay'].map((gateway) => (
                                        <div key={gateway} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                                    <CreditCard className="w-5 h-5 text-indigo-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{gateway}</h4>
                                                    <p className="text-sm text-textSecondary">Accept payments via {gateway}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked={gateway === 'Stripe'} />
                                                    <div className="w-11 h-6 bg-[#1E293B] rounded-full peer peer-checked:bg-indigo-500 transition-colors duration-200">
                                                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 peer-checked:translate-x-5 transition-transform duration-200"></div>
                                                    </div>
                                                </label>
                                                <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                                                    Configure
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Shipping Settings</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Free Shipping Threshold</label>
                                        <input type="number" className="input-field" placeholder="50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Flat Rate</label>
                                        <input type="number" className="input-field" placeholder="5.99" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1.5">Shipping Countries</label>
                                        <select className="input-field" multiple>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="DE">Germany</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'tax' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Tax Settings</h2>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Default Tax Rate</label>
                                    <input type="number" className="input-field" placeholder="0" />
                                    <p className="text-sm text-textSecondary mt-1">Set default tax rate for all products</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Tax Rules</label>
                                    <button className="px-4 py-2 rounded-2xl bg-background border border-border text-sm hover:border-indigo-500/50 transition-all duration-200">
                                        + Add Tax Rule
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'email' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Email Settings</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">SMTP Host</label>
                                        <input type="text" className="input-field" placeholder="smtp.gmail.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">SMTP Port</label>
                                        <input type="number" className="input-field" placeholder="587" />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1.5">SMTP User</label>
                                            <input type="text" className="input-field" placeholder="user@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1.5">SMTP Password</label>
                                            <input type="password" className="input-field" placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">From Email</label>
                                        <input type="email" className="input-field" placeholder="store@example.com" />
                                    </div>
                                    <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200">
                                        Send Test Email
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Notification Settings</h2>
                                <div className="space-y-3">
                                    {[
                                        'Order Confirmation',
                                        'Order Shipping',
                                        'Order Delivery',
                                        'Low Stock Alert',
                                        'New Customer',
                                        'New Review',
                                    ].map((notification) => (
                                        <div key={notification} className="flex items-center justify-between p-3 rounded-2xl bg-background border border-border">
                                            <span className="font-medium">{notification}</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-[#1E293B] rounded-full peer peer-checked:bg-indigo-500 transition-colors duration-200">
                                                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 peer-checked:translate-x-5 transition-transform duration-200"></div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'theme' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Theme & Logo</h2>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Store Logo</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 rounded-2xl bg-background border border-border flex items-center justify-center">
                                            <Image className="w-8 h-8 text-textSecondary" />
                                        </div>
                                        <button className="px-4 py-2 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200">
                                            Upload Logo
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Theme Color</label>
                                    <div className="flex gap-4">
                                        {['#4F46E5', '#06B6D4', '#F59E0B', '#22C55E', '#EF4444'].map((color) => (
                                            <button
                                                key={color}
                                                className="w-10 h-10 rounded-full border-2 border-border hover:border-white transition-colors duration-200"
                                                style={{ background: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Profile Settings</h2>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-title">
                                        JD
                                    </div>
                                    <div>
                                        <button className="px-4 py-2 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200">
                                            Change Photo
                                        </button>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Full Name</label>
                                        <input type="text" className="input-field" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Email</label>
                                        <input type="email" className="input-field" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Phone</label>
                                        <input type="tel" className="input-field" placeholder="+1 234 567 8900" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Current Password</label>
                                        <input type="password" className="input-field" placeholder="••••••••" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">New Password</label>
                                        <input type="password" className="input-field" placeholder="••••••••" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                                        <input type="password" className="input-field" placeholder="••••••••" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Settings