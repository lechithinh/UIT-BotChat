const express = require('express')
const app = express();
const {getSchedule} = require('./server/schedule.js')
const cors = require('cors')

app.use(cors())
app.use(express.json())


app.post('/get-schedule', async(req, res) => {
    try {
        const {uid, hocky, namhoc} = req.body;
        const resp = await getSchedule(uid, hocky, namhoc);
        return res.json(resp);
    } catch (error) {
        console.log(error)
        return res.json({
            status: 'error',
            msg: error
        })
    }
})

app.listen(3001, () => {
    console.log('server is running at http://localhost:3001')
})