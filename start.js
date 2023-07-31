//AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// GET REQUEST
// function getTodos() {
//   axios({
//     method: 'get',
//     url: 'https://jsonplaceholder.typicode.com/comments'
//   })
//   .then(res => console.log(res))
//   .catch(err => console.log(err))
// }

const getTodos = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments",
      { params: { _limit: 9 } }
    );
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
};

// POST REQUEST
const addTodo = async () => {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/comments",
      {
        name: "Hasan Talha Çelik",
        email: "hasantalhahtc@gmail.com",
        body: "Bu bir posttur.",
      }
    );
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
};

// PUT/PATCH REQUEST
const updateTodo = async () => {
  try {
    const res = await axios.patch(
      "https://jsonplaceholder.typicode.com/comments/1",
      {
        name: "Hasan Talha Çelik",
        email: "hasantalhahtc@gmail.com",
        body: "Udated message.",
      }
    );
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
};

// DELETE REQUEST
const removeTodo = async () => {
  try {
    const res = await axios.delete(
      "https://jsonplaceholder.typicode.com/comments/1"
    );
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
};

// SIMULTANEOUS DATA
const getData = async () => {
  try {
    const res = await axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/comments?_limit=5"),
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
      ])
      // showOutput(res);
      // console.log(res[0])
      // console.log(res[1])
      .then(axios.spread((com, pos) => showOutput(pos)));
  } catch (err) {
    console.log(err);
  }
};

// CUSTOM HEADERS
const customHeaders = async () => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "sometoken",
      },
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/comments",
      {
        name: "Hasan Talha Çelik",
        email: "hasantalhahtc@gmail.com",
        body: "aaaaaaaaaaaaa.",
      },
      config
    );
    showOutput(res);
  } catch (err) {
    console.log(err);
  }
};

// TRANSFORMING REQUESTS & RESPONSES
const transformResponse = async () => {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/comments",
    data: {
      name: "QWERTY",
      email: "a@gmail.com",
      body: "qwerty.",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.name = data.name.toLowerCase();
      return data;
    }),
  };
  const res = await axios(options);
  showOutput(res);
};

// ERROR HANDLING
const errorHandling = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/commentss",
      { params: { _limit: 9 } }
    );
    showOutput(res);
  } catch (err) {
    if (err.response) {
      //Server responded with a status other than 200 range
      console.log(
        "ERROR!!! ",
        err.response.data,
        err.response.headers,
        err.response.status
      );
      if (err.response.status === 404) alert("Page Not Found");
    }
  }
};

// CANCEL TOKEN
const cancelToken = async () => {
  try {
    const source = axios.cancelToken.source();
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments",
      { params: { _limit: 9 }, cancelToken: source.token }
    );
    showOutput(res);
  } catch (thrown) {
    if (axios.isCancel(thrown)) console.log("Request canceled", thrown.message);
  }
};

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  // Other custom settings
  baseURL: 'https://jsonplaceholder.typicode.com'
});
axiosInstance.get('/users').then(res => showOutput(res));



// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
