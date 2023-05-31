import { useContext, useState } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import BookmarkItem from "./BookmarkItem";

const BookmarksTabs = ({ bookmarks }) => {
    // const { bookmarks } = useContext(BookmarksContext);
    const [catActive, setCatActive] = useState("tous");

    let allCatList = bookmarks.map((item) => item.category).flat(1);
    const catList = [...new Set(allCatList)].sort();

    let catsToShow = bookmarks.filter(function (bookmark) {
        return bookmark.category?.includes(catActive) ? bookmark : "";
    });

    // const showAllBookmarks

    catsToShow.sort(function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });

    return (
        <div className="container p-5 mx-auto">
            <div className="tabs mb-5 flex justify-center">
                <div onClick={() => setCatActive("tous")} className={`tab tab-bordered capitalize ${catActive === "tous" && "tab-active"}`}>
                    <div className="font-semibold">Tous</div>
                </div>
                {catList.map((cat, index) => (
                    <div key={index} onClick={() => setCatActive(cat)} className={`tab tab-bordered  capitalize ${cat === catActive && "tab-active"}`}>
                        <div className="font-semibold">{cat}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-4 gap-3">
                {catsToShow.map((favorite) => (
                    <BookmarkItem key={favorite.id} bookmark={favorite} />
                ))}
                {catActive === "tous" && (
                    <>
                        {bookmarks.map((bookmark) => (
                            <BookmarkItem key={bookmark.id} bookmark={bookmark} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookmarksTabs;
