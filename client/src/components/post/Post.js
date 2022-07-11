import "./post.css";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Users } from "../../dummyData";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axiosinstance from '../../config/axios';
import { useEffect } from 'react';

export default function Post({ post, username }) {
  const [like, setLike] = useState(post.like)
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }


  const fetchProfile = async () => {
    const res = await axiosinstance.get(`/users?userId=${post?.userId}`);
    setUser(res.data);
  }

  useEffect(() => {
    fetchProfile()
  }, []);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/100`}>
              <img
                className="postProfileImg"
                // src={Users.filter((u) => u.id === post?.userId)[0]?.profilePicture}
                src="/assets/post/1.jpeg"
                alt=""
              />
            </Link>
            <span className="postUsername">
              {username}
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVertOutlinedIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src="/assets/post/3.jpeg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
