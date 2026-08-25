// src/pages/dashboard/Profile.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, Camera } from 'lucide-react'

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        role: 'Store Owner',
        joined: '2024-01-01',
        bio: 'Passionate about ecommerce and building amazing online stores.',
        location: 'New York, USA',
    })

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Profile</h1>
                    <p className="text-desc">Manage your personal information</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-primary"
                >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="card p-6 text-center">
                        <div className="relative inline-block">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold mx-auto">
                                JD
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-200">
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <h3 className="text-xl font-semibold mt-4">{profile.name}</h3>
                        <p className="text-textSecondary">{profile.role}</p>
                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm text-textSecondary">Member since</p>
                            <p className="font-medium">{profile.joined}</p>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="md:col-span-3">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                                        <input
                                            type="text"
                                            value={profile.name}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className={`input-field pl-12 ${!isEditing && 'cursor-not-allowed opacity-60'}`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className={`input-field pl-12 ${!isEditing && 'cursor-not-allowed opacity-60'}`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                            className={`input-field pl-12 ${!isEditing && 'cursor-not-allowed opacity-60'}`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                                        <input
                                            type="text"
                                            value={profile.location}
                                            disabled={!isEditing}
                                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                            className={`input-field pl-12 ${!isEditing && 'cursor-not-allowed opacity-60'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1.5">Bio</label>
                                <textarea
                                    value={profile.bio}
                                    disabled={!isEditing}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    rows="4"
                                    className={`input-field ${!isEditing && 'cursor-not-allowed opacity-60'}`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Activity Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="card p-4 text-center">
                            <div className="text-title text-indigo-400">247</div>
                            <div className="text-sm text-textSecondary">Products</div>
                        </div>
                        <div className="card p-4 text-center">
                            <div className="text-title text-cyan-400">1,284</div>
                            <div className="text-sm text-textSecondary">Orders</div>
                        </div>
                        <div className="card p-4 text-center">
                            <div className="text-title text-amber-400">3.8k</div>
                            <div className="text-sm text-textSecondary">Customers</div>
                        </div>
                        <div className="card p-4 text-center">
                            <div className="text-title text-success">$48k</div>
                            <div className="text-sm text-textSecondary">Revenue</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile