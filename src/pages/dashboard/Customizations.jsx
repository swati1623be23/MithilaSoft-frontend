// frontend/src/pages/dashboard/Customizations.jsx
import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Palette, 
  Layout,
  Type,
  Image,
  Save,
  RotateCcw,
  Eye,
  CheckCircle
} from 'lucide-react';

const Customizations = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    siteName: 'MithilaSoft',
    tagline: 'E-commerce Platform',
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    fontFamily: 'Inter',
    logo: null,
    favicon: null,
    layout: 'modern',
    sidebarStyle: 'compact',
    headerStyle: 'sticky',
    footerStyle: 'standard',
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all customizations to default?')) {
      setSettings({
        siteName: 'MithilaSoft',
        tagline: 'E-commerce Platform',
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        fontFamily: 'Inter',
        logo: null,
        favicon: null,
        layout: 'modern',
        sidebarStyle: 'compact',
        headerStyle: 'sticky',
        footerStyle: 'standard',
      });
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'typography', label: 'Typography', icon: Type },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-title text-white">Customizations</h1>
          <p className="text-gray-400 text-sm">Customize your store appearance and settings</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors text-sm"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 text-sm"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : saved ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="bg-[#14141e] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({...settings, tagline: e.target.value})}
                  className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Site Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#1a1a2e] border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-600" />
                  </div>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors text-sm">
                    Upload Logo
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Favicon</label>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#1a1a2e] border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                    <Image className="w-4 h-4 text-gray-600" />
                  </div>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors text-sm">
                    Upload Favicon
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <div className="bg-[#14141e] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Color Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    className="w-12 h-12 rounded-lg cursor-pointer border border-gray-700 bg-transparent"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                    className="flex-1 px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                    className="w-12 h-12 rounded-lg cursor-pointer border border-gray-700 bg-transparent"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                    className="flex-1 px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layout Settings */}
        {activeTab === 'layout' && (
          <div className="bg-[#14141e] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Layout Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Layout Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Modern', 'Classic', 'Minimal'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setSettings({...settings, layout: style.toLowerCase()})}
                      className={`p-3 border rounded-lg transition-colors ${
                        settings.layout === style.toLowerCase()
                          ? 'border-indigo-500 bg-indigo-500/10'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className={`h-12 rounded-lg mb-2 ${
                        style === 'Modern' ? 'bg-gradient-to-r from-indigo-500 to-purple-500' :
                        style === 'Classic' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        'bg-gradient-to-r from-gray-500 to-gray-600'
                      }`} />
                      <span className="text-sm text-gray-300">{style}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typography Settings */}
        {activeTab === 'typography' && (
          <div className="bg-[#14141e] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Typography</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Font Family</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => setSettings({...settings, fontFamily: e.target.value})}
                className="w-full px-4 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customizations;