// import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { Posts } from "../../dummyData";
import Post from '../post/Post';
import { useEffect, useState } from 'react';
import axiosinstance from '../../config/axios';

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const userid = "62b47b0f2d02905cc005f1cb";

  const fetchFeed = async () => {
    const data = username
    ? await axiosinstance.get(`/posts/profile/${username}`)
      : await axiosinstance.get(`/posts/timeline/${userid}`)
      console.log(data.data);
    setPosts(data.data);
  }

  useEffect(() => {
    fetchFeed()
  }, [])


  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post username={username}t key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
