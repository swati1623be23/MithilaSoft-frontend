// // src/pages/dashboard/Media.jsx
// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Plus, Search, Folder, Image, Video, File, Trash2, Eye, Download, MoreVertical, Upload } from 'lucide-react'

// const Media = () => {
//     const [searchQuery, setSearchQuery] = useState('')
//     const [viewMode, setViewMode] = useState('grid')
//     const [selectedFolder, setSelectedFolder] = useState('All')

//     const mediaFiles = [
//         { id: 1, name: 'product-1.jpg', type: 'image', size: '2.4 MB', date: '2024-01-15', folder: 'Products' },
//         { id: 2, name: 'banner-hero.png', type: 'image', size: '1.8 MB', date: '2024-01-14', folder: 'Banners' },
//         { id: 3, name: 'video-promo.mp4', type: 'video', size: '45.2 MB', date: '2024-01-13', folder: 'Videos' },
//         { id: 4, name: 'logo-dark.svg', type: 'image', size: '0.5 MB', date: '2024-01-12', folder: 'Brand' },
//         { id: 5, name: 'product-2.jpg', type: 'image', size: '3.1 MB', date: '2024-01-11', folder: 'Products' },
//     ]

//     const folders = ['All', 'Products', 'Banners', 'Videos', 'Brand', 'Documents']

//     const getIcon = (type) => {
//         switch(type) {
//             case 'image': return <Image className="w-6 h-6 text-indigo-400" />
//             case 'video': return <Video className="w-6 h-6 text-cyan-400" />
//             default: return <File className="w-6 h-6 text-textSecondary" />
//         }
//     }

//     return (
//         <div className="space-y-6">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Media Library</h1>
//                     <p className="text-desc">Manage your images, videos and files</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <button className="btn-secondary">
//                         <Folder className="w-4 h-4" />
//                         New Folder
//                     </button>
//                     <button className="btn-primary">
//                         <Upload className="w-4 h-4" />
//                         Upload
//                     </button>
//                 </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1 relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
//                     <input
//                         type="text"
//                         placeholder="Search media..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full input-field pl-12"
//                     />
//                 </div>
//                 <select
//                     value={selectedFolder}
//                     onChange={(e) => setSelectedFolder(e.target.value)}
//                     className="input-field w-40"
//                 >
//                     {folders.map((folder) => (
//                         <option key={folder} value={folder}>{folder}</option>
//                     ))}
//                 </select>
//                 <div className="flex gap-2">
//                     <button
//                         onClick={() => setViewMode('grid')}
//                         className={`p-2 rounded-xl transition-colors duration-200 ${
//                             viewMode === 'grid' ? 'bg-indigo-500/20 text-indigo-400' : 'text-textSecondary hover:text-white'
//                         }`}
//                     >
//                         <Image className="w-5 h-5" />
//                     </button>
//                     <button
//                         onClick={() => setViewMode('list')}
//                         className={`p-2 rounded-xl transition-colors duration-200 ${
//                             viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-textSecondary hover:text-white'
//                         }`}
//                     >
//                         <File className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>

//             {/* Media Grid */}
//             {viewMode === 'grid' ? (
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {mediaFiles.map((file, index) => (
//                         <motion.div
//                             key={file.id}
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.3, delay: index * 0.05 }}
//                             className="card overflow-hidden group hover:border-indigo-500/50 transition-all duration-300"
//                         >
//                             <div className="aspect-square bg-background flex items-center justify-center relative">
//                                 {getIcon(file.type)}
//                                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
//                                     <button className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200">
//                                         <Eye className="w-5 h-5" />
//                                     </button>
//                                     <button className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200">
//                                         <Download className="w-5 h-5" />
//                                     </button>
//                                     <button className="p-2 rounded-xl bg-danger/20 backdrop-blur-sm hover:bg-danger/30 transition-colors duration-200">
//                                         <Trash2 className="w-5 h-5 text-danger" />
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="p-3">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <p className="font-medium text-sm truncate">{file.name}</p>
//                                         <p className="text-xs text-textSecondary">{file.size}</p>
//                                     </div>
//                                     <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                                         <MoreVertical className="w-4 h-4 text-textSecondary" />
//                                     </button>
//                                 </div>
//                                 <p className="text-xs text-textSecondary mt-1">{file.folder}</p>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="card p-6">
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="text-table-header border-b border-border">
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">File</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Type</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Size</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Folder</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Date</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {mediaFiles.map((file, index) => (
//                                     <motion.tr
//                                         key={file.id}
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ duration: 0.3, delay: index * 0.05 }}
//                                         className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200"
//                                     >
//                                         <td className="py-3">
//                                             <div className="flex items-center gap-3">
//                                                 {getIcon(file.type)}
//                                                 <span className="font-medium">{file.name}</span>
//                                             </div>
//                                         </td>
//                                         <td className="py-3 text-sm capitalize">{file.type}</td>
//                                         <td className="py-3 text-sm">{file.size}</td>
//                                         <td className="py-3 text-sm">{file.folder}</td>
//                                         <td className="py-3 text-sm text-textSecondary">{file.date}</td>
//                                         <td className="py-3 text-right">
//                                             <div className="flex items-center justify-end gap-2">
//                                                 <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200">
//                                                     <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
//                                                 </button>
//                                                 <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200">
//                                                     <Download className="w-4 h-4 text-textSecondary hover:text-white" />
//                                                 </button>
//                                                 <button className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200">
//                                                     <Trash2 className="w-4 h-4 text-danger" />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </motion.tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Media



// // src/pages/dashboard/Media.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     Image,
//     Video,
//     File,
//     Folder,
//     FolderOpen,
//     Plus,
//     Search,
//     Grid,
//     List,
//     Upload,
//     Download,
//     Trash2,
//     Edit,
//     Eye,
//     MoreVertical,
//     X,
//     Check,
//     ChevronDown,
//     ChevronRight,
//     Clock,
//     FileImage,
//     FileVideo,
//     FileText,
//     Archive,
//     Music,
//     Film,
//     FileCode,
//     FileJson,
//     FileSpreadsheet,
//     FilePdf,
//     FileArchive,
//     FileAudio,
//     FileScan,
//     FileSignature,
//     FileCheck,
//     FileX,
//     FolderPlus,
//     Copy,
//     Move,
//     Share2,
//     Link,
//     Calendar,
//     User,
//     Tag,
//     Filter,
//     RefreshCw,
//     Save,
//     AlertCircle,
//     CheckCircle,
//     XCircle,
//     Loader,
//     CloudUpload,
//     FolderTree,
//     LayoutGrid,
//     LayoutList,
//     ZoomIn,
//     ZoomOut,
//     RotateCw,
//     Crop,
//     ImagePlus,
//     VideoPlus,
//     FilePlus,
// } from 'lucide-react'
// import toast from 'react-hot-toast'
// import api from '../../services/api'

// const Media = () => {
//     const [viewMode, setViewMode] = useState('grid')
//     const [searchQuery, setSearchQuery] = useState('')
//     const [selectedFolder, setSelectedFolder] = useState('all')
//     const [mediaItems, setMediaItems] = useState([])
//     const [folders, setFolders] = useState(['All'])
//     const [loading, setLoading] = useState(true)
//     const [selectedItems, setSelectedItems] = useState([])
//     const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
//     const [showUploadModal, setShowUploadModal] = useState(false)
//     const [folderName, setFolderName] = useState('')
//     const [uploadFiles, setUploadFiles] = useState([])
//     const [uploadProgress, setUploadProgress] = useState(0)
//     const [isUploading, setIsUploading] = useState(false)
//     const [selectedItem, setSelectedItem] = useState(null)
//     const [showPreviewModal, setShowPreviewModal] = useState(false)
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//     const [showRenameModal, setShowRenameModal] = useState(false)
//     const [renameValue, setRenameValue] = useState('')
//     const [isLoading, setIsLoading] = useState(false)
//     const fileInputRef = useRef(null)

//     // Stats
//     const [stats, setStats] = useState({
//         total: 0,
//         images: 0,
//         videos: 0,
//         documents: 0,
//         totalSize: 0,
//         folders: 0,
//     })

//     // Get token
//     const getToken = () => localStorage.getItem('token')

//     // Fetch media items
//     const fetchMedia = async () => {
//         try {
//             setLoading(true)
//             const token = getToken()
            
//             const response = await api.get('/gallery', {
//                 params: {
//                     folder: selectedFolder !== 'all' ? selectedFolder : undefined,
//                     search: searchQuery || undefined,
//                 },
//                 headers: { Authorization: `Bearer ${token}` }
//             })

//             if (response.data.success) {
//                 setMediaItems(response.data.data || [])
//                 calculateStats(response.data.data || [])
//             }
//         } catch (error) {
//             console.error('❌ Fetch media error:', error)
//             toast.error('Failed to load media')
//             // Demo data - remove this when backend is ready
//             setMediaItems(generateDemoData())
//             calculateStats(generateDemoData())
//         } finally {
//             setLoading(false)
//         }
//     }

