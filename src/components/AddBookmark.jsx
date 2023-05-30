import { useContext, useState } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import Upload from "./Upload";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBookmark = () => {
    const { bookmarks, addBookmark } = useContext(BookmarksContext);
    // const { bookmarks } = useContext(BookmarksContext);

    // let allCatList = bookmarks.map((item) => item.category);
    // const catList = [...new Set(allCatList)].sort();
    const navigate = useNavigate();

    let allCatList = bookmarks.map((item) => item.category).flat(1);
    const cats = [...new Set(allCatList)].sort();

    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [avatarURL, setAvatarURL] = useState("");
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

    const notify = () =>
        toast.success("Bookmark ajouté !", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });

    const handleAddBookmark = (e) => {
        e.preventDefault();
        addBookmark(name, link, avatarURL, description, category, tags, isFavorite);
        setName("");
        setLink("");
        setDescription("");
        setCategory("");
        setTags("");
        notify();
        // setTimeout(() => {
        // navigate("/");
        // }, 2000);
    };

    const handleCats = (cat) => {
        category.includes(cat)
            ? setCategory((oldValues) => {
                  return oldValues.filter((item) => item !== cat);
              })
            : setCategory([
                  ...category, // that contains all the old items
                  cat, // and one new item at the end
              ]);
        // console.log(category);
    };

    return (
        <>
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
            <div className="container p-3 text-center max-w-xl">
                <div className="text-3xl mb-5 font-title uppercase">Ajouter un raccourci</div>
                <form className="">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Nom"
                            className="input input-bordered input-primary"
                        />
                        <input
                            onChange={(e) => setLink(e.target.value)}
                            value={link}
                            type="text"
                            placeholder="Lien"
                            className="input input-bordered input-primary"
                        />
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            type="text"
                            placeholder="Description"
                            className="input input-bordered input-primary"
                        />
                        <input
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
                            type="text"
                            placeholder="Tags"
                            className="input input-bordered input-primary"
                        />
                    </div>
                    <div className="cats-wrapper my-5">
                        <div className="form-control flex-row">
                            {cats.map((cat, index) => (
                                <div key={index}>
                                    <label className="label cursor-pointer flex-col gap-2 py-0">
                                        <span className="label-text capitalize">{cat}</span>
                                        <input type="checkbox" className="toggle toggle-primary" onChange={() => handleCats(cat)} />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-5" onClick={() => setIsFavorite(!isFavorite)}>
                        <div>Favoris ?</div>
                        <div className="text-red-400 text-2xl cursor-pointer scale-100 transition hover:scale-110">
                            {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </div>
                    </div>
                    <Upload setAvatarURL={setAvatarURL} />
                    <div className="grid grid-cols-2 mt-3 justify-between gap-3">
                        <Link to="/">
                            <div className="btn btn-primary btn-outline w-full">Annuler</div>
                        </Link>
                        <button onClick={handleAddBookmark} className="btn btn-primary w-full">
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBookmark;
