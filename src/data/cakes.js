export const BAKERY_INFO = {
  name: "Sweet Story Cakes",
  tagline: "Boutique Artisan Bakery & Custom Designer Cakes",
  city: "Lonand, Satara",
  address: "Opposite Gajanan Appliances, Lonand, Satara, Maharashtra - 415521",
  phone: "+91 93215 57634",
  whatsappNumber: "919321557634",
  hours: {
    days: "Monday – Sunday",
    open: 10, // 10:00 AM
    close: 22, // 10:00 PM
    display: "10:00 AM – 10:00 PM (All 7 Days)",
  },
  rating: 4.5,
  reviewCount: "Verified Justdial Ratings",
  deliveryAreas: [
    "Lonand Town (Free Doorstep)",
    "Shirwal",
    "Phaltan",
    "Wai",
    "Bhuinj",
    "Satara City & Surrounding Districts (On Special Request)"
  ],
  features: [
    "100% Pure Vegetarian / Eggless Options",
    "Bespoke Multi-Tier & Structural Wedding Cakes",
    "World-Class Suspended Chandelier & Floral Arch Designs",
    "Premium Belgian Chocolate & Fresh Daily Farm Ingredients",
    "Personalized Edible Acrylic Photo Displays"
  ]
};

export const SIGNATURE_CAKES = [
  {
    id: "floral-ring-arch",
    title: "The Royal Floral Ring Arch Cake",
    category: "wedding",
    tag: "Signature Masterpiece",
    image: "/images/cake_floral_arch.jpg",
    priceRange: "₹2,800 – ₹4,500",
    weight: "2.5 – 4.0 kg (2 Tiers)",
    servings: "25 – 40 Guests",
    leadTime: "48 Hours Advance",
    description: "Our world-class flagship wedding cake featuring a glowing circular brass floral arch adorned with cascading blooms, dual sunset-ombre sponge tiers, an embedded illuminated photo acrylic chamber, and fresh red velvet roses topped with 'Happily Ever After'.",
    flavorNotes: "Red Velvet Cream Cheese & Belgian White Chocolate Mousse",
    pureVeg: true,
    highlights: ["Circular Floral Arch Included", "LED Fairy Lights Setup", "Custom Couple Photo Embedded", "100% Eggless Option"]
  },
  {
    id: "suspended-chandelier",
    title: "The Floating Chandelier Suspended Cake",
    category: "wedding",
    tag: "Ultra-Bespoke Innovation",
    image: "/images/cake_hanging_chandelier.jpg",
    priceRange: "₹4,500 – ₹8,500",
    weight: "3.5 – 6.0 kg (3 Tiers)",
    servings: "40 – 70 Guests",
    leadTime: "72 Hours Advance",
    description: "A gravity-defying upside-down hanging chandelier cake suspended from an ornate floral canopy. Decorated with hand-piped pastel rosettes, trailing botanical vines, and an authentic wooden Sweet Story heirloom crest.",
    flavorNotes: "Madagascar Vanilla Bean & Wild Strawberry Compote",
    pureVeg: true,
    highlights: ["Suspended Outdoor/Indoor Rigging", "Living Floral Canopy", "Showstopping Entry Experience", "Custom Color Palette"]
  },
  {
    id: "jungle-train-express",
    title: "The Jungle Express 3-Tier Railway Cake",
    category: "birthday",
    tag: "Kinetic Structural Art",
    image: "/images/cake_jungle_train.jpg",
    priceRange: "₹3,500 – ₹6,000",
    weight: "3.0 – 5.0 kg (3 Tiers)",
    servings: "30 – 50 Guests",
    leadTime: "48 Hours Advance",
    description: "An authentic Sweet Story multi-tier architectural triumph featuring an integrated model railway track encircling three sculpted jungle tiers, an Express Century locomotive, and hand-sculpted woodland flora and wildlife.",
    flavorNotes: "Belgian Couverture Truffle & Fresh Vanilla Creme",
    pureVeg: true,
    highlights: ["Model Train Track Integration", "3 Architectural Tiers", "Handcrafted Jungle Animals", "100% Eggless"]
  },
  {
    id: "safari-adventure",
    title: "Jungle Safari Wildlife Milestone Cake",
    category: "birthday",
    tag: "Artisan Woodland Theme",
    image: "/images/cake_safari_adventure.jpg",
    priceRange: "₹1,800 – ₹3,200",
    weight: "1.5 – 3.0 kg",
    servings: "15 – 30 Guests",
    leadTime: "24 Hours Advance",
    description: "Dual-tone jade and cream velvety buttercream adorned with handcrafted palm crowns, gold leaf flecks, miniature safari wildlife companions, and an authentic golden Happy Birthday arch.",
    flavorNotes: "Mango Passion Compote & Silky White Chocolate Buttercream",
    pureVeg: true,
    highlights: ["Hand-piped Emerald Foliage", "Gold Acrylic Sunburst Topper", "Gentle Safari Animal Figurines", "Pure Veg"]
  },
  {
    id: "golden-snitch-wizard",
    title: "The Golden Snitch & Sorcerer Spellbook",
    category: "custom",
    tag: "Themed Masterpiece",
    image: "/images/cake_golden_snitch.jpg",
    priceRange: "₹1,900 – ₹3,400",
    weight: "1.5 – 2.5 kg",
    servings: "15 – 25 Guests",
    leadTime: "24 Hours Advance",
    description: "Cerulean blue velvet frosting crowned by a hand-burnished 24K edible Golden Snitch with spread wings, mirror-gold Hogwarts HP crest, sculpted chocolate wizard wand, and ancient parchment.",
    flavorNotes: "Dutch Dark Chocolate Ganache with Salted Butter Caramel",
    pureVeg: true,
    highlights: ["Sculpted 3D Golden Snitch", "Edible Chocolate Wand & Scroll", "Custom Name Calligraphy", "100% Pure Veg"]
  },
  {
    id: "belgian-truffle-gold",
    title: "Grand Belgian Chocolate Truffle & Gold",
    category: "chocolate",
    tag: "Connoisseur's Choice",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80",
    priceRange: "₹950 – ₹1,800",
    weight: "1.0 – 2.0 kg",
    servings: "10 – 20 Guests",
    leadTime: "24 Hours Advance",
    description: "Silky 54% Callebaut dark chocolate ganache layered between moist cocoa fudge sponge, finished with hand-burnished 24k edible gold leaf and chocolate crispearls.",
    flavorNotes: "Deep Roasted Cocoa, Salted Butter Ganache & Espresso Undertones",
    pureVeg: true,
    highlights: ["54% Belgian Chocolate", "Edible 24k Gold Leaf", "Intense Cocoa Flavor", "Guaranteed Crowd Favorite"]
  }
];

