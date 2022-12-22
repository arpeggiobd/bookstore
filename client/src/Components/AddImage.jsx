import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";

function AddImage() {
    const location = useLocation()
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const id = location.state.id._id

    console.log(id)

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);

        };

        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch(`http://localhost:3000/api/upload/${id}`, {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
            alert('Image uploaded successfully')
            navigate('/addlist');

        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
            <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase ">Upload an Image</h1>
            <br />
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <br />
                <br />
                {previewSource && (
                    <img
                        className="px-10"
                        src={previewSource}
                        alt="chosen"
                        style={{ height: '300px' }}
                    />
                )}
                <br />
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-purple-600" type="submit">
                    Submit
                </button>
            </form>


        </div>
    );
}

export default AddImage;