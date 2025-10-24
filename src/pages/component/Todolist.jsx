import { useState } from "react";
import "./Todolist.css";

export default function Todolist({ items = [], onItemsChange = () => {} }) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");

  const addItem = () => {
    const t = text.trim();
    if (!t) return;

    const newItems = [
      ...items,
      {
        id: crypto.randomUUID?.() ?? Date.now() + "_" + Math.random(),
        text: t,
      },
    ];

    onItemsChange(newItems);
    setText("");
    setShowInput(false);
  };

  const removeItem = (id) => {
    const newItems = items.filter((it) => it.id !== id);
    onItemsChange(newItems);
  };

  return (
    <section className="todo-card" aria-label="등반 중 할 일 정하기">
      <header className="todo-head">
        <h2 className="todo-title">등반 중 할 일 정하기</h2>
        <button
          className="btn-add"
          aria-label={showInput ? "할 일 입력 닫기" : "할 일 추가"}
          onClick={() => setShowInput((v) => !v)}
          type="button"
        >
          <svg viewBox="0 0 24 24" className="icon-plus" aria-hidden="true">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      {showInput && (
        <div className="add-row">
          <input
            className="add-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem();
              if (e.key === "Escape") setShowInput(false);
            }}
            autoFocus
          />
          <button
            className="add-confirm"
            onClick={addItem}
            type="button"
            aria-label="추가"
          >
            추가
          </button>
        </div>
      )}

      <ul className="todo-list">
        {items.length > 0 ? (
          items.map((it) => (
            <li key={it.id} className="todo-item">
              <span className="todo-text">{it.text}</span>
              <button
                className="btn-remove"
                aria-label="삭제"
                onClick={() => removeItem(it.id)}
                type="button"
                title="삭제"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="icon-minus"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))
        ) : (
          <li className="todo-empty">
            아직 할 일이 없어요. 오른쪽 위 <b>+</b> 버튼으로 추가해보세요!
          </li>
        )}
      </ul>
    </section>
  );
}
