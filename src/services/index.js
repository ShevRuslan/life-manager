export default class LifeManagerApiService {
  getResource = async (url, data, method) => {
    const res = await fetch(url, {
      body: data,
      method: method,
      credentials: 'include',
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }

    return await res.json();
  };

  loginUser = async data => {
    const res = await this.getResource('/login', data, 'POST');
    return res.json();
  };

  registerUser = async data => {
    const res = await this.getResource('/register', data, 'POST');
    return res.json();
  };
}
