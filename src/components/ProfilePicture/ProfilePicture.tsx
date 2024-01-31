import React from "react";
import { UserData } from "../../types/Models";
import "./ProfilePicture.css"

interface Props {
    userData: UserData;
}

const ProfilePicture: React.FC<Props> = ({userData}) => {
    return (
        <img src={userData.imageData.url} width="45px" height="45px" alt={userData.imageData.alt}/>
    )
}

export default ProfilePicture;