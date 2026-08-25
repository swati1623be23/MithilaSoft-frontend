import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { productAPI } from '../services/api'

/**
 * StorefrontPreview Component
 * Renders complete e-commerce storefront with all section types
 * Applies Appearance settings (colors, fonts, logos, etc.)
 * Supports base64 and URL images with proper fallbacks
 * Fully responsive with Tailwind CSS
 */
const StorefrontPreview = () => {
  const { storeName } = useParams()
  const [landingPage, setLandingPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [storeCategories, setStoreCategories] = useState([])
  const [storeProducts, setStoreProducts] = useState([])
  
  // Appearance Settings State
  const [appearance, setAppearance] = useState({
    primaryColor: '#3b82f6',
    fontFamily: 'Inter',
    brandName: 'My Store',
    brandLogo: null,
    brandFavicon: null,
    imageRatio: '1:1',
    topBarText: '',
    topBarLink: null,
    popupEnabled: false,
    popupImage: null,
    popupLocation: 'homepage',
    navStyle: 'basic',
  })
  
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Load appearance settings from localStorage
    const appearanceSettings = {
      primaryColor: localStorage.getItem('appearance_primaryColor') || '#3b82f6',
      fontFamily: localStorage.getItem('appearance_fontFamily') || 'Inter',
      brandName: localStorage.getItem('appearance_brandName') || 'My Store',
      brandLogo: localStorage.getItem('appearance_brandLogo') || null,
      brandFavicon: localStorage.getItem('appearance_brandFavicon') || null,
      imageRatio: localStorage.getItem('appearance_imageRatio') || '1:1',
      topBarText: localStorage.getItem('appearance_topBarText') || '',
      topBarLink: localStorage.getItem('appearance_topBarLink') 
        ? JSON.parse(localStorage.getItem('appearance_topBarLink')) 
        : null,
      popupEnabled: localStorage.getItem('appearance_popupEnabled') === 'true' || false,
      popupImage: localStorage.getItem('appearance_popupImage') || null,
      popupLocation: localStorage.getItem('appearance_popupLocation') || 'homepage',
      navStyle: localStorage.getItem('appearance_navStyle') || 'basic',
    }
    
    setAppearance(appearanceSettings)
    
    // Apply favicon
    if (appearanceSettings.brandFavicon) {
      const faviconLink = document.querySelector('link[rel="icon"]') || document.createElement('link')
      faviconLink.rel = 'icon'
      faviconLink.href = appearanceSettings.brandFavicon
      if (!document.querySelector('link[rel="icon"]')) {
        document.head.appendChild(faviconLink)
      }
    }
    
    // Apply font family
    if (appearanceSettings.fontFamily) {
      const style = document.createElement('style')
      const fontMap = {
        'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
        'Open Sans': 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap',
        'Lato': 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
        'Montserrat': 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap',
        'Poppins': 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
      }
      
      const link = document.createElement('link')
      link.href = fontMap[appearanceSettings.fontFamily] || fontMap['Inter']
      link.rel = 'stylesheet'
      document.head.appendChild(link)
      
      style.textContent = `* { font-family: '${appearanceSettings.fontFamily}', sans-serif !important; }`
      document.head.appendChild(style)
    }
    
    // Apply primary color CSS variable
    document.documentElement.style.setProperty('--primary-color', appearanceSettings.primaryColor)
    
    // Check popup location on page load
    const currentPage = window.location.pathname
    if (appearanceSettings.popupEnabled && appearanceSettings.popupImage) {
      const shouldShowPopup = 
        (appearanceSettings.popupLocation === 'homepage' && (currentPage === '/' || currentPage.includes('storefront'))) ||
        (appearanceSettings.popupLocation === 'all' || appearanceSettings.popupLocation === 'All Pages')
      
      if (shouldShowPopup) {
        setTimeout(() => setShowPopup(true), 500)
      }
    }
    
    // Load landing page
    const pagesData = JSON.parse(localStorage.getItem('pagesData') || '[]')
    let savedCategories = []
    try {
      savedCategories = JSON.parse(localStorage.getItem('categories') || '[]')
    } catch {
      savedCategories = []
    }
    setStoreCategories(Array.isArray(savedCategories) ? savedCategories : [])
    let landing = pagesData.find(p => p.type === 'landing') || 
                  pagesData.find(p => p.template === 'landing') || 
                  pagesData[0]

    if (landing) {
      setLandingPage(landing)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const refreshLandingPage = async () => {
      const pagesData = JSON.parse(localStorage.getItem('pagesData') || '[]')
      const landing = pagesData.find((page) => page.type === 'landing') || pagesData.find((page) => page.template === 'landing') || pagesData[0] || null
      let liveProducts = []

      try {
        const response = await productAPI.getAll({ page: 1, limit: 100 })
        const result = response.data?.products || response.data?.data || response.data
        if (Array.isArray(result)) {
          liveProducts = result
          setStoreProducts(result)
        }
      } catch {
        // Keep saved page data when the storefront cannot reach the API.
      }

      if (landing && liveProducts.length) {
        const getProductId = (product) => String(product?.id || product?._id || '')
        const getProductImage = (product) => product?.image || product?.imageUrl || product?.images?.[0]?.imageUrl || product?.images?.[0]?.url || product?.images?.[0] || ''
        const productsById = new Map(liveProducts.map((product) => [getProductId(product), product]))
        setLandingPage({
          ...landing,
          sections: (landing.sections || []).map((section) => {
            if (section.type !== 'product_grid' || !Array.isArray(section.settings?.selectedProductIds)) return section
            const products = section.settings.selectedProductIds.map((id) => productsById.get(String(id))).filter(Boolean).map((product) => ({
              ...product,
              name: product.name || product.title || 'Product',
              image: getProductImage(product),
              price: product.price ?? product.pricing?.price ?? product.salePrice ?? '',
            }))
            return { ...section, settings: { ...section.settings, products } }
          }),
        })
      } else {
        setLandingPage(landing)
      }

      try {
        const savedCategories = JSON.parse(localStorage.getItem('categories') || '[]')
        if (Array.isArray(savedCategories)) setStoreCategories(savedCategories)
      } catch {
        setStoreCategories([])
      }

      setAppearance((current) => ({
        ...current,
        primaryColor: localStorage.getItem('appearance_primaryColor') || current.primaryColor,
        brandName: localStorage.getItem('appearance_brandName') || current.brandName,
        brandLogo: localStorage.getItem('appearance_brandLogo') || null,
        imageRatio: localStorage.getItem('appearance_imageRatio') || current.imageRatio,
        topBarText: localStorage.getItem('appearance_topBarText') || '',
        navStyle: localStorage.getItem('appearance_navStyle') || current.navStyle,
      }))
    }

    refreshLandingPage()
    window.addEventListener('pagesDataUpdated', refreshLandingPage)
    window.addEventListener('storage', refreshLandingPage)
    const refreshTimer = window.setInterval(refreshLandingPage, 5000)
    return () => {
      window.removeEventListener('pagesDataUpdated', refreshLandingPage)
      window.removeEventListener('storage', refreshLandingPage)
      window.clearInterval(refreshTimer)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse">⏳</div>
          <p className="text-gray-600 font-medium">Loading storefront...</p>
        </div>
      </div>
    )
  }

  if (!landingPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-4">📦</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Storefront</h1>
          <p className="text-gray-600 mb-6">No landing page configured yet.</p>
          <p className="text-sm text-gray-500">Please create a landing page in the dashboard first.</p>
        </div>
      </div>
    )
  }

  const navbarSection = landingPage.sections?.find(s => s.type === 'navbar')
  const heroSection = landingPage.sections?.find(s => s.type === 'hero')
  const footerSection = landingPage.sections?.find(s => s.type === 'footer')
  const contentSections = landingPage.sections?.filter(s => !['navbar', 'hero', 'footer'].includes(s.type)) || []

  return (
    <div className="min-h-screen" style={{ '--primary-color': appearance.primaryColor }}>
      {/* Top Bar */}
      {appearance.topBarText && (
        <TopBar 
          text={appearance.topBarText} 
          link={appearance.topBarLink}
          primaryColor={appearance.primaryColor}
        />
      )}
      
      {/* Navbar Section */}
      {navbarSection ? (
        <StorefrontNavbar 
          section={navbarSection} 
          storeName={storeName}
          brandName={appearance.brandName}
          brandLogo={appearance.brandLogo}
          primaryColor={appearance.primaryColor}
          navStyle={appearance.navStyle}
        />
      ) : (
        <DefaultNavbar 
          storeName={storeName}
          brandName={appearance.brandName}
          brandLogo={appearance.brandLogo}
          primaryColor={appearance.primaryColor}
          navStyle={appearance.navStyle}
        />
      )}

      {/* Hero Section */}
      {heroSection ? (
        <StorefrontHero 
          section={heroSection}
          primaryColor={appearance.primaryColor}
        />
      ) : (
        <DefaultHero 
          storeName={storeName} 
          pageTitle={landingPage.title}
          primaryColor={appearance.primaryColor}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {contentSections.length > 0 ? (
          <div className="space-y-12 lg:space-y-16">
            {contentSections.map(section => (
              <StorefrontSection 
                key={section.id} 
                section={section}
                primaryColor={appearance.primaryColor}
                imageRatio={appearance.imageRatio}
                storeCategories={storeCategories}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No content sections added yet.</p>
          </div>
        )}
      </main>

      {/* Footer Section */}
      {footerSection ? (
        <StorefrontFooter 
          section={footerSection} 
          storeName={storeName}
          brandName={appearance.brandName}
          primaryColor={appearance.primaryColor}
        />
      ) : (
        <DefaultFooter 
          storeName={storeName}
          brandName={appearance.brandName}
          primaryColor={appearance.primaryColor}
        />
      )}
      
      {/* Popup Modal */}
      {showPopup && appearance.popupImage && (
        <PopupModal 
          image={appearance.popupImage}
          onClose={() => setShowPopup(false)}
          primaryColor={appearance.primaryColor}
        />
      )}
    </div>
  )
}

// ============================================================================
// TOP BAR COMPONENT
// ============================================================================

const TopBar = ({ text, link, primaryColor }) => {
  const handleClick = () => {
    if (link?.type === 'product' && link?.value) {
      window.location.href = `/product/${link.value}`
    } else if (link?.type === 'category' && link?.value) {
      window.location.href = `/category/${link.value}`
    } else if (link?.type === 'url' && link?.value) {
      window.open(link.value, '_blank')
    }
  }

  const isClickable = link && (link.type === 'product' || link.type === 'category' || link.type === 'url')

  return (
    <div 
      className="w-full py-2 text-center text-white text-sm font-medium"
      style={{ backgroundColor: primaryColor }}
    >
      {isClickable ? (
        <button 
          onClick={handleClick}
          className="hover:underline transition-all"
        >
          {text}
        </button>
      ) : (
        <span>{text}</span>
      )}
    </div>
  )
}

// ============================================================================
// POPUP MODAL COMPONENT
// ============================================================================

const PopupModal = ({ image, onClose, primaryColor }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="w-full h-80 overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={image}
            alt="Popup"
            className="w-full h-full object-cover"
            fallbackIcon="📢"
          />
        </div>
        
        <div className="p-6 text-center">
          <button
            onClick={onClose}
            className="w-full px-6 py-2 text-white font-semibold rounded-lg transition-colors"
            style={{ backgroundColor: primaryColor }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// NAVBAR COMPONENT
// ============================================================================

const DefaultNavbar = ({ storeName, brandName, brandLogo, primaryColor, navStyle }) => {
  const navClasses = navStyle === 'transparent' 
    ? 'bg-transparent' 
    : 'bg-gray-900'
  
  const alignmentClass = navStyle === 'centered' ? 'justify-center' : ''

  return (
    <nav className={`sticky top-0 z-50 w-full ${navClasses} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {brandLogo ? (
              <img 
                src={brandLogo} 
                alt={brandName} 
                className="h-10 w-10 rounded-lg object-cover"
              />
            ) : null}
            <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
              {brandName || storeName?.toUpperCase() || 'MY STORE'}
            </h1>
          </div>
          <div className={`hidden md:flex gap-8 ${alignmentClass}`}>
            <a href="#home" className="text-gray-300 hover:text-white transition-colors font-medium">Home</a>
            <a href="#products" className="text-gray-300 hover:text-white transition-colors font-medium">Products</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors font-medium">About</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors font-medium">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

const StorefrontNavbar = ({ section, storeName, brandName, brandLogo, primaryColor, navStyle }) => {
  const { settings } = section
  const navClasses = navStyle === 'transparent' 
    ? 'bg-transparent' 
    : 'bg-gray-900'
  const alignmentClass = navStyle === 'centered' ? 'justify-center' : ''

  return (
    <nav className={`sticky top-0 z-50 w-full ${navClasses} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {brandLogo ? (
              <img 
                src={brandLogo} 
                alt={brandName} 
                className="h-10 w-10 rounded-lg object-cover"
              />
            ) : null}
            <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
              {settings.logo || brandName || storeName?.toUpperCase() || 'MY STORE'}
            </h1>
          </div>
          <div className={`hidden md:flex gap-8 ${alignmentClass}`}>
            {settings.navItems?.map((item, idx) => (
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
      </div>
    </nav>
  )
}

// ============================================================================
// HERO COMPONENT
// ============================================================================

const DefaultHero = ({ storeName, pageTitle, primaryColor }) => (
  <div className="w-full text-white" style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)` }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">{pageTitle || `Welcome to ${storeName?.toUpperCase() || 'Our Store'}`}</h1>
        <p className="text-xl lg:text-2xl opacity-90">Explore our amazing collection</p>
      </div>
    </div>
  </div>
)

const StorefrontHero = ({ section, primaryColor }) => {
  const { settings } = section
  const bgClass = settings.backgroundColor?.includes('from-')
    ? `bg-gradient-to-r ${settings.backgroundColor}`
    : settings.backgroundColor || `bg-gradient-to-r`

  return (
    <div 
      className={`w-full text-white relative overflow-hidden ${bgClass}`}
      style={!settings.backgroundColor?.includes('from-') ? { background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)` } : {}}
    >
      {settings.backgroundImage && (
        <>
          <img 
            src={settings.backgroundImage} 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          {settings.heading && <h1 className="text-4xl lg:text-5xl font-bold mb-4">{settings.heading}</h1>}
          {settings.subheading && <p className="text-lg lg:text-2xl text-gray-100 mb-8">{settings.subheading}</p>}
          {settings.ctaText && (
            <a 
              href={settings.ctaLink || '#'} 
              className="inline-block px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: primaryColor }}
            >
              {settings.ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

const DefaultFooter = ({ storeName, brandName, primaryColor }) => (
  <footer className="w-full bg-gray-900 text-white mt-16 lg:mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-lg mb-4" style={{ color: primaryColor }}>
            {brandName || storeName?.toUpperCase() || 'MY STORE'}
          </h3>
          <p className="text-gray-400 text-sm">Your trusted online shopping destination</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <p className="text-gray-400 text-sm">Email: info@store.com</p>
          <p className="text-gray-400 text-sm mt-2">Phone: +1-234-567-8900</p>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
        <p>&copy; 2026 {brandName || storeName?.toUpperCase() || 'MY STORE'}. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

const StorefrontFooter = ({ section, storeName, brandName, primaryColor }) => {
  const { settings } = section
  return (
    <footer className="w-full bg-gray-900 text-white mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: primaryColor }}>
              {settings.companyName || brandName || storeName?.toUpperCase() || 'MY STORE'}
            </h3>
            <p className="text-gray-400 text-sm">{settings.companyDescription}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {settings.links?.map((link, idx) => (
                <li key={idx}><a href={link.url || '#'} className="hover:text-white transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">Email: {settings.contactEmail}</p>
            <p className="text-gray-400 text-sm mt-2">Phone: {settings.contactPhone}</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>{settings.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// IMAGE HANDLER (Base64 & URL Support)
// ============================================================================

const ImageWithFallback = ({ src, alt, className = '', fallbackIcon = '🖼️' }) => {
  const [imageError, setImageError] = useState(false)
  const resolvedSrc = src && !src.startsWith('http') && !src.startsWith('data:')
    ? `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '')}/${String(src).replace(/^\//, '')}`
    : src

  if (!resolvedSrc || imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-3xl mb-2">{fallbackIcon}</div>
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    )
  }

  return (
    <img 
      src={resolvedSrc} 
      alt={alt} 
      className={className}
      onError={() => setImageError(true)}
    />
  )
}

// ============================================================================
// MAIN SECTION RENDERER
// ============================================================================

const StorefrontSection = ({ section, primaryColor, imageRatio, storeCategories = [] }) => {
  const { type, settings } = section
  
  const getImageRatioClass = () => {
    switch(imageRatio) {
      case '4:5': return 'aspect-[4/5]'
      case '9:16': return 'aspect-[9/16]'
      case '16:9': return 'aspect-[16/9]'
      case '1:1':
      default: return 'aspect-square'
    }
  }

  // Image Slider
  if (type === 'image_slider') {
    return <ImageSliderSection slides={settings.slides} primaryColor={primaryColor} />
  }

  // Full Image
  if (type === 'full_image') {
    return (
      <div className="w-full rounded-lg overflow-hidden shadow-lg">
        <ImageWithFallback 
          src={settings.imageUrl} 
          alt={settings.altText || 'Full Image'} 
          className={`w-full object-cover ${getImageRatioClass()}`}
          fallbackIcon="🖼️"
        />
      </div>
    )
  }

  // Image With Content
  if (type === 'image_content') {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {settings.image && (
            <div className="rounded-lg overflow-hidden shadow-lg">
              <ImageWithFallback 
                src={settings.image} 
                alt="" 
                className={`w-full object-cover ${getImageRatioClass()}`}
                fallbackIcon="📸"
              />
            </div>
          )}
          <div className={settings.image ? '' : 'col-span-full'}>
            {settings.heading && <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{settings.heading}</h2>}
            {settings.text && <p className="text-gray-700 text-lg leading-relaxed mb-6">{settings.text}</p>}
            {settings.buttonText && (
              <a 
                href={settings.buttonLink || '#'} 
                className="inline-block px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                {settings.buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Side Image Content (Reversed)
  if (type === 'side_image') {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            {settings.heading && <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{settings.heading}</h2>}
            {settings.text && <p className="text-gray-700 text-lg leading-relaxed mb-6">{settings.text}</p>}
            {settings.buttonText && (
              <a 
                href={settings.buttonLink || '#'} 
                className="inline-block px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                {settings.buttonText}
              </a>
            )}
          </div>
          {settings.image && (
            <div className="order-1 md:order-2 rounded-lg overflow-hidden shadow-lg">
              <ImageWithFallback 
                src={settings.image} 
                alt="" 
                className={`w-full object-cover ${getImageRatioClass()}`}
                fallbackIcon="📸"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  // FAQ Section
  if (type === 'faq') {
    return (
      <div className="py-8">
        {settings.heading && <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">{settings.heading}</h2>}
        <div className="max-w-3xl space-y-4">
          {settings.items?.map((item, idx) => (
            <details 
              key={idx} 
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <summary 
                className="font-semibold text-gray-900 text-lg hover:text-opacity-80 transition-colors"
                style={{ color: primaryColor }}
              >
                {item.q || 'Question'}
              </summary>
              <p className="text-gray-700 mt-4 leading-relaxed">{item.a || 'Answer'}</p>
            </details>
          ))}
        </div>
      </div>
    )
  }

  // Video Player
  if (type === 'video') {
    return (
      <div className="py-8">
        {settings.heading && <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{settings.heading}</h2>}
        <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          {settings.videoUrl ? (
            <iframe
              src={settings.videoUrl}
              title="Video Player"
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center text-gray-400">
                <div className="text-5xl mb-3">🎥</div>
                <p>Video URL not provided</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Category Grid
  if (type === 'category_grid') {
    const selectedCategories = (settings.selectedIds || [])
      .map((id) => storeCategories.find((category) => String(category.id) === String(id)))
      .filter(Boolean)
    const gridStyle = settings.gridStyle || 'simple_image_center_text'
    const titleAlign = settings.titleAlign || 'center'
    const sectionBackground = settings.useThemeColor ? primaryColor : (settings.backgroundColor || 'transparent')

    return (
      <div className="-mx-4 px-4 py-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" style={{ backgroundColor: sectionBackground }}>
        {settings.heading && <h2 className={`mb-8 text-3xl font-bold text-gray-900 lg:text-4xl ${titleAlign === 'left' ? 'text-left' : titleAlign === 'right' ? 'text-right' : 'text-center'}`}>{settings.heading}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedCategories.length > 0 ? (
            selectedCategories.map((cat) => (
              <div key={cat.id} className="text-center group cursor-pointer">
                <div className={`relative mb-4 flex max-h-80 min-h-40 items-center justify-center overflow-hidden rounded-lg bg-gray-100 shadow-md transition-shadow group-hover:shadow-lg ${gridStyle === 'image_only' ? 'mb-0' : ''}`}>
                  <ImageWithFallback 
                    src={cat.image} 
                    alt={cat.name} 
                    className="h-auto max-h-80 w-full object-contain transition-transform group-hover:scale-105"
                    fallbackIcon="🏷️"
                  />
                  {gridStyle === 'image_overlay_text' && (
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-3 text-left text-white">
                      <span className="font-semibold">{cat.name}</span>
                    </div>
                  )}
                </div>
                {gridStyle === 'simple_image_center_text' && <p className="font-semibold text-gray-900">{cat.name || 'Category'}</p>}
                {gridStyle === 'image_text_arrow' && (
                  <p className="flex items-center justify-center gap-2 font-semibold text-gray-900">
                    {cat.name || 'Category'} <span aria-hidden="true">→</span>
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              <p>No categories added</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Product Grid
  if (type === 'product_grid') {
    return (
      <div className="py-8">
        {settings.heading && <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">{settings.heading}</h2>}
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${settings.columns === 2 ? '300px' : settings.columns === 3 ? '250px' : settings.columns === 4 ? '220px' : settings.columns === 5 ? '180px' : '250px'}, 1fr))` }}>
          {settings.products?.length > 0 ? (
            settings.products.map((product, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full bg-gray-200 overflow-hidden">
                  <ImageWithFallback 
                    src={product.image || product.imageUrl || product.images?.[0]?.imageUrl || product.images?.[0]?.url || product.images?.[0]} 
                    alt={product.name} 
                    className={`w-full object-cover group-hover:scale-105 transition-transform ${getImageRatioClass()}`}
                    fallbackIcon="📦"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-900 text-sm mb-2 truncate">{product.name || 'Product'}</p>
                  {settings.showPrice && product.price && (
                    <p className="font-bold text-lg mb-3" style={{ color: primaryColor }}>{product.price}</p>
                  )}
                  {settings.showAddToCart && (
                    <button 
                      className="w-full px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p className="text-lg">No products added yet</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Single Product
  if (type === 'single_product') {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <ImageWithFallback 
              src={settings.image} 
              alt={settings.name} 
              className={`w-full object-cover ${getImageRatioClass()}`}
              fallbackIcon="📦"
            />
          </div>
          <div className="flex flex-col justify-center">
            {settings.name && <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{settings.name}</h2>}
            {settings.price && <p className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>{settings.price}</p>}
            {settings.description && <p className="text-gray-700 text-lg leading-relaxed mb-8">{settings.description}</p>}
            {settings.addToCart && (
              <button 
                className="self-start px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Layout Editor (Custom HTML)
  if (type === 'layout_editor') {
    return (
      <div className="py-8 prose prose-sm max-w-4xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: settings.content }} />
      </div>
    )
  }

  // Unsupported section type
  return (
    <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-lg">
      <p>Section type "{type}" is not supported</p>
    </div>
  )
}

// ============================================================================
// IMAGE SLIDER SECTION
// ============================================================================

const ImageSliderSection = ({ slides, primaryColor }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!slides || slides.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides?.length])

  if (!slides || slides.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-5xl mb-3">🎞️</div>
          <p>No slides added</p>
        </div>
      </div>
    )
  }

  const slide = slides[currentSlide]

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
      {/* Image Container */}
      <div className="relative w-full h-96 bg-gray-300">
        <ImageWithFallback 
          src={slide.image} 
          alt={`Slide ${currentSlide + 1}`} 
          className="w-full h-full object-cover"
          fallbackIcon="🎞️"
        />
      </div>

      {/* Content Overlay */}
      {(slide.heading || slide.sub || slide.button) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent text-white p-6">
          {slide.heading && <h3 className="text-2xl lg:text-3xl font-bold mb-2">{slide.heading}</h3>}
          {slide.sub && <p className="text-sm lg:text-base mb-4 text-gray-200">{slide.sub}</p>}
          {slide.button && (
            <a 
              href={slide.link || '#'} 
              className="inline-block px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors font-medium"
              style={{ backgroundColor: primaryColor }}
            >
              {slide.button}
            </a>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
      >
        ◀
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
      >
        ▶
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4 bg-gradient-to-t from-black/80 to-transparent pt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8 h-2'
                : 'bg-gray-400 w-2 h-2 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}

export default StorefrontPreview
