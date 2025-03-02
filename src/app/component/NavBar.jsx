import React from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import "../cs/NavBar.css"
function NavBar() {
  
  return (<nav className="nav-bar">
    <div className=" overdiv flex flex-row  items-center ">
      <Image aria-hidden src="/globe.svg" alt="Globe icon" width={75} height={75}  className="self-center navLogo"/>
      <ul className="nav-list flex flex-end">
        <li>
          <NavLink href="/" activeClassName="bubble" nonActiveClassName="">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink href="/Lessons" activeClassName="bubble" nonActiveClassName="">
          Lessons
          </NavLink>
        </li>
        <li>
          <NavLink href="/SheetMusicTools" activeClassName="bubble" nonActiveClassName="">
          Sheet Music Tools
          </NavLink>
        </li>
        <li>
          <NavLink href="/Community" activeClassName="bubble" nonActiveClassName="">
          Community
          </NavLink>
        </li>
      </ul>
      { /* TODO do some magic to show login or profile, but not both */}
      <div className="profile-div self-center">
      <NavLink href="/Login" activeClassName="btn-primary self-center" nonActiveClassName="btn-primary self-center">
          Log in
          </NavLink>
        
        { /* TODO Hide settings into profile page or side bar*/}
        {/* <Link className="btn-primary"href="/Profile">Profile</Link>
        <Link href="/Profile/Settings">Settings</Link>  */}
      </div>
    </div>
  </nav>);
}
export default NavBar

