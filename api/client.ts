// api/client.ts

class HttpClient {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    async get(endpoint: string): Promise<any> {
      const response = await fetch(`${this.baseUrl}${endpoint}`,{
        method:'GET',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  
    async post(endpoint: string, data: any): Promise<any> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  
    async put(endpoint: string, data: any): Promise<any> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  
    async delete(endpoint: string): Promise<any> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        credentials:'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }
  }
  
  // Example usage
  const client = new HttpClient('https://localhost:5001/api');
  
  // Export the client for use in other modules
  export { client };