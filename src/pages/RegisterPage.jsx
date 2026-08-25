



// frontend/src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, User, Phone, Store } from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const registerSchema = z.object({
    storeName: z.string().min(3, 'Store name must be at least 3 characters'),
    ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
    phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const { register: registerUser, continueWithGoogle } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    })

    // ✅ UPDATED onSubmit FUNCTION - Replace your existing onSubmit with this
    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const result = await registerUser({
                storeName: data.storeName,
                ownerName: data.ownerName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password,
            })
            if (result.success) {
                // Navigation is handled by AuthContext
            }
        } catch (error) {
            console.error('Registration error:', error)
            toast.error(error.response?.data?.message || 'Registration failed')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignup = async () => {
        setIsGoogleLoading(true)
        try {
            console.log('Google signup button clicked')
            const values = getValues()

            if (!values.storeName || !values.ownerName || !values.phoneNumber) {
                toast.error('Please fill store name, owner name, and phone number before continuing with Google.')
                setIsGoogleLoading(false)
                return
            }

            const result = await continueWithGoogle({
                flow: 'register',
                storeName: values.storeName,
                ownerName: values.ownerName,
                phoneNumber: values.phoneNumber,
            })

            if (result.success) {
                navigate('/dashboard')
            } else {
                console.error('Google signup failed:', result.message)
            }
        } catch (error) {
            console.error('Google signup error:', error)
            toast.error('Google Sign-In failed. Please try again.')
        } finally {
            setIsGoogleLoading(false)
        }
    }

    // Preload Google Identity Services SDK so popup/open runs within a user gesture
    useEffect(() => {
        if (typeof window === 'undefined') return
        if (window.google?.accounts?.id) return

        const existing = document.getElementById('google-gsi-script')
        if (existing) return

        const script = document.createElement('script')
        script.id = 'google-gsi-script'
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        script.onload = () => console.log('Google GSI SDK preloaded')
        script.onerror = () => console.error('Failed to preload Google GSI SDK')
        document.body.appendChild(script)
    }, [])

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl relative z-10"
            >
                <div className="glass rounded-3xl border border-[#1E293B] p-8 md:p-12 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <Logo />
                        </div>
                        <h1 className="text-3xl font-bold mb-2 text-white">Create Your Store</h1>
                        <p className="text-gray-400">Start your ecommerce journey today</p>
                    </div>

                    {/* Google Signup */}
                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        disabled={isGoogleLoading}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white/5 hover:bg-white/10 border border-[#1E293B] rounded-2xl transition-all duration-300 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span className="font-medium">{isGoogleLoading ? 'Signing in with Google...' : 'Continue with Google'}</span>
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-[#1E293B]"></div>
                        <span className="text-sm text-gray-400">or</span>
                        <div className="flex-1 h-px bg-[#1E293B]"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Store Name</label>
                            <div className="relative">
                                <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('storeName')}
                                    placeholder="My Awesome Store"
                                    className="input-field pl-12 bg-[#0F172A] border-[#1E293B] text-white placeholder:text-gray-400 focus:border-indigo-400"
                                />
                            </div>
                            {errors.storeName && (
                                <p className="text-sm text-danger mt-1">{errors.storeName.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Owner Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('ownerName')}
                                    placeholder="John Doe"
                                    className="input-field pl-12 bg-[#0F172A] border-[#1E293B] text-white placeholder:text-gray-400 focus:border-indigo-400"
                                />
                            </div>
                            {errors.ownerName && (
                                <p className="text-sm text-danger mt-1">{errors.ownerName.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('phoneNumber')}
                                    placeholder="+1 234 567 8900"
                                    className="input-field pl-12 bg-[#0F172A] border-[#1E293B] text-white placeholder:text-gray-400 focus:border-indigo-400"
                                />
                            </div>
                            {errors.phoneNumber && (
                                <p className="text-sm text-danger mt-1">{errors.phoneNumber.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="you@example.com"
                                    className="input-field pl-12 bg-[#0F172A] border-[#1E293B] text-white placeholder:text-gray-400 focus:border-indigo-400"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-danger mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="input-field pl-12 pr-12 bg-[#0F172A] border-[#1E293B] text-white placeholder:text-gray-400 focus:border-indigo-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-danger mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register('confirmPassword')}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="input-field pl-12 pr-12 bg-[#0F172A] border-[#1E293B] text-white placeholder:text-gray-400 focus:border-indigo-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-danger mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating your store...
                                </>
                            ) : (
                                'Create Store'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default RegisterPage





















