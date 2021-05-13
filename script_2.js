let STORAGE_KEY = "LGS_TDL";
let todoStorage = {
    fetch: function () {
        let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
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

let ComponentA = {
    data() {
        return {
            count: 0
        }
    },
    props: ['todo'],
    template: '<span class="close" @click="removeTodo(todo)">×</span>'
}

let app = new Vue({
    data() {
        return {
            newTodo: "",
            todos: todoStorage.fetch()
        }
    },
    components: {
        'component-a': ComponentA
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
        // Create a "close" button and append it to each list item
        // Click on a close button to hide the current list item
        removeTodo: function (i) {
            this.todos.splice(this.todos.indexOf(i), 1);
        },
        // Add a "checked" symbol when clicking on a list item
        isChecked(e) {
            e.completed = !e.completed
        },
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
    }
})

app.$mount("#app")