import React from 'react';
import transactionService from './../../services/transactions-service';
import { Accordion, Card } from 'react-bootstrap';
import TransactionType from './../transaction-type/transaction-type';
import TransactionDetails from './../transaction-details/transaction-details';
import './transactions-list.css';

class TransactionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  async componentDidMount() {
    const transactions = await this.loadTransactions();
    this.setState({
      transactions
    });
  }

  async loadTransactions() {
    return await transactionService.getAll();
  }

  render() {
    const { transactions } = this.state;
    const transactionEntries = transactions
      .sort((a, b) => b.effectiveDate - a.effectiveDate)
      .map(transaction => 
      <Card key={transaction.id}>
        <Accordion.Toggle as={Card.Header} eventKey={transaction.id}>
            <TransactionType type={transaction.type} />
            <span className='ml-2'>{transaction.amount}</span>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={transaction.id}>
          <Card.Body>
            <TransactionDetails transaction={transaction} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>);

    return <Accordion>{transactionEntries}</Accordion>
  }
}

export default TransactionsList;