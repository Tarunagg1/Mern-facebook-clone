// import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import Post from '../post/Post';
import { useContext, useEffect, useState } from 'react';
import axiosinstance from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);


  const userid = user._id;

  const fetchFeed = async () => {
    const data = username
      ? await axiosinstance.get(`/posts/profile/${username}`)
      : await axiosinstance.get(`/posts/timeline/${userid}`)
    setPosts(
      data.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  }

  useEffect(() => {
    fetchFeed()
  }, [username, userid])


  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post username={username} t key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
