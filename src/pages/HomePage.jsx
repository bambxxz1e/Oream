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
            <button className="icon-btn" aria-label="추가">
              ＋
            </button>
          </div>
          <Todolist />
        </section>
      </header>
      <div className="bg-yellow">
        {/* 오늘의 등반 (이미지로 대체 예정 영역) */}
        <main className="home-main">
          <div className="section-title">
            <h2>오늘의 등반</h2>
            <button className="play-btn" aria-label="재생">
              ▶
            </button>
          </div>

          {/* 여기 두 박스는 현재 임시 이미지/플레이스홀더 */}
          <section className="image-card">
            <div className="image-placeholder">
              <img src={Progress} />
            </div>
          </section>

          {/* 등반일지 작성 버튼 */}
          <section className="write-log">
            <h3>오늘의 등반일지를 작성해보세요</h3>
            <div className="grid-two">
              <button
                className="primary-cta"
                onClick={() => navigate("/hikinglog")}
              >
                <p className="plus">+</p>
                <br />
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
            <Share />
          </section>
        </main>

        {/* 하단 고정 내비게이션 */}
        <Navigatebar />
      </div>
    </div>
  );
}
