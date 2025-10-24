import "./EditableTitle.css";

export default function EditableTitle({ currentStep, title, onTitleChange }) {
  return (
    <div className="title-wrap">
      <div className="title-step">{currentStep}</div>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="title-input"
        placeholder="등반을 함께할 캐릭터를 선택해주세요!"
      />
    </div>
  );
}
