const config = {
  apiBaseHost: import.meta.env.VITE_API_BASE_HOST,
  apiBasePort: import.meta.env.VITE_API_BASE_PORT,
  apiBaseTransfer: import.meta.env.VITE_API_BASE_TRANSACTION,
  apiBaseReservation: import.meta.env.VITE_API_BASE_RESERVATION,

  get apiBaseUrl() {
    return `${this.apiBaseHost}:${this.apiBasePort}`;
  },
  get booksEndpoint() {
    return `${this.apiBaseUrl}${this.apiBaseTransfer}`;
  },
  get reservationsEndpoint() {
    return `${this.apiBaseUrl}${this.apiBaseReservation}`;
  },
};

export default config;
