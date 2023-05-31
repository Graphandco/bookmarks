import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import BookmarkItem from "./BookmarkItem";

const SearchBookmark = () => {
    const [searchText, setSearchText] = useState("");
    const { bookmarks } = useContext(BookmarksContext);
    bookmarks.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const results = bookmarks.filter((bookmark) => {
        normalizeText(searchText);
        const normalizedBookmarkName = normalizeText(bookmark.name);
        return normalizedBookmarkName.includes(searchText.toLowerCase()) ? bookmark : "";
    });

    return (
        <div>
            <div className="flex justify-center mb-5">
                <div className="relative">
                    <input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        placeholder="Rechercher..."
                        className="input input-primary input-bordered input-md w-64"
                    />
                    <div className="absolute top-0 right-0 h-full bg-white/5 rounded grid place-content-center p-3 cursor-pointer hover:bg-white/10 transition">
                        <FaTimes className="text-red-500" onClick={() => setSearchText("")} />
                    </div>
                </div>
            </div>
            {searchText.length > 0 && (
                <div className="grid grid-cols-4 gap-3 bg-primary/20 p-5 rounded mb-20">
                    {results.map((favorite) => (
                        <BookmarkItem key={favorite.id} bookmark={favorite} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBookmark;
