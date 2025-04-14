// mongodb+srv://ascarecircle:<db_password>@carecircle.uzmuq.mongodb.net/?retryWrites=true&w=majority&appName=CareCircle
// mongodb+srv://ascarecircle:<db_password>@carecircle.uzmuq.mongodb.net/ COMPASS
const express = require('express')
const mongoose = require('mongoose')
// const { ObjectId } = require('mongodb');
const { ObjectId } = mongoose.Types;
const connectDB = require('./database.js') 
const userModel = require('./models/Users.js')
const eventModel = require('./models/events.js')
const calendarModel = require('./models/calendars.js')
const cors = require('cors')

const app = express()
app.use(express.json()) 
app.use(cors())

console.log(connectDB())

app.get('/getUsers', async (req, res) => {
    const users = await userModel.find({})
    return res.json({users: users})
})

app.get('/getUserEmail/:email', async (req, res) => {
  const userEmail = req.params.email;
  const users = await userModel.find({email: userEmail})
  return res.json({users: users})
})

app.get('/getUserID/:id', async (req, res) => {
  const Id = req.params.id;
  const users = await userModel.find({_id: Id})
  return res.json({users: users})
})

app.patch('/updateUser', async (req, res) =>{
  try {
    const userId = req.body.id;
    console.log(req.body.id, req.body)
    const updatedData = req.body;
    const updatedEntity = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedEntity) {
      return res.status(404).json({ message: 'Entity not found' });
    }
    res.json(updatedEntity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.delete('/deleteUser', async (req, res) => {
  const userId = req.body.id;
    console.log(req.body.id, req.body)
  try {
    const item = await userModel.findByIdAndDelete(userId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

app.get('/getCalendar/:id', async (req, res) => {
    const calendarId = req.params.id;
    const calendars = await calendarModel.find({_id: calendarId})
    return res.json({calendars: calendars})
})

app.get('/getCalendars', async (req, res) => {
    const calendars = await calendarModel.find({})
    return res.json({calendars: calendars})
})

app.get('/getUserCalendars/:email', async (req, res) => {
  try{
    const userEmail = req.params.email;
    const userCalendars = await calendarModel.find({users:{ $in: [userEmail]}})
    return res.json({calendars: userCalendars})
      res.status(200).json({events: events})
  }catch(e){
    res.status(500).json({message: e.message})
  }
})

app.get('/getEvents', async (req, res) => {
  try{
    const events = await eventModel.find({})
    res.status(200).json({events: events})
}catch(e){
  res.status(500).json({message: e.message})
}
})

app.get('/getUserEvents/:email', async (req, res) => {
  try{
    const eventEmail = req.params.email;
    const events = await eventModel.find({email:eventEmail})
    res.status(200).json({events: events})
  }catch(e){
    res.status(500).json({message: e.message})
  }
})

app.get('/', async (req, res) => {
    try {
      const [usersData, eventsData, calendarData] = await Promise.all([
        userModel.find({}),
        eventModel.find({}),
        calendarModel.find({}),        
      ]);
  
      const responseData = {
        users: usersData,
        events: eventsData,
        calendars: calendarData,
      };
  
      res.json(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  });

app.post('/createUser', async (req, res) =>{
  try{
    const newUser = await userModel.create(req.body);
    res.status(200).json(newUser);
  }catch(e){
    res.status(500).json({message: e.message})
  }
});

app.post('/createEvent', async (req, res) =>{
  try{
    const newEvent = await eventModel.create(req.body);
    res.status(200).json(newEvent);
  }catch(e){
    res.status(500).json({message: e.message})
  }
});

app.patch('/updateEvent', async (req, res) =>{
  try {
    const eventId = req.body.id;
    console.log(req.body.id, req.body)
    const updatedData = req.body;
    const updatedEntity = await eventModel.findByIdAndUpdate(eventId, updatedData, { new: true });
    if (!updatedEntity) {
      return res.status(404).json({ message: 'Entity not found' });
    }
    res.json(updatedEntity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.delete('/deleteEvent', async (req, res) => {
  const eventId = req.body.id;
    console.log(req.body.id, req.body)
  try {
    const item = await eventModel.findByIdAndDelete(eventId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});

app.post('/createCalendar', async (req, res) =>{
  try{
    const newCalendar = await calendarModel.create(req.body);
    res.status(200).json(newCalendar);
  }catch(e){
    res.status(500).json({message: e.message})
  }
});

app.patch('/updateCalendar', async (req, res) =>{
  try {
    const calendarId = req.body.id;
    console.log(req.body.id, req.body)
    const updatedData = req.body;
    const updatedEntity = await calendarModel.findByIdAndUpdate(calendarId, updatedData, { new: true });
    if (!updatedEntity) {
      return res.status(404).json({ message: 'Entity not found' });
    }
    res.json(updatedEntity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.delete('/deleteCalendar', async (req, res) => {
  const calendarId = req.body.id;
    console.log(req.body.id, req.body)
  try {
    const item = await calendarModel.findByIdAndDelete(calendarId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});