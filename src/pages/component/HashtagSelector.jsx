import React, { useState } from "react";
import "./HashtagSelector.css";

export default function HashtagSelector() {
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

  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
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