//     // Generate demo data (remove when backend is ready)
//     const generateDemoData = () => {
//         const items = []
//         const types = ['image', 'image', 'image', 'video', 'document']
//         const names = ['product-banner.jpg', 'logo.png', 'hero-image.jpg', 'promo-video.mp4', 'catalog.pdf']
//         const sizes = ['2.4 MB', '1.8 MB', '3.2 MB', '45.6 MB', '5.2 MB']
//         const folders = ['Products', 'Banners', 'Brand']
        
//         for (let i = 0; i < 12; i++) {
//             items.push({
//                 id: i + 1,
//                 name: `file-${i + 1}.${types[i % types.length] === 'image' ? 'jpg' : types[i % types.length] === 'video' ? 'mp4' : 'pdf'}`,
//                 type: types[i % types.length],
//                 size: sizes[i % sizes.length],
//                 folder: folders[i % folders.length],
//                 url: `https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=${i + 1}`,
//                 createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
//                 updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
//             })
//         }
//         return items
//     }

//     // Calculate stats
//     const calculateStats = (items) => {
//         const total = items.length
//         const images = items.filter(i => i.type === 'image').length
//         const videos = items.filter(i => i.type === 'video').length
//         const documents = items.filter(i => i.type === 'document' || i.type === 'file').length
//         const totalSize = items.reduce((sum, i) => {
//             const size = parseFloat(i.size)
//             return sum + (isNaN(size) ? 0 : size)
//         }, 0)

//         setStats({
//             total,
//             images,
//             videos,
//             documents,
//             totalSize,
//             folders: folders.length - 1,
//         })
//     }

//     // Fetch folders
//     const fetchFolders = async () => {
//         try {
//             const token = getToken()
//             const response = await api.get('/gallery/folders', {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             if (response.data.success) {
//                 const folderList = ['All', ...response.data.data]
//                 setFolders(folderList)
//             }
//         } catch (error) {
//             console.error('❌ Fetch folders error:', error)
//         }
//     }

//     useEffect(() => {
//         fetchMedia()
//         fetchFolders()
//     }, [])

//     // Handle search with debounce
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             fetchMedia()
//         }, 500)
//         return () => clearTimeout(timer)
//     }, [searchQuery, selectedFolder])

//     // Create folder
//     const handleCreateFolder = async () => {
//         if (!folderName.trim()) {
//             toast.error('Please enter a folder name')
//             return
//         }

//         try {
//             setIsLoading(true)
//             const token = getToken()
//             const response = await api.post('/gallery/folders', 
//                 { name: folderName.trim() },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             )

//             if (response.data.success) {
//                 setFolders([...folders, folderName.trim()])
//                 toast.success('Folder created successfully')
//                 setShowCreateFolderModal(false)
//                 setFolderName('')
//             }
//         } catch (error) {
//             console.error('❌ Create folder error:', error)
//             toast.error('Failed to create folder')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Upload files
//     const handleFileUpload = async (e) => {
//         const files = Array.from(e.target.files)
//         if (files.length === 0) return

//         setIsUploading(true)
//         setUploadProgress(0)

//         const formData = new FormData()
//         files.forEach(file => {
//             formData.append('files', file)
//         })
//         formData.append('folder', selectedFolder !== 'all' ? selectedFolder : 'general')

//         try {
//             const token = getToken()
//             const response = await api.post('/gallery/upload', formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//                     setUploadProgress(progress)
//                 },
//             })

//             if (response.data.success) {
//                 setMediaItems([...response.data.files, ...mediaItems])
//                 calculateStats([...response.data.files, ...mediaItems])
//                 toast.success(`${response.data.files.length} files uploaded successfully`)
//                 setUploadFiles([])
//                 setShowUploadModal(false)
//             }
//         } catch (error) {
//             console.error('❌ Upload error:', error)
//             toast.error('Failed to upload files')
//         } finally {
//             setIsUploading(false)
//             setUploadProgress(0)
//         }
//     }

//     // Delete item
//     const handleDeleteItem = async () => {
//         if (!selectedItem) return

//         try {
//             setIsLoading(true)
//             const token = getToken()
//             await api.delete(`/gallery/${selectedItem.id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })

//             setMediaItems(mediaItems.filter(item => item.id !== selectedItem.id))
//             calculateStats(mediaItems.filter(item => item.id !== selectedItem.id))
//             toast.success('File deleted successfully')
//             setShowDeleteConfirm(false)
//             setSelectedItem(null)
//         } catch (error) {
//             console.error('❌ Delete error:', error)
//             toast.error('Failed to delete file')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Rename item
//     const handleRenameItem = async () => {
//         if (!renameValue.trim() || !selectedItem) return

//         try {
//             setIsLoading(true)
//             const token = getToken()
//             const response = await api.put(`/gallery/${selectedItem.id}`,
//                 { name: renameValue.trim() },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             )

//             if (response.data.success) {
//                 setMediaItems(mediaItems.map(item =>
//                     item.id === selectedItem.id ? { ...item, name: renameValue.trim() } : item
//                 ))
//                 toast.success('File renamed successfully')
//                 setShowRenameModal(false)
//                 setSelectedItem(null)
//             }
//         } catch (error) {
//             console.error('❌ Rename error:', error)
//             toast.error('Failed to rename file')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Get file icon
//     const getFileIcon = (type, name) => {
//         if (type === 'image') return <Image className="w-8 h-8 text-indigo-400" />
//         if (type === 'video') return <Video className="w-8 h-8 text-cyan-400" />
//         if (type === 'document') return <FileText className="w-8 h-8 text-amber-400" />
        
//         const ext = name?.split('.').pop()?.toLowerCase()
//         if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
//             return <Image className="w-8 h-8 text-indigo-400" />
//         }
//         if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) {
//             return <Video className="w-8 h-8 text-cyan-400" />
//         }
//         if (['pdf'].includes(ext)) {
//             return <FilePdf className="w-8 h-8 text-danger" />
//         }
//         if (['doc', 'docx'].includes(ext)) {
//             return <FileText className="w-8 h-8 text-blue-400" />
//         }
//         if (['xls', 'xlsx', 'csv'].includes(ext)) {
//             return <FileSpreadsheet className="w-8 h-8 text-success" />
//         }
//         if (['zip', 'rar', '7z'].includes(ext)) {
//             return <FileArchive className="w-8 h-8 text-amber-400" />
//         }
//         if (['mp3', 'wav', 'aac'].includes(ext)) {
//             return <FileAudio className="w-8 h-8 text-pink-400" />
//         }
//         return <File className="w-8 h-8 text-textSecondary" />
//     }

//     // Format file size
//     const formatSize = (size) => {
//         if (!size) return '0 B'
//         const units = ['B', 'KB', 'MB', 'GB']
//         let value = parseFloat(size)
//         let unitIndex = 0
//         while (value >= 1024 && unitIndex < units.length - 1) {
//             value /= 1024
//             unitIndex++
//         }
//         return `${value.toFixed(1)} ${units[unitIndex]}`
//     }

//     // Format date
//     const formatDate = (date) => {
//         if (!date) return '-'
//         return new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//         })
//     }

//     // Get file extension
//     const getFileExtension = (name) => {
//         return name?.split('.').pop()?.toUpperCase() || ''
//     }

//     // Toggle item selection
//     const toggleSelect = (itemId) => {
//         setSelectedItems(prev =>
//             prev.includes(itemId)
//                 ? prev.filter(id => id !== itemId)
//                 : [...prev, itemId]
//         )
//     }

//     // Select all
//     const selectAll = () => {
//         if (selectedItems.length === filteredItems.length) {
//             setSelectedItems([])
//         } else {
//             setSelectedItems(filteredItems.map(item => item.id))
//         }
//     }

//     const filteredItems = mediaItems.filter(item => {
//         if (selectedFolder !== 'all' && item.folder !== selectedFolder) return false
//         if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
//         return true
//     })

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-textSecondary">Loading media...</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Media Library</h1>
//                     <p className="text-desc">
//                         Manage images, videos, and documents for your store
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card border border-border">
//                         <FolderOpen className="w-4 h-4 text-indigo-400" />
//                         <span className="text-table-body font-semibold">{folders.length - 1}</span>
//                         <span className="text-xs text-textSecondary">Folders</span>
//                     </div>
//                     <button
//                         onClick={() => setShowCreateFolderModal(true)}
//                         className="btn-secondary"
//                     >
//                         <FolderPlus className="w-4 h-4" />
//                         Folder
//                     </button>
//                     <button
//                         onClick={() => setShowUploadModal(true)}
//                         className="btn-primary shadow-lg shadow-indigo-500/25"
//                     >
//                         <Upload className="w-4 h-4" />
//                         Upload
//                     </button>
//                 </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-indigo-400">{stats.total}</div>
//                     <div className="text-sm text-textSecondary">Total Files</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-cyan-400">{stats.images}</div>
//                     <div className="text-sm text-textSecondary">Images</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-amber-400">{stats.videos}</div>
//                     <div className="text-sm text-textSecondary">Videos</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-success">{stats.documents}</div>
//                     <div className="text-sm text-textSecondary">Documents</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-rose-400">{formatSize(stats.totalSize)}</div>
//                     <div className="text-sm text-textSecondary">Total Size</div>
//                 </div>
//             </div>

