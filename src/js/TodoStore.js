const axios = require('axios').default;

export default class TodoModel {
	constructor ({ url, loadingList, createItem, deleteItem, updateItem }) {
		this.url = url;
		this.loadingList = loadingList;
		this.createItem = createItem;
		this.deleteItem = deleteItem;
		this.updateItem = updateItem;
		this.listItem = [];
	}

	async setup () {
		// Загружаємо данні з сервера 
		try {
			const result = await $.get(this.url+this.loadingList);
		  this.listItem.push(...result);
		  return this.listItem
		} catch (err) {
      console.log(err)
		}
	}

	getList (to ,fro) {
		return this.listItem.slice(to, fro)
	}

	getLengthList () {
		return this.listItem.length;
	}

	async saveItem (affair) {
		let required = ['first_name', 'last_name'];
		const url = this.url+this.createItem;
		let filt = required.filter(key =>  (affair[key].length > 3) ? true : false);
    
    if (filt.length != required.length) throw 'lengthText';
    
    try {
      let result = await $.post(url, affair);
      if (result.status == 'error') throw result.msg;
      affair.id = result.item_id
      this.listItem.push(affair)
      return affair
    } catch (err) {
      throw err
    }
		
	}

	async removeItem (id) {
		let url = this.url + this.deleteItem
    try {
    	let result = await $.post(url, {item_id: id});
    	if (result.status == 'error') throw result.msg;
    	this.listItem = this.listItem.filter((e) => e.id != id);
    } catch (err) {
    	console.log(err)
      alert(err)
    }
	}

	getCloseElem (id) {
    return this.listItem.find(item => item.id == id)
	}

	async updateEdit (affair, id) {
		affair.item_id = id;
		
		const url = this.url + this.updateItem
		try {
			const result = await $.post(url, affair)
			if (result.status == 'error') throw result.msg;
			let obj = this.listItem.find((e) => e.id == id);
      obj = affair;
      return obj;

		} catch (err) {
			console.log(err)
			throw err
		}
	}

}