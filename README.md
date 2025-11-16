# 📚 Library Explorer

Library Explorer is a React + TypeScript app that displays a list of books from a local JSON file.
Users can search, filter, sort, and mark favorites.

---
## Features
- **Load data:** From `public/books.json`.
- **Search:** By title or author (case-insensitive).
- **Filter:** By tag or minimum rating.
- **Sort:** By title (A-Z / Z-A) or rating (high-low / low-high).
- **Favorites:** Mark/unmark books, saved in `localStorage`, toggle to view favorites only.
- **Accessibility:** Keyboard-friendly and helpful empty states.

<img width="485" height="283" alt="image" src="https://github.com/user-attachments/assets/cb181c3b-0a7c-424f-bc6c-e7c4cf039adb" />

---

## Tech

- React
- TypeScript (Strict)
- Create React App (CRA)

---

## Setup

```bash
git clone https://github.com/ShiraGam/library-explorer
cd library-explorer
npm install
npm start
