import { Product, ProductReview } from "./types";

export const categories: Array<Product["category"]> = ["انیمه", "بازی", "سینما"];

const animeDesc = (name: string) => [
  `${name} بخشی از مجموعه‌ی «عصر سرخ» است؛ خط تولیدی که قهرمانان تیغ‌به‌دست دنیای انیمه را با رزین رزولوشن بالا تراش می‌زند و در لایه‌های گرادیانت مات رنگ‌آمیزی می‌کند.`,
  "هر جزئیات لباس، حالت بدن و نگاه شخصیت زیر نظر مستقیم تیم تراش آتلیه بازبینی شده تا حس حرکت و قدرت صحنه‌ی اصلی را در حالت ایستا حفظ کند.",
];

const gamesDesc = (name: string) => [
  `${name} از دل مجموعه‌ی «افسانه‌های آهنین» بیرون آمده؛ جایی که شخصیت‌های زره‌پوش کمپین‌های افسانه‌ای با پرداخت فلزی فرسوده و بافت‌های دستی زنگار بازسازی می‌شوند.`,
  "پایه‌ی هر اثر با المان‌های صحنه‌ی نبرد طراحی شده تا مجسمه را از یک پیکره‌ی ساده به یک دیوراما تبدیل کند.",
];

const cinemaDesc = (name: string) => [
  `${name} بخشی از کلکسیون «نگاتیو نقره‌ای» است؛ برداشتی دقیق و فریم‌به‌فریم از یکی از به‌یادماندنی‌ترین لحظات پرده‌ی سینما.`,
  "تیم پیکره‌سازی ما پیش از تراش، ده‌ها فریم مرجع را بررسی می‌کند تا تناسب چهره و حالت بدن دقیقاً همان چیزی باشد که روی پرده دیده‌اید.",
];

const animeSpecs = [
  { label: "متریال", value: "رزین پلی‌یورتان درجه‌ی استودیویی" },
  { label: "ارتفاع", value: "حدود ۲۸ سانتی‌متر (مقیاس ۱:۶)" },
  { label: "پرداخت", value: "رنگ‌آمیزی دستی لایه‌ای، مات" },
  { label: "پایه", value: "چوب پرداخت‌شده با نشان حک‌شده" },
  { label: "گواهی", value: "گواهی اصالت امضاشده و شماره‌دار" },
];

const gamesSpecs = [
  { label: "متریال", value: "رزین پلی‌یورتان با پوشش فلزی" },
  { label: "ارتفاع", value: "حدود ۳۸ سانتی‌متر (مقیاس ۱:۴)" },
  { label: "پرداخت", value: "پرداخت فلزی فرسوده، چند لایه" },
  { label: "پایه", value: "دیوراما با المان صحنه‌ی نبرد" },
  { label: "گواهی", value: "گواهی اصالت امضاشده و شماره‌دار" },
];

const cinemaSpecs = [
  { label: "متریال", value: "رزین پلی‌یورتان درجه‌ی نمایشی" },
  { label: "ارتفاع", value: "حدود ۳۲ سانتی‌متر (مقیاس ۱:۵)" },
  { label: "پرداخت", value: "رنگ‌آمیزی واقع‌گرا، مطابق فریم مرجع" },
  { label: "پایه", value: "پایه‌ی شیشه‌ای با حکاکی لیزری" },
  { label: "گواهی", value: "گواهی اصالت امضاشده و شماره‌دار" },
];