//             {/* Search and Filters */}
//             <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1 relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
//                     <input
//                         type="text"
//                         placeholder="Search files..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full input-field pl-12"
//                     />
//                 </div>
//                 <select
//                     value={selectedFolder}
//                     onChange={(e) => setSelectedFolder(e.target.value)}
//                     className="input-field w-48"
//                 >
//                     {folders.map((folder) => (
//                         <option key={folder} value={folder}>{folder}</option>
//                     ))}
//                 </select>
//                 <div className="flex gap-2">
//                     <button
//                         onClick={() => setViewMode('grid')}
//                         className={`p-2 rounded-xl transition-colors duration-200 ${
//                             viewMode === 'grid' ? 'bg-indigo-500/20 text-indigo-400' : 'text-textSecondary hover:text-white'
//                         }`}
//                     >
//                         <LayoutGrid className="w-5 h-5" />
//                     </button>
//                     <button
//                         onClick={() => setViewMode('list')}
//                         className={`p-2 rounded-xl transition-colors duration-200 ${
//                             viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-textSecondary hover:text-white'
//                         }`}
//                     >
//                         <LayoutList className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>

//             {/* Media Grid/List */}
//             {filteredItems.length === 0 ? (
//                 <div className="card p-12 text-center">
//                     <FolderOpen className="w-16 h-16 text-textSecondary/30 mx-auto mb-4" />
//                     <h3 className="text-lg font-semibold mb-2">No Records</h3>
//                     <p className="text-desc">
//                         {searchQuery || selectedFolder !== 'all'
//                             ? 'No files match your search criteria'
//                             : 'Upload your first file to get started'}
//                     </p>
//                     <button
//                         onClick={() => setShowUploadModal(true)}
//                         className="mt-4 btn-primary mx-auto"
//                     >
//                         <Upload className="w-4 h-4" />
//                         Upload Files
//                     </button>
//                 </div>
//             ) : viewMode === 'grid' ? (
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                     {filteredItems.map((item) => (
//                         <motion.div
//                             key={item.id}
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.3 }}
//                             className={`card p-3 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer ${
//                                 selectedItems.includes(item.id) ? 'border-indigo-500' : ''
//                             }`}
//                             onClick={() => toggleSelect(item.id)}
//                         >
//                             <div className="relative aspect-square rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden">
//                                 {item.type === 'image' ? (
//                                     <img 
//                                         src={item.url || 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Image'}
//                                         alt={item.name}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 ) : (
//                                     <div className="flex flex-col items-center">
//                                         {getFileIcon(item.type, item.name)}
//                                         <span className="text-xs text-textSecondary mt-1">{getFileExtension(item.name)}</span>
//                                     </div>
//                                 )}
//                                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             setSelectedItem(item)
//                                             setShowPreviewModal(true)
//                                         }}
//                                         className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
//                                     >
//                                         <Eye className="w-4 h-4 text-white" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             setSelectedItem(item)
//                                             setRenameValue(item.name)
//                                             setShowRenameModal(true)
//                                         }}
//                                         className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
//                                     >
//                                         <Edit className="w-4 h-4 text-white" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             setSelectedItem(item)
//                                             setShowDeleteConfirm(true)
//                                         }}
//                                         className="p-2 rounded-xl bg-danger/20 backdrop-blur-sm hover:bg-danger/30 transition-colors duration-200"
//                                     >
//                                         <Trash2 className="w-4 h-4 text-white" />
//                                     </button>
//                                 </div>
//                                 {selectedItems.includes(item.id) && (
//                                     <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
//                                         <Check className="w-3 h-3 text-white" />
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="mt-2">
//                                 <p className="text-sm font-medium truncate">{item.name}</p>
//                                 <div className="flex items-center justify-between text-xs text-textSecondary">
//                                     <span>{formatSize(item.size)}</span>
//                                     <span>{item.folder || 'General'}</span>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="card p-6">
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="text-table-header border-b border-border">
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider w-8">
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
//                                             onChange={selectAll}
//                                             className="w-4 h-4 rounded border-border bg-background text-indigo-500"
//                                         />
//                                     </th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">File Name</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Type</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Size</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Folder</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Modified</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredItems.map((item) => (
//                                     <motion.tr
//                                         key={item.id}
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ duration: 0.3 }}
//                                         className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200"
//                                     >
//                                         <td className="py-3">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={selectedItems.includes(item.id)}
//                                                 onChange={() => toggleSelect(item.id)}
//                                                 className="w-4 h-4 rounded border-border bg-background text-indigo-500"
//                                             />
//                                         </td>
//                                         <td className="py-3">
//                                             <div className="flex items-center gap-3">
//                                                 {getFileIcon(item.type, item.name)}
//                                                 <span className="font-medium">{item.name}</span>
//                                             </div>
//                                         </td>
//                                         <td className="py-3 text-sm capitalize">{item.type}</td>
//                                         <td className="py-3 text-sm text-textSecondary">{formatSize(item.size)}</td>
//                                         <td className="py-3 text-sm text-textSecondary">{item.folder || 'General'}</td>
//                                         <td className="py-3 text-sm text-textSecondary">{formatDate(item.updatedAt || item.createdAt)}</td>
//                                         <td className="py-3 text-right">
//                                             <div className="flex items-center justify-end gap-2">
//                                                 <button
//                                                     onClick={() => {
//                                                         setSelectedItem(item)
//                                                         setShowPreviewModal(true)
//                                                     }}
//                                                     className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                                     title="Preview"
//                                                 >
//                                                     <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         setSelectedItem(item)
//                                                         setRenameValue(item.name)
//                                                         setShowRenameModal(true)
//                                                     }}
//                                                     className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                                     title="Rename"
//                                                 >
//                                                     <Edit className="w-4 h-4 text-textSecondary hover:text-white" />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         setSelectedItem(item)
//                                                         setShowDeleteConfirm(true)
//                                                     }}
//                                                     className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200"
//                                                     title="Delete"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 text-danger" />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </motion.tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {/* Pagination */}
//             {filteredItems.length > 0 && (
//                 <div className="flex items-center justify-between pt-4 border-t border-border">
//                     <p className="text-sm text-textSecondary">
//                         Showing {filteredItems.length} of {mediaItems.length} files
//                     </p>
//                     <div className="flex gap-2">
//                         <button className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200">
//                             Previous
//                         </button>
//                         <button className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm">
//                             1
//                         </button>
//                         <button className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200">
//                             2
//                         </button>
//                         <button className="px-3 py-1.5 rounded-xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200">
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Create Folder Modal */}
//             <AnimatePresence>
//                 {showCreateFolderModal && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={() => setShowCreateFolderModal(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-title">Create Folder</h2>
//                                     <p className="text-sm text-textSecondary">Organize your files into folders</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowCreateFolderModal(false)}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <X className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Folder Name</label>
//                                     <input
//                                         type="text"
//                                         value={folderName}
//                                         onChange={(e) => setFolderName(e.target.value)}
//                                         placeholder="e.g., Product Images"
//                                         className="input-field"
//                                         onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
//                                     />
//                                 </div>

//                                 <div className="flex gap-3 pt-4">
//                                     <button
//                                         onClick={() => setShowCreateFolderModal(false)}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleCreateFolder}
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                                 Creating...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <FolderPlus className="w-4 h-4" />
//                                                 Create
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Upload Modal */}
//             <AnimatePresence>
//                 {showUploadModal && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={() => setShowUploadModal(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-title">Upload Files</h2>
//                                     <p className="text-sm text-textSecondary">Select files to upload</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowUploadModal(false)}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <X className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 <div 
//                                     className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-500/50 transition-all duration-200"
//                                     onClick={() => fileInputRef.current?.click()}
//                                 >
//                                     <CloudUpload className="w-12 h-12 text-textSecondary/50 mx-auto mb-4" />
//                                     <p className="text-sm text-textSecondary">Click or drag files to upload</p>
//                                     <p className="text-xs text-textSecondary mt-1">Images, videos, and documents supported</p>
//                                     <input
//                                         ref={fileInputRef}
//                                         type="file"
//                                         multiple
//                                         className="hidden"
//                                         onChange={handleFileUpload}
//                                         accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.csv"
//                                     />
//                                 </div>

//                                 {isUploading && (
//                                     <div className="space-y-2">
//                                         <div className="flex items-center justify-between text-sm">
//                                             <span className="text-textSecondary">Uploading...</span>
//                                             <span className="text-indigo-400">{uploadProgress}%</span>
//                                         </div>
//                                         <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
//                                             <div 
//                                                 className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-300"
//                                                 style={{ width: `${uploadProgress}%` }}
//                                             />
//                                         </div>
//                                     </div>
//                                 )}

