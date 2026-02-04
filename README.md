# Rehmat Pharma - E-Commerce Website

A modern GlassMorphism-themed pharmacy e-commerce website built with React, TypeScript, and Tailwind CSS.

## Features

- 🏥 **GlassMorphism Design** - Beautiful frosted glass UI with translucent cards
- 🛒 **Shopping Cart** - Persistent cart with localStorage
- 📱 **Responsive** - Mobile-first design
- 💬 **WhatsApp Ordering** - Send orders directly via WhatsApp
- 📋 **Prescription Upload** - Upload prescriptions for controlled medications
- ♿ **Accessible** - Proper focus states and ARIA labels

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure WhatsApp Number

Open `src/pages/Checkout.tsx` and replace the WhatsApp number:

```typescript
// Replace with your WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '923001234567';
```

### 3. Start Development Server

```bash
npm run dev
```

## WhatsApp Message Format

When a customer places an order, they'll be redirected to WhatsApp with a pre-filled message:

```
🏥 *NEW ORDER - Rehmat Pharma*

📋 *Customer Details*
Name: John Doe
Phone: 03001234567
Address: 123 Street, Lahore

🛒 *Order Items*
─────────────────
1. Paracetamol 500mg
   Qty: 2 × Rs. 45 = Rs. 90
2. Vitamin C 1000mg
   Qty: 1 × Rs. 320 = Rs. 320
   ⚠️ Prescription Required
─────────────────
💰 *Total: Rs. 410*

📄 *Prescription:*
https://your-storage-url.com/prescription.jpg

✅ Please confirm this order. Thank you!
```

## Example WhatsApp Link

```
https://wa.me/923001234567?text=%F0%9F%8F%A5%20*NEW%20ORDER%20-%20Rehmat%20Pharma*...
```

## Product Data

Products are stored in `src/data/products.ts`. Each product has:

- `id` - Unique identifier
- `name` - Product name
- `slug` - URL-friendly name
- `category` - Product category
- `shortDescription` - Brief description
- `price` - Price in PKR
- `stock` - Available quantity
- `imageUrl` - Product image URL
- `requiresPrescription` - Whether prescription is needed

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zod** - Form validation
- **Cloud Storage** - File storage for prescriptions

## Pages

- `/` - Home page with hero, trust badges, featured products
- `/products` - Product listing with search and filters
- `/products/:slug` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout with WhatsApp integration

## Deploying

Deploy using your preferred hosting service (Vercel, Netlify, etc.)

## License

MIT
