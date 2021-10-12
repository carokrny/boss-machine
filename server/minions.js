const express = require('express');
const minionsRouter = express.Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId 
} = require('./db');

// Extract minion by minionId param
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (!minion) {
        res.status(404).send('Minion not found!');
    } else {
        req.minion = minion;
        next();
    }
});

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (isDeleted) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send();
});

// GET /api/minions/:minionId/work to get an array of all work for the specified minon.
minionsRouter.get('/:minionId/work', (req, res, next) => {
    const minionWork = getAllFromDatabase('work').filter((work) => {
        return work.minionId === req.params.minionId
    });
    res.send(minionWork);
});

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const newWork = addToDatabase('work', workToAdd);
    res.status(201).send(newWork);
});

// Extract work by workId param
minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (!work) {
        res.status(404).send('Work not found!');
    } else {
        req.work = work;
        next();
    }
});

// PUT /api/minions/:minionId/work/:workId to update a single work by id.
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if(req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        const updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const isDeleted = deleteFromDatabasebyId('work', req.params.workId);
    if (isDeleted) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send();
});

module.exports = minionsRouter;