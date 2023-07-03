import { useState, useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import BookmarkItem from "./BookmarkItem";
import BookmarksTabs from "./BookmarksTabs";
import SearchBookmark from "./SearchBookmark";

const Homepage = () => {
    const { bookmarks } = useContext(BookmarksContext);
    const [searchText, setSearchText] = useState("");
    bookmarks.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    // console.log(bookmarks);
    let favorites = bookmarks.filter(function (bookmark) {
        return bookmark.isFavorite === true ? bookmark : "";
    });

    return (
        <>
            <div className="container py-2 px-5 mx-auto">
                <SearchBookmark searchText={searchText} setSearchText={setSearchText} />
                {searchText.length === 0 && (
                    <div className="grid grid-cols-4 gap-3 mb-3">
                        {favorites.map((favorite) => (
                            <BookmarkItem key={favorite.id} bookmark={favorite} />
                        ))}
                    </div>
                )}
            </div>
            {searchText.length === 0 && <BookmarksTabs bookmarks={bookmarks} />}
        </>
    );
};

export default Homepage;
