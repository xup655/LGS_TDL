let initData = [
    {
        id: 0,
        title: "Do Something",
        completed: false,
        visible: true
    },
    {
        id: 1,
        title: "Checked!",
        completed: true,
        visible: true
    }
];
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
            inputValue: "",
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
        closeTodo: function (element) {
            element.visible = false;
        },
        isChecked(event, todo) {
            if (event.target.tagName === 'LI') {
                todo.completed = !todo.completed;
            }
        },
        newElement: function () {
            let value = this.inputValue && this.inputValue.trim();
            if (!value) {
                alert("You must write something!");
                return
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false,
                visible: true
            });
            this.inputValue = "";
        },
    }
})

app.$mount("#app");