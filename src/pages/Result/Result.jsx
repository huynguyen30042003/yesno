import React from 'react';
import { Input,Table } from 'antd';
import { useState, useEffect } from "react";
import result from './result.scss'


function Result() {
  const [search, setSearch] = useState("")
  const [page1, setPage1] = useState(1)
  const [page2, setPage2] = useState(1)
  const [pageSite1, setPageSite1] = useState(5)
  const [pageSite2, setPageSite2] = useState(5)
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) ?? []
  );
  const [answer, setAnswer] = useState(
    JSON.parse(localStorage.getItem("answer")) ?? []
  );
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  },[list]) 
  let maxPoint=0;
  list.map((item)=>{
    let point=0
    for (let i = 0; i < list[0].ans.length; i++) {
      if (item.ans[i]==answer[i]) {
        point++
      }
    }
    item.point=point
    if (maxPoint<point) {
      maxPoint=point
    }
  })
  for (let index = 0; index < list.length; index++) {
    
    list[index].result=answer
    list[index].percent=(list[index].point/answer.length)*100 + ' %'
  }
  const columns = [
    {
      key:"1",
      title:'No',
      dataIndex:'id',
      sorter:(record1,record2)=>{
        return record1.id > record2.id
      }
    },
    {
      key:"2",
      title:'Name',
      dataIndex:'namePlayer',
      filteredValue:[search],
      onFilter:(value,record)=>{
        return String(record.id)
        .toLowerCase()
        .includes(value.toLowerCase())||
        String(record.namePlayer)
        .toLowerCase()
        .includes(value.toLowerCase())||
        String(record.createAt)
        .toLowerCase()
        .includes(value.toLowerCase())||
        String(record.ans)
        .toLowerCase()
        .includes(value.toLowerCase())||
        String(record.result)
        .toLowerCase()
        .includes(value.toLowerCase())||
        String(record.point)
        .toLowerCase()
        .includes(value.toLowerCase())
      },
      sorter:(record1,record2)=>{
        return record1.namePlayer > record2.namePlayer
      },
    },
    {
      key:"3",
      title:'Date',
      dataIndex:'createAt',
      sorter:(record1,record2)=>{
        return record1.createAt > record2.createAt
      }
    },
    {
      key:"4",
      title:'Answer',
      dataIndex:'ans',
    },    
    {
      key:"5",
      title:'result',
      dataIndex:'result',
    },
    {
      key:"6",
      title:'Point',
      dataIndex:'point',
      sorter:(record1,record2)=>{
        return record1.point > record2.point
      }
    },
  ]
  const columns2=[
    {
      key:"1",
      title:'Summary',
      dataIndex:'namePlayer',
    },    
    {
      key:"2",
      title:'Correct percent',
      dataIndex:'percent',
      sorter:(record1,record2)=>{
        return record1.percent > record2.percent
      }
    },    
    {
      key:"3",
      title:'Total score',
      dataIndex:'point',
      sorter:(record1,record2)=>{
        return record1.point > record2.point
      }
    },
  ]
  return (
    <>
    
      <a className='first__a'> FINAL RESULT</a>
      <Input.Search 
      placeholder="Search here"
      onSearch={(value)=>{
         setSearch(value)
      }}
      onChange={(e)=>{setSearch(e.target.value)}}
      />
      <Table
      columns={columns}
      dataSource={list}
      pagination={{
        current:page1,
        pageSize:pageSite1,
        onChange:(page1,pageSite1)=>{
          setPage1(page1);
          setPageSite1(pageSite1);
        }
      }}
      ></Table>

      <Table
            columns={columns2}
            dataSource={list}
            pagination={{ 
              current:page2,
              pageSize:pageSite2,
              onChange:(page2,pageSite2)=>{
                setPage2(page2);
                setPageSite2(pageSite2);
              }
            }}
      ></Table>
      <div className='winner'>
        <a>The winner is 
        {
          list.map((item)=>
          (
            <a>{item.point==maxPoint?item.namePlayer:""}</a>
          )
        )}</a>
      </div>
    </>
  )
}

export default Result



