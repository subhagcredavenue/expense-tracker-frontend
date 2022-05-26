import React from 'react';
import 'antd/dist/antd.css';

// import './index.css';
import { List, Skeleton} from 'antd';
import ActionButton from './ActionButton';
import { getIcon, getNumberSepratedByComma } from '../utility';
import { CREDIT } from '../utility/constants';
import moment from 'moment';

const ListItem=(props)=>{
    const {transactions,hardReload,handleEdit}=props
    const scrollableDivStyle={
      height: '66vh',
      overflow: 'auto',
      padding: '0 4px',
    }
    return (
      <div id="scrollableDiv"
      style={scrollableDivStyle}>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={transactions}
        renderItem={item => (
          <List.Item
            actions={[<ActionButton item={item} handleEdit={handleEdit} hardReload={hardReload}/>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={getIcon(item.category)}
                title={item.title}
                // description={new Date(item.date).toDateString()}
                description={  moment(item.date).format("DD MMM YY")}
              
              />
              <div style={{color:item.type==CREDIT?"green":"red"}}>{getNumberSepratedByComma(item.amount)}</div>   
            </Skeleton>
          </List.Item>
        )}
      />
      </div>
    );
  
}

export default ListItem;