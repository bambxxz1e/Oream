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
import Logo from "./img/main_logo.png";
import Friends_location from "./img/friend_location.png";

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
        <img src={Logo} alt="서비스 로고" className="logoimg" />
        <section className="card block">
          <div className="card-head">
            <span className="card-title">등반 중 할일 정하기</span>
            <button className="icon-btn" type="button" aria-label="할 일 추가">＋</button>
          </div>
          <Todolist />
        </section>
      </header>

      {/* 오늘의 등반부터 배경/라운드 시작 */}
      <div className="bg-yellow">
        <main className="home-main">
          <div className="section-title">
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
                <p className="plus">+</p>
                <br />
                등반일지 작성하기
              </button>

              {/* 우측: 가로 슬라이더 */}
              <div className="mini-cards" role="list">
                <div className="mini-img" role="listitem">
                  <img src={Card1} alt="등반 카드 1" />
                </div>
                <div className="mini-img" role="listitem">
                  <img src={Card3} alt="등반 카드 2" />
                </div>
                <div className="mini-img" role="listitem">
                  <img src={Card2} alt="등반 카드 3" />
                </div>
                <div className="mini-img" role="listitem">
                  <img src={Card4} alt="등반 카드 4" />
                </div>
              </div>
            </div>
          </section>

          {/* 공유 섹션 */}
          <section className="share-sec">
            <h3>친구들과 등반기록을 공유해보세요</h3>
            {/* 필요 시 Share 컴포넌트로 교체 */}
            {/* <Share /> */}
            <img src={Friends_location} alt="친구 위치 공유 예시" />
          </section>
        </main>
      </div>

      {/* 하단 고정 내비게이션: bg-yellow 밖으로 이동 */}
      <Navigatebar />
    </div>
  );
}
