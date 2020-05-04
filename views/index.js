var app = angular.module('ToDo', [])
app.controller('todoController', function ($scope, $http) {
    var list = this;
    list.todos = [];
    refresh();

    function refresh() {
        list.todos = [];
        $http.get("/todos").then(function (res) {
            res.data.map(i => list.todos.push({ 'title': i.title, 'done': i.done, 'id': i._id }))
        })
    }

    list.addTodo = async function () {
        list.newTodoBody = { 'title': list.newTodo, 'done': false };
        await $http.post(`/posts`, list.newTodoBody).then(function (req, res) { })
        refresh();
        list.newTodo = '';
    }

    list.clearCompleted = async function () {
        list.todosToRemove = list.todos.filter(item => item.done)

        await list.todosToRemove.map(async item => {
            await $http.delete(`/posts/${item.id}`).then(function (res) {
            })
        })
        refresh();
    }

    list.markAsDone = async function (todo) {
        list.editedTodoStatus = { 'title': todo.title, 'done': !(todo.done) };
        await $http.patch(`/posts/${todo.id}`, list.editedTodoStatus).then(function (res) {
        })
        refresh();
    }

    list.removeOne = async function (id) {
        list.todos = list.todos.filter(function (item) {
            return item.id != id
        })
        await $http.delete(`/posts/${id}`).then(function (res) {
        })
    }

    list.selectTodoToEdit = (title, id) => {
        list.editedTitle = title;
        list.editedId = id
    }

    list.editTodo = async function (id) {
        list.editedTodoBody = { 'title': list.editedTitle };
        await $http.patch(`/posts/${list.editedId}`, list.editedTodoBody).then(function (res) {
        })
        refresh();
    }
});