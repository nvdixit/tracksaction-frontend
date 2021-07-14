import axios from 'axios';
import React, { Component } from 'react';
import CreditCardList from './List/CreditCardList';
import "./CreditCardListContainer.css"

class CreditCard {
    constructor(name) {
        this.name = name;
    }
}

export default class CreditCardListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      items: props.initList
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  onSubmit = (event) => {
    const formData = new FormData();
    formData.append("name", this.state.term)

    axios.post('https://tracksaction-backend.com/api/v1/creditCards/${creditCardName}/creditCard/upload',
                formData,
                {
                    headers: {
                        "card-name": "string"
                    }
                }
    ).then(() => {
        console.log("Success")
    }).catch(err => {
        console.log(err)
    })

    this.props.initList.push(new CreditCard(this.state.term))

    event.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }

  render() {
    return (
      <div id="FinalContainer">

      <h1><center>{this.props.title}</center></h1>

        <div id="List">
            <CreditCardList items={this.props.initList}/>
        </div>

        <center><form className="App" onSubmit={this.onSubmit}>
            <p id="AddLabel">Add {this.props.addIdentifier}</p><input value={this.state.term} onChange={this.onChange}/>
            <button>Add</button>
        </form></center>

      </div>
    );
  }
}