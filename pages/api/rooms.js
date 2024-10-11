// Initial room data stored in memory
let rooms = [
  { id: 1, capacity: 2, occupants: [] },
  { id: 2, capacity: 2, occupants: [] },
  { id: 3, capacity: 2, occupants: [] },
  { id: 4, capacity: 2, occupants: [] },
  { id: 5, capacity: 2, occupants: [] },
  { id: 6, capacity: 2, occupants: [] },
  { id: 7, capacity: 2, occupants: [] },
  { id: 8, capacity: 2, occupants: [] },
  { id: 9, capacity: 2, occupants: [] },
  { id: 10, capacity: 2, occupants: [] },
  { id: 11, capacity: 2, occupants: [] },
  { id: 12, capacity: 2, occupants: [] },
  { id: 13, capacity: 2, occupants: [] },
  { id: 14, capacity: 2, occupants: [] },
  { id: 15, capacity: 2, occupants: [] },
  { id: 16, capacity: 2, occupants: [] },
  { id: 17, capacity: 2, occupants: [] },
  { id: 18, capacity: 2, occupants: [] },
  { id: 19, capacity: 2, occupants: [] },
  { id: 20, capacity: 2, occupants: [] },
  { id: 21, capacity: 3, occupants: [] },
  { id: 22, capacity: 3, occupants: [] },
  { id: 23, capacity: 3, occupants: [] },
  { id: 24, capacity: 3, occupants: [] },
  { id: 25, capacity: 3, occupants: [] },
  { id: 26, capacity: 3, occupants: [] },
  { id: 27, capacity: 3, occupants: [] },
  { id: 28, capacity: 3, occupants: [] },
  { id: 29, capacity: 3, occupants: [] },
  { id: 30, capacity: 3, occupants: [] },
  { id: 31, capacity: 3, occupants: [] },
  { id: 32, capacity: 3, occupants: [] },
  { id: 33, capacity: 3, occupants: [] },
  { id: 34, capacity: 3, occupants: [] },
  { id: 35, capacity: 3, occupants: [] },
  { id: 36, capacity: 3, occupants: [] },
  { id: 37, capacity: 3, occupants: [] },
  { id: 38, capacity: 3, occupants: [] },
  { id: 39, capacity: 3, occupants: [] },
  { id: 40, capacity: 3, occupants: [] }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return room data on GET request
    res.status(200).json({ rooms });
  } else if (req.method === 'POST') {
    // Update room data on POST request
    const { roomId, name } = req.body;
    
    const room = rooms.find(r => r.id === roomId);
    
    if (room && room.occupants.length < room.capacity) {
      if (!room.occupants.includes(name)) {
        room.occupants.push(name); // Add occupant if they're not already in the room
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ error: "This person is already in the room" });
      }
    } else {
      res.status(400).json({ error: "Room is full or does not exist" });
    }
  }
}