export const products: Product[] = [
  {
    id: "crimson-reaper",
    slug: "crimson-reaper",
    name: "شوالیه‌ی سرخ",
    series: "عصر سرخ",
    category: "انیمه",
    price: 25_000_000,
    compareAtPrice: 28_500_000,
    editionSize: 300,
    editionLeft: 42,
    scale: "۱:۶",
    sku: "INJ-AN-101",
    rating: 4.9,
    reviewCount: 86,
    shortDescription: "قهرمان تیغ‌به‌دست عصر سرخ، در اوج لحظه‌ی نبرد.",
    description: animeDesc("شوالیه‌ی سرخ"),
    specs: animeSpecs,
    featured: true,
  },
  {
    id: "ashen-monarch",
    slug: "ashen-monarch",
    name: "پادشاه خاکستر",
    series: "عصر سرخ",
    category: "انیمه",
    price: 28_000_000,
    editionSize: 250,
    editionLeft: 31,
    scale: "۱:۶",
    sku: "INJ-AN-102",
    rating: 4.8,
    reviewCount: 64,
    shortDescription: "فرمانروایی خاموش با ردایی از خاکستر و طلا.",
    description: animeDesc("پادشاه خاکستر"),
    specs: animeSpecs,
    featured: true,
  },
  {
    id: "wraithbound-kage",
    slug: "wraithbound-kage",
    name: "کاگه‌ی روح‌بسته",
    series: "عصر سرخ",
    category: "انیمه",
    price: 29_000_000,
    editionSize: 200,
    editionLeft: 58,
    scale: "۱:۶",
    sku: "INJ-AN-103",
    rating: 4.9,
    reviewCount: 21,
    shortDescription: "سایه‌ای میان دو دنیا، تازه از استودیو رونمایی شده.",
    description: animeDesc("کاگه‌ی روح‌بسته"),
    specs: animeSpecs,
    isNew: true,
  },
  {
    id: "glasswing-oracle",
    slug: "glasswing-oracle",
    name: "غیب‌گوی بال‌شیشه‌ای",
    series: "عصر سرخ",
    category: "انیمه",
    price: 26_000_000,
    editionSize: 300,
    editionLeft: 112,
    scale: "۱:۶",
    sku: "INJ-AN-104",
    rating: 4.7,
    reviewCount: 15,
    shortDescription: "پیشگویی شکننده و درخشان، با بال‌هایی از رزین شفاف.",
    description: animeDesc("غیب‌گوی بال‌شیشه‌ای"),
    specs: animeSpecs,
    isNew: true,
  },
  {
    id: "frostash-queen",
    slug: "frostash-queen",
    name: "ملکه‌ی خاکستر سرد",
    series: "عصر سرخ",
    category: "انیمه",
    price: 27_000_000,
    editionSize: 280,
    editionLeft: 77,
    scale: "۱:۶",
    sku: "INJ-AN-105",
    rating: 4.8,
    reviewCount: 33,
    shortDescription: "سردی و شکوه در یک ترکیب‌بندی واحد.",
    description: animeDesc("ملکه‌ی خاکستر سرد"),
    specs: animeSpecs,
  },
  {
    id: "nightfang-hunter",
    slug: "nightfang-hunter",
    name: "شکارچی شب‌تاب",
    series: "عصر سرخ",
    category: "انیمه",
    price: 24_000_000,
    editionSize: 320,
    editionLeft: 140,
    scale: "۱:۶",
    sku: "INJ-AN-106",
    rating: 4.6,
    reviewCount: 19,
    shortDescription: "چابک، بی‌صدا، همیشه یک قدم جلوتر.",
    description: animeDesc("شکارچی شب‌تاب"),
    specs: animeSpecs,
  },
  {
    id: "voidwalker-prime",
    slug: "voidwalker-prime",
    name: "پوچ‌گرد نخستین",
    series: "افسانه‌های آهنین",
    category: "بازی",
    price: 32_000_000,
    editionSize: 150,
    editionLeft: 12,
    scale: "۱:۴",
    sku: "INJ-GM-201",
    rating: 5,
    reviewCount: 98,
    shortDescription: "نمادی زره‌پوش از کمپین افسانه‌ای، در مقیاس بزرگ.",
    description: gamesDesc("پوچ‌گرد نخستین"),
    specs: gamesSpecs,
    featured: true,
  },
  {
    id: "forgehart-titan",
    slug: "forgehart-titan",
    name: "تایتان آهنگر",
    series: "افسانه‌های آهنین",
    category: "بازی",
    price: 35_000_000,
    editionSize: 120,
    editionLeft: 47,
    scale: "۱:۴",
    sku: "INJ-GM-202",
    rating: 4.9,
    reviewCount: 27,
    shortDescription: "غول آهنین کوره‌ها، تازه از تولید خارج شده.",
    description: gamesDesc("تایتان آهنگر"),
    specs: gamesSpecs,
    isNew: true,
  },
  {
    id: "ironclad-guardian",
    slug: "ironclad-guardian",
    name: "گاردین فولادین",
    series: "افسانه‌های آهنین",
    category: "بازی",
    price: 39_000_000,
    editionSize: 90,
    editionLeft: 9,
    scale: "۱:۴",
    sku: "INJ-GM-203",
    rating: 5,
    reviewCount: 41,
    shortDescription: "نگهبانی که هیچ دروازه‌ای بدون اجازه‌اش باز نمی‌شود.",
    description: gamesDesc("گاردین فولادین"),
    specs: gamesSpecs,
  },
  {
    id: "steel-vanguard",
    slug: "steel-vanguard",
    name: "پیشتاز آهنین",
    series: "افسانه‌های آهنین",
    category: "بازی",
    price: 33_000_000,
    editionSize: 140,
    editionLeft: 63,
    scale: "۱:۴",
    sku: "INJ-GM-204",
    rating: 4.7,
    reviewCount: 22,
    shortDescription: "نخستین کسی که وارد میدان می‌شود، آخرین کسی که ترک می‌کند.",
    description: gamesDesc("پیشتاز آهنین"),
    specs: gamesSpecs,
  },
  {
    id: "redkeep-sentry",
    slug: "redkeep-sentry",
    name: "نگهبان دژ سرخ",
    series: "افسانه‌های آهنین",
    category: "بازی",
    price: 30_000_000,
    editionSize: 160,
    editionLeft: 85,
    scale: "۱:۴",
    sku: "INJ-GM-205",
    rating: 4.6,
    reviewCount: 17,
    shortDescription: "محافظ ساکت دژی که هرگز سقوط نکرد.",
    description: gamesDesc("نگهبان دژ سرخ"),
    specs: gamesSpecs,
  },
  {
    id: "last-sentinel",
    slug: "last-sentinel",
    name: "آخرین نگهبان",
    series: "نگاتیو نقره‌ای",
    category: "سینما",
    price: 38_000_000,
    editionSize: 100,
    editionLeft: 14,
    scale: "۱:۵",
    sku: "INJ-CN-301",
    rating: 5,
    reviewCount: 73,
    shortDescription: "برداشتی فریم‌به‌فریم از صحنه‌ی پایانی فیلم.",
    description: cinemaDesc("آخرین نگهبان"),
    specs: cinemaSpecs,
    featured: true,
  },
  {
    id: "nightframe-operative",
    slug: "nightframe-operative",
    name: "مأمور شب‌قاب",
    series: "نگاتیو نقره‌ای",
    category: "سینما",
    price: 31_000_000,
    editionSize: 175,
    editionLeft: 96,
    scale: "۱:۵",
    sku: "INJ-CN-302",
    rating: 4.8,
    reviewCount: 24,
    shortDescription: "سایه‌ای در قاب شب، تازه به کلکسیون افزوده شد.",
    description: cinemaDesc("مأمور شب‌قاب"),
    specs: cinemaSpecs,
    isNew: true,
  },
  {
    id: "silver-trace",
    slug: "silver-trace",
    name: "ردپای نقره‌ای",
    series: "نگاتیو نقره‌ای",
    category: "سینما",
    price: 36_000_000,
    editionSize: 130,
    editionLeft: 28,
    scale: "۱:۵",
    sku: "INJ-CN-303",
    rating: 4.9,
    reviewCount: 38,
    shortDescription: "لحظه‌ای که تعقیب به اوج خود رسید.",
    description: cinemaDesc("ردپای نقره‌ای"),
    specs: cinemaSpecs,
  },
  {
    id: "silverscreen-shadow",
    slug: "silverscreen-shadow",
    name: "سایه‌ی پرده‌ی نقره‌ای",
    series: "نگاتیو نقره‌ای",
    category: "سینما",
    price: 34_000_000,
    editionSize: 150,
    editionLeft: 71,
    scale: "۱:۵",
    sku: "INJ-CN-304",
    rating: 4.7,
    reviewCount: 16,
    shortDescription: "میان نور و تاریکی، دقیقاً همان‌طور که در سالن دیدیم.",
    description: cinemaDesc("سایه‌ی پرده‌ی نقره‌ای"),
    specs: cinemaSpecs,
  },
  {
    id: "foggate-detective",
    slug: "foggate-detective",
    name: "کارآگاه مه‌آلود",
    series: "نگاتیو نقره‌ای",
    category: "سینما",
    price: 29_500_000,
    editionSize: 190,
    editionLeft: 104,
    scale: "۱:۵",
    sku: "INJ-CN-305",
    rating: 4.6,
    reviewCount: 12,
    shortDescription: "کلاه‌گیس، بارانی و رازی که هنوز حل نشده.",
    description: cinemaDesc("کارآگاه مه‌آلود"),
    specs: cinemaSpecs,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);
}

