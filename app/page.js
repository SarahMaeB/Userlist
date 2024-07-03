"use client"

import React, {useState, useEffect}from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { UseDataContext } from './context/Data'

const APGIT = () => {
  // const [data, setData] =  useState([])
  const router = useRouter()
  const {fillData, data, handleDelete, handleAdd} = UseDataContext()

  const [newUser, setNewUser] = useState({
    name: '',
    phone: ''
  });

  const fetchUser = async() => {
    const res = await axios('https://jsonplaceholder.typicode.com/users');
    const {data:resData} = res;
    // setData(resData)
    fillData(resData)
  }

  useEffect(() => {
    if (data?.length === 0){
       fetchUser()
    }
  }, [])

  const handleEdit = (id) => {
    router.push(`/edit/${id}`)
  }

  const handleDel = (id) => {
    handleDelete(id);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  }

  const handleAddUser = () => {
    handleAdd(newUser);
    setNewUser({
      name: '',
      phone: ''
    });
  }

  // [] - DEPENDENCY ARRAY
  return (
    <div className = "container">
      <h2>Add New User</h2>
      <div className = "add">
        <input
          type="text"
          name="name"
          placeholder="name"
          value={newUser?.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="phone"
          placeholder="phone"
          value={newUser?.phone}
          onChange={handleChange}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
        <button onClick={handleAddUser}>Add</button>
      </div>

       {data?.length !== 0 && data?.map((item, index) =>{
        const {name, phone, id} = item;

        return <div key={item?.id} className='details'>
          <div >
            <p>{name}</p>
            <pre>{phone}</pre>
          </div>

          <div className='btn'>
          <button onClick={() => {
            handleEdit(id)
          }}>Edit</button>
          <button onClick={() => {
            handleDel(id)
          }}>Delete</button>
          </div>
        </div>
      })} 
      {!data?.length && <p>There is no data to display.</p>}
    </div>
  )
}

export default APGIT

