import React, { useState, useEffect } from 'react';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';

const Comments = ({ tourId, currentUser }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the tour
    fetch(`https://yiaki-tours.onrender.com/tours/${tourId}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error('Failed to fetch comments:', err));
  }, [tourId]);

  const handleCommentSubmit = (data) => {
    // Post new comment or reply
    fetch(`https://yiaki-tours.onrender.com/tours/${tourId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((newComment) => setComments([...comments, newComment]))
      .catch((err) => console.error('Failed to post comment:', err));
  };

  return (
    <CommentSection
      currentUser={currentUser}
      commentData={comments}
      onSubmitAction={handleCommentSubmit}
      logIn={{
        onLogin: () => alert('Please log in to comment.'),
        signUpLink: '/signup',
      }}
    />
  );
};

export default Comments;
