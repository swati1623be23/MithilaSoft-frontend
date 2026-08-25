// // src/pages/dashboard/Blog.jsx
// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Plus, Search, Edit, Trash2, Eye, BookOpen, Calendar, Tag, MoreVertical } from 'lucide-react'

// const Blog = () => {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [filterStatus, setFilterStatus] = useState('All')

//     const posts = [
//         { id: 1, title: '10 Tips for Ecommerce Success', status: 'Published', category: 'Business', author: 'John Doe', date: '2024-01-15', views: 245 },
//         { id: 2, title: 'How to Optimize Your Store', status: 'Draft', category: 'Marketing', author: 'Jane Smith', date: '2024-01-14', views: 0 },
//         { id: 3, title: 'The Future of Online Shopping', status: 'Published', category: 'Trends', author: 'John Doe', date: '2024-01-13', views: 189 },
//         { id: 4, title: 'Building Customer Loyalty', status: 'Published', category: 'Customer', author: 'Alice Brown', date: '2024-01-12', views: 156 },
//     ]

//     return (
//         <div className="space-y-6">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Blog</h1>
//                     <p className="text-desc">Manage your blog posts</p>
//                 </div>
//                 <button className="btn-primary">
//                     <Plus className="w-4 h-4" />
//                     New Post
//                 </button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-indigo-400">12</div>
//                     <div className="text-sm text-textSecondary">Total Posts</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-success">8</div>
//                     <div className="text-sm text-textSecondary">Published</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-amber-400">4</div>
//                     <div className="text-sm text-textSecondary">Drafts</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-cyan-400">2.4K</div>
//                     <div className="text-sm text-textSecondary">Total Views</div>
//                 </div>
//             </div>

//             {/* Search */}
//             <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1 relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
//                     <input
//                         type="text"
//                         placeholder="Search posts..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full input-field pl-12"
//                     />
//                 </div>
//                 <select
//                     value={filterStatus}
//                     onChange={(e) => setFilterStatus(e.target.value)}
//                     className="input-field w-40"
//                 >
//                     <option value="All">All Posts</option>
//                     <option value="Published">Published</option>
//                     <option value="Draft">Drafts</option>
//                 </select>
//             </div>

//             {/* Blog Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {posts.map((post, index) => (
//                     <motion.div
//                         key={post.id}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.3, delay: index * 0.05 }}
//                         className="card p-6 hover:border-indigo-500/50 transition-all duration-300 group"
//                     >
//                         <div className="flex items-start justify-between">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center">
//                                     <BookOpen className="w-6 h-6 text-indigo-400" />
//                                 </div>
//                                 <div>
//                                     <h3 className="font-semibold line-clamp-1">{post.title}</h3>
//                                     <div className="flex items-center gap-3 text-sm text-textSecondary">
//                                         <span>{post.author}</span>
//                                         <span>•</span>
//                                         <span>{post.date}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                 <MoreVertical className="w-5 h-5 text-textSecondary" />
//                             </button>
//                         </div>

//                         <div className="mt-4 flex items-center gap-3">
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                                 post.status === 'Published' ? 'bg-success/20 text-success' : 'bg-amber-500/20 text-amber-400'
//                             }`}>
//                                 {post.status}
//                             </span>
//                             <span className="px-3 py-1 rounded-full bg-[#1E293B] text-textSecondary text-xs">
//                                 <Tag className="w-3 h-3 inline mr-1" />
//                                 {post.category}
//                             </span>
//                             <span className="text-sm text-textSecondary">{post.views} views</span>
//                         </div>

//                         <div className="mt-4 flex gap-2">
//                             <button className="flex-1 px-3 py-1.5 rounded-xl bg-background border border-border text-sm hover:border-indigo-500/50 transition-all duration-200 flex items-center justify-center gap-1">
//                                 <Eye className="w-4 h-4" />
//                                 View
//                             </button>
//                             <button className="flex-1 px-3 py-1.5 rounded-xl bg-background border border-border text-sm hover:border-indigo-500/50 transition-all duration-200 flex items-center justify-center gap-1">
//                                 <Edit className="w-4 h-4" />
//                                 Edit
//                             </button>
//                             <button className="px-3 py-1.5 rounded-xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-all duration-200">
//                                 <Trash2 className="w-4 h-4" />
//                             </button>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Blog




