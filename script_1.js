let initData = [
    {
        id: 0,
        title: "Hit the gym",
        completed: false
    },
    {
        id: 1,
        title: "Pay bills",
        completed: true
    },
    {
        id: 2,
        title: "Meet George",
        completed: false
    },
    {
        id: 3,
        title: "Buy eggs",
        completed: false
    },
    {
        id: 4,
        title: "Read a book",
        completed: false
    },
    {
        id: 5,
        title: "Organize office",
        completed: false
    },
]
let STORAGE_KEY = "LGS_TDL";
let todoStorage = {
    fetch: function () {
        let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(initData));
        todos.forEach(function (todo, index) {
            todo.id = index;
        });
        todoStorage.uid = todos.length;
        return todos;
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};

let app = new Vue({
    data() {
        return {
            newTodo: "",
            todos: todoStorage.fetch()
        }
    },
    watch: {
        todos: {
            handler: function (todos) {
                todoStorage.save(todos);
            },
            deep: true
        }
    },
    methods: {
        // Create a new list item when clicking on the "Add" button
        addTodo: function () {
            let value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false
            });
            this.newTodo = "";
        },
        // Click on a close button to hide the current list item
        removeTodo: function (i) {
            this.todos.splice(this.todos.indexOf(i), 1);
        }
    }
})

app.$mount("#app")