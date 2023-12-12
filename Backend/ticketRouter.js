const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');
const fetchuser = require('./fetchuser');
const ticketModel = require('./Models/ticketModel');
const { body, validationResult } = require('express-validator');
require("dotenv").config({ path: __dirname + '/.env' });
const trainAPI = process.env.TRAINAPI
const hotelAPI = process.env.HOTELAPI
const flightAPI = process.env.FLIGHTAPI

// ROUTE 1: Get All the tickets using: GET "/travelhistory". Login required
router.get('/travelhistory', fetchuser, async (req, res) => {
    try {
        user = JSON.stringify(req.user)
        user = JSON.parse(user)
        let tickets = await ticketModel.find({ User: user.id });
        res.json({ success: true, tickets })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Save ticket in travelhistory
router.post('/saveticket', fetchuser, async (req, res) => {
    try {
        User = JSON.stringify(req.user)
        User = JSON.parse(User)
        let Obj = {
            User: User.id,
            name: JSON.parse(JSON.stringify(req.body.name)),
            mode: req.body.mode
        }
        console.log(Obj.name)
        ticket = new ticketModel(Obj);
        //console.log(User.id)
        ticket
            .save()
            .then(() => res.json({ success: true }))
            .catch((err) => {
                console.log(err);
                res.send({ success: true, message: err.message });
            });
    }
    catch (error) {
        res.json({ error })
    }
})

router.delete('/deleteticket/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ticket = await ticketModel.findById(id);
        if (!ticket) {
            return res.status(404).json({ success: false, message: 'Ticket not found' });
        }

        const deletedTicket = await ticketModel.findByIdAndDelete(id);

        if (deletedTicket) {
            console.log("ticket deleted")
            return res.status(200).json({ success: true, message: 'Ticket deleted successfully' });
        } else {
            return res.status(500).json({ success: false, message: 'Unable to delete ticket' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/transport', fetchuser, async (req, res) => {
    try {
        const { mode, From, To, Date } = req.body;
        if (mode == "Flight") {
            axios.get('https://aviation-edge.com/v2/public/flightsFuture', {
                params: {
                    key: flightAPI,
                    type: "arrival",
                    iataCode: To,
                    dep_iataCode: From,
                    date: Date
                }
            })
                .then(response => {
                    // Handle the response
                    let data = response.data
                    if (data.error) {
                        data = data.error
                        res.send({ success: false, data });
                    }
                    else {
                        res.send({ success: true, data });
                    }
                })
                .catch(error => {
                    // Handle any errors
                    //console.error(error);
                    data = "Error while fetching flight information."
                    res.send({ success: false, data });
                });
        }
        else {
            const options = {
                method: 'POST',
                url: 'https://trains.p.rapidapi.com/',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': trainAPI,
                    'X-RapidAPI-Host': 'trains.p.rapidapi.com'
                },
                data: { search: From }
            };

            try {
                const response = await axios.request(options);
                res.json({ success: true, data: response.data })
            } catch (error) {
                console.error(error);
                res.json({ success: false, message: error.message });
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Transport Server Error");
    }
})
router.post('/hotel', fetchuser, async (req, res) => {
    try {
        const { Zip } = req.body;
        {
            const options = {
                method: 'GET',
                url: 'https://booking-com.p.rapidapi.com/v1/static/hotels',
                params: {
                    page: '0',
                    country: 'in',
                    zip_code: Zip
                },
                headers: {
                    'X-RapidAPI-Key': hotelAPI,
                    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                res.json({ success: true, data: response.data });
            } catch (error) {
                console.error(error);
                res.json({ success: false, message: error.message });
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/deleteticket". Login required
router.delete('/deleteticket/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router