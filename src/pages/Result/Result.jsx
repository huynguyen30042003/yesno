import React from 'react';
import { Input,Table } from 'antd';
import { useState, useEffect } from "react";



function Result() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [pageSite, setPageSite] = useState(5)
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) ?? []
  );
  const [answer, setAnswer] = useState(
    JSON.parse(localStorage.getItem("answer")) ?? []
  );
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  },[list]) 
  list.map((item)=>{
    let point=0
    for (let i = 0; i < list[0].ans.length; i++) {
      if (item.ans[i]==answer[i]) {
        point++
      }
    }
    item.point=point
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
      <a> final result</a>
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
        current:page,
        pageSize:pageSite,
        onChange:(page,pageSite)=>{
          setPage(page);
          setPageSite(pageSite);
        }
      }}
      ></Table>

      <Table
            columns={columns2}
            dataSource={list}
            pagination={{
              current:page,
              pageSize:pageSite,
              onChange:(page,pageSite)=>{
                setPage(page);
                setPageSite(pageSite);
              }
            }}
      ></Table>
    </>
  )
}

export default Result



