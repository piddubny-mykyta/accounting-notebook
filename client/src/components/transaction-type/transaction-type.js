import './transaction-type.css';

function TransactionType(props) {
  return <span className={props.type}>{props.type.toUpperCase()}</span>
}

export default TransactionType;