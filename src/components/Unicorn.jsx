// function Unicorn(props) {
//   return (
//     <div style={{ border: "1px solid red", padding: "24px" }}>
//       <p>Name: {props.unicorn.name}</p>
//       <p>Age: {props.unicorn.age}</p>
//     </div>
//   )
// }

import { useState } from "react";

// function Unicorn({ unicorn }) {
//   return (
//     <div style={{ border: "1px solid red", padding: "24px" }}>
//       <p>Name: {unicorn.name}</p>
//       <p>Age: {unicorn.age}</p>
//     </div>
//   )
// }

const API_URL = "http://localhost:3000/unicorns"

function Unicorn({ id, name, age, handleDelete, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    name, 
    age
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEdit(id, data);
    setIsEditing(false);
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    cleanInputs();
  }

  return (
    <div style={{ border: "2px solid red", padding: "24px" }}>
      {
        isEditing ?
          <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="name" value={data.name} onChange={handleChange} />
            <input type="number" name="age" value={data.age} onChange={handleChange} />

            <button type="submit">Editar</button>
          </form> :
          <>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
          </>
      }
      <button onClick={() => handleDelete(id)}>🗑</button>
      <button onClick={() => setIsEditing(!isEditing)}>✏️</button>
    </div>
  )
}

export default Unicorn;