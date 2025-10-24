import  FairyCard   from "./component/FairyCard";
import Romy from "./img/Romy.png";
import RomiAvatar from "./img/RomiAvatar.png"; 
export default function Goal1() {
    return (
        <div style={{ padding: 20 }}>
          <FairyCard
            title="무한한 응원을 주는 등산 요정"
            name="로미"
            desc={[
              "사랑스러운 등산 요정!",
              "당신과 함께 목표를 끈기있게 해내가요.",
            ]}
            tags={["사랑스러운", "공감적인", "친절한", "너그러운"]}
            imgSrc={romi}
            badgeSrc={romiAvatar}
            titleColor="#ff7693"  // 상단 분홍 텍스트
            tagColor="#77bfff"    // 파란 태그 테두리
          />
        </div>
      );
  }
  