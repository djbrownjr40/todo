import { useState } from "react";

export default function Form() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = item.trim();
    if (!trimmed) {
      alert("Please enter something to do.");
      return;
    }

    setItems([...items, { id: Date.now(), text: trimmed, completed: false }]);
    setItem("");
  };

  const toggleDone = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const sortedItems = [...items].sort((a, b) => a.completed - b.completed);

  const deleteItem = (idToDelete) => {
    setItems(items.filter((item) => item.id !== idToDelete));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Walk the dog..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <input value="Add Task" type="submit" />
        </form>
      </div>
      <div>
        <h3>To Do</h3>

        {items.length === 0 ? (
          <p>Nothing to see here! ✨</p>
        ) : (
          <ul>
            {sortedItems.map((todo) => (
              <li key={todo.id}>
                <div className="todo-item">
                <span
                 style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleDone(todo.id)}
                    />
                    {todo.text}
                  </span>
                  <button
                    className="delete-button"
                    onClick={() => deleteItem(todo.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
