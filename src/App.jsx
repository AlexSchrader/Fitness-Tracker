import { useState, useEffect, useRef } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DEFAULT_WORKOUT_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const LUNCH_OPTIONS = ["Ham and cheese sandwich", "Roast beef and cheese sandwich", "Turkey and cheese sandwich", "Chicken wrap"];
const LUNCH_SIDES = ["YoCrunch yogurt", "Carrots", "Apple", "Grapes", "String cheese", "Nutri-Grain bar"];

const RESTAURANTS = [
  "Tropical Smoothie Cafe", "Jamba Juice", "Smoothie King", "Planet Smoothie",
  "McDonald's", "Chick-fil-A", "Subway", "Chipotle", "Panera Bread",
  "Starbucks", "Dunkin", "Bojangles", "Cook Out", "Zaxby's",
  "Raising Cane's", "Panda Express", "Wendy's", "Burger King", "Taco Bell",
  "Five Guys", "Shake Shack", "Jersey Mike's", "Jimmy John's", "Wingstop",
];

const DINNER_RECIPES = [
  { name: "Ground Beef Tacos", emoji: "🌮", calories: 680, protein: 40, days: "Monday & Tuesday",
    ingredients: ["1 lb ground beef", "Corn tortillas", "Shredded cheese", "White rice", "Baby carrots"],
    seasonings: ["Cumin", "Chili powder", "Garlic powder", "Salt", "Pepper"],
    steps: ["Cook white rice according to package instructions.", "Brown ground beef in a pan over medium-high heat, breaking it up as it cooks.", "Drain excess fat from the beef.", "Season with cumin, chili powder, garlic powder, salt and pepper. Stir well.", "Warm corn tortillas in a dry pan for 30 seconds each side.", "Serve beef in tortillas topped with shredded cheese. Rice and carrots on the side."] },
  { name: "Chicken Thighs & Mashed Potatoes", emoji: "🍗", calories: 680, protein: 44, days: "Wednesday & Thursday",
    ingredients: ["4 chicken thighs", "4 potatoes (peeled)", "Broccoli", "Butter", "Lactaid milk", "Apples"],
    seasonings: ["Garlic powder", "Onion powder", "Paprika", "Salt", "Pepper"],
    steps: ["Preheat oven to 400°F.", "Season chicken thighs on both sides with garlic powder, onion powder, paprika, salt and pepper.", "Place on a baking sheet and bake for 35 minutes until golden.", "While chicken bakes, peel and cube potatoes. Boil in salted water 15-20 min until soft.", "Drain potatoes and mash with butter and a splash of Lactaid milk until smooth.", "Roast broccoli on a separate tray with butter and garlic salt for last 15 min of chicken cook time.", "Serve chicken with mashed potatoes and broccoli. Apple slices on the side."] },
  { name: "Steak & Mashed Potatoes", emoji: "🥩", calories: 740, protein: 50, days: "Friday",
    ingredients: ["Ribeye or NY strip steak", "4 potatoes (peeled)", "Broccoli", "Butter", "Lactaid milk", "Grapes"],
    seasonings: ["Salt", "Pepper", "Garlic powder"],
    steps: ["Take steak out of fridge 20 min before cooking to bring to room temp.", "Season generously with salt, pepper and garlic powder on both sides.", "Heat a pan to high heat. Add butter.", "Sear steak 3-4 min each side for medium. Let rest 5 min before cutting.", "Make mashed potatoes — peel, boil, mash with butter and milk.", "Roast broccoli with butter and garlic salt for 20 min at 400°F.", "Serve steak with mashed potatoes and broccoli. Grapes on the side."] },
  { name: "Spaghetti & Meat Sauce", emoji: "🍝", calories: 670, protein: 42, days: "Saturday",
    ingredients: ["1 lb ground beef", "Spaghetti pasta", "Jarred marinara sauce", "Parmesan cheese", "Baby carrots"],
    seasonings: ["Garlic powder", "Italian seasoning", "Salt", "Pepper"],
    steps: ["Boil salted water and cook pasta according to package instructions.", "Brown ground beef in a separate pan, drain fat.", "Add marinara sauce to beef. Season with garlic powder, Italian seasoning, salt and pepper.", "Simmer sauce on low for 10 minutes stirring occasionally.", "Drain pasta and combine with meat sauce.", "Top with parmesan cheese. Serve with carrots on the side."] },
  { name: "Rotisserie Chicken & Rice", emoji: "🍚", calories: 650, protein: 46, days: "Sunday",
    ingredients: ["Pre-made rotisserie chicken", "White rice", "Broccoli", "Butter"],
    seasonings: ["Garlic salt", "Butter"],
    steps: ["Pick up rotisserie chicken from the grocery store.", "Cook white rice according to package instructions.", "Mix cooked rice with butter and garlic salt.", "Steam or microwave broccoli until tender. Season with butter and salt.", "Pull chicken apart and serve with rice and broccoli."] },
  { name: "Shrimp & Buttered Rice", emoji: "🍤", calories: 630, protein: 40, days: "Swap-in anytime",
    ingredients: ["Shrimp (peeled, deveined)", "White rice", "Baby carrots", "Butter"],
    seasonings: ["Garlic powder", "Paprika", "Salt", "Pepper"],
    steps: ["Cook white rice and mix with butter and garlic salt.", "Pat shrimp dry with paper towels.", "Season shrimp with garlic powder, paprika, salt and pepper.", "Heat butter in a pan over medium-high heat.", "Cook shrimp 2 min each side until pink and slightly curled.", "Serve over buttered rice with carrots on the side."] },
];

