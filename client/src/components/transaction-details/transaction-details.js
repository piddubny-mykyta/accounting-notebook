import TransactionType from './../transaction-type/transaction-type';
import { format } from 'date-fns';

function TransactionDetails(props) {
  const { transaction } = props;
  return <div>
    <div>Id: {transaction.id}</div>
    <div>Type: {<TransactionType type={transaction.type} />}</div>
    <div>Amount: {transaction.amount}</div>
    <div>Effective Date: {format(transaction.effectiveDate, 'dd/mm/yyyy HH:MM:ss')}</div>
  </div>
}

export default TransactionDetails;