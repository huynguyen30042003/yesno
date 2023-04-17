import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import answer from "./answer.scss"

function Answer() {
  const navigate = useNavigate();
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) ?? []
  );
  const [roundPLay, setRoundPlay] = useState(
    JSON.parse(localStorage.getItem("round")) ?? 1
  );
  const [answer, setAnswer] = useState(
    JSON.parse(localStorage.getItem("answer")) ?? []
  );
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("turn")) ?? 0
  );

  useEffect(() => {
    localStorage.setItem("answer", JSON.stringify(answer));
    console.log(JSON.parse(localStorage.getItem("answer")));
  }, []);
  
  useEffect(() => {
  const ans = Promise.all(
    new Array(+roundPLay)
      .fill()
      .map(async () => {
        try {
          const response = await axios.get("https://yesno.wtf/api");
          console.log(response.data.answer);
          return response.data.answer;
        } catch (error) {
          console.error(error);
          return null;
        }
      })
  );

    async function getValues() {
      const values = await ans;
      setAnswer(values);
      
    }
    getValues();
  }, [roundPLay]);
  console.log(list[1].ans[1]);
  const moveToResult=()=>{
    navigate('/Result')
  }
  return(
    <>
    {/* {JSON.stringify(answer)} */}
    <a>player tham gia </a>
    {
      list.map((item,index)=>(
        <a>{list[index].namePlayer}</a>
      ))
    }
    {
      answer.map((answer,index)=>(
        <div >
          <a> cau {index+1}</a>
          <a> ket qua {answer}</a>
          {
            list.map((item,id)=>(
              <>
              <a className={answer==list[id].ans[index]  ?'true':'false'}>{list[id].namePlayer}</a>
              </>
            ))
          }

        </div>
      ))

    }
    <button 
    className=""
    onClick={moveToResult}
    >result</button>
    </>
  );
}

export default Answer