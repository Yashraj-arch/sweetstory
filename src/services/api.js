// API Service Layer for Sweet Story Cakes Full-Stack Backend
const API_BASE = '/api/v1';

function getAuthHeaders() {
  const token = localStorage.getItem('sweetstory_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const authAPI = {
  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Registration failed');
    }
    if (data.access_token) {
      localStorage.setItem('sweetstory_token', data.access_token);
    }
    return data;
  },

  async login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Invalid phone/email or password');
    }
    if (data.access_token) {
      localStorage.setItem('sweetstory_token', data.access_token);
    }
    return data;
  },

  async getProfile() {
    const token = localStorage.getItem('sweetstory_token');
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('sweetstory_token');
      }
      return null;
    }
    return await res.json();
  },

  async logout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
      });
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem('sweetstory_token');
    }
    return true;
  }
};

export const subscriberAPI = {
  async subscribe({ phone, email }) {
    const res = await fetch(`${API_BASE}/subscribers/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, email: email || null }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Unable to subscribe at this moment');
    }
    return data;
  }
};

export const ordersAPI = {
  async getQuote(quoteData) {
    const res = await fetch(`${API_BASE}/orders/quote`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(quoteData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Failed to calculate quote');
    }
    return data;
  },

  async createOrder(orderData) {
    const res = await fetch(`${API_BASE}/orders/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Failed to submit order');
    }
    return data;
  },

  async getMyOrders() {
    const res = await fetch(`${API_BASE}/orders/my-orders`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (!res.ok) {
      return [];
    }
    return await res.json();
  }
};

export const assistantAPI = {
  async getContext() {
    try {
      const res = await fetch(`${API_BASE}/assistant/context`);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async sendChat(messages, customerName = null) {
    const res = await fetch(`${API_BASE}/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        customer_name: customerName,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || 'Assistant temporarily unavailable');
    }
    return data;
  }
};
