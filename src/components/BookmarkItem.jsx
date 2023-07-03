import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import { FaTrashAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookmarkItem = ({ bookmark }) => {
    const { id, name, description, image, link, isFavorite } = bookmark;
    const { editMode, deleteBookmark, handleFavorite } = useContext(BookmarksContext);

    const handleDelete = (id) => {
        deleteBookmark(id);
    };

    const notify = (message) =>
        toast.success(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });

    const CustomTag = editMode ? "div" : "a";

    const toggleFavorite = () => {
        handleFavorite(id, !isFavorite);
        notify(isFavorite ? "Supprimé des favoris" : "Ajouté aux favoris");
    };

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
            <CustomTag
                href={link}
                data-tip={description}
                className={`${
                    description && "tooltip"
                } tooltip-primary backdrop-blur-sm bg-white/5 p-3 rounded-lg flex items-center justify-between gap-2 hover:bg-white/10`}
            >
                <div className="flex gap-2">
                    {/* <img src={image} alt="name" className="w-6 object-contain" /> */}
                    <img src={`https://www.google.com/s2/favicons?domain=${link}&sz=128`} alt="name" className="w-6 object-contain" />
                    <div>{name}</div>
                </div>
                {editMode && (
                    <div className="flex items-center gap-2">
                        <button className="text-white text-lg" onClick={() => handleDelete(id)}>
                            <FaTrashAlt />
                        </button>

                        <button className="text-red-500 text-lg" onClick={toggleFavorite}>
                            {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </button>
                    </div>
                )}
            </CustomTag>
        </div>
    );
};

export default BookmarkItem;
