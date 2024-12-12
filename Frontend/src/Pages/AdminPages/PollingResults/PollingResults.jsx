import React, { useState, useEffect, useContext } from 'react';
import Context from '../../../Component/Context/Context';
import './PollingResults.css'
const PollingResults = () => {
  const {pollingData,setPollingData}=useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/polling');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPollingData(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(pollingData)
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
  
    <div className="container">
    <div className="profile-section">
      <h1>Polling Results</h1>
      {pollingData ? (
        !pollingData.polling?
        (<div >
          <p>Max Count: {pollingData.maxCount}</p>
           {pollingData.winner?(<p>Winner: {pollingData.winner}</p>):(<p>No winner Zero voting</p>)}
        </div>):(<p style={{textAlign:'center'}}>WINNER WILL BE DECLARED SOON</p>)
      ) : (
        <p style={{textAlign:'center'}}>WINNER WILL BE DECLARED SOON</p>
      )}
    </div>
</div>
  );
};

export default PollingResults;
