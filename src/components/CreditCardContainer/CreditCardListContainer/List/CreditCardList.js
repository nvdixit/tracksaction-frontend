import React, {useState, useEffect, Component} from 'react'
import axios from 'axios'
import "./CreditCardList.css"
import TransactionListContainer from "./TransactionContainer/TransactionListContainer/TransactionListContainer"

class CreditCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ccToRender: -1,
            transactions: []
        };
    }

    cardClicked(ccid) {
        axios.get("http://tracksaction-env-1.eba-txawxm49.us-east-2.elasticbeanstalk.com/api/v1/transactions", {
            params: {
                ccid: ccid
            }
        }).then(res => {
            this.setState({transactions: res.data})
            this.setState({ccToRender: ccid})
        });
    }

    deleteCard = (creditCard, index) => {
        this.props.items.splice(index, 1)

        const formData = new FormData();
        formData.append("id", creditCard.id)
        formData.append("name", creditCard.name)

        axios.post('http://tracksaction-env-1.eba-txawxm49.us-east-2.elasticbeanstalk.com/api/v1/creditCards/creditCard/delete', 
            formData,
            {
                headers: {
                    "id": "int",
                    "name": "string",
                }
            }
        ).then(() => {
            console.log("Success")
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <ul id="CCList">
                    {this.props.items.map((creditCard, index) => 
                    <li key={index} id="ListItem" onClick={() => this.cardClicked(creditCard.id)}>
                        <div id="CreditCardElement">
                            &nbsp;&nbsp;&nbsp;&nbsp;{creditCard.name}
                            <button id="CCDeleteButton" onClick={() => this.deleteCard(creditCard, index)}>Delete</button>
                        </div>
                    </li>)}
                </ul>
                <TransactionListContainer title="Transactions" addIdentifier="Transaction: " initList={this.state.transactions} ccid={this.state.ccToRender}/>
            </div>
        )
    }
}

export default CreditCardList;