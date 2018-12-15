const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

router.get('/', (req, res) => {
    Todo.find({}).then((todos) => {//ici todos c'est ce que tu recupere du findOne. Tu le nommes comme tu veux. Ca c est un truc hyper important que j ai
        res.render('index', {
            todos: todos
        });
    })
})

router.post('/add', (req, res) => {
    const newTodo = new Todo({
        title: req.body.todo
    })
    console.log(newTodo);
    newTodo.save().then(() => {
        res.redirect('/');
    });
});

router.delete('/delete/:id', (req, res) => {
    //console.log('delete');
    //console.log(req.params.id);
    Todo.findByIdAndDelete(req.params.id, () => {
        res.redirect('/');
    })
});

router.get('/update/:id', (req, res) => {
    //console.log(req.params.id);
    Todo.findById(req.params.id, (err, todo) => {
        //console.log(todo);
        res.render('update', {
            todo: todo
        });
    })
});

router.put('/update/:id', (req, res) => {
    //console.log('put');
    //console.log(req.params.id);
    Todo.findByIdAndUpdate(req.params.id, {title: req.body.title}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(req.body.title);
        res.redirect('/');
    })
});

module.exports = router;