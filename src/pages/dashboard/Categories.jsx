import React, { useEffect, useState } from 'react'
import Cropper from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'
import { GripVertical, Plus, Trash2, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'

const aspectRatios = [
    { label: '4:5', value: 4 / 5 },
    { label: '4:9', value: 4 / 9 },
    { label: '16:9', value: 16 / 9 },
    { label: '9:16', value: 9 / 16 },
]

const readCategories = () => {
    try {
        return JSON.parse(localStorage.getItem('categories') || '[]')
    } catch {
        return []
    }
}

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [cropImage, setCropImage] = useState('')
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [selectedRatio, setSelectedRatio] = useState(aspectRatios[0])
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    useEffect(() => {
        setCategories(readCategories())
    }, [])

    const openAddModal = () => {
        setName('')
        setImage('')
        setShowAddModal(true)
    }

    const closeAddModal = () => {
        setShowAddModal(false)
        setCropImage('')
    }

    const handleImageSelect = (event) => {
        const file = event.target.files?.[0]
        event.target.value = ''
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            setCropImage(reader.result)
            setCrop({ x: 0, y: 0 })
            setZoom(1)
            setSelectedRatio(aspectRatios[0])
            setCroppedAreaPixels(null)
        }
        reader.readAsDataURL(file)
    }

    const applyCrop = async () => {
        if (!cropImage || !croppedAreaPixels) return

        const sourceImage = await new Promise((resolve, reject) => {
            const element = new Image()
            element.onload = () => resolve(element)
            element.onerror = reject
            element.src = cropImage
        })
        const canvas = document.createElement('canvas')
        canvas.width = croppedAreaPixels.width
        canvas.height = croppedAreaPixels.height
        const context = canvas.getContext('2d')
        context.drawImage(
            sourceImage,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
        )
        setImage(canvas.toDataURL('image/jpeg', 0.92))
        setCropImage('')
    }

    const saveCategory = (event) => {
        event.preventDefault()
        if (!name.trim()) {
            toast.error('Please enter a category name')
            return
        }
        if (!image) {
            toast.error('Please upload and crop an image')
            return
        }

        const newCategory = {
            id: `local-${Date.now()}`,
            name: name.trim(),
            image,
        }
        const updatedCategories = [newCategory, ...categories]
        localStorage.setItem('categories', JSON.stringify(updatedCategories))
        setCategories(updatedCategories)
        closeAddModal()
        toast.success('Category saved successfully')
    }

    const deleteCategory = (categoryId) => {
        const updatedCategories = categories.filter((category) => category.id !== categoryId)
        localStorage.setItem('categories', JSON.stringify(updatedCategories))
        setCategories(updatedCategories)
        toast.success('Category deleted')
    }

    return (
        <div className="min-h-full bg-[#f5f7fa] p-4 text-[#171717] dark:bg-[#050505] dark:text-white sm:p-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-3 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Store Categories</h1>
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="relative z-10 flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-md !bg-[#7725e8] px-4 py-2 text-sm font-semibold !text-white shadow-sm transition hover:!bg-[#6417cf]"
                        style={{ backgroundColor: '#7725e8', color: '#ffffff', opacity: 1, visibility: 'visible' }}
                    >
                        <Plus className="h-4 w-4" />
                        Add Category
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-[#e2e5e9] bg-white shadow-sm dark:border-[#262626] dark:bg-[#111111]">
                    <div className="grid grid-cols-[36px_minmax(0,1fr)_72px] items-center border-b border-[#e2e5e9] px-3 py-2 text-xs font-bold dark:border-[#262626] sm:grid-cols-[42px_minmax(0,1fr)_90px] sm:px-4">
                        <span>#</span>
                        <span>Name</span>
                        <span>Actions</span>
                    </div>

                    {categories.length === 0 ? (
                        <div className="px-4 py-12 text-center text-sm text-gray-500 dark:text-gray-400">No categories added yet.</div>
                    ) : (
                        categories.map((category) => (
                            <div key={category.id} className="flex min-h-[58px] w-full flex-nowrap items-center gap-3 border-b border-[#e2e5e9] px-3 py-2 last:border-b-0 dark:border-[#262626] sm:px-4">
                                <GripVertical className="h-5 w-5 shrink-0 text-[#111827] dark:text-gray-300" aria-label="Drag category" />
                                <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-3 overflow-hidden">
                                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                        <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                                    </div>
                                    <span className="min-w-0 truncate text-sm font-bold uppercase text-[#171717] dark:text-white">{category.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => deleteCategory(category.id)}
                                    className="ml-auto shrink-0 whitespace-nowrap rounded p-1 text-[#ed858b] transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                                    aria-label={`Delete ${category.name}`}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg rounded-xl bg-white p-6 text-gray-900 shadow-2xl dark:bg-[#111111] dark:text-white">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Add Category</h2>
                            <button type="button" onClick={closeAddModal} className="text-2xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-white" aria-label="Close modal">×</button>
                        </div>

                        <form onSubmit={saveCategory} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">Category Name *</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="eg: Clothing"
                                    required
                                    spellCheck={false}
                                    autoCorrect="off"
                                    className="w-full rounded-lg border border-gray-700 bg-[#111111] px-3 py-2.5 text-sm !text-white caret-white outline-none placeholder:text-gray-400 focus:border-[#7725e8] focus:ring-2 focus:ring-[#7725e8]/20"
                                    style={{ backgroundColor: '#111111', color: '#ffffff', WebkitTextFillColor: '#ffffff', opacity: 1 }}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">Category Image *</label>
                                <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center hover:border-[#7725e8] dark:border-gray-700 dark:bg-[#050505]">
                                    {image ? (
                                        <img src={image} alt="Cropped category preview" className="h-24 w-24 rounded-lg object-cover" />
                                    ) : (
                                        <>
                                            <Upload className="mb-2 h-6 w-6 text-gray-400" />
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Click to upload image</span>
                                        </>
                                    )}
                                    <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
                                <button type="button" onClick={closeAddModal} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">Cancel</button>
                                <button
                                    type="submit"
                                    className="min-h-10 rounded-lg !bg-[#2563eb] px-5 py-2 text-sm font-semibold !text-white opacity-100 hover:!bg-[#1d4ed8]"
                                    style={{ backgroundColor: '#2563eb', color: '#ffffff', opacity: 1, visibility: 'visible', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {cropImage && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4">
                    <div className="w-full max-w-3xl overflow-hidden rounded-xl bg-white text-gray-900 shadow-2xl dark:bg-[#111111] dark:text-white">
                        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
                            <h2 className="text-xl font-bold">Crop Image</h2>
                            <button type="button" onClick={() => setCropImage('')} className="text-gray-400 hover:text-gray-700 dark:hover:text-white" aria-label="Close crop modal"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="space-y-5 p-5">
                            <div className="relative h-80 overflow-hidden rounded-lg bg-gray-900">
                                <Cropper
                                    image={cropImage}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={selectedRatio.value}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                                    showGrid
                                    restrictPosition
                                />
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Aspect Ratio</p>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                    {aspectRatios.map((ratio) => (
                                        <button
                                            key={ratio.label}
                                            type="button"
                                            onClick={() => setSelectedRatio(ratio)}
                                            className={`rounded-lg border px-3 py-2 text-sm font-medium ${selectedRatio.label === ratio.label ? 'border-[#7725e8] bg-[#7725e8] text-white' : 'border-gray-300 text-gray-700 hover:border-[#7725e8] dark:border-gray-700 dark:text-gray-200'}`}
                                        >
                                            {ratio.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 flex justify-between text-xs text-gray-500 dark:text-gray-400"><span>Zoom</span><span>{Math.round(zoom * 100)}%</span></div>
                                <input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="w-full accent-[#7725e8]" />
                            </div>
                            <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
                                <button type="button" onClick={() => setCropImage('')} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200">Cancel</button>
                                <button type="button" onClick={applyCrop} className="rounded-lg bg-[#2563eb] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8]">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Categories
