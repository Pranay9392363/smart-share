import './Feed.css';
import React from "react";
import Pdfcomp from './PDF/Pdfcomp';
import './Post.css';

const Post = ({ post }) => {
  const { title, content, contentType, tags, timestamp, views, likes } = post;

  const renderContent = () => {
    switch (contentType) {
      case "image":
        return <img src={content} alt={title} className="post-image" />;
      case "pdf":
        return (
          <div>
            <a href={content} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
            <Pdfcomp file={content} />
          </div>
        );
      default:
        return <p>{content}</p>;
    }
  };

  return (
    <div className="post">
      <h3>{title}</h3>
      {renderContent()}
      <div className="tags">
        {tags?.map((tag, index) => (
          <span key={index}>#{tag.trim()}</span>
        ))}
      </div>
      <div className="post-info">
        <p>Views: {views}</p>
        <p>Likes: {likes?.length}</p>
        <p>{timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : "No Date"}</p>
      </div>
    </div>
  );
};

export default Post;
