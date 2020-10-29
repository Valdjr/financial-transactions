import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acumulator, current) => {
      if (current.type === 'income') {
        return acumulator + current.value;
      }
      return acumulator;
    }, 0);
    const outcome = this.transactions.reduce((acumulator, current) => {
      if (current.type === 'outcome') {
        return acumulator + current.value;
      }
      return acumulator;
    }, 0);
    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
