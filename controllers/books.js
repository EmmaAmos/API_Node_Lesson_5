const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('BOOKS').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('BOOKS').find({ _id: bookId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createBOOK = async (req, res) => {
  const book = {
    author: req.body.author,
    country: req.body.country,
    imageLink: req.body.imageLink,
    language: req.body.language,
    link: req.body.link,
    pages: req.body.pages,
    title: req.body.title,
    year: req.body.year
  };
  const response = await mongodb.getDb().db().collection('BOOKS').insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the book.');
  }
};

const updateBOOK = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const book = {
    author: req.body.author,
    country: req.body.country,
    imageLink: req.body.imageLink,
    language: req.body.language,
    link: req.body.link,
    pages: req.body.pages,
    title: req.body.title,
    year: req.body.year
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('BOOKS')
    .replaceOne({ _id: bookId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the book.');
  }
};

const deleteBOOK = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('BOOKS').remove({ _id: bookId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the book.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createBOOK,
  updateBOOK,
  deleteBOOK
};