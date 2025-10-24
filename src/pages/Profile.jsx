import profileImg from "./img/profile.png";
import fairyLevelImg from "./img/fairyLevel.png"
import Navigatebar from "./component/Navigatebar";
import "./Profile.css";

export default function Profile() {
  const climbRecords = [
    { image: '/fuji.jpg', name: '후지산, 일본', date: '2025.09.09' },
    { image: '/denali.jpg', name: '데날리산, 미국', date: '2025.06.23' },
    { image: '/hallasan.jpg', name: '한라산, 대한민국', date: '2025.03.15' }
  ];

  const replayRecords = [
    { image: '/fuji.jpg', tag: '취미', name: '후지산, 일본', date: '2025.09.09' },
    { image: '/bukak.jpg', tag: '자기관리', name: '북악산, 대한민국', date: '2025.03.21' },
    { image: '/yarigadake.jpg', tag: '도전정신', name: '야릉가다케, 아르..', date: '2025.01.21' }
  ];

  return (
    <>
      <div className="profile-wrap">
        <header className="profile-header">
          <img src={profileImg} alt="프로필 사진" className="profile-img"></img>
          <h1 className="profile-title"><span className="point-title">열정 등산러</span> 김하나님,<br/> 오늘도 참 찰했어요!</h1>
        </header>
        <div className="bg-blue">

          <main className="profile-main">
            {/* 요정 메시지 */}
            <section className="fairy-msg">
              <h3 className="session-title">나를 위한 오늘의 요정 한마디</h3>
              <div className="msg-card">
                <div className="fairy-profile">
                  <div className="fairy-icon"></div>
                  <div className="fairy-name">초담</div>
                </div>

                <p>한 걸음 오르면, 어제보다 더 빛나는 너야.<br/>작아도 정상으로 이어져! 자신 있게 올라가자</p>
              </div>
            </section>

            {/* 등반기록 */}
            <section className="climb-log">
              <h3 className="session-title">나의 등반기록</h3>
              <span className="showall">전체보기</span>
              <div className="grid-three">
                {climbRecords.map((record, index) => (
                  <div key={index} className="climb-card">
                    <img src={record.image} alt={record.name} className="climb-card-img" />
                    <div className="climb-card-info">
                      <h4 className="climb-card-name">{record.name}</h4>
                      <p className="climb-card-date">{record.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 루트 리플레이 */}
            <section className="replay">
              <h3 className="session-title">루트 리플레이</h3>
              <span className="showall">전체보기</span>
              <div className="grid-three">
                {replayRecords.map((record, index) => (
                  <div key={index} className="replay-card">
                    <img src={record.image} alt={record.name} className="replay-card-img" />
                    <div className="replay-card-info">
                      <span className="replay-card-tag">{record.tag}</span>
                      <h4 className="replay-card-name">{record.name}</h4>
                      <p className="replay-card-date">{record.date}</p>
                      <button className="replay-card-btn">리플레이</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="replay">
              <h3 className="session-title">요정 성장 상황</h3>
              <span className="showall">전체보기</span>
              <div className="img-box">
                <img src={fairyLevelImg} alt="요정 성장 레벨"></img>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* 하단 고정 내비게이션 */}
      <Navigatebar />
    </>
  );
}