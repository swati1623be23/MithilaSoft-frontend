const generateStoreSlug = (value = '', fallback = '') => {
    const source = `${value || fallback || ''}`.trim().toLowerCase()

    if (!source) {
        return 'store'
    }

    const normalized = source
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    return normalized || 'store'
}

export default generateStoreSlug
