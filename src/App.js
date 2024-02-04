import React from 'react';
import './App.css';
import { useState, useEffect } from "react";
import TransactionForm from './components/Form';
import TableTransaction from './components/table';
import SearchBar from './components/Search';
import Header from './components/header';


function App() {

  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/transactions') // Update the URL to match your JSON server endpoint.
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
  });

  function addTransaction(newTransaction) {
    // Simulate adding a new transaction
    // had help with gpt here on adding
    const id = Date.now();
    const transaction = { id, ...newTransaction };
    setTransactions([...transactions, transaction]);
  };
  //helps on search area when searching
  const filteredTransactions = transactions ? transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  function deleteTransaction(id) {
    // deleting a transaction 
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div className="App">
      {/* <header className="App-header">
     <h1>Flatiron Bank </h1>
      </header> */}
      <Header />
      <TableTransaction transactions={filteredTransactions} onDelete={deleteTransaction}/> 
      <SearchBar onSearch={setSearchTerm}/>
      <TransactionForm onSubmit={addTransaction}/>
    </div>
  );
}

export default App;