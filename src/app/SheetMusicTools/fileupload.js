import React from "react";

export default function FileUploader({ setFile }) {
    function handleFileChange(e) {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        
        // Only accept png, jpeg, jpg, and pdf files
        const validTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf", "application/zip","application/xml", "application/octet-stream"]; //octet stream for
        if (!(selectedFile.name.endsWith("mxl") || selectedFile.name.endsWith("xml"))){

            if (!validTypes.includes(selectedFile.type))  {
                console.log("FUCK");
                console.log("Selected file:", selectedFile);
                console.log("File type:", selectedFile.type);
                alert(`Invalid file type ${selectedFile.type}. Please upload an image or a PDF.`);
                return;
            }

        }
       

        setFile(selectedFile); // Send file to parent component
    }

    return (
        <div>
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}                        // PARTWISE XML ONLY FOR OSMD (if we want to let them upload xml)
                accept="image/*, application/pdf, application/xml, application/vnd.recordare.musicxml+xml, .mxl"
                style={{ display: "none" }}
            />
            <button  className="w-fit mt-4 mb-10 px-3 py-2 text-body border-2 border-black bg-white text-black rounded hover:bg-gray-400 duration-300"
            onClick={() => document.getElementById("fileInput").click()}>
                    Upload Image or PDF
            </button>
        </div>
    );
}
