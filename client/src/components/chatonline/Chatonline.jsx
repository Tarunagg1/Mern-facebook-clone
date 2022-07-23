import axios from "axios";
import { useEffect, useState } from "react";
import "./chatonline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    //   const [friends, setFriends] = useState([]);
    //   const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img
                        className="chatOnlineImg"
                        src={
                            PF + "person/noAvatar.png"
                        }
                        alt="chat online user"
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{'tarun'}</span>
            </div>
        </div>
    );
}
