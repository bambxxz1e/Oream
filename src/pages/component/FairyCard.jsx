// FairyCard.jsx
import React from "react";
import "./FairyCard.css";

/**
 * FairyCard
 * - 카드 색감/보더/핀/태그 컬러를 props로 받아 CSS 변수에 주입합니다.
 * - 카드 레이아웃과 비율은 FairyCard.css에서 결정됩니다.
 */
export default function FairyCard({
  title = "무한한 응원을 주는 등산 요정",
  name = "로미",
  desc = ["사랑스러운 등산 요정!", "당신과 함께 목표를 끈기있게 해내가요."],
  tags = ["사랑스러운", "공감적인", "친절한", "너그러운"],
  imgSrc,
  badgeSrc,
  // 테마 컬러(각 캐릭터별로 Goal1에서 내려줌)
  titleColor = "#ff7693",
  tagColor = "#77bfff",
  pinColor = "#ff8ca9",
  borderColor = "#ffc9d7",
  cardGradient = "linear-gradient(180deg, #ffffff 0%, #ffeef3 100%)",
}) {
  const lines = Array.isArray(desc) ? desc : [desc];

  return (
    <div
      className="fairy-card"
      style={{
        // CSS variables (FairyCard.css에서 사용)
        "--edge": borderColor,
        "--card-gradient": cardGradient,
        "--title-color": titleColor,
        "--tag-color": tagColor,
        "--pin-color": pinColor,
      }}
    >
      <div className="fairy-inner">
        {/* 상단 타이틀 */}
        <p className="fairy-topline">{title}</p>

        {/* 메인 일러스트 */}
        {imgSrc && (
          <img
            className="fairy-illust"
            src={imgSrc}
            alt={`${name} 일러스트`}
            draggable="false"
          />
        )}

        {/* 텍스트 */}
        <div className="fairy-textblock">
          <h3 className="fairy-name">{name}</h3>
          {lines.map((t, i) => (
            <p key={i} className="fairy-desc">
              {t}
            </p>
          ))}
        </div>

        {/* 태그 */}
        <div className="fairy-tags">
          {tags.map((t) => (
            <span key={t} className="fairy-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
