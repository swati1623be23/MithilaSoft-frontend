// frontend/src/services/api.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
            delete config.headers['Content-Type']
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message)
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (email, password) => api.post('/auth/login', { email, password }),
    googleAuth: (payload) => api.post('/auth/google', payload),
    generateGoogleState: (payload) => api.post('/auth/google/generate-state', payload),
    exchangeGoogleCode: (payload) => api.post('/auth/google/callback', payload),
    logout: () => api.post('/auth/logout'),
    getMe: () => api.get('/auth/me'),
}

// Store API
export const storeAPI = {
    getStore: () => api.get('/stores/me'),
    updateStore: (data) => api.put('/stores/me', data),
    getSettings: () => api.get('/stores/settings'),
    updateSettings: (data) => api.put('/stores/settings', data),
}

// Product API
export const productAPI = {
    getAll: (params) => api.get('/products', { params }),
    getInventory: (params) => api.get('/products/inventory', { params }),
    getOne: (id) => api.get(`/products/${id}`),
    create: (data) => api.post('/products', data),
    update: (id, data) => api.put(`/products/${id}`, data),
    delete: (id) => api.delete(`/products/${id}`),
    bulkDelete: (ids) => api.post('/products/bulk-delete', { ids }),
    bulkStatusUpdate: (ids, status) => api.patch('/products/bulk-status', { ids, status }),
    updateStatus: (id, status) => api.patch('/products/update-status', { id, status }),
    adjustStock: (id, data) => api.post(`/products/${id}/stock`, data),
}

// Order API
export const orderAPI = {
    getAll: (params) => api.get('/orders', { params }),
    getOne: (id) => api.get(`/orders/${id}`),
    create: (data) => api.post('/orders', data),
    update: (id, data) => api.put(`/orders/${id}`, data),
    cancel: (id, reason) => api.post(`/orders/${id}/cancel`, { reason }),
    updateStatus: (id, status) => api.patch(`/orders/${id}/status`, status),
    getInvoice: (id) => api.get(`/orders/${id}/invoice`),
}

// Customer API
export const customerAPI = {
    getAll: (params) => api.get('/customers', { params }),
    getOne: (id) => api.get(`/customers/${id}`),
    create: (data) => api.post('/customers', data),
    update: (id, data) => api.put(`/customers/${id}`, data),
    delete: (id) => api.delete(`/customers/${id}`),
}

// Lead API
export const leadAPI = {
    getAll: (params) => api.get('/leads', { params }),
    getOne: (id) => api.get(`/leads/${id}`),
    create: (data) => api.post('/leads', data),
    update: (id, data) => api.put(`/leads/${id}`, data),
    delete: (id) => api.delete(`/leads/${id}`),
}

// Issue API
// export const issueAPI = {
//     getAll: (params) => api.get('/issues', { params }),
//     getOne: (id) => api.get(`/issues/${id}`),
//     create: (data) => api.post('/issues', data),
//     update: (id, data) => api.put(`/issues/${id}`, data),
//     delete: (id) => api.delete(`/issues/${id}`),
// }



// Add to existing api.js

// Issues API
export const issueAPI = {
    getAll: (params) => api.get('/issues', { params }),
    getOne: (id) => api.get(`/issues/${id}`),
    create: (data) => api.post('/issues', data),
    update: (id, data) => api.put(`/issues/${id}`, data),
    delete: (id) => api.delete(`/issues/${id}`),
    updateStatus: (id, status, resolution) => api.patch(`/issues/${id}/status`, { status, resolution }),
    addComment: (id, message, isInternal) => api.post(`/issues/${id}/comments`, { message, isInternal }),
    getStats: () => api.get('/issues/stats'),
}


// SMS API
export const smsAPI = {
    getTemplates: (params) => api.get('/sms/templates', { params }),
    getTemplate: (id) => api.get(`/sms/templates/${id}`),
    createTemplate: (data) => api.post('/sms/templates', data),
    updateTemplate: (id, data) => api.put(`/sms/templates/${id}`, data),
    deleteTemplate: (id) => api.delete(`/sms/templates/${id}`),
    getLogs: (params) => api.get('/sms/logs', { params }),
    getCredits: () => api.get('/sms/credits'),
    sendSingle: (data) => api.post('/sms/send', data),
    sendBulk: (data) => api.post('/sms/bulk', data),
    sendOrderEvent: (data) => api.post('/sms/order-event', data),
}

