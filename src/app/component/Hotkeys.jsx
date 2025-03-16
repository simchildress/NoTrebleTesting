"use client"
import { useHotkeys } from 'react-hotkeys-hook'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const HotKeyProvider = () => {
    const router = useRouter();
    useHotkeys('ctrl+[', () => { router.push("/") })
    useHotkeys('ctrl+]', () => { router.push("/Lessons") })
    useHotkeys('ctrl+;', () => { router.push("/SheetMusicTools") })
    useHotkeys("ctrl+'", () => { router.push("/Community") })
    return (
        <>
        </>
    )
}
export default HotKeyProvider