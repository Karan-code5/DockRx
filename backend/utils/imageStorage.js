const imageBaseUrl = (req) => {
    const host = req.headers.host
    const proto = req.headers['x-forwarded-proto'] || 'https'
    return `${proto}://${host}`
}

const requireImagesKV = (req) => {
    const imagesKV = req.cfEnv?.IMAGES_KV
    if (!imagesKV) {
        throw new Error('IMAGES_KV binding is not available. Run through Cloudflare Workers or wrangler dev.')
    }
    return imagesKV
}

const storeImage = async (req, imageFile, prefix) => {
    if (!imageFile) {
        throw new Error('Image file is required')
    }

    const imagesKV = requireImagesKV(req)
    const safeName = imageFile.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileKey = `${prefix}-${Date.now()}-${safeName}`

    await imagesKV.put(fileKey, imageFile.buffer, {
        metadata: { contentType: imageFile.mimetype }
    })

    return `${imageBaseUrl(req)}/api/images/${fileKey}`
}

export { requireImagesKV, storeImage }
