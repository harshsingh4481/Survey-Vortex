import React, { useEffect, useState } from 'react'
import Dashboard from '../Dashboard/Dashboard'
import '../../Admin/Admin.css'
import './Voters.css'
function Voters() {
  
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', address: '', image: null });
  const [editingEmail, setEditingEmail] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5500/users/get')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (Array.isArray(data.data)) {
          setData(data.data);
        } else {
          console.error('Expected an array but got:', data);
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
    const confirmed = window.confirm(" ARE YOU SURE ??? WANT TO UPDATE USERS");
    if (!confirmed) return;
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('password', formData.password);
    form.append('address', formData.address);
    if (formData.image) {
      form.append('image', formData.image);
    }
    if (editingEmail) {
      form.append('prevemail', editingEmail);
    }

    const url = editingEmail ? 'http://127.0.0.1:5500/users/update' : 'http://127.0.0.1:5500/users/register';
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
        setFormData({ name: '', email: '', phone: '', password: '', address: '', image: null });
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error saving data:', error));
  };

  const handleEdit = (item) => {

    setFormData({ name: item.name, email: item.email, phone: item.phone, password: item.password, address: item.address, image: null });
    setEditingEmail(item.email);
  };

  const handleDelete = (email) => {
    const confirmed = window.confirm(" ARE YOU SURE ??? WANT TO DELETE USER");
    if (!confirmed) return;
    fetch('http://127.0.0.1:5500/users/delete', {
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
  return (   <><div className="admin-container">
  <Dashboard />
  <div className="admin-data">
  <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder=" Voter's Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Voter's Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Voter's Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Voter's Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Voter's Address"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          name="image"
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
            <th>Phone</th>
            <th>Address</th>
            <th>Image</th>
            <th>Voted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map(item => (
              <tr key={item.email}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.image && <img src={`http://127.0.0.1:5500/${item.image}`} alt={item.name} width="50" />}</td>
                <td>{item.voted?'YES':'NO'}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.email)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
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

export default Voters