//                                 <div className="flex gap-3 pt-4">
//                                     <button
//                                         onClick={() => setShowUploadModal(false)}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={() => fileInputRef.current?.click()}
//                                         disabled={isUploading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         <Upload className="w-4 h-4" />
//                                         Select Files
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Preview Modal */}
//             <AnimatePresence>
//                 {showPreviewModal && selectedItem && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
//                         onClick={() => setShowPreviewModal(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="max-w-4xl w-full max-h-[90vh] overflow-auto"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="glass rounded-3xl border border-border p-6">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <div>
//                                         <h3 className="font-semibold">{selectedItem.name}</h3>
//                                         <p className="text-sm text-textSecondary">
//                                             {formatSize(selectedItem.size)} • {selectedItem.folder || 'General'}
//                                         </p>
//                                     </div>
//                                     <button
//                                         onClick={() => setShowPreviewModal(false)}
//                                         className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                     >
//                                         <X className="w-5 h-5 text-textSecondary hover:text-white" />
//                                     </button>
//                                 </div>
//                                 <div className="flex items-center justify-center min-h-[300px] bg-background rounded-2xl border border-border p-4">
//                                     {selectedItem.type === 'image' ? (
//                                         <img 
//                                             src={selectedItem.url || 'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Image'}
//                                             alt={selectedItem.name}
//                                             className="max-w-full max-h-[60vh] object-contain"
//                                         />
//                                     ) : selectedItem.type === 'video' ? (
//                                         <video controls className="max-w-full max-h-[60vh]">
//                                             <source src={selectedItem.url} />
//                                             Your browser does not support the video tag.
//                                         </video>
//                                     ) : (
//                                         <div className="text-center">
//                                             {getFileIcon(selectedItem.type, selectedItem.name)}
//                                             <p className="text-textSecondary mt-2">{selectedItem.name}</p>
//                                             <a 
//                                                 href={selectedItem.url} 
//                                                 download 
//                                                 className="mt-4 inline-block px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
//                                             >
//                                                 <Download className="w-4 h-4 inline mr-2" />
//                                                 Download
//                                             </a>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="flex gap-2 mt-4 justify-center">
//                                     <button
//                                         onClick={() => {
//                                             setSelectedItem(selectedItem)
//                                             setRenameValue(selectedItem.name)
//                                             setShowRenameModal(true)
//                                             setShowPreviewModal(false)
//                                         }}
//                                         className="btn-secondary"
//                                     >
//                                         <Edit className="w-4 h-4" />
//                                         Rename
//                                     </button>
//                                     <button
//                                         onClick={() => {
//                                             setSelectedItem(selectedItem)
//                                             setShowDeleteConfirm(true)
//                                             setShowPreviewModal(false)
//                                         }}
//                                         className="px-4 py-2 rounded-2xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-all duration-200 flex items-center gap-2"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                         Delete
//                                     </button>
//                                     <a 
//                                         href={selectedItem.url} 
//                                         download 
//                                         className="btn-primary"
//                                     >
//                                         <Download className="w-4 h-4" />
//                                         Download
//                                     </a>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Delete Confirmation Modal */}
//             <AnimatePresence>
//                 {showDeleteConfirm && selectedItem && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={() => setShowDeleteConfirm(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="text-center">
//                                 <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
//                                     <Trash2 className="w-8 h-8 text-danger" />
//                                 </div>
//                                 <h2 className="text-title mb-2">Delete File</h2>
//                                 <p className="text-desc mb-4">
//                                     Are you sure you want to delete <strong>{selectedItem.name}</strong>? This action cannot be undone.
//                                 </p>
//                                 <div className="flex gap-3">
//                                     <button
//                                         onClick={() => setShowDeleteConfirm(false)}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleDeleteItem}
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-danger text-white text-sm hover:bg-danger/80 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                                 Deleting...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Trash2 className="w-4 h-4" />
//                                                 Delete
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Rename Modal */}
//             <AnimatePresence>
//                 {showRenameModal && selectedItem && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={() => setShowRenameModal(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-title">Rename File</h2>
//                                     <p className="text-sm text-textSecondary">Enter a new name for this file</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowRenameModal(false)}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <X className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">File Name</label>
//                                     <input
//                                         type="text"
//                                         value={renameValue}
//                                         onChange={(e) => setRenameValue(e.target.value)}
//                                         className="input-field"
//                                         onKeyPress={(e) => e.key === 'Enter' && handleRenameItem()}
//                                     />
//                                 </div>

//                                 <div className="flex gap-3 pt-4">
//                                     <button
//                                         onClick={() => setShowRenameModal(false)}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleRenameItem}
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                                 Saving...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Save className="w-4 h-4" />
//                                                 Save
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     )
// }

// export default Media




// src/pages/dashboard/Media.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     Image,
//     Video,
//     File,
//     Folder,
//     FolderOpen,
//     Plus,
//     Search,
//     Grid,
//     List,
//     Upload,
//     Download,
//     Trash2,
//     Edit,
//     Eye,
//     X,
//     Check,
//     CloudUpload,
//     FolderPlus,
//     Save,
//     LayoutGrid,
//     LayoutList,
//     FileImage,
//     FileVideo,
//     FileText,
//     FilePdf,
//     FileSpreadsheet,
//     FileArchive,
//     FileAudio,
// } from 'lucide-react'
// import toast from 'react-hot-toast'
// import api from '../../services/api'

// const Media = () => {
//     const [viewMode, setViewMode] = useState('grid')
//     const [searchQuery, setSearchQuery] = useState('')
//     const [selectedFolder, setSelectedFolder] = useState('All')
//     const [mediaItems, setMediaItems] = useState([])
//     const [folders, setFolders] = useState(['All'])
//     const [loading, setLoading] = useState(true)
//     const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
//     const [showUploadModal, setShowUploadModal] = useState(false)
//     const [folderName, setFolderName] = useState('')
//     const [uploadProgress, setUploadProgress] = useState(0)
//     const [isUploading, setIsUploading] = useState(false)
//     const [selectedItem, setSelectedItem] = useState(null)
//     const [showPreviewModal, setShowPreviewModal] = useState(false)
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//     const [showRenameModal, setShowRenameModal] = useState(false)
//     const [renameValue, setRenameValue] = useState('')
//     const [isLoading, setIsLoading] = useState(false)
//     const fileInputRef = useRef(null)

//     // Stats
//     const [stats, setStats] = useState({
//         total: 0,
//         images: 0,
//         videos: 0,
//         documents: 0,
//         totalSize: 0,
//         folders: 0,
//     })

//     // Get token
//     const getToken = () => localStorage.getItem('token')

//     // Fetch media items
//     const fetchMedia = async () => {
//         try {
//             setLoading(true)
//             const token = getToken()
            
//             const params = {}
//             if (selectedFolder !== 'All') {
//                 params.folder = selectedFolder
//             }
//             if (searchQuery) {
//                 params.search = searchQuery
//             }

//             const response = await api.get('/gallery', {
//                 params,
//                 headers: { Authorization: `Bearer ${token}` }
//             })

//             if (response.data.success) {
//                 setMediaItems(response.data.data || [])
//                 if (response.data.folders) {
//                     setFolders(['All', ...response.data.folders])
//                 }
//                 calculateStats(response.data.data || [])
//             }
//         } catch (error) {
//             console.error('❌ Fetch media error:', error)
//             setMediaItems([])
//             calculateStats([])
//             toast.error('Failed to load media')
//         } finally {
//             setLoading(false)
//         }
//     }

//     // Calculate stats
//     const calculateStats = (items) => {
//         const total = items.length
//         const images = items.filter(i => i.type === 'image').length
//         const videos = items.filter(i => i.type === 'video').length
//         const documents = items.filter(i => i.type === 'document' || i.type === 'file').length
//         const totalSize = items.reduce((sum, i) => sum + (i.sizeInBytes || 0), 0)

//         setStats({
//             total,
//             images,
//             videos,
//             documents,
//             totalSize: totalSize,
//             folders: folders.length - 1,
//         })
//     }

//     // Fetch folders
//     const fetchFolders = async () => {
//         try {
//             const token = getToken()
//             const response = await api.get('/gallery/folders', {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             if (response.data.success) {
//                 const folderList = ['All', ...response.data.data]
//                 setFolders(folderList)
//             }
//         } catch (error) {
//             console.error('❌ Fetch folders error:', error)
//             setFolders(['All'])
//         }
//     }

//     useEffect(() => {
//         fetchFolders()
//     }, [])

//     useEffect(() => {
//         fetchMedia()
//     }, [selectedFolder, searchQuery])

//     // Create folder
//     const handleCreateFolder = async () => {
//         if (!folderName.trim()) {
//             toast.error('Please enter a folder name')
//             return
//         }

//         try {
//             setIsLoading(true)
//             const token = getToken()
//             const response = await api.post('/gallery/folders', 
//                 { name: folderName.trim() },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             )

