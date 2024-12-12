import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

// Instância para rotas com '/api'
export const apiWithPrefix = axios.create({
  baseURL: 'http://localhost:5000/api/', // Base para rotas com '/api'
});

// Instância para rotas sem '/api'
export const apiWithoutPrefix = axios.create({
  baseURL: 'http://localhost:5000', // Base para rotas sem '/api'
});

// Adicionando interceptor para incluir o token nas requisições (para ambas as instâncias)
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
addTokenInterceptor(apiWithPrefix);
addTokenInterceptor(apiWithoutPrefix);

// Exportando uma das instâncias como default, se desejado
export default apiWithPrefix; // ou export default apiWithoutPrefix