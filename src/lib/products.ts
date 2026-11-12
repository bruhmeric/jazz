export type CategorySlug =
  | "sofas"
  | "beds"
  | "wardrobes"
  | "tv-stands"
  | "dressing-tables"
  | "kids"
  | "office"
  | "dining";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  tagline: string;
  image: string;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: "New" | "Bestseller" | "Sale";
  description: string;
  material: string;
  dimensions: string;
  colors: string[];
}

export const BRAND = {
  name: "JAZZEL",
  legalName: "Limacro Furniture (Pvt) Ltd",
  tagline: "Where Quality Meets Comfort",
  subTagline: "Your Furniture Destination",
  phone1: "+94 77 5555 575",
  phone1Href: "+94775555575",
  phone2: "+94 77 3668 698",
  phone2Href: "+94773668698",
  whatsapp: "94775555575",
  email: "contact@jazzel.lk",
  address: "Samandawa Road, Aluviharaya, Matale, Sri Lanka",
  instagram: "https://www.instagram.com/jazzelfurniture",
  facebook: "https://www.facebook.com/JazzelFurnitures",
};

export const categories: Category[] = [
  {
    slug: "sofas",
    name: "Sofas & Living",
    short: "Sofas",
    tagline: "Sink-in comfort, tailored styles",
    image: "/assets/sofa-1.jpg",
    count: 4,
  },
  {
    slug: "beds",
    name: "Beds & Bedrooms",
    short: "Beds",
    tagline: "Rest easy, wake inspired",
    image: "/assets/bed-1.jpg",
    count: 3,
  },
  {
    slug: "wardrobes",
    name: "Wardrobes",
    short: "Wardrobes",
    tagline: "Space that works for you",
    image: "/assets/wardrobe-2.jpg",
    count: 3,
  },
  {
    slug: "tv-stands",
    name: "TV & Media Units",
    short: "TV units",
    tagline: "Center stage for your living room",
    image: "/assets/tv-1.jpg",
    count: 3,
  },
  {
    slug: "dressing-tables",
    name: "Dressing Tables",
    short: "Dressing",
    tagline: "Your morning, beautifully framed",
    image: "/assets/dressing-3.jpg",
    count: 2,
  },
  {
    slug: "kids",
    name: "Kids' World",
    short: "Kids",
    tagline: "Playful, safe, built to last",
    image: "/assets/kids-3.jpg",
    count: 3,
  },
  {
    slug: "office",
    name: "Office & Study",
    short: "Office",
    tagline: "Focus, engineered",
    image: "/assets/office-1.jpg",
    count: 3,
  },
  {
    slug: "dining",
    name: "Dining",
    short: "Dining",
    tagline: "Gather around good design",
    image: "/assets/dining-2.jpg",
    count: 3,
  },
];

export const categoryNames: Record<CategorySlug, string> = {
  sofas: "Sofas & Living",
  beds: "Beds & Bedrooms",
  wardrobes: "Wardrobes",
  "tv-stands": "TV & Media Units",
  "dressing-tables": "Dressing Tables",
  kids: "Kids' World",
  office: "Office & Study",
  dining: "Dining",
};

