import express from 'express';

const router = express.Router();

//let is used here so that items are not reassigned to a new array-
// - but the items array can still be modified.
//tldr; const prevents the reassignment of the array variable

let items = [];

// GET /items - Retrieve all items
router.get('/', (req, res) => {
  res.json(items);
});

router.get('/:id', (req, res) => {
    const itemId = req.params.id;
  const item = items.find(i => i.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newItem = { id: Date.now().toString(), title: title.trim() };
  items.push(newItem);
  res.status(201).json({ data: newItem });
});

router.put('/:id', (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const updatedItem = { ...items[itemIndex], title: title.trim() };
  items[itemIndex] = updatedItem;
  res.json(updatedItem);
});

router.delete('/:id', (req, res) => {
  const itemId = req.params.id;
  const itemIndex = items.findIndex(i => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }


  items.splice(itemIndex, 1);
  res.status(200).json({ data: `Item with id ${itemId} deleted successfully` });
});

export default router;