//             if (response.data.success) {
//                 setFolders([...folders, folderName.trim()])
//                 setSelectedFolder(folderName.trim())
//                 toast.success('Folder created successfully')
//                 setShowCreateFolderModal(false)
//                 setFolderName('')
//                 fetchMedia()
//             }
//         } catch (error) {
//             console.error('❌ Create folder error:', error)
//             toast.error('Failed to create folder')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Upload files
//     const handleFileUpload = async (e) => {
//         const files = Array.from(e.target.files)
//         if (files.length === 0) return

//         setIsUploading(true)
//         setUploadProgress(0)

//         const formData = new FormData()
//         files.forEach(file => {
//             formData.append('files', file)
//         })
//         formData.append('folder', selectedFolder !== 'All' ? selectedFolder : 'general')

//         try {
//             const token = getToken()
//             const response = await api.post('/gallery/upload', formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 onUploadProgress: (progressEvent) => {
//                     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//                     setUploadProgress(progress)
//                 },
//             })

//             if (response.data.success) {
//                 toast.success('Files uploaded successfully')
//                 setShowUploadModal(false)
//                 fetchMedia()
//             }
//         } catch (error) {
//             console.error('❌ Upload error:', error)
//             toast.error('Failed to upload files')
//         } finally {
//             setIsUploading(false)
//             setUploadProgress(0)
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = ''
//             }
//         }
//     }

//     // Delete item
//     const handleDeleteItem = async () => {
//         if (!selectedItem) return

//         try {
//             setIsLoading(true)
//             const token = getToken()
//             await api.delete(`/gallery/${selectedItem.id}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             })

//             toast.success('File deleted successfully')
//             setShowDeleteConfirm(false)
//             setSelectedItem(null)
//             fetchMedia()
//         } catch (error) {
//             console.error('❌ Delete error:', error)
//             toast.error('Failed to delete file')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Rename item
//     const handleRenameItem = async () => {
//         if (!renameValue.trim() || !selectedItem) return

//         try {
//             setIsLoading(true)
//             const token = getToken()
//             const response = await api.put(`/gallery/${selectedItem.id}`,
//                 { name: renameValue.trim() },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             )

//             if (response.data.success) {
//                 toast.success('File renamed successfully')
//                 setShowRenameModal(false)
//                 setSelectedItem(null)
//                 fetchMedia()
//             }
//         } catch (error) {
//             console.error('❌ Rename error:', error)
//             toast.error('Failed to rename file')
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     // Get file icon
//     const getFileIcon = (type, name) => {
//         if (type === 'image') return <Image className="w-8 h-8 text-indigo-400" />
//         if (type === 'video') return <Video className="w-8 h-8 text-cyan-400" />
//         if (type === 'document') return <FileText className="w-8 h-8 text-amber-400" />
        
//         const ext = name?.split('.').pop()?.toLowerCase()
//         if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
//             return <Image className="w-8 h-8 text-indigo-400" />
//         }
//         if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) {
//             return <Video className="w-8 h-8 text-cyan-400" />
//         }
//         if (['pdf'].includes(ext)) {
//             return <FilePdf className="w-8 h-8 text-danger" />
//         }
//         if (['doc', 'docx'].includes(ext)) {
//             return <FileText className="w-8 h-8 text-blue-400" />
//         }
//         if (['xls', 'xlsx', 'csv'].includes(ext)) {
//             return <FileSpreadsheet className="w-8 h-8 text-success" />
//         }
//         if (['zip', 'rar', '7z'].includes(ext)) {
//             return <FileArchive className="w-8 h-8 text-amber-400" />
//         }
//         if (['mp3', 'wav', 'aac'].includes(ext)) {
//             return <FileAudio className="w-8 h-8 text-pink-400" />
//         }
//         return <File className="w-8 h-8 text-textSecondary" />
//     }

//     // Format file size
//     const formatSize = (bytes) => {
//         if (!bytes) return '0 B'
//         const units = ['B', 'KB', 'MB', 'GB']
//         let value = bytes
//         let unitIndex = 0
//         while (value >= 1024 && unitIndex < units.length - 1) {
//             value /= 1024
//             unitIndex++
//         }
//         return `${value.toFixed(1)} ${units[unitIndex]}`
//     }

//     // Format date
//     const formatDate = (date) => {
//         if (!date) return '-'
//         return new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric',
//         })
//     }

//     // Get file extension
//     const getFileExtension = (name) => {
//         return name?.split('.').pop()?.toUpperCase() || ''
//     }

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <div className="text-center">
//                     <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//                     <p className="text-textSecondary">Loading media...</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                     <h1 className="text-title">Media Library</h1>
//                     <p className="text-desc">Manage your images, videos and files</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                     <button
//                         onClick={() => setShowCreateFolderModal(true)}
//                         className="btn-secondary"
//                     >
//                         <FolderPlus className="w-4 h-4" />
//                         New Folder
//                     </button>
//                     <button
//                         onClick={() => setShowUploadModal(true)}
//                         className="btn-primary shadow-lg shadow-indigo-500/25"
//                     >
//                         <Upload className="w-4 h-4" />
//                         Upload
//                     </button>
//                 </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-indigo-400">{stats.total}</div>
//                     <div className="text-sm text-textSecondary">Total Files</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-cyan-400">{stats.images}</div>
//                     <div className="text-sm text-textSecondary">Images</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-amber-400">{stats.videos}</div>
//                     <div className="text-sm text-textSecondary">Videos</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-success">{stats.documents}</div>
//                     <div className="text-sm text-textSecondary">Documents</div>
//                 </div>
//                 <div className="card p-4 text-center">
//                     <div className="text-title text-rose-400">{formatSize(stats.totalSize)}</div>
//                     <div className="text-sm text-textSecondary">Total Size</div>
//                 </div>
//             </div>

//             {/* Folder Navigation */}
//             {folders.length > 0 && (
//                 <div className="flex flex-wrap gap-2 pb-2 border-b border-border">
//                     {folders.map((folder) => (
//                         <button
//                             key={folder}
//                             onClick={() => setSelectedFolder(folder)}
//                             className={`px-4 py-2 rounded-2xl text-sm transition-all duration-200 ${
//                                 selectedFolder === folder
//                                     ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
//                                     : 'text-textSecondary hover:text-white hover:bg-white/5'
//                             }`}
//                         >
//                             {folder}
//                         </button>
//                     ))}
//                 </div>
//             )}

//             {/* Search and View Controls */}
//             <div className="flex flex-col md:flex-row gap-4">
//                 <div className="flex-1 relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
//                     <input
//                         type="text"
//                         placeholder="Search media..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full input-field pl-12"
//                     />
//                 </div>
//                 <div className="flex gap-2">
//                     <button
//                         onClick={() => setViewMode('grid')}
//                         className={`p-2 rounded-xl transition-colors duration-200 ${
//                             viewMode === 'grid' ? 'bg-indigo-500/20 text-indigo-400' : 'text-textSecondary hover:text-white'
//                         }`}
//                     >
//                         <LayoutGrid className="w-5 h-5" />
//                     </button>
//                     <button
//                         onClick={() => setViewMode('list')}
//                         className={`p-2 rounded-xl transition-colors duration-200 ${
//                             viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-textSecondary hover:text-white'
//                         }`}
//                     >
//                         <LayoutList className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>

