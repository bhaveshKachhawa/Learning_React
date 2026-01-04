export const cloudPath = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
export const imgPath = "http://marketplace.canva.com/EAFaFUz4aKo/3/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-tn1zF-_cG9c.jpg";
export const MENU_IMG_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
export const MOCK_MENU = [
  {
    title: "Recommended",
    id:"123",
    items: [
      { id: "101", name: "Paneer Butter Masala", price: 28500, description: "Soft paneer cubes simmered in a rich, buttery tomato gravy.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400", isVeg: true },
      { id: "102", name: "Chicken Tikka Masala", price: 34000, description: "Roasted marinated chicken chunks in a spiced creamy sauce.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400", isVeg: false },
      { id: "103", name: "Dal Makhani", price: 22000, description: "Black lentils slow-cooked overnight with butter and cream.", image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400", isVeg: true },
      { id: "104", name: "Tandoori Chicken (Half)", price: 31000, description: "Chicken marinated in yogurt and spices, grilled in a tandoor.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400", isVeg: false }
    ]
  },
  {
    title: "Rice & Biryani",
    id:"124",
    items: [
      { id: "201", name: "Veg Hyderabadi Biryani", price: 26000, description: "Fragrant basmati rice layered with vegetables and saffron.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400", isVeg: true },
      { id: "202", name: "Chicken Dum Biryani", price: 32000, description: "Authentic slow-cooked biryani with juicy chicken pieces.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400", isVeg: false },
      { id: "203", name: "Egg Biryani", price: 28000, description: "Long grain rice cooked with boiled eggs and aromatic spices.", image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=400", isVeg: false },
      { id: "204", name: "Jeera Rice", price: 15000, description: "Steamed basmati rice tempered with cumin seeds and ghee.", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400", isVeg: true }
    ]
  },
  {
    title: "Chinese Starters",
    id:"125",
    items: [
      { id: "301", name: "Veg Manchurian Dry", price: 19000, description: "Deep-fried veg balls tossed in spicy soy-based sauce.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400", isVeg: true },
      { id: "302", name: "Chilli Chicken", price: 26000, description: "Crispy fried chicken with bell peppers and green chillies.", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400", isVeg: false },
      { id: "303", name: "Honey Chilli Potato", price: 18000, description: "Crispy potato fingers tossed in honey and red chilli sauce.", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400", isVeg: true },
      { id: "304", name: "Spring Rolls (6 Pcs)", price: 16000, description: "Crunchy rolls stuffed with seasoned julienned vegetables.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400", isVeg: true }
    ]
  },
  {
    title: "Tandoori Breads",
    id:"126",
    items: [
      { id: "401", name: "Butter Naan", price: 6000, description: "Classic Indian bread cooked in a clay oven with butter.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400", isVeg: true },
      { id: "402", name: "Garlic Naan", price: 7500, description: "Tandoori naan topped with chopped garlic and coriander.", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400", isVeg: true },
      { id: "403", name: "Tandoori Roti", price: 3500, description: "Whole wheat flatbread baked in a traditional clay oven.", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400", isVeg: true },
      { id: "404", name: "Lacha Paratha", price: 5500, description: "Multi-layered flaky bread made with whole wheat flour.", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400", isVeg: true }
    ]
  },
  {
    title: "Burgers & Snacks",
    id:"127",
    items: [
      { id: "501", name: "Classic Veg Burger", price: 15000, description: "Crispy veg patty with lettuce, tomato, and secret mayo.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400", isVeg: true },
      { id: "502", name: "Peri Peri Fries", price: 11000, description: "Golden fries tossed in spicy peri peri seasoning.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400", isVeg: true },
      { id: "503", name: "Cheese Jalapeno Poppers", price: 17000, description: "Breaded jalapenos stuffed with melted cream cheese.", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400", isVeg: true },
      { id: "504", name: "Chicken Club Sandwich", price: 21000, description: "Triple-layered sandwich with chicken, egg, and lettuce.", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400", isVeg: false }
    ]
  },
  {
    title: "Beverages",
    id:"128",
    items: [
      { id: "601", name: "Mango Lassi", price: 9500, description: "Creamy yogurt-based drink with mango pulp.", image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400", isVeg: true },
      { id: "602", name: "Cold Coffee", price: 12000, description: "Blended coffee with a scoop of vanilla ice cream.", image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400", isVeg: true },
      { id: "603", name: "Fresh Lime Soda", price: 7000, description: "Refreshing lime drink served sweet or salted.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400", isVeg: true },
      { id: "604", name: "Masala Chai", price: 5000, description: "Strong Indian tea brewed with ginger and cardamom.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400", isVeg: true }
    ]
  }
];