export default function NavigationButtons({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex justify-between gap-4">
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={`flex-1 py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
          currentStep === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md hover:shadow-lg"
        }`}
      >
        이전
      </button>

      <button
        onClick={onNext}
        disabled={currentStep === totalSteps}
        className={`flex-1 py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
          currentStep === totalSteps
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md hover:shadow-lg"
        }`}
      >
        다음
      </button>
    </div>
  );
}
