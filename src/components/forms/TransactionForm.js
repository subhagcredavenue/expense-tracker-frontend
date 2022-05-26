import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Radio, Select, DatePicker } from 'antd';
import { CATEGORY_OF_ICON, CREDIT,DEBIT } from '../../utility/constants';



const AddForm = ({add,updateData}) => {
  const [form] = Form.useForm();
  const [isCreditActive,setIsCreditActive] =useState();
  const [firstTime,setFirstTime] =useState(true);
const onChange=(e)=>{
const {value}=e.target;
  setIsCreditActive(value)
}
useEffect(()=>{
  if(updateData&&firstTime){
   
    delete updateData.date
    form.setFieldsValue(updateData)
    setIsCreditActive(updateData.type)
setFirstTime(false)
  }
  
})
  const onReset = () => {
    form.resetFields();
    setIsCreditActive(0)
  };

const validation=[{ required: true, message: 'This field is required' }]
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(value)=>add(value,updateData&&updateData._id)}
      defaultValues={updateData}
    
    >
      <Form.Item label="Transaction Type" name="type" rules={validation}>
        <Radio.Group required tooltip="Enter the transaction type" optionType="button"  onChange={onChange}  buttonStyle="solid">
          {/* {TRANSACTION_TYPE.map(trans=><Radio.Button  value={trans}>{trans}</Radio.Button>)} */}

          <Radio.Button style={ isCreditActive===CREDIT?{background:"green",color:'white'}:null} onClick={onChange}  value={CREDIT}>{CREDIT}</Radio.Button>
          <Radio.Button style={isCreditActive===DEBIT?{background:'red'}:null} onClick={onChange}  value={DEBIT}>{DEBIT}</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Amount" name="amount"
       rules={validation}>
        <Input placeholder="Enter Amount" type="number" />
      </Form.Item>
      <Form.Item label="Select Category" name="category"
       rules={validation}>
        <Select placeholder="Select category"  >
            {CATEGORY_OF_ICON.map(cat =>  <Select.Option value={cat.category}>{cat.category}</Select.Option>)}
            
        </Select>
      </Form.Item>
      <Form.Item
        label="Description"
        rules={validation}
        name="title"
      >
        <Input placeholder="Enter description" />
      </Form.Item>
     
     
      <Form.Item label="Date" name="date" rules={validation}>
        <DatePicker/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">{updateData?"Update":"Submit"}</Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        
      </Form.Item> 
     
    </Form>
  );
};

export default AddForm