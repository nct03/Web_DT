import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OAuth2() {
    const location = useLocation();
    const navigate =useNavigate()
    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        if(token!==null){
            navigate('/')
            localStorage.setItem('token',token)
        }else{
            navigate('/login')
        }
    },[location.search])
  return (
    <></>
  )
}
