// frontend/src/components/ScheduleSessionForm.jsx
import { useState } from 'react';
import axios from 'axios';

function ScheduleSessionForm({ availability }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSchedule = async () => {
    if (!selectedSlot) return;

    try {
      await axios.post('https://backend-qm1n.onrender.com/api/sessions', {
        user: selectedSlot.user,
        start: selectedSlot.start,
        end: selectedSlot.end,
        duration: selectedSlot.duration,
        attendees: [{ name: 'Admin', email: 'admin@example.com' }],
        type: 'one-on-one',
      });
      alert('Session scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling session:', error);
      alert('Failed to schedule session. Please check the console for details.');
    }
  };
  const handleDelete = async(start, end) => {
    await axios.delete('https://backend-qm1n.onrender.com/api/availability', {
        data: { start, end }
    })
    .then(response => {
        // Update the state to remove the deleted slot
        setSelectedSlot(selectedSlot.filter(slot =>
            !(new Date(slot.start).getTime() === new Date(start).getTime() &&
              new Date(slot.end).getTime() === new Date(end).getTime())
        ));
        alert('Availability slot deleted successfully');
    })
    .catch(error => console.error('Error deleting availability slot:', error));
};

  const editslot=()=>{

  }

 

  return (
    <div  style={{width:"30rem"}}>
      <select onChange={(e) => setSelectedSlot(JSON.parse(e.target.value))} className="form-select">
        <option value="" style={{backgroundColor:"grey"}}>Select a slot</option>
        {availability.map((slot) => (
          <option key={slot._id} value={JSON.stringify(slot)}>
            {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleString()}
          </option>
        ))}
      </select>
      <button onClick={handleSchedule} className="btn btn-outline-success mt-3 mb-3">
        Schedule Session
      </button>
      
      <div style={{width:"40rem"}} >
      <h3>User Availability Slot</h3>
      <br />
{availability.map((slot) => 
           {return ( <div >
          
          <table  key={slot._id} className='table' style={{width:"30rem"}} >

            StartDate - { new Date(slot.start).toLocaleString()} <br />EndDate - {new Date(slot.end).toLocaleString()}
            <button onClick={editslot}>Update</button>
            <button onClick={() => handleDelete(slot.start, slot.end)}>Delete</button>
          </table>
          </div>
        )})}
</div>

    </div>
  );
}

export default ScheduleSessionForm;
