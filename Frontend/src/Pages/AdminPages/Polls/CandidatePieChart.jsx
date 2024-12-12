import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const CandidatePieChart = ({ candidates }) => {
  if (!candidates || candidates.length === 0) return <div>No data available</div>;
//   const [inlead,setLead]=useState('')
  
  const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)'
  ];

  const counts = candidates.map(candidate => candidate.count);
  const maxCount = Math.max(...counts);
 
  const pieData = {
    labels: candidates.map(candidate => candidate.name),
    datasets: [{
      data: counts,
      backgroundColor: candidates.map((candidate, index) => {
        if (candidate.count === maxCount) {
            
        //   setLead(candidate.name+' is in lead with total:'+candidate.count+'\n from :'+candidate.party+"party")
          return 'rgba(255, 0, 0, 0.6)'; 
        }
        return colors[index % colors.length];
      })
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

  return (
    <div  style={{borderRadius:'20px',border:'',paddingLeft:'20px', width: '100%', minHeight:'500px', maxWidth: '600px' ,backgroundColor:'#D3D3D3'}}>
      
      <Pie data={pieData} options={options} />
      
    </div>
  );
};

export default CandidatePieChart;