// Category API
export const categoryAPI = {
    getAll: (params) => api.get('/categories', { params }),
    getOne: (id) => api.get(`/categories/${id}`),
    create: (data) => api.post('/categories', data),
    update: (id, data) => api.put(`/categories/${id}`, data),
    delete: (id) => api.delete(`/categories/${id}`),
}

export const storeCategoryAPI = {
    getAll: () => api.get('/store-categories'),
    create: (data) => api.post('/store-categories', data),
}

// Brand API
export const brandAPI = {
    getAll: (params) => api.get('/brands', { params }),
    getOne: (id) => api.get(`/brands/${id}`),
    create: (data) => api.post('/brands', data),
    update: (id, data) => api.put(`/brands/${id}`, data),
    delete: (id) => api.delete(`/brands/${id}`),
}

// Review API
export const reviewAPI = {
    getAll: (params) => api.get('/reviews', { params }),
    getOne: (id) => api.get(`/reviews/${id}`),
    updateStatus: (id, status) => api.patch(`/reviews/${id}/status`, { status }),
    toggleHide: (id) => api.patch(`/reviews/${id}/hide`),
    delete: (id) => api.delete(`/reviews/${id}`),
    reply: (id, comment) => api.post(`/reviews/${id}/reply`, { comment }),
}

// Coupon API
export const couponAPI = {
    getAll: (params) => api.get('/coupons', { params }),
    getOne: (id) => api.get(`/coupons/${id}`),
    create: (data) => api.post('/coupons', data),
    update: (id, data) => api.put(`/coupons/${id}`, data),
    delete: (id) => api.delete(`/coupons/${id}`),
    validate: (code, subtotal) => api.post('/coupons/validate', { code, subtotal }),
}

// Analytics API
export const analyticsAPI = {
    getDashboard: () => api.get('/analytics/dashboard'),
    getRevenue: (params) => api.get('/analytics/revenue', { params }),
    getSales: (params) => api.get('/analytics/sales', { params }),
    getCustomers: () => api.get('/analytics/customers'),
    getProducts: () => api.get('/analytics/products'),
    getConversion: () => api.get('/analytics/conversion'),
}

// Gallery API
export const galleryAPI = {
    upload: (formData) => api.post('/gallery/upload', formData),
    getAll: (params) => api.get('/gallery', { params }),
    getOne: (id) => api.get(`/gallery/${id}`),
    update: (id, data) => api.put(`/gallery/${id}`, data),
    delete: (id) => api.delete(`/gallery/${id}`),
    createFolder: (name) => api.post('/gallery/folders', { name }),
    getFolders: () => api.get('/gallery/folders'),
}

// Dashboard API
export const dashboardAPI = {
    getStats: () => api.get('/dashboard/stats'),
    getRecentOrders: (limit) => api.get('/dashboard/recent-orders', { params: { limit } }),
    getLowStock: (limit) => api.get('/dashboard/low-stock', { params: { limit } }),
    getTopProducts: (limit) => api.get('/dashboard/top-products', { params: { limit } }),
    getRecentCustomers: (limit) => api.get('/dashboard/recent-customers', { params: { limit } }),
    getSalesOverview: (period) => api.get('/dashboard/sales-overview', { params: { period } }),
    getVisitorOverview: () => api.get('/dashboard/visitor-overview'),
    getTrafficSources: () => api.get('/dashboard/traffic-sources'),
}

// Store Users API
export const storeUserAPI = {
    getAll: (params) => api.get('/store-users', { params }),
    getStores: () => api.get('/store-users/stores'),
    create: (data) => api.post('/store-users', data),
    getInvitation: (token) => api.get(`/store-users/invitations/${token}`),
    acceptInvitation: (token, password) => api.post(`/store-users/invitations/${token}/accept`, { password }),
    update: (id, data) => api.put(`/store-users/${id}`, data),
    delete: (id) => api.delete(`/store-users/${id}`),
}

export default api