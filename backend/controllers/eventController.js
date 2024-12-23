const Event=require('../models/Event');

const createEvent = async(req,res)=>{
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully!', eventId: newEvent._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};

const registerEvent=async(req,res)=>{
    const { eventId } = req.params;
        try {
            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(404).json({ message: 'Event not found!' });
            }

            if (event.registrations.length >= event.capacity) {
                return res.status(400).json({ message: 'Event is at full capacity!' });
            }

            event.registrations.push(req.body);
            await event.save();

            res.status(200).json({ message: 'Registration successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering for event', error });
        }
}

const updateEvent=async(req,res)=>{
    try {
        const {eventId}=req.params;
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
            if (!updatedEvent) {
                return res.status(404).json({ message: 'Event not found!' });
            }

            res.status(200).json({ message: 'Event updated successfully!', updatedEvent });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error updating event', error });
        }
}

const deleteEvent=async(req,res)=>{
    const { eventId } = req.params;
    try {

        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found!' });
        }

        res.status(200).json({ message: 'Event deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
}

const getEvent=async(req,res)=>{
    const { eventId } = req.params;
    let event;
    try {
        if(req.user.role==="admin"){
            event = await Event.findById(eventId);
        }
        else{
            event = await Event.findById(eventId, '-registrations');
        }
        if (!event) {
            return res.status(404).json({ message: 'Event not found!' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event', error });
    }
}

const getAllEvents=async(req,res)=>{
    try {
        const allEvents = await Event.find();
        res.status(200).json(allEvents);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
}

module.exports={createEvent,registerEvent,updateEvent,deleteEvent,getEvent,getAllEvents};
