# React Product Dashboard

A React-based Admin Dashboard showcasing products with features like sortable & draggable tables, cart system, and modal views. Built for scalability and reusability.

# Setup Steps
1. Clone the repository
   https://github.com/webKanchan1234/h2s-assignment.git
   cd h2s-assignment

2. Install dependencies
   npm install

3. Run development server
   npm run dev
   
5. Build for production
   npm run build

# Feature Overview

1. Admin Dashboard features:-
   
   Header with navigation, search bar, cart and profile image
   Stats cards (Products, Revenue, Stock, Categories)

2. Product Table
   Columns: ID, Image, Name, Category, Price, Stock, Status
   Pagination (10/20/30/50 per page)
   Sorting (ASC/DESC)
   Drag-and-drop column reordering
   Actions (Add to Cart, View, Edit, Delete)

3. Cart

   Add/Remove/Update quantity
   Slide-out sidebar cart
   Auto-calculated total price
   In-memory state (using useReducer + Context)

4. Modal
   View product details in a clean, responsive modal

5. Utilities
   Search index for faster lookups
   Debounce hook for search input


# Optimizations
  
  Lazy Loading images with loading="lazy"
  useMemo for expensive computations (sorting, pagination, filtering)
  useReducer + Context for scalable cart management
  Drag & Drop with state persistence
  Reusable Components (Modal, RowActions, ColumnHeader)


# Time Tracking (per feature)

  Project setup + structure takes approximately 40 mins
  
  Header and Stats take ~ 1hr
  
  Simple product table creation take ~ 1hr
  
  Sorting and pagination takes ~ 1.5hrs
  
  Drag and drop columns takes ~ 1.5hrs
  
  Cart functionality like sidebar, close, context api setup, etc takes  ~ 2hrs
  
  Model view for view details takes ~ 1hr
  
  Search & filter functionality takes ~ 1.5hrs
  
  bugs fixing takes ~ 1hr



# Challenges & Solutions

1. State Management for Cart

   Challenge:
   Managing cart like add to cart, updates quantity, total price calculation is very difficult to manage, passing datas in nested component

   Solutions:
   I implemented context api and useReducer for managing the data, no need to pass data in nested, with the help of context api, I can access in any component

2. Drag & Drop Table Columns

   Challenge:
   Smooth column reordering without losing state.

   Solution:
   Used onDragStart, onDrop, and useState for column order persistence.

3. Search Performance
   
   Challenge:
   Searching large datasets quickly.
   
   Solution:
   Create useDebounce for avoiding the api call on every input field

4. Reusable UI Components
  
   Challenge:
   In many components have duplicate codes

   Solution:
   Created reusable component like model to avoid duplicate code











   


  
