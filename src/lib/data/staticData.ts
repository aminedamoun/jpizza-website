// Static data for J Pizza Bar - Downtown Dubai
// Complete menu data from original Supabase database

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
    id: 'cat-breakfast',
    value: 'breakfast',
    label: 'Breakfast',
    emoji: '\u2600\uFE0F',
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: 'cat-small_appetizer',
    value: 'small_appetizer',
    label: 'Small Bites',
    emoji: '\uD83E\uDD57',
    displayOrder: 2,
    isVisible: true,
  },
  {
    id: 'cat-pizza',
    value: 'pizza',
    label: 'Pizza',
    emoji: '\uD83C\uDF55',
    displayOrder: 3,
    isVisible: true,
  },
  {
    id: 'cat-pasta',
    value: 'pasta',
    label: 'Pasta',
    emoji: '\uD83C\uDF5D',
    displayOrder: 4,
    isVisible: true,
  },
  {
    id: 'cat-dessert',
    value: 'dessert',
    label: 'Dessert',
    emoji: '\uD83C\uDF70',
    displayOrder: 5,
    isVisible: true,
  },
  {
    id: 'cat-drinks',
    value: 'drinks',
    label: 'Drinks',
    emoji: '\uD83E\uDD64',
    displayOrder: 6,
    isVisible: true,
  },
  {
    id: 'cat-classic',
    value: 'classic',
    label: 'Classic',
    emoji: '\u2B50',
    displayOrder: 7,
    isVisible: true,
  },
];

// ---------------------------------------------------------------------------
// Subcategories
// ---------------------------------------------------------------------------

export const subcategories: Subcategory[] = [
  {
    id: 'sub-tea',
    categoryId: 'cat-drinks',
    value: 'tea',
    label: 'Tea',
    emoji: '\uD83C\uDF75',
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: 'sub-coffee',
    categoryId: 'cat-drinks',
    value: 'coffee',
    label: 'Coffee',
    emoji: '\u2615',
    displayOrder: 2,
    isVisible: true,
  },
  {
    id: 'sub-mocktails',
    categoryId: 'cat-drinks',
    value: 'mocktails',
    label: 'Mocktails',
    emoji: '\uD83C\uDF79',
    displayOrder: 3,
    isVisible: true,
  },
];

// ---------------------------------------------------------------------------
// Menu Items
// ---------------------------------------------------------------------------

