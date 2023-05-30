import { useState } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FaUpload } from "react-icons/fa";

function Upload({ setAvatarURL }) {
    // State to store uploaded file
    const [file, setFile] = useState(""); // progress

    const [percent, setPercent] = useState(0); // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
    const handleUpload = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Merci de choisir une image!");
        }
        const storageRef = ref(storage, `/bookmarks/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100); // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setAvatarURL(url);
                });
            }
        );
    };
    return (
        <div className="flex items-center">
            <input type="file" className=" w-full file-input file-input-bordered file-input-primary" onChange={handleChange} accept="/image/*" />
            <button className="btn btn-primary my-2 mx-2" onClick={handleUpload}>
                <FaUpload />
            </button>
            {percent > 0 && (
                <>
                    <progress className="progress progress-primary w-56" value={percent} max="100"></progress>
                    <div className="text-primary mb-2 font-semibold">{percent}%</div>
                </>
            )}
        </div>
    );
}
export default Upload;
