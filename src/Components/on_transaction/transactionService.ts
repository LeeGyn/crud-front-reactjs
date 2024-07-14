import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8083/api';

export const transferFunds = async (sourceClientId: string, destinationClientId: string, amount: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transfer`, {
      sourceClientId,
      destinationClientId,
      amount
    });
    return response.data;
  } catch (error) {
    console.error("Error transferring funds:", error);
    throw error;
  }
};

export const getTransfersForDay = async (date: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transfers/${date}`, {
      responseType: 'blob', // Important for downloading files
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `transfers_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return response;
  } catch (error) {
    console.error("Error fetching transfers for the day:", error);
    throw error;
  }
};
