"use client"
import React, {createContext, useCallback, useContext, useState} from 'react'
import { useRouter } from 'next/navigation';

const DataProvider = createContext(); // 1

export const UseDataContext = () => { // 2
    return useContext(DataProvider);
}

const DataComponent = ({children}) => {
  const router = useRouter()
    const [data, setData] = useState([])

    const fillData = (dataPayload) => {
        setData(dataPayload)
        console.log(dataPayload)
    }

    const handleSubmitEdit = useCallback((payload) => {
        const {id, name, username } = payload;

        const newData = data?.map((item) => {
          if (Number(item.id) === Number(id)){
            return {
              ...item,
              name,
              username
            }
          } else {
            return item
          }
        })
        console.log(newData, 'data ko')
        setData(newData)
        router.push('/')
    }, [data, router])
    
    const handleDelete = useCallback((id) => {
      const newData = data?.filter(item => item.id !== id);
      setData(newData);
    }, [data]);

    const handleAdd = useCallback((newUser) => {
      const newId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;
      const newData = [
        ...data,
        { ...newUser, id: newId }
      ];
      setData(newData);
    }, [data]);

  return (
    <DataProvider.Provider value = {{fillData,handleSubmitEdit,handleDelete, handleAdd, data}}>
        {children}
    </DataProvider.Provider>
  )
}

export default DataComponent