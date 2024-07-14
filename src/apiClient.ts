import axios from 'axios';

// Définir les interfaces pour les requêtes et réponses
interface TransferRequest {
  sourceClientId: string;
  destinationClientId: string;
  amount: number;
}

interface TransferResponse {
  message: string;
  transfer: {
    transferDate: string;
    sourceClientId: string;
    sourceSubscriberId: string;
    amount: number;
    destinationClientId: string;
    destinationSubscriberId: string;
  } | null;
}

// Configurer l'instance Axios
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8083/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Fonction pour transférer des fonds
export const transferFunds = async (request: TransferRequest): Promise<TransferResponse> => {
  try {
    const response = await apiClient.post<TransferResponse>('/transfer', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// Fonction pour obtenir les transferts d'une journée spécifique
export const getTransfersForDay = async (date: string): Promise<Blob> => {
  try {
    const response = await apiClient.get<Blob>(`/transfers/${date}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Error: ${error.response.statusText}`);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