const FOOD_DB = {
  // ── PACKAGED SNACKS ──
  "Nature Valley wafer bar": { cal: 190, protein: 3, packaged: true },
  "Nature Valley granola bar": { cal: 190, protein: 4, packaged: true },
  "Nutri-Grain bar": { cal: 130, protein: 2, packaged: true },
  "Kind bar": { cal: 200, protein: 7, packaged: true },
  "Clif bar": { cal: 250, protein: 9, packaged: true },
  "Rice Krispies treat": { cal: 90, protein: 1, packaged: true },
  "Cheez-Its": { cal: 150, protein: 3, packaged: true },
  "Goldfish crackers": { cal: 140, protein: 3, packaged: true },
  "Pretzels": { cal: 110, protein: 3, packaged: true },
  "Chips": { cal: 150, protein: 2, packaged: true },
  "Doritos": { cal: 150, protein: 2, packaged: true },
  "Popcorn": { cal: 120, protein: 2, packaged: true },
  "Crackers": { cal: 130, protein: 2, packaged: true },
  "Fruit snacks": { cal: 80, protein: 0, packaged: true },
  "Oreos": { cal: 160, protein: 1, packaged: true },
  "Cookies": { cal: 180, protein: 2, packaged: true },
  "Granola bar": { cal: 190, protein: 4, packaged: true },
  "Protein bar": { cal: 200, protein: 20, packaged: true },
  "String cheese": { cal: 80, protein: 7, packaged: true },
  "YoCrunch yogurt": { cal: 150, protein: 4, packaged: true },
  "Premier Protein shake": { cal: 160, protein: 30, packaged: true },
  "Fairlife Core Power": { cal: 420, protein: 42, packaged: true },
  "Gatorade": { cal: 140, protein: 0, packaged: true },
  "Powerade": { cal: 130, protein: 0, packaged: true },
  "Soda can": { cal: 150, protein: 0, packaged: true },
  "Sprite can": { cal: 140, protein: 0, packaged: true },
  "Tuna can": { cal: 130, protein: 28, packaged: true },

  // ── NUTS & SEEDS (per serving/handful) ──
  "Peanuts": { cal: 160, protein: 7, serving: true },
  "Almonds": { cal: 170, protein: 6, serving: true },
  "Cashews": { cal: 160, protein: 5, serving: true },
  "Mixed nuts": { cal: 170, protein: 5, serving: true },
  "Trail mix": { cal: 180, protein: 5, serving: true },
  "Sunflower seeds": { cal: 160, protein: 6, serving: true },
  "Peanut butter": { cal: 190, protein: 8, serving: true },
  "Almond butter": { cal: 200, protein: 7, serving: true },

  // ── BREAKFAST ──
  "Oatmeal": { cal: 300, protein: 10, serving: true },
  "Cream of Wheat": { cal: 130, protein: 4, serving: true },
  "Grits": { cal: 150, protein: 3, serving: true },
  "Frosted Flakes": { cal: 150, protein: 2, serving: true },
  "Cheerios": { cal: 140, protein: 5, serving: true },
  "Honey Nut Cheerios": { cal: 150, protein: 4, serving: true },
  "Lucky Charms": { cal: 150, protein: 3, serving: true },
  "Cocoa Puffs": { cal: 150, protein: 2, serving: true },
  "Frosted Mini Wheats": { cal: 180, protein: 5, serving: true },
  "Cinnamon Toast Crunch": { cal: 170, protein: 2, serving: true },
  "Cereal": { cal: 160, protein: 3, serving: true },
  "Pancakes": { cal: 450, protein: 8, serving: true },
  "Waffles": { cal: 420, protein: 7, serving: true },
  "French toast": { cal: 380, protein: 10, serving: true },
  "Toast": { cal: 130, protein: 4, serving: true },
  "Muffin": { cal: 180, protein: 3, special: "muffin" },
  "Croissant": { cal: 280, protein: 5, serving: true },
  "Donut": { cal: 300, protein: 4, serving: true },
  "Breakfast sandwich": { cal: 450, protein: 20, serving: true },
  "Sausage biscuit": { cal: 430, protein: 14, serving: true },
  "Hash browns": { cal: 230, protein: 2, serving: true },

  // ── BAGELS ──
  "Bagel": { cal: 270, protein: 10, special: "bagel" },
  "Bagel plain": { cal: 270, protein: 10, special: "bagel" },
  "Bagel everything": { cal: 280, protein: 10, special: "bagel" },
  "Bagel sesame": { cal: 270, protein: 10, special: "bagel" },
  "Bagel cinnamon raisin": { cal: 280, protein: 9, special: "bagel" },

  // ── EGGS ──
  "Eggs": { cal: 70, protein: 6, special: "eggs" },
  "Scrambled eggs": { cal: 90, protein: 6, special: "eggs" },
  "Fried eggs": { cal: 90, protein: 6, special: "eggs" },
  "Hard boiled eggs": { cal: 70, protein: 6, special: "eggs" },
  "Egg whites": { cal: 50, protein: 11, special: "eggs" },
  "Omelette": { cal: 200, protein: 14, special: "eggs" },

  // ── PROTEINS ──
  "Chicken breast": { cal: 165, protein: 31, serving: true },
  "Chicken thighs": { cal: 210, protein: 26, serving: true },
  "Grilled chicken": { cal: 200, protein: 30, serving: true },
  "Fried chicken": { cal: 320, protein: 28, serving: true },
  "Ground beef": { cal: 250, protein: 26, serving: true },
  "Steak": { cal: 650, protein: 62, serving: true },
  "Salmon": { cal: 280, protein: 39, serving: true },
  "Shrimp": { cal: 100, protein: 20, serving: true },
  "Tuna": { cal: 130, protein: 28, serving: true },
  "Turkey": { cal: 190, protein: 29, serving: true },
  "Bacon": { cal: 130, protein: 10, serving: true },
  "Sausage": { cal: 220, protein: 12, serving: true },
  "Hot dog": { cal: 180, protein: 7, serving: true },
  "Ham": { cal: 140, protein: 18, serving: true },
  "Deli turkey": { cal: 60, protein: 11, serving: true },
  "Deli ham": { cal: 70, protein: 10, serving: true },
  "Deli roast beef": { cal: 80, protein: 12, serving: true },

  // ── CARBS & SIDES ──
  "White rice": { cal: 200, protein: 4, serving: true },
  "Brown rice": { cal: 220, protein: 5, serving: true },
  "Pasta": { cal: 220, protein: 8, serving: true },
  "Spaghetti": { cal: 220, protein: 8, serving: true },
  "Mac and cheese": { cal: 400, protein: 11, serving: true },
  "Ramen": { cal: 380, protein: 10, serving: true },
  "Mashed potatoes": { cal: 230, protein: 4, serving: true },
  "Baked potato": { cal: 160, protein: 4, serving: true },
  "French fries": { cal: 380, protein: 4, serving: true },
  "Sweet potato": { cal: 130, protein: 2, serving: true },
  "Bread": { cal: 80, protein: 3, serving: true },
  "Corn": { cal: 130, protein: 5, serving: true },
  "Stuffing": { cal: 350, protein: 6, serving: true },
  "Fried rice": { cal: 450, protein: 12, serving: true },

  // ── DAIRY ──
  "Milk": { cal: 120, protein: 8, serving: true },
  "Lactaid milk": { cal: 110, protein: 8, serving: true },
  "Chocolate milk": { cal: 190, protein: 8, serving: true },
  "Cheese": { cal: 110, protein: 7, serving: true },
  "Shredded cheese": { cal: 110, protein: 7, serving: true },
  "Cottage cheese": { cal: 180, protein: 25, serving: true },
  "Greek yogurt": { cal: 130, protein: 17, serving: true },
  "Regular yogurt": { cal: 150, protein: 8, serving: true },
  "Butter": { cal: 100, protein: 0, serving: true },
  "Cream cheese": { cal: 50, protein: 1, serving: true },
  "Reduced fat cream cheese": { cal: 35, protein: 2, serving: true },
  "Sour cream": { cal: 60, protein: 1, serving: true },

  // ── PROTEIN DRINKS & SUPPLEMENTS ──
  "Fairlife Core Power": { cal: 230, protein: 42, special: "fairlife" },
  "Premier Protein shake": { cal: 160, protein: 30, packaged: true },
  "Premier Protein powder": { cal: 130, protein: 30, special: "protein_powder" },
  "Whey protein powder": { cal: 120, protein: 25, special: "protein_powder" },
  "Protein shake": { cal: 300, protein: 25, serving: true },
  "Whey protein shake": { cal: 300, protein: 25, serving: true },
  "Orange juice": { cal: 110, protein: 2, serving: true },
  "Apple juice": { cal: 120, protein: 0, serving: true },
  "Water": { cal: 0, protein: 0, serving: true },
  "Coffee": { cal: 50, protein: 1, special: "coffee" },
  "Smoothie": { cal: 380, protein: 5, special: "smoothie" },

  // ── FRUITS ──
  "Apple": { cal: 80, protein: 0, serving: true },
  "Banana": { cal: 90, protein: 1, serving: true },
  "Grapes": { cal: 60, protein: 1, serving: true },
  "Orange": { cal: 70, protein: 1, serving: true },
  "Strawberries": { cal: 50, protein: 1, serving: true },
  "Blueberries": { cal: 85, protein: 1, serving: true },
  "Watermelon": { cal: 85, protein: 2, serving: true },
  "Mango": { cal: 100, protein: 1, serving: true },
  "Pineapple": { cal: 80, protein: 1, serving: true },
  "Peach": { cal: 60, protein: 1, serving: true },
  "Pear": { cal: 100, protein: 1, serving: true },

  // ── VEGETABLES ──
  "Broccoli": { cal: 55, protein: 4, serving: true },
  "Carrots": { cal: 35, protein: 1, serving: true },
  "Baby carrots": { cal: 35, protein: 1, serving: true },
  "Green beans": { cal: 35, protein: 2, serving: true },
  "Asparagus": { cal: 40, protein: 4, serving: true },
  "Spinach": { cal: 20, protein: 3, serving: true },
  "Salad": { cal: 100, protein: 2, serving: true },
  "Peas": { cal: 120, protein: 8, serving: true },
  "Cucumber": { cal: 15, protein: 1, serving: true },
  "Tomato": { cal: 25, protein: 1, serving: true },

  // ── SANDWICHES & WRAPS ──
  "Ham and cheese sandwich": { cal: 380, protein: 22, serving: true },
  "Roast beef and cheese sandwich": { cal: 420, protein: 26, serving: true },
  "Turkey and cheese sandwich": { cal: 360, protein: 24, serving: true },
  "Chicken wrap": { cal: 400, protein: 28, serving: true },
  "Tuna sandwich": { cal: 350, protein: 22, serving: true },
  "PBJ": { cal: 380, protein: 12, serving: true },
  "Peanut butter and jelly": { cal: 380, protein: 12, serving: true },
  "Grilled cheese": { cal: 350, protein: 12, serving: true },
  "BLT": { cal: 400, protein: 16, serving: true },

  // ── FULL MEALS ──
  "Ground Beef Tacos": { cal: 680, protein: 40, serving: true },
  "Chicken Thighs & Mashed Potatoes": { cal: 680, protein: 44, serving: true },
  "Steak & Mashed Potatoes": { cal: 740, protein: 50, serving: true },
  "Spaghetti & Meat Sauce": { cal: 670, protein: 42, serving: true },
  "Rotisserie Chicken & Rice": { cal: 650, protein: 46, serving: true },
  "Shrimp & Buttered Rice": { cal: 630, protein: 40, serving: true },
  "Chicken and rice": { cal: 550, protein: 42, serving: true },
  "Burrito bowl": { cal: 650, protein: 40, serving: true },
  "Pizza slice": { cal: 280, protein: 12, serving: true },
  "Burger": { cal: 650, protein: 35, serving: true },
  "Cheeseburger": { cal: 700, protein: 38, serving: true },
  "Chicken sandwich": { cal: 500, protein: 32, serving: true },
  "Stir fry": { cal: 500, protein: 30, serving: true },
  "Soup": { cal: 250, protein: 10, serving: true },
  "Chili": { cal: 350, protein: 22, serving: true },

  // ── GYM RESTAURANTS (*calories may vary) ──
  "Subway 6 inch": { cal: 400, protein: 25, restaurant: true },
  "Subway footlong": { cal: 800, protein: 50, restaurant: true },
  "Firehouse small sub": { cal: 450, protein: 28, restaurant: true },
  "Firehouse large sub": { cal: 900, protein: 56, restaurant: true },
  "Jimmy Johns small": { cal: 380, protein: 22, restaurant: true },
  "Jimmy Johns large": { cal: 760, protein: 44, restaurant: true },
  "Chipotle bowl": { cal: 700, protein: 42, restaurant: true },
  "Chipotle burrito": { cal: 800, protein: 45, restaurant: true },
};

const GYM_RESTAURANTS = ["Subway", "Firehouse Subs", "Jimmy John's", "Chipotle", "Tropical Smoothie Cafe", "Jamba Juice", "Smoothie King", "Planet Smoothie"];
const FOOD_SEARCH_LIST = Object.keys(FOOD_DB);

