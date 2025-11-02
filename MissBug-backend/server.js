import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

//* ------------------- Config -------------------
const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5174',
    ],
    credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())

//* ------------------- bugs Crud -------------------
//* Read/List
app.get('/api/bug', async (req, res) => {
    try {
        const bugs = await bugService.query()
        res.send(bugs)
    } catch (err) {
        loggerService.error(`Couldn't get bugs`, err)
        res.status(400).send(`Couldn't get bugs`)
    }
})
//example
//http://127.0.0.1:3030/api/bug/save?title=doron%20test&severity=10
//* Add/Update
app.get('/api/bug/save', async (req, res) => {

    const bugToSave = {
        _id: req.query._id,
        title: req.query.title,
        severity: +req.query.severity,
        createdAt: new Date().getTime(),
    }
    loggerService.debug('#### add',bugToSave)

    try {
        const savedBug = await bugService.save(bugToSave)
        res.send(savedBug)
    } catch (err) {
        loggerService.error(`Couldn't save bug`, err)
        res.status(400).send(`Couldn't save bug`)
    }
})


//* Read
app.get('/api/bug/:bugId', async (req, res) => {
    // let visitCount = +req.cookies.visitCount || 0
    // visitCount++
    // console.log('visitCount:', visitCount)
    // res.cookie('visitCount', visitCount)
    const { bugId } = req.params
    try {
        const bug = await bugService.getById(bugId)
        res.send(bug)
    } catch (err) {
        loggerService.error(`Couldn't get bug ${bugId}`, err)
        res.status(400).send(`Couldn't get bug`)
    }
})

//* Delete
app.get('/api/bug/:bugId/remove', async (req, res) => {
    const { bugId } = req.params
    try {
        await bugService.remove(bugId)
        // res.redirect('/api/bug')
        res.send('Removed successfully')
    } catch (err) {
        loggerService.error(`Couldn't remove bug ${bugId}`, err)
        res.status(400).send(`Couldn't remove bug`)
    }
})

//* ------------------- Routes Examples -------------------

app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`)
})

// app.get('/bobo', (req, res) => {
//     // res.send(`<h1>Hi Bobo</h1>`)
//     res.send({ name: 'Hello' })
//     // res.end()
// })

// app.get('/lala', (req, res) => {
//     res.redirect(`/bobo`)
// })


app.get('/cookies', (req, res) => {
    let visitCount = +req.cookies.visitCount || 0
    visitCount++
    console.log('visitCount:', visitCount)
    res.cookie('visitCount', visitCount, { maxAge: 1000 * 5 })
    res.send(`<h1>Hi Puki  - ${visitCount}</h1>`)
})


const port = 3030
app.listen(port, () => {
    loggerService.info(`Server ready at url:port  http://127.0.0.1:${port}/`)
})
