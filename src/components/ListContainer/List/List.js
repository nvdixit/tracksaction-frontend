import React, { Component } from 'react';
import './List.css'

class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardClicked: props.cardClicked
        }   
    }

    render() {
        return (
            <ul>
                {this.props.items.map((item, index) => <li key={index} id="ListItem">{item}</li>)}
            </ul>
        )
    }
}

export default List;