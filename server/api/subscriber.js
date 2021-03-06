const express = require('express')
const mongoose = require('mongoose')
const Subscriber = require('../models/userSchema')
const route = express.route();

route.post('/', (req, res) => {
    const {name, subscriberToChannel, subscribeDate} = req.body;
    let subscriber = {};
    subscriber.name = name;
    subscriber.subscriberToChannel = subscriberToChannel;
    subscriber.subscribeDate = subscribeDate;
    let subscriberModel = new Subscriber(subscriber);
    await subscriberModel.save();
    res.json(subscriberModel) 
})