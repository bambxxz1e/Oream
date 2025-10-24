import "./ProgressBar.css";

export default function ProgressBar({ currentStep, totalSteps = 3 }) {
  return (
    <div className="progress-wrap">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map((step) => (
        <div
          key={step}
          className={`progress-segment ${
            currentStep >= step ? "active" : "inactive"
          }`}
        ></div>
      ))}
    </div>
  );
}
