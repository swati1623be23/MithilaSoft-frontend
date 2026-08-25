// src/pages/dashboard/Reviews.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import {
    Search,
    Star,
    CheckCircle,
    XCircle,
    Reply,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import { reviewAPI } from '../../services/api'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const reviewSchema = z.object({
    comment: z.string().min(2, 'Reply must be at least 2 characters'),
})

const statusOptions = ['All', 'Approved', 'Pending', 'Rejected', 'Hidden']

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [stats, setStats] = useState({
        averageRating: 0,
        totalReviews: 0,
        approved: 0,
        pending: 0,
        rejected: 0,
        hidden: 0,
        ratingTrend: [],
    })
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState('All')
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 })
    const [loading, setLoading] = useState(false)
    const [replyingReview, setReplyingReview] = useState(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(reviewSchema),
        defaultValues: { comment: '' },
    })

    const renderStars = (rating) => Array.from({ length: 5 }).map((_, index) => (
        <Star
            key={index}
            className={`w-4 h-4 ${index < rating ? 'fill-amber-400 text-amber-400' : 'text-[#1E293B]'}`}
        />
    ))

    const fetchReviews = async (nextPage = 1) => {
        try {
            setLoading(true)
            const statusParam = filterStatus === 'All' ? 'all' : filterStatus.toLowerCase()
            const res = await reviewAPI.getAll({
                page: nextPage,
                limit: 10,
                search: searchQuery,
                status: statusParam,
            })

            setReviews(res.data.reviews || [])
            setStats(res.data.stats || {
                averageRating: 0,
                totalReviews: 0,
                approved: 0,
                pending: 0,
                rejected: 0,
                hidden: 0,
                ratingTrend: [],
            })
            setPagination(res.data.pagination || { page: 1, limit: 10, total: 0, pages: 1 })
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to load reviews')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReviews(page)
    }, [searchQuery, filterStatus, page])

    const handleStatusChange = async (reviewId, status) => {
        try {
            await reviewAPI.updateStatus(reviewId, status.toLowerCase())
            toast.success(`Review ${status.toLowerCase()} successfully`)
            fetchReviews(page)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to update review status')
        }
    }

    const handleToggleHide = async (review) => {
        try {
            await reviewAPI.toggleHide(review._id || review.id)
            toast.success(review.isHidden ? 'Review restored' : 'Review hidden')
            fetchReviews(page)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to update review visibility')
        }
    }

    const handleReply = async (data) => {
        if (!replyingReview) return
        try {
            await reviewAPI.reply(replyingReview._id || replyingReview.id, data.comment)
            toast.success('Response added successfully')
            reset()
            setReplyingReview(null)
            fetchReviews(page)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to send reply')
        }
    }

    const handleDelete = async (review) => {
        const confirmed = window.confirm('Delete this review permanently?')
        if (!confirmed) return

        try {
            await reviewAPI.delete(review._id || review.id)
            toast.success('Review deleted')
            fetchReviews(page)
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Unable to delete review')
        }
    }

    const reviewStats = useMemo(() => [
        { label: 'Average Rating', value: stats.averageRating.toFixed(1), subtitle: 'Overall product score' },
        { label: 'Total Reviews', value: stats.totalReviews, subtitle: 'All submitted reviews' },
        { label: 'Approved', value: stats.approved, subtitle: 'Visible reviews' },
        { label: 'Pending', value: stats.pending, subtitle: 'Awaiting moderation' },
        { label: 'Rejected', value: stats.rejected, subtitle: 'Declined reviews' },
        { label: 'Hidden', value: stats.hidden, subtitle: 'Removed from storefront' },
    ], [stats])

    const getStatusBadge = (status) => {
        const normalized = String(status || '').toLowerCase()
        const mapping = {
            approved: 'bg-success/20 text-success',
            pending: 'bg-amber-500/20 text-amber-400',
            rejected: 'bg-danger/20 text-danger',
            hidden: 'bg-[#1E293B] text-textSecondary',
        }
        return mapping[normalized] || 'bg-[#1E293B] text-textSecondary'
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Reviews</h1>
                    <p className="text-desc">Manage customer reviews and ratings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviewStats.map((stat) => (
                        <div key={stat.label} className="card p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-textSecondary">{stat.label}</p>
                                    <h3 className="text-title mt-2">{stat.value}</h3>
                                </div>
                            </div>
                            <p className="text-sm text-textSecondary mt-3">{stat.subtitle}</p>
                        </div>
                    ))}
                </div>
                <div className="card p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-textSecondary">Rating Trend</p>
                            <h3 className="text-title mt-2">Last 30 days</h3>
                        </div>
                        <div className="text-sm text-textSecondary">{pagination.total} reviews</div>
                    </div>
                    <div className="mt-4 h-48">
                        {stats.ratingTrend?.length ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.ratingTrend} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                    <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" />
                                    <XAxis dataKey="date" stroke="#94A3B8" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#94A3B8" domain={[0, 5]} tick={{ fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: '#131A2B', border: '1px solid #1E293B', borderRadius: 12 }} labelStyle={{ color: '#F8FAFC' }} />
                                    <Line type="monotone" dataKey="averageRating" stroke="#4F46E5" strokeWidth={2} dot={{ r: 3 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center text-textSecondary">No rating trend data</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                    <input
                        type="text"
                        placeholder="Search reviews by product, customer, or comment..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setPage(1)
                        }}
                        className="w-full input-field pl-12"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => {
                        setFilterStatus(e.target.value)
                        setPage(1)
                    }}
                    className="input-field w-40"
                >
                    {statusOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="card p-6 text-center text-textSecondary">Loading reviews...</div>
            ) : !reviews.length ? (
                <div className="card p-6 text-center text-textSecondary">No reviews found for this filter.</div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review, index) => {
                        const customerName = review.customer?.firstName
                            ? `${review.customer.firstName} ${review.customer.lastName || ''}`.trim()
                            : review.customer?.email || 'Customer'
                        const productName = review.product?.name || 'Unknown product'
                        const reviewStatus = review.isHidden ? 'hidden' : (review.status || 'pending').toLowerCase()
                        const statusLabel = review.isHidden
                            ? 'Hidden'
                            : review.status?.charAt(0).toUpperCase() + review.status?.slice(1)

                        return (
                            <motion.div
                                key={review._id || review.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="card p-6 hover:border-indigo-500/50 transition-all duration-300"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                                                    {customerName.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{customerName}</h4>
                                                    <p className="text-sm text-textSecondary">Product: {productName}</p>
                                                </div>
                                            </div>
                                            <div className="text-sm text-textSecondary">{new Date(review.createdAt).toLocaleDateString()}</div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-2">
                                            {renderStars(review.rating)}
                                            <span className="text-sm font-medium text-textSecondary">{review.rating || 0}/5</span>
                                        </div>

                                        {review.title && <p className="mt-4 font-medium text-white">{review.title}</p>}
                                        <p className="mt-2 text-sm text-textSecondary">{review.comment}</p>

                                        {review.reply?.comment && (
                                            <div className="mt-4 rounded-2xl border border-border bg-background p-4">
                                                <div className="text-sm text-textSecondary">Response</div>
                                                <p className="mt-2 text-sm text-[#E2E8F0]">{review.reply.comment}</p>
                                                <div className="text-xs text-textSecondary mt-2">Replied on {new Date(review.reply.date).toLocaleDateString()}</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-start sm:items-end gap-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(reviewStatus)}`}>
                                            {statusLabel}
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {!review.isHidden && review.status?.toLowerCase() === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(review._id || review.id, 'Approved')}
                                                        className="px-3 py-2 rounded-xl bg-success/10 text-success text-sm hover:bg-success/20 transition-colors duration-200"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(review._id || review.id, 'Rejected')}
                                                        className="px-3 py-2 rounded-xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-colors duration-200"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleToggleHide(review)}
                                                className="px-3 py-2 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                                            >
                                                {review.isHidden ? 'Restore' : 'Hide'}
                                            </button>
                                            <button
                                                onClick={() => setReplyingReview(review)}
                                                className="px-3 py-2 rounded-xl bg-background border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                                            >
                                                Reply
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review)}
                                                className="px-3 py-2 rounded-xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-all duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {replyingReview && (replyingReview._id || replyingReview.id) === (review._id || review.id) && (
                                    <form onSubmit={handleSubmit(handleReply)} className="mt-4 space-y-3">
                                        <div>
                                            <label className="block text-sm text-textSecondary">Reply to review</label>
                                            <textarea
                                                {...register('comment')}
                                                rows="3"
                                                className="w-full input-field mt-2"
                                                placeholder="Write your response..."
                                            />
                                            {errors.comment && <p className="text-xs text-danger mt-1">{errors.comment.message}</p>}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Reply'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setReplyingReview(null)
                                                    reset()
                                                }}
                                                className="px-4 py-2 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            )}

            {pagination.pages > 1 && (
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                    <p className="text-sm text-textSecondary">Showing page {pagination.page} of {pagination.pages}</p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm">
                            {pagination.page}
                        </button>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, pagination.pages))}
                            disabled={page >= pagination.pages}
                            className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Reviews
