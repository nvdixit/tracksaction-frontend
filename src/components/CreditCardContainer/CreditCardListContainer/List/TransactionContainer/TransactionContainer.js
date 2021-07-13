import React from 'react'
import TransactionListContainer from './TransactionListContainer/TransactionListContainer'

function TransactionContainer(props) {
    return (
        <TransactionListContainer title="Transactions" addIdentifier="Transaction: " initList={props.transactions}/>
    )
}

export default TransactionContainer;