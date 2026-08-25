import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ImageCropModal from '../../components/ImageCropModal'
import { productAPI, storeCategoryAPI } from '../../services/api'

const PageEditor = () => {
  const { pageId } = useParams()
  const navigate = useNavigate()
  const [page, setPage] = useState(null)
  const [sections, setSections] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [showPreview, setShowPreview] = useState(false)
  const [editingSection, setEditingSection] = useState(null)
  const [showSaved, setShowSaved] = useState(false)
  const [storeCategories, setStoreCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [categoriesError, setCategoriesError] = useState('')
  const [storeProducts, setStoreProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [productsError, setProductsError] = useState('')

  // Section library
  const sectionLibrary = {
    general: [
      { id: 'navbar', label: 'Navbar', icon: '📱' },
      { id: 'hero', label: 'Hero Section', icon: '🎯' },
      { id: 'full_image', label: 'Full Image', icon: '🖼️' },
      { id: 'image_content', label: 'Image With Contents', icon: '📸' },
      { id: 'layout_editor', label: 'With Layout Editor', icon: '✏️' },
      { id: 'faq', label: 'FAQ', icon: '❓' },
      { id: 'video', label: 'Video Player', icon: '🎥' },
      { id: 'side_image', label: 'Side Image Content', icon: '↔️' },
      { id: 'image_slider', label: 'Image Slider', icon: '🎞️' },
      { id: 'footer', label: 'Footer', icon: '📄' }
    ],
    categories: [
      { id: 'category_grid', label: 'Category Grid', icon: '🏷️' }
    ],
    products: [
      { id: 'product_grid', label: 'Product Grid', icon: '📦' },
      { id: 'single_product', label: 'Single Product', icon: '🛍️' }
    ]
  }

  // Load page data on mount
  useEffect(() => {
    const pagesData = JSON.parse(localStorage.getItem('pagesData') || '[]')
    const foundPage = pagesData.find(p => p.id === parseInt(pageId))
    if (foundPage) {
      setPage(foundPage)
      setSections(foundPage.sections || [])
    }
  }, [pageId])

  useEffect(() => {
    let isMounted = true
    const getLocalCategories = () => {
      try {
        const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]')
        return Array.isArray(savedCategories) ? savedCategories : []
      } catch {
        return []
      }
    }

    const mergeCategories = (remoteCategories) => {
      const localCategories = getLocalCategories()
      const combined = [...remoteCategories, ...localCategories]
      return combined.filter((category, index, list) => (
        category?.id && list.findIndex((item) => String(item.id) === String(category.id)) === index
      ))
    }

    const loadStoreCategories = async () => {
      try {
        setCategoriesLoading(true)
        setCategoriesError('')
        const response = await storeCategoryAPI.getAll()
        const remoteCategories = Array.isArray(response.data) ? response.data : (response.data?.data || response.data?.categories || [])
        if (isMounted) setStoreCategories(mergeCategories(remoteCategories))
      } catch (error) {
        const localCategories = getLocalCategories()
        if (isMounted) {
          setStoreCategories(localCategories)
          if (!localCategories.length) setCategoriesError(error.response?.data?.message || 'Unable to load categories')
        }
      } finally {
        if (isMounted) setCategoriesLoading(false)
      }
    }
    loadStoreCategories()
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    let isMounted = true
    const loadStoreProducts = async () => {
      try {
        setProductsLoading(true)
        setProductsError('')
        const response = await productAPI.getAll()
        const products = Array.isArray(response.data) ? response.data : (response.data?.data || response.data?.products || [])
        if (isMounted) setStoreProducts(Array.isArray(products) ? products : [])
      } catch (error) {
        if (isMounted) {
          setStoreProducts([])
          setProductsError(error.response?.data?.message || 'Unable to load products')
        }
      } finally {
        if (isMounted) setProductsLoading(false)
      }
    }
    loadStoreProducts()
    return () => { isMounted = false }
  }, [])

  const getTabs = () => {
    const tabs = ['all', 'general', 'categories', 'products']
    return tabs.map(tab => ({
      id: tab,
      label: tab.charAt(0).toUpperCase() + tab.slice(1),
      count: tab === 'all' ? Object.values(sectionLibrary).flat().length : sectionLibrary[tab]?.length || 0
    }))
  }

  const getSectionsForTab = (tab) => {
    if (tab === 'all') return Object.values(sectionLibrary).flat()
    return sectionLibrary[tab] || []
  }

  const createDefaultSettings = (sectionType) => {
    const defaults = {
      navbar: { logo: 'My Store', navItems: [{ label: 'Home', url: '#' }, { label: 'Products', url: '#' }, { label: 'About', url: '#' }, { label: 'Contact', url: '#' }] },
      hero: { heading: 'Welcome to Our Store', subheading: 'Explore our amazing collection', backgroundImage: '', backgroundColor: 'from-[#7c3aed] to-[#6d2fe2]', ctaText: 'Shop Now', ctaLink: '#' },
      full_image: { imageUrl: '', altText: '' },
      image_content: { image: '', heading: '', text: '', buttonText: '', buttonLink: '' },
      layout_editor: { content: '' },
      faq: { heading: 'FAQ', items: [{ q: 'Question?', a: 'Answer' }] },
      video: { heading: '', videoUrl: '' },
      side_image: { image: '', heading: '', text: '', buttonText: '', buttonLink: '' },
      image_slider: { slides: [{ image: '', heading: '', sub: '', button: '', link: '' }] },
      category_grid: {
        sectionType: 'category_grid',
        heading: 'Categories',
        selectedIds: [],
        backgroundColor: 'transparent',
        titleAlign: 'center',
        gridStyle: 'simple_image_center_text',
      },
      product_grid: { sectionType: 'product_grid', useThemeColor: false, backgroundColor: 'transparent', heading: 'Products', titleAlign: 'left', gridStyle: 'default', columns: 3, showPrice: true, showAddToCart: true, selectedProductIds: [], products: [] },
      single_product: { name: '', price: '', image: '', description: '', addToCart: true },
      footer: { companyName: 'Your Store', companyDescription: 'Your trusted online shopping destination', contactEmail: 'info@store.com', contactPhone: '+1-234-567-8900', copyright: '2026 Your Store. All rights reserved.', links: [{ label: 'Home', url: '#' }, { label: 'Products', url: '#' }, { label: 'About', url: '#' }] }
    }
    return defaults[sectionType] || {}
  }

  const handleAddSection = (sectionType) => {
    const newSection = {
      id: `sec_${Date.now()}`,
      type: sectionType,
      settings: createDefaultSettings(sectionType)
    }
    setSections([...sections, newSection])
    setShowModal(false)
  }

  const handleDeleteSection = (sectionId) => {
    setSections(sections.filter(s => s.id !== sectionId))
  }

  const handleMoveSection = (sectionId, direction) => {
    const index = sections.findIndex(s => s.id === sectionId)
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < sections.length - 1)) {
      const newSections = [...sections]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      const temp = newSections[index]
      newSections[index] = newSections[targetIndex]
      newSections[targetIndex] = temp
      setSections(newSections)
    }
  }

  const handleUpdateSection = (sectionId, newSettings) => {
    setSections(sections.map(s => s.id === sectionId ? { ...s, settings: newSettings } : s))
  }

  const handleSaveChanges = () => {
    try {
      const pagesData = JSON.parse(localStorage.getItem('pagesData') || '[]')
      const updatedPages = pagesData.map((item) => (
        String(item.id) === String(page.id) ? { ...item, sections } : item
      ))
      localStorage.setItem('pagesData', JSON.stringify(updatedPages))
      setPage((currentPage) => currentPage ? { ...currentPage, sections } : currentPage)
      window.dispatchEvent(new Event('pagesDataUpdated'))
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 3000)
    } catch {
      setShowSaved(false)
    }
  }

  const handleBackClick = () => {
    if (showModal || showPreview) {
      // Agar modal ya preview open hai toh close karo
      setShowModal(false)
      setShowPreview(false)
    } else {
      // Nahi toh Pages list par jao
      navigate('/dashboard/pages')
    }
  }

  if (!page) {
    return <div className="p-6 text-center text-gray-400">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-[#2a2a2a] dark:bg-[#111111]/90">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-[#2a2a2a] dark:bg-[#111111] dark:text-gray-100 dark:hover:bg-[#1a1a1a]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Pages</span>
          </button>

          <div className="text-sm font-semibold text-gray-700 dark:text-gray-100">
            {page?.title || 'Page Editor'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Left Sidebar - Section Library */}
        <div className="w-80 bg-white dark:bg-[#111111] border-r border-gray-200 dark:border-[#2a2a2a] px-4 py-6 overflow-y-auto shadow-sm">
          <h2 className="text-base font-bold text-[#2a2c32] dark:text-white mb-4">Section Library</h2>

          <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-[#2a2a2a]">
            {getTabs().map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 px-2 text-xs font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#7c3aed] text-[#7c3aed]'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {getSectionsForTab(activeTab).map(section => (
              <button
                key={section.id}
                onClick={() => handleAddSection(section.id)}
                className="w-full p-3 text-left rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#0f0f0f] hover:border-[#7c3aed] hover:bg-purple-50 dark:hover:bg-[#1a1a1a] transition-colors"
              >
                <div className="text-xl mb-1">{section.icon}</div>
                <div className="text-xs font-medium text-[#2a2c32] dark:text-white">{section.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f0f0f]" style={{ scrollBehavior: 'smooth' }}>
          <div className="px-6 py-8 pb-20">
            <div className="max-w-4xl mx-auto">
              {sections.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-3">🎨</div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2 font-medium">No sections added yet</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Select a section from the library on the left to get started</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {sections.map((section, index) => (
                    <SectionBlock
                      key={section.id}
                      section={section}
                      index={index}
                      total={sections.length}
                      onUpdate={handleUpdateSection}
                      onDelete={handleDeleteSection}
                      onMove={handleMoveSection}
                      onAddAfter={() => setShowModal(true)}
                      storeCategories={storeCategories}
                      categoriesLoading={categoriesLoading}
                      categoriesError={categoriesError}
                      storeProducts={storeProducts}
                      productsLoading={productsLoading}
                      productsError={productsError}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Section Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#111111] rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-[#2a2a2a] sticky top-0 bg-white dark:bg-[#111111]">
              <h2 className="text-lg font-bold text-[#2a2c32] dark:text-white">Add Section</h2>
            </div>

            <div className="p-5 space-y-4 dark:bg-[#111111]">
              <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-[#2a2a2a] pb-4">
                {getTabs().map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-sm font-medium transition-colors pb-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-b-2 border-[#7c3aed] text-[#7c3aed]'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {getSectionsForTab(activeTab).map(section => (
                  <button
                    key={section.id}
                    onClick={() => {
                      handleAddSection(section.id)
                    }}
                    className="p-4 rounded-lg border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#0f0f0f] hover:border-[#7c3aed] hover:bg-purple-50 dark:hover:bg-[#1a1a1a] transition-all text-center"
                  >
                    <div className="text-4xl mb-2">{section.icon}</div>
                    <div className="text-xs font-medium text-[#2a2c32] dark:text-white">{section.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 dark:border-[#2a2a2a] flex justify-end gap-3 dark:bg-[#111111]">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#2a2a2a] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#111111] rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 px-6 py-4 border-b border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111111] flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#2a2c32] dark:text-white">Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl font-light"
              >
                ✕
              </button>
            </div>

            <div className="p-6 bg-white dark:bg-[#0f0f0f]">
              {sections.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">No sections to preview</div>
              ) : (
                <PreviewRenderer sections={sections} storeCategories={storeCategories} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Save Changes Button - Fixed Bottom-Right, Stays in Place on Scroll */}
      <button
        onClick={handleSaveChanges}
        style={{ position: 'fixed', bottom: '16px', right: '24px', zIndex: 50 }}
        className="px-6 py-2.5 text-sm font-semibold text-white bg-[#7c3aed] rounded-lg hover:bg-[#6d2fe2] transition-colors shadow-lg"
      >
        Save Changes
      </button>

      {/* Save Notification */}
      {showSaved && (
        <div style={{ position: 'fixed', bottom: '64px', right: '24px', zIndex: 50 }} className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <span>✓</span>
          <span>Changes saved successfully!</span>
        </div>
      )}
    </div>
  )
}

// Section Block Component
const SectionBlock = ({ section, index, total, onUpdate, onDelete, onMove, onAddAfter, storeCategories, categoriesLoading, categoriesError, storeProducts, productsLoading, productsError }) => {
  const sectionLabel = {
    navbar: 'Navbar',
    hero: 'Hero Section',
    full_image: 'Full Image',
    image_content: 'Image With Contents',
    layout_editor: 'Layout Editor',
    faq: 'FAQ',
    video: 'Video Player',
    side_image: 'Side Image Content',
    image_slider: 'Image Slider',
    category_grid: 'Category Grid',
    product_grid: 'Product Grid',
    single_product: 'Single Product',
    footer: 'Footer'
  }

  return (
    <div className="bg-white dark:bg-[#111111] rounded-lg border border-gray-200 dark:border-[#2a2a2a] shadow-sm" style={{ overflow: 'visible' }}>
      {/* Header */}
      <div className="bg-gray-100 dark:bg-[#0f0f0f] px-6 py-4 border-b border-gray-200 dark:border-[#2a2a2a] flex items-center justify-between">
        <h3 className="font-semibold text-[#2a2c32] dark:text-white text-sm">{sectionLabel[section.type]}</h3>
        <div className="flex items-center gap-1">
          {index > 0 && (
            <button onClick={() => onMove(section.id, 'up')} className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1a1a1a] rounded transition-colors text-base">
              ↑
            </button>
          )}
          {index < total - 1 && (
            <button onClick={() => onMove(section.id, 'down')} className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#1a1a1a] rounded transition-colors text-base">
              ↓
            </button>
          )}
          <button onClick={() => onDelete(section.id)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors text-base">
            🗑️
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6" style={{ overflow: 'visible' }}>
        <SectionSettingsEditor
          section={section}
          onUpdate={onUpdate}
          storeCategories={storeCategories}
          categoriesLoading={categoriesLoading}
          categoriesError={categoriesError}
          storeProducts={storeProducts}
          productsLoading={productsLoading}
          productsError={productsError}
        />
      </div>
    </div>
  )
}

// Section Settings Editor
const SectionSettingsEditor = ({ section, onUpdate, storeCategories = [], categoriesLoading, categoriesError, storeProducts = [], productsLoading, productsError }) => {
  const { type, settings } = section
  const [productSearch, setProductSearch] = useState('')
  const [productsOpen, setProductsOpen] = useState(false)

  const handleChange = (key, value) => {
    onUpdate(section.id, { ...settings, [key]: value })
  }

  const handleArrayItemChange = (arrayKey, index, itemKey, value) => {
    const arr = [...settings[arrayKey]]
    arr[index] = { ...arr[index], [itemKey]: value }
    onUpdate(section.id, { ...settings, [arrayKey]: arr })
  }

  const addArrayItem = (arrayKey) => {
    const arr = [...(settings[arrayKey] || [])]
    if (arrayKey === 'items') arr.push({ q: '', a: '' })
    else if (arrayKey === 'slides') arr.push({ image: '', heading: '', sub: '', button: '', link: '' })
    else if (arrayKey === 'products') arr.push({ name: '', price: '', image: '' })
    else if (arrayKey === 'links') arr.push({ label: '', url: '' })
    onUpdate(section.id, { ...settings, [arrayKey]: arr })
  }

  const removeArrayItem = (arrayKey, index) => {
    const arr = settings[arrayKey].filter((_, i) => i !== index)
    onUpdate(section.id, { ...settings, [arrayKey]: arr })
  }

  // Render different editors based on section type
  if (type === 'full_image') {
    return (
      <div className="space-y-4">
        <ImageUploadField label="Full Image" value={settings.imageUrl} onChange={(v) => handleChange('imageUrl', v)} />
        <InputField label="Alt Text" value={settings.altText} onChange={(v) => handleChange('altText', v)} />
      </div>
    )
  }

  if (type === 'image_content' || type === 'side_image') {
    return (
      <div className="space-y-4">
        <ImageUploadField label="Image" value={settings.image} onChange={(v) => handleChange('image', v)} />
        <InputField label="Heading" value={settings.heading} onChange={(v) => handleChange('heading', v)} />
        <TextAreaField label="Text" value={settings.text} onChange={(v) => handleChange('text', v)} />
        <InputField label="Button Text" value={settings.buttonText} onChange={(v) => handleChange('buttonText', v)} />
        <InputField label="Button Link" value={settings.buttonLink} onChange={(v) => handleChange('buttonLink', v)} />
      </div>
    )
  }

  if (type === 'faq') {
    return (
      <div className="space-y-4">
        <InputField label="Heading" value={settings.heading} onChange={(v) => handleChange('heading', v)} />
        <div>
          <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">FAQ Items</label>
          {settings.items.map((item, idx) => (
            <div key={idx} className="mb-3 p-3 bg-gray-50 dark:bg-[#0f0f0f] rounded border border-[#e5e7eb] dark:border-[#2a2a2a]">
              <InputField
                label={`Question ${idx + 1}`}
                value={item.q}
                onChange={(v) => handleArrayItemChange('items', idx, 'q', v)}
              />
              <TextAreaField
                label={`Answer ${idx + 1}`}
                value={item.a}
                onChange={(v) => handleArrayItemChange('items', idx, 'a', v)}
              />
              {settings.items.length > 1 && (
                <button
                  onClick={() => removeArrayItem('items', idx)}
                  className="mt-2 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem('items')}
            className="px-3 py-2 text-sm bg-[#7c3aed] text-white rounded hover:bg-[#6d2fe2]"
          >
            + Add Item
          </button>
        </div>
      </div>
    )
  }

  if (type === 'video') {
    return (
      <div className="space-y-4">
        <InputField label="Heading" value={settings.heading} onChange={(v) => handleChange('heading', v)} />
        <InputField label="Video URL" value={settings.videoUrl} onChange={(v) => handleChange('videoUrl', v)} />
      </div>
    )
  }

  if (type === 'image_slider') {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Slides</label>
          {settings.slides.map((slide, idx) => (
            <div key={idx} className="mb-4 p-4 bg-gray-50 dark:bg-[#0f0f0f] rounded border border-[#e5e7eb] dark:border-[#2a2a2a]">
              <h4 className="text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Slide {idx + 1}</h4>
              <div className="space-y-3">
                <ImageUploadField
                  label="Slide Image"
                  value={slide.image}
                  onChange={(v) => handleArrayItemChange('slides', idx, 'image', v)}
                />
                <InputField
                  label="Heading"
                  value={slide.heading}
                  onChange={(v) => handleArrayItemChange('slides', idx, 'heading', v)}
                />
                <InputField
                  label="Subtitle"
                  value={slide.sub}
                  onChange={(v) => handleArrayItemChange('slides', idx, 'sub', v)}
                />
                <InputField
                  label="Button Text"
                  value={slide.button}
                  onChange={(v) => handleArrayItemChange('slides', idx, 'button', v)}
                />
                <InputField
                  label="Button Link"
                  value={slide.link}
                  onChange={(v) => handleArrayItemChange('slides', idx, 'link', v)}
                />
              </div>
              {settings.slides.length > 1 && (
                <button
                  onClick={() => removeArrayItem('slides', idx)}
                  className="mt-3 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                >
                  Remove Slide
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem('slides')}
            className="px-3 py-2 text-sm bg-[#7c3aed] text-white rounded hover:bg-[#6d2fe2]"
          >
            + Add Slide
          </button>
        </div>
      </div>
    )
  }

  if (type === 'category_grid') {
    const configuredIds = Array.isArray(settings.selectedIds) ? settings.selectedIds : []
    const selectedIds = configuredIds.filter((id) => (
      storeCategories.some((category) => String(category.id) === String(id))
    ))
    const toggleCategory = (categoryId) => {
      const nextIds = selectedIds.includes(categoryId)
        ? selectedIds.filter((id) => id !== categoryId)
        : [...selectedIds, categoryId]
      onUpdate(section.id, { ...settings, sectionType: 'category_grid', selectedIds: nextIds })
    }

    return (
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#2a2c32] dark:text-white">
          <input
            type="checkbox"
            checked={settings.useThemeColor || false}
            onChange={(event) => handleChange('useThemeColor', event.target.checked)}
            className="h-4 w-4 accent-[#7c3aed]"
          />
          Use theme color as background
        </label>
        <SelectField
          label="Background Color"
          value={settings.backgroundColor || 'transparent'}
          onChange={(value) => handleChange('backgroundColor', value)}
          options={[
            { value: 'transparent', label: 'Transparent' },
            { value: '#ffffff', label: 'White' },
            { value: '#f3f4f6', label: 'Light Gray' },
            { value: '#111827', label: 'Charcoal' },
            { value: '#1e1b4b', label: 'Deep Indigo' },
            { value: '#172554', label: 'Navy' },
            { value: '#14532d', label: 'Forest Green' },
            { value: '#7f1d1d', label: 'Burgundy' },
          ]}
        />
        <InputField label="Section Title *" value={settings.heading || ''} onChange={(v) => handleChange('heading', v)} />
        <SelectField
          label="Title Align"
          value={settings.titleAlign || 'center'}
          onChange={(value) => handleChange('titleAlign', value)}
          options={[
            { value: 'left', label: 'Left' },
            { value: 'center', label: 'Center' },
            { value: 'right', label: 'Right' },
          ]}
        />
        <SelectField
          label="Grid Style"
          value={settings.gridStyle || 'simple_image_center_text'}
          onChange={(value) => handleChange('gridStyle', value)}
          options={[
            { value: 'simple_image_center_text', label: 'Simple Image & Center Text' },
            { value: 'image_overlay_text', label: 'Image with Overlay & Text' },
            { value: 'image_only', label: 'Image Only' },
            { value: 'image_text_arrow', label: 'Image Text & Arrow' },
          ]}
        />
        <div>
          <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Select Categories</label>
          {categoriesLoading ? (
            <div className="rounded border border-gray-200 dark:border-[#2a2a2a] p-4 text-sm text-gray-500 dark:text-gray-400">Loading categories...</div>
          ) : categoriesError ? (
            <div className="rounded border border-red-200 dark:border-red-900/50 p-4 text-sm text-red-600 dark:text-red-400">{categoriesError}</div>
          ) : storeCategories.length === 0 ? (
            <div className="rounded border border-gray-200 dark:border-[#2a2a2a] p-4 text-sm text-gray-500 dark:text-gray-400">No categories found. Please add categories in Store Categories first.</div>
          ) : (
            <div className="space-y-2 rounded border border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#0f0f0f] p-3">
              {storeCategories.map((category) => (
                <label key={category.id} className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="h-4 w-4 accent-[#7c3aed]"
                  />
                  <img src={category.image || ''} alt="" className="h-9 w-9 rounded object-cover bg-gray-200 dark:bg-gray-800" />
                  <span className="text-sm font-medium text-[#2a2c32] dark:text-white">{category.name}</span>
                </label>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Selected category IDs: {selectedIds.length}</p>
        </div>
      </div>
    )
  }

  if (type === 'product_grid') {
    const getProductId = (product) => product?.id || product?._id
    const getProductName = (product) => product?.name || product?.title || 'Unnamed product'
    const getProductImage = (product) => {
      const image = product?.image || product?.imageUrl || product?.images?.[0]?.imageUrl || product?.images?.[0]?.url || product?.images?.[0] || ''
      if (!image || image.startsWith('http') || image.startsWith('data:')) return image
      const apiOrigin = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '')
      return `${apiOrigin}/${String(image).replace(/^\//, '')}`
    }
    const getProductPrice = (product) => product?.price ?? product?.sellingPrice ?? product?.salePrice ?? ''
    const configuredIds = Array.isArray(settings.selectedProductIds) ? settings.selectedProductIds.map(String) : (settings.products || []).map(getProductId).filter(Boolean).map(String)
    const selectedProducts = configuredIds.map((id) => storeProducts.find((product) => String(getProductId(product)) === id)).filter(Boolean)
    const visibleProducts = storeProducts.filter((product) => getProductName(product).toLowerCase().includes(productSearch.toLowerCase()))
    const toggleProduct = (product) => {
      const productId = getProductId(product)
      if (!productId) return
      const id = String(productId)
      const nextIds = configuredIds.includes(id) ? configuredIds.filter((item) => item !== id) : [...configuredIds, id]
      const nextProducts = nextIds.map((item) => storeProducts.find((candidate) => String(getProductId(candidate)) === item)).filter(Boolean).map((item) => ({ ...item, name: getProductName(item), image: getProductImage(item), price: getProductPrice(item) }))
      onUpdate(section.id, { ...settings, sectionType: 'product_grid', selectedProductIds: nextIds, products: nextProducts })
    }
    return (
      <div className="space-y-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#2a2c32] dark:text-white"><input type="checkbox" checked={settings.useThemeColor || false} onChange={(event) => handleChange('useThemeColor', event.target.checked)} className="h-4 w-4 accent-[#7c3aed]" />Use theme color as background</label>
        <div><label className="mb-2 block text-sm font-semibold text-[#2a2c32] dark:text-white">Background Color</label><div className="flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-black"><input type="color" value={settings.backgroundColor && settings.backgroundColor !== 'transparent' ? settings.backgroundColor : '#ffffff'} onChange={(event) => handleChange('backgroundColor', event.target.value)} className="h-5 w-5 cursor-pointer rounded-full border-0 bg-transparent p-0" /><span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{settings.backgroundColor || 'transparent'}</span><button type="button" onClick={() => handleChange('backgroundColor', 'transparent')} className="text-gray-500 hover:text-red-500" aria-label="Clear background color">×</button></div></div>
        <div><label className="mb-2 block text-sm font-semibold text-[#2a2c32] dark:text-white">Section Title <span className="text-red-500">*</span></label><input type="text" value={settings.heading || ''} onChange={(event) => handleChange('heading', event.target.value)} placeholder="🔥 New Products" className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 dark:border-gray-700 dark:bg-black dark:text-white" /></div>
        <SelectField label="Title Align" value={settings.titleAlign || 'left'} onChange={(value) => handleChange('titleAlign', value)} options={[{ value: 'left', label: 'Left' }, { value: 'center', label: 'Center' }, { value: 'right', label: 'Right' }]} />
        <SelectField label="Grid Style" value={settings.gridStyle || 'default'} onChange={(value) => handleChange('gridStyle', value)} options={[{ value: 'default', label: 'Default' }, { value: 'simple_image_center_text', label: 'Simple Image & Center Text' }, { value: 'image_overlay_text', label: 'Image with Overlay & Text' }, { value: 'image_only', label: 'Image Only' }]} />
        <div className="relative z-30"><label className="mb-2 block text-sm font-semibold text-[#2a2c32] dark:text-white">Select Products <span className="text-red-500">*</span></label><div className="rounded border border-gray-300 bg-white p-2 dark:border-gray-700 dark:bg-black"><div className="flex flex-wrap gap-2">{selectedProducts.map((product) => <span key={getProductId(product)} className="inline-flex max-w-full items-center gap-1 rounded bg-gray-200 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-white"><img src={getProductImage(product)} alt="" className="h-5 w-5 rounded object-cover" /><span className="truncate">{getProductName(product)}</span><button type="button" onClick={() => toggleProduct(product)} className="text-gray-500 hover:text-red-500" aria-label={`Remove ${getProductName(product)}`}>×</button></span>)}<input value={productSearch} onFocus={() => setProductsOpen(true)} onChange={(event) => { setProductSearch(event.target.value); setProductsOpen(true) }} placeholder="Product 1, Product 2" className="min-w-[180px] flex-1 bg-transparent px-1 py-1 text-sm text-gray-900 outline-none dark:text-white" /></div></div>{productsOpen && <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-[#111111]">{productsLoading ? <p className="p-3 text-sm text-gray-500 dark:text-gray-400">Loading products...</p> : productsError ? <p className="p-3 text-sm text-red-500">{productsError}</p> : visibleProducts.length === 0 ? <p className="p-3 text-sm text-gray-500 dark:text-gray-400">No products found</p> : visibleProducts.map((product) => { const id = String(getProductId(product)); return <button type="button" key={id} onClick={() => toggleProduct(product)} className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"><span className="flex min-w-0 items-center gap-2"><img src={getProductImage(product)} alt="" className="h-8 w-8 rounded object-cover" /><span className="truncate">{getProductName(product)}</span></span>{configuredIds.includes(id) && <span className="text-purple-600">✓</span>}</button> })}</div>}<button type="button" onClick={() => setProductsOpen((open) => !open)} className="mt-2 text-xs text-purple-600 dark:text-purple-400">{productsOpen ? 'Close products' : 'Choose products'}</button></div>
        <div className="grid grid-cols-2 gap-3"><label className="flex items-center gap-2 text-sm font-medium text-[#2a2c32] dark:text-white"><input type="checkbox" checked={settings.showPrice ?? true} onChange={(event) => handleChange('showPrice', event.target.checked)} />Show Price</label><label className="flex items-center gap-2 text-sm font-medium text-[#2a2c32] dark:text-white"><input type="checkbox" checked={settings.showAddToCart ?? true} onChange={(event) => handleChange('showAddToCart', event.target.checked)} />Show Add to Cart</label></div>
        <div><label className="mb-2 block text-sm font-semibold text-[#2a2c32] dark:text-white">Columns</label><select value={settings.columns || 3} onChange={(event) => handleChange('columns', parseInt(event.target.value))} className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-[#2a2c32] dark:border-gray-700 dark:bg-black dark:text-white">{[2, 3, 4, 5].map((number) => <option key={number} value={number}>{number} Columns</option>)}</select></div>
      </div>
    )
  }

  if (type === 'product_grid_old') {
    return (
      <div className="space-y-4">
        <InputField label="Heading" value={settings.heading} onChange={(v) => handleChange('heading', v)} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#2a2c32] dark:text-white">
              <input
                type="checkbox"
                checked={settings.showPrice}
                onChange={(e) => handleChange('showPrice', e.target.checked)}
              />
              Show Price
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#2a2c32] dark:text-white">
              <input
                type="checkbox"
                checked={settings.showAddToCart}
                onChange={(e) => handleChange('showAddToCart', e.target.checked)}
              />
              Show Add to Cart
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Columns</label>
          <select
            value={settings.columns}
            onChange={(e) => handleChange('columns', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] text-[#2a2c32] dark:text-white rounded"
          >
            {[2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Columns</option>)}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Products</label>
          {settings.products && settings.products.length > 0 && settings.products.map((product, idx) => (
            <div key={idx} className="mb-4 p-4 bg-gray-50 dark:bg-[#0f0f0f] rounded border border-gray-200 dark:border-[#2a2a2a]">
              <h4 className="text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Product {idx + 1}</h4>
              <div className="space-y-3">
                <InputField
                  label="Product Name"
                  value={product.name || ''}
                  onChange={(v) => handleArrayItemChange('products', idx, 'name', v)}
                />
                <InputField
                  label="Price"
                  value={product.price || ''}
                  onChange={(v) => handleArrayItemChange('products', idx, 'price', v)}
                />
                <ImageUploadField
                  label="Product Image"
                  value={product.image || ''}
                  onChange={(v) => handleArrayItemChange('products', idx, 'image', v)}
                />
              </div>
              {settings.products.length > 1 && (
                <button
                  onClick={() => removeArrayItem('products', idx)}
                  className="mt-3 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                >
                  Remove Product
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem('products')}
            className="px-3 py-2 text-sm bg-[#7c3aed] text-white rounded hover:bg-[#6d2fe2]"
          >
            + Add Product
          </button>
        </div>
      </div>
    )
  }

  if (type === 'single_product') {
    return (
      <div className="space-y-4">
        <InputField label="Product Name" value={settings.name} onChange={(v) => handleChange('name', v)} />
        <InputField label="Price" value={settings.price} onChange={(v) => handleChange('price', v)} />
        <ImageUploadField label="Product Image" value={settings.image} onChange={(v) => handleChange('image', v)} />
        <TextAreaField label="Description" value={settings.description} onChange={(v) => handleChange('description', v)} />
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-[#2a2c32] dark:text-white">
            <input
              type="checkbox"
              checked={settings.addToCart}
              onChange={(e) => handleChange('addToCart', e.target.checked)}
            />
            Show Add to Cart
          </label>
        </div>
      </div>
    )
  }

  if (type === 'layout_editor') {
    return (
      <div className="space-y-4">
        <TextAreaField label="Content" value={settings.content} onChange={(v) => handleChange('content', v)} />
      </div>
    )
  }

  if (type === 'hero') {
    return (
      <div className="space-y-4">
        <InputField label="Heading" value={settings.heading} onChange={(v) => handleChange('heading', v)} />
        <InputField label="Subheading" value={settings.subheading} onChange={(v) => handleChange('subheading', v)} />
        <ImageUploadField label="Background Image (Optional)" value={settings.backgroundImage} onChange={(v) => handleChange('backgroundImage', v)} />
        <div>
          <label className="block text-sm font-medium text-[#2a2c32] dark:text-white mb-2">Background Style</label>
          <select
            value={settings.backgroundColor}
            onChange={(e) => handleChange('backgroundColor', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] text-[#2a2c32] dark:text-white rounded"
          >
            <option value="from-[#7c3aed] to-[#6d2fe2]">Purple Gradient</option>
            <option value="from-blue-500 to-blue-600">Blue Gradient</option>
            <option value="from-gray-900 to-gray-800">Dark Gradient</option>
            <option value="bg-white">White</option>
            <option value="bg-gray-900">Black</option>
          </select>
        </div>
        <InputField label="Button Text" value={settings.ctaText} onChange={(v) => handleChange('ctaText', v)} />
        <InputField label="Button Link" value={settings.ctaLink} onChange={(v) => handleChange('ctaLink', v)} />
      </div>
    )
  }

  if (type === 'footer') {
    return (
      <div className="space-y-4">
        <InputField label="Company Name" value={settings.companyName} onChange={(v) => handleChange('companyName', v)} />
        <TextAreaField label="Company Description" value={settings.companyDescription} onChange={(v) => handleChange('companyDescription', v)} />
        <InputField label="Contact Email" value={settings.contactEmail} onChange={(v) => handleChange('contactEmail', v)} />
        <InputField label="Contact Phone" value={settings.contactPhone} onChange={(v) => handleChange('contactPhone', v)} />
        <InputField label="Copyright Text" value={settings.copyright} onChange={(v) => handleChange('copyright', v)} />
        <div>
          <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Footer Links</label>
          {settings.links && settings.links.map((link, idx) => (
            <div key={idx} className="mb-3 p-3 bg-gray-50 dark:bg-[#0f0f0f] rounded border border-gray-200 dark:border-[#2a2a2a]">
              <h4 className="text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Link {idx + 1}</h4>
              <InputField
                label="Link Label"
                value={link.label}
                onChange={(v) => handleArrayItemChange('links', idx, 'label', v)}
              />
              <InputField
                label="Link URL"
                value={link.url}
                onChange={(v) => handleArrayItemChange('links', idx, 'url', v)}
              />
              {settings.links.length > 1 && (
                <button
                  onClick={() => removeArrayItem('links', idx)}
                  className="mt-2 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                >
                  Remove Link
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem('links')}
            className="px-3 py-2 text-sm bg-[#7c3aed] text-white rounded hover:bg-[#6d2fe2]"
          >
            + Add Link
          </button>
        </div>
      </div>
    )
  }

  if (type === 'navbar') {
    return (
      <div className="space-y-4">
        <InputField label="Logo/Store Name" value={settings.logo} onChange={(v) => handleChange('logo', v)} />
        <div>
          <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Navigation Links</label>
          {settings.navItems && settings.navItems.map((item, idx) => (
            <div key={idx} className="mb-3 p-3 bg-gray-50 dark:bg-[#0f0f0f] rounded border border-gray-200 dark:border-[#2a2a2a]">
              <h4 className="text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">Link {idx + 1}</h4>
              <InputField
                label="Link Label"
                value={item.label}
                onChange={(v) => handleArrayItemChange('navItems', idx, 'label', v)}
              />
              <InputField
                label="Link URL"
                value={item.url}
                onChange={(v) => handleArrayItemChange('navItems', idx, 'url', v)}
              />
              {settings.navItems.length > 1 && (
                <button
                  onClick={() => removeArrayItem('navItems', idx)}
                  className="mt-2 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                >
                  Remove Link
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem('navItems')}
            className="px-3 py-2 text-sm bg-[#7c3aed] text-white rounded hover:bg-[#6d2fe2]"
          >
            + Add Link
          </button>
        </div>
      </div>
    )
  }

  return null
}

// Image Upload Component with Crop
/**
 * ImageUploadField Component
 * Handles image upload with integrated crop modal
 * Supports file upload, URL input, and image cropping
 * Returns base64 encoded cropped image
 */
const ImageUploadField = ({ label, value, onChange }) => {
  const fileInputRef = React.useRef(null)
  const [preview, setPreview] = React.useState(value)
  const [showCropModal, setShowCropModal] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(null)

  /**
   * Handle file selection from input
   */
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target.result)
        setShowCropModal(true)
      }
      reader.readAsDataURL(file)
    }
  }

  /**
   * Handle crop completion - receives base64 from modal
   */
  const handleCropComplete = (croppedImage) => {
    onChange(croppedImage)
    setPreview(croppedImage)
    setShowCropModal(false)
    setSelectedImage(null)
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  /**
   * Handle crop modal cancel
   */
  const handleCropCancel = () => {
    setShowCropModal(false)
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  /**
   * Remove uploaded image
   */
  const handleRemoveImage = () => {
    onChange('')
    setPreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#2a2c32] dark:text-white mb-2">{label}</label>
      
      <div className="flex gap-3 items-start">
        {/* Upload Button & Hidden File Input */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Select image to crop"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 border border-purple-600 text-purple-600 bg-purple-50 dark:bg-[#1a1a1a] rounded-lg font-medium hover:bg-purple-100 dark:hover:bg-[#222222] transition-colors flex items-center justify-center gap-2"
          >
            <span>📁</span>
            <span>Choose & Crop Image</span>
          </button>
        </div>

        {/* Preview Thumbnail */}
        {preview && (
          <div className="relative flex-shrink-0">
            <img
              src={preview}
              alt="Cropped preview"
              className="w-16 h-16 object-cover rounded-lg border-2 border-purple-600 shadow-md"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 shadow-md font-bold"
              title="Remove image"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* URL Fallback Input */}
      <div className="mt-3">
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          Or paste image URL (fallback)
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setPreview(e.target.value)
          }}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] text-[#2a2c32] dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-500"
        />
      </div>

      {/* Image Crop Modal - Using new ImageCropModal component */}
      <ImageCropModal
        isOpen={showCropModal}
        imageUrl={selectedImage}
        onCropComplete={handleCropComplete}
        onCancel={handleCropCancel}
        aspectRatio="free"
      />
    </div>
  )
}

// Input Component
const InputField = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-[#2a2c32] dark:text-white mb-2">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-[#e5e7eb] dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] text-[#2a2c32] dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
    />
  </div>
)

const SelectField = ({ label, value, onChange, options }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-[#2a2c32] dark:text-white mb-2">{label}</label>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full px-3 py-2 border border-[#e5e7eb] dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] text-[#2a2c32] dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
    >
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </div>
)

// Textarea Component
const TextAreaField = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-[#2a2c32] dark:text-white mb-2">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="3"
      className="w-full px-3 py-2 border border-[#e5e7eb] dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] text-[#2a2c32] dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
    />
  </div>
)

// Preview Renderer - E-commerce Website Layout
const PreviewRenderer = ({ sections, storeCategories = [] }) => {
  const heroSection = sections.find(s => s.type === 'hero')
  const footerSection = sections.find(s => s.type === 'footer')
  const contentSections = sections.filter(s => s.type !== 'hero' && s.type !== 'footer')

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section - Editable or Default */}
      {heroSection ? (
        <PreviewSection section={heroSection} storeCategories={storeCategories} />
      ) : (
        <div className="w-full h-64 bg-gradient-to-r from-[#7c3aed] to-[#6d2fe2] flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Welcome to Our Store</h1>
            <p className="text-lg opacity-90">Explore our amazing collection</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {contentSections.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">🛍️</div>
            <p className="text-gray-500 text-lg">No sections added yet</p>
            <p className="text-gray-400 text-sm">Add sections from the builder to display them here</p>
          </div>
        ) : (
          <div className="space-y-12">
            {contentSections.map(section => (
              <div key={section.id}>
                <PreviewSection section={section} storeCategories={storeCategories} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer - Editable or Default */}
      {footerSection ? (
        <PreviewSection section={footerSection} storeCategories={storeCategories} />
      ) : (
        <div className="w-full bg-gray-900 text-white mt-12">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">About Us</h3>
                <p className="text-gray-400 text-sm">Your trusted online shopping destination</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Home</a></li>
                  <li><a href="#" className="hover:text-white transition">Products</a></li>
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                  <li><a href="#" className="hover:text-white transition">Shipping</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Contact</h3>
                <p className="text-gray-400 text-sm">Email: info@store.com</p>
                <p className="text-gray-400 text-sm">Phone: +1-234-567-8900</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
              <p>&copy; 2026 Your Store. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Image Slider Preview Component with Auto-Sliding
const ImageSliderPreview = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds
    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const slide = slides[currentSlide]

  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-gray-300">
      {/* Main Slide */}
      <div className="relative w-full h-96 flex items-center justify-center bg-gray-200">
        {slide.image ? (
          <img src={slide.image} alt={`slide ${currentSlide + 1}`} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-500 flex flex-col items-center gap-2">
            <div className="text-4xl">🎞️</div>
            <p>Slide {currentSlide + 1} - No Image</p>
          </div>
        )}
        
        {/* Slide Content Overlay */}
        {(slide.heading || slide.sub || slide.button) && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-6">
            {slide.heading && <h3 className="text-2xl font-bold mb-2">{slide.heading}</h3>}
            {slide.sub && <p className="text-sm mb-4">{slide.sub}</p>}
            {slide.button && (
              <a href={slide.link || '#'} className="inline-block px-6 py-2 bg-[#7c3aed] text-white rounded hover:bg-[#6d2fe2] transition-colors">
                {slide.button}
              </a>
            )}
          </div>
        )}

        {/* Previous Button */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
        >
          ◀
        </button>

        {/* Next Button */}
        <button
          onClick={goToNextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
        >
          ▶
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 py-3 bg-gray-100 dark:bg-[#0B1020]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-[#7c3aed] w-8'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 py-2 bg-gray-50 dark:bg-[#0B1020]">
        Slide {currentSlide + 1} of {slides.length}
      </div>
    </div>
  )
}

// Individual Section Preview
const PreviewSection = ({ section, storeCategories = [] }) => {
  const { type, settings } = section

  if (type === 'full_image') {
    return (
      <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        {settings.imageUrl ? (
          <img src={settings.imageUrl} alt={settings.altText} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🖼️</div>
            <p>Full Image Preview</p>
          </div>
        )}
      </div>
    )
  }

  if (type === 'image_content' || type === 'side_image') {
    return (
      <div className="py-12">
        <div className={`flex gap-8 items-center ${type === 'side_image' ? 'flex-row' : 'flex-col'}`}>
          {settings.image && (
            <div className="flex-shrink-0">
              <img src={settings.image} alt="" className="w-80 h-64 object-cover rounded-lg shadow-md" />
            </div>
          )}
          <div className="flex-1">
            {settings.heading && <h2 className="text-3xl font-bold text-gray-900 mb-4">{settings.heading}</h2>}
            {settings.text && <p className="text-gray-700 text-lg mb-6 leading-relaxed">{settings.text}</p>}
            {settings.buttonText && (
              <a href={settings.buttonLink} className="inline-block px-8 py-3 bg-[#7c3aed] text-white font-semibold rounded-lg hover:bg-[#6d2fe2] transition-colors">
                {settings.buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'faq') {
    return (
      <div className="py-8">
        {settings.heading && <h2 className="text-3xl font-bold text-gray-900 mb-8">{settings.heading}</h2>}
        <div className="max-w-3xl space-y-4">
          {settings.items && settings.items.map((item, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="font-semibold text-gray-900 text-lg mb-3">{item.q || 'Question'}</div>
              <div className="text-gray-700 leading-relaxed">{item.a || 'Answer'}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'video') {
    return (
      <div className="py-8">
        {settings.heading && <h2 className="text-3xl font-bold text-gray-900 mb-6">{settings.heading}</h2>}
        <div className="w-full bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden" style={{ paddingBottom: '56.25%', position: 'relative' }}>
          {settings.videoUrl ? (
            <video src={settings.videoUrl} controls className="w-full h-full absolute top-0 left-0" />
          ) : (
            <div className="text-gray-500 flex flex-col items-center gap-3">
              <div className="text-5xl">🎥</div>
              <p>Video Preview</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (type === 'image_slider') {
    return (
      <div className="py-8">
        {settings.slides && settings.slides.length > 0 && (
          <ImageSliderPreview slides={settings.slides} />
        )}
      </div>
    )
  }

  if (type === 'category_grid') {
    const selectedIds = settings.selectedIds || []
    const selectedCategories = selectedIds
      .map((id) => storeCategories.find((category) => String(category.id) === String(id)))
      .filter(Boolean)

    const gridStyle = settings.gridStyle || 'simple_image_center_text'
    const titleAlign = settings.titleAlign || 'center'
    const sectionBackground = settings.useThemeColor ? '#7c3aed' : (settings.backgroundColor || 'transparent')

    return (
      <div className="-mx-6 px-6 py-8" style={{ backgroundColor: sectionBackground }}>
        {settings.heading && <h2 className={`mb-8 text-3xl font-bold text-gray-900 ${titleAlign === 'left' ? 'text-left' : titleAlign === 'right' ? 'text-right' : 'text-center'}`}>{settings.heading}</h2>}
        <div className="grid grid-cols-3 gap-6">
          {selectedCategories.length > 0 ? (
            selectedCategories.map((cat) => (
              <div key={cat.id} className="text-center group cursor-pointer">
                <div className={`relative flex min-h-40 max-h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-200 mb-4 group-hover:shadow-lg transition-shadow ${gridStyle === 'image_only' ? 'mb-0' : ''}`}>
                  {cat.image ? (
                    <img src={cat.image} alt="" className="h-auto max-h-80 w-full object-contain" />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                  {gridStyle === 'image_overlay_text' && <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-white">{cat.name}</div>}
                </div>
                {gridStyle === 'simple_image_center_text' && <p className="font-semibold text-gray-900">{cat.name || 'Category'}</p>}
                {gridStyle === 'image_text_arrow' && <p className="flex items-center justify-center gap-2 font-semibold text-gray-900">{cat.name || 'Category'} <span>→</span></p>}
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              <p>No categories added</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (type === 'product_grid') {
    return (
      <div className="py-8">
        {settings.heading && <h2 className="text-3xl font-bold text-gray-900 mb-8">{settings.heading}</h2>}
        <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${settings.columns}, 1fr)` }}>
          {settings.products && settings.products.length > 0 ? (
            settings.products.map((product, idx) => (
              <div key={idx} className="bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 text-center">No Image</div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2">{product.name || 'Product Name'}</p>
                  {settings.showPrice && product.price && (
                    <p className="text-[#7c3aed] font-bold text-lg mb-3">{product.price}</p>
                  )}
                  {settings.showAddToCart && (
                    <button className="w-full px-4 py-2 bg-[#7c3aed] text-white text-sm font-medium rounded-lg hover:bg-[#6d2fe2] transition-colors">
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No products added yet</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (type === 'single_product') {
    return (
      <div className="py-8 max-w-4xl">
        <div className="grid grid-cols-2 gap-12">
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {settings.image ? (
              <img src={settings.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 flex flex-col items-center gap-2">
                <div className="text-4xl">📦</div>
                <p>Product Image</p>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            {settings.name && <h2 className="text-3xl font-bold text-gray-900 mb-3">{settings.name}</h2>}
            {settings.price && <p className="text-3xl font-bold text-[#7c3aed] mb-6">{settings.price}</p>}
            {settings.description && <p className="text-gray-700 mb-8 leading-relaxed">{settings.description}</p>}
            {settings.addToCart && (
              <button className="self-start px-8 py-3 bg-[#7c3aed] text-white font-semibold rounded-lg hover:bg-[#6d2fe2] transition-colors">
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'hero') {
    const bgClass = settings.backgroundColor.includes('from-') ? `bg-gradient-to-r ${settings.backgroundColor}` : settings.backgroundColor
    return (
      <div className={`w-full h-72 flex items-center justify-center text-white rounded-lg overflow-hidden relative ${bgClass}`}>
        {settings.backgroundImage && (
          <img src={settings.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center px-6">
          {settings.heading && <h1 className="text-4xl font-bold mb-2">{settings.heading}</h1>}
          {settings.subheading && <p className="text-lg opacity-90 mb-6">{settings.subheading}</p>}
          {settings.ctaText && (
            <a href={settings.ctaLink} className="inline-block px-8 py-3 bg-white text-[#7c3aed] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              {settings.ctaText}
            </a>
          )}
        </div>
      </div>
    )
  }

  if (type === 'footer') {
    return (
      <footer className="w-full bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{settings.companyName}</h3>
              <p className="text-gray-400 text-sm">{settings.companyDescription}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {settings.links && settings.links.map((link, idx) => (
                  <li key={idx}><a href={link.url} className="hover:text-white transition">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-gray-400 text-sm">Email: {settings.contactEmail}</p>
              <p className="text-gray-400 text-sm">Phone: {settings.contactPhone}</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
            <p>{settings.copyright}</p>
          </div>
        </div>
      </footer>
    )
  }

  if (type === 'navbar') {
    return (
      <nav className="w-full bg-gray-900 text-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#7c3aed]">{settings.logo}</h1>
          <div className="flex gap-8 items-center">
            {settings.navItems && settings.navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    )
  }

  return (
    <div className="p-6 bg-white dark:bg-[#1E293B]">
      <p className="text-gray-500">Preview not available for this section type</p>
    </div>
  )
}

export default PageEditor
