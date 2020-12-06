import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { format } from 'date-fns';

import TransactionDetails from './transaction-details';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders transaction details", () => {
  const transaction = {
    id: '45093845',
    type: 'credit',
    amount: 45,
    effectiveDate: new Date()
  };
  
  act(() => {
    render(<TransactionDetails transaction={transaction} />, container);
  });

  expect(container.textContent).toContain('Id: 45093845');
  expect(container.textContent).toContain('Amount: 45');
  expect(container.textContent).toContain('Type: CREDIT');
  expect(container.textContent).toContain(`Effective Date: ${format(transaction.effectiveDate, 'dd/MM/yyyy HH:mm:ss')}`);
});