import React, { useState } from "react";
import "./Transaction.css";
import { bankTransactions } from "./Data";

const Transaction = () => {
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem("transactions");
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    id: bankTransactions.length + 1,
    date: "",
    description: "",
    category: "",
    amount: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (
      newTransaction.date &&
      newTransaction.description &&
      newTransaction.category &&
      newTransaction.amount
    ) {
      setTransactions([...transactions, newTransaction]);
      setNewTransaction({
        // Generae a new unique id for each transaction
        id: bankTransactions.length + 1,
        date: "",
        description: "",
        category: "",
        amount: "",
      });
    }
  };

  const filteredTransactions = searchTerm
    ? transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
      
    : transactions;

    React.useEffect(() => {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

  return (
    // Search Bar 
    <div className="container">
      <div className="search-container">
        <form className="search-box">
          <div className="search-input-box">
            <input
              type="text"
              placeholder="Search your Recent Transactions"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </div>
        </form>
      </div>

      {/* // form */}
      <div id="submit-form">
        <form onSubmit={addTransaction} className="input-box">
         <div id= "input-box">
         <input
            id="date"
            type="date"
            name="date"
            placeholder="Date"
            className="form-input"
            value={newTransaction.date}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="form-input"
            value={newTransaction.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="form-input"
            value={newTransaction.category}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="form-input"
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
         </div>
         {/* // Button */}
          <div>
            <button type="submit" className="btn btn-primary">Add Transaction</button>
          </div>
        </form>
      </div>

{/* 
      // Display Table */}
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>Ksh {transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
