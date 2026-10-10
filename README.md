# 🍽️ FastBite - Gourmet Food Delivery Web Application

A modern, ultrafast, and fully responsive Food Delivery Web Application built with **React 19**, **Vite**, and **Tailwind CSS v4**. FastBite brings a restaurant-grade ordering experience with Indian Rupee (₹) pricing, rich food categories, interactive cart management, instant vouchers, and seamless checkout tracking.

---

## 🌟 Key Features

- **🇮🇳 Indian Rupee (₹) Pricing & Authentic Cuisine**:
  - All prices, coupons, and orders calibrated in INR (`₹`).
  - Standard Indian restaurant GST (5%) & delivery charge computation with a **₹499 Free Delivery Threshold**.
  - Authentic FSSAI-style green & red indicators for **Pure Vegetarian** and **Non-Vegetarian** dishes.
  - Payment gateway supporting **UPI (Google Pay, PhonePe, Paytm, QR Scan)**, **Cards (RuPay, Visa, Mastercard)**, and **Cash on Delivery (COD)**.

- **🥘 Expanded Food Catalog (26+ Gourmet Items & 9 Categories)**:
  - 🍛 **Biryani & Bowls**: Hyderabadi Dum Chicken Biryani, Royal Awadhi Mutton Biryani, Paneer Tikka Biryani, Butter Chicken Kulcha Bowl.
  - 🍕 **Wood-Fired Pizzas**: Truffle Mushroom Sourdough, Paneer Makhani Feast, Fiery Peri-Peri Chicken, Burrata Margherita.
  - 🍔 **Gourmet Burgers**: Crispy Paneer Makhani, Double Smash Lamb, Nashville Hot Chicken, Avocado Halloumi.
  - 🥟 **Starters & Snacks**: Cheesy Peri-Peri Loaded Fries, Kurkure Momos, Charcoal Tandoori Skewers, Garlic Breadsticks.
  - 🍝 **Handmade Pastas**: Tagliatelle Bolognese, Creamy Pesto Penne, Four-Cheese Baked Lasagna.
  - 🍜 **Asian & Noodles**: Tokyo Tonkotsu Ramen, Chilli Garlic Hakka Noodles, Teriyaki Salmon Bowl.
  - 🍨 **Desserts & Sweets**: Gulab Jamun Rabdi Sundae, Belgian Molten Lava Cake, Blueberry Cheesecake, Sizzling Brownie.
  - 🥤 **Drinks & Shakes**: Kesar Alphonso Mango Lassi, Cold Coffee with Ice Cream, Passion Fruit Cooler, Salted Caramel Shake.

- **🏷️ Interactive Offers & Discount Engine**:
  - `FEAST40` — 40% OFF up to ₹150 on orders above ₹399.
  - `BOGO2026` — Flat ₹100 instant discount on orders above ₹499.
  - `FREESHIP` — 100% Free Express Delivery (saves ₹49).
  - 1-click deal claiming directly into the cart drawer.

- **🛒 Full Basket & Cart Management**:
  - Persistent shopping basket saved in `localStorage`.
  - Dynamic free delivery progress bar.
  - Interactive stepper (`[-] quantity [+]`) directly on cards or in cart.
  - Floating responsive quick-cart widget + Mobile App Bottom Navigation Bar.

- **📍 Live Order Simulation & Receipts**:
  - Real-time step progress tracker: *Order Confirmed ➔ Kitchen Cooking ➔ Express Rider Dispatched ➔ Delivered*.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Run

1. Navigate to the `Frontend` folder:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser at: `http://localhost:5173/`

4. Production Build:
   ```bash
   npm run build
   ```
