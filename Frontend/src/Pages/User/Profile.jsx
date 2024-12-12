import React, { useState, useEffect, useContext } from "react";
import Context from "../../Component/Context/Context";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
import "./VotingPanel.css";
import ChangeUserPassword from "./ChangeUserPassword";
import PollingResults from "../AdminPages/PollingResults/PollingResults";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userLoggedin, setUserLoggedin } = useContext(Context);
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const {pollingData,setPollingData}=useContext(Context);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token");

    if (storedEmail && storedToken) {
      const fetchUserData = async (email) => {
        try {
          const response = await axios.get("http://localhost:3000/users/get", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
            params: {
              email: storedEmail,
            },
          });

          if (Array.isArray(response.data.data) && response.status === 200) {
            setUserData(response.data.data);
            setHasVoted(response.data.data[0].voted);
          } else {
            throw new Error("Invalid data format");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData(storedEmail);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("http://localhost:3000/candidates/get");
        if (Array.isArray(response.data.data) && response.status === 200) {
          setCandidates(response.data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        setError("Error fetching candidates");
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async (email, name) => {
    if (hasVoted) return;

    const confirmed = window.confirm(`VOTE FOR: ${name}?`);
    if (!confirmed) return;

    try {
      await axios.put("http://localhost:3000/candidates/setcounts", {
        email: email,
      });
      await axios.put("http://localhost:3000/users/setvote", {
        email: userData[0].email,
      });
      setHasVoted(true);
      // Refresh the candidate data
      const response = await axios.get("http://localhost:3000/candidates/get");
      if (Array.isArray(response.data.data) && response.status === 200) {
        setCandidates(response.data.data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
console.log(pollingData);

  return (
    
    <>
      <div className="profile-container">
        {userData.length > 0 ? (
          <>
            <img
              className="profile-image"
              src={`http://localhost:3000/${userData[0].image}`}
              alt={userData[0].name}
            />
            <h1>{userData[0].name}</h1>
            <p className="profile-text">Phone: {userData[0].phone}</p>
            <p className="profile-text">Address: {userData[0].address}</p>
            <p className="profile-text">Email: {userData[0].email}</p>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                setUserData(null);
                setUserLoggedin(false);
                
                localStorage.setItem("login", false);
                localStorage.setItem("email", null);
                localStorage.setItem("token", null);
                navigate("/login");
              }}
            >
              Logout
            </button>

            <button className="btn btn-primary" onClick={handleShowModal}>
              Change Password
            </button>
            <ChangeUserPassword
              useremail={userData[0].email}
              show={showModal}
              handleClose={handleCloseModal}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <PollingResults/>
      <div className="voting-panel">
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Party</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img
                    src={`http://localhost:3000/${candidate.image}`}
                    alt={candidate.name}
                    className="candidate-image"
                  />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
                <td>
                  <button
                    className="vote-button"
                    onClick={() => handleVote(candidate.email, candidate.name)}
                    disabled={hasVoted || (pollingData&&(!pollingData.polling&&true))}
                  >
                    Vote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasVoted && <p className="voted-message">You have voted!</p>}
         {pollingData&&(!pollingData.polling&&<p className="voted-message">POLLING HAS STOPPED</p>) }
      </div>
    </>
  );
};

export default UserProfile;
