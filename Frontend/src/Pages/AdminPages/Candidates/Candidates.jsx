// import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import '../../Admin/Admin.css'
import React, { useState, useEffect } from 'react';
import './Candidates.css'

function Candidates() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', party: '', image: null });
  const [editingEmail, setEditingEmail] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/candidates/get')
     
    .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data.data);
        if (Array.isArray(data.data)) {
          setData(data.data);
        } else {
          console.error('Expected an array but got:', data.data);
          setData([]);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    const confirmed = window.confirm(" ARE YOU SURE ??? WANT TO UPDATE CANDIDATES");
    if (!confirmed) return;
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('party', formData.party);
    if (formData.image) {
      form.append('image', formData.image);
    }
    if (editingEmail) {
      form.append('prevemail', editingEmail);
    }

    const url = editingEmail ? 'http://localhost:3000/candidates/update' : 'http://localhost:3000/candidates/register';
    const method = editingEmail ? 'PUT' : 'POST';

    fetch(url, {
      method,
      body: form,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response data:', data);
      if (data.status === "200") {
        if (editingEmail) {
          setData(prevData => prevData.map(item => item.email === editingEmail ? { ...item, ...formData } : item));
          setEditingEmail(null);
        } else {
          setData(prevData => [...prevData, { ...formData, image: data.image }]);
        }
        setFormData({ name: '', email: '', party: '', image: null });
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error saving data:', error));
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, email: item.email, party: item.party, image: null });
    setEditingEmail(item.email);
  };

  const handleDelete = (email) => {
    const confirmed = window.confirm(" ARE YOU SURE ??? WANT TO DELETE CANDIDATE");
    if (!confirmed) return;
    fetch('http://localhost:3000/candidates/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    .then(() => {
      setData(prevData => prevData.filter(item => item.email !== email));
    })
    .catch(error => console.error('Error deleting data:', error));
  };
  return (
   <>
   <div className="admin-container">
    <Dashboard />
    <div className="admin-data">
    <div className="container">
      
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder=" candidate name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder=" candidate email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="party"
          placeholder="Party name"
          value={formData.party}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          placeholder='symbol'
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Party</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map(item => (
              <tr key={item.email}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.party}</td>
                <td>{item.image && <img src={`http://localhost:3000/${item.image}`} alt={item.name} width="50" />}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.email)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
     </div>
   </div>
  
   </>
  )
}

export default Candidates





