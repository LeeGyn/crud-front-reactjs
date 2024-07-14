import React, { useState } from 'react';
import { getTransfersForDay, transferFunds } from '../../apiClient';

const TransferComponent: React.FC = () => {
  const [sourceClientId, setSourceClientId] = useState('');
  const [destinationClientId, setDestinationClientId] = useState('');
  const [amount, setAmount] = useState(0);
  const [transferDate, setTransferDate] = useState('');
  const [validated, setValidated] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const request = {
          sourceClientId: sourceClientId,
          destinationClientId: destinationClientId,
          amount: amount
        };
        const response = await transferFunds(request); // Appel de transferFunds avec la requête
        console.log("Transfer successful:", response);
      } catch (error) {
        console.error("Transfer failed:", error);
      }
    }
    setValidated(true);
  };

  const handleDownloadTransfers = async (e) => {
    e.preventDefault();
    try {
      await getTransfersForDay(transferDate);
      console.log("Transfer data downloaded successfully.");
    } catch (error) {
      console.error("Failed to download transfer data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Transfer Funds</h1>
      <form
        className={`needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleTransfer}
      >
        <div className="row">
          <div className="col-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Source Client ID"
              value={sourceClientId}
              onChange={(e) => setSourceClientId(e.target.value)}
              required
            />
            <div className="invalid-feedback">Please provide a valid Source Client ID.</div>
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Destination Client ID"
              value={destinationClientId}
              onChange={(e) => setDestinationClientId(e.target.value)}
              required
            />
            <div className="invalid-feedback">Please provide a valid Destination Client ID.</div>
          </div>
          <div className="col-4">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
            <div className="invalid-feedback">Please provide a valid Amount.</div>
          </div>
        </div>
        <div className="row">
          <div className="col text-end mt-2">
            <button type="submit" className="btn btn-primary">Transfer</button>
          </div>
        </div>
      </form>

      <h1 className="mt-5">Download Transfers</h1>
      <form onSubmit={handleDownloadTransfers}>
        <div className="row">
          <div className="col-12 mb-2">
            <input
              type="date"
              className="form-control"
              value={transferDate}
              onChange={(e) => setTransferDate(e.target.value)}
              required
            />
            <div className="invalid-feedback">Please select a valid date.</div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary">Download CSV</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransferComponent;
