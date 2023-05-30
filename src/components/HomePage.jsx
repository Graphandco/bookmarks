import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import BookmarkItem from "./BookmarkItem";
import BookmarksTabs from "./BookmarksTabs";

const Homepage = () => {
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

    // console.log(bookmarks);
    let favorites = bookmarks.filter(function (bookmark) {
        return bookmark.isFavorite === true ? bookmark : "";
    });

    return (
        <>
            <div className="container p-5 mx-auto">
                <div className="grid grid-cols-4 gap-3">
                    {favorites.map((favorite) => (
                        <BookmarkItem key={favorite.id} bookmark={favorite} />
                    ))}
                </div>
            </div>
            <BookmarksTabs bookmarks={bookmarks} />
        </>
    );
};

export default Homepage;
