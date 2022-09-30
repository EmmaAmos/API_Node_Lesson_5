const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('VHS').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const vhsId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('VHS').find({ _id: vhsId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createVHS = async (req, res) => {
  const vhs = {
    videoName: req.body.videoName,
    discription: req.body.discription,
    rating: req.body.rating,
    tapeCondition: req.body.tapeCondition,
    price: req.body.price,
    content_warning: req.body.content_warning,
    used: req.body.used
  };
  const response = await mongodb.getDb().db().collection('VHS').insertOne(vhs);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the vhs.');
  }
};

const updateVHS = async (req, res) => {
  const vhsId = new ObjectId(req.params.id);
  const vhs = {
    videoName: req.body.videoName,
    discription: req.body.discription,
    rating: req.body.rating,
    tapeCondition: req.body.tapeCondition,
    price: req.body.price,
    content_warning: req.body.content_warning,
    used: req.body.used
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('VHS')
    .replaceOne({ _id: vhsId }, vhs);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the vhs.');
  }
};

const deleteVHS = async (req, res) => {
  const vhsId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('VHS').remove({ _id: vhsId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the vhs.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createVHS,
  updateVHS,
  deleteVHS
};