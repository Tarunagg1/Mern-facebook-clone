import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from '../../components/rightsidebar/Rightbar';
import { useEffect, useState } from 'react';
import axiosinstance from '../../config/axios';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const [user, setUser] = useState({});
    const params = useParams();

    const fetchProfile = async () => {
        const res = await axiosinstance.get(`/users?username=${params?.username}`);
        setUser(res.data);
    }

    useEffect(() => {
        fetchProfile()
    }, []);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src="/assets/post/3.jpeg"
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src="/assets/person/7.jpeg"
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user?.username}</h4>
                            <span className="profileInfoDesc">{user?.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={params?.username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
