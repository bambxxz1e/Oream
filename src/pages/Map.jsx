import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

import ProgressBar from "./component/ProgressBar";
import EditableTitle from "./component/EditableTitle";
import MapboxToggle from "./component/MapboxToggle";
import NavigationButtons from "./component/NavigationButtons";

export default function HomePage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(2);
  const [title, setTitle] = useState("등반 장소 설정");
  const totalSteps = 3;

  const handlePrevious = () => currentStep > 1 && setCurrentStep(currentStep - 1);
  const handleNext = () => currentStep < totalSteps && setCurrentStep(currentStep + 1);
  const handleTitleChange = (newTitle) => setTitle(newTitle);

  // 단계 이전 버튼
    const handleStepPrev = useCallback(() => {
      const prevStep = currentStep - 1;
      if (prevStep < 1) {
        navigate(-1); // 첫 단계면 이전 페이지로
      } else {
        setCurrentStep(prevStep);
  
        if (prevStep === 2) {
          navigate("/map");
        }
      }
    }, [currentStep, navigate]);
  
  
    // 단계 다음 버튼
   const handleStepNext = useCallback(() => {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
  
      if (nextStep === 3) {
        navigate("/target");
      }
    }, [currentStep, navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto rounded-3xl shadow-lg"
      style={{ width: "390px", height: "844px", padding: "24px", backgroundColor: "#fff265" }} // ✅ 카드 전체 배경 노란색
    >
      {/* 내부 컨테이너에서 bg-yellow 제거 */}
      <div className="rounded-3xl flex flex-col w-full h-full shadow-md px-6 py-8 gap-6 bg-transparent">
        
        {/* Progress + Title */}
        <div className="flex flex-col gap-2">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <EditableTitle
            currentStep={currentStep}
            title={title}
            onTitleChange={handleTitleChange}
          />
        </div>

        {/* 지도 및 검색 */}
        <div className="flex-1 flex flex-col justify-start items-center gap-4 overflow-hidden">
          <MapboxToggle />
        </div>

        {/* 이전/다음 버튼 */}
        <div className="pt-2">
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handleStepPrev}
            onNext={handleStepNext}
          />
        </div>
      </div>
    </div>
  );
}
