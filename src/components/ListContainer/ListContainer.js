import React, { Component } from 'react';
import List from './List/List';
import "./ListContainer.css"

export default class ListContainer extends Component {
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
    event.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }

  render() {
    return (
      <div id="FinalContainer">
        <h2>{this.props.title}</h2>
        <div id="List">
          <List items={this.state.items}/>
        </div>
        <form className="App" onSubmit={this.onSubmit}>
            Add {this.props.addIdentifier}<input value={this.state.term} onChange={this.onChange}/>
            <button>Add</button>
          </form>
      </div>
    );
  }
}