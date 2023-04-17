import React from 'react'
import { useState,useRef,useEffect } from "react";
import home from './home.scss'
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();
  const [inputName,setInputName] = useState('')
  const [addPlayer,setAddPlayer] = useState(0)
  const [roundPlay,setRoundPlay] = useState(JSON.parse(localStorage.getItem('round')) ?? 1)
  const [list,setList] = useState(JSON.parse(localStorage.getItem('list')) ??[])
  const [count,setCount] = useState(JSON.parse(localStorage.getItem('turn')) ?? 0)

  useEffect(()=>{
    localStorage.setItem("turn",JSON.stringify(count))
    console.log(JSON.parse(localStorage.getItem("turn")));
  },[count])

  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
    console.log(JSON.parse(localStorage.getItem("list")));
  },[list]) 
  useEffect(()=>{
    localStorage.setItem("round",JSON.stringify(roundPlay))
    if( (isNaN(+roundPlay)) || (+roundPlay<=0)) {
      alert("hay nhap so duong");
      setRoundPlay('')
    }else{
      setCount(0)
      console.log(+roundPlay);
      const arr = new Array(+roundPlay).fill().map(() => 'empty');
      const newList=list.map(((item) => {
        return {
          ...item,
          ans: arr,
        };
      }));
      console.log(newList);
      setList(newList)
      console.log(list);
    }
  },[roundPlay]) 
  const isAddPlayer = () => {
    setAddPlayer(1);
    setInputName('');
  }
  const setNamePlayer = (e) => {
    setInputName(e.target.value)
  }
  const isFinishAddPlayer = () => {
    let inputNameCheck =inputName;
    if(inputNameCheck==''){
      alert("try again");
    }else{
      setList([...list,{namePlayer:inputName}])
      setAddPlayer(0);
    }
  }
  const chooseRoundPlay = (e) => {
      setRoundPlay(e.target.value)
  }
  const move=()=>{
    navigate(`/start/${list[0].namePlayer}`)
  }
  const startPlay = ()=>{
    if( (isNaN(+roundPlay)) || (+roundPlay<=0)) {
      alert("hay nhap so duong");
      setRoundPlay('')
    }else{
      console.log(+roundPlay);
      console.log(count);
      navigate(`/start/${list[0].namePlayer}`)
    }

  }
  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div className='Home'>
      <div className='Tutorial'>
        <a>game chon nguoi thang</a>
      </div>

      <div className={list.length!=0?'PlayerReady':'Display-none'}>
        {list.map((item,index)=>(
          <a>player {index+1} {item.namePlayer}</a>
          
        ))}
      </div>

      <button className={addPlayer==0?'':' Display-none'}
      
      onClick={isAddPlayer}
      > add player</button>


      <div className={addPlayer==0?'PlayerInfo Display-none':' PlayerInfo'}>
          <a>enter name player</a>
          <input
          value={inputName}
          onChange={(e)=>setNamePlayer(e)}
          ></input>
          <button
          onClick={isFinishAddPlayer}
          >add</button>
      </div>
      
      <div className={list.length>=2?'RoundPLay':'Display-none'}>
        <a>choose the round play</a>
        <input 
        onChange={(e)=>chooseRoundPlay(e)}
        value={roundPlay}
        ></input>
        <button 
        onClick={startPlay}
        >play</button>
      </div>
    </div>
  )
}

export default Home