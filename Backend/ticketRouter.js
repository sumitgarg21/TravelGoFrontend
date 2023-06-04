const express = require('express');
const router = express.Router();
const axios = require('axios');
const fetchuser = require('./fetchuser');
const ticketModel = require('./Models/ticketModel');
const { body, validationResult } = require('express-validator');
const { trainAPI } = require('./key')
const { hotelAPI } = require('./key')

// ROUTE 1: Get All the tickets using: GET "/travelhistory". Login required
router.get('/travelhistory', fetchuser, async (req, res) => {
    try {
        user = JSON.stringify(req.user)
        user = JSON.parse(user)
        console.log(user.id)
        let tickets = await ticketModel.find({ User: user.id });
        res.json(tickets)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/bookticket', fetchuser, async (req, res) => {
    try {
        User = JSON.stringify(req.user)
        User = JSON.parse(User)
        let Obj = {
            User: User.id,
            transportname: req.body.transportname,
            mode: req.body.mode
        }
        ticket = new ticketModel(Obj);
        //console.log(User.id)
        ticket
            .save()
            .then(() => res.json({ success: true }))
            .catch((err) => {
                console.log(err);
                res.send({
                    error: err,
                    message: err.message,
                });
            });
    }
    catch (error) {
        res.json({ error })
    }
})

router.post('/transport', fetchuser, async (req, res) => {
    try {
        const { mode, From, To, Date } = req.body;
        if (mode === "Flight") {
            const params = {
                access_key: '675a4c23594bf5ea57d8b0820bb49775',
                flight_date: '2023-07-14',
                dep_iata: 'DEL',
                arr_iata: 'IXS'
            }

            axios.get(`https://api.aviationstack.com/v1/flights?${params}`)
                .then(response => {
                    const apiResponse = response.data;
                    if (Array.isArray(apiResponse['results'])) {
                        apiResponse['results'].forEach(flight => {
                            if (!flight['live']['is_ground']) {
                                console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
                                    `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
                                    `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
                            }
                        });
                    }
                }).catch(error => {
                    console.log(error);
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
                res.json(response.data)
            } catch (error) {
                console.error(error);
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
                res.json(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Note using: POST "/addticket". Login required
router.post('/addticket', fetchuser, [
    body('', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

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