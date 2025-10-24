import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Todolist from "./component/Todolist";
import Share from "./component/Share";
import Navigatebar from "./component/Navigatebar";
import "./Home.css";
import Progress from "./img/progress.png";
import Card1 from "./img/card1.png";
import Card2 from "./img/card2.png";
import Card3 from "./img/card3.png";
import Card4 from "./img/card4.png";

export default function Home() {
  const navigate = useNavigate();
  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  }, []);

  return (
    <div className="home-wrap">
      {/* 헤더 & ToDo */}
      <header className="home-header">
        <h1 className="service-title">오름</h1>
        <section className="card block">
          <div className="card-head">
            <span className="card-title">등반 중 할일 정하기</span>
            <button className="icon-btn" type="button" aria-label="할 일 추가">＋</button>
          </div>
          <Todolist />
        </section>
      </header>

      {/* 오늘의 등반부터 노란 배경 시작 */}
      <div className="yellow-panel">
        <main className="home-main">
          <div className="section-title">
            <span className="date">{today}</span>
            <h2>오늘의 등반</h2>
            <button className="play-btn" type="button" aria-label="재생">▶</button>
          </div>

          {/* 진행 이미지 카드 */}
          <section className="image-card">
            <div className="image-placeholder">
              <img src={Progress} alt="진행 현황" />
            </div>
          </section>

          {/* 등반일지 작성 */}
          <section className="write-log">
            <h3>오늘의 등반일지를 작성해보세요</h3>
            <div className="grid-two">
              <button
                className="primary-cta"
                type="button"
                onClick={() => navigate("/hikinglog")}
              >
                등반일지 작성하기
              </button>

              {/* 우측은 나중에 카드 이미지로 대체해도 됨 */}
              <div className="mini-cards">
                <div className="mini-img">
                  <img src={Card1} className="card1"/>
                </div>
                <div className="mini-img">
                  <img src={Card3} />
                </div>
              </div>
            </div>
          </section>

          {/* 공유 섹션 */}
          <section className="share-sec">
            <h3>친구들과 등반기록을 공유해보세요</h3>
            {/* <Share /> 로 교체 가능 */}
            <img src={Friends_location} alt="친구 위치 공유 예시" />
          </section>
        </main>

        {/* ✅ 네비가 가리는 걸 방지하는 스페이서(네비 높이만큼) */}
        <div className="nav-spacer" aria-hidden="true" />
      </div>

      {/* 하단 고정 내비게이션: 노란 패널 바깥 */}
      <Navigatebar />
    </div>
  );
}