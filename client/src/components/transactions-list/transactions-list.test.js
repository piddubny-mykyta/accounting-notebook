import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import TransactionsList from './transactions-list';

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

it("renders transaction list", async () => {
  const transaction = {
    id: '45093845',
    type: 'credit',
    amount: 45,
    effectiveDate: new Date()
  };

  jest.spyOn(TransactionsList.prototype, 'loadTransactions').mockImplementation(() =>
    Promise.resolve([
      {
        id: '45093845',
        type: 'credit',
        amount: 45,
        effectiveDate: new Date('2020-10-20')
      },
      {
        id: '437923',
        type: 'debit',
        amount: 15,
        effectiveDate: new Date('2020-10-25')
      }
    ])
  );

  await act(async () => {
    render(<TransactionsList />, container);
  });

  const cardHeaders = container.querySelectorAll('.card-header');
  expect(cardHeaders.length).toBe(2);
  expect(cardHeaders[0].textContent).toContain('DEBIT15');
  expect(cardHeaders[1].textContent).toContain('CREDIT45');
});