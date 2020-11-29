class TransactionService {
  async getAll() {
    const response = await fetch('/api/transactions');
    const transactions = await response.json();
    transactions.forEach(transaction => {
      transaction.effectiveDate = new Date(transaction.effectiveDate)
    });
    return transactions;
  }
}

export default new TransactionService();