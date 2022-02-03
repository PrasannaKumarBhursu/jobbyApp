// import React, { useState } from "react";
// import "./index.css";
// import { Card, Button, Form, Spinner } from "react-bootstrap";
// import Cookies from "js-cookie";

// export const LoginRoute = (props) => {
//   const [usererr, setUsererr] = useState("");
//   const [pass, setPass] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [failmsg, setFailmsg] = useState("");
//   const [showSpinner, setShowSpinner] = useState(false);

//   const onSuccess = (jwt_token) => {
//     const { history } = props;
//     Cookies.set("jwt_token", jwt_token, { expires: 30 });
//     setShowSpinner(false);
//     history.replace("/home");
//   };

//   const onFailure = () => {
//     setFailmsg("*Username and Password don't match");
//   };

//   const getDetails = async (e) => {
//     e.preventDefault();
//     setShowSpinner(true);
//     const userDetails = { username, password };
//     const url = "https://apis.ccbp.in/login";

//     const options = {
//       method: "POST",
//       body: JSON.stringify(userDetails),
//     };

//     const response = await fetch(url, options);
//     const data = await response.json();
//     if (response.ok === true) {
//       onSuccess(data.jwt_token);
//     } else {
//       setShowSpinner(false);
//       onFailure();
//     }
//   };
//   console.log(username);

//   const userName = (e) => {
//     setUsername(e.target.value);
//   };

//   const userPassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const blurEventUser = (e) => {
//     e.target.value === "" ? setUsererr("Required*") : setUsererr("");
//   };

//   const blurEventPass = (e) => {
//     e.target.value === "" ? setPass("Required*") : setPass("");
//   };

//   return (
//     <>
//       {showSpinner ? (
//         <div
//           className="d-flex justify-content-center align-items-center bg-dark"
//           style={{ minHeight: "100vh" }}
//         >
//           <Spinner animation="border" variant="primary" />
//         </div>
//       ) : (
//         <div
//           className="d-flex justify-content-center align-items-center p-4 bg-dark"
//           style={{ minHeight: "100vh" }}
//         >
//           <Form onSubmit={getDetails}>
//             <Card style={{ width: "22rem" }} className="p-3 bg-dark shadow-lg">
//               <Card.Body>
//                 <div className="text-center">
//                   <img
//                     src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
//                     className="p-3"
//                     alt=""
//                   />
//                 </div>
//                 <div className="w-100 mb-3">
//                   <label
//                     htmlFor="userName"
//                     style={{
//                       fontSize: "0.9rem",
//                       color: "white",
//                       textTransform: "capitalize",
//                     }}
//                   >
//                     USERNAME
//                   </label>
//                   <input
//                     type="text"
//                     className="w-100 form-control bg-dark text-light"
//                     placeholder="Username"
//                     id="userName"
//                     onBlur={blurEventUser}
//                     onChange={userName}
//                     value={username}
//                   />
//                   <p className="text-danger">{usererr}</p>
//                 </div>
//                 <div className="w-100 mb-3">
//                   <label
//                     htmlFor="userPassword"
//                     style={{
//                       fontSize: "0.9rem",
//                       color: "white",
//                       textTransform: "capitalize",
//                     }}
//                   >
//                     PASSWORD
//                   </label>
//                   <input
//                     type="password"
//                     className="w-100 form-control bg-dark text-light"
//                     placeholder="Password"
//                     id="userPassword"
//                     onBlur={blurEventPass}
//                     value={password}
//                     onChange={userPassword}
//                   />
//                   <p className="text-danger">{pass}</p>
//                 </div>
//                 <Card.Text style={{ textTransform: "capitalize" }}></Card.Text>
//               </Card.Body>
//               <Button type="submit">Login</Button>
//               <p className="text-danger mt-2">{failmsg}</p>
//             </Card>
//           </Form>
//         </div>
//       )}
//     </>
//   );
// };

import React, { Component } from "react";
import "./index.css";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import Cookies from "js-cookie";

export class LoginRoute extends Component {
  state = {
    usererr: "",
    pass: "",
    username: "",
    password: "",
    failmsg: "",
    showSpinner: false,
  };

  blurEventUser = (e) => {
    e.target.value === ""
      ? this.setState({ usererr: "Required*" })
      : this.setState({ usererr: "" });
  };

  blurEventPass = (e) => {
    e.target.value === ""
      ? this.setState({ pass: "Required*" })
      : this.setState({ pass: "" });
  };

  userName = (e) => {
    this.setState({ username: e.target.value });
  };

  userPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onFailure = () => {
    this.setState({ showSpinner: false });
    this.setState({ failmsg: "*Username and Password don't match" });
  };

  onSuccess = (jwt_token) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwt_token, { expires: 30 });
    this.setState({ showSpinner: false });
    history.replace("/");
  };

  getDetails = async (e) => {
    e.preventDefault();
    this.setState({ showSpinner: true });
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";

    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSuccess(data.jwt_token);
    } else {
      this.onFailure();
    }
  };

  render() {
    const { username, password, usererr, pass, failmsg, showSpinner } =
      this.state;
    return (
      <>
        {showSpinner ? (
          <div
            className="d-flex justify-content-center align-items-center bg-dark"
            style={{ minHeight: "100vh" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center p-4 bg-dark"
            style={{ minHeight: "100vh" }}
          >
            <Form onSubmit={this.getDetails}>
              <Card
                style={{ width: "22rem" }}
                className="p-3 bg-dark shadow-lg"
              >
                <Card.Body>
                  <div className="text-center">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                      className="p-3"
                      alt="website log"
                    />
                  </div>
                  <div className="w-100 mb-3">
                    <label
                      htmlFor="userName"
                      style={{
                        fontSize: "0.9rem",
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      className="w-100 form-control bg-dark text-light"
                      placeholder="Username"
                      id="userName"
                      onBlur={this.blurEventUser}
                      onChange={this.userName}
                      value={username}
                    />
                    <p className="text-danger">{usererr}</p>
                  </div>
                  <div className="w-100 mb-3">
                    <label
                      htmlFor="userPassword"
                      style={{
                        fontSize: "0.9rem",
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      className="w-100 form-control bg-dark text-light"
                      placeholder="Password"
                      id="userPassword"
                      onBlur={this.blurEventPass}
                      value={password}
                      onChange={this.userPassword}
                    />
                    <p className="text-danger">{pass}</p>
                  </div>
                  <Card.Text
                    style={{ textTransform: "capitalize" }}
                  ></Card.Text>
                </Card.Body>
                <Button type="submit">Login</Button>
                <p className="text-danger mt-2">{failmsg}</p>
              </Card>
            </Form>
          </div>
        )}
      </>
    );
  }
}
