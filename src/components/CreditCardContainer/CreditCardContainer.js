import ListContainer from "../ListContainer/ListContainer"
import TransactionContainer from "../TransactionContainer/TransactionContainer"

function CreditCardContainer() {
    return (
        <div>
            <ListContainer title="Credit Cards" addIdentifier="Credit Card: " initList={["Visa", "Chase", "American Express"]}/>
            <TransactionContainer/>
        </div>
    )
}

export default CreditCardContainer;