// Foods that need extra questions
const FOOD_QUESTIONS = {
  "eggs": { type: "quantity", options: ["1 egg (~70 cal, 6g)", "2 eggs (~140 cal, 12g)", "3 eggs (~210 cal, 18g)", "4 eggs (~280 cal, 24g)"] },
  "egg": { type: "quantity", options: ["1 egg (~70 cal, 6g)", "2 eggs (~140 cal, 12g)", "3 eggs (~210 cal, 18g)", "4 eggs (~280 cal, 24g)"] },
  "pancake": { type: "quantity", options: ["1 (~150 cal)", "2 (~300 cal)", "3 (~450 cal)"] },
  "waffle": { type: "quantity", options: ["1 (~210 cal)", "2 (~420 cal)", "3 (~630 cal)"] },
  "pizza": { type: "quantity", options: ["1 slice (~280 cal)", "2 slices (~560 cal)", "3 slices (~840 cal)"] },
  "muffin": { type: "size", options: ["Mini (~90 cal)", "Regular (~180 cal)", "Large (~320 cal)"] },
  "bagel": { type: "bagel", options: ["Plain", "Everything", "Sesame", "Cinnamon Raisin"] },
  "smoothie": { type: "source", options: ["Homemade", "Went out"] },
  "shake": { type: "size", options: ["Small (~220 cal)", "Medium (~380 cal)", "Large (~480 cal)"] },
  "coffee": { type: "size", options: ["Small (~50 cal)", "Medium (~150 cal)", "Large (~250 cal)"] },
  "juice": { type: "size", options: ["Small (~120 cal)", "Medium (~200 cal)", "Large (~320 cal)"] },
  "burger": { type: "size", options: ["Single (~480 cal)", "Double (~650 cal)", "Triple (~820 cal)"] },
  "peanuts": { type: "serving", options: ["Small handful (~80 cal)", "Regular handful (~160 cal)", "Large handful (~240 cal)"] },
  "almonds": { type: "serving", options: ["Small handful (~85 cal)", "Regular handful (~170 cal)", "Large handful (~255 cal)"] },
  "nuts": { type: "serving", options: ["Small handful (~85 cal)", "Regular handful (~170 cal)", "Large handful (~255 cal)"] },
  "peanut butter": { type: "serving", options: ["1 tbsp (~95 cal)", "2 tbsp (~190 cal)", "3 tbsp (~285 cal)"] },
  "chips": { type: "serving", options: ["Small bag (~150 cal)", "Regular bag (~300 cal)", "Large bag (~450 cal)"] },
  "subway": { type: "restaurant_size", options: ["6 inch (~400 cal, 25g protein)", "Footlong (~800 cal, 50g protein)"] },
  "firehouse": { type: "restaurant_size", options: ["Small (~450 cal, 28g protein)", "Large (~900 cal, 56g protein)"] },
  "jimmy": { type: "restaurant_size", options: ["Small (~380 cal, 22g protein)", "Large (~760 cal, 44g protein)"] },
  "chipotle": { type: "restaurant_size", options: ["Bowl (~700 cal, 42g protein)", "Burrito (~800 cal, 45g protein)"] },
  "tropical smoothie": { type: "restaurant_size", options: ["Small (~320 cal)", "Medium (~480 cal)", "Large (~620 cal)"] },
  "jamba": { type: "restaurant_size", options: ["Small (~280 cal)", "Medium (~420 cal)", "Large (~560 cal)"] },
  "fairlife": { type: "fairlife", options: ["Elite 42g protein (230 cal)", "Light 20g protein (150 cal)", "Elite 26g protein (170 cal)"] },
  "premier protein powder": { type: "protein_powder", options: ["1 scoop (~130 cal, 30g protein)", "2 scoops (~260 cal, 60g protein)"] },
  "whey protein powder": { type: "protein_powder", options: ["1 scoop (~120 cal, 25g protein)", "2 scoops (~240 cal, 50g protein)"] },
  "protein powder": { type: "protein_powder", options: ["1 scoop (~125 cal, 25g protein)", "2 scoops (~250 cal, 50g protein)"] },
};

const CALORIE_GOAL_DEFAULT = 3000;
const PROTEIN_GOAL_DEFAULT = 150;

const initialWeek = (workoutDays) => {
  const week = {};
  DAYS.forEach(day => {
    week[day] = {
      isWorkoutDay: workoutDays.includes(day),
      // Each meal section stores an array of food items: [{name, cal}]
      morning: [], lunch: [], lunchSides: [], dinner: [], snack: [],
      preWorkout: [], postWorkout: [],
      // For dinner special handling
      isLeftover: false,
      exercises: []
    };
  });
  return week;
};

const formatDuration = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const formatDate = (ts) => new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" });

const getSectionCalories = (items) => (items || []).reduce((sum, item) => sum + (item.cal || 0), 0);

const searchFoods = (query) => {
  if (!query || query.length < 1) return [];
  const lower = query.toLowerCase();
  return Object.entries(FOOD_DB)
    .filter(([name]) => name.toLowerCase().includes(lower))
    .slice(0, 6)
    .map(([name, data]) => ({ name, cal: data.cal, protein: data.protein, packaged: data.packaged, serving: data.serving, special: data.special, restaurant: data.restaurant }));
};

const getQuestionForFood = (name) => {
  const lower = name.toLowerCase();
  for (const [keyword, q] of Object.entries(FOOD_QUESTIONS)) {
    if (lower.includes(keyword)) return q;
  }
  return null;
};

