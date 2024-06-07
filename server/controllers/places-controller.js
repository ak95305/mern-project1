const HttpError = require("../models/http-error")
const Place = require("../models/place")
const Validator = require('validatorjs')

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid
    let place;

    try{
        place = await Place.findById(placeId)
        
        if(!place){
            return next(new HttpError("No place can be found with provided place id.", 404))
        }
    } catch(err) {
        const error = new HttpError("Unable to find place", 400)
        return next(error)
    }
    
    res.status(200)
    res.json({ place: place.toObject({ getters: true }) })
}

const getPlaceByUserId = async (req, res, next) => {
    const userId = req.params.uid
    
    let places;
    try{
        places = await Place.find({ createdBy: userId })
        console.log(places)
        if(!places || places.length == 0){
            return next(new HttpError("No place can be found with provided user id.", 404));
        }
    } catch(err){
        const error = new HttpError("Unable to find places", 400)
        return next(error)
    }
    res.status(200)
    res.json({ places: places.map(item => item.toObject({ getters: true }))})
}

const createPlace = async (req, res, next) => {
    let { name, desc, createdBy } = req.body
    
    let data = {
        name: name,
        desc: desc,
        createdBy: createdBy
    }

    let rules = {
        name: 'required',
        desc: 'required|min:5',
        createdBy: 'required'
    }

    let validation = new Validator(data, rules)

    if(validation.fails()){
        const error = new HttpError("Invalid Fields!", 400)
        return next(error)
    }

    let place = new Place({
        name: name,
        desc: desc,
        createdBy: createdBy,
        image: "dummy_url"
    })

    try{
        await place.save()
    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to create place!", 400)
        return next(error)
    }

    res.status(201);
    res.json({place})
}

const udpatePlaceById = async (req, res, next) => {
    let placeId = req.params.pid;
    let { name, desc } = req.body;

    let place;
    try{
        place = await Place.findById(placeId)
        
        if(!place){
            return next(new HttpError("No place can be found with provided place id.", 404))
        }
    } catch(err) {
        const error = new HttpError("Unable to find place", 400)
        return next(error)
    }

    place.name = name
    place.desc = desc

    try{
        await place.save()
    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to update place!", 400)
        return next(error)
    }

    res.status(200);
    res.json({ place : place.toObject({ getters: true })})
}

const deletePlaceById = async (req, res, next) => {
    let placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId)
        
        if(!place){
            return next(new HttpError("No place can be found with provided place id.", 404))
        }
    } catch(err) {
        const error = new HttpError("Unable to find place", 400)
        return next(error)
    }
    
    try{
        await place.deleteOne()
    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to delete place!", 400)
        return next(error)
    }

    res.status(200);
    res.json({ message: 'Place Deleted' })
}

exports.getPlaceById = getPlaceById
exports.getPlaceByUserId = getPlaceByUserId
exports.createPlace = createPlace
exports.udpatePlaceById = udpatePlaceById
exports.deletePlaceById = deletePlaceById