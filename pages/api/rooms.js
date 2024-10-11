import fs from 'fs';
import path from 'path';

// Path to room data
const filePath = path.resolve('./data/room_data.json');

// Helper function to load room data
function loadRooms() {
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
}

// Helper function to save room data
function saveRooms(rooms) {
    fs.writeFileSync(filePath, JSON.stringify({ rooms }, null, 2));
}

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Handle GET request - return the room data
        const rooms = loadRooms();
        res.status(200).json(rooms);
    } else if (req.method === 'POST') {
        // Handle POST request - update room data
        const { roomId, name } = req.body;

        // Load current room data
        const roomsData = loadRooms();
        const room = roomsData.rooms.find(r => r.id === roomId);

        // Check if room exists and if there's space
        if (room && room.occupants.length < room.capacity) {
            if (!room.occupants.includes(name)) {
                room.occupants.push(name); // Add the name without overwriting
                saveRooms(roomsData.rooms);
                return res.status(200).json({ success: true });
            } else {
                return res.status(400).json({ error: "This person is already in the room" });
            }
        }

        return res.status(400).json({ error: "Room is full or does not exist" });
    }
}
