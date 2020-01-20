export default  {
	addEvent: function () {
    this.eventPaginator()
    .eventTodoList()
    .eventTodoAdd()
	},

  eventPaginator: function  () {
    this.paginator.elem.click((e) => {
    	e.preventDefault()
      const elem = $(e.target);
      const id = elem.data('page')

      if (id != this.activePage && typeof id == 'number') this.switchPage(id);
    })
    return this;
  },
  eventTodoList: function  () {
    this.TodoList.elem.click((e) => {
      e.preventDefault()
      const elem = $(e.target);
      const event = elem.data('event')
      switch (event) {
        case 'remove':
          this.removeItem(elem)
          break;
        case 'close':
			    this.editClose(elem)
			    break;
			  case 'save':
			    this.editSave(elem)
			    break;
			  case 'edit':
			    this.editItem(elem)
			    break;
      }
    })
    return this;
 },

  eventTodoAdd: function  () {
 	  this.TodoAdd.elem.click((e) => {
      e.preventDefault()
        const elem = $(e.target);
        const id = elem.data('event')
 	      if (id) this.addItem()
 	  })
 	  return this;
  }
}