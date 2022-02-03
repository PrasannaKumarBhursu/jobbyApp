// import React, { useState } from "react";
// import JobbyHeader from "../JobbyHeader";
// import { Spinner } from "react-bootstrap";
// import "./index.css";

// export const NotFound = () => {
//   const [showSpinner, setShowSpinner] = useState(false);

//   const hideSpinner = (val) => {
//     setShowSpinner(val);
//     console.log("anjan");
//   };

//   return (
//     <>
//       {showSpinner ? (
//         <div
//           className="d-flex justify-content-center align-items-center"
//           style={{ minHeight: "100vh" }}
//         >
//           <Spinner animation="border" variant="primary" />
//         </div>
//       ) : (
//         <div>
//           <JobbyHeader hideSpinner={hideSpinner} />
//           <div className="notfound__container d-flex flex-column justify-content-center align-items-center">
//             <img
//               src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
//               alt="notfound"
//               style={{ objectFit: "cover" }}
//             />
//             <div
//               style={{ textAlign: "center", color: "white" }}
//               className="p-4"
//             >
//               <h1>Page Not Found</h1>
//               <p>We're sorry, the page you requested could not be found</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

import React, { Component } from "react";
import JobbyHeader from "../JobbyHeader";
import { Spinner } from "react-bootstrap";
import "./index.css";

export class NotFound extends Component {
  state = {
    showSpinner: false,
  };

  hideSpinner = (val) => {
    this.setState({ showSpinner: val });
  };

  render() {
    const { showSpinner } = this.state;
    return (
      <>
        {showSpinner ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div>
            <JobbyHeader hideSpinner={this.hideSpinner} />
            <div className="notfound__container d-flex flex-column justify-content-center align-items-center">
              <img
                src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
                alt="notfound"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{ textAlign: "center", color: "white" }}
                className="p-4"
              >
                <h1>Page Not Found</h1>
                <p>We're sorry, the page you requested could not be found</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
