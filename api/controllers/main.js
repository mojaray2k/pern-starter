//a get function that returns all data from the db table
const getTableData = (req, res, db) => {
  db.select('*')
    .from('crudtable')
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: 'false' });
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

// a post function that will add a row to the table
const postTableData = (req, res, db) => {
  const { first, last, email, phone, location, hobby } = req.body;
  const added = new Date();
  db('crudtable')
    .insert({ first, last, email, phone, location, hobby, added })
    .returning('*')
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

// a put function that will update a row with a given id
const putTableData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body;
  db('crudtable')
    .where({ id })
    .update({ first, last, email, phone, location, hobby })
    .returning('*')
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

// a delete function that will delete a row with a given id
const deleteTableData = (req, res, db) => {
  const { id } = req.body;
  db('crudtable')
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: 'true' });
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }));
};

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
};
