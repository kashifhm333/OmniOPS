// Universal Fetch-based API Client for OmniOPS Web

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api/v1";

class ApiClient {
  constructor() {
    this.baseURL = API_BASE;
    this.withCredentials = true;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    
    // Read CSRF cookie if available
    const csrfMatch = document.cookie.match(/omniops_csrf=([^;]+)/);
    const csrfToken = csrfMatch ? decodeURIComponent(csrfMatch[1]) : "";

    const headers = {
      "Content-Type": "application/json",
      ...(csrfToken && { "X-CSRF-Token": csrfToken }),
      ...options.headers
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include" // sends omniops_session cookie automatically
    });

    if (response.status === 204) {
      return null;
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data?.error?.message || `HTTP error ${response.status}`);
      error.status = response.status;
      error.code = data?.error?.code || "REQUEST_FAILED";
      error.details = data?.error?.details;
      throw error;
    }

    return data?.data !== undefined ? data.data : data;
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body)
    });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body)
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
