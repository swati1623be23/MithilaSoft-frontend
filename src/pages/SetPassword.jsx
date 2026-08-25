import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { storeUserAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const SetPassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { login } = useAuth()
    const token = searchParams.get('token') || ''
    const [invite, setInvite] = useState(null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!token) {
            setError('Invitation is invalid or expired.')
            setLoading(false)
            return
        }

        storeUserAPI.getInvitation(token)
            .then((response) => setInvite(response.data.data))
            .catch((requestError) => setError(requestError.response?.data?.message || 'Invitation is invalid or expired.'))
            .finally(() => setLoading(false))
    }, [token])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        if (password.length < 8) return setError('Password must be at least 8 characters.')
        if (password !== confirmPassword) return setError('Passwords do not match.')

        try {
            setSubmitting(true)
            await storeUserAPI.acceptInvitation(token, password)
            const result = await login(invite.email, password)
            if (!result.success) {
                toast.success('Password set successfully. Please sign in.')
                navigate('/login')
            }
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Unable to set password.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 text-textPrimary">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
                <h1 className="text-2xl font-bold">Set Your Password</h1>
                {loading ? <p className="mt-4 text-sm text-textSecondary">Checking invitation...</p> : error && !invite ? <p className="mt-4 text-sm text-danger">{error}</p> : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <p className="text-sm text-textSecondary">Set a password for {invite.email}.</p>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="input-field" required minLength={8} />
                        <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" className="input-field" required minLength={8} />
                        {error && <p className="text-sm text-danger">{error}</p>}
                        <button type="submit" disabled={submitting} className="btn-primary w-full">{submitting ? 'Saving...' : 'Set Password & Continue'}</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default SetPassword