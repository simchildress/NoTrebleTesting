"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function MusicEditor({ params }) {
    const router = useRouter();
    const { uid, filename } = use(params); // unwraps the params Promise
    const [xmlData, setXmlData] = useState("");
    const [userId, setUserId] = useState("");
    const [osmd, setosmd] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                alert("Please log in to use this feature");
                router.push("/Login");
                return;
            }
            setUserId(user.uid);
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (uid && filename && userId) {
            async function fetchXml() {
                try {
                    const response = await fetch(`/api/getxml/${uid}/${filename}`);
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
            const osmdContainer = document.getElementById("osmdContainer");
            if (osmdContainer) {
                const osmd = new OpenSheetMusicDisplay(osmdContainer, {
                    autoResize: true,
                    pageFormat: "A4_P"
                });
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
            <div id="osmdContainer" style={{ width: "100%", height: "600px" }}></div>
        </div>
    );
}
