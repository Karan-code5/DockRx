import express from 'express'
import { requireImagesKV } from '../utils/imageStorage.js'

const imageRouter = express.Router()

// GET /api/images/:key — Serve an image from Cloudflare KV
imageRouter.get('/:key', async (req, res) => {
    try {
        const { key } = req.params
        const result = await requireImagesKV(req).getWithMetadata(key, { type: 'arrayBuffer' })

        if (!result || !result.value) {
            return res.status(404).json({ success: false, message: 'Image not found' })
        }

        const contentType = result.metadata?.contentType || 'image/jpeg'
        res.setHeader('Content-Type', contentType)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.end(Buffer.from(result.value))
    } catch (error) {
        console.error('Image serve error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
})

export default imageRouter
