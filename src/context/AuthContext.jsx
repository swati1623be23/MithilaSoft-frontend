

// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authAPI } from '../services/api'

const AuthContext = createContext()

const buildUserSession = (userData) => ({
    id: userData?.id || userData?._id,
    name: userData?.name || userData?.ownerName || 'User',
    email: userData?.email || '',
    storeId: userData?.storeId || userData?.store || null,
    storeName: userData?.storeName || userData?.store?.name || 'My Store',
    ownerName: userData?.ownerName || userData?.name || 'User',
    role: userData?.role || 'owner',
})

const loadGoogleSdk = () => new Promise((resolve) => {
    if (window.google?.accounts?.id) {
        resolve(true)
        return
    }

    const existingScript = document.getElementById('google-gsi-script')
    if (existingScript) {
        existingScript.addEventListener('load', () => resolve(true), { once: true })
        existingScript.addEventListener('error', () => resolve(false), { once: true })
        return
    }

    const script = document.createElement('script')
    script.id = 'google-gsi-script'
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [adminUser, setAdminUser] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem('adminUser')
                return stored ? JSON.parse(stored) : null
            } catch {
                return null
            }
        }
        return null
    })
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'))
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            fetchUser()
        } else {
            setLoading(false)
        }
    }, [token])

    useEffect(() => {
        if (typeof window === 'undefined') return

        loadGoogleSdk().then((ready) => {
            if (ready) {
                console.log('Google GSI SDK preloaded')
            } else {
                console.error('Failed to preload Google GSI SDK')
            }
        })
    }, [])

    const persistAuthSession = (token, userData) => {
        localStorage.setItem('token', token)
        // Save storeName from userData
        const storeName = userData?.storeName || userData?.store?.name || 'myshop'
        localStorage.setItem('storeName', storeName)
        setToken(token)
        setUser(buildUserSession(userData))
    }

    const fetchUser = async () => {
        try {
            const response = await authAPI.getMe()
            console.log('Fetch user response:', response.data)
            
            const userData = response.data.user || response.data
            // Save storeName to localStorage
            const storeName = userData?.storeName || userData?.store?.name || 'myshop'
            localStorage.setItem('storeName', storeName)
            setUser(buildUserSession(userData))
        } catch (error) {
            console.error('Error fetching user:', error.response?.data || error.message)
            logout()
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        try {
            console.log('Login attempt:', { email })
            const response = await authAPI.login(email, password)
            
            console.log('Login response:', response.data)

            const { token, user: userData } = response.data
            persistAuthSession(token, userData)
            
            toast.success('Welcome back!')
            navigate('/dashboard')
            return { success: true }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message)
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.'
            toast.error(message)
            return { success: false, message }
        }
    }

    const register = async (data) => {
        try {
            console.log('Registration attempt:', { ...data, password: '***' })
            const response = await authAPI.register(data)
            
            console.log('Registration response:', response.data)
            
            const { token, user: userData } = response.data
            persistAuthSession(token, userData)
            
            toast.success('Account created successfully!')
            navigate('/dashboard')
            return { success: true }
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message)
            const message = error.response?.data?.message || 'Registration failed. Please try again.'
            toast.error(message)
            return { success: false, message }
        }
    }

    const continueWithGoogle = async (payload = {}) => {
        try {
            console.log('Google auth initiation requested', payload)
            const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

            if (!clientId) {
                console.error('Missing VITE_GOOGLE_CLIENT_ID for Google Sign-In')
                toast.error('Google Sign-In is not configured yet. Please contact the administrator.')
                return { success: false, message: 'Google Sign-In is not configured.' }
            }

            const sdkReady = await loadGoogleSdk()
            if (!sdkReady || !window.google?.accounts?.oauth2) {
                console.error('Google SDK could not be loaded')
                toast.error('Google Sign-In is temporarily unavailable.')
                return { success: false, message: 'Google SDK could not be loaded.' }
            }

            // Generate secure state from backend
            const response = await authAPI.generateGoogleState(payload)
            const state = response.data.state

            if (!state) {
                throw new Error('Failed to generate secure state')
            }

            return new Promise((resolve) => {
                const client = window.google.accounts.oauth2.initCodeClient({
                    client_id: clientId,
                    scope: 'openid email profile',
                    ux_mode: 'popup',
                    state: state,
                    callback: async (response) => {
                        if (response.error) {
                            console.error('Google popup error:', response.error)
                            toast.error('Authentication was cancelled or failed')
                            resolve({ success: false, message: 'Authentication was cancelled or failed' })
                            return
                        }

                        if (response.code) {
                            try {
                                const authRes = await authAPI.exchangeGoogleCode({
                                    code: response.code,
                                    state: response.state,
                                    redirectUri: 'postmessage'
                                })

                                if (authRes.data?.success) {
                                    const { token, user: userData } = authRes.data
                                    persistAuthSession(token, userData)
                                    toast.success('Successfully authenticated with Google!')
                                    navigate('/dashboard')
                                    resolve({ success: true })
                                } else {
                                    throw new Error(authRes.data?.message || 'Authentication failed')
                                }
                            } catch (error) {
                                console.error('Google callback error:', error)
                                const message = error.response?.data?.message || error.message || 'Google authentication failed'
                                toast.error(message)
                                resolve({ success: false, message })
                            }
                        }
                    }
                })

                client.requestCode()
            })
        } catch (error) {
            console.error('Google auth error:', error)
            const message = error.response?.data?.message || error.message || 'Google Sign-In failed. Please try again.'
            toast.error(message)
            return { success: false, message }
        }
    }

    const adminLogin = async (email, password) => {
        try {
            if (email === 'rajan32@gmail.com' && password === 'rajan@321') {
                const adminSession = {
                    email,
                    role: 'admin',
                    name: 'Administrator',
                    ownerName: 'Administrator',
                }
                localStorage.setItem('adminToken', 'admin-session')
                localStorage.setItem('adminUser', JSON.stringify(adminSession))
                setAdminToken('admin-session')
                setAdminUser(adminSession)
                toast.success('Admin login successful')
                return { success: true }
            }

            return { success: false, message: 'Invalid email or password.' }
        } catch (error) {
            toast.error('Admin login failed')
            return { success: false, message: 'Admin login failed' }
        }
    }

    const adminLogout = () => {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        setAdminToken(null)
        setAdminUser(null)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        navigate('/login')
        toast.success('Logged out successfully')
    }

    const value = {
        user,
        adminUser,
        setUser,
        loading,
        login,
        register,
        continueWithGoogle,
        persistAuthSession,
        logout,
        adminLogin,
        adminLogout,
        isAuthenticated: !!token,
        isAdminAuthenticated: !!adminToken,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}













