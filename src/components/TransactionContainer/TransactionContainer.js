import React from 'react'
import ListContainer from '../ListContainer/ListContainer'

function TransactionContainer() {
    return (
        <div>
            <ListContainer title="Transactions" addIdentifier="Transaction: " initList={["Groceries", "Gas", "Rent"]}/>
        </div>
    )   
}
export default TransactionContainer;