import React from "react";
import "./FairyCard.css";

/**
 * FairyCard (이미지와 배지 이미지를 분리해서 받는 카드)
 * props:
 * - title, name, desc, tags
 * - imgSrc: 메인 일러스트 이미지
 * - badgeSrc: 우하단 핀 안의 둥근 아바타 이미지
 * - titleColor: 상단 타이틀 색
 * - tagColor: 태그 테두리/글자 색
 * - pinColor: 우하단 핀(말풍선) 배경 색
 * - borderColor: 카드 테두리 색
 * - cardGradient: 카드 배경 그라데이션
 */
export default function FairyCard({
  title = "무한한 응원을 주는 등산 요정",
  name = "로미",
  desc = [
    "사랑스러운 등산 요정!",
    "당신과 함께 목표를 끈기있게 해내가요.",
  ],
  tags = ["사랑스러운", "공감적인", "친절한", "너그러운"],
  imgSrc,
  badgeSrc,
  titleColor = "#ff7f9e",
  tagColor = "#79bfff",
  pinColor = "#ff8ca9",
  borderColor = "#bfe6ff",
  cardGradient = "linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)",
}) {
  const lines = Array.isArray(desc) ? desc : [desc];

  return (
    <div
      className="fairy-card"
      style={{ borderColor: borderColor, background: cardGradient }}
    >
      <div className="fairy-inner">
        {/* 상단 타이틀 */}
        <p className="fairy-topline" style={{ color: titleColor }}>
          {title}
        </p>

        {/* 이미지 + 텍스트 */}
        <div className="fairy-main">
          {imgSrc && (
            <img
              className="fairy-illust"
              src={imgSrc}
              alt={`${name} 일러스트`}
              draggable="false"
            />
          )}

          <div className="fairy-textblock">
            <h3 className="fairy-name">{name}</h3>
            {lines.map((t, i) => (
              <p key={i} className="fairy-desc">
                {t}
              </p>
            ))}

            <div className="fairy-tags">
              {tags.map((t) => (
                <span
                  key={t}
                  className="fairy-tag"
                  style={{ color: tagColor, borderColor: tagColor }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 우하단 핀 + 배지 아바타 */}
        {badgeSrc && (
          <div className="fairy-pin">
            <div className="pin-shape" style={{ background: pinColor }}>
              <div className="pin-circle">
                <img
                  src={badgeSrc}
                  alt="요정 배지"
                  className="pin-avatar"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
