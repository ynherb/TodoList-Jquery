
function createdItemTodo (item, keyShow, numList) {
  const tr = $(`<tr data-id="${item.id}"></tr>`)
  tr.append(`<td data-event="edit"></td><td>${numList}</td>`)
  keyShow.forEach((key) => {
    let val = item[key] || ''
    tr.append($(`<td><input name="${key}" value="${val}" readonly="true"></input></td>`))
  })
  tr.append(`<td data-event="remove"> </td>`)
  return tr
}

function createButton () {
  return `<button type="button" data-event="save" class="save-button btn btn-primary btn-sm">Save</button>
         <button type="button" data-event="close" class="close-button btn btn-primary btn-sm">Close</button>`
} 

function activatedInput (elem) {

}

export default class TodoList {
	constructor (elem) {
		this.elem = elem;
    this.keyShow = ['first_name', 'last_name', 'msg']
	}

	addList (list, lengthOnePage, activePage) {
		this.elem.empty();
		let num = lengthOnePage * (activePage - 1) + 1;
		const fragment = $(document.createDocumentFragment())
    list.forEach((item, key) => {
    	const tr = createdItemTodo(item, this.keyShow, num+key);
    	fragment.append(tr);
    })
    this.elem.append(fragment)
	}

	addItem (affair, lengthOnePage, activePage) {
    let key = lengthOnePage * (activePage - 1) + 1 + this.elem.children().length;
	  this.elem.append(createdItemTodo(affair, this.keyShow, key).css('display', 'none'))
    this.elem.find(`[data-id="${affair.id}"`).show(400)
	}

  removeItem (id) {
    this.elem.find(`[data-id="${id}"]`).hide(400)
    return new Promise((res) => {
      setTimeout(() => {
        res()
      }, 400)
    })

  }

  editItem (elem) {
    elem.stop(true, true).animate({opacity: 0, right: -100},400, () => {
      elem.append(createButton()).addClass('position')})
      .animate({opacity: 1, right: 0 }, 100, () =>  { 
        elem.parent().find('input').each((key, item) => $(item).attr('readonly', false))  
    })
  }

  editClose (elem, affair) {
    elem.stop(true, true).children().eq(0)
    .animate({opacity: 0, right: -100},400, 
        () => $(elem).children().eq(0).removeClass('position').empty())
    .animate({opacity: 1, right: 0 }, 100, () =>  { 
      elem.children().find('input').each((key, item) => {
        $(item).attr('readonly', true).val(affair[item.name])
      })  
    })
  }

  editSave (elem) {
    let obj = {};
    $(elem).find('input').each((key, item) => {
      obj[item.name] = $(item).val()
    })
    return obj;
  }
}