export const products: Product[] = [
  // ---------- SOFAS ----------
  {
    id: "sofa-milano",
    name: "Milano 3-Seater Fabric Sofa",
    category: "sofas",
    price: 145500,
    image: "/assets/sofa-4.jpg",
    badge: "Bestseller",
    description:
      "A contemporary three-seater wrapped in premium stain-resistant fabric over a kiln-dried teak frame. Feather-soft cushions with high-resilience foam cores keep their shape for years.",
    material: "Teak frame · premium fabric",
    dimensions: "W 218 × D 92 × H 84 cm",
    colors: ["#b0703c", "#42506b", "#7d8471", "#efe6da"],
  },
  {
    id: "sofa-velvet-cloud",
    name: "Velvet Cloud L-Shaped Sectional",
    category: "sofas",
    price: 239000,
    oldPrice: 275000,
    image: "/assets/sofa-2.jpg",
    badge: "Sale",
    description:
      "Generous L-shaped sectional in plush velvet with a chaise that doubles as lounging heaven. Reversible configuration lets you flip the layout to fit any room.",
    material: "Hardwood frame · velvet upholstery",
    dimensions: "W 285 × D 190 × H 82 cm",
    colors: ["#5d4a66", "#2f2f2f", "#8a5a44", "#b9a58a"],
  },
  {
    id: "sofa-sienna",
    name: "Sienna 2-Seater Loveseat",
    category: "sofas",
    price: 96500,
    image: "/assets/sofa-5.jpg",
    description:
      "Compact two-seater with rolled arms and a warm terracotta weave — perfect for apartments, reading nooks and verandah lounges.",
    material: "Mahogany frame · cotton blend",
    dimensions: "W 152 × D 88 × H 86 cm",
    colors: ["#a86b3c", "#8d8373", "#3c3c3c"],
  },
  {
    id: "sofa-nordica",
    name: "Nordica Modular Sofa Set",
    category: "sofas",
    price: 189500,
    image: "/assets/sofa-6.jpg",
    badge: "New",
    description:
      "Scandinavian-inspired modular pieces that rearrange from sofa to lounger to daybed in seconds. Light oak legs and washable covers included.",
    material: "Oak legs · linen-blend covers",
    dimensions: "W 240 × D 160 × H 78 cm",
    colors: ["#e5dcc9", "#9aa28b", "#56606b"],
  },

  // ---------- BEDS ----------
  {
    id: "bed-aurora",
    name: "Aurora Upholstered Queen Bed",
    category: "beds",
    price: 89500,
    image: "/assets/bed-2.jpg",
    badge: "Bestseller",
    description:
      "A softly curved headboard upholstered in linen-look fabric with a hidden slat system and under-bed storage option. Fits standard queen mattress 60 × 78 in.",
    material: "Engineered wood · fabric headboard",
    dimensions: "W 166 × L 208 × H 110 cm",
    colors: ["#8f9d77", "#cdb4a0", "#54555e"],
  },
  {
    id: "bed-teak-king",
    name: "Solid Teak King Bed",
    category: "beds",
    price: 138000,
    oldPrice: 154000,
    image: "/assets/bed-1.jpg",
    badge: "Sale",
    description:
      "Heirloom-grade solid teak bed with hand-finished joinery and a soaring panel headboard. Sourced from sustainable plantations and finished with natural oils.",
    material: "Solid plantation teak",
    dimensions: "W 196 × L 216 × H 125 cm",
    colors: ["#7a5230", "#93684a"],
  },
  {
    id: "bed-cloud-platform",
    name: "Cloud Platform Bed",
    category: "beds",
    price: 62500,
    image: "/assets/bed-3.jpg",
    badge: "New",
    description:
      "Low-profile platform bed with a cushioned fabric surround and floating night ledge. No box spring needed — just add your mattress.",
    material: "Plywood platform · boucle fabric",
    dimensions: "W 168 × L 204 × H 35 cm",
    colors: ["#d8cfc0", "#6d6257", "#3b3b40"],
  },

  // ---------- WARDROBES ----------
  {
    id: "ward-serene",
    name: "Serene 3-Door Mirror Wardrobe",
    category: "wardrobes",
    price: 118500,
    image: "/assets/wardrobe-1.jpg",
    badge: "Bestseller",
    description:
      "Full-height wardrobe with a central full-length mirror, soft-close doors, interior lighting rail and adjustable melamine shelving in a warm woodgrain.",
    material: "Melamine board · mirrored door",
    dimensions: "W 180 × D 58 × H 210 cm",
    colors: ["#8a6a4f", "#5c5148", "#e8e2d9"],
  },
  {
    id: "ward-sliding",
    name: "Space-Saver Sliding Wardrobe",
    category: "wardrobes",
    price: 158000,
    image: "/assets/wardrobe-2.jpg",
    description:
      "Smooth-glide sliding doors that never eat into your floor space. Includes drawer bank, hanging rails and felt-lined jewellery tray.",
    material: "MDF · lacquered glass panels",
    dimensions: "W 200 × D 62 × H 218 cm",
    colors: ["#464f5a", "#c8b49b", "#e9e6e0"],
  },
  {
    id: "ward-compact",
    name: "Compact 2-Door Wardrobe",
    category: "wardrobes",
    price: 68900,
    image: "/assets/wardrobe-3.jpg",
    description:
      "Slim two-door wardrobe ideal for guest rooms and studio apartments. One hanging rail plus three shelves and an upper storage locker.",
    material: "Melamine board",
    dimensions: "W 96 × D 55 × H 195 cm",
    colors: ["#7c6a58", "#efeae2"],
  },

  // ---------- TV STANDS ----------
  {
    id: "tv-linea",
    name: "Linea Floating Media Unit",
    category: "tv-stands",
    price: 34900,
    image: "/assets/tv-1.jpg",
    badge: "New",
    description:
      "Wall-hung floating console with push-open drawers and cable management channels. Fits TVs up to 65 in beautifully.",
    material: "MDF · matte lacquer",
    dimensions: "W 180 × D 35 × H 40 cm",
    colors: ["#2e2e33", "#a9825c", "#efe9e1"],
  },
  {
    id: "tv-nordica-console",
    name: "Nordica TV Console",
    category: "tv-stands",
    price: 28500,
    image: "/assets/tv-2.jpg",
    description:
      "Open-shelf console on turned oak legs with two rattan-front drawers. Airy Scandinavian styling with plenty of media storage.",
    material: "Oak veneer · rattan fronts",
    dimensions: "W 160 × D 42 × H 52 cm",
    colors: ["#b98d62", "#f0ece5"],
  },
  {
    id: "tv-rustic",
    name: "Rustic Media Cabinet",
    category: "tv-stands",
    price: 24500,
    oldPrice: 29900,
    image: "/assets/tv-3.jpg",
    badge: "Sale",
    description:
      "Reclaimed-look cabinet with barn-style doors and a warm honey finish. Solid build with adjustable interior shelves.",
    material: "Rubberwood · distressed finish",
    dimensions: "W 150 × D 40 × H 55 cm",
    colors: ["#8a6a4a", "#6b4f36"],
  },

  // ---------- DRESSING TABLES ----------
  {
    id: "dress-belle",
    name: "Belle Vanity Set",
    category: "dressing-tables",
    price: 44500,
    image: "/assets/dressing-3.jpg",
    badge: "Bestseller",
    description:
      "Rounded vanity with a halo-lit mirror, velvet stool and five soft-close drawers. Hollywood glamour in a compact footprint.",
    material: "MDF · LED halo mirror",
    dimensions: "W 110 × D 45 × H 75 cm",
    colors: ["#efe0dd", "#d9c4b2", "#3f3a45"],
  },
  {
    id: "dress-lumiere",
    name: "Lumière Dressing Table",
    category: "dressing-tables",
    price: 38900,
    image: "/assets/dressing-2.jpg",
    badge: "New",
    description:
      "Minimal vanity with a frameless tilted mirror and jewelry drawer inserts. Slim enough for the coziest bedroom corner.",
    material: "Engineered wood · glass mirror",
    dimensions: "W 100 × D 40 × H 128 cm",
    colors: ["#e8e3db", "#4a4a52"],
  },

  // ---------- KIDS ----------
  {
    id: "kids-rainbow",
    name: "Rainbow Kids Bedroom Set",
    category: "kids",
    price: 58500,
    oldPrice: 67500,
    image: "/assets/kids-1.jpg",
    badge: "Sale",
    description:
      "A complete kids' room in a box: single bed with safety rails, step-up storage stairs and a play nook underneath. Rounded corners everywhere.",
    material: "Birch ply · non-toxic lacquer",
    dimensions: "Bed W 100 × L 196 × H 90 cm",
    colors: ["#d9a5a5", "#a5c9d9", "#e3d5a8"],
  },
  {
    id: "kids-junior-desk",
    name: "Junior Study Desk & Chair",
    category: "kids",
    price: 32500,
    image: "/assets/kids-2.jpg",
    description:
      "Height-adjustable desk with tiltable top for drawing, book ledge and a matching ergonomic junior chair. Homework just got an upgrade.",
    material: "Steel frame · bamboo top",
    dimensions: "W 110 × D 60 × H 52–74 cm",
    colors: ["#e7a8a0", "#98b48c", "#f0d9a8"],
  },
  {
    id: "kids-dreamland",
    name: "Dreamland Kids Bed",
    category: "kids",
    price: 46500,
    image: "/assets/kids-4.jpg",
    badge: "New",
    description:
      "House-frame bed with a cloud-soft headboard panel and under-bed drawer on castors. Bedtime stories have a new home.",
    material: "Pine frame · cotton canvas",
    dimensions: "W 106 × L 200 × H 140 cm",
    colors: ["#efe7dc", "#c9b8d8"],
  },

  // ---------- OFFICE ----------
  {
    id: "office-executive",
    name: "Executive Office Desk",
    category: "office",
    price: 68500,
    image: "/assets/office-1.jpg",
    badge: "Bestseller",
    description:
      "Double-pedestal executive desk in walnut veneer with a leather-inlay top, lockable drawers and integrated cable ports.",
    material: "Walnut veneer · leather inlay",
    dimensions: "W 180 × D 80 × H 76 cm",
    colors: ["#5b4030", "#2f2f2f"],
  },
  {
    id: "office-focus-chair",
    name: "Focus Ergonomic Chair",
    category: "office",
    price: 26900,
    image: "/assets/office-3.jpg",
    description:
      "Breathable mesh back, adjustable lumbar pad and 4-D armrests. Rated for 8+ hour days with a 5-year warranty on the gas lift.",
    material: "Mesh · alloy base",
    dimensions: "W 66 × D 68 × H 98–112 cm",
    colors: ["#2f2f2f", "#9aa5a1", "#c8b8a8"],
  },
  {
    id: "office-studio",
    name: "Studio Workstation Set",
    category: "office",
    price: 92500,
    image: "/assets/office-4.jpg",
    description:
      "Work-from-home hero: sit-stand desk, shelving tower and matching credenza in a cohesive oak-and-ivory finish.",
    material: "Oak veneer · steel frame",
    dimensions: "Desk W 140 × D 70 × H 65–115 cm",
    colors: ["#b28a5e", "#e9e4db", "#33363a"],
  },

  // ---------- DINING ----------
  {
    id: "dining-harvest",
    name: "Harvest 6-Seater Dining Set",
    category: "dining",
    price: 128500,
    image: "/assets/dining-2.jpg",
    badge: "Bestseller",
    description:
      "Solid teak table with breadboard ends and six upholstered chairs. Seats the whole extended family on Avurudu day.",
    material: "Solid teak · fabric chairs",
    dimensions: "Table W 200 × D 100 × H 76 cm",
    colors: ["#7c5a3d", "#e6e0d5", "#42506b"],
  },
  {
    id: "dining-bistro",
    name: "Bistro Compact Dining Set",
    category: "dining",
    price: 64900,
    image: "/assets/dining-1.jpg",
    description:
      "Space-saving round table with two curved stools that tuck fully under. Ideal for studio living and morning coffee corners.",
    material: "Rubberwood · cane stools",
    dimensions: "Ø 90 × H 75 cm",
    colors: ["#a97c50", "#f0ece4", "#3a3d42"],
  },
  {
    id: "dining-grand-extendable",
    name: "Grand Extendable Dining Table",
    category: "dining",
    price: 98500,
    oldPrice: 112000,
    image: "/assets/dining-3.jpg",
    badge: "Sale",
    description:
      "Butterfly-extension table that grows from six seats to ten in one motion. Turned legs and a lacquered top that shrugs off spills.",
    material: "Ash top · painted legs",
    dimensions: "W 160–220 × D 90 × H 76 cm",
    colors: ["#e9e2d5", "#54604f", "#383a40"],
  },
];

export function formatLKR(n: number): string {
  return `Rs ${n.toLocaleString("en-LK")}`;
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
