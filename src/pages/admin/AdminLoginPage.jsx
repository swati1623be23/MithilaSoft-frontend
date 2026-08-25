import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const AdminLoginPage = () => {
    const navigate = useNavigate()
    const { adminLogin, isAdminAuthenticated } = useAuth()
    const [email, setEmail] = useState('rajan32@gmail.com')
    const [password, setPassword] = useState('rajan@321')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (isAdminAuthenticated) {
            navigate('/admin/dashboard', { replace: true })
        }
    }, [isAdminAuthenticated, navigate])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        setError('')

        const result = await adminLogin(email, password)
        if (result?.success) {
            navigate('/admin/dashboard')
        } else {
            setError(result?.message || 'Invalid email or password.')
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),_transparent_55%),linear-gradient(135deg,_#020617,_#0f172a)] flex items-center justify-center px-4 py-10 text-white">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-2xl bg-indigo-500/20 p-3 text-indigo-300">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">Admin Access</h1>
                        <p className="text-sm text-slate-400">Secure administrator portal</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Email</label>
                        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3">
                            <Mail className="h-4 w-4 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent outline-none"
                                placeholder="Enter admin email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-slate-300">Password</label>
                        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3">
                            <Lock className="h-4 w-4 text-slate-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none"
                                placeholder="Enter password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-3 font-semibold text-white transition hover:from-indigo-600 hover:to-cyan-600 disabled:opacity-60"
                    >
                        {loading ? 'Signing in...' : 'Admin Login'}
                    </button>
                </form>

                <p className="mt-4 text-center text-xs text-slate-500">
                    Use your administrator credentials to continue.
                </p>
            </div>
        </div>
    )
}

export default AdminLoginPage
