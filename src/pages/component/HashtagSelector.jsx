import React from "react";
import "./HashtagSelector.css";

export default function HashtagSelector({ selectedTags, onTagsChange }) {
  const tags = [
    "공부",
    "자기계발",
    "취미",
    "체력향상",
    "도전정신",
    "자기관리",
    "성취",
    "집중력",
    "성장",
  ];

  const toggleTag = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  return (
    <div className="hashtag-container">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`hashtag ${selectedTags.includes(tag) ? "selected" : ""}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}