const reviewPool: Omit<ProductReview, "id">[] = [
  { name: "دانیال رضایی", rating: 5, date: "۱۴۰۴/۰۲/۱۱", comment: "کیفیت پرداخت رنگ فوق‌العاده است؛ بیشتر شبیه یک اثر گالری است تا یک مجسمه‌ی معمولی." },
  { name: "مینا توکلی", rating: 5, date: "۱۴۰۴/۰۱/۲۸", comment: "بسته‌بندی حس باز کردن یک ساعت لوکس را داشت. جزئیات تراش زیر نور مستقیم واقعاً چشمگیر است." },
  { name: "کریم صادقی", rating: 4, date: "۱۴۰۳/۱۲/۰۹", comment: "از چند آتلیه‌ی دیگر خرید کرده‌ام؛ اینجا۳دی تنها جایی است که گواهی اصالتش واقعاً ارزشش را دارد." },
  { name: "سارا احمدی", rating: 5, date: "۱۴۰۳/۱۱/۱۹", comment: "رنگ‌ها دقیقاً همان‌طور که در تصاویر بود از آب درآمد. ارسال هم سریع‌تر از چیزی بود که فکر می‌کردم." },
  { name: "امیر حسینی", rating: 4, date: "۱۴۰۳/۱۰/۰۳", comment: "پایه‌ی چوبی خیلی شیک است. فقط کاش چند رنگ جایگزین برای پایه هم وجود داشت." },
  { name: "نگار محمدی", rating: 5, date: "۱۴۰۳/۰۹/۱۵", comment: "هدیه‌ای بود برای همسرم و کاملاً شگفت‌زده شد. کیفیت ساخت واقعاً در سطح موزه‌ای است." },
];

