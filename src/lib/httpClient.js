const axios = require('axios');
const utils = require('./utils.js');

class HttpClient {
  async request(config) {
    return axios.request(config)
      .then(resp => {
        return {
          status: resp.status,
          statusMessage: resp.statusMessage,
          headers: resp.headers,
          body: resp.data
        };
      })
      .catch(error => {
        if (error.response) {
          throw new Error(JSON.stringify(error.response.data));
        }
        if (error.request) {
          throw new Error(error.toJSON().message);
        }
        throw error;
      });
  }

  isSmartUIRunning() {
    return this.request({
      url: `${utils.getSmartUIServerAddress()}/healthcheck`,
      method: 'GET'
    });
  }

  fetchDOMSerializer() {
    return this.request({
      url: `${utils.getSmartUIServerAddress()}/domserializer`,
      method: 'GET'
    });
  }

  postSnapshot(data) {
    return this.request({
      url: `${utils.getSmartUIServerAddress()}/snapshot`,
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

module.exports = new HttpClient();

