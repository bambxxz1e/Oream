import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Todolist from "./component/Todolist";
import Navigatebar from "./component/Navigatebar";
import "./Home.css";
import Progress from "./img/progress.png";
import Card1 from "./img/card1.png";
import Card3 from "./img/card3.png";

export default function Home() {
  const navigate = useNavigate();
  const today = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  }, []);

  const [todoItems, setTodoItems] = useState(
    JSON.parse(localStorage.getItem("todoItems") || "[]")
  );

  return (
    <div className="home-wrap">
      <header className="home-header">
        <h1 className="service-title">오름</h1>
        <section className="card block">
          <div className="card-head">
            <span className="card-title">등반 중 할 일 정하기</span>
          </div>
          <Todolist items={todoItems} onItemsChange={setTodoItems} />
        </section>
      </header>

      <div className="yellow-panel">
        <main className="home-main">
          <div className="section-title">
            <span className="date">{today}</span>
            <h3>오늘의 등반</h3>
            <button className="play-btn" type="button" aria-label="재생">▶</button>
          </div>

          <section className="image-card">
            <div className="image-placeholder">
              <img src={Progress} alt="진행 현황" />
            </div>
          </section>

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
        </main>

        <div className="nav-spacer" aria-hidden="true" />
      </div>

      <Navigatebar />
    </div>
  );
}
