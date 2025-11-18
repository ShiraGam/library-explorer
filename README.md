# 📚 Library Explorer

Library Explorer is a React + TypeScript app that displays a list of books from a local JSON file.
Users can search, filter, sort, and mark favorites.

---
## Features
- **Load data:** From `public/books.json`.
- **Search:** Search: By title or author (case-insensitive), including smart fuzzy matching that finds relevant results even with partial or slightly incorrect input.
- **Filter:** By tag or minimum rating.
- **Reset Filters:** Restores all filters to their default state: clears tag and rating filters, resets sorting to title A-Z, and turns off the favorites-only view, without clearing the search input.
- **Sort:** By title (A-Z / Z-A) or rating (high-low / low-high).
- **Favorites:** Mark/unmark books, saved in `localStorage`, toggle to view favorites only.
- **Accessibility:** Keyboard-friendly and helpful empty states.

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/cb181c3b-0a7c-424f-bc6c-e7c4cf039adb" />

---

## Key Decisions and Tradeoffs

| Topic | Decision | Rationale & Tradeoff |
|-------|---------|--------------------|
| **State Management** | Use React’s built-in `useState` and `useReducer` | **Rationale:** Built-in hooks provide clean and efficient state management for a small project without introducing heavy external dependencies like Redux . **Tradeoff:** Sorting and filtering logic is handled at the main component level, which increases component complexity and requires disciplined state updates and careful structuring. |
| **Data Loading** | Use `fetch` inside `useEffect` in the main component | **Rationale:** Standard approach for initial data loading in small React apps. Handles asynchronous fetching when the component mounts, with proper loading and error state management. **Tradeoff:** Centralized fetching can make the main component heavier. In larger projects, it may be preferable to move fetching to custom hooks or service modules. |
| **Architecture** | Separate filtering and sorting logic from UI components (functional components only) | **Rationale:** Improves code readability and maintainability by distinguishing “container” components (logic) from “presentational” components (UI). Easier to test, reuse, and extend components. **Tradeoff:** Requires careful planning and prop management to avoid overly complex prop drilling. |
| **Initial Data Loading** | Load all books on component mount | **Rationale:** Loading all books at once enables fast client-side filtering, sorting, and searching, and allows favorites to be applied immediately from `localStorage`. **Tradeoff:** For very large datasets, this approach can increase memory usage and initial load time. Pagination or lazy loading may be more suitable in such cases. |

---

## Tech

-React (with Hooks: useState, useEffect) and Fuse.js for fuzzy search  
-TypeScript (Strict)  
-Create React App (CRA)  
-localStorage for storing favorites


---

## Setup

```bash
git clone https://github.com/ShiraGam/library-explorer
cd library-explorer
npm install
npm start
