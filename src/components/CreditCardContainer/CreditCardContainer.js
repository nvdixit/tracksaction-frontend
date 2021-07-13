import axios from 'axios'
import React, {useEffect, useState} from 'react'
import CreditCardListContainer from "./CreditCardListContainer/CreditCardListContainer"

const CreditCards = () => {
    const [creditCards, setCreditCards] = useState([]);

    const fetchCreditCards = () => {
        axios.get("http://tracksaction-env-1.eba-txawxm49.us-east-2.elasticbeanstalk.com/api/v1/creditCards").then(res => {
            setCreditCards(res.data)
            console.log(res.data)
        });
    }

    useEffect(() => {
        fetchCreditCards();
    }, []);

    return (
        <div>
            <CreditCardListContainer title="Credit Cards" addIdentifier="Credit Card: " initList={creditCards}/>
        </div>
    );
}

function CreditCardContainer() {
    return (
        <div id="MainDiv">
            <CreditCards/>
        </div>
    )
}

export default CreditCardContainer;