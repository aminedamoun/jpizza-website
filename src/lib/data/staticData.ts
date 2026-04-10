// Static data for J Pizza Bar - Downtown Dubai
// Replaces Supabase with hardcoded sample data

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  subcategoryId?: string | null;
  image: string;
  alt: string;
  tags?: string[];
  isFeatured?: boolean;
}

export interface AdminMenuItem {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategoryId?: string | null;
  imageUrl: string;
  imageAlt: string;
  tags?: string[];
  isAvailable?: boolean;
  isFeatured?: boolean;
  displayOrder?: number;
}

export interface RestaurantImage {
  id: string;
  src: string;
  alt: string;
  span?: string;
}

export interface AdminRestaurantImage {
  id?: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  spanClass?: string;
  displayOrder?: number;
  isActive?: boolean;
  isIntro?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  price?: string;
  ctaText: string;
  ctaLink: string;
  validUntil?: string;
  terms?: string;
  rating?: number;
}

export interface AdminOffer {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  ctaText?: string;
  ctaLink?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  validUntil?: string;
  terms?: string;
  displayOrder?: number;
}

export interface Category {
  id: string;
  value: string;
  label: string;
  emoji: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  value: string;
  label: string;
  emoji: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface IntroImage {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  displayOrder: number;
}

export interface AboutImage {
  id?: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  displayOrder: number;
  isActive: boolean;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const categories: Category[] = [
  {
    id: 'cat-pizza',
    value: 'pizza',
    label: 'Pizza',
    emoji: '\uD83C\uDF55',
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: 'cat-pasta',
    value: 'pasta',
    label: 'Pasta',
    emoji: '\uD83C\uDF5D',
    displayOrder: 2,
    isVisible: true,
  },
  {
    id: 'cat-small_appetizer',
    value: 'small_appetizer',
    label: 'Small Bites',
    emoji: '\uD83E\uDDC0',
    displayOrder: 3,
    isVisible: true,
  },
  {
    id: 'cat-drinks',
    value: 'drinks',
    label: 'Drinks',
    emoji: '\uD83E\uDD64',
    displayOrder: 4,
    isVisible: true,
  },
  {
    id: 'cat-breakfast',
    value: 'breakfast',
    label: 'Breakfast',
    emoji: '\u2615',
    displayOrder: 5,
    isVisible: true,
  },
  {
    id: 'cat-dessert',
    value: 'dessert',
    label: 'Dessert',
    emoji: '\uD83C\uDF70',
    displayOrder: 6,
    isVisible: true,
  },
];

// ---------------------------------------------------------------------------
// Subcategories
// ---------------------------------------------------------------------------

export const subcategories: Subcategory[] = [
  {
    id: 'sub-classic-pizza',
    categoryId: 'cat-pizza',
    value: 'classic',
    label: 'Classic Pizzas',
    emoji: '\uD83C\uDF55',
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: 'sub-specialty-pizza',
    categoryId: 'cat-pizza',
    value: 'specialty',
    label: 'Specialty Pizzas',
    emoji: '\u2B50',
    displayOrder: 2,
    isVisible: true,
  },
  {
    id: 'sub-hot-drinks',
    categoryId: 'cat-drinks',
    value: 'hot',
    label: 'Hot Drinks',
    emoji: '\u2615',
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: 'sub-cold-drinks',
    categoryId: 'cat-drinks',
    value: 'cold',
    label: 'Cold Drinks',
    emoji: '\uD83E\uDDCA',
    displayOrder: 2,
    isVisible: true,
  },
];

// ---------------------------------------------------------------------------
// Menu Items
// ---------------------------------------------------------------------------

export const menuItems: MenuItem[] = [
  // --- Pizza - Classic ---
  {
    id: 'menu-001',
    name: 'Margherita',
    description:
      'San Marzano tomato sauce, fior di latte mozzarella, fresh basil, and extra-virgin olive oil on a hand-stretched dough.',
    price: 'AED 42',
    category: 'pizza',
    subcategoryId: 'sub-classic-pizza',
    image: '/assets/images/no_image.png',
    alt: 'Classic Margherita pizza',
    tags: ['vegetarian', 'classic'],
    isFeatured: true,
  },
  {
    id: 'menu-002',
    name: 'Pepperoni Classica',
    description:
      'Spicy Italian pepperoni layered over mozzarella and our signature tomato sauce, finished with a drizzle of chili oil.',
    price: 'AED 52',
    category: 'pizza',
    subcategoryId: 'sub-classic-pizza',
    image: '/assets/images/no_image.png',
    alt: 'Pepperoni pizza',
    tags: ['spicy', 'popular'],
    isFeatured: true,
  },
  {
    id: 'menu-003',
    name: 'Quattro Formaggi',
    description:
      'A rich blend of mozzarella, gorgonzola, fontina, and Parmigiano-Reggiano on a white base with a touch of truffle honey.',
    price: 'AED 58',
    category: 'pizza',
    subcategoryId: 'sub-classic-pizza',
    image: '/assets/images/no_image.png',
    alt: 'Four cheese pizza',
    tags: ['vegetarian', 'cheese'],
    isFeatured: false,
  },
  // --- Pizza - Specialty ---
  {
    id: 'menu-004',
    name: 'Tartufo Bianco',
    description:
      'White truffle cream, wild mushrooms, burrata, arugula, and shaved Parmigiano on a crispy thin base.',
    price: 'AED 72',
    category: 'pizza',
    subcategoryId: 'sub-specialty-pizza',
    image: '/assets/images/no_image.png',
    alt: 'Truffle pizza with burrata',
    tags: ['truffle', 'premium'],
    isFeatured: true,
  },
  {
    id: 'menu-005',
    name: 'Diavola Piccante',
    description:
      'Nduja sausage, spicy salami, roasted peppers, mozzarella, and fresh chili flakes with a garlic-infused crust.',
    price: 'AED 62',
    category: 'pizza',
    subcategoryId: 'sub-specialty-pizza',
    image: '/assets/images/no_image.png',
    alt: 'Spicy Diavola pizza',
    tags: ['spicy', 'meat'],
    isFeatured: false,
  },
  {
    id: 'menu-006',
    name: 'Prosciutto e Rucola',
    description:
      'Tomato base, mozzarella, topped with thinly sliced prosciutto di Parma, peppery arugula, and aged Parmigiano shavings.',
    price: 'AED 65',
    category: 'pizza',
    subcategoryId: 'sub-specialty-pizza',
    image: '/assets/images/no_image.png',
    alt: 'Prosciutto and arugula pizza',
    tags: ['premium'],
    isFeatured: true,
  },
  // --- Pasta ---
  {
    id: 'menu-007',
    name: 'Spaghetti Carbonara',
    description:
      'Traditional Roman carbonara with guanciale, egg yolk, pecorino Romano, and freshly cracked black pepper.',
    price: 'AED 48',
    category: 'pasta',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Spaghetti Carbonara',
    tags: ['classic', 'popular'],
    isFeatured: true,
  },
  {
    id: 'menu-008',
    name: 'Penne Arrabbiata',
    description:
      'Penne rigate tossed in a fiery tomato sauce with garlic, red chili, and fresh parsley.',
    price: 'AED 40',
    category: 'pasta',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Penne Arrabbiata',
    tags: ['spicy', 'vegetarian'],
    isFeatured: false,
  },
  {
    id: 'menu-009',
    name: 'Truffle Mushroom Risotto',
    description:
      'Creamy Arborio rice slow-cooked with porcini mushrooms, finished with truffle oil and Parmigiano.',
    price: 'AED 56',
    category: 'pasta',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Truffle mushroom risotto',
    tags: ['truffle', 'vegetarian'],
    isFeatured: false,
  },
  // --- Small Appetizers ---
  {
    id: 'menu-010',
    name: 'Bruschetta Pomodoro',
    description:
      'Grilled sourdough topped with marinated cherry tomatoes, garlic, fresh basil, and aged balsamic glaze.',
    price: 'AED 28',
    category: 'small_appetizer',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Bruschetta with tomatoes',
    tags: ['vegetarian', 'starter'],
    isFeatured: false,
  },
  {
    id: 'menu-011',
    name: 'Arancini al Ragu',
    description:
      'Golden-fried Sicilian rice balls stuffed with slow-cooked beef ragu and melted mozzarella, served with marinara.',
    price: 'AED 32',
    category: 'small_appetizer',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Arancini rice balls',
    tags: ['fried', 'popular'],
    isFeatured: true,
  },
  {
    id: 'menu-012',
    name: 'Garlic Bread with Cheese',
    description:
      'Oven-baked ciabatta with roasted garlic butter and melted mozzarella, served with a side of marinara dip.',
    price: 'AED 22',
    category: 'small_appetizer',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Cheesy garlic bread',
    tags: ['vegetarian'],
    isFeatured: false,
  },
  // --- Drinks ---
  {
    id: 'menu-013',
    name: 'Fresh Lemonade',
    description:
      'House-squeezed lemonade with a hint of mint and a touch of honey, served over ice.',
    price: 'AED 18',
    category: 'drinks',
    subcategoryId: 'sub-cold-drinks',
    image: '/assets/images/no_image.png',
    alt: 'Fresh lemonade glass',
    tags: ['cold', 'refreshing'],
    isFeatured: false,
  },
  {
    id: 'menu-014',
    name: 'Italian Espresso',
    description:
      'Double-shot espresso made from a premium Italian roast blend, rich and bold.',
    price: 'AED 15',
    category: 'drinks',
    subcategoryId: 'sub-hot-drinks',
    image: '/assets/images/no_image.png',
    alt: 'Espresso cup',
    tags: ['hot', 'coffee'],
    isFeatured: false,
  },
  // --- Breakfast ---
  {
    id: 'menu-015',
    name: 'Breakfast Calzone',
    description:
      'Folded pizza dough filled with scrambled eggs, mozzarella, turkey bacon, roasted peppers, and a touch of pesto.',
    price: 'AED 38',
    category: 'breakfast',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Breakfast calzone',
    tags: ['morning', 'filling'],
    isFeatured: false,
  },
  {
    id: 'menu-016',
    name: 'Shakshuka Flatbread',
    description:
      'Wood-fired flatbread topped with spiced tomato shakshuka, baked eggs, feta, and fresh herbs.',
    price: 'AED 35',
    category: 'breakfast',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Shakshuka flatbread',
    tags: ['morning', 'vegetarian'],
    isFeatured: false,
  },
  // --- Dessert ---
  {
    id: 'menu-017',
    name: 'Tiramisu',
    description:
      'Layers of espresso-soaked Savoiardi biscuits and mascarpone cream, dusted with dark cocoa powder.',
    price: 'AED 30',
    category: 'dessert',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Classic tiramisu',
    tags: ['classic', 'coffee'],
    isFeatured: true,
  },
  {
    id: 'menu-018',
    name: 'Nutella Pizza Dolce',
    description:
      'Sweet pizza dough baked golden and spread with warm Nutella, topped with sliced strawberries and powdered sugar.',
    price: 'AED 34',
    category: 'dessert',
    subcategoryId: null,
    image: '/assets/images/no_image.png',
    alt: 'Nutella dessert pizza',
    tags: ['sweet', 'chocolate'],
    isFeatured: false,
  },
];

// ---------------------------------------------------------------------------
// Admin Menu Items (mirrors menuItems with admin-specific fields)
// ---------------------------------------------------------------------------

export const adminMenuItems: AdminMenuItem[] = menuItems.map((item, index) => ({
  id: item.id,
  name: item.name,
  description: item.description,
  price: parseInt(item.price.replace('AED ', ''), 10),
  category: item.category,
  subcategoryId: item.subcategoryId,
  imageUrl: item.image,
  imageAlt: item.alt,
  tags: item.tags,
  isAvailable: true,
  isFeatured: item.isFeatured ?? false,
  displayOrder: index + 1,
}));

// ---------------------------------------------------------------------------
// Restaurant Images
// ---------------------------------------------------------------------------

export const restaurantImages: RestaurantImage[] = [
  {
    id: 'img-001',
    src: '/assets/images/8-1770389075831.png',
    alt: 'J Pizza Bar interior with warm lighting and rustic decor',
    span: 'col-span-2',
  },
  {
    id: 'img-002',
    src: '/assets/images/Seoul_City-1774601504516.jpeg',
    alt: 'Downtown Dubai skyline view from the restaurant terrace',
  },
  {
    id: 'img-003',
    src: '/assets/images/Seoul_City-1774603224220.jpeg',
    alt: 'Evening ambiance at J Pizza Bar with city lights',
  },
  {
    id: 'img-004',
    src: '/assets/images/seasoning-1774603646439.png',
    alt: 'Fresh Italian seasonings and herbs used in our kitchen',
  },
  {
    id: 'img-005',
    src: '/assets/images/seasoning-1774603823449.png',
    alt: 'Artisan spice selection for authentic Italian flavors',
  },
];

// ---------------------------------------------------------------------------
// Admin Restaurant Images
// ---------------------------------------------------------------------------

export const adminRestaurantImages: AdminRestaurantImage[] = [
  {
    id: 'img-001',
    title: 'Restaurant Interior',
    imageUrl: '/assets/images/8-1770389075831.png',
    imageAlt: 'J Pizza Bar interior with warm lighting and rustic decor',
    spanClass: 'col-span-2',
    displayOrder: 1,
    isActive: true,
    isIntro: true,
  },
  {
    id: 'img-002',
    title: 'Downtown Dubai View',
    imageUrl: '/assets/images/Seoul_City-1774601504516.jpeg',
    imageAlt: 'Downtown Dubai skyline view from the restaurant terrace',
    displayOrder: 2,
    isActive: true,
    isIntro: false,
  },
  {
    id: 'img-003',
    title: 'Evening Ambiance',
    imageUrl: '/assets/images/Seoul_City-1774603224220.jpeg',
    imageAlt: 'Evening ambiance at J Pizza Bar with city lights',
    displayOrder: 3,
    isActive: true,
    isIntro: false,
  },
  {
    id: 'img-004',
    title: 'Fresh Seasonings',
    imageUrl: '/assets/images/seasoning-1774603646439.png',
    imageAlt: 'Fresh Italian seasonings and herbs used in our kitchen',
    displayOrder: 4,
    isActive: true,
    isIntro: false,
  },
  {
    id: 'img-005',
    title: 'Artisan Spices',
    imageUrl: '/assets/images/seasoning-1774603823449.png',
    imageAlt: 'Artisan spice selection for authentic Italian flavors',
    displayOrder: 5,
    isActive: true,
    isIntro: false,
  },
];

// ---------------------------------------------------------------------------
// Offers
// ---------------------------------------------------------------------------

export const offers: Offer[] = [
  {
    id: 'offer-001',
    title: 'Family Feast Deal',
    subtitle: 'Perfect for sharing',
    description:
      'Get two large pizzas, a pasta of your choice, garlic bread, and a 1.5L soft drink - all for one amazing price. Feed the whole family with the best Italian flavors in Downtown Dubai.',
    imageUrl: '/assets/images/8-1770389075831.png',
    imageAlt: 'Family feast pizza deal at J Pizza Bar',
    price: 'AED 149',
    ctaText: 'Order Now',
    ctaLink: '/menu',
    validUntil: '2026-06-30',
    terms: 'Dine-in and takeaway. Cannot be combined with other offers.',
    rating: 4.8,
  },
  {
    id: 'offer-002',
    title: 'Lunch Combo Special',
    subtitle: 'Weekdays 12 PM - 3 PM',
    description:
      'Enjoy any personal pizza with a fresh side salad and a soft drink at a special lunch price. The perfect midday escape in Downtown Dubai.',
    imageUrl: '/assets/images/seasoning-1774603646439.png',
    imageAlt: 'Lunch combo pizza and salad',
    price: 'AED 55',
    ctaText: 'View Menu',
    ctaLink: '/menu',
    validUntil: '2026-05-31',
    terms: 'Available Monday to Friday, 12 PM - 3 PM only. Dine-in only.',
    rating: 4.6,
  },
  {
    id: 'offer-003',
    title: 'Buy 1 Get 1 Free Pizza Night',
    subtitle: 'Every Tuesday',
    description:
      'Bring a friend and double the fun! Buy any large pizza and get a second one of equal or lesser value absolutely free. Available every Tuesday evening.',
    imageUrl: '/assets/images/Seoul_City-1774601504516.jpeg',
    imageAlt: 'Buy one get one free pizza promotion',
    price: 'From AED 42',
    ctaText: 'Reserve a Table',
    ctaLink: '/contact',
    validUntil: '2026-12-31',
    terms:
      'Dine-in only. Every Tuesday 6 PM - 10 PM. The free pizza must be of equal or lesser value.',
    rating: 4.9,
  },
];

// ---------------------------------------------------------------------------
// Admin Offers
// ---------------------------------------------------------------------------

export const adminOffers: AdminOffer[] = offers.map((offer, index) => ({
  id: offer.id,
  title: offer.title,
  subtitle: offer.subtitle,
  description: offer.description,
  imageUrl: offer.imageUrl,
  imageAlt: offer.imageAlt,
  ctaText: offer.ctaText,
  ctaLink: offer.ctaLink,
  status: 'active',
  startDate: '2026-01-01',
  endDate: offer.validUntil,
  validUntil: offer.validUntil,
  terms: offer.terms,
  displayOrder: index + 1,
}));

// ---------------------------------------------------------------------------
// Intro Images (hero / landing section)
// ---------------------------------------------------------------------------

export const introImages: IntroImage[] = [
  {
    id: 'intro-001',
    title: 'J Pizza Bar Entrance',
    imageUrl: '/assets/images/8-1770389075831.png',
    imageAlt: 'Welcome to J Pizza Bar in Downtown Dubai',
    displayOrder: 1,
  },
  {
    id: 'intro-002',
    title: 'Downtown Dubai Evening',
    imageUrl: '/assets/images/Seoul_City-1774601504516.jpeg',
    imageAlt: 'J Pizza Bar with a stunning Downtown Dubai backdrop',
    displayOrder: 2,
  },
  {
    id: 'intro-003',
    title: 'City Lights Dining',
    imageUrl: '/assets/images/Seoul_City-1774603224220.jpeg',
    imageAlt: 'Dine under the city lights at J Pizza Bar',
    displayOrder: 3,
  },
];

// ---------------------------------------------------------------------------
// About Images
// ---------------------------------------------------------------------------

export const aboutImages: AboutImage[] = [
  {
    id: 'about-001',
    title: 'Our Story',
    imageUrl: '/assets/images/aboutus1-1774604157665.jpg',
    imageAlt:
      'The J Pizza Bar team crafting authentic Italian pizzas in Downtown Dubai',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'about-002',
    title: 'Our Kitchen',
    imageUrl: '/assets/images/seasoning-1774603823449.png',
    imageAlt: 'Fresh ingredients and seasonings in the J Pizza Bar kitchen',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'about-003',
    title: 'Our Atmosphere',
    imageUrl: '/assets/images/8-1770389075831.png',
    imageAlt: 'Warm and inviting dining atmosphere at J Pizza Bar',
    displayOrder: 3,
    isActive: true,
  },
];
