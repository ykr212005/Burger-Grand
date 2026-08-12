import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import wrapImg from "@/assets/wrap.jpg";
import shakeImg from "@/assets/shake.jpg";
import sundaeImg from "@/assets/sundae.jpg";
import friesImg from "@/assets/fries.jpg";

export type Item = {
  name: string; price: number; desc?: string; img: string;
  category: string; veg: boolean; spicy?: boolean; popular?: boolean; rating: number;
};

export const items: Item[] = [
  // Burger
  { name: "Yummy Burger", price: 40, img: burgerImg, category: "Burger", veg: true, rating: 4.5 },
  { name: "Aloo Tikki Burger", price: 45, img: burgerImg, category: "Burger", veg: true, rating: 4.6 },
  { name: "Veg Burger", price: 50, img: burgerImg, category: "Burger", veg: true, rating: 4.5 },
  { name: "Veg Cheese Burger", price: 60, img: burgerImg, category: "Burger", veg: true, rating: 4.7 },
  { name: "Spicy Cheese Burger", price: 60, img: burgerImg, category: "Burger", veg: true, spicy: true, rating: 4.6 },
  { name: "Green Veggi Burger", price: 60, img: burgerImg, category: "Burger", veg: true, rating: 4.5 },
  { name: "Achari Burger", price: 60, img: burgerImg, category: "Burger", veg: true, rating: 4.5 },
  { name: "Loaded Burger", price: 65, img: burgerImg, category: "Burger", veg: true, rating: 4.7, popular: true },
  { name: "Cheese Loaded Burger", price: 70, img: burgerImg, category: "Burger", veg: true, rating: 4.8, popular: true },
  { name: "Double Slice Cheese Burger", price: 75, img: burgerImg, category: "Burger", veg: true, rating: 4.7 },
  { name: "Grand Spl Burger", price: 90, img: burgerImg, category: "Burger", veg: true, rating: 4.9, popular: true },
  { name: "Spicy Paneer Burger", price: 80, img: burgerImg, category: "Burger", veg: true, spicy: true, rating: 4.6 },
  { name: "Pizza Burger", price: 90, img: burgerImg, category: "Burger", veg: true, rating: 4.7 },
  { name: "Veg Whopper Burger", price: 85, img: burgerImg, category: "Burger", veg: true, rating: 4.6 },
  { name: "Maharaja Burger", price: 90, img: burgerImg, category: "Burger", veg: true, rating: 4.8 },
  { name: "Loaded Paneer Burger", price: 120, img: burgerImg, category: "Burger", veg: true, rating: 4.8 },

  // Grilled Burger
  { name: "Grilled Veg Burger", price: 60, img: burgerImg, category: "Grilled Burger", veg: true, rating: 4.5 },
  { name: "Grilled Cheese Burger", price: 70, img: burgerImg, category: "Grilled Burger", veg: true, rating: 4.6 },
  { name: "Grilled Spicy Cheese Burger", price: 80, img: burgerImg, category: "Grilled Burger", veg: true, spicy: true, rating: 4.6 },
  { name: "Grilled Cheese Paneer Burger", price: 90, img: burgerImg, category: "Grilled Burger", veg: true, rating: 4.7 },

  // Chicken Burgers
  { name: "Egg Burger", price: 70, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.5 },
  { name: "Chicken Burger", price: 80, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.7 },
  { name: "Cheese Chicken Burger", price: 90, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.8, popular: true },
  { name: "Spicy Chicken Burger", price: 90, img: burgerImg, category: "Chicken Burgers", veg: false, spicy: true, rating: 4.7 },
  { name: "Chicken Pizza Burger", price: 120, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.7 },
  { name: "Grand Chicken Burger", price: 120, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.8 },
  { name: "Double Chicken Burger", price: 120, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.8 },
  { name: "Chicken Whopper", price: 140, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.8 },

  // Wrap Roll
  { name: "Aloo Wrap", price: 70, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.5 },
  { name: "Hara-Bhara Wrap", price: 80, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.6 },
  { name: "Paneer Wrap", price: 100, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.7 },
  { name: "Chaap Wrap", price: 100, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.6 },
  { name: "Egg Wrap", price: 80, img: wrapImg, category: "Wrap Roll", veg: false, rating: 4.6 },
  { name: "Chicken Wrap", price: 100, img: wrapImg, category: "Wrap Roll", veg: false, rating: 4.8, popular: true },
  { name: "Double Chicken Wrap", price: 160, img: wrapImg, category: "Wrap Roll", veg: false, rating: 4.8 },
  { name: "Double Paneer Wrap", price: 160, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.7 },

  // Grilled Sandwich
  { name: "Veg Coleslaw Sandwich", price: 60, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.5 },
  { name: "Veggie Sandwich", price: 80, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.6 },
  { name: "Veg Patty Sandwich", price: 80, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.6 },
  { name: "Hara-Bhara Sandwich", price: 90, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.6 },
  { name: "Onion Tomato Sandwich", price: 90, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.4 },
  { name: "Paneer Sandwich", price: 100, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.7 },
  { name: "Grand Spl Sandwich", price: 100, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.8, popular: true },
  { name: "Chicken Sandwich", price: 120, img: sandwichImg, category: "Grilled Sandwich", veg: false, rating: 4.7 },
  { name: "Bombay Sandwich", price: 140, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.7 },

  // Garlic Bread
  { name: "Spicy Garlic Bread", price: 70, img: sandwichImg, category: "Garlic Bread", veg: true, spicy: true, rating: 4.5 },
  { name: "Cheese Garlic Bread", price: 80, img: sandwichImg, category: "Garlic Bread", veg: true, rating: 4.7, popular: true },
  { name: "Veg Cheese Garlic Bread", price: 90, img: sandwichImg, category: "Garlic Bread", veg: true, rating: 4.7 },
  { name: "Paneer Garlic Bread", price: 100, img: sandwichImg, category: "Garlic Bread", veg: true, rating: 4.7 },
  { name: "Grand Spl Garlic Bread", price: 120, img: sandwichImg, category: "Garlic Bread", veg: true, rating: 4.8 },
  { name: "Chicken Garlic Bread", price: 130, img: sandwichImg, category: "Garlic Bread", veg: false, rating: 4.7 },

  // Pizza (Regular price)
  { name: "Plain Pizza", price: 140, img: pizzaImg, category: "Pizza", veg: true, rating: 4.5 },
  { name: "Onion and Capsicum Pizza", price: 150, img: pizzaImg, category: "Pizza", veg: true, rating: 4.6 },
  { name: "Cheese Tomato Pizza", price: 150, img: pizzaImg, category: "Pizza", veg: true, rating: 4.6 },
  { name: "Sweet Corn with Jalapeno Pizza", price: 150, img: pizzaImg, category: "Pizza", veg: true, spicy: true, rating: 4.6 },
  { name: "Mushroom and Capsicum Pizza", price: 180, img: pizzaImg, category: "Pizza", veg: true, rating: 4.7 },
  { name: "Loaded Paneer Pizza", price: 190, img: pizzaImg, category: "Pizza", veg: true, rating: 4.8, popular: true },
  { name: "Punjabi Paneer Pizza", price: 190, img: pizzaImg, category: "Pizza", veg: true, rating: 4.7 },
  { name: "Tandoori Paneer Pizza", price: 190, img: pizzaImg, category: "Pizza", veg: true, rating: 4.7 },
  { name: "Pasta Pizza", price: 200, img: pizzaImg, category: "Pizza", veg: true, rating: 4.6 },
  { name: "Grand Spl Pizza", price: 220, img: pizzaImg, category: "Pizza", veg: true, rating: 4.9, popular: true },
  { name: "Makhani Pizza", price: 220, img: pizzaImg, category: "Pizza", veg: true, rating: 4.7 },

  // Chicken Pizza
  { name: "BBQ Chicken Pizza", price: 220, img: pizzaImg, category: "Chicken Pizza", veg: false, rating: 4.8, popular: true },
  { name: "Chicken with Golden Corn Pizza", price: 220, img: pizzaImg, category: "Chicken Pizza", veg: false, rating: 4.7 },
  { name: "Tandoori Chicken Pizza", price: 230, img: pizzaImg, category: "Chicken Pizza", veg: false, rating: 4.8 },
  { name: "Non-Veg Supreme Pizza", price: 250, img: pizzaImg, category: "Chicken Pizza", veg: false, rating: 4.8 },

  // Mocktail
  { name: "Fresh Lime", price: 50, img: shakeImg, category: "Mocktail", veg: true, rating: 4.5 },
  { name: "Mint Mojito", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.7, popular: true },
  { name: "Blue-Crasho", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.6 },
  { name: "Water Melon", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.5 },
  { name: "Green Apple", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.5 },
  { name: "Orange", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.5 },
  { name: "Virgin Mojito", price: 80, img: shakeImg, category: "Mocktail", veg: true, rating: 4.7 },

  // Fries
  { name: "Plain Fries", price: 70, img: friesImg, category: "Fries", veg: true, rating: 4.5 },
  { name: "Masala Fries", price: 80, img: friesImg, category: "Fries", veg: true, rating: 4.6 },
  { name: "Cheese Loaded Fries", price: 100, img: friesImg, category: "Fries", veg: true, rating: 4.8, popular: true },
  { name: "Jelopeno Fries", price: 100, img: friesImg, category: "Fries", veg: true, spicy: true, rating: 4.6 },
  { name: "Pizza Pocket", price: 100, img: pizzaImg, category: "Fries", veg: true, rating: 4.6 },
  { name: "Chicken Finger", price: 140, img: friesImg, category: "Fries", veg: false, rating: 4.7 },

  // Dip
  { name: "Cheese Dip", price: 30, img: sandwichImg, category: "Dip", veg: true, rating: 4.5 },
  { name: "Tandoori Dip", price: 30, img: sandwichImg, category: "Dip", veg: true, rating: 4.5 },
  { name: "Chilli Garlic Dip", price: 30, img: sandwichImg, category: "Dip", veg: true, spicy: true, rating: 4.6 },
  { name: "Peri-Peri Dip", price: 30, img: sandwichImg, category: "Dip", veg: true, spicy: true, rating: 4.6 },

  // Ice-Cream Shakes (Large price)
  { name: "Vanilla Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.6 },
  { name: "Strawberry Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.7 },
  { name: "Butter Scotch Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.7 },
  { name: "Black Current Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.6 },
  { name: "Cold Coffee", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.8, popular: true },
  { name: "Rose Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.5 },
  { name: "Pineapple Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.5 },
  { name: "Mango Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.7 },
  { name: "Banana Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.5 },
  { name: "Lichi Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.6 },
  { name: "Chocolate Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.8 },

  // Premium Thick Shakes
  { name: "Chocolate Hazelnut Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8, popular: true },
  { name: "Mint Oreo Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Chocolate Peanut Butter Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8 },
  { name: "Choco Strawberry Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Tutti Frutti Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.6 },
  { name: "Choco Mocha Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Bubblegum Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.6 },
  { name: "Kit Kat Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8 },
  { name: "Choco Chip Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Choco Oreo Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8, popular: true },
  { name: "Belgian Brownie Shake", price: 140, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8 },
  { name: "Dark Oreo Shake", price: 140, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Hazelnut Coffee Shake", price: 140, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Red Velvet Shake", price: 140, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8 },

  // Sundae
  { name: "Brownie with Chocolate Sos", price: 70, img: sundaeImg, category: "Sundae", veg: true, rating: 4.7 },
  { name: "Brownie Sundae", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.8, popular: true },
  { name: "Hot Chocolate Fudge", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.9, popular: true },
  { name: "Strawberry Sundae", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.7 },
  { name: "Blueberry Sundae", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.7 },
  { name: "Mango Punch", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.6 },
  { name: "Pineapple Sundae", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.6 },
  { name: "Fruit Sundae", price: 100, img: sundaeImg, category: "Sundae", veg: true, rating: 4.7 },
  { name: "Carmel Mocha Sundae", price: 100, img: sundaeImg, category: "Sundae", veg: true, rating: 4.8 },
  { name: "Kit-Kat Sundae", price: 100, img: sundaeImg, category: "Sundae", veg: true, rating: 4.8 },
  { name: "Chocolate Devine", price: 100, img: sundaeImg, category: "Sundae", veg: true, rating: 4.8 },
  { name: "Grand Spl Sundae", price: 150, img: sundaeImg, category: "Sundae", veg: true, rating: 4.9, popular: true },

  // Combos
  { name: "Double Treat Combo", price: 199, img: burgerImg, category: "Combos", veg: true, rating: 4.8, popular: true, desc: "Includes topping pizza" },
  { name: "Burger Combo Value Meal", price: 149, img: burgerImg, category: "Combos", veg: true, rating: 4.7, popular: true, desc: "Veg cheese burger + fries + drink" },
  { name: "Jhatpat Combo", price: 99, img: burgerImg, category: "Combos", veg: true, rating: 4.6, desc: "Veg burger + mint mojito" },
];

export const categories = [
  "All", "Burger", "Grilled Burger", "Chicken Burgers", "Wrap Roll",
  "Grilled Sandwich", "Garlic Bread", "Pizza", "Chicken Pizza",
  "Mocktail", "Fries", "Dip", "Shakes", "Premium Shakes", "Sundae", "Combos",
];
export const priceOf = (name: string) => items.find((i) => i.name === name)?.price ?? 0;
