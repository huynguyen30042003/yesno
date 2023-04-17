import { useParams } from 'react-router'
import React from 'react'
import { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import startGame from './startGame.scss'

function StartGame() {
  const navigate = useNavigate();
  const [count,setCount] = useState(JSON.parse(localStorage.getItem('turn')) ?? 0)

  const next=()=>{
    console.log(count);
    if (list.length>count+1) {
      navigate(`/start/${list[count+1].namePlayer}`)
      setCount(count+1)
      console.log(count);
    }else{
      navigate('/Answer')
    }
  }
  const [list,setList] = useState(JSON.parse(localStorage.getItem('list')) ??[])
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
    console.log(JSON.parse(localStorage.getItem("list")));
  },[list]) 
  const chooseYes = (index) => {
    let check = index;
    const newList = list.map((item, i) => {
      if (i === count) {
        const newAns = item.ans.map((ansItem, ansIndex) => {
          if (ansIndex === check) {
            return ansItem === 'yes' ? 'empty' : 'yes';
          }
          return ansItem;
        });
        return {
          ...item,
          ans: newAns,
        };
      }
      return item;
    });
    console.log(newList);
    setList(newList);
  };
  const chooseNo = (index) => {
    let check = index;
    const newList = list.map((item, i) => {
      if (i === count) {
        const newAns = item.ans.map((ansItem, ansIndex) => {
          if (ansIndex === check) {
            return ansItem === 'no' ? 'empty' : 'no';
          }
          return ansItem;
        });
        return {
          ...item,
          ans: newAns,
        };
      }
      return item;
    });
    console.log(newList);
    setList(newList);
  };
  return (
  <>
    <div className='playRound'>
      <a>luoc choi cua {list[count].namePlayer}</a>
    </div>
    {
      list[count].ans.map((item,index)=>(
        <div className='question'>
          <a>cau hoi so {index+1}</a>
          <div className='choose'>
            <button className={item!='empty'&& item=='yes'?'yes':'empty'}
            onClick={()=>chooseYes(index)}
            >yes{index}   {item}</button>
            <button className={item!='empty'&& item=='no'?'no':'empty'}
            onClick={()=>chooseNo(index)}
            >no</button>
          </div>
        </div>
      ))
    }
        <button
    onClick={next}
    >submit</button>
  </>
)
}

export default StartGame