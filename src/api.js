import axios from "axios";

// eslint-disable-next-line fp/no-mutation
axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

const JSON_OPTS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const apiGet = (url, opts) =>
  axios.get(url, opts).then(({ data, headers }) => ({ data, headers }));

export { apiGet, JSON_OPTS };