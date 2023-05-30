import { FaPlusCircle, FaPencilAlt, FaCheck, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { BookmarksContext } from "../context/BookmarksContext";
import { UserAuth } from "../context/AuthContext";

const Header = () => {
    const { handleEditMode, editMode } = useContext(BookmarksContext);
    const { user } = UserAuth();
    // console.log(user);
    return (
        <div className="flex justify-end py-3 px-8 gap-3 items-center">
            <Link to="add" className="text-3xl text-primary hover:text-white">
                <FaPlusCircle />
            </Link>
            <div onClick={handleEditMode} className={`text-3xl ${editMode ? "text-green-400" : "text-primary"}  hover:text-white cursor-pointer`}>
                {editMode ? <FaCheck /> : <FaPencilAlt />}
            </div>
            <div className="w-10 rounded-full">
                <Link to="profile">
                    {user?.photoURL ? (
                        <img
                            className="w-10 h-10 grid place-items-center bg-primary text-lg rounded-full object-cover border border-2 border-primary"
                            src={user.photoURL}
                            alt=""
                        />
                    ) : (
                        <div className="w-10 h-10 grid place-items-center bg-primary text-lg rounded-full ">
                            <FaUserAlt />
                        </div>
                    )}
                </Link>
            </div>
            {/* <Link to="/">Home</Link> */}
        </div>
    );
};

export default Header;
