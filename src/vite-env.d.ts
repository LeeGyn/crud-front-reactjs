/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_HOST: string;
  readonly VITE_API_BASE_PORT: string;
  readonly VITE_API_BASE_BOOK: string;
  readonly VITE_API_BASE_RESERVATION: string;
  // ajoutez d'autres variables d'environnement ici si nécessaire
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