export function getProductReviews(productId: string, count = 3): ProductReview[] {
  const seed = productId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const out: ProductReview[] = [];
  for (let i = 0; i < count; i++) {
    const item = reviewPool[(seed + i) % reviewPool.length];
    out.push({ id: `${productId}-rv-${i}`, ...item });
  }
  return out;
}

export const bestSellers = products.filter((p) => p.featured);
export const newArrivals = products.filter((p) => p.isNew);
export const allCollectionProducts = products;

export const featuredCollections = [
  {
    id: "col-01",
    title: "عصر سرخ",
    subtitle: "انیمه",
    blurb: "قهرمانانی با تیغ در دست، با پرداخت گرادیانت مات و دست‌ساز.",
  },
  {
    id: "col-02",
    title: "افسانه‌های آهنین",
    subtitle: "بازی",
    blurb: "نمادهای زره‌پوش از کمپین‌های افسانه‌ای، با پرداخت فلزی فرسوده.",
  },
  {
    id: "col-03",
    title: "نگاتیو نقره‌ای",
    subtitle: "سینما",
    blurb: "چهره‌هایی دقیق، برگرفته از به‌یادماندنی‌ترین صحنه‌های پرده‌ی سینما.",
  },
];

export const testimonials = [
  {
    id: "rv-01",
    name: "دانیال رضایی",
    role: "کلکسیونر از سال 1404",
    quote:
      "کیفیت پرداخت رنگ چیزی است که در هیچ آتلیه‌ی دیگری ندیده‌ام؛ بیشتر شبیه یک اثر گالری است تا یک مجسمه‌ی معمولی.",
    rating: 5,
  },
  {
    id: "rv-02",
    name: "مینا توکلی",
    role: "خریدار تأییدشده",
    quote:
      "حتی بسته‌بندی هم حس باز کردن یک ساعت لوکس را داشت. جزئیات تراش زیر نور مستقیم واقعاً سینمایی است.",
    rating: 5,
  },
  {
    id: "rv-03",
    name: "کریم صادقی",
    role: "خریدار تأییدشده",
    quote:
      "از سه آتلیه‌ی دیگر خرید کرده‌ام. اینجا۳دی تنها جایی است که واقعاً ارزشش را دارد.",
    rating: 5,
  },
  {
    id: "rv-04",
    name: "سارا احمدی",
    role: "کلکسیونر از سال 1403",
    quote:
      "بسته‌ی بازسازی رایگان خیالم را راحت کرد؛ یک اثر آسیب‌دیده در حمل را بدون هیچ هزینه‌ای مثل روز اول برگرداندند.",
    rating: 5,
  },
];

