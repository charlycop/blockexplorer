import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

// ...

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockWithTransactions, setBlockWithTransactions] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the block number
        const currentBlockNumber = await alchemy.core.getBlockNumber();
        setBlockNumber(currentBlockNumber);
  
        // Use the block number to make another query
        const blockWithTransactions_ = await alchemy.core.getBlockWithTransactions(currentBlockNumber);
        setBlockWithTransactions(blockWithTransactions_);
        
        // Other logic or state updates can be added here
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors as needed
      }
    }
  
    fetchData();

  }, []);


  if (blockWithTransactions) {
    return (
      <div className="App">
        <p>Block Number: {blockNumber}</p>
  
        <p>{blockWithTransactions.transactions.length} Transactions:</p>
  
        <div>
          {blockWithTransactions.transactions.map((transaction, index) => (
            <div key={index}>
              <p>

              <a href={`https://sepolia.etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer">Transaction[{transaction.transactionIndex}]</a><br />
                From: <a href={`https://sepolia.etherscan.io/address/${transaction.from}`} target="_blank" rel="noopener noreferrer">{transaction.from}</a><br />
                To: <a href={`https://sepolia.etherscan.io/address/${transaction.to}`} target="_blank" rel="noopener noreferrer">{transaction.to}</a><br />
                Amount: {parseInt(transaction.value._hex, 16) / Math.pow(10, 9)} GWei<br />
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  else{
    return <div className="App"></div>;
  }
  
  
  
}

export default App;
