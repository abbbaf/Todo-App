import React from 'react';

function renderButton(label, callback, todo) {
  if (label === "addToFavorites" && todo.is_in_favorites) return null;
  label = label.replace(/^./,m=>m.toUpperCase()).replace(/[^A-Z](?=[A-Z])/g,"$& ")
  return (  
    <button key={label} type="button" className="btn btn-link" aria-label="Left Align" onClick={ callback }>
    {label}
     </button>
  );
}

function Todo({ todo, operations }) {
  return (
      <div className="card mt-3" style={{ width: "80vw" }}>
        <div className="card-header text-center">{todo.title}</div>
        <div className="card-body">
         { todo.user && <p className="card-title font-italic ml-5">{todo.user[0].name}</p>  }
          <p className="card-text">{todo.description}</p>
          {Object.entries(operations).map(([label, callback]) => 
              renderButton(label, () => callback(todo._id), todo)
          )}
        </div>
      </div>
  );
}

export default Todo;
