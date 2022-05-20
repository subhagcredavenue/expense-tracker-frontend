import { notify } from "../utility/Notification";
import { getActiveUserID, setSession } from "../utility";
import { newEmailSuccess, NOTIFICATION_TYPE } from "../utility/constants";

export const getTransactions = async (user) => {
  const userId = getActiveUserID();
  return await fetch(
    `http://localhost:3000/users/${userId}/transactions`
  );
};

export const createTransaction = (newTrans) => {
  const userId = getActiveUserID();
  fetch(`http://localhost:3000/users/${userId}/transactions`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(newTrans),
  })
    .then((resp) => notify("New transaction has been created successfully"))
    .catch((err) => notify(err, NOTIFICATION_TYPE.error));
};

export const updateTransaction = (updateTrans, id) => {
  const userId = getActiveUserID();
  fetch(`http://localhost:3000/users/${userId}/transactions/${id.$oid}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(updateTrans),
  })
    .then((resp) => notify("Transaction has been updated successfully"))
    .catch((err) => notify(err, NOTIFICATION_TYPE.error));
};

export const deleteTransaction = (id) => {
  const userId = getActiveUserID();
  fetch(`http://localhost:3000/users/${userId}/transactions/${id}`, {
    method: "DELETE",
  })
    .then((resp) => {
      notify("Transaction has been deleted successfully");
    })
    .catch((err) => notify(err, NOTIFICATION_TYPE.error));
};
export const getMostExpenses = (max = 3) => {
  const userId = getActiveUserID();
  return fetch(`http://localhost:3000/users/${userId}/transactions?max=${max}`);
};
export const getGraphData = () => {
  const userId = getActiveUserID();
  return fetch(`http://localhost:3000/users/${userId}/transactions?graph=1`);
};

export const verifyLogin = (e) => {
  const { email, password } = e;
  fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
    .then((resp) => resp.json())
    .then((resp) => {
      const { userExist } = resp;
      if (userExist) {
        setSession(resp.user);
        notify("You are logged in!");
      } else {
        notify("Incorrect email or password!", NOTIFICATION_TYPE.error);
      }
    })
    .catch((err) => console.log(err));
};

export const newSignUp = (e) => {
 
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(e),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (Array.isArray(resp.email)) {
        notify(resp.email[0], NOTIFICATION_TYPE.error);
       let check = 0;

      } 
      else {
        notify("New account successfully created");
      
      }
    });
    

};
