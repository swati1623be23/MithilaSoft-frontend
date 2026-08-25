// // src/main.jsx
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import App from './App'
// import './index.css'

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             refetchOnWindowFocus: false,
//             retry: 1,
//         },
//     },
// })

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <QueryClientProvider client={queryClient}>
//             <BrowserRouter>
//                 <App />
//                 <Toaster
//                     position="top-right"
//                     toastOptions={{
//                         duration: 4000,
//                         style: {
//                             background: '#131A2B',
//                             color: '#F8FAFC',
//                             border: '1px solid #1E293B',
//                             borderRadius: '18px',
//                             padding: '16px 20px',
//                         },
//                         success: {
//                             iconTheme: {
//                                 primary: '#22C55E',
//                                 secondary: '#F8FAFC',
//                             },
//                         },
//                         error: {
//                             iconTheme: {
//                                 primary: '#EF4444',
//                                 secondary: '#F8FAFC',
//                             },
//                         },
//                     }}
//                 />
//             </BrowserRouter>
//         </QueryClientProvider>
//     </React.StrictMode>
// )







// frontend/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './index.css'

// Create QueryClient instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})

// Load Google SDK globally (optional)
const loadGoogleSDK = () => {
    if (document.getElementById('google-gsi-script')) return
    
    const script = document.createElement('script')
    script.id = 'google-gsi-script'
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
}

// Load Google SDK when app starts
loadGoogleSDK()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <AuthProvider>
                    <App />
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#131A2B',
                                color: '#F8FAFC',
                                border: '1px solid #1E293B',
                                borderRadius: '18px',
                                padding: '16px 20px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#22C55E',
                                    secondary: '#F8FAFC',
                                },
                                style: {
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#EF4444',
                                    secondary: '#F8FAFC',
                                },
                                style: {
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                },
                            },
                        }}
                    />
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
)