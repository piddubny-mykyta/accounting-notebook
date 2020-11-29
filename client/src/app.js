import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TransactionsList from './components/transactions-list/transactions-list';

function App() {
  return (
    <Container className='pt-5'>
      <Row>
        <Col className="text-center">
          <h2>Accounting notebook</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <TransactionsList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
