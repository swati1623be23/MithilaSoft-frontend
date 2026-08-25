import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import 'react-easy-crop/react-easy-crop.css'

/**
 * ImageCropModal Component
 * Provides interactive image cropping using react-easy-crop library
 * 
 * Features:
 * - Aspect ratio presets (Free, 1:1, 4:3, 16:9)
 * - Zoom control slider
 * - Real-time preview
 * - Drag to adjust crop
 * - Base64 output
 * 
 * Props:
 * - isOpen (bool): Show/hide modal
 * - imageUrl (string): Image to crop (base64 or URL)
 * - onCropComplete (function): Callback with cropped base64 image
 * - onCancel (function): Cancel callback
 * - aspectRatio (string): Default aspect ratio preset
 */
const ImageCropModal = ({ 
  isOpen, 
  imageUrl, 
  onCropComplete, 
  onCancel,
  aspectRatio = 'free'
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(aspectRatio)

  /**
   * Aspect ratio presets
   */
  const aspectRatios = [
    { id: 'free', label: 'Free', value: null },
    { id: '1:1', label: '1:1 (Square)', value: 1 },
    { id: '4:3', label: '4:3', value: 4 / 3 },
    { id: '16:9', label: '16:9 (Widescreen)', value: 16 / 9 }
  ]

  /**
   * Handle crop area change
   */
  const handleCropChange = (cropData) => {
    setCrop(cropData)
  }

  /**
   * Handle zoom change
   */
  const handleZoomChange = (e) => {
    setZoom(Number(e.target.value))
  }

  /**
   * Handle aspect ratio change
   */
  const handleAspectRatioChange = (ratioId) => {
    setSelectedAspectRatio(ratioId)
  }

  /**
   * Callback when crop area updates
   */
  const handleCropAreaChange = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  /**
   * Generate cropped image and convert to base64
   */
  const handleCropImage = async () => {
    if (!croppedAreaPixels || !imageUrl) return

    try {
      const image = new Image()
      
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          console.error('Failed to get canvas context')
          return
        }

        // Set canvas dimensions
        canvas.width = croppedAreaPixels.width
        canvas.height = croppedAreaPixels.height

        // Draw cropped image on canvas
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        )

        // Convert to base64
        const croppedImage = canvas.toDataURL('image/jpeg', 0.95)
        onCropComplete(croppedImage)
      }

      image.onerror = () => {
        console.error('Failed to load image')
        alert('Error loading image. Please try again.')
      }

      image.src = imageUrl
    } catch (error) {
      console.error('Error cropping image:', error)
      alert('Error cropping image. Please try again.')
    }
  }

  if (!isOpen) return null

  const selectedRatio = aspectRatios.find(r => r.id === selectedAspectRatio)
  const aspectRatioValue = selectedRatio?.value

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1E293B] rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-[#2D3748] flex items-center justify-between sticky top-0 bg-white dark:bg-[#1E293B] z-10">
          <h2 className="text-lg font-bold text-[#2a2c32] dark:text-white">Crop Image</h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Crop Preview */}
          <div className="bg-gray-100 dark:bg-[#0B1020] rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-[#2D3748]">
            <div className="w-full h-96 relative bg-gray-900">
              {imageUrl && (
                <Cropper
                  image={imageUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatioValue}
                  onCropChange={handleCropChange}
                  onCropAreaChange={handleCropAreaChange}
                  onZoomChange={setZoom}
                  cropShape="rect"
                  showGrid={true}
                  restrictPosition={true}
                />
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Aspect Ratio Buttons */}
            <div>
              <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {aspectRatios.map(ratio => (
                  <button
                    key={ratio.id}
                    type="button"
                    onClick={() => handleAspectRatioChange(ratio.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                      selectedAspectRatio === ratio.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-[#0B1020] text-gray-900 dark:text-white border border-gray-300 dark:border-[#2D3748] hover:border-purple-400 dark:hover:border-purple-400'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Zoom Slider */}
            <div>
              <label className="block text-sm font-semibold text-[#2a2c32] dark:text-white mb-3">
                Zoom: <span className="text-purple-600 font-bold">{(zoom * 100).toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={handleZoomChange}
                className="w-full h-2 bg-gray-200 dark:bg-[#2D3748] rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>100%</span>
                <span>300%</span>
              </div>
            </div>

            {/* Crop Position & Size Info */}
            {croppedAreaPixels && (
              <div className="bg-gray-50 dark:bg-[#0B1020] p-4 rounded-lg border border-gray-200 dark:border-[#2D3748]">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">📐 Crop Area Details</p>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Width</p>
                    <p className="text-sm font-semibold text-[#2a2c32] dark:text-white">
                      {croppedAreaPixels.width.toFixed(0)}px
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Height</p>
                    <p className="text-sm font-semibold text-[#2a2c32] dark:text-white">
                      {croppedAreaPixels.height.toFixed(0)}px
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">X Offset</p>
                    <p className="text-sm font-semibold text-[#2a2c32] dark:text-white">
                      {croppedAreaPixels.x.toFixed(0)}px
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Y Offset</p>
                    <p className="text-sm font-semibold text-[#2a2c32] dark:text-white">
                      {croppedAreaPixels.y.toFixed(0)}px
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              💡 <span className="font-medium">Tip:</span> Drag the crop area on the image to adjust. Use zoom slider to zoom in/out.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#2D3748]">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-[#2D3748] text-[#2a2c32] dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-[#2D3748] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCropImage}
              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg"
            >
              <span>✂️</span>
              <span>Crop & Use</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCropModal
