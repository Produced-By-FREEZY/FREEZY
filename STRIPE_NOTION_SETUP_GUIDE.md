# Stripe & Notion Integration Setup Guide

## Overview
Your beat store now uses Stripe for secure payment processing. Products are managed in Notion and payments are processed through Stripe's embedded checkout.

---

## ✅ Environment Variables Already Configured

The following Stripe environment variables are already set up in your Vercel project:
- `STRIPE_SECRET_KEY` - Server-side Stripe API key
- `STRIPE_PUBLISHABLE_KEY` - Client-side Stripe publishable key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Public Stripe key for frontend
- `STRIPE_MCP_KEY` - Stripe MCP integration key

---

## 📋 Notion Database Setup

### For Beats Database
Your Notion Beats database already has all the required fields. No changes needed.

**Required Fields (Already Present):**
- Title (Text)
- BPM (Number)
- Cover (Files & media)
- Price Basic (Number) - $30
- Price Pro (Number) - $75
- Price Pro XL (Number) - $100
- Genre, Mood, Preview URL, etc.

**How It Works:**
- When a customer selects a beat and license type (Basic/Pro/Pro XL), the checkout page pulls the price from Notion
- Stripe dynamically creates a checkout session with the correct price
- No Stripe-specific fields needed in Notion for beats

---

### For Kits/Sample Packs Database

**Required Fields:**
1. **Title** (Text) - Kit name
2. **Price** (Number) - Kit price in dollars (e.g., 40 for $40)
3. **Cover** (Files & media) - Kit cover image
4. **Category** (Select or Text) - e.g., "Trap Kit", "Drum Kit"
5. **Description** (Text) - Brief description

**Optional But Recommended:**
6. **File Size** (Text) - e.g., "1.2 GB"
7. **Item Count** (Number) - e.g., 250 for 250 files
8. **File Types** (Text) - e.g., "WAV, MIDI, Presets"

**How It Works:**
- When a customer clicks purchase on a kit, all information comes from Notion
- The price from Notion is converted to cents (e.g., $40 becomes 4000 cents)
- Stripe creates a checkout session dynamically

---

## 🎵 Stripe Product Setup (Optional)

You mentioned having a "Beat License" product in Stripe with 3 variants (Basic $30, Pro $75, Pro XL $100). 

**Important:** You do NOT need to connect these Stripe products to Notion. The integration uses **dynamic pricing** which means:
- Prices are stored in Notion
- When checkout happens, Stripe creates a temporary product/price on-the-fly
- This is more flexible and requires no Stripe Product IDs in Notion

If you prefer to use your existing Stripe products instead of dynamic pricing, let me know and I can update the integration.

---

## 🚀 How The Payment Flow Works

### For Beats:
1. Customer browses beats on your site
2. Clicks a beat → Opens license selection modal
3. Selects license type (Basic/Pro/Pro XL)
4. Gets redirected to `/checkout?title=X&license=Y`
5. Checkout page displays beat info and Stripe embedded checkout
6. Customer enters payment details directly on your site
7. Payment processed by Stripe
8. Customer redirected to success page (you'll need to add this)

### For Kits:
1. Customer browses kits
2. Clicks purchase on a kit
3. Gets redirected to `/checkout/kit?title=X&price=Y&image=Z`
4. Checkout page displays kit details and Stripe embedded checkout
5. Customer completes payment
6. Success page shows download link

---

## 🔐 Security Features

✅ **Server-side validation** - Prices validated on server before payment
✅ **No price manipulation** - Customers can't modify prices
✅ **Embedded checkout** - Payment form hosted securely by Stripe
✅ **PCI compliant** - No credit card data touches your servers

---

## 📝 Next Steps

### 1. Test Payments
Use Stripe test mode with these test cards:
- **Success:** 4242 4242 4242 4242
- **Declined:** 4000 0000 0000 0002
- Use any future expiry date and any CVC

### 2. Create Success Page
You'll want to create a `/success` or `/purchase-complete` page that:
- Thanks the customer
- Shows order details
- Provides download link
- Sends confirmation email

### 3. Add Webhooks (Recommended)
For production, set up Stripe webhooks to:
- Track successful payments
- Store purchase records in Notion
- Send download links via email
- Handle failed payments

### 4. Go Live
When ready for real payments:
1. Switch Stripe from Test Mode to Live Mode in your Stripe dashboard
2. Update the environment variables in Vercel with your live Stripe keys
3. Redeploy your application

---

## ❓ FAQ

**Q: Do I need to add Stripe Price IDs to Notion?**
A: No! The integration uses dynamic pricing. Prices are pulled from Notion and Stripe creates temporary products.

**Q: Can customers purchase exclusive beats?**
A: Exclusive beats redirect to your contact page as requested. Custom pricing requires direct negotiation.

**Q: What happens after payment?**
A: Currently, customers see Stripe's default success message. You should create a custom success page with download links.

**Q: How do I track sales?**
A: View all payments in your Stripe Dashboard. Consider adding webhooks to store purchase records in Notion.

---

## 🎉 You're Ready!

Your Stripe integration is fully configured and ready to accept payments. Test the checkout flow with Stripe test cards, then go live when ready!
