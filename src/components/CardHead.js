import { Avatar, Card, Col, Image, Row } from "antd";
import { getIcon, getNumberSepratedByComma } from "../utility";

export const Cardhead = ({trans}) => {

 const {amount,_id:{category}}=trans
 const icon=getIcon(category)
 const iconStyle={position:"flex",opacity:.4,marginLeft:300}
  return (
    <Card hoverable style={{margin:5}} >
      
      <Row>
      {/* <Col span={4}>  <div style={iconStyle}>  {icon}</div>
      </Col> */}
      <Col span={20} flex="0 1 100px">
      <Row style={{ color: "#a6a6a6" }}>{category?category:"Others"}</Row>
      <Row style={{ fontSize: "26px",color:"#444444",width:"100%" }} >{getNumberSepratedByComma(amount)}</Row>

      </Col>
      </Row>
  
     
    </Card>
  );
};
