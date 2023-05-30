import { AuthContextProvider } from "./context/AuthContext";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Homepage from "./components/Homepage";
import BookmarksContextProvider from "./context/BookmarksContext";
import AddBookmark from "./components/AddBookmark";

function App() {
    return (
        <>
            <AuthContextProvider>
                <BookmarksContextProvider>
                    <BrowserRouter>
                        <img src="./bg.jpg" alt="background" className=" object-cover w-full h-full fixed -z-10" />
                        <Header />
                        <Routes>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/add" element={<AddBookmark />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </BrowserRouter>
                </BookmarksContextProvider>
            </AuthContextProvider>
        </>
    );
}

export default App;
