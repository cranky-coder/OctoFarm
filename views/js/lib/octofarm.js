export default class OctoFarmclient {
  static get(item) {
    let url = `/${item}`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  static delete(ip, port, apikey, item) {
    let url = `http://${ip}:${port}/api/${item}`;
    return fetch(url, {
      method: "DELETE",
      headers: {
        "X-Api-Key": apikey
      }
    });
  }
  static post(item, data) {
    let url = `/${item}`;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
}