export const instagramPosts = [
  {
    id: "ig-01",
    image: "/instagram/1.jpg",
    caption: "تست نورپردازی استودیو — شوالیه‌ی سرخ",
  },
  {
    id: "ig-02",
    image: "/instagram/2.jpg",
    caption: "پرداخت دستی پایه‌ی پوچ‌گرد نخستین",
  },
  {
    id: "ig-03",
    image: "/instagram/3.jpg",
    caption: "پشت صحنه‌ی تراش — افسانه‌های آهنین",
  },
  {
    id: "ig-04",
    image: "/instagram/4.jpg",
    caption: "بسته‌بندی نسخه‌های مقیاس ۱:۴",
  },
  {
    id: "ig-05",
    image: "/instagram/5.jpg",
    caption: "ترکیب رنگدانه برای رزین مات",
  },
  {
    id: "ig-06",
    image: "/instagram/6.jpg",
    caption: "آنباکسینگ یک کلکسیونر در تهران",
  },
];

export const whyPillars = [
  {
    title: "رزین استودیویی",
    text: "هر مجسمه با رزین رزولوشن بالا چاپ، سپس با دست سنباده و آماده‌سازی می‌شود تا پیش از رنگ‌آمیزی سطحی بی‌نقص داشته باشد.",
  },
  {
    title: "پرداخت لایه‌به‌لایه‌ی دستی",
    text: "رنگ‌آمیزهای ما رنگ را در لایه‌های نیمه‌شفاف می‌سازند؛ همان تکنیکی که در مدل‌های نمایشی موزه‌ای به کار می‌رود.",
  },
  {
    title: "شماره‌گذاری فردی",
    text: "هر اثر با شماره‌ی نسخه‌ی حک‌شده و گواهی اصالت امضاشده برای شما ارسال می‌شود.",
  },
  {
    title: "بازسازی مادام‌العمر",
    text: "ترک‌خوردگی، رنگ‌پریدگی یا آسیب در حمل‌ونقل؟ ما هر اثر اینجا۳دی را تا زمانی که مالک آن هستید، رایگان بازسازی می‌کنیم.",
  },
];
