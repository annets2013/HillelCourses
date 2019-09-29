class Task {

    updateText(text) {
        this.text = text;
    }
    updateStatus(isComplited) {
        this.isComplited = isComplited;
    }
    constructor(date, text, isComplited, id) {
        this.date = date;
        this.text = text;
        this.isComplited = isComplited;
        this.id = id;
    }
}

var tasks = [
    new Task(new Date(2019, 6, 15, 13, 37), 'покормить кота', false, 1),
    new Task(new Date(2019, 6, 3, 13, 24), 'полить цветы', true, 2),
    new Task(new Date(2019, 6, 1, 13, 21), 'почистить зубы', true, 3),
    new Task(new Date(2019, 6, 22, 13, 36), 'починить велосипед ', false, 4),
    new Task(new Date(2019, 6, 1, 13, 55), 'написать Ане', true, 5),
    new Task(new Date(2019, 6, 12, 13, 28), 'съездить в Прагу', false, 6)
];


function deleteTask(id) {
    if (confirm('Точно хотите удалить?')) {
        this.tasks = this.tasks.filter(task => task.id !== +id);
        printTasks();
    }

}

function addTask() {
    var text = prompt("Введите текст задачи", "Новая задача " + getNewId());

    if (text !== undefined && text !== '' && text !== null) {
        var isExists = (tasks.find(task => task.text === text) !== undefined);
        if (isExists) {
            alert('Такая заметка уже существует');
        } else {
            var task = new Task(new Date(), text, false, getNewId());
            tasks.push(task);
            printTasks();
        }
    } else {
        alert('Введите текст');
    }

}


function getNewId() {
    var maxId = tasks.reduce((max, p) => p.id > max ? p.id : max, tasks[0].id);
    return ++maxId;
}

function printTasks() {
    var completedTasksCount = tasks.filter(task => task.isComplited === true).length;
    var unCompletedTasksCount = tasks.filter(task => task.isComplited === false).length;
    var html = '';
    var taskOutput = '<p>Всего задач: ' + tasks.length + '</p>' +
        '<p> Выполнено: ' + completedTasksCount + ' </p>' +
        '<p> Осталось: ' + unCompletedTasksCount + '</p>';

    for (i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var checked = (task.isComplited == true) ? 'checked' : '';
        html += task.id + ') ' + task.text + ' ' + task.date.toLocaleDateString() + ' ' +
            "<input onclick ='statusСhange(this)' type='checkbox' value='" + task.id + "' " + checked + "></input>"
            + "<button onclick='deleteTask(" + task.id + ")'>Удалить</button>"
            + "<button onclick='editing (" + task.id + ")'>Редактировать</button>" + "<br>";
    }

    document.getElementById('affairs').innerHTML = html;
    document.getElementById('taskOutput').innerHTML = taskOutput;

}

function editing(id) {
    var taskToUpdate = tasks.find(item => item.id == id);
    if (taskToUpdate !== undefined) {
        var newText = prompt("Введите новый текст", taskToUpdate.text);
        if (newText !== undefined && newText.length > 0) {
            if (confirm("Сохранить изменения?")) {
                taskToUpdate.updateText(newText);
                printTasks();
            }
        } else {
            alert('Не верно введен текст');
        }

    }

}

function statusСhange(select) {
    var id = select.value;
    var taskToUpdate = tasks.find(item => item.id == id);
    if (taskToUpdate !== undefined) {
        var newStatus = !taskToUpdate.isComplited;
        taskToUpdate.updateStatus(newStatus);
        printTasks();
    }

}
function alphabet() {
    tasks = tasks.sort((a, b) => a.text.localeCompare(b.text));

    printTasks();
}
function dateSorting() {
    tasks.sort((a, b) => {
        var dateA = new Date(a.date), dateB = new Date(b.date)
        return dateA - dateB

    })
    printTasks();
}

function sortsByStatus() {
    tasks.sort((a, b) => {
        return a.isComplited ? 1 : -1;
    });
    printTasks();

}

function sortTypeChange(select) {
    var value = +(select.value);
    switch (value) {

        case 0:
            dateSorting();
            break;
        case 1:
            alphabet();
            break;
        case 2:
            sortsByStatus();
            break;
    }
}
printTasks();