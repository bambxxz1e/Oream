import { useState, useEffect } from "react";
import HashtagSelector from "./component/HashtagSelector";
import ProgressBar from "./component/ProgressBar";
import EditableTitle from "./component/EditableTitle";
import Todolist from "./component/Todolist";

function Target() {
  const [currentStep, setCurrentStep] = useState(3);
  const [title, setTitle] = useState("등반 목표를 설정해보세요!");
  const [selectedTags, setSelectedTags] = useState([]);
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const locationName = localStorage.getItem("selectedLocationName");
    if (locationName) {
      setTitle(`'${locationName}' 등반 목표를 설정해보세요!`);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem("selectedHashtags", JSON.stringify(selectedTags));
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    alert("등반 목표가 저장되었습니다! 🎉");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#FFF265", // 화면 전체 노란색
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "390px",
          height: "844px",
          backgroundColor: "#FFF265",
          borderRadius: "0", // 카드 둥근 모서리 제거
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* 상단 진행 표시 */}
        <ProgressBar currentStep={currentStep} totalSteps={3} />

        {/* 제목 */}
        <EditableTitle
          currentStep={currentStep}
          title={title}
          onTitleChange={setTitle}
        />

        {/* 해시태그 선택 */}
        <HashtagSelector
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />

        {/* TODO 리스트 */}
        <Todolist items={todoItems} onItemsChange={setTodoItems} />

        {/* 완료 버튼 */}
        <button
          onClick={handleComplete}
          style={{
            backgroundColor: "#4db8ff",
            color: "#fff",
            padding: "16px 0",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "700",
            border: "none",
            cursor: "pointer",
            marginTop: "auto",
            boxShadow: "0 4px 8px rgba(77,184,255,0.3)",
            transition: "0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#3aaef8")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4db8ff")}
        >
            완료
        </button>
      </div>
    </div>
  );
}

export default Target;
