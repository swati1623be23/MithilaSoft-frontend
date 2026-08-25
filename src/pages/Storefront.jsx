import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Storefront = () => {
  const { storeName } = useParams()
  const [pages, setPages] = useState([])
  const [landingPage, setLandingPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPages = () => {
      const pagesData = JSON.parse(localStorage.getItem('pagesData') || '[]')
      setPages(pagesData)
      const landing = pagesData.find((page) => page.type === 'landing') || pagesData.find((page) => page.template === 'landing') || pagesData[0] || null
      setLandingPage(landing)
      setLoading(false)
    }
    loadPages()
    window.addEventListener('pagesDataUpdated', loadPages)
    window.addEventListener('storage', loadPages)
    return () => {
      window.removeEventListener('pagesDataUpdated', loadPages)
      window.removeEventListener('storage', loadPages)
    }
  }, [storeName])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading storefront...</p>
        </div>
      </div>
    )
  }

  if (!landingPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Storefront</h1>
          <p className="text-gray-600 mb-6">No landing page configured yet.</p>
          <p className="text-sm text-gray-500">Please create a landing page in the dashboard first.</p>
          <p className="text-sm text-gray-400 mt-4">Store Name: {storeName}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar - Editable or Default */}
      {landingPage.sections && landingPage.sections.length > 0 && landingPage.sections.find(s => s.type === 'navbar') ? (
        <StorefrontSection section={landingPage.sections.find(s => s.type === 'navbar')} />
      ) : (
        <nav className="w-full bg-gray-900 text-white py-4 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#7c3aed]">{storeName ? storeName.toUpperCase() : 'My Store'}</h1>
            <div className="flex gap-8 items-center">
              <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Products</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Contact</a>
            </div>
          </div>
        </nav>
      )}

      {/* Hero Section - Editable or Default */}
      {landingPage.sections && landingPage.sections.length > 0 && landingPage.sections.find(s => s.type === 'hero') ? (
        <StorefrontSection section={landingPage.sections.find(s => s.type === 'hero')} />
      ) : (
        <div className="w-full h-64 bg-gradient-to-r from-[#7c3aed] to-[#6d2fe2] flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">{landingPage.title || (storeName ? storeName.toUpperCase() : 'Welcome')}</h1>
            <p className="text-lg opacity-90">Welcome to our store</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {landingPage.sections && landingPage.sections.length > 0 ? (
          <div className="space-y-12">
            {landingPage.sections
              .filter(s => s.type !== 'hero' && s.type !== 'footer' && s.type !== 'navbar')
              .map(section => (
                <div key={section.id}>
                  <StorefrontSection section={section} />
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No content sections added yet.</p>
          </div>
        )}
      </div>

      {/* Footer - Editable or Default */}
      {landingPage.sections && landingPage.sections.length > 0 && landingPage.sections.find(s => s.type === 'footer') ? (
        <StorefrontSection section={landingPage.sections.find(s => s.type === 'footer')} />
      ) : (
        <footer className="w-full bg-gray-900 text-white mt-12">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">{storeName ? storeName.toUpperCase() : 'My Store'}</h3>
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
              <p>&copy; 2026 {storeName ? storeName.toUpperCase() : 'My Store'}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

// Storefront Section Renderer
const StorefrontSection = ({ section }) => {
  const { type, settings } = section

  if (type === 'hero') {
    const bgClass = settings.backgroundColor && settings.backgroundColor.includes('from-')
      ? `bg-gradient-to-r ${settings.backgroundColor}`
      : settings.backgroundColor || 'bg-gradient-to-r from-[#7c3aed] to-[#6d2fe2]'
    
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
            <a href={settings.ctaLink || '#'} className="inline-block px-8 py-3 bg-white text-[#7c3aed] font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              {settings.ctaText}
            </a>
          )}
        </div>
      </div>
    )
  }

  if (type === 'footer') {
    return (
      <footer className="w-full bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{settings.companyName}</h3>
              <p className="text-gray-400 text-sm">{settings.companyDescription}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {settings.links && settings.links.map((link, idx) => (
                  <li key={idx}><a href={link.url || '#'} className="hover:text-white transition">{link.label}</a></li>
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

  if (type === 'full_image') {
    return (
      <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        {settings.imageUrl ? (
          <img src={settings.imageUrl} alt={settings.altText} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🖼️</div>
            <p>Full Image</p>
          </div>
        )}
      </div>
    )
  }

  if (type === 'product_grid') {
    return (
      <div className="py-8">
        {settings.heading && <h2 className="text-3xl font-bold text-gray-900 mb-8">{settings.heading}</h2>}
        <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${settings.columns || 3}, 1fr)` }}>
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
                  <p className="font-semibold text-gray-900 text-sm mb-2">{product.name || 'Product'}</p>
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

  if (type === 'category_grid') {
    return (
      <div className="py-8">
        {settings.heading && <h2 className="text-3xl font-bold text-gray-900 mb-8">{settings.heading}</h2>}
        <div className="grid grid-cols-3 gap-6">
          {settings.categories && settings.categories.length > 0 ? (
            settings.categories.map((cat, idx) => (
              <div key={idx} className="text-center group cursor-pointer">
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-shadow">
                  {cat.image ? (
                    <img src={cat.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </div>
                <p className="font-semibold text-gray-900">{cat.name || 'Category'}</p>
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

  if (type === 'navbar') {
    return (
      <nav className="w-full bg-gray-900 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#7c3aed]">{settings.logo}</h1>
          <div className="flex gap-8 items-center">
            {settings.navItems && settings.navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.url || '#'}
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

  if (type === 'image_slider') {
    return <StorefrontImageSlider slides={settings.slides} />
  }

  if (type === 'full_image') {
    return (
      <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        {settings.imageUrl ? (
          <img src={settings.imageUrl} alt={settings.altText} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">🖼️</div>
            <p>Full Image</p>
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
              <a href={settings.buttonLink || '#'} className="inline-block px-8 py-3 bg-[#7c3aed] text-white font-semibold rounded-lg hover:bg-[#6d2fe2] transition-colors">
                {settings.buttonText}
              </a>
            )}
          </div>
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
            <div className="text-gray-500 flex flex-col items-center gap-2">
              <div className="text-5xl">🎥</div>
              <p>Video Preview</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (type === 'category_grid') {
    return (
      <div className="py-8">
        {settings.heading && <h2 className="text-3xl font-bold text-gray-900 mb-8">{settings.heading}</h2>}
        <div className="grid grid-cols-3 gap-6">
          {settings.categories && settings.categories.length > 0 ? (
            settings.categories.map((cat, idx) => (
              <div key={idx} className="text-center group cursor-pointer">
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-shadow">
                  {cat.image ? (
                    <img src={cat.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </div>
                <p className="font-semibold text-gray-900">{cat.name || 'Category'}</p>
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
        <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${settings.columns || 3}, 1fr)` }}>
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
                  <p className="font-semibold text-gray-900 text-sm mb-2">{product.name || 'Product'}</p>
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

  if (type === 'layout_editor') {
    return (
      <div className="py-8 prose prose-sm max-w-4xl">
        <div dangerouslySetInnerHTML={{ __html: settings.content }} />
      </div>
    )
  }

  // Default fallback
  return <div className="py-8 text-center text-gray-500">Section type not supported</div>
}

// Storefront Image Slider Component
const StorefrontImageSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [slides.length])

  const slide = slides[currentSlide]

  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      <div className="relative w-full h-96 flex items-center justify-center bg-gray-200">
        {slide.image ? (
          <img src={slide.image} alt={`slide ${currentSlide + 1}`} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-500 flex flex-col items-center gap-2">
            <div className="text-4xl">🎞️</div>
            <p>Slide {currentSlide + 1}</p>
          </div>
        )}
        
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

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
        >
          ◀
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
        >
          ▶
        </button>
      </div>

      <div className="flex justify-center gap-2 py-3 bg-gray-100">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-[#7c3aed] w-8'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Storefront
