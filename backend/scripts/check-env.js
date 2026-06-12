const required = [
    'MONGODB_URI',
    'JWT_SECRET',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD',
    'CURRENCY',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'STRIPE_SECRET_KEY',
    'FRONTEND_URL',
    'ADMIN_URL',
]

const missing = required.filter((key) => !process.env[key])

if (missing.length > 0) {
    console.error(`Missing required backend environment variables: ${missing.join(', ')}`)
    process.exit(1)
}

console.log('Backend environment variables are present.')
