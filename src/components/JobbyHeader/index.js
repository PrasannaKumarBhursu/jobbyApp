// import React from "react";
// import "./index.css";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import { Link, withRouter } from "react-router-dom";
// import HomeIcon from "@mui/icons-material/Home";
// import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
// import LogoutIcon from "@mui/icons-material/Logout";
// import Cookies from "js-cookie";
// const JobbyHeader = (props) => {
//   const { history, hideSpinner } = props;

//   const redirectTologin = () => {
//     Cookies.remove("jwt_token");
//     hideSpinner(true);
//     console.log("it's");
//     history.replace("/login");
//   };
//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container className="navbar_container">
//           <Navbar.Brand href="#home">
//             <div className="ml-3">
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
//                 alt="img_logo"
//                 className="image"
//               />
//             </div>
//           </Navbar.Brand>
//           <Nav>
//             <div className="mobile__screen mr-0">
//               <HomeIcon className="ml-3 text-light" />
//               <BusinessCenterIcon className="ml-3 text-light" />
//               <LogoutIcon
//                 className="ml-3 text-light"
//                 onClick={() => redirectTologin()}
//               />
//             </div>
//             <div className="large__screen">
//               <div className="d-flex align-items-center justify-content-evenly">
//                 <div className="d-flex">
//                   <Link className="nav_item">
//                     <h1>Home</h1>
//                   </Link>
//                   <Link className="nav_item">
//                     <h1>Jobs</h1>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </Nav>
//           <div>
//             <Button
//               className="logout_btn"
//               style={{ textTransform: "capitalize" }}
//               onClick={() => redirectTologin()}
//             >
//               Logout
//             </Button>
//           </div>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default withRouter(JobbyHeader);

import React, { Component } from "react";
import "./index.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

class JobbyHeader extends Component {
  redirectTologin = () => {
    const { history, hideSpinner } = this.props;
    Cookies.remove("jwt_token");
    hideSpinner(true);
    console.log("it's");
    history.replace("/login");
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container className="navbar_container">
            <Navbar.Brand href="#home">
              <div className="ml-3">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                  alt="img_logo"
                  className="image"
                />
              </div>
            </Navbar.Brand>
            <Nav>
              <div className="mobile__screen mr-0">
                <HomeIcon className="ml-3 text-light" />
                <BusinessCenterIcon className="ml-3 text-light" />
                <LogoutIcon
                  className="ml-3 text-light"
                  onClick={() => this.redirectTologin()}
                />
              </div>
              <div className="large__screen">
                <div className="d-flex align-items-center justify-content-evenly">
                  <div className="d-flex">
                    <Link className="nav_item">
                      <h1>Home</h1>
                    </Link>
                    <Link className="nav_item">
                      <h1>Jobs</h1>
                    </Link>
                  </div>
                </div>
              </div>
            </Nav>
            <div>
              <Button
                className="logout_btn"
                style={{ textTransform: "capitalize" }}
                onClick={() => this.redirectTologin()}
              >
                Logout
              </Button>
            </div>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default withRouter(JobbyHeader);
