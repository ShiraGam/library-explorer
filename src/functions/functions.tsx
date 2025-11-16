import {Book} from "../types";

export async function getBooks(): Promise<Book[]> {
    const response = await fetch('/books.json');
    if (!response.ok) throw new Error('Failed to fetch books');
    return await response.json();
}