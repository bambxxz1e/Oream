import { useState } from "react";

/** 공유 영역 더미 컴포넌트 (나중에 실제 UI로 교체) */
export default function Share() {
  const [items] = useState([
    { id: 1, title: "한라산, 설문대할망", place: "제주", cta: "공유하기" },
    { id: 2, title: "백두대간 일부 구간", place: "강원", cta: "공유하기" },
    { id: 3, title: "관악산 야경", place: "서울", cta: "공유하기" },
  ]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      {items.map((it) => (
        <div
          key={it.id}
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: 10,
            boxShadow: "0 6px 16px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              height: 80,
              borderRadius: 10,
              background: "#d2e9ff",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#2d4e7f",
            }}
          >
            [ 이미지 ]
          </div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{it.title}</div>
          <div style={{ fontSize: 12, color: "#6d7a82", margin: "2px 0 8px" }}>
            {it.place}
          </div>
          <button
            style={{
              width: "100%",
              height: 32,
              border: 0,
              borderRadius: 8,
              background: "#4FBBFF",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => alert("공유 기능은 나중에 연결할게요!")}
          >
            {it.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