export const menuItems: MenuItem[] = [
  // =========================================================================
  // BREAKFAST
  // =========================================================================
  {
    id: 'menu-001',
    name: "J's Double Breakfast Combo",
    description:
      'Double the joy! Two eggs your way, beef bacon, turkey sausage, baked beans, hash browns, grilled tomato, mushrooms, and toast.',
    price: 'AED 149',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
    alt: "J's Double Breakfast Combo with eggs, bacon, sausage, and sides",
    tags: ['Vegetarian', 'Premium'],
  },
  {
    id: 'menu-002',
    name: "J's Single Breakfast Combo",
    description:
      'One egg your way, beef bacon, turkey sausage, baked beans, hash brown, grilled tomato, mushrooms, and toast.',
    price: 'AED 99',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
    alt: "J's Single Breakfast Combo",
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-003',
    name: 'Poached Avo on Toast',
    description:
      'Creamy smashed avocado on toasted sourdough, topped with perfectly poached eggs, cherry tomatoes, and microgreens.',
    price: 'AED 48',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
    alt: 'Poached eggs on avocado toast',
    tags: ['Vegetarian', 'Healthy'],
  },
  {
    id: 'menu-004',
    name: 'Tuna on Avo Toast',
    description:
      'Seared tuna steak served on smashed avocado toast with sesame seeds, pickled onions, and a lemon drizzle.',
    price: 'AED 60',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7',
    alt: 'Tuna on avocado toast',
    tags: ['High Protein'],
  },
  {
    id: 'menu-005',
    name: 'Salmon Avo on Toast',
    description:
      'Smoked salmon layered over smashed avocado on toasted sourdough with capers, red onion, and cream cheese.',
    price: 'AED 65',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    alt: 'Salmon avocado toast',
    tags: ['High Protein', 'Premium'],
  },
  {
    id: 'menu-006',
    name: 'Salmon on Toast',
    description:
      'Generous portions of smoked salmon on toasted sourdough with cream cheese, dill, and a squeeze of lemon.',
    price: 'AED 60',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae',
    alt: 'Smoked salmon on toast',
    tags: ['High Protein', 'Premium'],
  },
  {
    id: 'menu-007',
    name: 'Tuna on Toast',
    description:
      'Seared tuna on toasted sourdough with a light wasabi mayo, pickled ginger, and sesame seeds.',
    price: 'AED 55',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1553909489-ec2175ef8f35',
    alt: 'Tuna on toast',
    tags: ['High Protein'],
  },
  {
    id: 'menu-008',
    name: 'Scrambled Eggs',
    description:
      'Fluffy scrambled eggs cooked low and slow, served on toasted sourdough with butter and chives.',
    price: 'AED 50',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d',
    alt: 'Scrambled eggs on toast',
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-009',
    name: 'Pulled Beef Benedict',
    description:
      'Slow-cooked pulled beef on a toasted English muffin with poached eggs, hollandaise sauce, and microgreens.',
    price: 'AED 70',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7',
    alt: 'Pulled beef eggs Benedict',
    tags: ['Premium'],
  },
  {
    id: 'menu-010',
    name: 'English Breakfast',
    description:
      'The full English: eggs your way, beef bacon, pork sausage, baked beans, grilled tomato, mushrooms, hash brown, and toast.',
    price: 'AED 70',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
    alt: 'Full English breakfast',
    tags: ['Premium'],
  },
  {
    id: 'menu-011',
    name: 'Breakfast Bowl',
    description:
      'A power-packed bowl with scrambled eggs, avocado, grilled halloumi, quinoa, cherry tomatoes, and a tahini drizzle.',
    price: 'AED 85',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2',
    alt: 'Healthy breakfast bowl',
    tags: ['High Protein', 'Premium'],
  },
  {
    id: 'menu-012',
    name: 'Turkish Egg',
    description:
      'Poached eggs nestled in whipped garlic yogurt, drizzled with spiced chili butter and served with toasted sourdough.',
    price: 'AED 60',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
    alt: 'Turkish eggs (Cilbir)',
    tags: ['Spicy'],
  },
  {
    id: 'menu-013',
    name: 'Shakshuka',
    description:
      'Eggs poached in a rich, spiced tomato and pepper sauce, served with warm pita bread and crumbled feta.',
    price: 'AED 55',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1587486937736-e7c6b76584e8',
    alt: 'Shakshuka with eggs in tomato sauce',
    tags: ['Vegetarian', 'Spicy'],
  },
  {
    id: 'menu-014',
    name: 'Keto Lifestyle Bowl',
    description:
      'A low-carb bowl with scrambled eggs, smoked salmon, avocado, cream cheese, cherry tomatoes, and mixed seeds.',
    price: 'AED 86',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    alt: 'Keto lifestyle breakfast bowl',
    tags: ['Healthy', 'High Protein', 'Premium'],
  },
  {
    id: 'menu-015',
    name: 'Peach Burrata Blossom',
    description:
      'Fresh burrata paired with ripe peach slices, arugula, prosciutto, and a honey balsamic glaze.',
    price: 'AED 58',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5',
    alt: 'Peach and burrata salad',
    tags: ['Vegetarian', 'Premium'],
  },
  {
    id: 'menu-016',
    name: 'Mozzarella Salad',
    description:
      'Fresh mozzarella with vine-ripened tomatoes, basil, and a drizzle of extra virgin olive oil and balsamic reduction.',
    price: 'AED 45',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5',
    alt: 'Fresh mozzarella caprese salad',
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-017',
    name: 'French Love Toast',
    description:
      'Thick-cut brioche French toast with mixed berries, mascarpone cream, maple syrup, and toasted almonds.',
    price: 'AED 80',
    category: 'breakfast',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
    alt: 'French toast with berries and cream',
    tags: ['Sweet', 'Premium'],
  },

  // =========================================================================
  // SMALL APPETIZER
  // =========================================================================
  {
    id: 'menu-018',
    name: 'Crunch Bites',
    description:
      'Crispy golden bites served with a tangy dipping sauce. A perfect shareable starter.',
    price: 'AED 45',
    category: 'small_appetizer',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf',
    alt: 'Crispy crunch bites appetizer',
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-019',
    name: 'Tropical Ceviche',
    description:
      'Fresh fish cured in citrus juices with mango, avocado, red onion, cilantro, and a hint of chili.',
    price: 'AED 58',
    category: 'small_appetizer',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41',
    alt: 'Tropical ceviche with mango and avocado',
    tags: ['Premium'],
  },
  {
    id: 'menu-020',
    name: 'Kale It',
    description:
      'Massaged kale salad with toasted seeds, dried cranberries, shaved parmesan, and a lemon vinaigrette.',
    price: 'AED 55',
    category: 'small_appetizer',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    alt: 'Kale salad with seeds and cranberries',
    tags: ['Healthy'],
  },
  {
    id: 'menu-021',
    name: 'Mixed Salad',
    description:
      'A vibrant mix of seasonal greens, cherry tomatoes, cucumber, radish, and a light herb vinaigrette.',
    price: 'AED 60',
    category: 'small_appetizer',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    alt: 'Fresh mixed salad',
    tags: ['Vegetarian', 'Healthy'],
  },
  {
    id: 'menu-022',
    name: 'Peach Burrata Blossom',
    description:
      'Creamy burrata with fresh peach, arugula, prosciutto, and a honey balsamic glaze.',
    price: 'AED 58',
    category: 'small_appetizer',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5',
    alt: 'Peach and burrata appetizer',
    tags: ['Vegetarian', 'Premium'],
  },
  {
    id: 'menu-023',
    name: 'Mozzarella Salad',
    description:
      'Buffalo mozzarella with heirloom tomatoes, fresh basil, olive oil, and aged balsamic.',
    price: 'AED 45',
    category: 'small_appetizer',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804',
    alt: 'Mozzarella and tomato salad',
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-024',
    name: 'Kofta Bites',
    description:
      'Juicy spiced lamb kofta bites served with a cool mint yogurt dip and warm pita.',
    price: 'AED 52',
    category: 'small_appetizer',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468',
    alt: 'Spiced kofta bites with yogurt dip',
  },
  {
    id: 'menu-025',
    name: 'Wing It',
    description:
      'Crispy chicken wings tossed in a spicy house sauce, served with celery sticks and blue cheese dip.',
    price: 'AED 48',
    category: 'small_appetizer',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7',
    alt: 'Spicy chicken wings',
    tags: ['Spicy'],
  },
  {
    id: 'menu-026',
    name: 'French Fries',
    description:
      'Golden, crispy French fries seasoned with sea salt. Simple and irresistible.',
    price: 'AED 30',
    category: 'small_appetizer',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
    alt: 'Crispy French fries',
    tags: ['Vegetarian'],
  },

  // =========================================================================
  // PIZZA
  // =========================================================================
  {
    id: 'menu-027',
    name: 'Beef Lover',
    description:
      'Loaded with seasoned ground beef, beef pepperoni, caramelized onions, mozzarella, and our signature tomato sauce.',
    price: 'AED 116',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    alt: 'Beef Lover pizza loaded with meats',
    tags: ['Premium'],
    isFeatured: true,
  },
  {
    id: 'menu-028',
    name: 'Seoul City',
    description:
      'Korean-inspired pizza with spicy gochujang sauce, bulgogi beef, kimchi, mozzarella, and sesame seeds.',
    price: 'AED 95',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f',
    alt: 'Seoul City Korean fusion pizza',
    tags: ['Spicy', 'Premium'],
    isFeatured: true,
  },
  {
    id: 'menu-029',
    name: 'Duck Pineapple Dance',
    description:
      'Smoked duck breast with caramelized pineapple, hoisin glaze, mozzarella, and spring onions.',
    price: 'AED 95',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
    alt: 'Duck and pineapple pizza',
    tags: ['Premium'],
    isFeatured: true,
  },
  {
    id: 'menu-030',
    name: 'Peppy',
    description:
      'Classic pepperoni pizza with mozzarella, our signature tomato sauce, and a sprinkle of chili flakes.',
    price: 'AED 76',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
    alt: 'Pepperoni pizza',
    tags: ['Spicy'],
  },
  {
    id: 'menu-031',
    name: 'Chicken Harissa',
    description:
      'Grilled chicken with spicy harissa sauce, roasted peppers, red onion, mozzarella, and fresh cilantro.',
    price: 'AED 86',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f',
    alt: 'Chicken harissa pizza',
    tags: ['Spicy'],
  },
  {
    id: 'menu-032',
    name: 'Marggy',
    description:
      'Our take on the classic Margherita with San Marzano tomato sauce, fresh mozzarella, basil, and olive oil.',
    price: 'AED 68',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    alt: 'Margherita pizza',
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-033',
    name: 'Shroomy',
    description:
      'A mushroom lovers dream with wild mushrooms, truffle cream, mozzarella, thyme, and shaved parmesan.',
    price: 'AED 84',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f',
    alt: 'Mushroom truffle pizza',
    tags: ['Vegetarian', 'Premium'],
  },
  {
    id: 'menu-034',
    name: 'Cheesy',
    description:
      'Four-cheese blend of mozzarella, cheddar, parmesan, and gorgonzola on a garlic butter base.',
    price: 'AED 72',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    alt: 'Four cheese pizza',
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-035',
    name: 'Tuna',
    description:
      'Seared tuna with red onion, capers, black olives, mozzarella, and a lemon herb dressing.',
    price: 'AED 88',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f',
    alt: 'Tuna pizza',
  },
  {
    id: 'menu-036',
    name: 'Gorgonzola Green Blue',
    description:
      'Gorgonzola cheese with spinach, green olives, mozzarella, walnuts, and a honey drizzle.',
    price: 'AED 88',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    alt: 'Gorgonzola and greens pizza',
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-037',
    name: 'Mozzarella',
    description:
      'Simple and elegant - fresh mozzarella, cherry tomatoes, basil, and extra virgin olive oil.',
    price: 'AED 78',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
    alt: 'Fresh mozzarella pizza',
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-038',
    name: 'Grilled Chicken Sandwich',
    description:
      'Grilled chicken breast with lettuce, tomato, pickles, and garlic mayo in a toasted ciabatta.',
    price: 'AED 55',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1553909489-ec2175ef8f35',
    alt: 'Grilled chicken sandwich',
  },
  {
    id: 'menu-039',
    name: 'Tuna Sandwich',
    description:
      'Tuna salad with avocado, lettuce, tomato, and lemon aioli in a toasted sourdough.',
    price: 'AED 60',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3',
    alt: 'Tuna sandwich',
  },
  {
    id: 'menu-040',
    name: 'Brisket Sandwich',
    description:
      'Slow-smoked beef brisket with coleslaw, pickles, BBQ sauce, and melted cheddar in a brioche bun.',
    price: 'AED 75',
    category: 'pizza',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1553909489-ec2175ef8f35',
    alt: 'Brisket sandwich',
    tags: ['Premium'],
  },

  // =========================================================================
  // PASTA
  // =========================================================================
  {
    id: 'menu-041',
    name: 'Midnight Mac',
    description:
      'Creamy mac and cheese made with a blend of cheddar and mozzarella, topped with crispy breadcrumbs.',
    price: 'AED 42',
    category: 'pasta',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
    alt: 'Creamy mac and cheese',
    tags: ['Vegetarian'],
  },
  {
    id: 'menu-042',
    name: 'Lasagna',
    description:
      'Layers of fresh pasta, slow-cooked beef ragu, bechamel sauce, and melted mozzarella, baked to golden perfection.',
    price: 'AED 70',
    category: 'pasta',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3',
    alt: 'Classic beef lasagna',
  },
  {
    id: 'menu-043',
    name: 'Rigatoni Bolognese',
    description:
      'Al dente rigatoni tossed in a rich, slow-simmered beef bolognese sauce, topped with parmesan.',
    price: 'AED 95',
    category: 'pasta',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9',
    alt: 'Rigatoni with bolognese sauce',
  },
  {
    id: 'menu-044',
    name: 'Creamy Spaghetti Special',
    description:
      'Spaghetti in a velvety cream sauce with garlic, parmesan, and a touch of nutmeg.',
    price: 'AED 50',
    category: 'pasta',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
    alt: 'Creamy spaghetti',
    tags: ['Vegetarian'],
  },

  // =========================================================================
  // DESSERT
  // =========================================================================
  {
    id: 'menu-045',
    name: "J's Caramel Chocolate Fondant",
    description:
      'Rich dark chocolate fondant with a molten caramel center, served with vanilla ice cream.',
    price: 'AED 55',
    category: 'dessert',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51',
    alt: 'Chocolate fondant with caramel center',
    tags: ['Sweet'],
  },
  {
    id: 'menu-046',
    name: "J's Soft Serve with a Raspberry Twist",
    description:
      'Creamy vanilla soft serve swirled with a tangy raspberry coulis and topped with fresh raspberries.',
    price: 'AED 45',
    category: 'dessert',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    alt: 'Soft serve ice cream with raspberry',
    tags: ['Sweet'],
  },
  {
    id: 'menu-047',
    name: "J's Soft Serve with a Caramel Lotus Twist",
    description:
      'Vanilla soft serve drizzled with salted caramel sauce and crushed Lotus Biscoff crumbles.',
    price: 'AED 45',
    category: 'dessert',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
    alt: 'Soft serve ice cream with caramel and Lotus',
    tags: ['Sweet'],
  },
  {
    id: 'menu-048',
    name: "J's Special Tiramisu",
    description:
      'Our signature tiramisu with layers of espresso-soaked Savoiardi, mascarpone cream, and dark cocoa.',
    price: 'AED 50',
    category: 'dessert',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    alt: "J's special tiramisu",
    tags: ['Sweet'],
  },
  {
    id: 'menu-049',
    name: "J's Galatopita",
    description:
      'Traditional Greek milk pie with crispy phyllo pastry, custard cream, cinnamon, and a honey drizzle.',
    price: 'AED 65',
    category: 'dessert',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866',
    alt: 'Greek Galatopita milk pie',
    tags: ['Sweet', 'Premium'],
  },

  // =========================================================================
  // DRINKS - TEA
  // =========================================================================
  {
    id: 'menu-050',
    name: 'Berry Queen',
    description:
      'A fragrant berry-infused tea blend with notes of strawberry, raspberry, and hibiscus.',
    price: 'AED 55',
    category: 'drinks',
    subcategoryId: 'sub-tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
    alt: 'Berry Queen tea',
  },
  {
    id: 'menu-051',
    name: 'Green Tea',
    description:
      'Premium Japanese green tea, delicate and refreshing with natural antioxidants.',
    price: 'AED 55',
    category: 'drinks',
    subcategoryId: 'sub-tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
    alt: 'Green tea',
  },
  {
    id: 'menu-052',
    name: 'English Breakfast Tea',
    description:
      'A robust and full-bodied black tea blend, perfect with a splash of milk.',
    price: 'AED 55',
    category: 'drinks',
    subcategoryId: 'sub-tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
    alt: 'English Breakfast tea',
  },
  {
    id: 'menu-053',
    name: 'Chamomile with Mandarin',
    description:
      'Soothing chamomile tea infused with sweet mandarin orange for a calming experience.',
    price: 'AED 55',
    category: 'drinks',
    subcategoryId: 'sub-tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
    alt: 'Chamomile mandarin tea',
  },
  {
    id: 'menu-054',
    name: 'Hot Lemon with Ginger & Honey',
    description:
      'A warming blend of fresh lemon, ginger root, and natural honey. Perfect for a soothing sip.',
    price: 'AED 55',
    category: 'drinks',
    subcategoryId: 'sub-tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
    alt: 'Hot lemon ginger honey tea',
  },
  {
    id: 'menu-055',
    name: 'Masala Chai',
    description:
      'Spiced Indian chai with cinnamon, cardamom, cloves, ginger, and steamed milk.',
    price: 'AED 55',
    category: 'drinks',
    subcategoryId: 'sub-tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
    alt: 'Masala chai tea',
  },
  {
    id: 'menu-056',
    name: 'Milk Oolong with Banana & Cinnamon',
    description:
      'Creamy milk oolong tea with banana and cinnamon for a unique, comforting flavor.',
    price: 'AED 55',
    category: 'drinks',
    subcategoryId: 'sub-tea',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc',
    alt: 'Milk oolong banana cinnamon tea',
  },

  // =========================================================================
  // DRINKS - COFFEE
  // =========================================================================
  {
    id: 'menu-057',
    name: 'Iced Americano',
    description:
      'Double-shot espresso poured over ice with cold water for a refreshing, bold coffee.',
    price: 'AED 24',
    category: 'drinks',
    subcategoryId: 'sub-coffee',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    alt: 'Iced Americano coffee',
  },
  {
    id: 'menu-058',
    name: 'Iced Latte Macchiato',
    description:
      'Layered iced milk topped with a shot of espresso for a visually stunning, smooth coffee.',
    price: 'AED 28',
    category: 'drinks',
    subcategoryId: 'sub-coffee',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    alt: 'Iced Latte Macchiato',
  },
  {
    id: 'menu-059',
    name: 'Iced Spanish Latte',
    description:
      'Sweetened condensed milk blended with espresso and ice for a rich, indulgent iced coffee.',
    price: 'AED 35',
    category: 'drinks',
    subcategoryId: 'sub-coffee',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    alt: 'Iced Spanish Latte',
  },
  {
    id: 'menu-060',
    name: 'Iced Latte',
    description:
      'Smooth espresso mixed with cold milk and served over ice. A classic refresher.',
    price: 'AED 28',
    category: 'drinks',
    subcategoryId: 'sub-coffee',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    alt: 'Iced Latte',
  },
  {
    id: 'menu-061',
    name: 'Flat White',
    description:
      'Velvety microfoam milk with a double ristretto shot for a rich, smooth coffee experience.',
    price: 'AED 26',
    category: 'drinks',
    subcategoryId: 'sub-coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    alt: 'Flat White coffee',
  },
  {
    id: 'menu-062',
    name: 'Latte',
    description:
      'Creamy steamed milk with a single shot of espresso, topped with a thin layer of foam.',
    price: 'AED 26',
    category: 'drinks',
    subcategoryId: 'sub-coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    alt: 'Latte coffee',
  },
  {
    id: 'menu-063',
    name: 'Cappuccino',
    description:
      'Equal parts espresso, steamed milk, and frothy milk foam. An Italian classic.',
    price: 'AED 26',
    category: 'drinks',
    subcategoryId: 'sub-coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    alt: 'Cappuccino coffee',
  },
  {
    id: 'menu-064',
    name: 'Cortado',
    description:
      'A perfectly balanced espresso cut with an equal amount of warm steamed milk.',
    price: 'AED 24',
    category: 'drinks',
    subcategoryId: 'sub-coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    alt: 'Cortado coffee',
  },
  {
    id: 'menu-065',
    name: 'Piccolo',
    description:
      'A ristretto shot topped with silky steamed milk in a small glass. Intense and smooth.',
    price: 'AED 22',
    category: 'drinks',
    subcategoryId: 'sub-coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    alt: 'Piccolo latte',
  },

  // =========================================================================
  // DRINKS - MOCKTAILS
  // =========================================================================
  {
    id: 'menu-066',
    name: 'Old Fashion New Style',
    description:
      'A non-alcoholic twist on the classic Old Fashioned with smoked syrup, bitters, and orange zest.',
    price: 'AED 52',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'Old Fashion New Style mocktail',
  },
  {
    id: 'menu-067',
    name: 'Lychee Raspberry Collins',
    description:
      'A refreshing blend of lychee, raspberry, lemon, and sparkling water with a floral finish.',
    price: 'AED 42',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'Lychee Raspberry Collins mocktail',
  },
  {
    id: 'menu-068',
    name: 'Popcorn Cola',
    description:
      'A playful mocktail combining buttery popcorn syrup with cola and a salted caramel rim.',
    price: 'AED 38',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'Popcorn Cola mocktail',
  },
  {
    id: 'menu-069',
    name: 'Pina Colada',
    description:
      'Creamy coconut milk blended with pineapple juice and crushed ice. A tropical escape.',
    price: 'AED 42',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'Pina Colada mocktail',
  },
  {
    id: 'menu-070',
    name: 'Long Island Iced Tea',
    description:
      'A non-alcoholic version of the classic with a blend of tea, lemon, and cola for a complex, refreshing taste.',
    price: 'AED 45',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'Long Island Iced Tea mocktail',
  },
  {
    id: 'menu-071',
    name: 'Espresso Martini',
    description:
      'A non-alcoholic espresso martini with freshly brewed coffee, vanilla syrup, and a frothy top.',
    price: 'AED 45',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'Espresso Martini mocktail',
  },
  {
    id: 'menu-072',
    name: 'Spicy Margarita',
    description:
      'A fiery non-alcoholic margarita with fresh lime, agave, and a jalapeno kick on a salt rim.',
    price: 'AED 45',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'Spicy Margarita mocktail',
  },
  {
    id: 'menu-073',
    name: 'New York Sour',
    description:
      'A sophisticated blend of lemon, sugar syrup, and a red wine float, alcohol-free.',
    price: 'AED 45',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'New York Sour mocktail',
  },
  {
    id: 'menu-074',
    name: 'Saffron Mojito',
    description:
      'A luxurious twist on the mojito with saffron-infused syrup, fresh mint, lime, and sparkling water.',
    price: 'AED 48',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'Saffron Mojito mocktail',
  },
  {
    id: 'menu-075',
    name: 'Italian Spritz',
    description:
      'A bubbly non-alcoholic Italian spritz with bitter orange, prosecco-style soda, and a slice of orange.',
    price: 'AED 48',
    category: 'drinks',
    subcategoryId: 'sub-mocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    alt: 'Italian Spritz mocktail',
  },

  // =========================================================================
  // DRINKS - FRESH JUICES
  // =========================================================================
  {
    id: 'menu-076',
    name: 'Carrot Juice',
    description:
      'Freshly squeezed carrot juice, naturally sweet and packed with vitamins.',
    price: 'AED 38',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
    alt: 'Fresh carrot juice',
    tags: ['Healthy'],
  },
  {
    id: 'menu-077',
    name: 'Green Apple Juice',
    description:
      'Crisp and refreshing green apple juice, freshly pressed to order.',
    price: 'AED 38',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
    alt: 'Fresh green apple juice',
    tags: ['Healthy'],
  },
  {
    id: 'menu-078',
    name: 'Orange Juice',
    description:
      'Classic freshly squeezed orange juice, bursting with natural citrus flavor.',
    price: 'AED 38',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
    alt: 'Fresh orange juice',
    tags: ['Healthy'],
  },

  // =========================================================================
  // DRINKS - SOFT DRINKS
  // =========================================================================
  {
    id: 'menu-079',
    name: 'Cola',
    description: 'Classic cola served chilled.',
    price: 'AED 15',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
    alt: 'Cola soft drink',
  },
  {
    id: 'menu-080',
    name: 'Cola Zero',
    description: 'Zero-sugar cola with the same great taste.',
    price: 'AED 15',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
    alt: 'Cola Zero soft drink',
  },
  {
    id: 'menu-081',
    name: 'Fanta',
    description: 'Fizzy orange Fanta, refreshing and sweet.',
    price: 'AED 15',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
    alt: 'Fanta orange soft drink',
  },
  {
    id: 'menu-082',
    name: 'Sprite',
    description: 'Crisp and clear lemon-lime Sprite.',
    price: 'AED 15',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
    alt: 'Sprite lemon-lime soft drink',
  },

  // =========================================================================
  // DRINKS - BEER (NON-ALCOHOLIC)
  // =========================================================================
  {
    id: 'menu-083',
    name: 'Zero Heineken (Non-Alcoholic)',
    description:
      'Heineken 0.0 non-alcoholic beer. All the refreshing taste, zero alcohol.',
    price: 'AED 28',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9',
    alt: 'Heineken Zero non-alcoholic beer',
  },

  // =========================================================================
  // DRINKS - WATER
  // =========================================================================
  {
    id: 'menu-084',
    name: 'Still Water (Small)',
    description: 'Still mineral water, 330ml.',
    price: 'AED 13',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d',
    alt: 'Small still water bottle',
  },
  {
    id: 'menu-085',
    name: 'Still Water (Large)',
    description: 'Still mineral water, 750ml.',
    price: 'AED 18',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d',
    alt: 'Large still water bottle',
  },
  {
    id: 'menu-086',
    name: 'Sparkling Water (Small)',
    description: 'Sparkling mineral water, 330ml.',
    price: 'AED 13',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d',
    alt: 'Small sparkling water bottle',
  },
  {
    id: 'menu-087',
    name: 'Sparkling Water (Large)',
    description: 'Sparkling mineral water, 750ml.',
    price: 'AED 18',
    category: 'drinks',
    subcategoryId: null,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d',
    alt: 'Large sparkling water bottle',
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
