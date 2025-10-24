// Hiking_log.jsx
import { useMemo, useRef, useState } from "react";
import "./Hiking_log.css";

export default function Hiking_log({ username = "김하나", onSubmit, onBack }) {
  // 날짜 "10월 25일"
  const todayKR = useMemo(() => {
    const d = new Date();
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;
  }, []);

  const [title, setTitle] = useState("");
  const [achievement, setAchievement] = useState("");
  const [feeling, setFeeling] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [hardPart, setHardPart] = useState("mid"); // start | mid | last
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const handlePick = () => fileRef.current?.click();

  // 이미지 → dataURL 변환해서 미리보기/저장
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result); // dataURL
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: Date.now(),
      dateLabel: todayKR,
      title,
      tags: ["자기관리", "집중력"],
      hardPart,
      achievement,
      feeling,
      tomorrow,
      image: preview || null, // dataURL
      createdAt: new Date().toISOString(),
    };

    // 저장: 배열로 누적
    const key = "hiking-logs";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    const next = [payload, ...prev];
    localStorage.setItem(key, JSON.stringify(next));

    if (onSubmit) onSubmit(payload);
    alert("등반일지를 저장했어요!");
    onBack ? onBack() : window.history.back();
  };

  return (
    <div className="hlog-page">
      <header className="hlog-header">
        <button
          type="button"
          aria-label="뒤로"
          className="hlog-backbtn"
          onClick={() => (onBack ? onBack() : window.history.back())}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="hlog-title">‘{username}’ 님의 등반일지</h1>
      </header>

      <form className="hlog-card" onSubmit={handleSubmit}>
        <p className="hlog-question">{todayKR}에 무엇을 기록할까요?</p>

        <div className="hlog-row">
          <div className="hlog-thumb" onClick={handlePick} role="button">
            {preview ? (
              <img src={preview} alt="사진 미리보기" />
            ) : (
              <div className="hlog-thumb-ph">사진 추가</div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              hidden
            />
          </div>

          <div className="hlog-right">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="hlog-input-pill"
              placeholder="제목을 적어주세요"
            />
            <div className="hlog-pillrow">
              <span className="hlog-pill">{todayKR} 에베레스트산 기록</span>
              <span className="hlog-pill hlog-pill--muted">자기관리</span>
              <span className="hlog-pill hlog-pill--muted">집중력</span>
            </div>
          </div>
        </div>

        <section className="hlog-section">
          <h3 className="hlog-section-title">힘들었던 구간</h3>
          <div className="hlog-segment">
            <button
              type="button"
              onClick={() => setHardPart("start")}
              className={`hlog-segbtn ${hardPart === "start" ? "is-active" : ""}`}
            >
              초반구간
            </button>
            <button
              type="button"
              onClick={() => setHardPart("mid")}
              className={`hlog-segbtn ${hardPart === "mid" ? "is-active" : ""}`}
            >
              중반구간
            </button>
            <button
              type="button"
              onClick={() => setHardPart("last")}
              className={`hlog-segbtn ${hardPart === "last" ? "is-active" : ""}`}
            >
              마지막구간
            </button>
          </div>
        </section>

        <section className="hlog-section">
          <h3 className="hlog-section-title">오늘의 성취</h3>
          <input
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
            className="hlog-input-lg"
            placeholder="힘들지만 목표를 달성할 수 있어서 너무 뿌듯했다!"
          />
        </section>

        <section className="hlog-section">
          <h3 className="hlog-section-title">느낀점</h3>
          <input
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            className="hlog-input-lg"
            placeholder="내용을 입력하세요"
          />
        </section>

        <section className="hlog-section">
          <h3 className="hlog-section-title">내일의 목표</h3>
          <input
            value={tomorrow}
            onChange={(e) => setTomorrow(e.target.value)}
            className="hlog-input-lg"
            placeholder="내용을 입력하세요"
          />
        </section>

        <button type="submit" className="hlog-primary">완료</button>
      </form>
    </div>
  );
}
