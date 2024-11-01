// src/components/Feed.js
import './Feed.css';
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig.js"; // Firestore instance
import { collection, getDocs, orderBy, query } from "firebase/firestore"; // Firestore functions
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsQuery = query(postsCollection, orderBy("timestamp", "desc")); // Order by timestamp
        const querySnapshot = await getDocs(postsQuery);
        
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed">
      
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map(post => <Post key={post.id} post={post} />)
      )}
    </div>
  );
};

export default Feed;
