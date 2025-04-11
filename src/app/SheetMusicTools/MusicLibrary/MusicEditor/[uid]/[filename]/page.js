"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function MusicEditor({ params }) {
    const router = useRouter();
    console.log('Received params:', params); // Will show in terminal

    const { uid, filename } = use(params);

    const [xmlData, setXmlData] = useState("");
    const [userId, setUserId] = useState("");

    // Authenticate the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.alert("Please log in to use this feature");
                router.push("/Login");
                return;
            }
            setUserId(user.uid);
        });

        return () => unsubscribe();
    }, [router]);

    // Fetch XML data after authentication
    useEffect(() => {
        if (uid && filename && userId) {
            async function fetchXml() {
                try {
                    const response = await fetch(
                        `http://3.14.250.162:3000/getxml/${uid}/${filename}`
                    );
                    const xml = await response.text();
                    setXmlData(xml);
                } catch (error) {
                    console.error("Error loading XML:", error);
                }
            }
            fetchXml();
        }
    }, [uid, filename, userId]);

    useEffect(() => {
        if (xmlData) {
            const osmdContainer = document.getElementById("osmdContainer"); // Fetch DOM element
            if (osmdContainer) {
                const osmd = new OpenSheetMusicDisplay(osmdContainer);
                osmd.load(xmlData).then(() => osmd.render());
            }
        }
    }, [xmlData]);

    return (
        <div>
            <h1>Editing: {filename}</h1>
            <Link href="/SheetMusicTools/MusicLibrary">
                <button>⬅️ Back to Library</button>
            </Link>
            <div id="osmdContainer"></div>
        </div>
    );
}