export const FLAVOR_OPTIONS = [
  { id: "truffle", name: "Belgian Chocolate Truffle", pricePerKg: 750, color: "#3D261D", desc: "Rich 54% dark cocoa fudge ganache" },
  { id: "red-velvet", name: "Red Velvet & Fresh Cream Cheese", pricePerKg: 850, color: "#8E2833", desc: "Velvety crimson sponge with tangy cream" },
  { id: "rasmalai", name: "Royal Saffron Rasmalai", pricePerKg: 850, color: "#F0C852", desc: "Authentic rasmalai with cardamom & saffron" },
  { id: "biscoff", name: "Lotus Biscoff Crunch", pricePerKg: 900, color: "#BD7947", desc: "Caramelized speculoos cream & biscuit crunch" },
  { id: "strawberry", name: "Mahabaleshwar Strawberry Rose", pricePerKg: 700, color: "#E06D79", desc: "Local fresh farm strawberries with rose chantilly" },
  { id: "mango", name: "Ratnagiri Alphonso Mango (Seasonal)", pricePerKg: 800, color: "#FFA62B", desc: "Golden king mango mousse & chunks" },
  { id: "black-forest", name: "Classic German Black Forest", pricePerKg: 650, color: "#4A2825", desc: "Kirsch cherry compote & dark chocolate shavings" },
  { id: "butterscotch", name: "Crunchy Butterscotch Praline", pricePerKg: 600, color: "#D49E43", desc: "Golden caramel with roasted cashew praline" }
];

export const TIER_OPTIONS = [
  { id: "single", name: "Single Tier Classic", minWeight: 0.5, defaultWeight: 1.0, maxWeight: 2.0, basePrice: 0, desc: "Perfect for intimate birthdays and family parties (4–15 guests)" },
  { id: "double", name: "Double Tier Royal", minWeight: 2.0, defaultWeight: 2.5, maxWeight: 4.0, basePrice: 400, desc: "Stunning 2-tier celebration piece for engagements & milestones (18–35 guests)" },
  { id: "triple", name: "Triple Tier Grand Event", minWeight: 4.0, defaultWeight: 5.0, maxWeight: 8.0, basePrice: 1000, desc: "Regal 3-tier centerpiece for grand receptions & weddings (40–80 guests)" },
  { id: "chandelier", name: "Suspended Hanging Chandelier", minWeight: 3.5, defaultWeight: 4.0, maxWeight: 6.0, basePrice: 2200, desc: "Awe-inspiring upside-down hanging structure with floral canopy" }
];

