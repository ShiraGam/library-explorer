import {Tag} from "../types";
const MIN_RATING = 0;
const MAX_RATING = 5;

interface FiltersProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedTag: Tag | '';
    setSelectedTag: (value: Tag | '') => void;
    minRating: number;
    setMinRating: (value: number) => void;
    sortField: 'title' | 'rating';
    setSortField: (value: 'title' | 'rating') => void;
    sortOrder: 'asc' | 'desc';
    setSortOrder: (value: 'asc' | 'desc') => void;
    showFavoritesOnly: boolean;
    setShowFavoritesOnly: (value: boolean) => void;
    allTags: Tag[];
    resetFilters: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
                                             searchQuery,
                                             setSearchQuery,
                                             selectedTag,
                                             setSelectedTag,
                                             minRating,
                                             setMinRating,
                                             sortField,
                                             setSortField,
                                             sortOrder,
                                             setSortOrder,
                                             showFavoritesOnly,
                                             setShowFavoritesOnly,
                                             allTags,
                                             resetFilters,
                                         }) => {


    return (
        <div className="filters">
            <div className="filter-row">
                <label htmlFor="search">Search by title or author:</label>
                <input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                />
            </div>

            <div className="filter-row">
                <label htmlFor="tag">Filter by tag:</label>
                <select id="tag" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value as Tag)}>
                    <option value="">All tags</option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>

                <label htmlFor="rating">Min Rating:</label>
                <input
                    id="rating"
                    type="number"
                    min={0}
                    max={5}
                    step={0.5}
                    value={minRating}
                    onChange={(e) => {
                        let value = Number(e.target.value);
                        // Clamp the value between MIN_RATING and MAX_RATING
                        if (value < MIN_RATING) value = MIN_RATING;
                        if (value > MAX_RATING) value = MAX_RATING;
                        setMinRating(value);
                    }}
                />
            </div>

            <div className="filter-row">
                <label htmlFor="sortField">Sort by:</label>
                <select id="sortField" value={sortField} onChange={(e) => setSortField(e.target.value as 'title' | 'rating')}>
                    <option value="title">Title</option>
                    <option value="rating">Rating</option>
                </select>

                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="filter-row">
                <label>
                    <input
                        type="checkbox"
                        checked={showFavoritesOnly}
                        onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    />
                    Show favorites only
                </label>
            </div>

            <button className="reset-btn" onClick={resetFilters}>Reset Filters</button>
        </div>
    );
};
