import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

// Instância para rotas com '/api'
export const apiWithPrefix = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://backend-qw27yrwzw-diogusvinceres-projects.vercel.app/api'
    : 'http://localhost:5000/api', // URL do backend em desenvolvimento
});

// Instância para rotas sem '/api'
export const apiWithoutPrefix = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://backend-qw27yrwzw-diogusvinceres-projects.vercel.app'
    : 'http://localhost:5000', // URL do backend em desenvolvimento
});

// Adicionando interceptor para incluir o token nas requisições
const addTokenInterceptor = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Pega o token armazenado no localStorage
      console.log('Token enviado:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Aplica o interceptor para as instâncias com e sem '/api'
addTokenInterceptor(apiWithPrefix);
addTokenInterceptor(apiWithoutPrefix);

// Exportando uma das instâncias como default, se desejado
export default apiWithPrefix; // ou export default apiWithoutPrefix