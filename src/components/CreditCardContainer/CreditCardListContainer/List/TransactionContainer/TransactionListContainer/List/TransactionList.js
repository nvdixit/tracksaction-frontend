import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NumberFormat from 'react-number-format';
import './TransactionList.css'

function TransactionList(props) {
    const [list, setList] = useState([])

    useEffect(() => {
        setList(props.items);
    },[props.items]);

    const handleClick = (transaction, index) => {
        list.splice(index, 1)
        let newList = []
        list.forEach(element => newList.push(element));
        setList(newList)

        const formData = new FormData();
        formData.append("name", transaction.name)
        formData.append("amount", transaction.amount)

        axios.post('http://tracksaction-env-1.eba-txawxm49.us-east-2.elasticbeanstalk.com/api/v1/transactions/transaction/delete', 
            formData,
            {
                headers: {
                    "name": "string",
                    "amount": "double",
                }
            }
        ).then(() => {
            console.log("Success")
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <ul id="TransactionListDisplay">
            {list.map((item, index) => 
            <li key={index} id="TransactionListItem">
                <div id="TransactionListItemDiv">
                    {item.name} &nbsp; - &nbsp;
                    <NumberFormat value={item.amount} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                </div>
    
                <div id="TransactionListDeleteButton">
                    <button id="DeleteTransaction" onClick={() => handleClick(item, index)}>Delete</button>
                </div>
            </li>)}
        </ul>
    )
}
export default TransactionList