const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const prev_added_todos = await redis.getAsync('added_todos');
  await redis.setAsync(
    'added_todos',
    prev_added_todos ? Number(prev_added_todos) + 1 : 1
  );
  res.send(todo);
});

router.get('/statistics', async (req, res) => {
  const added_todos = await redis.getAsync('added_todos');
  res.send({
    added_todos: added_todos | 0
  });
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

singleRouter.put('/', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.todo._id,
    { text: req.body.text, done: req.body.done },
    { new: true }
  );

  res.send(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
