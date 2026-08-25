import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { storeUserAPI } from '../../services/api'

const roleOptions = [
    { value: 'owner', label: 'Owner' },
    { value: 'manager', label: 'Manager' },
    { value: 'staff', label: 'Staff' },
    { value: 'viewer', label: 'Viewer' },
]

const schema = z.object({
    email: z.string().email('Enter a valid email'),
    role: z.enum(['owner', 'manager', 'staff', 'viewer']),
})

const getInitials = (name = '') => name.trim().slice(0, 2).toUpperCase() || 'U'

const formatAddedAt = (date) => {
    if (!date) return '-'
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(date))
}

const roleBadgeClass = (role) => {
    const classes = {
        owner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
        manager: 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-400',
        staff: 'bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300',
        viewer: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
    }
    return classes[role?.toLowerCase()] || classes.staff
}

const StoreUsers = () => {
    const [users, setUsers] = useState([])
    const [stores, setStores] = useState([])
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 })
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [openActionId, setOpenActionId] = useState(null)

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { email: '', role: 'staff' },
    })

    const fetchUsers = async (nextPage = 1) => {
        try {
            setLoading(true)
            const res = await storeUserAPI.getAll({ page: nextPage, limit: 10 })
            setUsers(res.data.data || [])
            setPagination(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 })
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to load users')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        storeUserAPI.getStores()
            .then((res) => setStores(res.data.data || []))
            .catch((error) => toast.error(error.response?.data?.message || 'Unable to load stores'))
    }, [])

    useEffect(() => {
        fetchUsers(page)
    }, [page])

    const openInviteModal = () => {
        reset({ email: '', role: 'staff' })
        setShowModal(true)
    }

    const onSubmit = async ({ email, role }) => {
        const name = email.split('@')[0].replace(/[._-]+/g, ' ').trim() || 'New User'
        const brandName = localStorage.getItem('appearance_brandName') || 'MithilaSoft'
        try {
            await storeUserAPI.create({
                name,
                email,
                brandName,
                role,
                phone: '',
                password: `invite-${Date.now()}`,
                storeId: stores[0]?.id || '',
                isActive: true,
            })
            toast.success('Invitation sent successfully')
            setShowModal(false)
            fetchUsers(page)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to invite user')
        }
    }

    const onDelete = async (user) => {
        setOpenActionId(null)
        if (!window.confirm(`Delete ${user.name}?`)) return
        try {
            await storeUserAPI.delete(user.id)
            toast.success('User deleted successfully')
            fetchUsers(page)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to delete user')
        }
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-title">Store Users</h1>
                <button onClick={openInviteModal} className="btn-primary h-9 rounded-md px-4 text-xs">
                    <Plus className="h-4 w-4" />
                    Invite User
                </button>
            </div>

            <div className="card overflow-visible p-0">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px]">
                        <thead>
                            <tr className="border-b border-border text-left text-[11px] font-semibold text-textPrimary">
                                <th className="w-10 px-3 py-3">#</th>
                                <th className="px-3 py-3">Name</th>
                                <th className="px-3 py-3">Email notification</th>
                                <th className="px-3 py-3">Role</th>
                                <th className="px-3 py-3">Added At</th>
                                <th className="w-20 px-3 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" className="py-10 text-center text-sm text-textSecondary">Loading users...</td></tr>
                            ) : users.length === 0 ? (
                                <tr><td colSpan="6" className="py-10 text-center text-sm text-textSecondary">No users found</td></tr>
                            ) : users.map((user, index) => (
                                <tr key={user.id} className="border-b border-border bg-card last:border-0 hover:bg-cardHover">
                                    <td className="px-3 py-3 text-xs text-textSecondary">{(page - 1) * pagination.limit + index + 1}</td>
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">{getInitials(user.name)}</div>
                                            <div>
                                                <div className="text-sm font-semibold text-textPrimary">{user.name}</div>
                                                <div className="text-[11px] text-textSecondary">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3"><span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${user.isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'}`}>{user.isActive ? 'ENABLED' : 'PENDING'}</span></td>
                                    <td className="px-3 py-3"><span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase ${roleBadgeClass(user.role)}`}>{user.role}</span></td>
                                    <td className="px-3 py-3 text-xs text-textPrimary">{formatAddedAt(user.createdAt)}</td>
                                    <td className="relative px-3 py-3">
                                        <button onClick={() => setOpenActionId(openActionId === user.id ? null : user.id)} className="btn-icon h-8 w-8 rounded-md" aria-label={`Actions for ${user.name}`}><MoreHorizontal className="h-4 w-4" /></button>
                                        {openActionId === user.id && <button onClick={() => onDelete(user)} className="absolute right-3 top-12 z-10 rounded-md border border-border bg-card px-3 py-2 text-xs text-danger shadow-lg">Delete</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-textSecondary">
                    <span>{pagination.total ? `${(page - 1) * pagination.limit + 1} - ${Math.min(page * pagination.limit, pagination.total)} / ${pagination.total}` : '0 / 0'}</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setPage((current) => Math.max(current - 1, 1))} disabled={page === 1} className="p-1 disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></button>
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-white">{page}</span>
                        <button onClick={() => setPage((current) => Math.min(current + 1, pagination.pages))} disabled={page >= pagination.pages} className="p-1 disabled:opacity-40" aria-label="Next page"><ChevronRight className="h-4 w-4" /></button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-md border border-border bg-card p-5 shadow-xl">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-textPrimary">Invite User</h3>
                            <button onClick={() => setShowModal(false)} className="text-textSecondary hover:text-textPrimary" aria-label="Close invite dialog"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-textPrimary">Email</label>
                                <input type="email" {...register('email')} placeholder="eg: johndoe@gmail.com" className="input-field mt-1 h-9 rounded-md text-sm" />
                                {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-textPrimary">Role</label>
                                <select {...register('role')} className="input-field mt-1 h-9 rounded-md text-sm">
                                    {roleOptions.map((role) => <option key={role.value} value={role.value}>{role.label}</option>)}
                                </select>
                                {errors.role && <p className="mt-1 text-xs text-danger">{errors.role.message}</p>}
                            </div>
                            <button type="submit" disabled={isSubmitting} className="btn-primary h-10 w-full rounded-md text-sm">{isSubmitting ? 'Inviting...' : '+ New User'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StoreUsers
