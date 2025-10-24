export default function EditableTitle({ currentStep, title, onTitleChange }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white flex-shrink-0"
        style={{ backgroundColor: '#4FBBFF' }}
      >
        {currentStep}
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        className="text-2xl font-bold flex-1 outline-none"
        style={{ color: '#4FBBFF' }}
        placeholder="제목을 입력하세요"
      />
    </div>
  );
}
