import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Pages = () => {
  const navigate = useNavigate()
  const [pagesData, setPagesData] = useState([])

  // Load pages from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('pagesData')
    if (stored) {
      setPagesData(JSON.parse(stored))
    } else {
      // Initialize with default Landing page
      const defaultPages = [
        {
          id: 1,
          title: 'Landing',
          slug: 'landing',
          status: 'draft',
          visibility: 'public',
          type: 'landing',
          sections: [],
          sectionsCount: 0
        }
      ]
      setPagesData(defaultPages)
      localStorage.setItem('pagesData', JSON.stringify(defaultPages))
    }
  }, [])

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'draft',
    visibility: 'public',
    type: 'landing'
  })

  const handleAddPage = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({
      title: '',
      slug: '',
      status: 'draft',
      visibility: 'public',
      type: 'landing'
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Auto-generate slug
    if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/\s+/g, '-')
      }))
    }
  }

  const handleCreatePage = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Please enter a page title')
      return
    }
    const newPage = {
      id: Math.max(...pagesData.map(p => p.id), 0) + 1,
      ...formData,
      sections: [],
      sectionsCount: 0
    }
    const updated = [...pagesData, newPage]
    setPagesData(updated)
    localStorage.setItem('pagesData', JSON.stringify(updated))
    handleCloseModal()
  }

  const handleEditPage = (page) => {
    navigate(`/dashboard/pages/${page.id}/editor`)
  }

  const handleDeletePage = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const updated = pagesData.filter(p => p.id !== id)
      setPagesData(updated)
      localStorage.setItem('pagesData', JSON.stringify(updated))
    }
  }

  const handleOpenLanding = (page) => {
    console.log('Opening page:', page.id, page.title)
    navigate(`/dashboard/pages/${page.id}/editor`, { replace: false })
  }

  return (
    <div className="min-h-screen bg-[#f6f8fa] dark:bg-[#0a0a0a] p-5 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[28px] font-bold text-[#2a2c32] dark:text-white">Pages</h1>
        <button
          onClick={handleAddPage}
          className="inline-flex items-center gap-2 rounded-lg bg-[#7c3aed] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6d2fe2] transition-colors"
        >
          <span className="text-lg leading-none">+</span>
          Add Page
        </button>
      </div>

      <div className="space-y-4">
        {pagesData.map(page => (
          <div
            key={page.id}
            className="flex items-center justify-between rounded-lg border border-[#e5e7eb] dark:border-[#1a1a1a] bg-white dark:bg-[#111111] px-4 py-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="flex-1 cursor-pointer hover:opacity-75 transition-opacity"
              onClick={() => handleOpenLanding(page)}
            >
              <div className="text-[16px] font-semibold text-[#2a2c32] dark:text-white">{page.title}</div>
              <div className="mt-1 text-[13px] text-[#6b7280] dark:text-[#9CA3AF]">{page.sections?.length || 0} sections</div>
            </div>

            {page.title === 'Landing' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditPage(page)}
                  className="px-3 py-2 text-sm font-medium text-[#7c3aed] dark:text-[#818CF8] hover:bg-[#f3f4f6] dark:hover:bg-[#1a1a1a] rounded-md transition-colors"
                >
                  Open
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditPage(page)}
                  className="px-3 py-2 text-sm font-medium text-[#7c3aed] dark:text-[#818CF8] hover:bg-[#f3f4f6] dark:hover:bg-[#1a1a1a] rounded-md transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePage(page.id, page.title)}
                  className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-[#fef2f2] dark:hover:bg-[#3d0f0f] rounded-md transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-[#e5e7eb] dark:border-[#1a1a1a] bg-[#fef3c7] dark:bg-[#1a1a1a] px-4 py-3 text-sm text-[#92400e] dark:text-[#FCD34D]">
        <span className="font-semibold">Note:</span>{' '}
        Click on a page to edit it. Create a page and name it 'Landing' to replace the existing Default Home Page
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#111111] rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-[#e5e7eb] dark:border-[#1a1a1a]">
              <h2 className="text-[20px] font-bold text-[#2a2c32] dark:text-white">Add New Page</h2>
            </div>

            <form onSubmit={handleCreatePage} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter page title"
                  className="w-full px-3 py-2 border border-[#e5e7eb] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] text-[#2a2c32] dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="auto-generated"
                  className="w-full px-3 py-2 border border-[#e5e7eb] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] text-[#2a2c32] dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#e5e7eb] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] text-[#2a2c32] dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-2">
                    Visibility
                  </label>
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#e5e7eb] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] text-[#2a2c32] dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">
                  Page Type
                </label>
                <div className="space-y-2">
                  <label className={`flex items-center p-3 border border-[#e5e7eb] dark:border-[#1a1a1a] rounded-md cursor-pointer hover:bg-[#f9fafb] dark:hover:bg-[#0a0a0a] transition-colors ${formData.type === 'regular' ? 'bg-white dark:bg-[#111111]' : 'bg-transparent'}`}>
                    <input
                      type="radio"
                      name="type"
                      value="regular"
                      checked={formData.type === 'regular'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#7c3aed]"
                    />
                    <span className="ml-3 text-sm font-medium text-[#2a2c32] dark:text-white">Regular Page</span>
                  </label>

                  <label className={`flex items-center p-3 border border-[#e5e7eb] dark:border-[#1a1a1a] rounded-md cursor-pointer hover:bg-[#f9fafb] dark:hover:bg-[#0a0a0a] transition-colors ${formData.type === 'landing' ? 'bg-white dark:bg-[#111111]' : 'bg-transparent'}`}>
                    <input
                      type="radio"
                      name="type"
                      value="landing"
                      checked={formData.type === 'landing'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#7c3aed]"
                    />
                    <span className="ml-3 text-sm font-medium text-[#2a2c32] dark:text-white">Landing Page</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-[#e5e7eb] dark:border-[#1a1a1a] rounded-md text-[#2a2c32] dark:text-white font-medium hover:bg-[#f9fafb] dark:hover:bg-[#0a0a0a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#7c3aed] text-white rounded-md font-medium hover:bg-[#6d2fe2] transition-colors"
                >
                  Create Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pages
