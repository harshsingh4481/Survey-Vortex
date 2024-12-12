import React, { useState, useEffect } from "react";
import "./Results.css";
import CandidatePieChart from "../AdminPages/Polls/CandidatePieChart";

const Results = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("http://localhost:3000/candidates/get");
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setCandidates(data.data);
        } else {
          console.error("Expected an array but got:", data);
          setCandidates([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="results-container">
      <table className="results-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Image</th>
            <th>Counts</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>
                <img
                  src={`http://localhost:3000/${candidate.image}`}
                  alt={candidate.name}
                />
              </td>
              <td>{candidate.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2 className="table-title">Election Polls</h2>
      <div className="chart-container">
        <CandidatePieChart candidates={candidates} />
        <h1>Result Charts</h1>
      </div>
    </div>
  );
};

export default Results;
