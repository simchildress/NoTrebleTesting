"use client";
import React, { useState, useEffect } from "react";
import FileUploader from "./fileupload";
import SheetMusicInput from "../component/SheetMusicInput"
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged, useAuth } from "firebase/auth";
import { useTTS } from "../context/TTSContext";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function SheetMusicTools() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploading, setUploading] = useState(false);
    const { speakPageContent } = useTTS(); // Get the speakPageContent function from TTSContext

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (!currentUser) {
            router.push("/Login");
            return;
          }
          setUser(currentUser);
        });
        return () => unsubscribe();
    }, [router]);
    
    //Music sheet starts out with 4 properties
    const [sheet, setSheet]=useState({
        title: "",
        composer: "",
        key: "",
        timesig: ""
    });

    //Handle the change when the input changes and assign it to the appropriate field
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setSheet((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    //Prevent resetting the page to default after every input
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    function handleFileChange(selectedFile) {
        setFile(selectedFile);
        
        // Generate preview URL for images/PDFs
        if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile)); 
            handleUpload(selectedFile); // Upload the file to EC2
        } else {
            setPreview(null); // Clear preview if no file is selected
        }
    }

    // Upload the file to the server when triggered
  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("No file selected!");
      return;
    }

    const renamedFile = new File([file], `${user.uid}_${file.name}`, { type: file.type });
    const formData = new FormData();
    formData.append("file", renamedFile); // No need for uid field anymore


    try {
      const response = await fetch("http://3.149.232.240:3000/upload", {
        method: "POST",
        body: formData, // Send FormData containing the file
      });

      if (response.ok) {
        setUploadStatus("File uploaded successfully!");
        const isXml = file.name.endsWith(".xml");
        if(!isXml){
            const convertResponse = await fetch("http://3.149.232.240:3000/convert", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  uid: user.uid,
                  filename: file.name,
                }),
              });
              if (convertResponse.ok) {
                setUploadStatus("File converted successfully!");
              } else {
                const errText = await convertResponse.text();
                setUploadStatus(`Conversion failed: ${errText}`);
              }
            } else {
              setUploadStatus("XML file uploaded. No conversion needed.");
            }
         } else {
            setUploadStatus("Upload failed. Please try again.");
          }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file.");
    }
    finally{
        setUploading(false);
    }
  };
    
    useEffect(() => {
        speakPageContent(); // Speak the page content when the component is mounted
    }, []); 

    return (
        <main>
            <div className="m-20">
                <h1 className="font-bold mb-7" style={{fontSize: 'calc(var(--h3-text-size) + 8px)'}}>Sheet Music Reader</h1>
                
                {/* Responsive Container */}
                <div className="w-auto h-auto bg-gray-200 -z-10 rounded-2xl text-body p-4 pl-7 flex flex-col md:flex-row border-2 border-gray-400">
                    
                    {/* Left Section: File Upload + Info */}
                    <div className="md:w-1/2 flex flex-col justify-between p-4">
                        <FileUploader setFile={handleFileChange} />

                        {/* Info Section (Anchored to Bottom) */}
                        <div className="mt-auto text-left md:text-4xl text-body">
                            <p className="pb-3">Piece Title: </p>
                            <p className="pb-3">Key: </p>
                            <p className="pb-3">Time Signature: </p>
                            <p className="pb-3">Composer: </p>
                        </div>
                    </div>

                    {/* Right Section: Image/PDF Preview */}
                    <div className="w-1/2 p-4 align-top shrink">
                            {preview ? (
                                file.type === "application/pdf" ? (
                                    <embed src={preview} type="application/pdf"  className="w-full h-full max-h-full object-contain"/>
                                ) : (
                                    <img src={preview} alt="Preview" className="w-full h-full max-h-full object-contain rounded" />
                                )
                            ) : (
                                <span className="text-gray-500">No file uploaded</span>
                            )}
                           
                    </div>
                </div>
            <div>
        <button onClick={handleUpload}disabled={uploading}>
        {uploading ? 'Saving...' : 'Save File'}
        </button>
      </div>
        <div>
        {uploadStatus && <p>{uploadStatus}</p>}
         </div>
         <Link href="SheetMusicTools/MusicLibrary">
                <button>🎵 Go to Music Library</button>
            </Link>
            </div>

            <br />
            <div className="ml-20 mr-20 mb-20">
                <h1 className="font-bold mb-7" style={{fontSize: 'calc(var(--h3-text-size) + 8px)'}}>Sheet Music Composer</h1>
                <form className= "block inset-2 bg-gray-200 -z-10 rounded-2xl p-4 pl-7 text-3xl border-2 border-gray-400">
                    <label className="mt-5 ">
                        Enter Title:
                        <SheetMusicInput 
                            type="text"
                            name="title"
                            value={sheet.title}
                            onChange={handleChange}
                        />
                    </label>
                    <label className="mt-5">
                        Enter Composer Name:
                        <SheetMusicInput
                            type="text" 
                            name="composer"
                            value={sheet.composer}
                            onChange={handleChange}  
                        />
                    </label>
                    <label className="mt-5">
                        Enter Key:
                        <SheetMusicInput
                            type="text" 
                            name="key"
                            value={sheet.key}
                            onChange={handleChange} 
                        />
                    </label>
                    <label className="mt-5">
                        Enter Time Signature:
                        <SheetMusicInput
                            type="text" 
                            name="timesig"
                            value={sheet.timesig}
                            onChange={handleChange}  
                        />
                    </label>
                </form>
            </div>
        </main>
    );
}