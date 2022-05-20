
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { verifyLogin } from '../../API';


const LoginForm = ({userLogin, hardReload,showSignUp}) => {
  const [loading,setLoading]=useState(false)
  const onFinish = (values) => {
    startLoading()
     verifyLogin(values);
     setTimeout(()=>{
      userLogin()

    hardReload()
      stopLoading()
     },1000)
  };
const startLoading=()=>{
  setLoading(true)
}
const stopLoading=()=>{
  setLoading(false)
}
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);

  };

  return (
    <Form
    labelAlign="left"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter your Email!',
            type: 'email'
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button  loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
<Button type="link" onClick={showSignUp}>Don't have an account?</Button>
    </Form>
  
  );
};

export default LoginForm;