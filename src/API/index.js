import { notify } from "../utility/Notification";
import { encrypt, getActiveUserID, setSession } from "../utility";
import { BASE_URL, newEmailSuccess, NOTIFICATION_TYPE } from "../utility/constants";

export const getTransactions = async (user) => {
  const userId = getActiveUserID();
  
  return await fetch(
    `${BASE_URL}/${userId}/transactions`
  );
};

export const createTransaction = (newTrans) => {
  const userId = getActiveUserID();
  fetch(`${BASE_URL}/${userId}/transactions`, {
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
  fetch(`${BASE_URL}/${userId}/transactions/${id.$oid}`, {
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
  fetch(`${BASE_URL}/${userId}/transactions/${id}`, {
    method: "DELETE",
  })
    .then((resp) => {
      notify("Transaction has been deleted successfully");
    })
    .catch((err) => notify(err, NOTIFICATION_TYPE.error));
};
export const getMostExpenses = (max = 3) => {
  const userId = getActiveUserID();
  return fetch(`${BASE_URL}/${userId}/transactions/max_debit/${max}`);
};
export const getGraphData = () => {
  const userId = getActiveUserID();
  return fetch(`${BASE_URL}/${userId}/transactions/graph_data`);
};

export const verifyLogin = (e) => {
  const { email, password } = e;

  fetch(`${BASE_URL}?email=${email}&password=${encrypt(password)}`)
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
    .catch((err) => notify(err.json(), NOTIFICATION_TYPE.error));
};

export const newSignUp = (e) => {
 e.password=encrypt(e.password);
  fetch(`${BASE_URL}`, {
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

export const sendTransactionHistory=()=>{
  const userId = getActiveUserID();
  fetch(`${BASE_URL}/${userId}/transactions/send_transaction_history`,
  {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    }
  }
  )

}