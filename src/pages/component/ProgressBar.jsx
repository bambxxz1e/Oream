export default function ProgressBar({ currentStep, totalSteps = 3 }) {
  return (
    <div className="mb-12">
      <div className="flex gap-4">
        {Array.from({ length: totalSteps }, (_, index) => index + 1).map((step) => (
          <div
            key={step}
            className={`flex-1 h-2 rounded-full transition-all duration-300 ${
              currentStep >= step ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
