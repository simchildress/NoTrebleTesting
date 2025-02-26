import React from "react";
import Link from "next/link";
import Image from "next/image";
import "../css/NavBar.css"

function NavBar() {
  return (<nav className="nav-bar">
    <div className=" flex justify-between flex-row gap-30  items-center ">
      <Image aria-hidden src="/globe.svg" alt="Globe icon" width={75} height={75}  className="self-end"/>
      <ul className="nav-list flex gap-14 self-center">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/Lessons">Lessons</Link></li>
        <li><Link href="/SheetMusicTools">Sheet Music Tools</Link></li>
        <li><Link href="/Community">Community</Link></li>
      </ul>
      { /* TODO do some magic to show login or profile, but not both */}
      <div className="self-start flex-end">
        <Link className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" href="/Login"
        >
          Login
        </Link>
        <Link className="btn-primary"href="/Profile">Profile</Link>
        <Link href="/Profile/Settings">Settings</Link> { /* TODO Hide settings into profile page or side bar*/}
      </div>
    </div>
  </nav>);
}
export default NavBar

