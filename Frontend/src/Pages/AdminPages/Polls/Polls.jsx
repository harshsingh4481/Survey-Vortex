import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Context from "../../../Component/Context/Context";
import CandidatePieChart from "./CandidatePieChart";
import { useNavigate } from "react-router-dom";
// import "../../Admin/Admin.css";
import './Polls.css'
import PollingResults from "../PollingResults/PollingResults";

function Polls() {
  const navigate = useNavigate();
  
  const {pollingData,setPollingData}=useContext(Context);
  const [candidates, setCandidates] = useState([]);
  // const {maxCount,setMaxCount}=useContext(Context);
  const[maxCount,setMaxCount]=useState(0);
  const [winner,setWinner]=useState('');
  const { adminLoggedin, setAdminLoggedin, adminData } = useContext(Context);

  useEffect(() => {
    if (!adminLoggedin || !adminData) {
      navigate("/adminlogin");
    }
  }, [adminLoggedin]);

  const handleResetCountsAndVotes = () => {
    const confirmed = window.confirm("New Polls started !!!!!!!!!!!");
    if (!confirmed) return;
    Promise.all([
      fetch("http://localhost:3000/users/setvotes", { method: "PUT" }),
      fetch("http://localhost:3000/candidates/setcounts", { method: "PUT" }),
      fetch("http://localhost:3000/polling/", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ polling:true, maxCount:0, winner:null }),
      }),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        console.log("Responses from reset APIs:", data);
        alert("Votes and counts have been reset.");
      })
      .catch((error) =>
        console.error("Error resetting votes and counts:", error)
      );
  };

 
  const handleStopPolling = async () => {

    console.log(maxCount, winner);
  
    const confirmed = window.confirm("STOP POLLING and DECLARE RESULTS ?");
    if (!confirmed) return;
  
    if (typeof maxCount === 'undefined' || typeof winner === 'undefined') {
      console.error('maxCount or winner is not defined');
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/polling/", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ polling: false, maxCount, winner }),
      });
  
      const data = await response.json();
      console.log("Responses from reset APIs:", data);
      // alert("Polling Stopped");
    } catch (error) {
      console.error("Error resetting votes and counts:", error);
    }
  };
  

  

  useEffect(() => {
    fetch("http://localhost:3000/candidates/get")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCandidates(data.data);
        } else {
          console.error("Expected an array but got:", data);
          setCandidates([]);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


useEffect(()=>{const results = function() {
  let localMaxCount = 0;  // Assuming counts are non-negative
  let localWinner = '';

  candidates && candidates.forEach((candidate) => {
    if (candidate.count > localMaxCount) {
      localMaxCount = candidate.count;
      localWinner = candidate.name;
    } else if (candidate.count === localMaxCount && candidate.count > 0) {
      localWinner = `${localWinner} ; ${candidate.name}`;
    }
    // console.log(maxCount,winner)
  })
  setMaxCount(localMaxCount);
  setWinner(localWinner);
}
results() 
},[candidates]
)
  

  return (
    <>
      <div className="admin-container">
        <Dashboard />
        <div className="admin-data">
          <table className="result-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Party</th>
                <th>Image</th>
                <th>Counts</th>
              </tr>
            </thead>
            <tbody>
              {candidates &&
                candidates.map((candidate) => (
                  <tr key={candidate._id}>
                    <td>{candidate.name}</td>
                    <td>{candidate.party}</td>
                    <td>
                      <img
                        src={`http://localhost:3000/${candidate.image}`}
                        alt={`${candidate.name}`}
                        className="candidate-image"
                      />
                    </td>
                    <td>{ candidate.count}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="chart-container">
            <CandidatePieChart candidates={candidates} />
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button className="btn btn-danger" onClick={handleResetCountsAndVotes}>
          RESET POLLS
        </button>
        <button className="btn btn-danger" onClick={handleStopPolling} >
          STOP POLLS
        </button>
      </div>
      <PollingResults/>
    </>
  );
}

export default Polls;