export const STYLE_ADDONS = [
  { id: "floral-arch", name: "Circular Golden Floral Ring Arch & Fairy Lights", price: 850, desc: "As seen in our flagship wedding arch cake" },
  { id: "photo-acrylic", name: "Illuminated Acrylic Couple/Family Photo Tier", price: 500, desc: "Custom keepsake photograph framed inside acrylic tier" },
  { id: "fresh-flowers", name: "Fresh Organic Velvet Roses & Floral Cascade", price: 400, desc: "Hand-arranged fresh blooms matched to your event theme" },
  { id: "gold-leaf", name: "24K Edible Gold Leaf & Macaron Toppers", price: 450, desc: "Luxury hand-gilded finish with artisan French macarons" },
  { id: "topper-custom", name: "Custom Acrylic Glitter Topper (Any Name/Greeting)", price: 250, desc: "'Happily Ever After', 'Sweet 16', or custom name" }
];

export const REVIEWS = [
  {
    name: "Rohit & Sneha Kadam",
    event: "Wedding Reception, Lonand",
    rating: 5,
    text: "We ordered the Hanging Chandelier Cake for our reception. Words cannot describe how breathtaking it looked on the lawn! Our guests couldn't stop taking photos, and the chocolate truffle taste was 10/10 heavenly. Sweet Story made our special day memorable!",
    date: "November 2024"
  },
  {
    name: "Dr. Aniket Deshmukh",
    event: "1st Anniversary Celebration",
    rating: 5,
    text: "The Floral Ring Arch cake with our wedding photo inside was beyond our expectations. Pure eggless, super moist, and delivered right on time in Lonand. Highly recommend to everyone in Satara district!",
    date: "January 2025"
  },
  {
    name: "Pooja Patil",
    event: "Parents' 25th Silver Jubilee",
    rating: 5,
    text: "Ordered a 2-tier Rasmalai Saffron cake. My parents don't like very sugary cakes, but this was exceptionally light, fragrant, and authentic. The Sweet Story team took great care of every detail via WhatsApp.",
    date: "December 2024"
  },
  {
    name: "Amit Salunkhe",
    event: "Birthday Party, Shirwal",
    rating: 4.5,
    text: "Best cake studio in the Lonand-Shirwal-Phaltan belt. Fresh ingredients, no chemical aftertaste, and genuine customer care. 4.5 stars on Justdial is well deserved!",
    date: "October 2024"
  }
];

export const FAQS = [
  {
    q: "How far in advance should I place an order for custom designer cakes?",
    a: "For standard birthday and single-tier cakes, we recommend 12–24 hours advance notice. For multi-tier wedding cakes, floral ring arches, and suspended chandelier cakes, please book 48–72 hours prior to ensure structural prep and fresh floral sourcing."
  },
  {
    q: "Are all your cakes 100% vegetarian / eggless?",
    a: "Yes! We specialize in 100% pure vegetarian (eggless) artisan cakes baked in a hygienic environment with premium butter, fresh dairy cream, and pure cocoa."
  },
  {
    q: "Do you deliver cakes outside Lonand, such as Phaltan, Shirwal, or Satara?",
    a: "Yes, we provide safe temperature-controlled doorstep delivery across Lonand, Shirwal, Phaltan, Wai, and special wedding event deliveries across the Satara district. Multi-tier and chandelier cakes include on-site setup by our team."
  },
  {
    q: "Can I provide my own photo and custom message for the cake?",
    a: "Absolutely. You can upload or WhatsApp us any high-resolution photo. We create both edible sugar-sheet photos and illuminated crystal acrylic chamber centerpieces as seen in our royal wedding arch creations."
  },
  {
    q: "How do I confirm my booking and payment?",
    a: "You can configure your cake directly on this website, click 'Order on WhatsApp', and our master baker will immediately confirm slot availability. Payments can be completed easily via Google Pay, PhonePe, or Paytm UPI."
  }
];
