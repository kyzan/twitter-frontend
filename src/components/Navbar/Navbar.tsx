import React from "react";
import { ButtonData, TweetData, UserData } from "../../types/Models";
import './Navbar.css'

import ProfilePicture from "../ProfilePicture/ProfilePicture"

interface NavbarData {
    buttonData: ButtonData[];
    userData: UserData;
    tweetButton: ButtonData;
}

interface ElementData {
    element: ButtonData
}

interface TweetButtonData {
    tweetButton: ButtonData;
    tweet?: TweetData;
}

interface LoggedInUser {
    userData: UserData
}

const Navbar: React.FC<NavbarData> = ({buttonData, userData, tweetButton}) => {
    return (
        <>
        <ul className="navbar">
            {
                buttonData.map(element => (
                    <NavbarElement element={element} />
                ))
            }
            <li className="navbar-element"><TweetButton tweetButton={tweetButton}/></li>
            <LoggedInCard userData={userData} />
        </ul>

        </>
    )
}

const NavbarElement: React.FC<ElementData> = ({element}) => {
    return (
        <>
        <li className="navbar-element">
            <img className="invert-logo" src={element.icon?.url} width="24px" height="24px"/>
            <h4><a href="/">{element.buttonText}</a></h4>
        </li>
        </>
    )
}

const TweetButton: React.FC<TweetButtonData> = ({tweetButton}) => {
    return (
        <button className="tweet-btn">{tweetButton.buttonText}</button>
    )
}

const LoggedInCard: React.FC<LoggedInUser> = ({userData}) =>{
    return (
        <div className="card">
            <ProfilePicture userData={userData} />
            <div className="card-text">
                <h5 className="user-name">{userData.userName}</h5>
                <h6 className="user-id">{userData.userId}</h6>
            </div>
        </div>
    )
}

export default Navbar;
export {TweetButton};