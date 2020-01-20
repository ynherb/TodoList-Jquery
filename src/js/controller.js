import eventController from './eventController.js'

class TodoController {
	constructor ({lengthOnePage, paginator, TodoStore, history, TodoList, TodoAdd}) {
		this.lengthOnePage = lengthOnePage; // скільки показувати на одній сторінці
		this.paginator = paginator;
		this.TodoStore = TodoStore;
		this.TodoList = TodoList;
		this.history = history;
		this.TodoAdd = TodoAdd;
		this.activePage = null; // активна сторінка
	}

	setup () {
    this.TodoStore.setup().then((list) => {
      this.totalPage = Math.ceil(list.length / this.lengthOnePage);
      this.activePage = this.history.init(this.totalPage)
      this.addEvent()
      this.urlUpdate().paginatorUpdate().listUpdate()
    }).catch(e => alert(e))
	}

	setActivedPage(page) {
		this.activePage = page;
    this.sendList().paginatorUpdate().setUrl()
	}

	getList() {
		const [min, max] = [(this.activePage-1)*this.lengthOnePage, this.lengthOnePage * this.activePage];
    return this.TodoStore.getList(min, max);
	}

	listUpdate () {
		const result = this.getList()
		console.log(result)
		this.TodoList.addList(result, this.lengthOnePage, this.activePage)
		return this;
	}

	paginatorUpdate () {
    this.paginator.update(this.totalPage, this.activePage)
		return this
	}

	urlUpdate (key = this.activePage) {
		this.history.setUrl(key)
		return this
	}
  
  switchPage (id) {
  	this.activePage = id;
  	this.urlUpdate().paginatorUpdate().listUpdate()
  }

  updateAddItem (affair) {
  	const list = this.getList().length;
  	const total = Math.ceil(this.TodoStore.listItem.length / this.lengthOnePage);
  	// якщо на сторінці меньше 15 елементів то добавляємо
  	if (list < this.lengthOnePage) {
  		this.TodoList.addItem(affair, this.lengthOnePage, this.activePage);
  	} else if (list == this.lengthOnePage && total > this.totalPage) {
  		this.totalPage = total;
  		this.activePage++
  		this.urlUpdate().paginatorUpdate().listUpdate()
  	}
    
  	return this
  }

  updateRemoveItem () {
    const list = this.getList().length;
  	// якщо на сторінці меньше 15 елементів то добавляємо
  	if (!list) {
  		this.totalPage--;
  		this.activePage--
  		this.urlUpdate().paginatorUpdate().listUpdate()
  	} 
  	return this
  }

  async addItem (elem) {
  	const val = this.TodoAdd.inputVal();
  	 try {
    	const result = await this.TodoStore.saveItem(val);
    	this.updateAddItem(result)
    } catch (err) {
    	if (err == 'lengthText') this.TodoAdd.errText();
  		else alert(err)
    }
    this.TodoAdd.completed()
  }

   async removeItem (elem) {
    const id = elem.parent().data('id')
    try {
    	const result = await this.TodoStore.removeItem(id)
    	await this.TodoList.removeItem(id)
    	this.updateRemoveItem()
    } catch (e) {
    	console.log(e)
    }
    
  }

  editItem (elem) {
  	this.TodoList.editItem(elem)
  }
  editSave (elem) {
  	const parentElem = elem.parent().parent();
  	const id = parentElem.data('id');
    const affair = this.TodoList.editSave(parentElem)

  	this.TodoStore.updateEdit(affair, id).then((obj) => {
      this.TodoList.editClose(parentElem, obj)
  	}).catch(err => alert(err))


  }
  editClose (elem) {
  	const parentElem = elem.parent().parent();
  	const id = parentElem.data('id');

  	const affair = this.TodoStore.getCloseElem(id);
  	this.TodoList.editClose(parentElem, affair)
  }
	
}

// Усі events переносимо в окермій файл і підмішуємо в прототип
const event =  Object.assign(TodoController.prototype, eventController)
Object.setPrototypeOf(TodoController, event)

export default TodoController