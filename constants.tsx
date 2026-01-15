import React from 'react';
import { ShoppingBag, Layers, ArrowUpCircle, Award, ShieldCheck, Zap } from 'lucide-react';
import { Content, Language } from './types';

export const APP_LOGO_URL = "https://cdn.shopify.com/s/files/1/0370/2466/1636/files/new-abu-logo.png?v=1768487866";
export const SHOPIFY_LOGO_URL = "https://cdn.freebiesupply.com/logos/large/2x/shopify-logo-png-transparent.png";

const BLOG_POSTS_EN = [
  {
    id: '1',
    title: "Upselling vs. Cross-selling: The Ultimate Guide to increasing Revenue",
    excerpt: "Understand the deep strategic differences between these two powerful strategies and exactly when to use them to maximize AOV.",
    content: [
      "In the competitive landscape of modern e-commerce, acquiring a customer is only half the battle. With rising ad costs (CAC) across Meta, Google, and TikTok, the real profitability lies in maximizing the value of every single transaction. This is where Average Order Value (AOV) optimization comes into play. The two most potent weapons in an AOV optimization arsenal are Upselling and Cross-selling. While often used interchangeably by novices, they are distinct psychological strategies that require different approaches, timing, and execution.",
      "**What is Upselling? The Art of the Upgrade**",
      "Upselling is the practice of encouraging a customer to purchase a comparable higher-end product than the one in question. It is about moving the customer up the value chain. Think of it as the 'Super Size' effect. When a customer is looking at a 13-inch laptop, suggesting the 15-inch model with a faster processor is an upsell. When they are buying a standard subscription, offering the 'Pro' tier is an upsell.",
      "The psychology behind upselling relies on the customer's desire for value and future-proofing. A customer might think, 'If I'm already spending $800, what is another $100 to ensure I don't run out of storage space?'. Effective upselling highlights the benefits of the premium version—durability, speed, capacity, or exclusivity—making the price gap seem negligible compared to the value gained.",
      "**What is Cross-selling? The Power of Complements**",
      "Cross-selling invites customers to buy related or complementary items that enhance the use of the primary product. If upselling is 'better', cross-selling is 'more'. If a customer buys a flashlight, selling them batteries is a cross-sell. If they buy a dress, suggesting matching shoes or a handbag is a cross-sell.",
      "The psychology here is different. It taps into convenience and 'completeness'. The customer wants to ensure they have everything they need to enjoy their purchase immediately. It also triggers impulse buying behavior, especially for lower-priced accessories. A $20 screen protector feels cheap when you have just committed to a $1000 phone.",
      "**The Strategic Difference: When to Use Which?**",
      "Timing is critical. Upselling works best *before* the purchase decision is fully cemented—typically on the Product Detail Page (PDP) or during the initial cart view. You are trying to alter the core decision. Cross-selling, however, is incredibly versatile. It works well on the PDP ('Frequently Bought Together'), in the Cart Drawer ('Add accessories'), and most effectively, Post-Purchase.",
      "**Combining Both for Maximum Impact**",
      "The most successful Shopify stores, like those using ABU, employ a hybrid strategy. They might use an AI-driven upsell on the product page to get the customer to the premium version, and then use a Cart Drawer or Post-Purchase offer to cross-sell necessary accessories. This 'one-two punch' strategy can increase AOV by 15-30% overnight.",
      "Ultimately, the key to success in both strategies is relevance. Irrelevant offers (like offering a winter coat to someone buying a swimsuit) breaks trust and can even lead to cart abandonment. Tools like ABU use sophisticated algorithms to ensure that every recommendation is strictly relevant to what the customer is actually interested in, preserving the user experience while aggressively driving revenue."
    ],
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
    date: "Oct 12, 2025",
    author: "Alex Rivera",
    category: "Strategy",
    readTime: "8 min read"
  },
  {
    id: '2',
    title: "The Psychology Behind 'Frequently Bought Together'",
    excerpt: "Why does social proof and convenience drive massive sales on product pages? A deep dive into consumer behavior.",
    content: [
      "If you have ever shopped on Amazon, you have seen the 'Frequently Bought Together' section. It usually sits right below the main product image and price, offering a bundle of three items with a single 'Add all to Cart' button. This simple widget is responsible for billions of dollars in revenue. But why does it work so well? The answer lies in deep-rooted psychological principles: Social Proof, Cognitive Ease, and Authority.",
      "**1. Social Proof: The Wisdom of the Crowd**",
      "Humans are social animals. When we are uncertain, we look to others for guidance. In e-commerce, we can't see other shoppers, so we rely on data signals. The phrase 'Frequently Bought Together' implies a data-backed truth: 'Other people, who are smart like you, bought these items together.' It validates the combination. It makes the shopper feel like buying the bundle is the 'standard' or 'correct' way to experience the product. If everyone else buys the lens cleaner with the camera, I probably should too, or I might be missing out (FOMO).",
      "**2. Cognitive Ease (Reducing Friction)**",
      "Daniel Kahneman, in his book 'Thinking, Fast and Slow', discusses Cognitive Ease. The human brain prefers to avoid hard work. Searching for compatible accessories is hard work. 'Will this case fit this specific model of phone?', 'Do these batteries work with this toy?'. This search friction is a conversion killer.",
      "The 'Frequently Bought Together' widget eliminates this friction entirely. It presents a pre-verified solution on a silver platter. The customer doesn't have to think; they just have to click. By bundling the decision into a single action ('Add all to Cart'), you reduce the number of micro-decisions the brain has to make, smoothing the path to checkout.",
      "**3. The Authority of the Algorithm**",
      "Shoppers have learned to trust algorithms. When a store suggests a pairing, there is an implicit assumption of expertise. The store 'knows' its inventory better than the shopper does. ABU's FBT widget is designed to look native to your Shopify store, reinforcing this authority. It doesn't look like an ad; it looks like a helpful store feature.",
      "**Implementing FBT for Maximum AOV**",
      "To maximize the impact of this psychology, the visual presentation is key. The total price should be clear. If you can offer a small bundle discount (e.g., 'Save 10% when buying all three'), you trigger another psychological bias: Loss Aversion. The pain of losing that 10% discount is often a stronger motivator than the pleasure of owning the items.",
      "Furthermore, placement matters. It should be above the fold or immediately after the product description. It needs to be seen while the dopamine of the initial purchase intent is high. ABU's customizable widgets allow you to place this powerful engine exactly where it needs to be to intercept the customer's attention and expand the cart value effortlessly."
    ],
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800",
    date: "Oct 15, 2025",
    author: "Sarah Jenkins",
    category: "Psychology",
    readTime: "7 min read"
  },
  {
    id: '3',
    title: "Why Post-Purchase Upsells Convert Better Than Anything Else",
    excerpt: "The moment after payment is the golden hour for e-commerce sales. Unlocking the secrets of the OCU (One Click Upsell).",
    content: [
      "Most merchants focus entirely on the funnel leading *up to* the checkout. They optimize ads, landing pages, product descriptions, and the cart page. But the sale doesn't end when the customer clicks 'Pay'. In fact, the Post-Purchase page—the screen between the payment processing and the final 'Thank You' page—is arguably the highest converting real estate in the entire digital ecosystem.",
      "**The 'Euphoria' of Purchase**",
      "When a customer completes a purchase, their brain releases dopamine. They have successfully navigated the decision-making process, overcome the anxiety of spending money, and are now anticipating the reward (the product). This creates a temporary state of high compliance and low resistance. They are in 'buying mode'.",
      "**Zero Friction: The Tokenized Payment**",
      "The biggest barrier to any online sale is entering payment and shipping information. It's tedious, and it forces the customer to pull out their wallet. Post-purchase upsells bypass this completely. Because the payment gateway (like Shopify Payments) has just tokenized the credit card for the initial order, the system can legally charge that card again within a short window with the customer's consent.",
      "This allows for the holy grail of e-commerce: The One-Click Buy. The customer sees an offer, clicks 'Add to Order', and it is instantly processed. No forms, no CVV codes, no address fields. The friction is literally zero.",
      "**What Offers Work Best Post-Purchase?**",
      "Not every product works here. Since the customer has already made their 'main' decision, post-purchase offers work best when they are impulsive or highly complementary. Mystery boxes, extended warranties, 'more of the same' (consumables like supplements or skincare), or limited-time exclusive discounts work wonders.",
      "For example, if someone just bought a coffee machine, a post-purchase offer for a monthly bean subscription or a specialized cleaning kit is a no-brainer. They don't need to do research; the logic is self-evident.",
      "**The Logic of Profitability**",
      "From a business perspective, post-purchase revenue is pure profit. You have already paid the Customer Acquisition Cost (CAC) to get the initial order. You don't need to pay Facebook or Google another dime to show them this second offer. This means the margin on post-purchase upsells is significantly higher than on the initial product. ABU allows you to set up these funnels in minutes, turning single-product buyers into multi-item loyalists before they even leave your site."
    ],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800",
    date: "Oct 18, 2025",
    author: "Mike Chen",
    category: "Conversion",
    readTime: "6 min read"
  },
  {
    id: '4',
    title: "5 Advanced Tips to Increase Average Order Value (AOV)",
    excerpt: "Go beyond the basics. Here are actionable, high-level strategies you can implement today to make every customer worth more.",
    content: [
      "Increasing traffic is expensive and difficult. Increasing Average Order Value (AOV) is efficient and entirely within your control. If you can get every customer to spend just 15% more, your profitability often doubles because your fixed costs remain the same. Here are 5 advanced strategies to boost AOV using tools like ABU.",
      "**1. The Strategic Bundle: 'Kit' Thinking**",
      "Don't just sell products; sell solutions. If you sell cameras, don't wait for the customer to find the memory card and the bag. Create a 'Starter Photographer Kit'. Bundles increase the perceived value while simplifying the shopping experience. The key is to bundle high-margin accessories with lower-margin core products. This allows you to offer a discount on the bundle that looks attractive to the customer but protects your bottom line.",
      "**2. The Free Shipping Threshold Ladder**",
      "This is a classic for a reason. If your median order value is $42, set your Free Shipping threshold at $50 or $55. This forces the customer to look for a 'filler' item to bridge the gap. Use ABU's Cart Drawer or Pop-up to specifically recommend items that cost just enough to get them over that line. 'Add this $8 cleaner to unlock Free Shipping' is a much more compelling pitch than just 'Buy this cleaner'.",
      "**3. Time-Sensitive Cart Urgency**",
      "The cart is where hesitation happens. To combat this, introduce urgency. A cart pop-up that offers a 10% discount on an upsell item 'for the next 5 minutes only' triggers Loss Aversion. The customer feels they are literally throwing money away if they don't accept the deal now. ABU allows you to add countdown timers to these offers to visually reinforce the scarcity.",
      "**4. Tiered Loyalty Rewards**",
      "Gamify the spending. 'Spend $100, get $10 back. Spend $200, get $30 back.' By creating tiers, you encourage customers who have $180 in their cart to stretch for that $200 mark. While this is often handled by loyalty apps, you can reinforce it with upsell messaging: 'You are only $20 away from VIP status.'",
      "**5. Smart, Data-Driven Recommendations**",
      "Stop guessing. Humans are bad at predicting patterns. You might think people who buy red socks want blue socks, but the data might show they actually want shoe polish. ABU's AI analyzes thousands of data points to find the hidden correlations in your sales data. Trust the algorithm. Displaying 'Customers also bought' based on real data creates a feedback loop of success.",
      "**Conclusion**",
      "Implementing these tips doesn't require a website overhaul. With ABU, you can activate these widgets and logic layers on top of your existing theme. The goal is to maximize the extraction of value from the traffic you already have."
    ],
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
    date: "Oct 20, 2025",
    author: "Alex Rivera",
    category: "Tips",
    readTime: "9 min read"
  },
  {
    id: '5',
    title: "The Art of the Cart Drawer Upsell: Design & Strategy",
    excerpt: "How to use the cart space without annoying your customers. Balancing UX with sales aggression.",
    content: [
      "The Cart Drawer (or Slide-out Cart) has replaced the dedicated Cart Page as the standard in modern e-commerce UX. It allows customers to check their total without leaving the shopping experience. But for a savvy merchant, the Cart Drawer is not just a receipt; it is a prime marketing channel. It is the digital equivalent of the candy racks at the grocery store checkout line.",
      "**The Fine Line Between Helpful and Annoying**",
      "The danger with cart upsells is friction. If you bombard the user with pop-ups and flashing lights when they are trying to check out, they might get annoyed and abandon the cart. A good cart upsell is integrated, subtle, and highly relevant. It should feel like a 'Did you forget this?' reminder rather than a 'Buy this now!' scream.",
      "**The 'Impulse' Price Point**",
      "Cart drawer real estate is limited. You cannot sell complex products here. This is not the place to sell a $500 jacket that requires size chart consultation. This is the place to sell items that require zero thought. Consumables, warranties, mystery items, or low-cost accessories (under $20) work best. The price needs to be low enough that it doesn't trigger 'price shock' relative to the main cart total.",
      "**Visual Design Matters**",
      "ABU allows you to customize the look of these in-cart widgets. They should blend in with your theme's typography and color palette. A progress bar indicating how close they are to a reward (Free Shipping or Free Gift) is a fantastic visual cue to place at the top of the drawer. Below the product list, a simple 'You might also like' carousel or a single 'One-time offer' block works well.",
      "**Logic and Rules**",
      "The power of ABU lies in its logic engine. You can set rules like: 'If the cart contains a Shoe, show Shoe Cleaner.' 'If the cart total is over $100, show a VIP Mystery Box.' 'If the cart contains a fragile item, show Shipping Insurance.' This contextual relevance makes the upsell feel like a service, improving the customer experience while padding your margins.",
      "**Mobile Considerations**",
      "On mobile, the cart drawer takes up most of the screen. Ensure your upsell widget doesn't push the 'Checkout' button below the fold. The path to payment must always be visible. ABU's mobile-responsive designs automatically adjust layout to ensure the checkout button remains the primary call to action."
    ],
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800",
    date: "Oct 22, 2025",
    author: "Sarah Jenkins",
    category: "UX Design",
    readTime: "7 min read"
  },
  {
    id: '6',
    title: "Personalization: The Future of Cross-Selling with AI",
    excerpt: "Static recommendations are dead. Why AI is essential for modern stores and how it learns from your customers.",
    content: [
      "In the early days of e-commerce (the Web 1.0 era), 'Related Products' were manually selected by the store owner. You would upload a product, then manually tag 3-4 other products you thought went well with it. This was tedious, unscalable, and often inaccurate based on biases. Today, that approach is obsolete.",
      "**The 'Netflix Effect' in Commerce**",
      "Consumers have been trained by Netflix, Spotify, and TikTok to expect hyper-personalization. They expect the platform to know what they want before they do. If they see generic recommendations, they tune them out as 'banner blindness'. But if they see highly specific recommendations, they engage.",
      "**How ABU's AI Works**",
      "Modern upsell apps like ABU use collaborative filtering and natural language processing. The AI looks at transaction history: 'Users who bought A and B, also bought C 70% of the time.' It looks at semantic relationships in product descriptions. It looks at real-time session behavior. This allows the system to surface connections a human would miss.",
      "For example, an AI might discover that people buying baby diapers are also buying beer on Friday afternoons (a famous data mining legend). A human merchandiser would never manually pair those items, but an algorithm sees the pattern and capitalizes on it.",
      "**Dynamic vs. Static**",
      "Static cross-sells become stale. If a product goes out of stock, your manual link is broken. AI is dynamic. If 'Product C' goes out of stock, the algorithm instantly swaps it for the next best recommendation, 'Product D'. This ensures you never have dead real estate on your product pages.",
      "**The Cold Start Problem**",
      "What if you are a new store with no data? ABU solves this with 'Global Intelligence' or content-based filtering. It can analyze the text and images of your products to find similarities even without purchase history. As you get more sales, the model switches to behavioral data, becoming smarter and more accurate with every single order.",
      "Personalization is no longer a luxury for enterprise giants like Amazon; it is a necessity for any Shopify store that wants to compete."
    ],
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800",
    date: "Oct 24, 2025",
    author: "Dr. Alan Grant",
    category: "AI & Tech",
    readTime: "8 min read"
  },
  {
    id: '7',
    title: "Mobile Optimization for Upsell Widgets",
    excerpt: "Over 70% of traffic is mobile. Is your upsell strategy ready for the small screen?",
    content: [
      "We live in a mobile-first world. For many DTC (Direct to Consumer) brands, mobile traffic accounts for 80% or even 90% of visits. TikTok and Instagram ads drive traffic straight to mobile browsers. Yet, many merchants design their store on a 27-inch iMac and forget to check how it feels on an iPhone SE.",
      "**The Screen Real Estate Crisis**",
      "On a desktop, you have space to show a 'Frequently Bought Together' row with 4 products, full titles, and descriptions. On mobile, that same row crushes the layout. It pushes the reviews, description, and most importantly, the 'Add to Cart' button way down the page. This increases the 'scroll depth' required to buy, which hurts conversion rates.",
      "**Designing for the Thumb Zone**",
      "Upsell widgets on mobile need to be designed for the 'Thumb Zone'—the area of the screen easily reachable with one hand. They need to be compact. Instead of a grid, mobile upsells should be swipeable carousels. Or, they should be collapsible accordions (e.g., 'Add Accessories +').",
      "**Speed is Key**",
      "Mobile networks are often slower or less stable than desktop WiFi. Adding heavy scripts for upsell apps can slow down your Largest Contentful Paint (LCP). A slow site kills conversion. ABU is built with performance in mind, using lightweight code that loads asynchronously. This means your main product content loads first, and the upsell widgets load milliseconds later, ensuring the user experience feels snappy.",
      "**One-Tap Interactions**",
      "On mobile, typing is hard. Tapping is easy. Your upsell widgets should allow adding to cart with a single tap. Avoid variants selectors (Size/Color) in upsell widgets if possible, or use smart defaults (e.g., default to the main product's size). The easier you make it to say 'Yes', the higher your take rate will be.",
      "ABU provides mobile-specific settings, allowing you to hide certain widgets on mobile or change their layout style to ensure you capture the mobile revenue without sacrificing the user experience."
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    date: "Oct 25, 2025",
    author: "Mike Chen",
    category: "Mobile",
    readTime: "6 min read"
  },
  {
    id: '8',
    title: "How to Bundle Products Without Losing Profit",
    excerpt: "Discounting is dangerous if done wrong. Here is how to bundle safely to protect your margins.",
    content: [
      "Everyone loves a deal. Bundling—selling products A, B, and C together for a lower price than buying them separately—is a proven volume driver. However, it is a double-edged sword. If you discount too heavily, you might increase revenue while destroying your net profit. The goal is to maximize *gross profit dollars*, not just revenue.",
      "**The Margin Mix Strategy**",
      "The secret to profitable bundling is mixing margin profiles. You likely have a 'Hero' product with lower margins (because it's competitive) and 'Accessory' products with massive margins (cables, warranties, branded swag).",
      "Let's say Product A costs $50 and sells for $100 (50% margin). Product B costs $2 and sells for $20 (90% margin).",
      "Buying them separately costs the customer $120. Your cost is $52. Profit is $68.",
      "If you bundle them for $110 (a $10 discount), the customer feels like they got a great deal (50% off the accessory!). Your revenue is $110, cost is $52, profit is $58.",
      "Wait, did profit go down from $68 to $58? Yes, BUT you probably wouldn't have sold Product B at all without the bundle. Selling the bundle gives you $58 profit vs selling only Product A for $50 profit. You gained $8 extra profit by giving a $10 discount. This is the math of bundling.",
      "**Inventory Management**",
      "Bundling is also a fantastic tool for inventory control. Do you have 'dead stock'—items that don't sell but take up space? Bundle them as a 'Free Gift' or a heavily discounted add-on with your best-sellers. You liquidate inventory, free up cash flow, and increase the conversion rate of your main products by adding value.",
      "**Automated Bundles with ABU**",
      "With ABU, you can set these rules dynamically. 'Buy 2 Get 1 Free', 'Buy Kit A and Save 15%'. The app handles the logic and the discount automatically at checkout, ensuring your inventory syncs correctly."
    ],
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
    date: "Oct 27, 2025",
    author: "Alex Rivera",
    category: "Finance",
    readTime: "8 min read"
  },
  {
    id: '9',
    title: "Timing is Everything: Pre vs. Post Purchase Strategies",
    excerpt: "When to ask for more money? The answer depends entirely on the product type and customer journey.",
    content: [
      "Asking for an upsell is like asking for a second date. You have to time it right. Ask too soon, and you seem desperate. Ask too late, and they are gone. In e-commerce, the funnel is divided into two distinct psychological zones: Pre-Purchase (Browsing/Cart) and Post-Purchase (After Payment).",
      "**Pre-Purchase: Building the Basket**",
      "In the Pre-Purchase phase, the customer is evaluating. They ask: 'Is this the right solution?' 'Can I afford this?'.",
      "Upsells here should focus on *Solving Problems* and *Building Trust*.",
      "Good Pre-Purchase Upsells: Compatibility items (Batteries for the toy), Essential add-ons (cables), Upgrades (Bigger size for better value), Social Proof Bundles ('Others bought this too').",
      "Bad Pre-Purchase Upsells: Random items, expensive items requiring new research, distractions.",
      "The goal here is to increase basket size without introducing 'Analysis Paralysis'. If you offer too many choices, they might choose nothing.",
      "**Post-Purchase: The Impulse Zone**",
      "In the Post-Purchase phase, the hard work is done. The 'Purchase Decision' has been made. The wallet is open.",
      "Upsells here should focus on *Desire* and *Exclusivity*.",
      "Good Post-Purchase Upsells: Limited time offers, Mystery Boxes, Consumables, Gifts.",
      "Because friction is gone (thanks to tokenized 1-click payments), you can be more aggressive here. You aren't risking the initial sale, it's already in the bank. This is bonus money.",
      "**The Hybrid Approach**",
      "Smart merchants map their products to these zones. They use ABU to place technical accessories on the product page (Pre-Purchase) and fun, high-margin impulse items on the Thank You page (Post-Purchase). This covers the full emotional spectrum of the buying journey."
    ],
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
    date: "Oct 29, 2025",
    author: "Sarah Jenkins",
    category: "Strategy",
    readTime: "7 min read"
  },
  {
    id: '10',
    title: "A/B Testing your Offers: The Scientific Method for Revenue",
    excerpt: "Don't guess. Test. How to optimize your upsell performance using data instead of intuition.",
    content: [
      "Marketing is an art, but optimization is a science. You might *feel* that a red 'Add to Cart' button is better, or that a 15% discount is better than 'Free Shipping', but until you test it, you are just guessing. In the world of upselling, small tweaks can lead to massive revenue shifts.",
      "**What is A/B Testing?**",
      "A/B testing (or split testing) involves showing two variations of an element to two similar audiences at the same time to see which performs better. For example, showing Group A a 'Frequently Bought Together' widget with 2 items, and Group B a widget with 3 items.",
      "**Key Variables to Test in Upselling**",
      "1. **The Offer:** Does 'Buy 2 Get 1 Free' work better than '30% Off Bundle'? Often, 'Free' is a power word that beats mathematical discounts even if the monetary value is lower.",
      "2. **The Placement:** Does the upsell work better in a Pop-up or embedded in the page? Does it work better in the Cart or on the Product Page?",
      "3. **The Creative:** Test different headlines. 'Complete the Look' vs 'Customers Also Bought'. Test button colors. Test showing savings in dollars ($10 off) vs percentage (10% off).",
      "4. **The Product Pairing:** Maybe your customers prefer pairing the Camera with a Lens, rather than the Camera with a Tripod.",
      "**Statistical Significance**",
      "Don't stop the test too early. If you have 10 visitors and 2 buy, that's not data; it's luck. You need a large enough sample size to ensure the results are statistically significant. Tools like ABU provide analytics dashboards to help you track views, clicks, and conversions.",
      "**The Cycle of Continuous Improvement**",
      "Optimization never ends. Once you find a winner, that becomes your new baseline (Control). Then you try to beat it with a new Challenger. This iterative process is how the best Shopify stores scale. They don't have better products; they have better optimized funnels."
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "Oct 30, 2025",
    author: "Dr. Alan Grant",
    category: "Analytics",
    readTime: "8 min read"
  }
];

const BLOG_POSTS_ES = [
  {
    id: '1',
    title: "Upselling vs. Cross-selling: La Guía Definitiva para aumentar Ingresos",
    excerpt: "Entiende las profundas diferencias estratégicas entre estas dos poderosas estrategias y exactamente cuándo usarlas para maximizar el AOV.",
    content: [
      "En el competitivo panorama del comercio electrónico moderno, adquirir un cliente es solo la mitad de la batalla. Con el aumento de los costes publicitarios (CAC) en Meta, Google y TikTok, la rentabilidad real radica en maximizar el valor de cada transacción. Aquí es donde entra en juego la optimización del Valor Medio del Pedido (AOV). Las dos armas más potentes en un arsenal de optimización de AOV son el Upselling y el Cross-selling. Aunque a menudo se usan indistintamente por novatos, son estrategias psicológicas distintas que requieren diferentes enfoques, tiempos y ejecución.",
      "**¿Qué es el Upselling? El Arte de la Mejora**",
      "El upselling es la práctica de animar a un cliente a comprar un producto comparable de gama más alta que el que está considerando. Se trata de mover al cliente hacia arriba en la cadena de valor. Piensa en el efecto 'Super Size'. Cuando un cliente mira un portátil de 13 pulgadas, sugerir el modelo de 15 pulgadas con un procesador más rápido es un upsell. Cuando compran una suscripción estándar, ofrecer el nivel 'Pro' es un upsell.",
      "La psicología detrás del upselling se basa en el deseo del cliente de valor y preparación para el futuro. Un cliente podría pensar: 'Si ya estoy gastando 800$, ¿qué son otros 100$ para asegurar que no me quedo sin espacio de almacenamiento?'. Un upselling efectivo destaca los beneficios de la versión premium —durabilidad, velocidad, capacidad o exclusividad— haciendo que la diferencia de precio parezca insignificante comparada con el valor ganado.",
      "**¿Qué es el Cross-selling? El Poder de los Complementos**",
      "El cross-selling invita a los clientes a comprar artículos relacionados o complementarios que mejoran el uso del producto principal. Si el upselling es 'mejor', el cross-selling es 'más'. Si un cliente compra una linterna, venderle baterías es un cross-sell. Si compran un vestido, sugerir zapatos a juego o un bolso es un cross-sell.",
      "La psicología aquí es diferente. Aprovecha la conveniencia y la 'completitud'. El cliente quiere asegurarse de tener todo lo que necesita para disfrutar de su compra inmediatamente. También desencadena un comportamiento de compra impulsiva, especialmente para accesorios de menor precio. Un protector de pantalla de 20$ parece barato cuando acabas de comprometerte con un teléfono de 1000$.",
      "**La Diferencia Estratégica: ¿Cuándo Usar Cuál?**",
      "El momento es crítico. El upselling funciona mejor *antes* de que la decisión de compra esté completamente cimentada, típicamente en la Página de Detalle del Producto (PDP) o durante la vista inicial del carrito. Estás intentando alterar la decisión central. El cross-selling, sin embargo, es increíblemente versátil. Funciona bien en la PDP ('Comprados Juntos Habitualmente'), en el Cajón del Carrito ('Añadir accesorios'), y más efectivamente, Post-Compra.",
      "**Combinando Ambos para el Máximo Impacto**",
      "Las tiendas Shopify más exitosas, como las que usan ABU, emplean una estrategia híbrida. Podrían usar un upsell impulsado por IA en la página del producto para llevar al cliente a la versión premium, y luego usar una oferta en el Cajón del Carrito o Post-Compra para hacer cross-sell de accesorios necesarios. Esta estrategia de 'uno-dos' puede aumentar el AOV en un 15-30% de la noche a la mañana.",
      "En última instancia, la clave del éxito en ambas estrategias es la relevancia. Ofertas irrelevantes (como ofrecer un abrigo de invierno a alguien que compra un traje de baño) rompen la confianza y pueden llevar al abandono del carrito. Herramientas como ABU usan algoritmos sofisticados para asegurar que cada recomendación sea estrictamente relevante para lo que el cliente realmente está interesado, preservando la experiencia del usuario mientras impulsan agresivamente los ingresos."
    ],
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
    date: "12 Oct, 2025",
    author: "Alex Rivera",
    category: "Estrategia",
    readTime: "8 min lectura"
  },
  {
    id: '2',
    title: "La Psicología detrás de 'Comprados Juntos Habitualmente'",
    excerpt: "¿Por qué la prueba social y la conveniencia impulsan ventas masivas en las páginas de productos? Una inmersión profunda en el comportamiento del consumidor.",
    content: [
      "Si alguna vez has comprado en Amazon, has visto la sección 'Comprados Juntos Habitualmente'. Generalmente se encuentra justo debajo de la imagen principal del producto y el precio, ofreciendo un paquete de tres artículos con un solo botón de 'Añadir todo al Carrito'. Este sencillo widget es responsable de miles de millones de dólares en ingresos. ¿Pero por qué funciona tan bien? La respuesta yace en principios psicológicos profundamente arraigados: Prueba Social, Facilidad Cognitiva y Autoridad.",
      "**1. Prueba Social: La Sabiduría de la Multitud**",
      "Los humanos somos animales sociales. Cuando estamos inseguros, buscamos orientación en otros. En el comercio electrónico, no podemos ver a otros compradores, así que confiamos en señales de datos. La frase 'Comprados Juntos Habitualmente' implica una verdad respaldada por datos: 'Otras personas, que son inteligentes como tú, compraron estos artículos juntos.' Valida la combinación. Hace que el comprador sienta que comprar el paquete es la forma 'estándar' o 'correcta' de experimentar el producto. Si todos los demás compran el limpiador de lentes con la cámara, probablemente yo también debería, o podría estar perdiéndome algo (FOMO).",
      "**2. Facilidad Cognitiva (Reduciendo la Fricción)**",
      "Daniel Kahneman, en su libro 'Pensar rápido, pensar despacio', discute la Facilidad Cognitiva. El cerebro humano prefiere evitar el trabajo duro. Buscar accesorios compatibles es trabajo duro. '¿Encajará esta funda en este modelo específico de teléfono?', '¿Funcionan estas baterías con este juguete?'. Esta fricción de búsqueda es un asesino de conversiones.",
      "El widget 'Comprados Juntos Habitualmente' elimina esta fricción por completo. Presenta una solución pre-verificada en bandeja de plata. El cliente no tiene que pensar; solo tiene que hacer clic. Al agrupar la decisión en una sola acción ('Añadir todo al Carrito'), reduces el número de micro-decisiones que el cerebro tiene que tomar, allanando el camino hacia el pago.",
      "**3. La Autoridad del Algoritmo**",
      "Los compradores han aprendido a confiar en los algoritmos. Cuando una tienda sugiere un emparejamiento, hay una suposición implícita de experiencia. La tienda 'conoce' su inventario mejor que el comprador. El widget FBT de ABU está diseñado para parecer nativo de tu tienda Shopify, reforzando esta autoridad. No parece un anuncio; parece una función útil de la tienda.",
      "**Implementando FBT para Máximo AOV**",
      "Para maximizar el impacto de esta psicología, la presentación visual es clave. El precio total debe ser claro. Si puedes ofrecer un pequeño descuento por paquete (ej., 'Ahorra 10% al comprar los tres'), activas otro sesgo psicológico: Aversión a la Pérdida. El dolor de perder ese 10% de descuento es a menudo un motivador más fuerte que el placer de poseer los artículos.",
      "Además, la ubicación importa. Debe estar por encima del pliegue o inmediatamente después de la descripción del producto. Necesita ser visto mientras la dopamina de la intención de compra inicial es alta. Los widgets personalizables de ABU te permiten colocar este potente motor exactamente donde necesita estar para interceptar la atención del cliente y expandir el valor del carrito sin esfuerzo."
    ],
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800",
    date: "15 Oct, 2025",
    author: "Sarah Jenkins",
    category: "Psicología",
    readTime: "7 min lectura"
  },
  {
    id: '3',
    title: "Por qué los Upsells Post-Compra Convierten Mejor que Nada",
    excerpt: "El momento después del pago es la hora dorada para las ventas de comercio electrónico. Desbloqueando los secretos del OCU (One Click Upsell).",
    content: [
      "La mayoría de los comerciantes se centran completamente en el embudo que lleva *hasta* el pago. Optimizan anuncios, landing pages, descripciones de productos y la página del carrito. Pero la venta no termina cuando el cliente hace clic en 'Pagar'. De hecho, la página Post-Compra —la pantalla entre el procesamiento del pago y la página final de 'Gracias'— es posiblemente el espacio inmobiliario de mayor conversión en todo el ecosistema digital.",
      "**La 'Euforia' de la Compra**",
      "Cuando un cliente completa una compra, su cerebro libera dopamina. Han navegado con éxito el proceso de toma de decisiones, superado la ansiedad de gastar dinero y ahora anticipan la recompensa (el producto). Esto crea un estado temporal de alta conformidad y baja resistencia. Están en 'modo compra'.",
      "**Cero Fricción: El Pago Tokenizado**",
      "La mayor barrera para cualquier venta online es introducir la información de pago y envío. Es tedioso y obliga al cliente a sacar su cartera. Los upsells post-compra evitan esto completamente. Debido a que la pasarela de pago (como Shopify Payments) acaba de tokenizar la tarjeta de crédito para el pedido inicial, el sistema puede cargar legalmente esa tarjeta de nuevo dentro de una ventana corta con el consentimiento del cliente.",
      "Esto permite el santo grial del comercio electrónico: La Compra en Un Clic. El cliente ve una oferta, hace clic en 'Añadir al Pedido', y se procesa instantáneamente. Sin formularios, sin códigos CVV, sin campos de dirección. La fricción es literalmente cero.",
      "**¿Qué Ofertas Funcionan Mejor Post-Compra?**",
      "No todos los productos funcionan aquí. Dado que el cliente ya ha tomado su decisión 'principal', las ofertas post-compra funcionan mejor cuando son impulsivas o altamente complementarias. Cajas misteriosas, garantías extendidas, 'más de lo mismo' (consumibles como suplementos o cuidado de la piel), o descuentos exclusivos por tiempo limitado funcionan de maravilla.",
      "Por ejemplo, si alguien acaba de comprar una máquina de café, una oferta post-compra para una suscripción mensual de granos o un kit de limpieza especializado es obvia. No necesitan investigar; la lógica es evidente.",
      "**La Lógica de la Rentabilidad**",
      "Desde una perspectiva empresarial, los ingresos post-compra son puro beneficio. Ya has pagado el Coste de Adquisición de Cliente (CAC) para obtener el pedido inicial. No necesitas pagar a Facebook o Google ni un centavo más para mostrarles esta segunda oferta. Esto significa que el margen en upsells post-compra es significativamente mayor que en el producto inicial. ABU te permite configurar estos embudos en minutos, convirtiendo compradores de un solo producto en leales multi-artículo antes de que siquiera abandonen tu sitio."
    ],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800",
    date: "18 Oct, 2025",
    author: "Mike Chen",
    category: "Conversión",
    readTime: "6 min lectura"
  },
  {
    id: '4',
    title: "5 Consejos Avanzados para Aumentar el Valor Medio del Pedido (AOV)",
    excerpt: "Ve más allá de lo básico. Aquí tienes estrategias accionables de alto nivel que puedes implementar hoy para hacer que cada cliente valga más.",
    content: [
      "Aumentar el tráfico es caro y difícil. Aumentar el Valor Medio del Pedido (AOV) es eficiente y está completamente bajo tu control. Si puedes conseguir que cada cliente gaste solo un 15% más, tu rentabilidad a menudo se duplica porque tus costes fijos permanecen iguales. Aquí tienes 5 estrategias avanzadas para impulsar el AOV usando herramientas como ABU.",
      "**1. El Bundle Estratégico: Pensamiento 'Kit'**",
      "No vendas solo productos; vende soluciones. Si vendes cámaras, no esperes a que el cliente encuentre la tarjeta de memoria y la bolsa. Crea un 'Kit de Fotógrafo Principiante'. Los bundles aumentan el valor percibido mientras simplifican la experiencia de compra. La clave es agrupar accesorios de alto margen con productos principales de menor margen. Esto te permite ofrecer un descuento en el paquete que parece atractivo para el cliente pero protege tu resultado final.",
      "**2. La Escalera del Umbral de Envío Gratis**",
      "Esto es un clásico por una razón. Si tu valor medio de pedido es 42$, establece tu umbral de Envío Gratis en 50$ o 55$. Esto obliga al cliente a buscar un artículo 'de relleno' para cerrar la brecha. Usa el Cajón del Carrito o Pop-up de ABU para recomendar específicamente artículos que cuestan lo suficiente para llevarlos sobre esa línea. 'Añade este limpiador de 8$ para desbloquear Envío Gratis' es un argumento mucho más convincente que solo 'Compra este limpiador'.",
      "**3. Urgencia del Carrito Sensible al Tiempo**",
      "El carrito es donde ocurre la duda. Para combatir esto, introduce urgencia. Un pop-up en el carrito que ofrece un 10% de descuento en un artículo upsell 'solo por los próximos 5 minutos' activa la Aversión a la Pérdida. El cliente siente que literalmente está tirando dinero si no acepta el trato ahora. ABU te permite añadir temporizadores de cuenta regresiva a estas ofertas para reforzar visualmente la escasez.",
      "**4. Recompensas de Lealtad Escalonadas**",
      "Gamifica el gasto. 'Gasta 100$, obtén 10$ de vuelta. Gasta 200$, obtén 30$ de vuelta.' Al crear niveles, animas a los clientes que tienen 180$ en su carrito a estirarse para esa marca de 200$. Aunque esto a menudo se maneja con apps de lealtad, puedes reforzarlo con mensajes de upsell: 'Estás a solo 20$ del estado VIP.'",
      "**5. Recomendaciones Inteligentes Basadas en Datos**",
      "Deja de adivinar. Los humanos somos malos prediciendo patrones. Podrías pensar que la gente que compra calcetines rojos quiere calcetines azules, pero los datos podrían mostrar que realmente quieren betún para zapatos. La IA de ABU analiza miles de puntos de datos para encontrar las correlaciones ocultas en tus datos de ventas. Confía en el algoritmo. Mostrar 'Clientes también compraron' basado en datos reales crea un ciclo de retroalimentación de éxito.",
      "**Conclusión**",
      "Implementar estos consejos no requiere una revisión del sitio web. Con ABU, puedes activar estos widgets y capas lógicas sobre tu tema existente. El objetivo es maximizar la extracción de valor del tráfico que ya tienes."
    ],
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
    date: "20 Oct, 2025",
    author: "Alex Rivera",
    category: "Consejos",
    readTime: "9 min lectura"
  },
  {
    id: '5',
    title: "El Arte del Upsell en el Carrito Deslizante: Diseño y Estrategia",
    excerpt: "Cómo usar el espacio del carrito sin molestar a tus clientes. Equilibrando UX con agresión de ventas.",
    content: [
      "El Cajón del Carrito (o Carrito Deslizante) ha reemplazado a la Página de Carrito dedicada como el estándar en la UX de comercio electrónico moderno. Permite a los clientes verificar su total sin salir de la experiencia de compra. Pero para un comerciante astuto, el Cajón del Carrito no es solo un recibo; es un canal de marketing principal. Es el equivalente digital de los estantes de dulces en la línea de caja del supermercado.",
      "**La Fina Línea Entre Útil y Molesto**",
      "El peligro con los upsells en el carrito es la fricción. Si bombardeas al usuario con pop-ups y luces parpadeantes cuando intentan pagar, podrían molestarse y abandonar el carrito. Un buen upsell en el carrito está integrado, es sutil y altamente relevante. Debería sentirse como un recordatorio de '¿Olvidaste esto?' en lugar de un grito de '¡Compra esto ahora!'.",
      "**El Punto de Precio de 'Impulso'**",
      "El espacio del cajón del carrito es limitado. No puedes vender productos complejos aquí. Este no es el lugar para vender una chaqueta de 500$ que requiere consulta de tabla de tallas. Este es el lugar para vender artículos que requieren cero pensamiento. Consumibles, garantías, artículos misteriosos o accesorios de bajo coste (menos de 20$) funcionan mejor. El precio necesita ser lo suficientemente bajo como para no desencadenar un 'choque de precio' relativo al total del carrito principal.",
      "**El Diseño Visual Importa**",
      "ABU te permite personalizar la apariencia de estos widgets en el carrito. Deberían mezclarse con la tipografía y paleta de colores de tu tema. Una barra de progreso indicando cuán cerca están de una recompensa (Envío Gratis o Regalo Gratis) es una señal visual fantástica para colocar en la parte superior del cajón. Debajo de la lista de productos, un carrusel simple de 'También te podría gustar' o un bloque único de 'Oferta única' funciona bien.",
      "**Lógica y Reglas**",
      "El poder de ABU radica en su motor lógico. Puedes establecer reglas como: 'Si el carrito contiene un Zapato, muestra Limpiador de Zapatos.' 'Si el total del carrito es superior a 100$, muestra una Caja Misteriosa VIP.' 'Si el carrito contiene un artículo frágil, muestra Seguro de Envío.' Esta relevancia contextual hace que el upsell se sienta como un servicio, mejorando la experiencia del cliente mientras aumenta tus márgenes.",
      "**Consideraciones Móviles**",
      "En móviles, el cajón del carrito ocupa la mayor parte de la pantalla. Asegúrate de que tu widget de upsell no empuje el botón de 'Pagar' por debajo del pliegue. El camino al pago siempre debe ser visible. Los diseños responsivos de ABU ajustan automáticamente el diseño para asegurar que el botón de pago permanezca como la llamada a la acción principal."
    ],
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800",
    date: "22 Oct, 2025",
    author: "Sarah Jenkins",
    category: "Diseño UX",
    readTime: "7 min lectura"
  },
  {
    id: '6',
    title: "Personalización: El Futuro del Cross-Selling con IA",
    excerpt: "Las recomendaciones estáticas están muertas. Por qué la IA es esencial para tiendas modernas y cómo aprende de tus clientes.",
    content: [
      "En los primeros días del comercio electrónico (la era Web 1.0), los 'Productos Relacionados' eran seleccionados manualmente por el dueño de la tienda. Subías un producto, luego etiquetabas manualmente otros 3-4 productos que pensabas que iban bien con él. Esto era tedioso, no escalable y a menudo inexacto basado en sesgos. Hoy, ese enfoque es obsoleto.",
      "**El 'Efecto Netflix' en el Comercio**",
      "Los consumidores han sido entrenados por Netflix, Spotify y TikTok para esperar hiper-personalización. Esperan que la plataforma sepa lo que quieren antes que ellos. Si ven recomendaciones genéricas, las ignoran como 'ceguera de banner'. Pero si ven recomendaciones altamente específicas, interactúan.",
      "**Cómo Funciona la IA de ABU**",
      "Las apps modernas de upsell como ABU usan filtrado colaborativo y procesamiento de lenguaje natural. La IA mira el historial de transacciones: 'Usuarios que compraron A y B, también compraron C el 70% de las veces.' Mira las relaciones semánticas en las descripciones de productos. Mira el comportamiento de la sesión en tiempo real. Esto permite al sistema aflorar conexiones que un humano perdería.",
      "Por ejemplo, una IA podría descubrir que la gente que compra pañales de bebé también compra cerveza los viernes por la tarde (una famosa leyenda de minería de datos). Un comerciante humano nunca emparejaría manualmente esos artículos, pero un algoritmo ve el patrón y lo capitaliza.",
      "**Dinámico vs. Estático**",
      "Los cross-sells estáticos se vuelven rancios. Si un producto se agota, tu enlace manual está roto. La IA es dinámica. Si el 'Producto C' se agota, el algoritmo lo cambia instantáneamente por la siguiente mejor recomendación, 'Producto D'. Esto asegura que nunca tengas bienes raíces muertos en tus páginas de productos.",
      "**El Problema del Inicio en Frío**",
      "¿Qué pasa si eres una tienda nueva sin datos? ABU resuelve esto con 'Inteligencia Global' o filtrado basado en contenido. Puede analizar el texto y las imágenes de tus productos para encontrar similitudes incluso sin historial de compras. A medida que obtienes más ventas, el modelo cambia a datos de comportamiento, volviéndose más inteligente y preciso con cada pedido.",
      "La personalización ya no es un lujo para gigantes empresariales como Amazon; es una necesidad para cualquier tienda Shopify que quiera competir."
    ],
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800",
    date: "24 Oct, 2025",
    author: "Dr. Alan Grant",
    category: "IA y Tecnología",
    readTime: "8 min lectura"
  },
  {
    id: '7',
    title: "Optimización Móvil para Widgets de Upsell",
    excerpt: "Más del 70% del tráfico es móvil. ¿Está tu estrategia de upsell lista para la pantalla pequeña?",
    content: [
      "Vivimos en un mundo móvil primero. Para muchas marcas DTC (Directo al Consumidor), el tráfico móvil representa el 80% o incluso el 90% de las visitas. Los anuncios de TikTok e Instagram dirigen el tráfico directamente a navegadores móviles. Sin embargo, muchos comerciantes diseñan su tienda en un iMac de 27 pulgadas y olvidan comprobar cómo se siente en un iPhone SE.",
      "**La Crisis del Espacio de Pantalla**",
      "En un escritorio, tienes espacio para mostrar una fila de 'Comprados Juntos Habitualmente' con 4 productos, títulos completos y descripciones. En móvil, esa misma fila aplasta el diseño. Empuja las reseñas, la descripción y, lo más importante, el botón de 'Añadir al Carrito' muy abajo en la página. Esto aumenta la 'profundidad de desplazamiento' requerida para comprar, lo que perjudica las tasas de conversión.",
      "**Diseñando para la Zona del Pulgar**",
      "Los widgets de upsell en móvil necesitan estar diseñados para la 'Zona del Pulgar'—el área de la pantalla fácilmente alcanzable con una mano. Necesitan ser compactos. En lugar de una cuadrícula, los upsells móviles deberían ser carruseles deslizables. O deberían ser acordeones plegables (ej., 'Añadir Accesorios +').",
      "**La Velocidad es Clave**",
      "Las redes móviles son a menudo más lentas o menos estables que el WiFi de escritorio. Añadir scripts pesados para apps de upsell puede ralentizar tu Largest Contentful Paint (LCP). Un sitio lento mata la conversión. ABU está construido con el rendimiento en mente, usando código ligero que se carga asíncronamente. Esto significa que el contenido principal de tu producto se carga primero, y los widgets de upsell se cargan milisegundos después, asegurando que la experiencia del usuario se sienta rápida.",
      "**Interacciones de Un Toque**",
      "En móvil, escribir es difícil. Tocar es fácil. Tus widgets de upsell deberían permitir añadir al carrito con un solo toque. Evita selectores de variantes (Talla/Color) en widgets de upsell si es posible, o usa valores predeterminados inteligentes (ej., predeterminar a la talla del producto principal). Cuanto más fácil lo hagas para decir 'Sí', mayor será tu tasa de aceptación.",
      "ABU proporciona configuraciones específicas para móviles, permitiéndote ocultar ciertos widgets en móviles o cambiar su estilo de diseño para asegurar que capturas los ingresos móviles sin sacrificar la experiencia del usuario."
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    date: "25 Oct, 2025",
    author: "Mike Chen",
    category: "Móvil",
    readTime: "6 min lectura"
  },
  {
    id: '8',
    title: "Cómo hacer Bundles de Productos Sin Perder Beneficios",
    excerpt: "Descontar es peligroso si se hace mal. Aquí te explicamos cómo hacer bundles de forma segura para proteger tus márgenes.",
    content: [
      "A todos les encanta una oferta. El bundling —vender productos A, B y C juntos por un precio menor que comprarlos por separado— es un impulsor de volumen probado. Sin embargo, es una espada de doble filo. Si descuentas demasiado, podrías aumentar los ingresos mientras destruyes tu beneficio neto. El objetivo es maximizar *dólares de beneficio bruto*, no solo ingresos.",
      "**La Estrategia de Mezcla de Márgenes**",
      "El secreto para un bundling rentable es mezclar perfiles de margen. Probablemente tengas un producto 'Héroe' con márgenes más bajos (porque es competitivo) y productos 'Accesorio' con márgenes masivos (cables, garantías, merchandising de marca).",
      "Digamos que el Producto A cuesta 50$ y se vende por 100$ (50% margen). El Producto B cuesta 2$ y se vende por 20$ (90% margen).",
      "Comprarlos por separado le cuesta al cliente 120$. Tu coste es 52$. El beneficio es 68$.",
      "Si los agrupas por 110$ (un descuento de 10$), el cliente siente que obtuvo un gran trato (¡50% de descuento en el accesorio!). Tus ingresos son 110$, el coste es 52$, el beneficio es 58$.",
      "Espera, ¿el beneficio bajó de 68€ a 58€? Sí, PERO probablemente no habrías vendido el Producto B en absoluto sin el bundle. Vender el bundle te da 58€ de beneficio vs vender solo el Producto A por 50€ de beneficio. Ganaste 8€ extra de beneficio dando un descuento de 10€. Esta es la matemática del bundling.",
      "**Gestión de Inventario**",
      "El bundling también es una herramienta fantástica para el control de inventario. ¿Tienes 'stock muerto' —artículos que no se venden pero ocupan espacio? Empaquétalos como 'Regalo Gratis' o un añadido fuertemente descontado con tus best-sellers. Liquidas el inventario, liberas flujo de caja y aumentas la tasa de conversión de tus productos principales añadiendo valor.",
      "**Bundles Automatizados de ABU**",
      "Con ABU, puedes configurar estas reglas dinámicamente. 'Compra 2 Lleva 1 Gratis', 'Compra Kit A y Ahorra 15%'. La app maneja la lógica y el descuento automáticamente en el checkout, asegurando que tu inventario se sincronice correctamente."
    ],
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
    date: "27 Oct, 2025",
    author: "Alex Rivera",
    category: "Finanzas",
    readTime: "8 min lectura"
  },
  {
    id: '9',
    title: "El Timing lo es todo: Estrategias Pre vs. Post Compra",
    excerpt: "¿Cuándo pedir más dinero? La respuesta depende enteramente del tipo de producto y el viaje del cliente.",
    content: [
      "Pedir un upsell es como pedir una segunda cita. Tienes que medir los tiempos. Pregunta demasiado pronto, y pareces desesperado. Pregunta demasiado tarde, y se han ido. En e-commerce, el embudo se divide en dos zonas psicológicas distintas: Pre-Compra (Navegación/Carrito) y Post-Compra (Tras el Pago).",
      "**Pre-Compra: Construyendo la Cesta**",
      "En la fase de Pre-Compra, el cliente está evaluando. Se preguntan: '¿Es esta la solución correcta?' '¿Puedo permitirme esto?'.",
      "Los upsells aquí deben centrarse en *Resolver Problemas* y *Construir Confianza*.",
      "Buenos Upsells Pre-Compra: Artículos de compatibilidad (Pilas para el juguete), Añadidos esenciales (cables), Mejoras (Tamaño más grande por mejor valor), Bundles de Prueba Social ('Otros compraron esto también').",
      "Malos Upsells Pre-Compra: Artículos aleatorios, artículos caros que requieren nueva investigación, distracciones.",
      "El objetivo aquí es aumentar el tamaño de la cesta sin introducir 'Parálisis por Análisis'. Si ofreces demasiadas opciones, podrían elegir nada.",
      "**Post-Compra: La Zona de Impulso**",
      "En la fase Post-Compra, el trabajo duro está hecho. La 'Decisión de Compra' ha sido tomada. La cartera está abierta.",
      "Los upsells aquí deben centrarse en *Deseo* y *Exclusividad*.",
      "Buenos Upsells Post-Compra: Ofertas por tiempo limitado, Cajas Misteriosas, Consumibles, Regalos.",
      "Debido a que la fricción ha desaparecido (gracias a los pagos tokenizados de un clic), puedes ser más agresivo aquí. No estás arriesgando la venta inicial, ya está en el banco. Esto es dinero extra.",
      "**El Enfoque Híbrido**",
      "Los comerciantes inteligentes mapean sus productos a estas zonas. Usan ABU para colocar accesorios técnicos en la página del producto (Pre-Compra) y artículos de impulso divertidos y de alto margen en la página de Gracias (Post-Compra). Esto cubre todo el espectro emocional del viaje de compra."
    ],
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
    date: "29 Oct, 2025",
    author: "Sarah Jenkins",
    category: "Estrategia",
    readTime: "7 min lectura"
  },
  {
    id: '10',
    title: "Tests A/B en tus Ofertas: El Método Científico para Ingresos",
    excerpt: "No adivines. Testea. Cómo optimizar tu rendimiento de upsell usando datos en lugar de intuición.",
    content: [
      "El marketing es un arte, pero la optimización es una ciencia. Podrías *sentir* que un botón rojo de 'Añadir al Carrito' es mejor, o que un descuento del 15% es mejor que 'Envío Gratis', pero hasta que no lo testeas, solo estás adivinando. En el mundo del upselling, pequeños ajustes pueden llevar a cambios masivos en los ingresos.",
      "**¿Qué es el A/B Testing?**",
      "El A/B testing (o test dividido) implica mostrar dos variaciones de un elemento a dos audiencias similares al mismo tiempo para ver cuál funciona mejor. Por ejemplo, mostrar al Grupo A un widget 'Comprados Juntos' con 2 artículos, y al Grupo B un widget con 3 artículos.",
      "**Variables Clave a Testear en Upselling**",
      "1. **La Oferta:** ¿Funciona mejor 'Compra 2 Lleva 1 Gratis' que '30% Dto en Pack'? A menudo, 'Gratis' es una palabra poderosa que supera a los descuentos matemáticos incluso si el valor monetario es menor.",
      "2. **La Ubicación:** ¿Funciona mejor el upsell en un Pop-up o incrustado en la página? ¿Funciona mejor en el Carrito o en la Página de Producto?",
      "3. **La Creatividad:** Testea diferentes titulares. 'Completa el Look' vs 'Clientes También Compraron'. Testea colores de botones. Testea mostrar el ahorro en dólares ($10 menos) vs porcentaje (10% menos).",
      "4. **El Emparejamiento de Productos:** Quizás tus clientes prefieren emparejar la Cámara con una Lente, en lugar de la Cámara con un Trípode.",
      "**Significancia Estadística**",
      "No detengas el test demasiado pronto. Si tienes 10 visitantes y 2 compran, eso no son datos; es suerte. Necesitas un tamaño de muestra lo suficientemente grande para asegurar que los resultados son estadísticamente significativos. Herramientas como ABU proporcionan paneles de análisis para ayudarte a rastrear vistas, clics y conversiones.",
      "**El Ciclo de Mejora Continua**",
      "La optimización nunca termina. Una vez que encuentras un ganador, ese se convierte en tu nueva línea base (Control). Luego intentas superarlo con un nuevo Desafiante. Este proceso iterativo es cómo las mejores tiendas Shopify escalan. No tienen mejores productos; tienen embudos mejor optimizados."
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "30 Oct, 2025",
    author: "Dr. Alan Grant",
    category: "Analítica",
    readTime: "8 min lectura"
  }
];

export const CONTENT: Record<Language, Content> = {
  en: {
    nav: {
      features: "Engines",
      details: "Features",
      pricing: "Pricing",
      testimonials: "Reviews",
      blog: "Blog",
      cta: "Install App"
    },
    hero: {
      badge: "Shopify's #1 Upsell App",
      title: "Skyrocket Your AOV with Smart Upsells",
      subtitle: "The all-in-one solution for Frequently Bought Together, In-Cart Popups, and Post-Purchase funnels. Designed to look native to your store.",
      ctaPrimary: "Start Free Trial",
      ctaSecondary: "View Demo Store",
      stats: {
        users: "10,000+ Merchants",
        rating: "5.0/5 Rating"
      }
    },
    features: {
      title: "Three Powerful Engines",
      subtitle: "Select an engine to see how it integrates seamlessly into your store's flow.",
      items: {
        fbt: {
          title: "Frequently Bought Together",
          description: "Amazon-style recommendations located directly on the product page. Uses AI to pair items that sell well together.",
          icon: "layers"
        },
        popup: {
          title: "Smart Cart Pop-up",
          description: "A non-intrusive popup that appears when adding to cart, offering a complementary product with a one-time discount.",
          icon: "shopping-bag"
        },
        postPurchase: {
          title: "Post-Purchase Funnel",
          description: "The highest converting offer. Appears after checkout payment but before the thank you page. 1-Click Buy.",
          icon: "arrow-up"
        }
      }
    },
    detailedFeatures: {
      title: "Everything You Need to Scale",
      subtitle: "Packed with advanced features designed to maximize every visitor's value.",
      ai: {
        title: "AI & Smart Recommendations",
        description: "Our machine learning algorithm analyzes store data to suggest products most likely to convert.",
        tag: "Automated"
      },
      widgets: {
        title: "5+ Widget Types",
        description: "Versatile layouts for every page: Product, Cart, Thank You, and more.",
        tag: "Versatile"
      },
      design: {
        title: "Native Design Adaptation",
        description: "We automatically detect your theme's fonts and colors. It looks like you coded it yourself.",
        tag: "Zero Config"
      },
      bundles: {
        title: "Bundle Discounts",
        description: "Incentivize bulk purchases with automatic tiered discounts.",
      },
      data: {
        title: "Data Analytics",
        description: "Track views, clicks, and conversion revenue in real-time.",
      },
      translation: {
        title: "Multi-language",
        description: "Fully translatable widgets for global stores.",
      },
      support: {
        title: "Expert Support",
        description: "Direct access to Shopify experts via chat and email.",
      }
    },
    reviews: {
      title: "Loved by Merchants",
      items: [
        {
          storeName: "The Organic Tea Co.",
          author: "Sarah J.",
          comment: "Increased our AOV by 15% in the first week. The FBT widget looks exactly like our theme.",
          rating: 5
        },
        {
          storeName: "Urban Streetwear",
          author: "Mike T.",
          comment: "The post-purchase upsell is a game changer. We're capturing sales we didn't know existed.",
          rating: 5
        },
        {
          storeName: "Pet Paradise",
          author: "Emily R.",
          comment: "Super easy to set up. The support team helped me customize the CSS to match my brand perfectly.",
          rating: 5
        },
        {
          storeName: "Gadget World",
          author: "Alex D.",
          comment: "Tried 3 other apps before ABU. This is the only one that doesn't slow down my site.",
          rating: 5
        },
        {
          storeName: "Luxe Beauty",
          author: "Jessica M.",
          comment: "My customers love the bundle offers. Highly recommended for any Shopify store.",
          rating: 5
        }
      ]
    },
    trust: {
      title: "Trusted by E-commerce Experts",
      partners: ["Shopify Plus", "Certified Partner", "Liquid Masters"]
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "Plans that scale with your business growth.",
      monthly: "/month",
      plans: [
        {
          name: "Free",
          price: "Free",
          description: "For development stores.",
          features: [
            "Stores in development",
            "1 order per month",
            "Trial period"
          ]
        },
        {
          name: "Starter",
          price: "$9.99",
          description: "Essential tools for new stores.",
          features: [
            "1 widget",
            "Data analysis",
            "Translations",
            "2–5% conversion",
            "Design adapted to your brand",
            "Email support"
          ]
        },
        {
          name: "Grow",
          price: "$14.99",
          description: "More power for growing brands.",
          features: [
            "3 different widgets",
            "5–10% conversion",
            "Design adapted to your brand",
            "Email support",
            "Data analysis",
            "Translations"
          ],
          recommended: true
        },
        {
          name: "Advanced",
          price: "$24.99",
          description: "Maximum performance.",
          features: [
            "3 different widgets",
            "10% conversion",
            "Design adapted to your brand",
            "Email support",
            "Data analysis",
            "AI-powered recommendation algorithm",
            "Translations",
            "Live chat support + email support"
          ]
        }
      ]
    },
    faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about ABU.",
        items: [
            {
                question: "Does ABU affect my store's loading speed?",
                answer: "No. ABU is optimized for performance. We use asynchronous loading techniques, meaning our script loads after your main content has rendered. This ensures your Core Web Vitals remain healthy and your customers don't experience lag."
            },
            {
                question: "Can I customize the design of the widgets?",
                answer: "Absolutely. ABU automatically detects your theme's fonts and colors to look native out of the box. However, you also have full control to customize colors, borders, text sizes, and CSS directly from our dashboard if you want a specific look."
            },
            {
                question: "How does the 'Free' plan work?",
                answer: "The Free plan is designed for development stores or stores just launching. It includes full access to all features but is limited to 1 order per month containing an upsell. It's perfect for testing the app before going live."
            },
            {
                question: "Is it compatible with Shopify 2.0 themes?",
                answer: "Yes, ABU is fully compatible with Online Store 2.0 themes. You can add our widgets directly via the Theme Editor using app blocks, which gives you precise control over placement without touching code."
            },
            {
                question: "How does the AI recommendation engine work?",
                answer: "Our AI analyzes your store's historical order data to find patterns (e.g., people who buy X often buy Y). If you are a new store with no data, we use 'Global Intelligence' based on product descriptions and images to make smart initial recommendations until we have enough data."
            },
            {
                question: "What happens if I uninstall the app?",
                answer: "If you uninstall ABU, all widgets will instantly disappear from your store. We do not leave any 'ghost code' in your theme files. Your subscription will be cancelled immediately by Shopify."
            },
            {
                question: "Do you take a commission on upsell revenue?",
                answer: "No, we do not take any commission on the sales generated by the app. You keep 100% of the revenue. We only charge the flat monthly subscription fee associated with your chosen plan."
            }
        ]
    },
    blog: {
      title: "The ABU Blog",
      subtitle: "Insights, strategies, and tips to grow your Shopify store.",
      backButton: "Back to Blog",
      readMore: "Read Article",
      posts: BLOG_POSTS_EN
    },
    footer: {
      rights: "All rights reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
      contact: "Contact Us",
      blog: "Blog"
    },
    privacyPage: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: October 24, 2026",
      backButton: "Back to Home",
      sections: [
        {
            heading: "1. Introduction",
            content: "Tiendamanilla S.L. ('Company', 'we', 'us', or 'our'), with VAT ID B55481766 and registered address at Polígono Abra Industrial, 1.4.2, Abanto-Zierbana, 48500, Bizkaia, Spain, is the operator of the ABU Shopify App. This Privacy Policy describes how we collect, use, and share information about you when you use our app installed through the Shopify App Store."
        },
        {
            heading: "2. Information We Collect",
            content: "When you install the App, we are automatically able to access certain types of information from your Shopify account: Shop Information (shop name, email, address, and Shopify plan), Customer Information (when required to process post-purchase upsells or analytics), and Order Information."
        },
        {
            heading: "3. How We Use Your Information",
            content: "We use the personal information we collect from you and your customers in order to provide the Service and to operate the App. This includes analyzing data to provide upsell recommendations, processing charges for the App subscription via Shopify, and improving our App's functionality."
        },
        {
            heading: "4. Sharing Your Information",
            content: "We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights. As a Shopify App, your data interacts with the Shopify platform."
        },
        {
            heading: "5. Your Rights (GDPR)",
            content: "If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below."
        },
        {
            heading: "6. Contact Us",
            content: "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@tiendamanillc.com."
        }
      ]
    },
    termsPage: {
      title: "Terms of Service",
      lastUpdated: "Last updated: October 24, 2026",
      backButton: "Back to Home",
      sections: [
        {
            heading: "1. Acceptance of Terms",
            content: "By installing and using the ABU App ('Service'), provided by Tiendamanilla S.L. ('we', 'us'), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not install or use the Service."
        },
        {
            heading: "2. Description of Service",
            content: "ABU provides upselling and cross-selling tools for Shopify merchants, including 'Frequently Bought Together' widgets, cart pop-ups, and post-purchase offers."
        },
        {
            heading: "3. Billing and Payments",
            content: "All billing for the Service is handled directly by Shopify. Fees are charged based on the plan you select (Starter, Grow, or Advanced). You agree to pay all charges incurred in connection with your use of the App. Refunds are handled at our sole discretion and in accordance with Shopify's policies."
        },
        {
            heading: "4. Intellectual Property",
            content: "The Service, including its design, code, and graphics, is the property of Tiendamanilla S.L. and is protected by copyright and intellectual property laws."
        },
        {
            heading: "5. Limitation of Liability",
            content: "To the maximum extent permitted by law, Tiendamanilla S.L. shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Service."
        },
        {
            heading: "6. Governing Law",
            content: "These Terms shall be governed by and construed in accordance with the laws of Spain, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the jurisdiction of the courts of Bizkaia, Spain."
        },
        {
            heading: "7. Contact Information",
            content: "Questions about the Terms of Service should be sent to us at info@tiendamanillc.com."
        }
      ]
    },
    contactPage: {
      title: "Contact Us",
      subtitle: "Have a question or need help? Send us a message.",
      backButton: "Back to Home",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send Message",
        sending: "Sending...",
        successTitle: "Message Sent!",
        successMessage: "Thank you for reaching out. We will get back to you shortly.",
        error: "Something went wrong. Please try again."
      }
    }
  },
  es: {
    nav: {
      features: "Motores",
      details: "Funcionalidades",
      pricing: "Precios",
      testimonials: "Reseñas",
      blog: "Blog",
      cta: "Instalar App"
    },
    hero: {
      badge: "App #1 de Upsell en Shopify",
      title: "Dispara tu Ticket Medio con Upsells Inteligentes",
      subtitle: "La solución todo en uno para 'Comprados Juntos Habitualmente', Pop-ups de Carrito y Embudos Post-compra. Diseño nativo para tu tienda.",
      ctaPrimary: "Empezar Prueba Gratis",
      ctaSecondary: "Ver Tienda Demo",
      stats: {
        users: "+10,000 Tiendas",
        rating: "Valoración 5.0/5"
      }
    },
    features: {
      title: "Tres Motores Potentes",
      subtitle: "Selecciona un motor para ver cómo se integra perfectamente en el flujo de tu tienda.",
      items: {
        fbt: {
          title: "Comprados Juntos",
          description: "Recomendaciones estilo Amazon ubicadas directamente en la página de producto. Usa IA para emparejar artículos.",
          icon: "layers"
        },
        popup: {
          title: "Pop-up de Carrito",
          description: "Un popup no intrusivo que aparece al añadir al carrito, ofreciendo un producto complementario con descuento único.",
          icon: "shopping-bag"
        },
        postPurchase: {
          title: "Embudo Post-Compra",
          description: "La oferta de mayor conversión. Aparece tras el pago pero antes de la página de gracias. Compra en 1-Click.",
          icon: "arrow-up"
        }
      }
    },
    detailedFeatures: {
      title: "Todo lo que Necesitas para Escalar",
      subtitle: "Equipado con funciones avanzadas diseñadas para maximizar el valor de cada visitante.",
      ai: {
        title: "IA y Recomendaciones Smart",
        description: "Nuestro algoritmo de aprendizaje automático analiza los datos de la tienda para sugerir los productos con mayor probabilidad de conversión.",
        tag: "Automatizado"
      },
      widgets: {
        title: "+5 Tipos de Widgets",
        description: "Diseños versátiles para cada página: Producto, Carrito, Thank You page y más.",
        tag: "Versátil"
      },
      design: {
        title: "Adaptación de Diseño Nativo",
        description: "Detectamos automáticamente las fuentes y colores de tu tema. Parece que lo programaste tú mismo.",
        tag: "Zero Config"
      },
      bundles: {
        title: "Descuentos por Bundles",
        description: "Incentiva compras masivas con descuentos escalonados automáticos.",
      },
      data: {
        title: "Análisis de Datos",
        description: "Rastrea vistas, clics e ingresos por conversión en tiempo real.",
      },
      translation: {
        title: "Multi-idioma",
        description: "Widgets totalmente traducibles para tiendas globales.",
      },
      support: {
        title: "Soporte Experto",
        description: "Acceso directo a expertos de Shopify vía chat y email.",
      }
    },
    reviews: {
      title: "Amado por los Merchants",
      items: [
        {
          storeName: "The Organic Tea Co.",
          author: "Sarah J.",
          comment: "Aumentó nuestro AOV un 15% en la primera semana. El widget FBT se ve exactamente como nuestro tema.",
          rating: 5
        },
        {
          storeName: "Urban Streetwear",
          author: "Mike T.",
          comment: "El upsell post-compra es increíble. Estamos capturando ventas que no sabíamos que existían.",
          rating: 5
        },
        {
          storeName: "Pet Paradise",
          author: "Emily R.",
          comment: "Súper fácil de configurar. El equipo de soporte me ayudó a personalizar el CSS.",
          rating: 5
        },
        {
          storeName: "Gadget World",
          author: "Alex D.",
          comment: "Probé otras 3 apps antes de ABU. Esta es la única que no ralentiza mi sitio.",
          rating: 5
        },
        {
          storeName: "Luxe Beauty",
          author: "Jessica M.",
          comment: "A mis clientes les encantan las ofertas de bundles. Muy recomendada.",
          rating: 5
        }
      ]
    },
    trust: {
      title: "Con la confianza de Expertos en E-commerce",
      partners: ["Shopify Plus", "Partner Certificado", "Maestros Liquid"]
    },
    pricing: {
      title: "Precios Simples y Claros",
      subtitle: "Planes que escalan con el crecimiento de tu negocio.",
      monthly: "/mes",
      plans: [
        {
          name: "Gratis",
          price: "Gratis",
          description: "Para tiendas en desarrollo.",
          features: [
            "Tiendas en desarrollo",
            "1 pedido al mes",
            "Periodo de prueba"
          ]
        },
        {
          name: "Inicial",
          price: "$9.99",
          description: "Herramientas esenciales para nuevas tiendas.",
          features: [
            "1 widget",
            "Análisis de datos",
            "Traducciones",
            "Conversión del 2–5%",
            "Diseño adaptado a tu marca",
            "Soporte por email"
          ]
        },
        {
          name: "Crecimiento",
          price: "$14.99",
          description: "Más potencia para marcas en expansión.",
          features: [
            "3 widgets diferentes",
            "Conversión del 5–10%",
            "Diseño adaptado a tu marca",
            "Soporte por email",
            "Análisis de datos",
            "Traducciones"
          ],
          recommended: true
        },
        {
          name: "Avanzado",
          price: "$24.99",
          description: "Máximo rendimiento y soporte.",
          features: [
            "3 widgets diferentes",
            "Conversión del 10%",
            "Diseño adaptado a tu marca",
            "Soporte por email",
            "Análisis de datos",
            "Algoritmo de recomendación IA",
            "Traducciones",
            "Chat en vivo + soporte email"
          ]
        }
      ]
    },
    faq: {
        title: "Preguntas Frecuentes",
        subtitle: "Todo lo que necesitas saber sobre ABU.",
        items: [
            {
                question: "¿Afecta ABU a la velocidad de carga de mi tienda?",
                answer: "No. ABU está optimizado para el rendimiento. Utilizamos técnicas de carga asíncrona, lo que significa que nuestro script se carga después de que tu contenido principal se haya renderizado. Esto asegura que tus Core Web Vitals se mantengan saludables."
            },
            {
                question: "¿Puedo personalizar el diseño de los widgets?",
                answer: "Absolutamente. ABU detecta automáticamente las fuentes y colores de tu tema para parecer nativo desde el primer momento. Sin embargo, también tienes control total para personalizar colores, bordes, tamaños de texto y CSS directamente desde nuestro panel."
            },
            {
                question: "¿Cómo funciona el plan 'Gratis'?",
                answer: "El plan Gratis está diseñado para tiendas en desarrollo o tiendas que acaban de lanzarse. Incluye acceso completo a todas las funciones pero está limitado a 1 pedido al mes que contenga un upsell. Es perfecto para probar la app antes de lanzarla."
            },
            {
                question: "¿Es compatible con temas de Shopify 2.0?",
                answer: "Sí, ABU es totalmente compatible con los temas Online Store 2.0. Puedes añadir nuestros widgets directamente a través del Editor de Temas usando bloques de aplicaciones, lo que te da un control preciso sobre la ubicación sin tocar código."
            },
            {
                question: "¿Cómo funciona el motor de recomendación por IA?",
                answer: "Nuestra IA analiza el historial de pedidos de tu tienda para encontrar patrones (ej. gente que compra X a menudo compra Y). Si eres una tienda nueva sin datos, utilizamos 'Inteligencia Global' basada en descripciones e imágenes de productos para hacer recomendaciones iniciales inteligentes."
            },
            {
                question: "¿Qué pasa si desinstalo la app?",
                answer: "Si desinstalas ABU, todos los widgets desaparecerán instantáneamente de tu tienda. No dejamos ningún 'código fantasma' en los archivos de tu tema. Tu suscripción será cancelada inmediatamente por Shopify."
            },
            {
                question: "¿Cobráis comisión sobre las ventas de upsell?",
                answer: "No, no cobramos ninguna comisión sobre las ventas generadas por la aplicación. Te quedas con el 100% de los ingresos. Solo cobramos la tarifa de suscripción mensual fija asociada a tu plan elegido."
            }
        ]
    },
    blog: {
      title: "Blog de ABU",
      subtitle: "Estrategias, consejos y trucos para hacer crecer tu tienda Shopify.",
      backButton: "Volver al Blog",
      readMore: "Leer Artículo",
      posts: BLOG_POSTS_ES
    },
    footer: {
      rights: "Todos los derechos reservados.",
      terms: "Términos de Servicio",
      privacy: "Política de Privacidad",
      contact: "Contacto",
      blog: "Blog"
    },
    privacyPage: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización: 24 de Octubre de 2026",
      backButton: "Volver al Inicio",
      sections: [
        {
            heading: "1. Introducción",
            content: "Tiendamanilla S.L. ('Compañía', 'nosotros' o 'nuestro'), con NIF B55481766 y domicilio social en Polígono Abra Industrial, 1.4.2, Abanto-Zierbana, 48500, Bizkaia, España, es el operador de la aplicación ABU para Shopify. Esta Política de Privacidad describe cómo recopilamos, usamos y compartimos información sobre usted cuando utiliza nuestra aplicación instalada a través de la Shopify App Store."
        },
        {
            heading: "2. Información que recopilamos",
            content: "Al instalar la Aplicación, podemos acceder automáticamente a ciertos tipos de información de su cuenta de Shopify: Información de la Tienda (nombre, email, dirección y plan de Shopify), Información del Cliente (cuando sea necesario para procesar upsells post-compra o analíticas) e Información de Pedidos."
        },
        {
            heading: "3. Cómo usamos su información",
            content: "Utilizamos la información personal que recopilamos de usted y sus clientes para proporcionar el Servicio y operar la Aplicación. Esto incluye analizar datos para ofrecer recomendaciones de upsell, procesar cargos por la suscripción de la App a través de Shopify y mejorar la funcionalidad de nuestra App."
        },
        {
            heading: "4. Compartir su información",
            content: "Podemos compartir su Información Personal para cumplir con las leyes y regulaciones aplicables, para responder a una citación u otra solicitud legal de información que recibamos, o para proteger nuestros derechos de otra manera. Como App de Shopify, sus datos interactúan con la plataforma Shopify."
        },
        {
            heading: "5. Sus Derechos (GDPR)",
            content: "Si usted es residente europeo, tiene derecho a acceder a la información personal que tenemos sobre usted y a solicitar que su información personal sea corregida, actualizada o eliminada. Si desea ejercer este derecho, contáctenos a través de la información de contacto a continuación."
        },
        {
            heading: "6. Contáctenos",
            content: "Para obtener más información sobre nuestras prácticas de privacidad, si tiene preguntas o si desea presentar una queja, contáctenos por correo electrónico a info@tiendamanillc.com."
        }
      ]
    },
    termsPage: {
      title: "Términos del Servicio",
      lastUpdated: "Última actualización: 24 de Octubre de 2026",
      backButton: "Volver al Inicio",
      sections: [
        {
            heading: "1. Aceptación de los Términos",
            content: "Al instalar y utilizar la App ABU ('Servicio'), proporcionada por Tiendamanilla S.L. ('nosotros'), usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con estos términos, no instale ni utilice el Servicio."
        },
        {
            heading: "2. Descripción del Servicio",
            content: "ABU proporciona herramientas de upselling y cross-selling para comerciantes de Shopify, incluyendo widgets de 'Comprados Juntos Habitualmente', pop-ups de carrito y ofertas post-compra."
        },
        {
            heading: "3. Facturación y Pagos",
            content: "Toda la facturación del Servicio es gestionada directamente por Shopify. Las tarifas se cobran según el plan que seleccione (Inicial, Crecimiento o Avanzado). Usted acepta pagar todos los cargos incurridos en relación con su uso de la App. Los reembolsos se gestionan a nuestra entera discreción y de acuerdo con las políticas de Shopify."
        },
        {
            heading: "4. Propiedad Intelectual",
            content: "El Servicio, incluyendo su diseño, código y gráficos, es propiedad de Tiendamanilla S.L. y está protegido por derechos de autor y leyes de propiedad intelectual."
        },
        {
            heading: "5. Limitación de Responsabilidad",
            content: "En la medida máxima permitida por la ley, Tiendamanilla S.L. no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo, ni de ninguna pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, o cualquier pérdida de datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de su uso del Servicio."
        },
        {
            heading: "6. Ley Aplicable",
            content: "Estos Términos se regirán e interpretarán de acuerdo con las leyes de España. Cualquier disputa que surja de estos Términos estará sujeta a la jurisdicción de los tribunales de Bizkaia, España."
        },
        {
            heading: "7. Información de Contacto",
            content: "Las preguntas sobre los Términos de Servicio deben enviarse a info@tiendamanillc.com."
        }
      ]
    },
    contactPage: {
      title: "Contáctanos",
      subtitle: "¿Tienes alguna pregunta o necesitas ayuda? Envíanos un mensaje.",
      backButton: "Volver al Inicio",
      form: {
        name: "Nombre",
        email: "Email",
        message: "Mensaje",
        submit: "Enviar Mensaje",
        sending: "Enviando...",
        successTitle: "¡Mensaje Enviado!",
        successMessage: "Gracias por contactarnos. Te responderemos lo antes posible.",
        error: "Algo salió mal. Por favor intenta de nuevo."
      }
    }
  }
};

export const ICONS_MAP: Record<string, React.ReactNode> = {
  layers: <Layers className="w-8 h-8 text-blue-400" />,
  "shopping-bag": <ShoppingBag className="w-8 h-8 text-purple-400" />,
  "arrow-up": <ArrowUpCircle className="w-8 h-8 text-pink-400" />,
};