// src/pages/dashboard/Blog.jsx
import React, { useState, useEffect } from 'react'
import {
    Plus,
    Edit,
    Trash2,
    Search,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Save,
    X,
    Loader2,
    Calendar,
    User,
    Tag,
    Folder,
    Eye,
    Filter,
    RefreshCw,
    Image as ImageIcon,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const Blog = () => {
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterCategory, setFilterCategory] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [editingPost, setEditingPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(null)
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [statusCounts, setStatusCounts] = useState([])
    const [stats, setStats] = useState({
        total: 0,
        published: 0,
        draft: 0,
        archived: 0,
    })

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        status: 'draft',
        featuredImage: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
    })

    // Get token
    const getToken = () => localStorage.getItem('token')

    // Fetch posts on load
    useEffect(() => {
        fetchPosts()
    }, [filterStatus, filterCategory])

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const token = getToken()
            const params = {}

            if (searchTerm) params.search = searchTerm
            if (filterStatus !== 'all') params.status = filterStatus
            if (filterCategory !== 'all') params.category = filterCategory

            const response = await api.get('/blog', {
                params,
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setPosts(response.data.posts || [])
                setCategories(response.data.categories || [])
                setTags(response.data.tags || [])
                setStatusCounts(response.data.statusCounts || [])
                calculateStats(response.data.posts || [])
            }
        } catch (error) {
            console.error('Error fetching posts:', error)
            toast.error('Failed to load blog posts')
        } finally {
            setLoading(false)
        }
    }

    const calculateStats = (postsData) => {
        setStats({
            total: postsData.length,
            published: postsData.filter(p => p.status === 'published').length,
            draft: postsData.filter(p => p.status === 'draft').length,
            archived: postsData.filter(p => p.status === 'archived').length,
        })
    }

    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPosts()
        }, 500)
        return () => clearTimeout(timer)
    }, [searchTerm])

    // ============================================
    // HANDLE SAVE
    // ============================================
    const handleSave = async () => {
        try {
            setSaving(true)

            if (!formData.title || !formData.title.trim()) {
                toast.error('Blog title is required')
                setSaving(false)
                return
            }

            if (!formData.content || !formData.content.trim()) {
                toast.error('Blog content is required')
                setSaving(false)
                return
            }

            const postData = {
                title: formData.title.trim(),
                slug: formData.slug || '',
                content: formData.content.trim(),
                excerpt: formData.excerpt || '',
                category: formData.category || '',
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
                status: formData.status || 'draft',
                featuredImage: formData.featuredImage || '',
                seo: {
                    title: formData.seoTitle || '',
                    description: formData.seoDescription || '',
                    keywords: formData.seoKeywords ? formData.seoKeywords.split(',').map(k => k.trim()) : [],
                },
            }

            const token = getToken()
            let response

            if (editingPost) {
                response = await api.put(`/blog/${editingPost._id}`, postData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } else {
                response = await api.post('/blog', postData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }

            if (response.data.success) {
                toast.success(editingPost ? 'Post updated successfully!' : 'Post created successfully!')
                setShowModal(false)
                resetForm()
                fetchPosts()
            } else {
                toast.error(response.data.message || 'Failed to save post')
            }
        } catch (error) {
            console.error('❌ Error saving post:', error)
            const errorMessage = error.response?.data?.message || error.message || 'Failed to save post'
            toast.error(errorMessage)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return

        try {
            setDeleting(id)
            const token = getToken()
            const response = await api.delete(`/blog/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                toast.success('Post deleted successfully!')
                fetchPosts()
            }
        } catch (error) {
            console.error('Error deleting post:', error)
            toast.error('Failed to delete post')
        } finally {
            setDeleting(null)
        }
    }

    const handleEdit = (post) => {
        setEditingPost(post)
        setFormData({
            title: post.title || '',
            slug: post.slug || '',
            content: post.content || '',
            excerpt: post.excerpt || '',
            category: post.category || '',
            tags: post.tags ? post.tags.join(', ') : '',
            status: post.status || 'draft',
            featuredImage: post.featuredImage || '',
            seoTitle: post.seo?.title || '',
            seoDescription: post.seo?.description || '',
            seoKeywords: post.seo?.keywords ? post.seo.keywords.join(', ') : '',
        })
        setShowModal(true)
    }

    const handleCreate = () => {
        setEditingPost(null)
        resetForm()
        setShowModal(true)
    }

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            content: '',
            excerpt: '',
            category: '',
            tags: '',
            status: 'draft',
            featuredImage: '',
            seoTitle: '',
            seoDescription: '',
            seoKeywords: '',
        })
    }

    const generateSlug = () => {
        if (!formData.title) return
        const slug = formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        setFormData({ ...formData, slug })
    }

    const toggleStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'published' ? 'draft' : 
                             currentStatus === 'draft' ? 'published' : 'published'
            const token = getToken()
            const response = await api.patch(`/blog/${id}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (response.data.success) {
                toast.success(`Post ${newStatus === 'published' ? 'published' : 'unpublished'}`)
                fetchPosts()
            }
        } catch (error) {
            console.error('Error toggling status:', error)
            toast.error('Failed to update status')
        }
    }

    const getStatusBadge = (status) => {
        const badges = {
            published: 'bg-green-500/20 text-green-400',
            draft: 'bg-yellow-500/20 text-yellow-400',
            archived: 'bg-gray-500/20 text-gray-400',
        }
        return badges[status] || 'bg-gray-500/20 text-gray-400'
    }

    const getStatusIcon = (status) => {
        const icons = {
            published: <CheckCircle className="w-3 h-3" />,
            draft: <Clock className="w-3 h-3" />,
            archived: <XCircle className="w-3 h-3" />,
        }
        return icons[status] || null
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                <span className="ml-2 text-gray-400">Loading posts...</span>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title text-white">Blog</h1>
                    <p className="text-gray-400 text-sm">Manage your blog posts and content</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-xl text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-500/25"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-4 text-center">
                    <div className="text-title text-indigo-400">{stats.total}</div>
                    <div className="text-sm text-gray-400">Total Posts</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-green-400">{stats.published}</div>
                    <div className="text-sm text-gray-400">Published</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-yellow-400">{stats.draft}</div>
                    <div className="text-sm text-gray-400">Drafts</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-gray-400">{stats.archived}</div>
                    <div className="text-sm text-gray-400">Archived</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none w-40"
                >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 outline-none w-40"
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Posts Table */}
            <div className="card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-400 border-b border-border">
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Title</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Category</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Tags</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Status</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Date</th>
                                <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-gray-400">
                                        <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                        <p>No blog posts found</p>
                                        <button
                                            onClick={handleCreate}
                                            className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white text-sm transition-colors"
                                        >
                                            Create your first post
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post._id} className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200">
                                        <td className="py-3">
                                            <div className="font-medium text-white">{post.title}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                                                <User className="w-3 h-3" />
                                                {post.author?.ownerName || 'Unknown'}
                                                <span className="mx-1">•</span>
                                                <Eye className="w-3 h-3" />
                                                {post.views || 0} views
                                            </div>
                                        </td>
                                        <td>
                                            {post.category ? (
                                                <span className="px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs">
                                                    {post.category}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500 text-xs">-</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="flex flex-wrap gap-1">
                                                {post.tags?.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-full bg-[#1E293B] text-gray-400 text-xs">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {post.tags?.length > 2 && (
                                                    <span className="text-xs text-gray-500">+{post.tags.length - 2}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => toggleStatus(post._id, post.status)}
                                                className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors ${getStatusBadge(post.status)}`}
                                            >
                                                {getStatusIcon(post.status)}
                                                {post.status}
                                            </button>
                                        </td>
                                        <td className="text-sm text-gray-500">
                                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                                                    title="Edit post"
                                                >
                                                    <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post._id)}
                                                    disabled={deleting === post._id}
                                                    className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete post"
                                                >
                                                    {deleting === post._id ? (
                                                        <Loader2 className="w-4 h-4 text-red-400 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="glass rounded-3xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 glass border-b border-border z-10 p-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white">
                                    {editingPost ? 'Edit Post' : 'Create New Post'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowModal(false)
                                        resetForm()
                                    }}
                                    className="text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Post Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    onBlur={generateSlug}
                                    placeholder="Enter post title"
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    required
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">URL Slug</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">/</span>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            placeholder="your-post-slug"
                                            className="w-full pl-6 pr-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={generateSlug}
                                        type="button"
                                        className="px-4 py-2 bg-[#1E293B] hover:bg-[#2A3A4B] rounded-2xl text-gray-300 transition-colors text-sm"
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Content *</label>
                                <textarea
                                    rows="8"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Write your blog content here..."
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                />
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Excerpt (Short Description)</label>
                                <textarea
                                    rows="2"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief summary of the post..."
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                />
                            </div>

                            {/* Category & Tags */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1.5">Category</label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g., Technology, Business"
                                        className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1.5">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="e.g., SEO, Marketing, Tips"
                                        className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Featured Image URL</label>
                                <input
                                    type="text"
                                    value={formData.featuredImage}
                                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            {/* SEO Settings */}
                            <div className="pt-4 border-t border-border">
                                <h4 className="text-table-body font-semibold mb-3">SEO Settings</h4>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">SEO Title</label>
                                        <input
                                            type="text"
                                            value={formData.seoTitle}
                                            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                                            placeholder="SEO optimized title"
                                            className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">SEO Description</label>
                                        <textarea
                                            rows="2"
                                            value={formData.seoDescription}
                                            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                                            placeholder="SEO optimized description"
                                            className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">SEO Keywords</label>
                                        <input
                                            type="text"
                                            value={formData.seoKeywords}
                                            onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                                            placeholder="keyword1, keyword2, keyword3"
                                            className="w-full px-4 py-2.5 bg-card border border-border rounded-2xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-background border-t border-border p-6 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowModal(false)
                                    resetForm()
                                }}
                                className="px-6 py-2.5 bg-card border border-border hover:border-indigo-500/50 rounded-2xl text-white transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !formData.title || !formData.content}
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
                                    {editingPost ? 'Update Post' : 'Create Post'}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Blog