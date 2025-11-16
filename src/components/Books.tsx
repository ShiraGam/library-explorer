import {Book} from "../types";
import React from "react";

interface BooksProps {
    books: Book[];
    favorites: Book[];
    toggleFavorite: (book: Book) => void;
}

export const Books: React.FC<BooksProps> = ({ books, favorites, toggleFavorite }) => {
    if (books.length === 0) return <p>No books found.</p>;

    return (
        <ul className="book-list">
            {books.map((book) => (
                <li key={book.id} className="book-item">
                    <span
                        className="favorite"
                        onClick={() => toggleFavorite(book)}
                        aria-label={favorites.some((b) => b.id === book.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {favorites.some((b) => b.id === book.id) ? '⭐' : '☆'}
                    </span>
                    <div>
                        <strong>{book.title}</strong> by {book.author} ({book.year}) — Rating: {book.rating}
                        <br />
                        <small>Tags: {book.tags.join(', ')}</small>
                    </div>
                </li>
            ))}
        </ul>
    );
};
