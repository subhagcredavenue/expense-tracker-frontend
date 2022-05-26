import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FlightIcon from '@mui/icons-material/Flight';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useState } from 'react';

export const CATEGORY_OF_ICON =[
    {
        category:"Shopping",
        icon:<AddShoppingCartIcon/>},
        {
        category:"Food",
        icon:<FastfoodIcon/>
    },{
        category:"Salary",
        icon:<LocalAtmIcon/>
    },{
        category:"Travel",
        icon:<FlightIcon/>
    },{
        category:"Rent",
        icon:<HomeIcon/>
    },{ category:"Other",
        icon:<ShoppingBasketIcon/>
}
]

export const CREDIT="CREDIT"
export const DEBIT="DEBIT"

export const TRANSACTION_TYPE=[CREDIT,DEBIT]

export const NOTIFICATION_TYPE={success:"success",error:"error"}

export const BASE_URL="https://expense-tracker-rails.herokuapp.com/users"