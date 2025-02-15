const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);


  res.render('user/home.ejs', {user});
})

router.get('/:id/pets/new', async (req, res) => {
  const userId = req.params.id;

  res.render('pet/new.ejs', {userId});
})

router.get('/:id/pets/:petId', async (req, res) => {
  const userId = req.params.id;
  const petId = req.params.petId;

  const user = await User.findById(userId);
  const pet = user.pets.id(petId);

  res.render('pet/show.ejs', {pet, userId});
})

router.get('/:id/pets/:petId/edit', async (req, res) => {
  const userId = req.params.id;
  const petId = req.params.petId;

  const user = await User.findById(userId);
  const pet = user.pets.id(petId);

  res.render('pet/edit.ejs', {pet, userId});
})

router.post('/:id/pets', async (req, res) => {
  const userId = req.params.id;
  const name = req.body.name;
  const type = req.body.type;
  const gender = req.body.gender;
  const status = req.body.status;
  const birthdate = req.body.birthdate;
  const characteristic = req.body.characteristic;
  const food = req.body.food;
  const bio = req.body.bio;

  const quantity = req.body.quantity;

  const user = await User.findById(userId);
  user.pets.push({name, type, gender, status, birthdate, characteristic, food, bio, quantity});

  await user.save();

  res.redirect(`/users/${userId}`)
})

router.put('/:id/pets/:petId', async (req, res) => {
  const userId = req.params.id;
  const petId = req.params.petId;
  const newName = req.body.name;
  const newType = req.body.type;
  const newGender = req.body.gender;
  const newStatus = req.body.status;
  const newBirthdate = req.body.birthdate;
  const newCharacteristic = req.body.characteristic;
  const newFood = req.body.food;
  const newBio = req.body.bio;

  const newQuantity = req.body.quantity;

  const user = await User.findById(userId);
  const pet = user.pets.id(petId);

  pet.name = newName;
  pet.type = newType;
  pet.gender = newGender;
  pet.status = newStatus;
  pet.birthdate = newBirthdate;
  pet.characteristic = newCharacteristic;
  pet.food = newFood;
  pet.bio = newBio;
  
  pet.quantity = newQuantity;
  

  await user.save();

  res.redirect(`/users/${userId}/pets/${petId}`);
})

router.delete('/:id/pets/:petId', async (req, res) => {
  const userId = req.params.id;
  const petId = req.params.petId;
  
  const user = await User.findById(userId);

  user.pets.pull({_id: petId})

  await user.save();

  res.redirect(`/users/${userId}`);
})

module.exports = router;