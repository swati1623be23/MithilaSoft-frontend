import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { storeUserAPI } from '../services/api'

const AcceptInvite = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const token = searchParams.get('token') || ''
    const [invite, setInvite] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!token) {
            setError('This invitation link is invalid.')
            setLoading(false)
            return
        }

        storeUserAPI.getInvitation(token)
            .then((response) => setInvite(response.data.data))
            .catch((requestError) => setError(requestError.response?.data?.message || 'This invitation link is invalid or expired.'))
            .finally(() => setLoading(false))
    }, [token])

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4 text-textPrimary">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
                <h1 className="text-2xl font-bold">Accept Invitation</h1>
                {loading ? (
                    <p className="mt-4 text-sm text-textSecondary">Checking invitation...</p>
                ) : error && !invite ? (
                    <p className="mt-4 text-sm text-danger">{error}</p>
                ) : (
                    <>
                        <p className="mt-2 text-sm text-textSecondary">Join {invite.storeName} as a {invite.role}.</p>
                        <p className="mt-1 text-sm text-textSecondary">{invite.email}</p>
                        <button type="button" onClick={() => navigate(`/set-password?token=${encodeURIComponent(token)}`)} className="btn-primary mt-6 w-full">Accept Invitation</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default AcceptInvite