//             {/* Media Grid/List */}
//             {mediaItems.length === 0 ? (
//                 <div className="card p-12 text-center">
//                     <FolderOpen className="w-16 h-16 text-textSecondary/30 mx-auto mb-4" />
//                     <h3 className="text-lg font-semibold mb-2">No records</h3>
//                     <p className="text-desc">
//                         {searchQuery || selectedFolder !== 'All'
//                             ? 'No files match your search criteria'
//                             : 'Upload your first file to get started'}
//                     </p>
//                     <button
//                         onClick={() => setShowUploadModal(true)}
//                         className="mt-4 btn-primary mx-auto"
//                     >
//                         <Upload className="w-4 h-4" />
//                         Upload Files
//                     </button>
//                 </div>
//             ) : viewMode === 'grid' ? (
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                     {mediaItems.map((item) => (
//                         <motion.div
//                             key={item.id}
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.3 }}
//                             className="card p-3 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer"
//                         >
//                             <div className="relative aspect-square rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden">
//                                 {item.type === 'image' && item.url ? (
//                                     <img 
//                                         src={item.url} 
//                                         alt={item.name}
//                                         className="w-full h-full object-cover"
//                                         onError={(e) => {
//                                             e.target.style.display = 'none'
//                                             e.target.parentElement.innerHTML = `<div class="flex flex-col items-center">${getFileIcon(item.type, item.name)}</div>`
//                                         }}
//                                     />
//                                 ) : (
//                                     <div className="flex flex-col items-center">
//                                         {getFileIcon(item.type, item.name)}
//                                         <span className="text-xs text-textSecondary mt-1">{getFileExtension(item.name)}</span>
//                                     </div>
//                                 )}
//                                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             setSelectedItem(item)
//                                             setShowPreviewModal(true)
//                                         }}
//                                         className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
//                                         title="View"
//                                     >
//                                         <Eye className="w-4 h-4 text-white" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             setSelectedItem(item)
//                                             setRenameValue(item.name)
//                                             setShowRenameModal(true)
//                                         }}
//                                         className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
//                                         title="Rename"
//                                     >
//                                         <Edit className="w-4 h-4 text-white" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation()
//                                             setSelectedItem(item)
//                                             setShowDeleteConfirm(true)
//                                         }}
//                                         className="p-2 rounded-xl bg-danger/20 backdrop-blur-sm hover:bg-danger/30 transition-colors duration-200"
//                                         title="Delete"
//                                     >
//                                         <Trash2 className="w-4 h-4 text-white" />
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="mt-2">
//                                 <p className="text-sm font-medium truncate">{item.name}</p>
//                                 <div className="flex items-center justify-between text-xs text-textSecondary">
//                                     <span>{formatSize(item.sizeInBytes)}</span>
//                                     <span>{item.folder}</span>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="card p-6">
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="text-table-header border-b border-border">
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">File Name</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Type</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Size</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Folder</th>
//                                     <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {mediaItems.map((item) => (
//                                     <motion.tr
//                                         key={item.id}
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         transition={{ duration: 0.3 }}
//                                         className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200"
//                                     >
//                                         <td className="py-3">
//                                             <div className="flex items-center gap-3">
//                                                 {getFileIcon(item.type, item.name)}
//                                                 <span className="font-medium">{item.name}</span>
//                                             </div>
//                                         </td>
//                                         <td className="py-3 text-sm capitalize">{item.type}</td>
//                                         <td className="py-3 text-sm text-textSecondary">{formatSize(item.sizeInBytes)}</td>
//                                         <td className="py-3 text-sm text-textSecondary">{item.folder}</td>
//                                         <td className="py-3 text-right">
//                                             <div className="flex items-center justify-end gap-2">
//                                                 <button
//                                                     onClick={() => {
//                                                         setSelectedItem(item)
//                                                         setShowPreviewModal(true)
//                                                     }}
//                                                     className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                                     title="View"
//                                                 >
//                                                     <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         setSelectedItem(item)
//                                                         setRenameValue(item.name)
//                                                         setShowRenameModal(true)
//                                                     }}
//                                                     className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
//                                                     title="Rename"
//                                                 >
//                                                     <Edit className="w-4 h-4 text-textSecondary hover:text-white" />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         setSelectedItem(item)
//                                                         setShowDeleteConfirm(true)
//                                                     }}
//                                                     className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200"
//                                                     title="Delete"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 text-danger" />
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </motion.tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}

//             {/* Create Folder Modal */}
//             <AnimatePresence>
//                 {showCreateFolderModal && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={() => setShowCreateFolderModal(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-title">New Folder</h2>
//                                     <p className="text-sm text-textSecondary">Organize your files into folders</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowCreateFolderModal(false)}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <X className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">Folder Name</label>
//                                     <input
//                                         type="text"
//                                         value={folderName}
//                                         onChange={(e) => setFolderName(e.target.value)}
//                                         placeholder="e.g., Product Images"
//                                         className="input-field"
//                                         onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
//                                     />
//                                 </div>

//                                 <div className="flex gap-3 pt-4">
//                                     <button
//                                         onClick={() => setShowCreateFolderModal(false)}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleCreateFolder}
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                                 Creating...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <FolderPlus className="w-4 h-4" />
//                                                 Create
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Upload Modal */}
//             <AnimatePresence>
//                 {showUploadModal && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={() => setShowUploadModal(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-title">Upload Files</h2>
//                                     <p className="text-sm text-textSecondary">Select files to upload</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowUploadModal(false)}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <X className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 <div 
//                                     className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-500/50 transition-all duration-200"
//                                     onClick={() => fileInputRef.current?.click()}
//                                 >
//                                     <CloudUpload className="w-12 h-12 text-textSecondary/50 mx-auto mb-4" />
//                                     <p className="text-sm text-textSecondary">Click or drag files to upload</p>
//                                     <p className="text-xs text-textSecondary mt-1">Images, videos, and documents supported</p>
//                                     <input
//                                         ref={fileInputRef}
//                                         type="file"
//                                         multiple
//                                         className="hidden"
//                                         onChange={handleFileUpload}
//                                         accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.csv"
//                                     />
//                                 </div>

//                                 {isUploading && (
//                                     <div className="space-y-2">
//                                         <div className="flex items-center justify-between text-sm">
//                                             <span className="text-textSecondary">Uploading...</span>
//                                             <span className="text-indigo-400">{uploadProgress}%</span>
//                                         </div>
//                                         <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
//                                             <div 
//                                                 className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-300"
//                                                 style={{ width: `${uploadProgress}%` }}
//                                             />
//                                         </div>
//                                     </div>
//                                 )}

//                                 <div className="flex gap-3 pt-4">
//                                     <button
//                                         onClick={() => setShowUploadModal(false)}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={() => fileInputRef.current?.click()}
//                                         disabled={isUploading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         <Upload className="w-4 h-4" />
//                                         Select Files
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Preview Modal */}
//             <AnimatePresence>
//                 {showPreviewModal && selectedItem && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
//                         onClick={() => setShowPreviewModal(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="max-w-4xl w-full max-h-[90vh] overflow-auto"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="glass rounded-3xl border border-border p-6">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <div>
//                                         <h3 className="font-semibold">{selectedItem.name}</h3>
//                                         <p className="text-sm text-textSecondary">
//                                             {formatSize(selectedItem.sizeInBytes)} • {selectedItem.folder}
//                                         </p>
//                                     </div>
//                                     <button
//                                         onClick={() => setShowPreviewModal(false)}
//                                         className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                     >
//                                         <X className="w-5 h-5 text-textSecondary hover:text-white" />
//                                     </button>
//                                 </div>
//                                 <div className="flex items-center justify-center min-h-[300px] bg-background rounded-2xl border border-border p-4">
//                                     {selectedItem.type === 'image' ? (
//                                         <img 
//                                             src={selectedItem.url}
//                                             alt={selectedItem.name}
//                                             className="max-w-full max-h-[60vh] object-contain"
//                                             onError={(e) => {
//                                                 e.target.style.display = 'none'
//                                                 e.target.parentElement.innerHTML = `<div class="text-center text-textSecondary">Image preview not available</div>`
//                                             }}
//                                         />
//                                     ) : selectedItem.type === 'video' ? (
//                                         <video controls className="max-w-full max-h-[60vh]">
//                                             <source src={selectedItem.url} />
//                                             Your browser does not support the video tag.
//                                         </video>
//                                     ) : (
//                                         <div className="text-center">
//                                             {getFileIcon(selectedItem.type, selectedItem.name)}
//                                             <p className="text-textSecondary mt-2">{selectedItem.name}</p>
//                                             <a 
//                                                 href={selectedItem.url} 
//                                                 download 
//                                                 className="mt-4 inline-block px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
//                                             >
//                                                 <Download className="w-4 h-4 inline mr-2" />
//                                                 Download
//                                             </a>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="flex gap-2 mt-4 justify-center">
//                                     <button
//                                         onClick={() => {
//                                             setSelectedItem(selectedItem)
//                                             setRenameValue(selectedItem.name)
//                                             setShowRenameModal(true)
//                                             setShowPreviewModal(false)
//                                         }}
//                                         className="btn-secondary"
//                                     >
//                                         <Edit className="w-4 h-4" />
//                                         Rename
//                                     </button>
//                                     <button
//                                         onClick={() => {
//                                             setSelectedItem(selectedItem)
//                                             setShowDeleteConfirm(true)
//                                             setShowPreviewModal(false)
//                                         }}
//                                         className="px-4 py-2 rounded-2xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-all duration-200 flex items-center gap-2"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                         Delete
//                                     </button>
//                                     <a 
//                                         href={selectedItem.url} 
//                                         download 
//                                         className="btn-primary"
//                                     >
//                                         <Download className="w-4 h-4" />
//                                         Download
//                                     </a>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Delete Confirmation Modal */}
//             <AnimatePresence>
//                 {showDeleteConfirm && selectedItem && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={() => setShowDeleteConfirm(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="text-center">
//                                 <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
//                                     <Trash2 className="w-8 h-8 text-danger" />
//                                 </div>
//                                 <h2 className="text-title mb-2">Delete File</h2>
//                                 <p className="text-desc mb-4">
//                                     Are you sure you want to delete <strong>{selectedItem.name}</strong>? This action cannot be undone.
//                                 </p>
//                                 <div className="flex gap-3">
//                                     <button
//                                         onClick={() => setShowDeleteConfirm(false)}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleDeleteItem}
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-danger text-white text-sm hover:bg-danger/80 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                                 Deleting...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Trash2 className="w-4 h-4" />
//                                                 Delete
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Rename Modal */}
//             <AnimatePresence>
//                 {showRenameModal && selectedItem && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//                         onClick={() => setShowRenameModal(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.9, y: 20 }}
//                             animate={{ scale: 1, y: 0 }}
//                             exit={{ scale: 0.9, y: 20 }}
//                             className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-title">Rename File</h2>
//                                     <p className="text-sm text-textSecondary">Enter a new name for this file</p>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowRenameModal(false)}
//                                     className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
//                                 >
//                                     <X className="w-5 h-5 text-textSecondary hover:text-white" />
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1.5">File Name</label>
//                                     <input
//                                         type="text"
//                                         value={renameValue}
//                                         onChange={(e) => setRenameValue(e.target.value)}
//                                         className="input-field"
//                                         onKeyPress={(e) => e.key === 'Enter' && handleRenameItem()}
//                                     />
//                                 </div>

