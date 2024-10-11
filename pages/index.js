import { useState, useEffect } from 'react';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch room data on component load
  useEffect(() => {
    fetch('/api/rooms')
      .then(response => response.json())
      .then(data => setRooms(data.rooms))
      .catch(error => console.error('Error loading rooms:', error));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !selectedRoom) {
      setMessage('Please enter a name and select a room');
      return;
    }

    // Send POST request to API to update room data
    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId: selectedRoom,
        name,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      setMessage(`Successfully added ${name} to room ${selectedRoom}`);
      // Update room data after adding the occupant
      setRooms(prevRooms => prevRooms.map(room =>
        room.id === selectedRoom ? { ...room, occupants: [...room.occupants, name] } : room
      ));
      setName('');
    } else {
      setMessage(result.error || 'Error adding occupant to the room');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Camp Room Assignment</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select onChange={(e) => setSelectedRoom(parseInt(e.target.value))}>
          <option value="">Select a room</option>
          {rooms.map(room => (
            <option key={room.id} value={room.id}>
              Room {room.id} (Occupants: {room.occupants.length}/{room.capacity})
            </option>
          ))}
        </select>
        <button type="submit" style={{ marginLeft: '10px' }}>Join Room</button>
      </form>

      {message && <p>{message}</p>}

      <h2>Room Status</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
        {rooms.map(room => (
          <div key={room.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>Room {room.id}</h3>
            <p>Capacity: {room.capacity}</p>
            <p>Occupants: {room.occupants.length}/{room.capacity}</p>
            <ul>
              {room.occupants.map((occupant, index) => (
                <li key={index}>{occupant}</li>
              ))}
            </ul>
            {room.occupants.length === room.capacity ? (
              <p style={{ color: 'red' }}>Room is full</p>
            ) : (
              <p style={{ color: 'green' }}>Space available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
