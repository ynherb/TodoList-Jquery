import TodoStore from './js/TodoStore.js';
import Paginator from './js/paginator.js';
import historyMod from './js/historyMod.js';
import TodoList from './js/TodoList.js';
import TodoAdd from './js/TodoAdd.js';
import TodoController from './js/controller.js';

const modelConfig = {
	url: `https://developer.wtgspain.com/interview-task/`,
	loadingList: 'list?page=2',
  createItem: 'create',
  deleteItem: 'delete',
  updateItem: 'update'
}

const elemTodoList = $('#todo')
const elemPaginator = $('#paginator')
const elemTodoAdd = $('#todo-add')
const masgErrTodoAdd = 'more than 3 characters frist_name and last_name'

const configTodo = {
	lengthOnePage: 15,
	paginator: new Paginator(5, elemPaginator),
	TodoStore: new TodoStore(modelConfig),
  history: new historyMod(),
  TodoList: new TodoList(elemTodoList),
  TodoAdd: new TodoAdd(elemTodoAdd, masgErrTodoAdd)
}

const controller = new TodoController(configTodo);
console.log(controller)
controller.setup()

