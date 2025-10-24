import "./NavigationButtons.css";

export default function NavigationButtons({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}) {
  return (
    <div className="nav-buttons-wrap">
      <button
        className="nav-btn prev"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        이전
      </button>

      <button
        className="nav-btn next"
        onClick={onNext}
        disabled={currentStep === totalSteps}
      >
        다음
      </button>
    </div>
  );
}
