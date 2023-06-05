import axios from "axios";
import { useEffect, useState } from "react";
import Unicorn from "./Unicorn";

const API_URL = "http://localhost:3000/unicorns"
function UnicornsList() {
  const [unicorns, setUnicorns] = useState([]);
  const [data, setData] = useState({
    name: '',
    age: 0
  });

  const getData = async () => {
    try {
      const response = await axios.get(API_URL);
      setUnicorns(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const displayUnicorns = () => {
    return (
      unicorns.map(unicorn => (
        // <Unicorn key={unicorn.id} unicorn={unicorn} />
        // <Unicorn key={unicorn.id} name={unicorn.name} age={unicorn.age} />
        <Unicorn key={unicorn.id} handleDelete={handleDelete} handleEdit={handleEdit} {...unicorn} />
      ))
    )
  }

  const cleanInputs = () => {
    setName("");
    setAge(0);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { name, age });
      getData();
      cleanInputs();
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    cleanInputs();
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async (id, data) => {
    try {
      await axios.put(`${API_URL}/${id}`, data);
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  const { name, age } = data;

  return (
    <>
      <h1>Unicorns</h1>
      {/* <form onSubmit={handleSubmit}> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="name" value={name} onChange={handleChange} />
        <input type="number" name="age" value={age} onChange={handleChange} />

        <button type="submit">Create</button>
      </form>
      {
        unicorns.length ? displayUnicorns() : <p>No hay datos</p>
      }
    </>
  )
}

export default UnicornsList;