// src/components/CreatePost.js
import './CreatePost.css';
import React, { useState } from "react";
import { db, storage } from "../firebaseConfig"; // Ensure correct import from the updated firebase config
import { useAuth } from "../context/AuthContext"; // For accessing user data
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import required functions from Firebase Storage
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; // Use Firestore's setDoc and serverTimestamp

const CreatePost = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // For text content
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(selectedFile.type)) {
        setError("Please upload an image (JPEG, PNG) or a PDF file.");
        return;
      }
      setFile(selectedFile);
      setError(""); // Reset error if file is valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let contentUrl = "";
    if (file) {
      const storageRef = ref(storage, `posts/${file.name}`);
      await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
      contentUrl = await getDownloadURL(storageRef); // Get the file URL after uploading
    }

    const postId = uuidv4();
    try {
      // Use setDoc instead of db.collection
      await setDoc(doc(db, "posts", postId), {
        postId,
        authorId: user.uid,
        title,
        contentType: file ? (file.type.includes("image") ? "image" : "pdf") : "text",
        content: contentUrl || content,
        tags,
        timestamp: serverTimestamp(), // Use serverTimestamp for Firestore
        likes: [],
        views: 0,
      });

      // Reset fields after submission
      setTitle("");
      setContent("");
      setTags([]);
      setFile(null);
    } catch (err) {
      console.error("Error creating post: ", err);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a Post</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="What do you want to share?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags.join(",")}
        onChange={(e) => setTags(e.target.value.split(","))}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
