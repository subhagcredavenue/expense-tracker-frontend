import "./App.css";
import "./components/AppHeader";
import Sidebar from "./components/AppHeader";
import { useEffect, useState } from "react";
import ListItem from "./components/Card";
import { Button, Card, Col, Row, Tooltip } from "antd";
import { Cardhead } from "./components/CardHead";
import Example from "./components/Graph";
import { PlusOutlined } from "@ant-design/icons";
import {
  createTransaction,
  getGraphData,
  getMostExpenses,
  getTransactions,
  updateTransaction,
} from "./API";
import AddForm from "./components/forms/TransactionForm";
import PopUpModal from "./components/Model";
import LoginForm from "./components/forms/loginForm";
import { clearSession, generateRandomUser, getActiveUserID, getSession } from "./utility";
import AppHeader from "./components/AppHeader";
import RegistrationForm from "./components/forms/signupForm";


function App() {
  const [user, setUser] = useState(getSession);
  const [transactions, setTransactions] = useState([]);
  const [mostExpense, setMostExpense] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [open, setOpen] = useState(false);
  const [hardReload, setHardReload] = useState(true);
  const [updateData, setUpdateData] = useState(null);
const [dontHaveAccount,setDontHaveAccount]=useState(false)
  useEffect(() => {
    if (user) {
      getTransactions()
        .then((resp) => resp.json())
        .then((resp) => setTransactions(resp));
      getMostExpenses()
        .then((resp) => resp.json())
        .then((resp) => setMostExpense(resp));
      getGraphData()
        .then((resp) => resp.json())
        .then((resp) => setGraphData(resp));
    }
  }, [hardReload]);

  const userLogin = () => {
    setUser(getSession());
  };
  const onSubmit = (values, id) => {
    if (updateData) {
      updateTransaction(values, id);
    } else {
      createTransaction(values);
    }
    handleClose();
    callHardReload();
  };

  const callHardReload = () => {
    setHardReload(!hardReload);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdateData(null);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleEdit = (item) => {
    setUpdateData(item);
    handleOpen();
  };
  const logout = () => {
    setUser(null);
    clearSession();
  };

  const showSignUp=()=>{
    setDontHaveAccount(true)
  }
  const showLogIn=()=>{
    setDontHaveAccount(false)
  }
  return (
    <div className="App">
      {user ? (
        <AppHeader logout={logout}>

          <Card bodyStyle={{padding: "24px"}}>
            <Row wrap>
              <Col  flex="1 1 700px">
                <Row  >
                  {mostExpense.map((trans) => (
                    <Col flex="1 1 200px">
                      <Cardhead trans={trans} />
                    </Col>
                  ))}
                </Row>
                <Row flex="0 1 800px" >
                 <div style={{ width: "100%" }}>
                    {graphData && <Example data={graphData} />}
                    </div>
                </Row>
              </Col>
              <Col  flex="1 1 400px"  >
                <Card bodyStyle={{padding: "24px",margin:"auto"}}
                  title={
                    <Row style={{width:"100"}} >
                      <Col flex="auto" >Your Transaction History</Col>
                      <Col flex="20px"  >
                        <Tooltip title="Create new transaction" >
                        <Button
                          type="primary"
                          onClick={handleOpen}
                          icon={<PlusOutlined />}

                        /></Tooltip>
                      </Col>
                    </Row>
                  }
                >
                  <ListItem
                    hardReload={callHardReload}
                    handleEdit={handleEdit}
                    transactions={transactions}
                  />
                </Card>
              </Col>
            </Row>
            {open && (
              <PopUpModal
                title={updateData ? "Update Transaction" : "Add New Entry"}
                open={open}
                handleClose={handleClose}
              >
                <AddForm add={onSubmit} updateData={updateData} />
              </PopUpModal>
            )}
          </Card>
        </AppHeader>
      ) : (<div className="login-section">
        {/* <a href="https://ibb.co/3Wy6XTG"><img src="https://i.ibb.co/gwMq1rH/Screenshot-2022-05-19-at-6-03-25-PM.png" alt="Screenshot-2022-05-19-at-6-03-25-PM" border="0"></a> */}
        <PopUpModal
          title={dontHaveAccount?"Sign up":"Log In"}
          open={true}
          handleClose={handleClose}
          closable={false}
        >
          {dontHaveAccount?<RegistrationForm showLogIn={showLogIn}  hardReload={callHardReload} />:<LoginForm
            userLogin={userLogin}
            setUser={setUser}
            hardReload={callHardReload}
            showSignUp={showSignUp}
          />}
        </PopUpModal>
        </div>
      )}
    </div>
  );
}

export default App;
