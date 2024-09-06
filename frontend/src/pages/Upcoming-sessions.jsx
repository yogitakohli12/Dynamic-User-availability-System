// import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
function Upcomingsessions() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    axios.get('https://backend-qm1n.onrender.com/api/users').then((response) => setUsers(response.data));
  }, []);

  const fetchAvailability = async (userId) => {
    try {
      const response = await axios.get(`https://backend-qm1n.onrender.com/api/sessions/${userId}`);
      setAvailability(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  return (

    <div className="container " style={{width:"50rem"}}>
      <h1 style={{color:"cyan"}}>Upcoming Sessions</h1>
      <select className="form-select" onChange={(e) => setSelectedUser(users[e.target.value])}>
        <option value="" style={{backgroundColor:"grey"}}>Select User</option>
        {users.map((user, index) => (
          <option key={user._id} value={index}>
                           {user.email}
             </option>
           ))}
         </select>
         
         <button className="btn btn-outline-warning mt-3 mb-3" onClick={() => fetchAvailability(selectedUser?._id)}>
           UpcomingSessions
         </button>
         <br />
         
         <div className='session'>
      {availability?.map((data)=>{
        return(
          <div key={data._id} className='upcomingsession' >
          <p>User - {data.user}</p>
<p>StartDate - {new Date(data.start).toLocaleString()}</p>
<p>EndDate - {new Date(data.end).toLocaleString()}</p>
<p>{data.type}</p>
          </div>
        )
      })}
    </div>
       </div>
    
  )
}

export default Upcomingsessions;
