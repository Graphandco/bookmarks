import { createContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { query, collection, onSnapshot, doc, addDoc, deleteDoc, orderBy, updateDoc, serverTimestamp } from "firebase/firestore";

export const BookmarksContext = createContext({
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmark: () => {},
    handleEditMode: () => {},
    editMode: false,
});

function BookmarksContextProvider({ children }) {
    // const cats = ["favoris", "dev", "vidéo", "google"];
    const [bookmarks, setBookmarks] = useState([]);
    const [editMode, setEditMode] = useState(false);

    //EDIT MODE
    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    //GET NOTES
    useEffect(() => {
        const q = query(
            collection(db, "bookmarks")
            // , orderBy("isChecked", "asc")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let bookmarksArr = [];
            querySnapshot.forEach((doc) => {
                bookmarksArr.push({ ...doc.data(), id: doc.id });
            });
            setBookmarks(bookmarksArr);
            // console.log(foodsArr);
            /**/
        });
        return () => unsubscribe();
    }, []);

    //ADD BOOKMARK
    const addBookmark = async (name, link, image, description, category, tags, isFavorite) => {
        await addDoc(collection(db, "bookmarks"), {
            name,
            link,
            image,
            description,
            category,
            tags,
            isFavorite,
            createdAt: new Date(),
        });
    };

    // DELETE BOOKMARK
    const deleteBookmark = async (bookmarkId) => {
        await deleteDoc(doc(db, "bookmarks", bookmarkId));
    };

    // // FAVORIS
    // const handleChecked = async (bookmarkId, isChecked) => {
    //     await updateDoc(doc(db, "bookmarks", bookmarkId), {
    //         isChecked: isChecked,
    //     });
    // };

    const value = {
        bookmarks: bookmarks,
        addBookmark: addBookmark,
        deleteBookmark: deleteBookmark,
        editMode: editMode,
        handleEditMode: handleEditMode,
        // cats: cats,
        // handleChecked: handleChecked,
    };
    // console.log(bookmarks);

    return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export default BookmarksContextProvider;