// Standalone MealSection component - outside main to prevent re-render focus loss
const MealSection = ({ label, sectionKey, items, onAdd, onRemove, savedFoods, onSaveFood, onRemoveSaved, isEditing, onToggleEdit }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [pendingFood, setPendingFood] = useState(null); // food waiting for question answer
  const [restaurantQuery, setRestaurantQuery] = useState("");
  const [restaurantSuggestions, setRestaurantSuggestions] = useState([]);
  const inputRef = useRef(null);

  const totalCal = getSectionCalories(items);

  const handleInput = (val) => {
    setQuery(val);
    if (val.length > 0) {
      setSuggestions(searchFoods(val));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectFood = (name, cal) => {
    const dbEntry = FOOD_DB[name];
    const lower = name.toLowerCase();

    // Packaged items - ask how many packages
    if (dbEntry?.packaged) {
      setPendingFood({ name, baseCal: dbEntry.cal, baseProtein: dbEntry.protein, question: { type: "packages", options: ["1", "2", "3", "4"] } });
      setQuery(""); setSuggestions([]);
      return;
    }

    // Fairlife - ask which version
    if (dbEntry?.special === "fairlife") {
      setPendingFood({ name, question: { type: "fairlife", options: ["Elite 42g protein (230 cal)", "Light 20g protein (150 cal)", "Elite 26g protein (170 cal)"] } });
      setQuery(""); setSuggestions([]);
      return;
    }

    // Protein powder - ask servings
    if (dbEntry?.special === "protein_powder") {
      const opts = lower.includes("premier") 
        ? ["1 scoop (~130 cal, 30g protein)", "2 scoops (~260 cal, 60g protein)"]
        : ["1 scoop (~120 cal, 25g protein)", "2 scoops (~240 cal, 50g protein)"];
      setPendingFood({ name, question: { type: "protein_powder", options: opts } });
      setQuery(""); setSuggestions([]);
      return;
    }

    const q = getQuestionForFood(name);
    if (q) {
      setPendingFood({ name, question: q });
      setQuery(""); setSuggestions([]);
    } else {
      onAdd({ name, cal: dbEntry?.cal || cal, protein: dbEntry?.protein || 0 });
      onSaveFood(name);
      setQuery(""); setSuggestions([]);
    }
    inputRef.current?.focus();
  };

  const handleAddCustom = () => {
    if (!query.trim()) return;
    const q = getQuestionForFood(query);
    if (q) {
      setPendingFood({ name: query, question: q });
    } else {
      const match = Object.entries(FOOD_DB).find(([k]) => k.toLowerCase().includes(query.toLowerCase()));
      const data = match ? match[1] : null;
      const cal = data?.cal || 0;
      onAdd({ name: query, cal, protein: data?.protein || 0, unknown: !cal });
      onSaveFood(query);
    }
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleAnswer = (opt) => {
    if (!pendingFood) return;

    // Bagel flow - step 1: type, step 2: cream cheese
    if (pendingFood.question.type === "bagel" && !pendingFood.bagelType) {
      setPendingFood({ ...pendingFood, bagelType: opt, step: "creamcheese" });
      return;
    }
    if (pendingFood.step === "creamcheese") {
      let extraCal = 0;
      if (opt === "Regular cream cheese") extraCal = 100;
      if (opt === "Reduced fat cream cheese") extraCal = 70;
      const baseCal = FOOD_DB[`Bagel ${pendingFood.bagelType.toLowerCase()}`]?.cal || 270;
      onAdd({ name: `${pendingFood.bagelType} bagel${opt !== "No cream cheese" ? ` with ${opt.toLowerCase()}` : ""}`, cal: baseCal + extraCal, protein: 10 });
      onSaveFood(`${pendingFood.bagelType} bagel`);
      setPendingFood(null);
      inputRef.current?.focus();
      return;
    }

    // Smoothie flow
    if (pendingFood.question.type === "source" && opt === "Went out") {
      setPendingFood({ ...pendingFood, step: "restaurant" });
      return;
    }
    if (pendingFood.step === "restaurant") {
      setPendingFood({ ...pendingFood, restaurant: opt, step: "size" });
      return;
    }

    // Packaged items - ask how many packages
    if (pendingFood.question.type === "packages") {
      const count = parseInt(opt) || 1;
      onAdd({ name: `${pendingFood.name} x${count}`, cal: pendingFood.baseCal * count, protein: (pendingFood.baseProtein || 0) * count });
      onSaveFood(pendingFood.name);
      setPendingFood(null);
      inputRef.current?.focus();
      return;
    }

    // Default - extract calories from option string
    const calMatch = opt.match(/\d+/);
    const cal = calMatch ? parseInt(calMatch[0]) : 0;
    const proteinMatch = opt.match(/(\d+)g protein/);
    const protein = proteinMatch ? parseInt(proteinMatch[1]) : 0;
    const name = pendingFood.restaurant ? `${pendingFood.name} from ${pendingFood.restaurant}` : pendingFood.name;
    onAdd({ name, cal, protein });
    onSaveFood(name);
    setPendingFood(null);
    inputRef.current?.focus();
  };

  const handleRestaurantInput = (val) => {
    setRestaurantQuery(val);
    if (val.length > 1) {
      setRestaurantSuggestions(RESTAURANTS.filter(r => r.toLowerCase().includes(val.toLowerCase())).slice(0, 5));
    } else {
      setRestaurantSuggestions([]);
    }
  };

  return (
    <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ fontSize: "10px", color: "#e94560", letterSpacing: "0.08em" }}>{label}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {totalCal > 0 && <div style={{ fontSize: "11px", color: "#ffffff50" }}>~{totalCal} cal</div>}
          {(items.length > 0 || savedFoods.length > 0) && (
            <button onClick={onToggleEdit} style={{ fontSize: "10px", color: "#ffffff30", background: "transparent", border: "none", cursor: "pointer", padding: "0" }}>
              {isEditing ? "Done" : "Edit"}
            </button>
          )}
        </div>
      </div>

      {/* Added food items */}
      {items.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "12px", background: "#e9456015", border: "1px solid #e9456040" }}>
              <span style={{ fontSize: "12px", color: "#fff" }}>{item.name}</span>
              {item.cal > 0 && <span style={{ fontSize: "10px", color: "#ffffff50" }}>~{item.cal}</span>}
              {item.unknown && <span style={{ fontSize: "10px", color: "#f5a623" }}>⚠️</span>}
              <button onClick={() => onRemove(i)} style={{ background: "transparent", border: "none", color: "#ffffff50", cursor: "pointer", fontSize: "14px", padding: "0 0 0 2px", lineHeight: 1 }}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* Saved food bubbles */}
      {savedFoods.length > 0 && (
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
          {savedFoods.map(food => (
            <button key={food} onClick={() => isEditing ? onRemoveSaved(food) : handleSelectFood(food, FOOD_DB[food]?.cal || 0)}
              style={{ padding: "4px 10px", borderRadius: "12px", border: "1px solid #ffffff15", background: isEditing ? "#e9456008" : "transparent", color: isEditing ? "#e9456060" : "#ffffff50", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>
              {isEditing && "× "}{food}
            </button>
          ))}
        </div>
      )}

      {/* Search input */}
      {!pendingFood && (
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            ref={inputRef}
            placeholder={`Add ${label.toLowerCase()} item...`}
            value={query}
            onChange={e => handleInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAddCustom()}
            style={{ flex: 1, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 12px", color: "#fff", fontSize: "16px", fontFamily: "inherit" }}
          />
          {query.length > 0 && (
            <button onClick={handleAddCustom} style={{ padding: "8px 14px", borderRadius: "8px", border: "none", background: "#e94560", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600" }}>Add</button>
          )}
        </div>
      )}

      {/* Search suggestions */}
      {suggestions.length > 0 && !pendingFood && (
        <div style={{ marginTop: "6px", background: "#1a1a1a", borderRadius: "8px", border: "1px solid #ffffff10", overflow: "hidden" }}>
          {suggestions.map(s => (
            <button key={s.name} onClick={() => handleSelectFood(s.name, s.cal)}
              style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 12px", background: "transparent", border: "none", borderBottom: "1px solid #ffffff08", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
              <span>{s.name}</span>
              <span style={{ color: "#ffffff40", fontSize: "11px" }}>~{s.cal} cal</span>
            </button>
          ))}
        </div>
      )}

      {/* Smart questions */}
      {pendingFood && (
        <div style={{ background: "#1a1a1a", borderRadius: "8px", border: "1px solid #4ecdc430", padding: "12px" }}>
          <div style={{ fontSize: "12px", color: "#fff", marginBottom: "8px" }}>{pendingFood.name}</div>

          {/* Fairlife version selector */}
          {pendingFood.question.type === "fairlife" && (
            <>
              <div style={{ fontSize: "11px", color: "#4ecdc4", marginBottom: "8px" }}>Which Fairlife?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {pendingFood.question.options.map(opt => {
                  const calMatch = opt.match(/(\d+) cal/);
                  const proteinMatch = opt.match(/(\d+)g protein/);
                  const cal = calMatch ? parseInt(calMatch[1]) : 0;
                  const protein = proteinMatch ? parseInt(proteinMatch[1]) : 0;
                  return (
                    <button key={opt} onClick={() => { onAdd({ name: `Fairlife Core Power (${protein}g protein)`, cal, protein }); onSaveFood("Fairlife Core Power"); setPendingFood(null); inputRef.current?.focus(); }}
                      style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>{opt}</button>
                  );
                })}
              </div>
            </>
          )}

          {/* Protein powder servings */}
          {pendingFood.question.type === "protein_powder" && (
            <>
              <div style={{ fontSize: "11px", color: "#4ecdc4", marginBottom: "8px" }}>How many scoops?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {pendingFood.question.options.map(opt => {
                  const calMatch = opt.match(/(\d+) cal/);
                  const proteinMatch = opt.match(/(\d+)g protein/);
                  const cal = calMatch ? parseInt(calMatch[1]) : 0;
                  const protein = proteinMatch ? parseInt(proteinMatch[1]) : 0;
                  return (
                    <button key={opt} onClick={() => { onAdd({ name: pendingFood.name, cal, protein }); onSaveFood(pendingFood.name); setPendingFood(null); inputRef.current?.focus(); }}
                      style={{ padding: "10px 12px", borderRadius: "10px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>{opt}</button>
                  );
                })}
              </div>
            </>
          )}

          {/* Packages */}
          {pendingFood.question.type === "packages" && (
            <>
              <div style={{ fontSize: "11px", color: "#4ecdc4", marginBottom: "4px" }}>How many packages?</div>
              <div style={{ fontSize: "10px", color: "#ffffff30", marginBottom: "8px" }}>~{pendingFood.baseCal} cal per package</div>
              <div style={{ display: "flex", gap: "6px" }}>
                {["1", "2", "3", "4"].map(opt => (
                  <button key={opt} onClick={() => handleAnswer(opt)}
                    style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "16px", fontFamily: "inherit", cursor: "pointer", fontWeight: "700" }}>{opt}</button>
                ))}
              </div>
            </>
          )}

          {/* Bagel type */}
          {pendingFood.question.type === "bagel" && !pendingFood.bagelType && (
            <>
              <div style={{ fontSize: "11px", color: "#4ecdc4", marginBottom: "8px" }}>What kind?</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["Plain", "Everything", "Sesame", "Cinnamon Raisin"].map(opt => (
                  <button key={opt} onClick={() => handleAnswer(opt)}
                    style={{ padding: "6px 12px", borderRadius: "10px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>{opt}</button>
                ))}
              </div>
            </>
          )}

          {/* Bagel cream cheese */}
          {pendingFood.step === "creamcheese" && (
            <>
              <div style={{ fontSize: "11px", color: "#4ecdc4", marginBottom: "8px" }}>Cream cheese?</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["No cream cheese", "Regular cream cheese (+100 cal)", "Reduced fat cream cheese (+70 cal)"].map(opt => (
                  <button key={opt} onClick={() => handleAnswer(opt)}
                    style={{ padding: "6px 12px", borderRadius: "10px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>{opt}</button>
                ))}
              </div>
            </>
          )}

          {/* Restaurant search */}
          {pendingFood.step === "restaurant" && (
            <>
              <div style={{ fontSize: "11px", color: "#4ecdc4", marginBottom: "8px" }}>Where did you go?</div>
              <input placeholder="Type restaurant..." value={restaurantQuery} onChange={e => handleRestaurantInput(e.target.value)}
                style={{ width: "100%", background: "#111", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box", marginBottom: "6px" }} />
              {restaurantSuggestions.map(r => (
                <button key={r} onClick={() => { setPendingFood({ ...pendingFood, restaurant: r, step: "size" }); setRestaurantQuery(""); setRestaurantSuggestions([]); }}
                  style={{ display: "block", width: "100%", padding: "8px 10px", background: "transparent", border: "1px solid #ffffff15", borderRadius: "6px", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", textAlign: "left", marginBottom: "4px" }}>{r}</button>
              ))}
              {restaurantQuery.length > 1 && !restaurantSuggestions.length && (
                <button onClick={() => { setPendingFood({ ...pendingFood, restaurant: restaurantQuery, step: "size" }); setRestaurantQuery(""); }}
                  style={{ display: "block", width: "100%", padding: "8px 10px", background: "#4ecdc415", border: "1px solid #4ecdc440", borderRadius: "6px", color: "#4ecdc4", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
                  Use "{restaurantQuery}"
                </button>
              )}
            </>
          )}

          {/* Size after restaurant */}
          {pendingFood.step === "size" && (
            <>
              <div style={{ fontSize: "11px", color: "#4ecdc4", marginBottom: "4px" }}>What size?</div>
              <div style={{ fontSize: "10px", color: "#ffffff30", marginBottom: "8px" }}>*calories may vary</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["Small (~380 cal)", "Medium (~540 cal)", "Large (~720 cal)"].map(opt => (
                  <button key={opt} onClick={() => handleAnswer(opt)}
                    style={{ padding: "6px 12px", borderRadius: "10px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>{opt}</button>
                ))}
              </div>
            </>
          )}

          {/* Restaurant size direct */}
          {pendingFood.question.type === "restaurant_size" && !pendingFood.step && (
            <>
              <div style={{ fontSize: "11px", color: "#4ecdc4", marginBottom: "4px" }}>What did you get?</div>
              <div style={{ fontSize: "10px", color: "#ffffff30", marginBottom: "8px" }}>*calories may vary</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {pendingFood.question.options.map(opt => (
                  <button key={opt} onClick={() => handleAnswer(opt)}
                    style={{ padding: "6px 12px", borderRadius: "10px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>{opt}</button>
                ))}
              </div>
            </>
          )}

          {/* Generic questions */}
          {!["packages", "bagel", "restaurant_size"].includes(pendingFood.question.type) && !pendingFood.step && !pendingFood.bagelType && (
            <>
              <div style={{ fontSize: "11px", color: "#4ecdc4", marginBottom: "8px" }}>
                {pendingFood.question.type === "quantity" ? "How many?" : pendingFood.question.type === "source" ? "Homemade or went out?" : pendingFood.question.type === "serving" ? "How much?" : "What size?"}
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {pendingFood.question.options.map(opt => (
                  <button key={opt} onClick={() => handleAnswer(opt)}
                    style={{ padding: "6px 12px", borderRadius: "10px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>{opt}</button>
                ))}
              </div>
            </>
          )}

          <button onClick={() => setPendingFood(null)} style={{ marginTop: "10px", fontSize: "11px", color: "#ffffff30", background: "transparent", border: "none", cursor: "pointer", padding: "0" }}>Cancel</button>
        </div>
      )}

      {/* Unknown calorie flag */}
      {items.some(i => i.unknown) && (
        <div style={{ marginTop: "6px", fontSize: "11px", color: "#f5a623" }}>⚠️ Some items have unknown calories — calorie count may be off</div>
      )}
    </div>
  );
};

export default function FitnessTracker() {
  const [settings, setSettings] = useState({ name: "", startingWeight: "", goalWeight: "", height: "", age: "", calorieGoal: "", proteinGoal: "", workoutDays: DEFAULT_WORKOUT_DAYS });
  const [week, setWeek] = useState(initialWeek(DEFAULT_WORKOUT_DAYS));
  const [activeDay, setActiveDay] = useState("Monday");
  const [view, setView] = useState("meals");
  const [newExercise, setNewExercise] = useState({ name: "", type: "weights", sets: [{ reps: "", weight: "" }], duration: "", distance: "" });
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [templates, setTemplates] = useState({});
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [showLoadTemplate, setShowLoadTemplate] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [savedFoods, setSavedFoods] = useState({ morning: [], lunch: [], dinner: [], snack: [], preWorkout: [], postWorkout: [] });
  const [editingSection, setEditingSection] = useState(null);

  const [workoutActive, setWorkoutActive] = useState(false);
  const [workoutStart, setWorkoutStart] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const [bodyWeights, setBodyWeights] = useState([]);
  const [showWeightPrompt, setShowWeightPrompt] = useState(false);
  const [newBodyWeight, setNewBodyWeight] = useState("");
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [exerciseProgress, setExerciseProgress] = useState({});
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [streak, setStreak] = useState(0);

  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingDone, setOnboardingDone] = useState(() => localStorage.getItem("onboardingDone") === "true");
  const [dontShowChecked, setDontShowChecked] = useState(false);

  const dismissOnboarding = () => {
    setOnboardingDone(true);
    localStorage.setItem("onboardingDone", "true");
  };

  const ONBOARDING_STEPS = [
    { tab: "meals", icon: "🍽️", title: "Meal Planner", desc: "Log everything you eat throughout the day. Type any food and the app will estimate calories automatically. If it doesn't recognize something it'll ask you to enter calories manually. Your saved meals appear as quick-tap bubbles so you don't retype the same things daily." },
    { tab: "workout", icon: "🏋️", title: "Workout Tracker", desc: "Hit Start Workout to begin a timed session. Add exercises with sets, reps and weight — or cardio with duration and distance. Save your workout as a template and load it next week so you're not rebuilding from scratch every session." },
    { tab: "progress", icon: "📈", title: "Progress", desc: "Track your body weight over time and see your personal records for each exercise. The app will prompt you to log your weight every 20 workouts so you can see how far you've come." },
    { tab: "history", icon: "📋", title: "History", desc: "Every completed workout is saved here with the date, duration and exercises you did. Use it to see how consistent you've been over time." },
    { tab: "settings", icon: "⚙️", title: "Settings", desc: "Set your name, goal weight, daily calorie and protein targets. Track body measurements like arms and chest — sometimes the scale doesn't move but your body is still changing. You can also manage your saved foods and reset data here." },
  ];

  const currentStep = ONBOARDING_STEPS[onboardingStep];

  useEffect(() => {
    if (workoutActive) { timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000); }
    else { clearInterval(timerRef.current); }
    return () => clearInterval(timerRef.current);
  }, [workoutActive]);

  const day = week[activeDay];
  const updateDay = (fields) => setWeek(w => ({ ...w, [activeDay]: { ...w[activeDay], ...fields } }));

  const addFoodItem = (section, item) => {
    const current = day[section] || [];
    updateDay({ [section]: [...current, item] });
  };

  const removeFoodItem = (section, index) => {
    const current = [...(day[section] || [])];
    current.splice(index, 1);
    updateDay({ [section]: current });
  };

  const addSavedFood = (section, name) => {
    if (!name || name.length < 2) return;
    setSavedFoods(sf => ({ ...sf, [section]: sf[section].includes(name) ? sf[section] : [...sf[section], name] }));
  };

  const removeSavedFood = (section, name) => {
    setSavedFoods(sf => ({ ...sf, [section]: sf[section].filter(f => f !== name) }));
  };

  const toggleLunchSide = (side) => {
    const current = day.lunchSides || [];
    const cal = FOOD_DB[side] || 0;
    if (current.includes(side)) {
      updateDay({ lunchSides: current.filter(s => s !== side) });
    } else {
      updateDay({ lunchSides: [...current, side] });
    }
  };

  const getDayCalories = (d) => {
    const dd = week[d];
    let cal = 0;
    ["morning", "lunch", "dinner", "snack", "preWorkout", "postWorkout"].forEach(s => {
      cal += getSectionCalories(dd[s] || []);
    });
    (dd.lunchSides || []).forEach(s => { cal += FOOD_DB[s] || 0; });
    return cal;
  };

  const calorieGoal = settings.calorieGoal || CALORIE_GOAL_DEFAULT;
  const proteinGoal = settings.proteinGoal || PROTEIN_GOAL_DEFAULT;
  const todayCalories = getDayCalories(activeDay);
  const calPct = Math.min((todayCalories / calorieGoal) * 100, 100);

  const startWorkout = () => { setWorkoutActive(true); setWorkoutStart(Date.now()); setElapsed(0); };
  const endWorkout = () => {
    setWorkoutActive(false);
    const count = totalWorkouts + 1;
    setTotalWorkouts(count); setStreak(s => s + 1);
    setWorkoutHistory(h => [{ id: Date.now(), day: activeDay, date: Date.now(), duration: elapsed, exercises: JSON.parse(JSON.stringify(day.exercises)) }, ...h]);
    day.exercises.forEach(ex => {
      if (ex.type !== "cardio") {
        const maxWeight = Math.max(...ex.sets.map(s => parseFloat(s.weight) || 0));
        if (maxWeight > 0) setExerciseProgress(p => ({ ...p, [ex.name]: [...(p[ex.name] || []), { date: Date.now(), weight: maxWeight }] }));
      }
    });
    if (count % 20 === 0) setShowWeightPrompt(true);
  };

  const saveBodyWeight = () => {
    if (!newBodyWeight) return;
    setBodyWeights(w => [...w, { date: Date.now(), weight: parseFloat(newBodyWeight) }]);
    setNewBodyWeight(""); setShowWeightPrompt(false);
  };

  const addSet = () => setNewExercise(e => ({ ...e, sets: [...e.sets, { reps: "", weight: "" }] }));
  const removeSet = (i) => setNewExercise(e => ({ ...e, sets: e.sets.filter((_, idx) => idx !== i) }));
  const updateSet = (i, field, val) => setNewExercise(e => { const sets = [...e.sets]; sets[i] = { ...sets[i], [field]: val }; return { ...e, sets }; });
  const saveExercise = () => {
    if (!newExercise.name.trim()) return;
    updateDay({ exercises: [...day.exercises, { ...newExercise, id: Date.now() }] });
    setNewExercise({ name: "", type: "weights", sets: [{ reps: "", weight: "" }], duration: "", distance: "" });
    setShowAddExercise(false);
  };
  const removeExercise = (id) => updateDay({ exercises: day.exercises.filter(e => e.id !== id) });
  const saveTemplate = () => {
    if (!templateName.trim()) return;
    setTemplates(t => ({ ...t, [templateName]: JSON.parse(JSON.stringify(day.exercises)) }));
    setTemplateName(""); setShowSaveTemplate(false);
  };
  const loadTemplate = (name) => {
    updateDay({ exercises: templates[name].map(ex => ({ ...ex, id: Date.now() + Math.random() })) });
    setShowLoadTemplate(false);
  };
  const copyLastWeek = () => {
    const last = workoutHistory.find(s => s.day === activeDay);
    if (last) updateDay({ exercises: last.exercises.map(ex => ({ ...ex, id: Date.now() + Math.random() })) });
  };

  const currentWeight = bodyWeights.length > 0 ? bodyWeights[bodyWeights.length - 1]?.weight : settings.startingWeight || "—";
  const startWeight = bodyWeights.length > 0 ? bodyWeights[0]?.weight : settings.startingWeight || "—";
  const weightGain = bodyWeights.length > 1 ? (currentWeight - startWeight).toFixed(1) : "0";

  const navBtn = (label, v) => {
    const isOnboarding = !onboardingDone && currentStep?.tab === v;
    return (
      <button onClick={() => setView(v)} style={{ flex: 1, padding: "8px 2px", border: isOnboarding ? "1px solid #e94560" : "none", background: view === v ? "linear-gradient(135deg, #e94560, #f5a623)" : isOnboarding ? "#e9456015" : "transparent", color: view === v || isOnboarding ? "#fff" : "#ffffff50", fontSize: "9px", fontFamily: "inherit", cursor: "pointer", letterSpacing: "0.06em", borderRadius: "8px", fontWeight: view === v ? "700" : "400" }}>{label}</button>
    );
  };

  const mealProps = (section) => ({
    sectionKey: section,
    items: day[section] || [],
    onAdd: (item) => addFoodItem(section, item),
    onRemove: (i) => removeFoodItem(section, i),
    savedFoods: savedFoods[section] || [],
    onSaveFood: (name) => addSavedFood(section, name),
    onRemoveSaved: (name) => removeSavedFood(section, name),
    isEditing: editingSection === section,
    onToggleEdit: () => setEditingSection(editingSection === section ? null : section),
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f0f0f0", fontFamily: "'DM Mono', 'Courier New', monospace" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: "18px 20px 14px", borderBottom: "1px solid #ffffff15" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "linear-gradient(135deg, #e94560, #f5a623)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold", color: "#fff" }}>💪</div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", letterSpacing: "0.05em", color: "#fff" }}>FITNESS TRACKER</div>
            <div style={{ fontSize: "10px", color: "#ffffff60" }}>{currentWeight} lbs · {totalWorkouts} workouts · 🔥 {streak} streak</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", gap: "4px", padding: "10px 14px", background: "#111", borderBottom: "1px solid #ffffff10" }}>
        {navBtn("MEALS", "meals")}
        {navBtn("WORKOUT", "workout")}
        {navBtn("PROGRESS", "progress")}
        {navBtn("HISTORY", "history")}
        {navBtn("SETTINGS", "settings")}
      </div>

      {/* Onboarding walkthrough */}
      {!onboardingDone && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          {/* Dim overlay */}
          <div style={{ position: "absolute", inset: 0, background: "#00000070" }} />

          {/* Highlight active tab */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "130px", background: "transparent" }} />

          {/* Card */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#1a1a1a", borderRadius: "20px 20px 0 0", border: "1px solid #ffffff15", padding: "24px 20px 40px" }}>

            {/* Progress dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "20px" }}>
              {ONBOARDING_STEPS.map((_, i) => (
                <div key={i} style={{ width: i === onboardingStep ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === onboardingStep ? "#e94560" : "#ffffff20", transition: "all 0.3s" }} />
              ))}
            </div>

            {/* Content */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg, #e94560, #f5a623)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                {currentStep.icon}
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>{currentStep.title}</div>
            </div>

            <div style={{ fontSize: "14px", color: "#ffffff80", lineHeight: "1.7", marginBottom: "24px" }}>
              {currentStep.desc}
            </div>

            {/* Don't show again */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <input type="checkbox" id="dontShow" checked={dontShowChecked} onChange={e => { setDontShowChecked(e.target.checked); if (e.target.checked) dismissOnboarding(); }}
                style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#e94560" }} />
              <label htmlFor="dontShow" style={{ fontSize: "12px", color: "#ffffff50", cursor: "pointer" }}>Don't show again</label>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={dismissOnboarding} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff50", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}>
                Skip
              </button>
              <button onClick={() => {
                if (onboardingStep < ONBOARDING_STEPS.length - 1) {
                  setView(ONBOARDING_STEPS[onboardingStep + 1].tab);
                  setOnboardingStep(s => s + 1);
                } else {
                  dismissOnboarding();
                  setView("meals");
                }
              }} style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #e94560, #f5a623)", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", fontWeight: "700" }}>
                {onboardingStep < ONBOARDING_STEPS.length - 1 ? "Next →" : "Get Started 💪"}
              </button>
            </div>

            {/* Step counter */}
            <div style={{ textAlign: "center", fontSize: "10px", color: "#ffffff30", marginTop: "12px" }}>
              {onboardingStep + 1} of {ONBOARDING_STEPS.length}
            </div>
          </div>
        </div>
      )}
      {showWeightPrompt && (
        <div style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" }}>
          <div style={{ background: "#1a1a1a", borderRadius: "16px", border: "1px solid #f5a62340", padding: "24px", width: "100%", maxWidth: "320px" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#f5a623", marginBottom: "8px" }}>⚖️ LOG YOUR WEIGHT</div>
            <input placeholder="Current weight (lbs)" value={newBodyWeight} onChange={e => setNewBodyWeight(e.target.value)} type="number"
              style={{ width: "100%", background: "#111", border: "1px solid #ffffff20", borderRadius: "8px", padding: "12px", color: "#fff", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box", marginBottom: "12px" }} />
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={saveBodyWeight} style={{ flex: 2, padding: "12px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #e94560, #f5a623)", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600" }}>Save</button>
              <button onClick={() => setShowWeightPrompt(false)} style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "13px", fontFamily: "inherit", cursor: "pointer" }}>Skip</button>
            </div>
          </div>
        </div>
      )}

      {/* Recipe modal */}
      {expandedRecipe !== null && (
        <div style={{ position: "fixed", inset: 0, background: "#0a0a0a", zIndex: 100, overflowY: "auto" }}>
          <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>{expandedRecipe.emoji} {expandedRecipe.name}</div>
                <div style={{ fontSize: "11px", color: "#ffffff40" }}>{expandedRecipe.days} · ~{expandedRecipe.calories} cal · {expandedRecipe.protein}g protein</div>
              </div>
              <button onClick={() => setExpandedRecipe(null)} style={{ background: "#1a1a1a", border: "1px solid #ffffff20", color: "#fff", fontSize: "20px", cursor: "pointer", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", color: "#e94560", letterSpacing: "0.08em", marginBottom: "8px" }}>INGREDIENTS</div>
              {expandedRecipe.ingredients.map((ing, i) => <div key={i} style={{ fontSize: "13px", color: "#ffffff80", padding: "6px 0", borderBottom: "1px solid #ffffff08" }}>• {ing}</div>)}
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", color: "#e94560", letterSpacing: "0.08em", marginBottom: "8px" }}>SEASONINGS</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {expandedRecipe.seasonings.map((s, i) => <div key={i} style={{ padding: "4px 10px", borderRadius: "8px", background: "#111", border: "1px solid #ffffff10", fontSize: "12px", color: "#f5a623" }}>{s}</div>)}
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "11px", color: "#e94560", letterSpacing: "0.08em", marginBottom: "8px" }}>DIRECTIONS</div>
              {expandedRecipe.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#e9456020", border: "1px solid #e9456040", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#e94560", flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: "13px", color: "#ffffff80", lineHeight: "1.6" }}>{step}</div>
                </div>
              ))}
            </div>
            <button onClick={() => {
              addFoodItem("dinner", { name: expandedRecipe.name, cal: expandedRecipe.calories });
              setExpandedRecipe(null);
            }} style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #e94560, #f5a623)", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", fontWeight: "700", marginBottom: "32px" }}>
              Add to {activeDay}'s Dinner
            </button>
          </div>
        </div>
      )}

      {/* ── MEALS VIEW ── */}
      {view === "meals" && (
        <div style={{ padding: "16px" }}>
          {/* Day selector */}
          <div style={{ display: "flex", overflowX: "auto", gap: "8px", marginBottom: "16px", scrollbarWidth: "none" }}>
            {DAYS.map(d => (
              <button key={d} onClick={() => setActiveDay(d)} style={{ flexShrink: 0, padding: "7px 12px", borderRadius: "20px", border: activeDay === d ? "1px solid #e94560" : "1px solid #ffffff15", background: activeDay === d ? "#e9456015" : "transparent", color: activeDay === d ? "#e94560" : week[d].isWorkoutDay ? "#f5a623" : "#ffffff50", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>{d.slice(0, 3).toUpperCase()}</button>
            ))}
          </div>

          {/* Calorie bar */}
          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", padding: "14px 16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ fontSize: "11px", color: "#ffffff60", letterSpacing: "0.08em" }}>DAILY CALORIES</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: calPct >= 100 ? "#f5a623" : "#fff" }}>{todayCalories} / {calorieGoal}</div>
            </div>
            <div style={{ background: "#1a1a1a", borderRadius: "6px", height: "10px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${calPct}%`, background: calPct >= 100 ? "linear-gradient(90deg, #f5a623, #e94560)" : "linear-gradient(90deg, #4ecdc4, #44b89a)", borderRadius: "6px", transition: "width 0.3s" }} />
            </div>
            <div style={{ fontSize: "10px", color: "#ffffff30", marginTop: "6px" }}>{calPct >= 100 ? "✅ Goal reached!" : `${calorieGoal - todayCalories} calories to go`}</div>
          </div>

          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>NUTRITION — {activeDay.toUpperCase()}</div>

            <MealSection label="BREAKFAST" {...mealProps("morning")} />

            {/* Lunch */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ fontSize: "10px", color: "#e94560", letterSpacing: "0.08em" }}>LUNCH</div>
                <div style={{ fontSize: "11px", color: "#ffffff40" }}>{getSectionCalories(day.lunch) + (day.lunchSides || []).reduce((a, s) => a + (FOOD_DB[s] || 0), 0)} cal</div>
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                {LUNCH_OPTIONS.map(opt => (
                  <button key={opt} onClick={() => {
                    const exists = (day.lunch || []).find(i => i.name === opt);
                    if (exists) updateDay({ lunch: (day.lunch || []).filter(i => i.name !== opt) });
                    else addFoodItem("lunch", { name: opt, cal: FOOD_DB[opt] || 0 });
                  }} style={{ padding: "6px 10px", borderRadius: "12px", border: (day.lunch || []).find(i => i.name === opt) ? "1px solid #e94560" : "1px solid #ffffff15", background: (day.lunch || []).find(i => i.name === opt) ? "#e9456015" : "transparent", color: (day.lunch || []).find(i => i.name === opt) ? "#e94560" : "#ffffff50", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>{opt}</button>
                ))}
              </div>
              <div style={{ fontSize: "10px", color: "#ffffff30", marginBottom: "6px" }}>SIDES</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {LUNCH_SIDES.map(side => (
                  <button key={side} onClick={() => toggleLunchSide(side)} style={{ padding: "5px 10px", borderRadius: "12px", border: (day.lunchSides || []).includes(side) ? "1px solid #f5a623" : "1px solid #ffffff15", background: (day.lunchSides || []).includes(side) ? "#f5a62310" : "transparent", color: (day.lunchSides || []).includes(side) ? "#f5a623" : "#ffffff50", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>{side}</button>
                ))}
              </div>
            </div>

            {/* Dinner */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div style={{ fontSize: "10px", color: "#e94560", letterSpacing: "0.08em" }}>DINNER</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button onClick={() => updateDay({ isLeftover: !day.isLeftover })} style={{ padding: "4px 10px", borderRadius: "10px", border: day.isLeftover ? "1px solid #4ecdc4" : "1px solid #ffffff15", background: day.isLeftover ? "#4ecdc415" : "transparent", color: day.isLeftover ? "#4ecdc4" : "#ffffff40", fontSize: "10px", fontFamily: "inherit", cursor: "pointer" }}>🍱 Leftovers</button>
                  <div style={{ fontSize: "11px", color: "#ffffff40" }}>{getSectionCalories(day.dinner)} cal</div>
                </div>
              </div>
              {day.isLeftover ? (
                <div style={{ padding: "12px", borderRadius: "8px", background: "#4ecdc410", border: "1px solid #4ecdc430", fontSize: "13px", color: "#4ecdc4" }}>🍱 Leftover day — no cooking needed!</div>
              ) : (
                <>
                  {(day.dinner || []).length > 0 && (
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                      {(day.dinner || []).map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "12px", background: "#e9456015", border: "1px solid #e9456040" }}>
                          <span style={{ fontSize: "12px", color: "#fff" }}>{item.name}</span>
                          {item.cal > 0 && <span style={{ fontSize: "10px", color: "#ffffff50" }}>~{item.cal}</span>}
                          <button onClick={() => removeFoodItem("dinner", i)} style={{ background: "transparent", border: "none", color: "#ffffff50", cursor: "pointer", fontSize: "14px", padding: "0 0 0 2px" }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: "10px", color: "#ffffff30", marginBottom: "8px" }}>SUGGESTED — tap to see recipe</div>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {DINNER_RECIPES.map(r => (
                      <button key={r.name} onClick={() => setExpandedRecipe(r)} style={{ padding: "6px 10px", borderRadius: "12px", border: "1px solid #ffffff15", background: "transparent", color: "#ffffff50", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>{r.emoji} {r.name}</button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <MealSection label="SNACK" {...mealProps("snack")} />
            <MealSection label="PRE-WORKOUT" {...mealProps("preWorkout")} />
            <MealSection label="POST-WORKOUT" {...mealProps("postWorkout")} />
          </div>

          <div style={{ padding: "12px 16px", borderRadius: "12px", background: "linear-gradient(135deg, #e9456008, #f5a62308)", border: "1px solid #f5a62320" }}>
            <div style={{ fontSize: "10px", color: "#f5a623", letterSpacing: "0.1em", marginBottom: "4px" }}>DAILY TARGET</div>
            <div style={{ fontSize: "12px", color: "#ffffff80", lineHeight: "1.6" }}>🥩 {proteinGoal}g+ protein · 🍚 {calorieGoal}+ calories · 💪 Progressive overload</div>
          </div>
        </div>
      )}

      {/* ── WORKOUT VIEW ── */}
      {view === "workout" && (
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", overflowX: "auto", gap: "8px", marginBottom: "16px", scrollbarWidth: "none" }}>
            {DAYS.map(d => (
              <button key={d} onClick={() => setActiveDay(d)} style={{ flexShrink: 0, padding: "7px 12px", borderRadius: "20px", border: activeDay === d ? "1px solid #e94560" : "1px solid #ffffff15", background: activeDay === d ? "#e9456015" : "transparent", color: activeDay === d ? "#e94560" : week[d].isWorkoutDay ? "#f5a623" : "#ffffff50", fontSize: "11px", fontFamily: "inherit", cursor: "pointer", position: "relative" }}>
                {d.slice(0, 3).toUpperCase()}
                {week[d].exercises.length > 0 && <span style={{ position: "absolute", top: "1px", right: "1px", width: "5px", height: "5px", borderRadius: "50%", background: "#e94560" }} />}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>{activeDay}</div>
              <div style={{ fontSize: "11px", color: day.isWorkoutDay ? "#f5a623" : "#ffffff40" }}>{day.isWorkoutDay ? "🏋️ WORKOUT DAY" : "REST DAY"}</div>
            </div>
            <button onClick={() => updateDay({ isWorkoutDay: !day.isWorkoutDay })} style={{ padding: "7px 12px", borderRadius: "20px", border: `1px solid ${day.isWorkoutDay ? "#f5a62360" : "#ffffff20"}`, background: "transparent", color: day.isWorkoutDay ? "#f5a623" : "#ffffff40", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>
              {day.isWorkoutDay ? "Mark Rest" : "Mark Workout"}
            </button>
          </div>

          {day.isWorkoutDay ? (
            <>
              <div style={{ marginBottom: "16px" }}>
                {!workoutActive ? (
                  <button onClick={startWorkout} style={{ width: "100%", padding: "16px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #e94560, #f5a623)", color: "#fff", fontSize: "15px", fontFamily: "inherit", cursor: "pointer", fontWeight: "700" }}>▶ START WORKOUT</button>
                ) : (
                  <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #e9456040", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div>
                        <div style={{ fontSize: "11px", color: "#e94560", letterSpacing: "0.08em", marginBottom: "2px" }}>IN PROGRESS</div>
                        <div style={{ fontSize: "32px", fontWeight: "700", color: "#fff" }}>{formatDuration(elapsed)}</div>
                        <div style={{ fontSize: "11px", color: "#ffffff40" }}>Started {formatTime(workoutStart)}</div>
                      </div>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", border: "2px solid #e94560", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#e94560" }} />
                      </div>
                    </div>
                    <button onClick={endWorkout} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #e9456060", background: "#e9456015", color: "#e94560", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600" }}>■ END WORKOUT</button>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                <button onClick={() => setShowLoadTemplate(true)} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #4ecdc460", background: "#4ecdc410", color: "#4ecdc4", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>📋 Load</button>
                <button onClick={copyLastWeek} disabled={!workoutHistory.find(s => s.day === activeDay)} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: workoutHistory.find(s => s.day === activeDay) ? "1px solid #f5a62360" : "1px solid #ffffff15", background: workoutHistory.find(s => s.day === activeDay) ? "#f5a62310" : "transparent", color: workoutHistory.find(s => s.day === activeDay) ? "#f5a623" : "#ffffff30", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>↩ Last Week</button>
                {day.exercises.length > 0 && <button onClick={() => setShowSaveTemplate(true)} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff50", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>💾 Save</button>}
              </div>

              {showSaveTemplate && (
                <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #4ecdc440", padding: "16px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#4ecdc4", marginBottom: "10px" }}>Save as Template</div>
                  <input placeholder='e.g. "Push Day"' value={templateName} onChange={e => setTemplateName(e.target.value)}
                    style={{ width: "100%", background: "#111", border: "1px solid #ffffff15", borderRadius: "8px", padding: "10px 12px", color: "#fff", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box", marginBottom: "10px" }} />
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={saveTemplate} style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", background: "#4ecdc4", color: "#000", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", fontWeight: "700" }}>Save</button>
                    <button onClick={() => setShowSaveTemplate(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              )}

              {showLoadTemplate && (
                <div style={{ background: "#1a1a1a", borderRadius: "12px", border: "1px solid #4ecdc440", padding: "16px", marginBottom: "16px" }}>
                  <div style={{ fontSize: "12px", color: "#4ecdc4", marginBottom: "10px" }}>Load Template</div>
                  {Object.keys(templates).length === 0 ? (
                    <div style={{ fontSize: "12px", color: "#ffffff30", textAlign: "center", padding: "12px 0" }}>No saved templates yet</div>
                  ) : Object.keys(templates).map(name => (
                    <button key={name} onClick={() => loadTemplate(name)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ffffff15", background: "transparent", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", textAlign: "left", marginBottom: "6px" }}>
                      📋 {name} <span style={{ color: "#ffffff40", fontSize: "11px" }}>({templates[name].length} exercises)</span>
                    </button>
                  ))}
                  <button onClick={() => setShowLoadTemplate(false)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", marginTop: "4px" }}>Cancel</button>
                </div>
              )}

              <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>EXERCISES ({day.exercises.length})</div>
                  <button onClick={() => setShowAddExercise(true)} style={{ padding: "6px 12px", borderRadius: "16px", border: "1px solid #e9456060", background: "#e9456010", color: "#e94560", fontSize: "11px", fontFamily: "inherit", cursor: "pointer" }}>+ ADD</button>
                </div>

                {day.exercises.length === 0 && !showAddExercise && (
                  <div style={{ padding: "24px 16px", textAlign: "center", color: "#ffffff30", fontSize: "13px" }}>Load a template or add exercises 💪</div>
                )}

                {day.exercises.map(ex => {
                  const isCardio = ex.type === "cardio";
                  const prev = exerciseProgress[ex.name];
                  const lastMax = !isCardio && prev?.length > 0 ? prev[prev.length - 1]?.weight : null;
                  const curMax = !isCardio ? Math.max(...(ex.sets || []).map(s => parseFloat(s.weight) || 0)) : 0;
                  const pr = curMax > 0 && lastMax && curMax > lastMax;
                  return (
                    <div key={ex.id} style={{ padding: "14px 16px", borderBottom: "1px solid #ffffff08" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>{isCardio ? "🏃" : "🏋️"}</span>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>{ex.name}</div>
                          {pr && <span style={{ fontSize: "10px", background: "#f5a62320", color: "#f5a623", padding: "2px 6px", borderRadius: "6px" }}>PR 🔥</span>}
                        </div>
                        <button onClick={() => removeExercise(ex.id)} style={{ background: "transparent", border: "none", color: "#ffffff30", cursor: "pointer", fontSize: "18px", padding: "0" }}>×</button>
                      </div>
                      {isCardio ? (
                        <div style={{ display: "flex", gap: "8px" }}>
                          {ex.duration && <div style={{ padding: "4px 10px", borderRadius: "8px", background: "#1a1a1a", border: "1px solid #ffffff10", fontSize: "12px", color: "#ffffff80" }}>⏱ {ex.duration} min</div>}
                          {ex.distance && <div style={{ padding: "4px 10px", borderRadius: "8px", background: "#1a1a1a", border: "1px solid #ffffff10", fontSize: "12px", color: "#ffffff80" }}>📍 {ex.distance} mi</div>}
                        </div>
                      ) : (
                        <>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {(ex.sets || []).map((s, i) => (
                              <div key={i} style={{ padding: "4px 10px", borderRadius: "8px", background: "#1a1a1a", border: "1px solid #ffffff10", fontSize: "12px", color: "#ffffff80" }}>{i + 1}: {s.reps} × {s.weight} lbs</div>
                            ))}
                          </div>
                          {lastMax && <div style={{ fontSize: "11px", color: "#ffffff30", marginTop: "6px" }}>Last max: {lastMax} lbs</div>}
                        </>
                      )}
                    </div>
                  );
                })}

                {showAddExercise && (
                  <div style={{ padding: "16px", borderTop: "1px solid #ffffff10" }}>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                      {["weights", "cardio"].map(t => (
                        <button key={t} onClick={() => setNewExercise(ex => ({ ...ex, type: t }))} style={{ flex: 1, padding: "9px", borderRadius: "8px", border: newExercise.type === t ? "1px solid #e94560" : "1px solid #ffffff15", background: newExercise.type === t ? "#e9456015" : "transparent", color: newExercise.type === t ? "#e94560" : "#ffffff50", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>
                          {t === "weights" ? "🏋️ Weights" : "🏃 Cardio"}
                        </button>
                      ))}
                    </div>
                    <input placeholder={newExercise.type === "cardio" ? "Cardio type (e.g. Treadmill)" : "Exercise name (e.g. Bench Press)"} value={newExercise.name} onChange={e => setNewExercise(ex => ({ ...ex, name: e.target.value }))}
                      style={{ width: "100%", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "10px 12px", color: "#fff", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box", marginBottom: "12px" }} />
                    {newExercise.type === "cardio" ? (
                      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "10px", color: "#ffffff40", marginBottom: "4px" }}>DURATION (mins)</div>
                          <input placeholder="30" value={newExercise.duration} onChange={e => setNewExercise(ex => ({ ...ex, duration: e.target.value }))} type="number"
                            style={{ width: "100%", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "10px", color: "#ffffff40", marginBottom: "4px" }}>DISTANCE (miles)</div>
                          <input placeholder="2.5" value={newExercise.distance} onChange={e => setNewExercise(ex => ({ ...ex, distance: e.target.value }))} type="number"
                            style={{ width: "100%", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box" }} />
                        </div>
                      </div>
                    ) : (
                      <>
                        {newExercise.sets.map((s, i) => (
                          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                            <div style={{ fontSize: "11px", color: "#ffffff40", width: "36px", flexShrink: 0 }}>Set {i + 1}</div>
                            <input placeholder="Reps" value={s.reps} onChange={e => updateSet(i, "reps", e.target.value)} type="number" style={{ flex: 1, minWidth: 0, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "16px", fontFamily: "inherit" }} />
                            <input placeholder="lbs" value={s.weight} onChange={e => updateSet(i, "weight", e.target.value)} type="number" style={{ flex: 1, minWidth: 0, background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "8px 10px", color: "#fff", fontSize: "16px", fontFamily: "inherit" }} />
                            {newExercise.sets.length > 1 && <button onClick={() => removeSet(i)} style={{ background: "transparent", border: "none", color: "#ffffff30", cursor: "pointer", fontSize: "18px", flexShrink: 0 }}>×</button>}
                          </div>
                        ))}
                        <button onClick={addSet} style={{ width: "100%", padding: "9px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", marginBottom: "8px" }}>+ Add Set</button>
                      </>
                    )}
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={saveExercise} style={{ flex: 2, padding: "10px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #e94560, #f5a623)", color: "#fff", fontSize: "12px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600" }}>Save</button>
                      <button onClick={() => { setShowAddExercise(false); setNewExercise({ name: "", type: "weights", sets: [{ reps: "", weight: "" }], duration: "", distance: "" }); }} style={{ padding: "10px 12px", borderRadius: "8px", border: "1px solid #ffffff20", background: "transparent", color: "#ffffff60", fontSize: "12px", fontFamily: "inherit", cursor: "pointer" }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#ffffff30", fontSize: "14px" }}>😴 Rest day — recovery is part of the process</div>
          )}
        </div>
      )}

      {/* ── PROGRESS VIEW ── */}
      {view === "progress" && (
        <div style={{ padding: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            {[{ label: "WORKOUTS", val: totalWorkouts, color: "#e94560" }, { label: "STREAK", val: `🔥 ${streak}`, color: "#f5a623" }, { label: "GAINED", val: `${parseFloat(weightGain) > 0 ? "+" : ""}${weightGain} lbs`, color: "#4ecdc4" }].map(s => (
              <div key={s.label} style={{ background: "#111", borderRadius: "10px", border: "1px solid #ffffff10", padding: "14px 10px", textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: s.color }}>{s.val}</div>
                <div style={{ fontSize: "9px", color: "#ffffff40", letterSpacing: "0.08em", marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>BODY WEIGHT</div>
              <button onClick={() => setShowWeightPrompt(true)} style={{ padding: "5px 10px", borderRadius: "12px", border: "1px solid #4ecdc440", background: "#4ecdc410", color: "#4ecdc4", fontSize: "10px", fontFamily: "inherit", cursor: "pointer" }}>+ Log</button>
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "16px" }}>
                {[{ l: "START", v: `${startWeight} lbs`, c: "#ffffff60" }, { l: "NOW", v: `${currentWeight} lbs`, c: "#4ecdc4" }, { l: "GOAL", v: `${settings.goalWeight || "—"} lbs`, c: "#f5a623" }].map(s => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: s.c }}>{s.v}</div>
                    <div style={{ fontSize: "10px", color: "#ffffff30" }}>{s.l}</div>
                  </div>
                ))}
              </div>
              {bodyWeights.length > 1 ? (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "70px" }}>
                  {bodyWeights.map((w, i) => {
                    const mn = Math.min(...bodyWeights.map(x => x.weight)) - 2;
                    const mx = Math.max(...bodyWeights.map(x => x.weight)) + 2;
                    const h = ((w.weight - mn) / (mx - mn)) * 100;
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <div style={{ fontSize: "8px", color: "#ffffff40" }}>{w.weight}</div>
                        <div style={{ width: "100%", height: `${Math.max(h, 5)}%`, background: i === bodyWeights.length - 1 ? "#4ecdc4" : "#ffffff20", borderRadius: "3px 3px 0 0" }} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#ffffff30", fontSize: "12px", padding: "12px 0" }}>Log weight to see your chart</div>
              )}
            </div>
          </div>

          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>EXERCISE PRs</div>
            {Object.keys(exerciseProgress).length === 0 ? (
              <div style={{ padding: "24px 16px", textAlign: "center", color: "#ffffff30", fontSize: "13px" }}>Complete workouts to track PRs</div>
            ) : Object.entries(exerciseProgress).map(([name, entries]) => {
              const max = Math.max(...entries.map(e => e.weight));
              const gained = (max - entries[0]?.weight).toFixed(0);
              return (
                <div key={name} style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>{name}</div>
                    <div style={{ fontSize: "12px", color: "#f5a623" }}>🏆 {max} lbs{gained > 0 ? ` (+${gained})` : ""}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "30px" }}>
                    {entries.map((e, i) => {
                      const mn = Math.min(...entries.map(x => x.weight)) - 5;
                      const mx = Math.max(...entries.map(x => x.weight)) + 5;
                      const h = ((e.weight - mn) / (mx - mn)) * 100;
                      return <div key={i} style={{ flex: 1, height: `${Math.max(h, 5)}%`, background: i === entries.length - 1 ? "#e94560" : "#ffffff20", borderRadius: "2px 2px 0 0" }} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── HISTORY VIEW ── */}
      {view === "history" && (
        <div style={{ padding: "16px" }}>
          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>WORKOUT HISTORY</div>
              <div style={{ fontSize: "12px", color: "#f5a623" }}>{totalWorkouts} total</div>
            </div>
            {workoutHistory.length === 0 ? (
              <div style={{ padding: "32px 16px", textAlign: "center", color: "#ffffff30", fontSize: "13px" }}>No workouts logged yet</div>
            ) : workoutHistory.map(session => (
              <div key={session.id} style={{ padding: "14px 16px", borderBottom: "1px solid #ffffff08" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>{session.day}</div>
                    <div style={{ fontSize: "11px", color: "#ffffff40" }}>{formatDate(session.date)}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "14px", color: "#4ecdc4", fontWeight: "600" }}>{formatDuration(session.duration)}</div>
                    <div style={{ fontSize: "11px", color: "#ffffff40" }}>{session.exercises.length} exercises</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {session.exercises.map(ex => (
                    <div key={ex.id} style={{ padding: "3px 8px", borderRadius: "6px", background: "#1a1a1a", border: "1px solid #ffffff10", fontSize: "11px", color: "#ffffff60" }}>{ex.name}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SETTINGS VIEW ── */}
      {view === "settings" && (
        <div style={{ padding: "16px" }}>
          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>PROFILE</div>
            {[
              { label: "Name", key: "name", type: "text", placeholder: "e.g. Alex" },
              { label: "Age", key: "age", type: "number", placeholder: "e.g. 24" },
              { label: "Height", key: "height", type: "text", placeholder: 'e.g. 6\'2"' },
            ].map(f => (
              <div key={f.key} style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "13px", color: "#ffffff80" }}>{f.label}</div>
                <input value={settings[f.key] || ""} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} type={f.type} placeholder={f.placeholder}
                  style={{ background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "6px 10px", color: "#fff", fontSize: "16px", fontFamily: "inherit", width: "140px", textAlign: "right" }} />
              </div>
            ))}
          </div>

          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>GOALS</div>
            {[
              { label: "Starting Weight (lbs)", key: "startingWeight", placeholder: "e.g. 165" },
              { label: "Goal Weight (lbs)", key: "goalWeight", placeholder: "e.g. 185" },
              { label: "Daily Calorie Goal", key: "calorieGoal", placeholder: "e.g. 3000" },
              { label: "Daily Protein Goal (g)", key: "proteinGoal", placeholder: "e.g. 150" },
            ].map(f => (
              <div key={f.key} style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "13px", color: "#ffffff80" }}>{f.label}</div>
                <input value={settings[f.key] || ""} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} type="number" placeholder={f.placeholder}
                  style={{ background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "6px 10px", color: "#fff", fontSize: "16px", fontFamily: "inherit", width: "120px", textAlign: "right" }} />
              </div>
            ))}
          </div>

          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>LOG WEIGHT</div>
            <div style={{ padding: "16px" }}>
              <input placeholder="Enter current weight (lbs)" value={newBodyWeight} onChange={e => setNewBodyWeight(e.target.value)} type="number"
                style={{ width: "100%", background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "10px 12px", color: "#fff", fontSize: "16px", fontFamily: "inherit", boxSizing: "border-box", marginBottom: "10px" }} />
              <button onClick={saveBodyWeight} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #e94560, #f5a623)", color: "#fff", fontSize: "13px", fontFamily: "inherit", cursor: "pointer", fontWeight: "600" }}>Save Weight</button>
            </div>
          </div>

          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>MEASUREMENTS (inches)</div>
            {["Chest", "Arms", "Waist", "Hips", "Thighs"].map(m => (
              <div key={m} style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff08", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "13px", color: "#ffffff80" }}>{m}</div>
                <input placeholder="0.0" type="number"
                  style={{ background: "#1a1a1a", border: "1px solid #ffffff15", borderRadius: "8px", padding: "6px 10px", color: "#fff", fontSize: "16px", fontFamily: "inherit", width: "80px", textAlign: "right" }} />
              </div>
            ))}
          </div>

          <div style={{ background: "#111", borderRadius: "12px", border: "1px solid #ffffff10", overflow: "hidden", marginBottom: "16px" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff10", fontSize: "11px", letterSpacing: "0.12em", color: "#ffffff60" }}>DATA</div>
            {[
              { label: "Clear saved foods", action: () => setSavedFoods({ morning: [], lunch: [], dinner: [], snack: [], preWorkout: [], postWorkout: [] }), color: "#f5a623" },
              { label: "Reset workout history", action: () => { setWorkoutHistory([]); setTotalWorkouts(0); setStreak(0); }, color: "#f5a623" },
              { label: "Reset body weight log", action: () => setBodyWeights([]), color: "#f5a623" },
              { label: "Reset all data", action: () => { setWeek(initialWeek(settings.workoutDays)); setWorkoutHistory([]); setTotalWorkouts(0); setStreak(0); setBodyWeights([]); setSavedFoods({ morning: [], lunch: [], dinner: [], snack: [], preWorkout: [], postWorkout: [] }); setExerciseProgress({}); }, color: "#e94560" },
            ].map(btn => (
              <button key={btn.label} onClick={btn.action} style={{ width: "100%", padding: "14px 16px", background: "transparent", border: "none", borderBottom: "1px solid #ffffff08", color: btn.color, fontSize: "13px", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}>
                {btn.label}
              </button>
            ))}
          </div>

          <div style={{ padding: "16px", textAlign: "center", color: "#ffffff20", fontSize: "11px" }}>Fitness Tracker v1.0</div>
        </div>
      )}
    </div>
  );
}
