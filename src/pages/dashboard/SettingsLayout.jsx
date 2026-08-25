// // frontend/src/pages/dashboard/SettingsLayout.jsx
// import React, { useState } from 'react';
// import { Outlet, NavLink, useLocation } from 'react-router-dom';
// import { 
//   FileText,
//   Newspaper,
//   Puzzle,
//   Palette,
//   Store,
//   CreditCard,
//   ShoppingBag,
//   ChevronRight,
//   Settings,
//   ChevronDown
// } from 'lucide-react';

// const SettingsLayout = () => {
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const menuItems = [
//     { path: '/dashboard/pages', icon: FileText, label: 'Pages' },
//     { path: '/dashboard/blog', icon: Newspaper, label: 'Blog' },
//     { path: '/dashboard/plugins', icon: Puzzle, label: 'Plugins' },
//     { path: '/dashboard/appearance', icon: Palette, label: 'Appearance' },
//     { path: '/dashboard/store', icon: Store, label: 'Store Setting' },
//     { path: '/dashboard/payment', icon: CreditCard, label: 'Payment Setting' },
//     { path: '/dashboard/checkout', icon: ShoppingBag, label: 'Checkout Setting' },
//   ];

//   // Check if any settings page is active
//   const isSettingsActive = menuItems.some(item => location.pathname === item.path);

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
//       <div className="flex">
//         {/* Sidebar - Desktop */}
//         <aside className="hidden lg:block w-64 bg-[#14141e] border-r border-gray-800 min-h-screen fixed left-0 top-0 pt-20">
//           <div className="px-4 py-4">
//             {/* Heading - Customizations */}
//             <div className="px-3 mb-3">
//               <div className="flex items-center gap-2">
//                 <Settings className="w-4 h-4 text-indigo-400" />
//                 <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Customizations</span>
//               </div>
//               <div className="border-b border-gray-800 mt-2"></div>
//             </div>
            
//             {/* Navigation - Only menu items, no Customizations */}
//             <nav className="space-y-1">
//               {menuItems.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
//                       isActive 
//                         ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
//                         : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
//                     }`
//                   }
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span>{item.label}</span>
//                   {location.pathname === item.path && (
//                     <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />
//                   )}
//                 </NavLink>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Mobile Menu Toggle */}
//         <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-[#14141e] border-b border-gray-800 px-4 py-2">
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="flex items-center gap-2 text-gray-300 w-full"
//           >
//             <div className="flex items-center gap-2">
//               <Settings className="w-5 h-5 text-indigo-400" />
//               <span className="font-semibold text-indigo-400">Customizations</span>
//             </div>
//             <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
//           </button>
//           {mobileMenuOpen && (
//             <div className="absolute top-full left-0 right-0 bg-[#14141e] border-b border-gray-800 p-4 space-y-1">
//               {menuItems.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
//                       isActive 
//                         ? 'bg-indigo-600/20 text-indigo-400' 
//                         : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
//                     }`
//                   }
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span>{item.label}</span>
//                 </NavLink>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 lg:ml-64 pt-20 lg:pt-20">
//           <div className="p-4 md:p-6 max-w-7xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SettingsLayout;


// // frontend/src/pages/dashboard/SettingsLayout.jsx
// import React, { useState } from 'react';
// import { Outlet, NavLink, useLocation } from 'react-router-dom';
// import { 
//   FileText,
//   Newspaper,
//   Puzzle,
//   Palette,
//   Store,
//   CreditCard,
//   ShoppingBag,
//   ChevronRight,
//   Settings,
//   ChevronDown
// } from 'lucide-react';

// const SettingsLayout = () => {
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const menuItems = [
//     { path: '/dashboard/pages', icon: FileText, label: 'Pages' },
//     { path: '/dashboard/blog', icon: Newspaper, label: 'Blog' },
//     { path: '/dashboard/plugins', icon: Puzzle, label: 'Plugins' },
//     { path: '/dashboard/appearance', icon: Palette, label: 'Appearance' },
//     { path: '/dashboard/store', icon: Store, label: 'Store Setting' },
//     { path: '/dashboard/payment', icon: CreditCard, label: 'Payment Setting' },
//     { path: '/dashboard/checkout', icon: ShoppingBag, label: 'Checkout Setting' },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
//       <div className="flex">
//         {/* Sidebar - Desktop */}
//         <aside className="hidden lg:block w-64 bg-[#14141e] border-r border-gray-800 min-h-screen fixed left-0 top-0 pt-20">
//           <div className="px-4 py-4">
//             {/* Heading - Customizations */}
//             <div className="px-3 mb-3">
//               <div className="flex items-center gap-2">
//                 <Settings className="w-4 h-4 text-indigo-400" />
//                 <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Customizations</span>
//               </div>
//               <div className="border-b border-gray-800 mt-2"></div>
//             </div>
            
//             {/* Navigation - Only menu items */}
//             <nav className="space-y-1">
//               {menuItems.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
//                       isActive 
//                         ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
//                         : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
//                     }`
//                   }
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span>{item.label}</span>
//                   {location.pathname === item.path && (
//                     <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />
//                   )}
//                 </NavLink>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Mobile Menu Toggle */}
//         <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-[#14141e] border-b border-gray-800 px-4 py-2">
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="flex items-center gap-2 text-gray-300 w-full"
//           >
//             <div className="flex items-center gap-2">
//               <Settings className="w-5 h-5 text-indigo-400" />
//               <span className="font-semibold text-indigo-400">Customizations</span>
//             </div>
//             <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
//           </button>
//           {mobileMenuOpen && (
//             <div className="absolute top-full left-0 right-0 bg-[#14141e] border-b border-gray-800 p-4 space-y-1">
//               {menuItems.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
//                       isActive 
//                         ? 'bg-indigo-600/20 text-indigo-400' 
//                         : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
//                     }`
//                   }
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span>{item.label}</span>
//                 </NavLink>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 lg:ml-64 pt-20 lg:pt-20">
//           <div className="p-4 md:p-6 max-w-7xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SettingsLayout;



// frontend/src/pages/dashboard/SettingsLayout.jsx
// import React, { useState } from 'react';
// import { Outlet, NavLink, useLocation } from 'react-router-dom';
// import { 
//   FileText,
//   Newspaper,
//   Puzzle,
//   Palette,
//   Store,
//   CreditCard,
//   ShoppingBag,
//   ChevronRight,
//   Settings,
//   ChevronDown
// } from 'lucide-react';

// const SettingsLayout = () => {
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const menuItems = [
//     { path: '/dashboard/pages', icon: FileText, label: 'Pages' },
//     { path: '/dashboard/blog', icon: Newspaper, label: 'Blog' },
//     { path: '/dashboard/plugins', icon: Puzzle, label: 'Plugins' },
//     { path: '/dashboard/appearance', icon: Palette, label: 'Appearance' },
//     { path: '/dashboard/store', icon: Store, label: 'Store Setting' },
//     { path: '/dashboard/payment', icon: CreditCard, label: 'Payment Setting' },
//     { path: '/dashboard/checkout', icon: ShoppingBag, label: 'Checkout Setting' },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
//       <div className="flex">
//         {/* Sidebar - Desktop */}
//         <aside className="hidden lg:block w-64 bg-[#14141e] border-r border-gray-800 min-h-screen fixed left-0 top-0 pt-20">
//           <div className="px-4 py-4">
//             {/* Heading - Customizations */}
//             <div className="px-3 mb-3">
//               <div className="flex items-center gap-2">
//                 <Settings className="w-4 h-4 text-indigo-400" />
//                 <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Customizations</span>
//               </div>
//               <div className="border-b border-gray-800 mt-2"></div>
//             </div>
            
//             {/* Navigation - Only menu items */}
//             <nav className="space-y-1">
//               {menuItems.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
//                       isActive 
//                         ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
//                         : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
//                     }`
//                   }
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span>{item.label}</span>
//                   {location.pathname === item.path && (
//                     <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />
//                   )}
//                 </NavLink>
//               ))}
//             </nav>
//           </div>
//         </aside>

//         {/* Mobile Menu Toggle */}
//         <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-[#14141e] border-b border-gray-800 px-4 py-2">
//           <button
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             className="flex items-center gap-2 text-gray-300 w-full"
//           >
//             <div className="flex items-center gap-2">
//               <Settings className="w-5 h-5 text-indigo-400" />
//               <span className="font-semibold text-indigo-400">Customizations</span>
//             </div>
//             <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
//           </button>
//           {mobileMenuOpen && (
//             <div className="absolute top-full left-0 right-0 bg-[#14141e] border-b border-gray-800 p-4 space-y-1">
//               {menuItems.map((item) => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
//                       isActive 
//                         ? 'bg-indigo-600/20 text-indigo-400' 
//                         : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
//                     }`
//                   }
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span>{item.label}</span>
//                 </NavLink>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 lg:ml-64 pt-20 lg:pt-20">
//           <div className="p-4 md:p-6 max-w-7xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SettingsLayout;













// frontend/src/pages/dashboard/SettingsLayout.jsx
import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  FileText,
  Newspaper,
  Puzzle,
  Palette,
  Store,
  CreditCard,
  ShoppingBag,
  ChevronRight,
  Settings,
  ChevronDown
} from 'lucide-react';

const SettingsLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/settings/pages', icon: FileText, label: 'Pages' },
    { path: '/settings/blog', icon: Newspaper, label: 'Blog' },
    { path: '/settings/plugins', icon: Puzzle, label: 'Plugins' },
    { path: '/settings/appearance', icon: Palette, label: 'Appearance' },
    { path: '/settings/store', icon: Store, label: 'Store Setting' },
    { path: '/settings/payment', icon: CreditCard, label: 'Payment Setting' },
    { path: '/settings/checkout', icon: ShoppingBag, label: 'Checkout Setting' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-[#14141e] border-r border-gray-800 min-h-screen fixed left-0 top-0 pt-20">
          <div className="px-4 py-4">
            {/* Heading - Customizations */}
            <div className="px-3 mb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Customizations</span>
              </div>
              <div className="border-b border-gray-800 mt-2"></div>
            </div>
            
            {/* Navigation - Menu Items */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                      isActive 
                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {location.pathname === item.path && (
                    <ChevronRight className="w-4 h-4 ml-auto text-indigo-400" />
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Mobile Menu */}
        <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-[#14141e] border-b border-gray-800 px-4 py-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 text-gray-300 w-full"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-400" />
              <span className="font-semibold text-indigo-400">Customizations</span>
            </div>
            <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#14141e] border-b border-gray-800 p-4 space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                      isActive 
                        ? 'bg-indigo-600/20 text-indigo-400' 
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-20 lg:pt-20">
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;