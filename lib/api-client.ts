// ProofBox API client for blockchain interactions

// Base API URL - would come from env in production
const API_BASE_URL = '/api/proofbox';

// Generic API call function
async function apiCall<T>(
  endpoint: string, 
  method: string = 'GET', 
  data?: any
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  
  return response.json();
}

// API Functions
export const proofboxApi = {
  // Blockchain network operations
  networks: {
    getStatus: () => apiCall('/networks/status'),
    getInfo: (network: string) => apiCall(`/networks/${network}/info`),
  },
  
  // Record operations
  records: {
    create: (network: string, data: any) => apiCall(`/records/${network}`, 'POST', data),
    verify: (network: string, recordId: string) => apiCall(`/records/${network}/verify/${recordId}`),
    get: (network: string, recordId: string) => apiCall(`/records/${network}/${recordId}`),
    list: (network: string, filters?: any) => apiCall(`/records/${network}`, 'GET', { filters }),
  },
  
  // Legal review specific operations
  reviews: {
    create: (data: any) => apiCall('/reviews', 'POST', data),
    get: (reviewId: string) => apiCall(`/reviews/${reviewId}`),
    list: (filters?: any) => apiCall('/reviews', 'GET', { filters }),
  },
  
  // CLE record specific operations
  cle: {
    create: (data: any) => apiCall('/cle', 'POST', data),
    verify: (recordId: string) => apiCall(`/cle/verify/${recordId}`),
    get: (recordId: string) => apiCall(`/cle/${recordId}`),
    list: (filters?: any) => apiCall('/cle', 'GET', { filters }),
  },
};

export default proofboxApi;