//                                 <div className="flex gap-3 pt-4">
//                                     <button
//                                         onClick={() => setShowRenameModal(false)}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         onClick={handleRenameItem}
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                                 Saving...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Save className="w-4 h-4" />
//                                                 Save
//                                             </>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     )
// }

// export default Media

















// src/pages/dashboard/Media.jsx
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Image,
    Video,
    File,
    Folder,
    FolderOpen,
    Plus,
    Search,
    Grid,
    List,
    Upload,
    Download,
    Trash2,
    Edit,
    Eye,
    X,
    Check,
    CloudUpload,
    FolderPlus,
    Save,
    LayoutGrid,
    LayoutList,
    FileText,
    FileIcon,
} from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const Media = () => {
    const [viewMode, setViewMode] = useState('grid')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFolder, setSelectedFolder] = useState('All')
    const [mediaItems, setMediaItems] = useState([])
    const [folders, setFolders] = useState(['All'])
    const [loading, setLoading] = useState(true)
    const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [folderName, setFolderName] = useState('')
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showRenameModal, setShowRenameModal] = useState(false)
    const [renameValue, setRenameValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null)

    // Stats
    const [stats, setStats] = useState({
        total: 0,
        images: 0,
        videos: 0,
        documents: 0,
        totalSize: 0,
        folders: 0,
    })

    // Get token
    const getToken = () => localStorage.getItem('token')

    // Fetch media items
    const fetchMedia = async () => {
        try {
            setLoading(true)
            const token = getToken()
            
            const params = {}
            if (selectedFolder !== 'All') {
                params.folder = selectedFolder
            }
            if (searchQuery) {
                params.search = searchQuery
            }

            const response = await api.get('/gallery', {
                params,
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) {
                setMediaItems(response.data.data || [])
                if (response.data.folders) {
                    const folderList = ['All', ...response.data.folders]
                    setFolders(folderList)
                }
                calculateStats(response.data.data || [])
            } else {
                setMediaItems([])
                calculateStats([])
            }
        } catch (error) {
            console.error('❌ Fetch media error:', error)
            setMediaItems([])
            calculateStats([])
            toast.error('Failed to load media')
        } finally {
            setLoading(false)
        }
    }

    // Calculate stats
    const calculateStats = (items) => {
        const total = items.length
        const images = items.filter(i => i.type === 'image').length
        const videos = items.filter(i => i.type === 'video').length
        const documents = items.filter(i => i.type === 'document' || i.type === 'file').length
        const totalSize = items.reduce((sum, i) => sum + (i.sizeInBytes || 0), 0)

        setStats({
            total,
            images,
            videos,
            documents,
            totalSize: totalSize,
            folders: folders.length - 1,
        })
    }

    // Fetch folders
    const fetchFolders = async () => {
        try {
            const token = getToken()
            const response = await api.get('/gallery/folders', {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.data.success) {
                const folderList = ['All', ...response.data.data]
                setFolders(folderList)
            }
        } catch (error) {
            console.error('❌ Fetch folders error:', error)
            setFolders(['All'])
        }
    }

    useEffect(() => {
        fetchFolders()
    }, [])

    useEffect(() => {
        fetchMedia()
    }, [selectedFolder, searchQuery])

    // Create folder
    const handleCreateFolder = async () => {
        if (!folderName.trim()) {
            toast.error('Please enter a folder name')
            return
        }

        try {
            setIsLoading(true)
            const token = getToken()
            const response = await api.post('/gallery/folders', 
                { name: folderName.trim() },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (response.data.success) {
                setFolders([...folders, folderName.trim()])
                setSelectedFolder(folderName.trim())
                toast.success('Folder created successfully')
                setShowCreateFolderModal(false)
                setFolderName('')
                fetchMedia()
            }
        } catch (error) {
            console.error('❌ Create folder error:', error)
            toast.error('Failed to create folder')
        } finally {
            setIsLoading(false)
        }
    }

    // Upload files
    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        setIsUploading(true)
        setUploadProgress(0)

        const formData = new FormData()
        files.forEach(file => {
            formData.append('files', file)
        })
        formData.append('folder', selectedFolder !== 'All' ? selectedFolder : 'general')

        try {
            const token = getToken()
            const response = await api.post('/gallery/upload', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setUploadProgress(progress)
                },
            })

            if (response.data.success) {
                toast.success('Files uploaded successfully')
                setShowUploadModal(false)
                fetchMedia()
            }
        } catch (error) {
            console.error('❌ Upload error:', error)
            toast.error('Failed to upload files')
        } finally {
            setIsUploading(false)
            setUploadProgress(0)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    // Delete item
    const handleDeleteItem = async () => {
        if (!selectedItem) return

        try {
            setIsLoading(true)
            const token = getToken()
            await api.delete(`/gallery/${selectedItem.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            toast.success('File deleted successfully')
            setShowDeleteConfirm(false)
            setSelectedItem(null)
            fetchMedia()
        } catch (error) {
            console.error('❌ Delete error:', error)
            toast.error('Failed to delete file')
        } finally {
            setIsLoading(false)
        }
    }

    // Rename item
    const handleRenameItem = async () => {
        if (!renameValue.trim() || !selectedItem) return

        try {
            setIsLoading(true)
            const token = getToken()
            const response = await api.put(`/gallery/${selectedItem.id}`,
                { name: renameValue.trim() },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (response.data.success) {
                toast.success('File renamed successfully')
                setShowRenameModal(false)
                setSelectedItem(null)
                fetchMedia()
            }
        } catch (error) {
            console.error('❌ Rename error:', error)
            toast.error('Failed to rename file')
        } finally {
            setIsLoading(false)
        }
    }

    // Get file icon
    const getFileIcon = (type, name) => {
        if (type === 'image') return <Image className="w-8 h-8 text-indigo-400" />
        if (type === 'video') return <Video className="w-8 h-8 text-cyan-400" />
        if (type === 'document') return <FileText className="w-8 h-8 text-amber-400" />
        
        const ext = name?.split('.').pop()?.toLowerCase()
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
            return <Image className="w-8 h-8 text-indigo-400" />
        }
        if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) {
            return <Video className="w-8 h-8 text-cyan-400" />
        }
        if (['pdf'].includes(ext)) {
            return <FileText className="w-8 h-8 text-danger" />
        }
        if (['doc', 'docx'].includes(ext)) {
            return <FileText className="w-8 h-8 text-blue-400" />
        }
        if (['xls', 'xlsx', 'csv'].includes(ext)) {
            return <FileText className="w-8 h-8 text-success" />
        }
        if (['zip', 'rar', '7z'].includes(ext)) {
            return <File className="w-8 h-8 text-amber-400" />
        }
        if (['mp3', 'wav', 'aac'].includes(ext)) {
            return <File className="w-8 h-8 text-pink-400" />
        }
        return <File className="w-8 h-8 text-textSecondary" />
    }

    // Format file size
    const formatSize = (bytes) => {
        if (!bytes) return '0 B'
        const units = ['B', 'KB', 'MB', 'GB']
        let value = bytes
        let unitIndex = 0
        while (value >= 1024 && unitIndex < units.length - 1) {
            value /= 1024
            unitIndex++
        }
        return `${value.toFixed(1)} ${units[unitIndex]}`
    }

    // Format date
    const formatDate = (date) => {
        if (!date) return '-'
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    // Get file extension
    const getFileExtension = (name) => {
        return name?.split('.').pop()?.toUpperCase() || ''
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-textSecondary">Loading media...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-title">Media Library</h1>
                    <p className="text-desc">Manage your images, videos and files</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowCreateFolderModal(true)}
                        className="btn-secondary"
                    >
                        <FolderPlus className="w-4 h-4" />
                        New Folder
                    </button>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="btn-primary shadow-lg shadow-indigo-500/25"
                    >
                        <Upload className="w-4 h-4" />
                        Upload
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="card p-4 text-center">
                    <div className="text-title text-indigo-400">{stats.total}</div>
                    <div className="text-sm text-textSecondary">Total Files</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-cyan-400">{stats.images}</div>
                    <div className="text-sm text-textSecondary">Images</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-amber-400">{stats.videos}</div>
                    <div className="text-sm text-textSecondary">Videos</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-success">{stats.documents}</div>
                    <div className="text-sm text-textSecondary">Documents</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-title text-rose-400">{formatSize(stats.totalSize)}</div>
                    <div className="text-sm text-textSecondary">Total Size</div>
                </div>
            </div>

            {/* Folder Navigation */}
            {folders.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-2 border-b border-border">
                    {folders.map((folder) => (
                        <button
                            key={folder}
                            onClick={() => setSelectedFolder(folder)}
                            className={`px-4 py-2 rounded-2xl text-sm transition-all duration-200 ${
                                selectedFolder === folder
                                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                                    : 'text-textSecondary hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {folder}
                        </button>
                    ))}
                </div>
            )}

            {/* Search and View Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textSecondary" />
                    <input
                        type="text"
                        placeholder="Search media..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full input-field pl-12"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-xl transition-colors duration-200 ${
                            viewMode === 'grid' ? 'bg-indigo-500/20 text-indigo-400' : 'text-textSecondary hover:text-white'
                        }`}
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-xl transition-colors duration-200 ${
                            viewMode === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-textSecondary hover:text-white'
                        }`}
                    >
                        <LayoutList className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Media Grid/List */}
            {mediaItems.length === 0 ? (
                <div className="card p-12 text-center">
                    <FolderOpen className="w-16 h-16 text-textSecondary/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No records</h3>
                    <p className="text-desc">
                        {searchQuery || selectedFolder !== 'All'
                            ? 'No files match your search criteria'
                            : 'Upload your first file to get started'}
                    </p>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="mt-4 btn-primary mx-auto"
                    >
                        <Upload className="w-4 h-4" />
                        Upload Files
                    </button>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {mediaItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="card p-3 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="relative aspect-square rounded-xl bg-background border border-border flex items-center justify-center overflow-hidden">
                                {item.type === 'image' && item.url ? (
                                    <img 
                                        src={item.url} 
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                            e.target.parentElement.innerHTML = `<div class="flex flex-col items-center">${getFileIcon(item.type, item.name)}</div>`
                                        }}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        {getFileIcon(item.type, item.name)}
                                        <span className="text-xs text-textSecondary mt-1">{getFileExtension(item.name)}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedItem(item)
                                            setShowPreviewModal(true)
                                        }}
                                        className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
                                        title="View"
                                    >
                                        <Eye className="w-4 h-4 text-white" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedItem(item)
                                            setRenameValue(item.name)
                                            setShowRenameModal(true)
                                        }}
                                        className="p-2 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
                                        title="Rename"
                                    >
                                        <Edit className="w-4 h-4 text-white" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedItem(item)
                                            setShowDeleteConfirm(true)
                                        }}
                                        className="p-2 rounded-xl bg-danger/20 backdrop-blur-sm hover:bg-danger/30 transition-colors duration-200"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm font-medium truncate">{item.name}</p>
                                <div className="flex items-center justify-between text-xs text-textSecondary">
                                    <span>{formatSize(item.sizeInBytes)}</span>
                                    <span>{item.folder}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="card p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-table-header border-b border-border">
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">File Name</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Type</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Size</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider">Folder</th>
                                    <th className="pb-3 font-semibold text-textSecondary uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mediaItems.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-b border-border last:border-0 hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <td className="py-3">
                                            <div className="flex items-center gap-3">
                                                {getFileIcon(item.type, item.name)}
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-sm capitalize">{item.type}</td>
                                        <td className="py-3 text-sm text-textSecondary">{formatSize(item.sizeInBytes)}</td>
                                        <td className="py-3 text-sm text-textSecondary">{item.folder}</td>
                                        <td className="py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedItem(item)
                                                        setShowPreviewModal(true)
                                                    }}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedItem(item)
                                                        setRenameValue(item.name)
                                                        setShowRenameModal(true)
                                                    }}
                                                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                                                    title="Rename"
                                                >
                                                    <Edit className="w-4 h-4 text-textSecondary hover:text-white" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedItem(item)
                                                        setShowDeleteConfirm(true)
                                                    }}
                                                    className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors duration-200"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 text-danger" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Create Folder Modal */}
            <AnimatePresence>
                {showCreateFolderModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowCreateFolderModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-title">New Folder</h2>
                                    <p className="text-sm text-textSecondary">Organize your files into folders</p>
                                </div>
                                <button
                                    onClick={() => setShowCreateFolderModal(false)}
                                    className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                >
                                    <X className="w-5 h-5 text-textSecondary hover:text-white" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">Folder Name</label>
                                    <input
                                        type="text"
                                        value={folderName}
                                        onChange={(e) => setFolderName(e.target.value)}
                                        placeholder="e.g., Product Images"
                                        className="input-field"
                                        onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setShowCreateFolderModal(false)}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateFolder}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <FolderPlus className="w-4 h-4" />
                                                Create
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upload Modal */}
            <AnimatePresence>
                {showUploadModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowUploadModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-title">Upload Files</h2>
                                    <p className="text-sm text-textSecondary">Select files to upload</p>
                                </div>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                >
                                    <X className="w-5 h-5 text-textSecondary hover:text-white" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div 
                                    className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-500/50 transition-all duration-200"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <CloudUpload className="w-12 h-12 text-textSecondary/50 mx-auto mb-4" />
                                    <p className="text-sm text-textSecondary">Click or drag files to upload</p>
                                    <p className="text-xs text-textSecondary mt-1">Images, videos, and documents supported</p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileUpload}
                                        accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.csv"
                                    />
                                </div>

                                {isUploading && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-textSecondary">Uploading...</span>
                                            <span className="text-indigo-400">{uploadProgress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-[#1E293B] rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setShowUploadModal(false)}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Select Files
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Preview Modal */}
            <AnimatePresence>
                {showPreviewModal && selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setShowPreviewModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="max-w-4xl w-full max-h-[90vh] overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="glass rounded-3xl border border-border p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold">{selectedItem.name}</h3>
                                        <p className="text-sm text-textSecondary">
                                            {formatSize(selectedItem.sizeInBytes)} • {selectedItem.folder}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowPreviewModal(false)}
                                        className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                    >
                                        <X className="w-5 h-5 text-textSecondary hover:text-white" />
                                    </button>
                                </div>
                                <div className="flex items-center justify-center min-h-[300px] bg-background rounded-2xl border border-border p-4">
                                    {selectedItem.type === 'image' ? (
                                        <img 
                                            src={selectedItem.url}
                                            alt={selectedItem.name}
                                            className="max-w-full max-h-[60vh] object-contain"
                                            onError={(e) => {
                                                e.target.style.display = 'none'
                                                e.target.parentElement.innerHTML = `<div class="text-center text-textSecondary">Image preview not available</div>`
                                            }}
                                        />
                                    ) : selectedItem.type === 'video' ? (
                                        <video controls className="max-w-full max-h-[60vh]">
                                            <source src={selectedItem.url} />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <div className="text-center">
                                            {getFileIcon(selectedItem.type, selectedItem.name)}
                                            <p className="text-textSecondary mt-2">{selectedItem.name}</p>
                                            <a 
                                                href={selectedItem.url} 
                                                download 
                                                className="mt-4 inline-block px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200"
                                            >
                                                <Download className="w-4 h-4 inline mr-2" />
                                                Download
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 mt-4 justify-center">
                                    <button
                                        onClick={() => {
                                            setSelectedItem(selectedItem)
                                            setRenameValue(selectedItem.name)
                                            setShowRenameModal(true)
                                            setShowPreviewModal(false)
                                        }}
                                        className="btn-secondary"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Rename
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedItem(selectedItem)
                                            setShowDeleteConfirm(true)
                                            setShowPreviewModal(false)
                                        }}
                                        className="px-4 py-2 rounded-2xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-all duration-200 flex items-center gap-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                    <a 
                                        href={selectedItem.url} 
                                        download 
                                        className="btn-primary"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteConfirm && selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
                                    <Trash2 className="w-8 h-8 text-danger" />
                                </div>
                                <h2 className="text-title mb-2">Delete File</h2>
                                <p className="text-desc mb-4">
                                    Are you sure you want to delete <strong>{selectedItem.name}</strong>? This action cannot be undone.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteItem}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-danger text-white text-sm hover:bg-danger/80 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rename Modal */}
            <AnimatePresence>
                {showRenameModal && selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowRenameModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass rounded-3xl border border-border p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-title">Rename File</h2>
                                    <p className="text-sm text-textSecondary">Enter a new name for this file</p>
                                </div>
                                <button
                                    onClick={() => setShowRenameModal(false)}
                                    className="p-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
                                >
                                    <X className="w-5 h-5 text-textSecondary hover:text-white" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">File Name</label>
                                    <input
                                        type="text"
                                        value={renameValue}
                                        onChange={(e) => setRenameValue(e.target.value)}
                                        className="input-field"
                                        onKeyPress={(e) => e.key === 'Enter' && handleRenameItem()}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setShowRenameModal(false)}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-card border border-border text-sm hover:border-indigo-500/50 transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleRenameItem}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Save
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Media