export default class historyMod {
	constructor () {
		this.href = '?page';
	}

	init (totalPage) {
		const page = parseInt(location.search.replace(/\D+/g, ''));
		if ((this.href+page) === location.search && page <= totalPage) {
			history.replaceState(page, null, this.href+page);
		} 
		else history.replaceState(1, null, this.href+1);  
		return history.state;  
	}

	setUrl (page) {
    history.pushState(page, null, '?page'+page)
	}
}