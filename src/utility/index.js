
import { notify } from './Notification'
import {CATEGORY_OF_ICON, CREDIT, DEBIT} from './constants'
import { createTransaction } from '../API'
export const getIcon=(category)=>{
    if(!category){
        category='Other'
    }
      return CATEGORY_OF_ICON.find(cat=>cat.category===category).icon
}

export const getNumberSepratedByComma=(number)=>{
   return "₹"+Number(number).toLocaleString('en-IN')
}

export const getTransactionsByType=(transactions,type)=> transactions.filter(t=> t._id.type==type)


export const setSession=(user)=>localStorage.setItem('user',JSON.stringify(user))

export const getSession=(key="user")=>JSON.parse(localStorage.getItem(key))

export const clearSession=()=>{
    
    localStorage.clear()
    notify("You have been logged out!")


}

export const getActiveUserID=()=>{
    const activeUser=getSession()
    if(activeUser)
    {
        return activeUser._id.$oid;
    }
    return null
   
}

export const generateRandomUser=()=>{
    for(let i=1;i<100;i++){
        const type=[CREDIT,DEBIT]
        const title="Demo"
        const amount=parseInt(Math.random()*1000)+1
        const category=CATEGORY_OF_ICON[Math.floor(Math.random() * 6)].category
    const date=new Date(new Date().setDate(i)).toDateString()
    const obj={type:type[i%2],title,amount,category,date}
    createTransaction(obj)
    }
    
}

export const encrypt=(string)=>{
    return btoa(string)

}