import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import { FaTrashAlt, FaHeart } from "react-icons/fa";

const BookmarkItem = ({ bookmark }) => {
    const { id, name, description, image, link } = bookmark;
    const { editMode, deleteBookmark } = useContext(BookmarksContext);

    const handleDelete = (id) => {
        deleteBookmark(id);
    };

    return (
        <div>
            <a
                href={link}
                data-tip={description}
                className={`${description && "tooltip"} tooltip-primary backdrop-blur-sm bg-white/5 p-3 rounded-lg flex items-center gap-2 hover:bg-white/10`}
            >
                <img src={image} alt="name" className="w-4" />
                <div>{name}</div>
            </a>
            {editMode && (
                <div className="flex items-center ">
                    <button className="btn btn-primary gap-2" onClick={() => handleDelete(id)}>
                        Supprimer <FaTrashAlt />
                    </button>
                    {/* <button className="btn btn-primary gap-2" onClick={() => handleDelete(id)}>
                        Supprimer <FaHeart />
                    </button> */}
                </div>
            )}
        </div>
    );
};

export default BookmarkItem;
