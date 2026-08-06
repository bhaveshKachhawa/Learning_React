import React, { useState } from "react";

const initialComments = [
  {
    id: 1,
    author: "Alex",
    text: "React 19 actions make state handling so much cleaner!",
    replies: [
      {
        id: 2,
        author: "Sarah",
        text: "Agreed! Optimistic updates are game changers for chat apps.",
        replies: [
          {
            id: 3,
            author: "Devin",
            text: "Plus auto-memoization compiler cuts down on useMemo boilerplate.",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    author: "Elena",
    text: "Has anyone benchmarked Virtual Grid vs standard windowing?",
    replies: [],
  },
];

const CommentItem = ({ comment, onAddReply, onDeleteComment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onAddReply(comment.id, replyText);
    setReplyText("");
    setShowReplyBox(false);
  };

  return (
    <div
      style={{
        marginLeft: "20px",
        marginTop: "12px",
        borderLeft: "2px solid #e0e0e0",
        paddingLeft: "12px",
      }}
    >
      {/* Comment Card Body */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "10px 14px",
          borderRadius: "6px",
          border: "1px solid #eee",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "4px",
          }}
        >
          <strong style={{ fontSize: "0.9rem", color: "#0066cc" }}>
            {comment.author}
          </strong>
          <button
            onClick={() => onDeleteComment(comment.id)}
            style={{
              background: "none",
              border: "none",
              color: "#d32f2f",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Delete
          </button>
        </div>
        <p style={{ margin: "0 0 8px 0", fontSize: "0.95rem", color: "#333" }}>
          {comment.text}
        </p>

        {/* Inline Controls */}
        <button
          onClick={() => setShowReplyBox((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            color: "#555",
            cursor: "pointer",
            fontSize: "0.8rem",
            padding: 0,
          }}
        >
          {showReplyBox ? "Cancel" : "💬 Reply"}
        </button>
      </div>

      {/* Inline Reply Input Field */}
      {showReplyBox && (
        <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{
              flex: 1,
              padding: "6px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "0.85rem",
            }}
          />
          <button
            onClick={handleReplySubmit}
            style={{
              padding: "6px 12px",
              background: "#0066cc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            Post
          </button>
        </div>
      )}

      {/* Recursive Children Sub-Tree */}
      {comment.replies && comment.replies.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onAddReply={onAddReply}
              onDeleteComment={onDeleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ThreadedComments = () => {
  const [comments, setComments] = useState(initialComments);
  const [newCommentText, setNewCommentText] = useState("");

  // Immutable Recursive Helper to Insert a Reply at target Parent ID
  const insertReply = (list, parentId, text) => {
    return list.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          replies: [
            ...item.replies,
            { id: Date.now(), author: "You", text, replies: [] },
          ],
        };
      }
      if (item.replies.length > 0) {
        return { ...item, replies: insertReply(item.replies, parentId, text) };
      }
      return item;
    });
  };

  // Immutable Recursive Helper to Delete a Node by ID across depth
  const removeComment = (list, targetId) => {
    return list
      .filter((item) => item.id !== targetId)
      .map((item) => ({
        ...item,
        replies: removeComment(item.replies, targetId),
      }));
  };

  const handleAddTopLevelComment = () => {
    if (!newCommentText.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: Date.now(), author: "You", text: newCommentText, replies: [] },
    ]);
    setNewCommentText("");
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px" }}
    >
      <h3>Nested Threaded Comments</h3>

      {/* Top Level New Comment Box */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Start a discussion thread..."
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAddTopLevelComment}
          style={{
            padding: "8px 16px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Comment
        </button>
      </div>

      {/* Thread Hierarchy Render */}
      <div style={{ marginLeft: "-20px" }}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onAddReply={(parentId, text) =>
              setComments((prev) => insertReply(prev, parentId, text))
            }
            onDeleteComment={(targetId) =>
              setComments((prev) => removeComment(prev, targetId))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ThreadedComments;
