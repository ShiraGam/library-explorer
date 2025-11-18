import React, { useEffect, useState } from 'react';
import './App.css';
import Fuse from 'fuse.js';
import { Book, Tag } from './types';
import {Books} from "./components/Books";
import {Filters} from "./components/Filters";
import {getBooks} from "./functions/functions";


function App() {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<Tag | ''>('');
    const [minRating, setMinRating] = useState(0);
    const [sortField, setSortField] = useState<'title' | 'rating'>('title');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [favorites, setFavorites] = useState<Book[]>([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    useEffect(() => {
        async function fetchBooks() {
            try {
                setLoading(true);
                setError('');
                const data = await getBooks();
                setBooks(data);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
                else setError('Unknown error');

            } finally {
                setLoading(false);
            }
        }

        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            try {
                const favArray = JSON.parse(storedFavorites);
                if (Array.isArray(favArray)) setFavorites(favArray);
            } catch {}
        }

        fetchBooks();
    }, []);

    // --- Filter & Sort Logic ---
    useEffect(() => {
        let tempBooks = [...books];

        if (searchQuery) {
            const query = searchQuery.trim();
            const fuse = new Fuse<Book>(tempBooks, {
                keys: ['title', 'author'],
                threshold: 0.3,
             });
            const result = fuse.search(query);
            tempBooks = result.map(r => r.item); 
        }

        if (selectedTag) tempBooks = tempBooks.filter((b) => b.tags.includes(selectedTag as Tag));

        tempBooks = tempBooks.filter((b) => b.rating >= minRating);

        if (showFavoritesOnly) tempBooks = tempBooks.filter((b) => favorites.some((f) => f.id === b.id));

        tempBooks.sort((a, b) => {
            if (sortField === 'title') return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        });

        setFilteredBooks(tempBooks);
    }, [books, searchQuery, selectedTag, minRating, sortField, sortOrder, favorites, showFavoritesOnly]);

    const toggleFavorite = (book: Book) => {
        let newFav: Book[];
        if (favorites.some((b) => b.id === book.id)) {
            newFav = favorites.filter((b) => b.id !== book.id);
        } else {
            newFav = [...favorites, book];
        }
        setFavorites(newFav);
        localStorage.setItem('favorites', JSON.stringify(newFav));
    };

    const allTags: Tag[] = Array.from(new Set(books.flatMap((b) => b.tags))) as Tag[];

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedTag('');
        setMinRating(0);
        setSortField('title');
        setSortOrder('asc');
        setShowFavoritesOnly(false);
    };

    return (
        <div className="App">

            

            <h1>Library Explorer</h1>

            <Filters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                minRating={minRating}
                setMinRating={setMinRating}
                sortField={sortField}
                setSortField={setSortField}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                showFavoritesOnly={showFavoritesOnly}
                setShowFavoritesOnly={setShowFavoritesOnly}
                allTags={allTags}
                resetFilters={resetFilters}
            />

            {loading && <p>Loading books...</p>}
            {error && <p className="error">{error}</p>}

            <Books books={filteredBooks} favorites={favorites} toggleFavorite={toggleFavorite} />
        </div>
    );
}

export default App;
