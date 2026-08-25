import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Globe, X } from 'lucide-react'
import api from '../../services/api'
import generateStoreSlug from '../../utils/generateStoreSlug'

const ViewWebsiteModal = ({ isOpen, onClose, storeName, storeSlug }) => {
    const [resolvedSlug, setResolvedSlug] = useState(storeSlug || '')
    const [resolvedName, setResolvedName] = useState(storeName || '')
    const [loading, setLoading] = useState(false)

    const websiteUrl = useMemo(() => {
        const normalizedSlug = resolvedSlug?.trim()

        if (!normalizedSlug) {
            const slug = generateStoreSlug(resolvedName, 'store')
            return `https://${slug}.example.com`
        }

        if (/^https?:\/\//i.test(normalizedSlug)) {
            return normalizedSlug
        }

        if (normalizedSlug.includes('.')) {
            return `https://${normalizedSlug}`
        }

        return `https://${normalizedSlug}.example.com`
    }, [resolvedName, resolvedSlug])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const fetchStoreDetails = async () => {
            try {
                setLoading(true)
                const response = await api.get('/stores/settings')
                const storeData = response?.data?.store || {}
                const nextName = storeData.name || storeName || ''
                const nextSlug = storeData.domain?.subdomain || storeData.domain?.slug || storeSlug || ''
                setResolvedName(nextName)
                setResolvedSlug(nextSlug || generateStoreSlug(nextName, 'store'))
            } catch (error) {
                console.error('Failed to load store details', error)
                setResolvedName(storeName || '')
                setResolvedSlug(storeSlug || '')
            } finally {
                setLoading(false)
            }
        }

        fetchStoreDetails()
    }, [isOpen, storeName, storeSlug])

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen) {
        return null
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0f172a] shadow-2xl"
                    onClick={(event) => event.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="view-website-title"
                >
                    <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                        <div>
                            <h2 id="view-website-title" className="text-lg font-semibold text-white">Store Website</h2>
                            <p className="text-sm text-slate-400">Open your live storefront in a new tab</p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                            aria-label="Close modal"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-5 px-6 py-6">
                        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
                                <Globe className="h-4 w-4 text-cyan-400" />
                                Store URL
                            </div>
                            <input
                                readOnly
                                value={loading ? 'Loading...' : websiteUrl}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 outline-none"
                            />
                        </div>

                        <div className="flex justify-end">
                            <a
                                href={websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-indigo-600 hover:to-cyan-600"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Launch
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ViewWebsiteModal
