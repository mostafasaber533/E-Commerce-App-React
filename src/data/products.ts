import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. These headphones feature active noise cancellation, Bluetooth 5.0 connectivity, and up to 30 hours of battery life.',
    price: 299.99,
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Audio',
    tags: ['wireless', 'headphones', 'bluetooth', 'audio'],
    stock: 45,
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Alex Thompson',
        rating: 5,
        comment: 'These headphones are incredible! The sound quality is amazing, and the noise cancellation works perfectly.',
        date: '2023-11-15',
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Jamie Wilson',
        rating: 4,
        comment: 'Great headphones, very comfortable for long listening sessions. Battery life is excellent.',
        date: '2023-10-28',
      },
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '20Hz-20kHz',
      'Bluetooth Version': '5.0',
      'Battery Life': 'Up to 30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g',
    },
    createdAt: '2023-08-10',
  },
  {
    id: '2',
    name: 'Ultra-Slim Laptop',
    description: 'A powerful, lightweight laptop for professionals on the go. Features a high-resolution display, all-day battery life, and the latest processors for optimal performance.',
    price: 1299.99,
    images: [
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5474295/pexels-photo-5474295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Computers',
    tags: ['laptop', 'computer', 'ultrabook', 'portable'],
    stock: 15,
    rating: 4.5,
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Chris Johnson',
        rating: 5,
        comment: 'This laptop is a game-changer for my workflow. Fast, lightweight, and the battery lasts all day.',
        date: '2023-11-02',
      },
    ],
    specifications: {
      'Processor': 'Intel Core i7',
      'RAM': '16GB DDR4',
      'Storage': '512GB SSD',
      'Display': '14-inch 4K',
      'Graphics': 'Intel Iris Xe',
      'Battery': 'Up to 12 hours',
      'Weight': '1.2kg',
    },
    createdAt: '2023-09-05',
  },
  {
    id: '3',
    name: 'Smart Home Security Camera',
    description: 'Keep your home safe with our advanced security camera. Features include 4K recording, night vision, motion detection, and cloud storage.',
    price: 149.99,
    images: [
      'https://images.pexels.com/photos/3894387/pexels-photo-3894387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6301168/pexels-photo-6301168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Smart Home',
    tags: ['security', 'camera', 'smart home', 'wifi'],
    stock: 30,
    rating: 4.2,
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Pat Reynolds',
        rating: 4,
        comment: 'Easy to set up and the app is intuitive. Image quality is good, even at night.',
        date: '2023-10-18',
      },
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Morgan Kelly',
        rating: 4.5,
        comment: 'Great camera with excellent features. The motion detection works really well.',
        date: '2023-09-30',
      },
    ],
    specifications: {
      'Resolution': '4K Ultra HD',
      'Field of View': '140°',
      'Night Vision': 'Up to 30ft',
      'Storage': 'Cloud + Local SD',
      'Connectivity': 'Wi-Fi 6',
      'Power': 'Wired + Battery Backup',
    },
    createdAt: '2023-07-22',
  },
  {
    id: '4',
    name: 'Fitness Smartwatch',
    description: 'Track your fitness goals with our advanced smartwatch. Monitors heart rate, sleep, steps, and includes GPS for outdoor activities.',
    price: 199.99,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Wearables',
    tags: ['smartwatch', 'fitness', 'health', 'wearable'],
    stock: 25,
    rating: 4.6,
    reviews: [
      {
        id: 'r6',
        userId: 'u6',
        userName: 'Taylor Smith',
        rating: 5,
        comment: 'This watch has revolutionized my fitness routine. Accurate tracking and the battery lasts for days.',
        date: '2023-11-10',
      },
    ],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery Life': 'Up to 7 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart Rate, GPS, Accelerometer',
      'Compatibility': 'iOS, Android',
      'Connectivity': 'Bluetooth 5.0, Wi-Fi',
    },
    createdAt: '2023-08-30',
  },
  {
    id: '5',
    name: 'Professional Digital Camera',
    description: 'Capture stunning images with our professional digital camera. Perfect for photographers of all levels with its intuitive controls and exceptional image quality.',
    price: 899.99,
    images: [
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Photography',
    tags: ['camera', 'photography', 'digital', 'professional'],
    stock: 10,
    rating: 4.9,
    reviews: [
      {
        id: 'r7',
        userId: 'u7',
        userName: 'Jordan Casey',
        rating: 5,
        comment: 'As a professional photographer, this camera exceeds all my expectations. The image quality is superb.',
        date: '2023-10-05',
      },
      {
        id: 'r8',
        userId: 'u8',
        userName: 'Riley Cooper',
        rating: 4.5,
        comment: 'Great camera for both beginners and experienced photographers. Easy to use with professional results.',
        date: '2023-09-12',
      },
    ],
    specifications: {
      'Sensor': '24.2MP Full-Frame CMOS',
      'ISO Range': '100-51,200',
      'Video': '4K 60fps',
      'Autofocus': '693-point phase-detection',
      'Storage': 'Dual SD Card Slots',
      'Battery': 'Up to 750 shots',
    },
    createdAt: '2023-06-15',
  },
  {
    id: '6',
    name: 'Smart LED TV',
    description: 'Immerse yourself in stunning 4K visuals with our Smart LED TV. Features include HDR support, built-in streaming apps, and voice control.',
    price: 799.99,
    images: [
      'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Home Entertainment',
    tags: ['tv', 'smart tv', '4k', 'entertainment'],
    stock: 20,
    rating: 4.7,
    reviews: [
      {
        id: 'r9',
        userId: 'u9',
        userName: 'Casey Morgan',
        rating: 5,
        comment: 'Picture quality is incredible, and the smart features work flawlessly. Very happy with this purchase.',
        date: '2023-11-08',
      },
    ],
    specifications: {
      'Display': '55" 4K UHD',
      'Resolution': '3840 x 2160',
      'HDR': 'Dolby Vision, HDR10',
      'Smart Features': 'Built-in apps, Voice Control',
      'Ports': '4x HDMI, 2x USB',
      'Audio': '20W Dolby Atmos',
    },
    createdAt: '2023-07-10',
  },
];

export const categories = [
  'All',
  'Audio',
  'Computers',
  'Smart Home',
  'Wearables',
  'Photography',
  'Home Entertainment',
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'All') {
    return products;
  }
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};