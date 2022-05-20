import React from 'react';
import 'antd/dist/antd.css';

// import './index.css';
import { List, Avatar, Skeleton , Button, Menu, Dropdown} from 'antd';
import { deleteTransaction } from '../API';

const ACTIONS=[
  {
    key: 'Edit',
    label: 'Edit',
  },
  {
    key: 'Delete',
    label: 'Delete',
  },
 
]

const ActionButton=({item,hardReload,handleEdit})=>{

    const onMenuClick= (e, item)=> {
        if(e.key==ACTIONS[1].key){
          deleteTransaction(item._id.$oid)
          hardReload()
       
        }else if(e.key==ACTIONS[0].key){
          handleEdit(item)
        }
      };
    const menu = (
        <Menu
          onClick={(e)=>onMenuClick(e,item)}
          items={ACTIONS}
        />
      );
    return (
        <Dropdown.Button overlay={menu}></Dropdown.Button>
      );
}
 
  export default ActionButton
