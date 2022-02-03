// import React, { useState } from "react";
// import "./index.css";
// import JobbyHeader from "../JobbyHeader";
// import { Button, Spinner } from "react-bootstrap";

// export const HomeRoute = () => {
//   const [showSpinner, setShowSpinner] = useState(false);

//   const hideSpinner = (val) => {
//     setShowSpinner(val);
//     console.log("anjan");
//   };

//   console.log(showSpinner);
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
//         <div>
//           <JobbyHeader hideSpinner={hideSpinner} />
//           <div className="home_route_container">
//             <div className="p-4 homeroute__card" style={{ color: "white" }}>
//               <h1 className="homeroute__title mt-3">
//                 Find The job That Fits Your Life
//               </h1>
//               <p className="homeroute__discription mt-3">
//                 Millions of searching for jobs,salary informations, company
//                 reviews.Find the job that fits your abilities and potential
//               </p>
//               <Button className="mt-3">Find Jobs</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

import React, { Component } from "react";
import "./index.css";
import JobbyHeader from "../JobbyHeader";
import { Button, Spinner } from "react-bootstrap";

export class HomeRoute extends Component {
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
            className="d-flex justify-content-center align-items-center bg-dark"
            style={{ minHeight: "100vh" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div>
            <JobbyHeader hideSpinner={this.hideSpinner} />
            <div className="home_route_container">
              <div className="p-4 homeroute__card" style={{ color: "white" }}>
                <h1 className="homeroute__title mt-3">
                  Find The job That Fits Your Life
                </h1>
                <p className="homeroute__discription mt-3">
                  Millions of searching for jobs,salary informations, company
                  reviews.Find the job that fits your abilities and potential
                </p>
                <Button className="mt-3">Find Jobs</Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
