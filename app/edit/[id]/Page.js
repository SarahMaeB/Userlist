"use client";

import "./page.css";
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { UseDataContext } from '../../context/Data';
import { useRouter } from "next/navigation";

const Page = () => { 
  const { data, handleSubmitEdit } = UseDataContext();
  const router = useRouter();
  const [details, setDetails] = useState({
    name: "",
    username: ""
  });

  const params = useParams();
  const { id } = params;

  const fetchUser = useCallback(() => {
    const target = data?.find((item) => Number(item.id) === Number(id));
    if (target) {
      const { name, username } = target;
      setDetails({ name, username });
    } else {
      setDetails({ name: "", username: "" });
    }
  }, [data, id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, data?.length]);

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    setDetails({
      ...details, [name]: val
    });
  };

  const handleSubmitEditFunc = () => {
    handleSubmitEdit({
      ...details, 
      id
    });
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="container-1">
      <h2>Edit Details</h2>
      {details && 
      <div className="id-details">
        <input name="name" type="text" onChange={handleChange} placeholder="name" value={details?.name} />
        <input name="username" type="text" onChange={handleChange} placeholder="username" value={details?.username} />
        <button onClick={handleSubmitEditFunc}>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>}
    </div>
  );
};


export default Page;
