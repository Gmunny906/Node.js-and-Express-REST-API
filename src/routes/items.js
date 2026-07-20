import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/Item.js';

const router = express.Router();

//let is used here so that items are not reassigned to a new array-
// - but the items array can still be modified.
//tldr; const prevents the reassignment of the array variable


// GET /items - Retrieve all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});
//same as before just with the structure for a mongoDB DB

router.get('/:id', async (req, res) => {
  const itemId = req.params.id;

  // _id is very specific for mongoDB
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const item = await Item.findById(itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newItem = await Item.create({ title: title.trim() });
  res.status(201).json({ data: newItem });
});

router.put('/:id', async (req, res) => {
  const itemId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const updatedItem = await Item.findByIdAndUpdate(
    itemId,
    { title: title.trim() },
    { new: true, runValidators: true }
  );

  if (!updatedItem) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(updatedItem);
});

router.delete('/:id', async (req, res) => {
  const itemId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const deletedItem = await Item.findByIdAndDelete(itemId);

  if (!deletedItem) {
    return res.status(404).json({ error: 'Item not found'});
  }

  res.status(200).json({ data: `Item with id ${itemId} deleted successfully` });
});

export default router;