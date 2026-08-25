import React, { useState, useEffect } from 'react'
import { Edit2, Trash2, Upload, X } from 'lucide-react'

const Appearance = () => {
  // Color Shades for Primary Color
  const colorShades = [
    '#dbeafe', // light
    '#bfdbfe',
    '#93c5fd',
    '#60a5fa',
    '#3b82f6', // Blanxer Blue (default)
    '#2563eb',
    '#1d4ed8',
    '#1e40af',
    '#1e3a8a', // dark
  ]

  // Font Family Options
  const fontFamilies = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins']

  // Image Ratio Options
  const imageRatios = ['1:1', '4:5', '9:16', '16:9']

  // Navigation Styles
  const navStyles = ['Navbar Basic', 'Navbar Centered', 'Navbar Transparent', 'Navbar Sticky']

  // Popup Locations
  const popupLocations = ['Homepage', 'All Pages', 'Product Pages', 'Category Pages']

  // Tab State
  const [activeTab, setActiveTab] = useState('branding')

  // Link Modal State
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [selectedLinkType, setSelectedLinkType] = useState('general')

  // Top Bar Text Modal State
  const [showTopBarModal, setShowTopBarModal] = useState(false)
  const [tempTopBarText, setTempTopBarText] = useState('')
  const [tempTopBarLink, setTempTopBarLink] = useState('')

  // Save State
  const [saveMessage, setSaveMessage] = useState('')
  const [showSaveMessage, setShowSaveMessage] = useState(false)

  // State Management
  const [appearance, setAppearance] = useState({
    primaryColor: localStorage.getItem('appearance_primaryColor') || '#3b82f6',
    fontFamily: localStorage.getItem('appearance_fontFamily') || 'Inter',
    brandName: localStorage.getItem('appearance_brandName') || 'My Store',
    brandLogo: localStorage.getItem('appearance_brandLogo') || null,
    brandFavicon: localStorage.getItem('appearance_brandFavicon') || null,
    imageRatio: localStorage.getItem('appearance_imageRatio') || '1:1',
    // Components
    topBarText: localStorage.getItem('appearance_topBarText') || 'Free Delivery All Over Nepal',
    topBarLink: localStorage.getItem('appearance_topBarLink') ? JSON.parse(localStorage.getItem('appearance_topBarLink')) : { type: 'general', value: '' },
    popupEnabled: localStorage.getItem('appearance_popupEnabled') === 'true' || false,
    popupImage: localStorage.getItem('appearance_popupImage') || null,
    popupLocation: localStorage.getItem('appearance_popupLocation') || 'Homepage',
    navStyle: localStorage.getItem('appearance_navStyle') || 'Navbar Basic',
    // Dark Mode
    darkMode: localStorage.getItem('appearance_darkMode') === 'true' || false,
  })

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('appearance_primaryColor', appearance.primaryColor)
    localStorage.setItem('appearance_fontFamily', appearance.fontFamily)
    localStorage.setItem('appearance_brandName', appearance.brandName)
    localStorage.setItem('appearance_imageRatio', appearance.imageRatio)
    localStorage.setItem('appearance_topBarText', appearance.topBarText)
    localStorage.setItem('appearance_topBarLink', JSON.stringify(appearance.topBarLink))
    localStorage.setItem('appearance_popupEnabled', appearance.popupEnabled)
    localStorage.setItem('appearance_popupLocation', appearance.popupLocation)
    localStorage.setItem('appearance_navStyle', appearance.navStyle)
    localStorage.setItem('appearance_darkMode', appearance.darkMode)
    if (appearance.brandLogo) {
      localStorage.setItem('appearance_brandLogo', appearance.brandLogo)
    }
    if (appearance.brandFavicon) {
      localStorage.setItem('appearance_brandFavicon', appearance.brandFavicon)
    }
    if (appearance.popupImage) {
      localStorage.setItem('appearance_popupImage', appearance.popupImage)
    }
  }, [appearance])

  // Apply dark mode to document
  useEffect(() => {
    if (appearance.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [appearance.darkMode])

  // Handle Color Change
  const handleColorChange = (e) => {
    setAppearance({ ...appearance, primaryColor: e.target.value })
  }

  // Handle Font Family Change
  const handleFontChange = (e) => {
    setAppearance({ ...appearance, fontFamily: e.target.value })
  }

  // Handle Brand Name Change
  const handleBrandNameChange = (e) => {
    setAppearance({ ...appearance, brandName: e.target.value })
  }

  // Handle Image Ratio Change
  const handleImageRatioChange = (e) => {
    setAppearance({ ...appearance, imageRatio: e.target.value })
  }

  // Handle Image Upload (Logo/Favicon)
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64String = event.target.result
        if (type === 'logo') {
          setAppearance({ ...appearance, brandLogo: base64String })
        } else if (type === 'favicon') {
          setAppearance({ ...appearance, brandFavicon: base64String })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Delete Image
  const deleteImage = (type) => {
    if (type === 'logo') {
      setAppearance({ ...appearance, brandLogo: null })
      localStorage.removeItem('appearance_brandLogo')
    } else if (type === 'favicon') {
      setAppearance({ ...appearance, brandFavicon: null })
      localStorage.removeItem('appearance_brandFavicon')
    } else if (type === 'popup') {
      setAppearance({ ...appearance, popupImage: null })
      localStorage.removeItem('appearance_popupImage')
    }
  }

  // Component Handlers
  const handleTopBarTextChange = (e) => {
    setAppearance({ ...appearance, topBarText: e.target.value })
  }

  const handlePopupImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAppearance({ ...appearance, popupImage: event.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePopupLocationChange = (e) => {
    setAppearance({ ...appearance, popupLocation: e.target.value })
  }

  const handleNavStyleChange = (e) => {
    setAppearance({ ...appearance, navStyle: e.target.value })
  }

  const handlePopupToggle = () => {
    setAppearance({ ...appearance, popupEnabled: !appearance.popupEnabled })
  }

  const handleLinkSelection = (type, value) => {
    setAppearance({ ...appearance, topBarLink: { type, value } })
    setShowLinkModal(false)
  }

  // Handle Open Top Bar Modal
  const handleOpenTopBarModal = () => {
    setTempTopBarText(appearance.topBarText)
    setTempTopBarLink(appearance.topBarLink.value || '')
    setShowTopBarModal(true)
  }

  // Handle Save Top Bar Text Modal
  const handleSaveTopBarModal = () => {
    setAppearance({
      ...appearance,
      topBarText: tempTopBarText,
      topBarLink: { type: 'custom', value: tempTopBarLink },
    })
    setShowTopBarModal(false)
    setSaveMessage('Top Bar Text updated successfully!')
    setShowSaveMessage(true)
    setTimeout(() => setShowSaveMessage(false), 3000)
  }

  // Handle Save
  const handleSave = () => {
    setSaveMessage('Changes saved successfully!')
    setShowSaveMessage(true)
    setTimeout(() => {
      setShowSaveMessage(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black p-6 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Appearance</h1>
          <p className="text-gray-600 dark:text-gray-300">Customize your store's look and feel</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setActiveTab('branding')}
            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'branding' ? 'text-gray-900 dark:text-white border-purple-600' : 'text-gray-600 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-700'}`}
          >
            Branding
          </button>
          <button 
            onClick={() => setActiveTab('components')}
            className={`px-6 py-3 font-medium border-b-2 transition ${activeTab === 'components' ? 'text-gray-900 dark:text-white border-purple-600' : 'text-gray-600 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-700'}`}
          >
            Components
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white dark:bg-black rounded-lg shadow-sm p-8 space-y-8 transition-colors duration-200">
          {activeTab === 'branding' && (
            <>
              {/* Branding Tab Content */}

          {/* Primary Color */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">Primary Color</label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Blanxer Blue</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Color Shades Display */}
              <div className="flex gap-2">
                {colorShades.map((shade) => (
                  <button
                    key={shade}
                    onClick={() => setAppearance({ ...appearance, primaryColor: shade })}
                    className={`w-8 h-8 rounded-full transition-all ${
                      appearance.primaryColor === shade ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                    }`}
                    style={{ backgroundColor: shade }}
                    title={shade}
                  />
                ))}
              </div>
              {/* Color Picker Button */}
              <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition">
                <Edit2 size={18} />
                <input
                  type="color"
                  value={appearance.primaryColor}
                  onChange={handleColorChange}
                  className="w-8 h-8 cursor-pointer opacity-0 absolute"
                />
              </label>
            </div>
          </div>

          {/* Font Family */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
            <label className="block text-lg font-semibold text-gray-900 dark:text-white">Font Family</label>
            <div className="flex items-center gap-4">
              <select
                value={appearance.fontFamily}
                onChange={handleFontChange}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-black text-gray-900 dark:text-white"
              >
                {fontFamilies.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                <Edit2 size={18} />
              </button>
            </div>
          </div>

          {/* Brand Name */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
            <label className="block text-lg font-semibold text-gray-900 dark:text-white">Brand Name</label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={appearance.brandName}
                onChange={handleBrandNameChange}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-black text-gray-900 dark:text-white min-w-64"
              />
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                <Edit2 size={18} />
              </button>
            </div>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-1">Brand Logo</label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Best Fit: 725 x 145</p>
            </div>
            <div className="flex items-center gap-4">
              {appearance.brandLogo && (
                <div className="w-20 h-20 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-black flex items-center justify-center">
                  <img
                    src={appearance.brandLogo}
                    alt="Brand Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition">
                <Edit2 size={18} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  className="hidden"
                />
              </label>
              {appearance.brandLogo && (
                <button
                  onClick={() => deleteImage('logo')}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Brand Favicon */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-1">Brand Favicon</label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Best Fit: 96 x 96</p>
            </div>
            <div className="flex items-center gap-4">
              {appearance.brandFavicon && (
                <div className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-black flex items-center justify-center">
                  <img
                    src={appearance.brandFavicon}
                    alt="Brand Favicon"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition">
                <Edit2 size={18} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'favicon')}
                  className="hidden"
                />
              </label>
              {appearance.brandFavicon && (
                <button
                  onClick={() => deleteImage('favicon')}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Image Ratio */}
          <div className="flex items-center justify-between">
            <label className="block text-lg font-semibold text-gray-900 dark:text-white">Image Ratio</label>
            <div className="flex items-center gap-4">
              <select
                value={appearance.imageRatio}
                onChange={handleImageRatioChange}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-black text-gray-900 dark:text-white min-w-40"
              >
                {imageRatios.map((ratio) => (
                  <option key={ratio} value={ratio}>
                    {ratio}
                  </option>
                ))}
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                <Edit2 size={18} />
              </button>
            </div>
          </div>

          {/* Display current settings */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300">
            <p>Selected Image Ratio: <strong>{appearance.imageRatio}</strong></p>
          </div>

          {/* Save Button - Branding Tab */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Save Changes
            </button>
            {showSaveMessage && (
              <div className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium">
                ✓ {saveMessage}
              </div>
            )}
          </div>
            </>
          )}

          {activeTab === 'components' && (
            <>
              {/* Components Tab Content */}

              {/* Top Bar Text */}
              <div className="pb-8 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Bar Text</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Message:</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{appearance.topBarText}</p>
                      {appearance.topBarLink.value && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Link: {appearance.topBarLink.value}</p>
                      )}
                    </div>
                    <button
                      onClick={handleOpenTopBarModal}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                    >
                      <Edit2 size={18} />
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              {/* Popup Modal */}
              <div className="pb-8 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popup Modal</h3>
                <div className="space-y-6">
                  {/* Toggle Switch */}
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold text-gray-900 dark:text-white">Enable Popup</label>
                    <button
                      onClick={handlePopupToggle}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                        appearance.popupEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                          appearance.popupEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Conditional Content */}
                  {appearance.popupEnabled && (
                    <>
                      {/* Image Upload */}
                      <div>
                        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">Popup Image</label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Best Fit: 600 x 400</p>
                        <div className="flex items-center gap-4">
                          {appearance.popupImage && (
                            <div className="w-32 h-24 rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden bg-white dark:bg-black flex items-center justify-center">
                              <img
                                src={appearance.popupImage}
                                alt="Popup"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition">
                            <Edit2 size={18} />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePopupImageUpload}
                              className="hidden"
                            />
                          </label>
                          {appearance.popupImage && (
                            <button
                              onClick={() => deleteImage('popup')}
                              className="flex items-center gap-2 px-4 py-2 border-2 border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Show Popup On */}
                      <div>
                        <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">Show Popup On</label>
                        <select
                          value={appearance.popupLocation}
                          onChange={handlePopupLocationChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-black text-gray-900 dark:text-white"
                        >
                          {popupLocations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Navigation</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">Navbar Style</label>
                    <select
                      value={appearance.navStyle}
                      onChange={handleNavStyleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-black text-gray-900 dark:text-white"
                    >
                      {navStyles.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Save Button - Components Tab */}
              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  Save Changes
                </button>
                {showSaveMessage && (
                  <div className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium">
                    ✓ {saveMessage}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Link Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select Link</h2>
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Link Type</label>
                  <select
                    value={selectedLinkType}
                    onChange={(e) => setSelectedLinkType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-black text-gray-900 dark:text-white"
                  >
                    <option value="general">General</option>
                    <option value="category">Category</option>
                    <option value="page">Page</option>
                    <option value="product">Product</option>
                    <option value="custom">Custom URL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {selectedLinkType === 'custom' ? 'URL' : 'Select'}
                  </label>
                  {selectedLinkType === 'custom' ? (
                    <input
                      type="text"
                      placeholder="https://example.com"
                      onChange={(e) => setSelectedLinkType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-black text-gray-900 dark:text-white"
                    />
                  ) : (
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-black text-gray-900 dark:text-white">
                      <option value="">Choose {selectedLinkType}...</option>
                      <option value="home">Home</option>
                      <option value="about">About</option>
                      <option value="contact">Contact</option>
                    </select>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowLinkModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-black transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleLinkSelection(selectedLinkType, 'Sample Value')}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar Text Modal */}
        {showTopBarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Change Top Bar Text</h2>
                <button
                  onClick={() => setShowTopBarModal(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Top Bar Text Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Top Bar Text
                  </label>
                  <input
                    type="text"
                    value={tempTopBarText}
                    onChange={(e) => setTempTopBarText(e.target.value)}
                    placeholder="Enter top bar message"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-black text-gray-900 dark:text-white"
                  />
                </div>

                {/* Goto Link Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Goto link when clicked
                  </label>
                  <input
                    type="text"
                    value={tempTopBarLink}
                    onChange={(e) => setTempTopBarLink(e.target.value)}
                    placeholder="eg. /products"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowTopBarModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-black transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTopBarModal}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Appearance
