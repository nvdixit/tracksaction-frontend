import axios from 'axios';
import React, { Component } from 'react';
import TransactionList from './List/TransactionList'
import "./TransactionListContainer.css"

class Transaction {
    constructor(name, amount, ccid) {
        this.name = name;
        this.amount = amount;
        this.ccid = ccid;
    }
}

export default class ListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      price: '',
      ccid: this.props.ccid,
      items: this.props.initList
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  onPriceChange = (event) => {
    this.setState({ price: event.target.value})
  }

  onSubmit = (event) => {
    const formData = new FormData();
    formData.append("name", this.state.term)
    formData.append("amount", this.state.price)
    formData.append("ccid", this.props.ccid)   

    axios.post('http://tracksaction-env-1.eba-txawxm49.us-east-2.elasticbeanstalk.com/api/v1/transactions/transactionName/transaction/upload', 
                formData,
                {
                    headers: {
                        "name": "string",
                        "amount": "double",
                        "ccid": "int"
                    }
                }
    ).then(() => {
        console.log("Success")
    }).catch(err => {
        console.log(err)
    })

    this.props.initList.push(new Transaction(this.state.term, this.state.price, this.props.ccid))

    event.preventDefault();
    this.setState({
      term: "",
      price: '',
      ccid: this.props.ccid,
      items: [...this.state.items, this.state.term]
    });
  }

  render() {
    return (
      <div id="FinalContainer">
        <h1><center>{this.props.title}</center></h1>

        <div id="TransactionList">
          <TransactionList items={this.props.initList}/>
        </div>

        <center>
        <p id="AddLabel">Add {this.props.addIdentifier}</p>

        <form className="App" onSubmit={this.onSubmit}>
            <input value={this.state.term} onChange={this.onChange}/>
        </form>

        <form className="App" onSubmit={this.onSubmit}>
            <input value={this.state.price} onChange={this.onPriceChange}/>
            <button>Add</button>
        </form>

        </center>
      </div>
    );
  }
}