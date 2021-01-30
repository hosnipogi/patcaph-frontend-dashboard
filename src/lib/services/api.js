import axios from 'axios';
import { AXIOS_CONFIG as CONFIG } from '../config/Axios';
import { SANCTUM } from '../config/URLs';

class API {
  constructor({
    url,
    method = 'get',
    config = null,
    data = null,
    submitProps = null, // formik props
    setResponse = null,
    messageOnSuccess = 'Success',
  }) {
    this.axios = axios;
    this.cancelTokenSource = this.axios.CancelToken.source();
    this.api = this.axios.create({
      ...CONFIG,
      cancelToken: this.cancelTokenSource.token,
      ...this.config,
    });
    this.url = url;
    this.method = method;
    this.config = config;
    this.data = data;
    this.submitProps = submitProps;
    this.setResponse = setResponse;
    this.messageOnSuccess = messageOnSuccess;
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this.api['get'](SANCTUM)
        .then(() => {
          this.api[this.method](this.url, this.data)
            .then((response) => {
              if (String(response.status)[0] === '2') {
                this.submitProps?.setSubmitting(false);
                this.setResponse?.({
                  success: true,
                  message: this.messageOnSuccess,
                });
                resolve(response);
              } else {
                throw Error('Invalid response');
              }
            })
            .catch((error) => {
              const err =
                error.response !== undefined ? error.response.data : error;
              this.submitProps?.setSubmitting(false);
              this.setResponse?.({
                success: false,
                message: err.message,
              });
              reject(err);
            });
        })
        .catch((err) => {
          console.log({ sanctumErr: err });
          reject(err);
        });
    });
  }

  abort(message = null) {
    return this.cancelTokenSource.cancel(message || 'Request aborted');
  }

  instance() {
    return this.api;
  }
}

export default API;
