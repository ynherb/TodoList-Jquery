function createDomPage (key) {
  const li = $(`<li class="page-item"></li>`)
  const tagA = $(`<a class="page-link" href="#" data-page="${key}">${key}</a>`)
  return li.append(tagA)
}


export default class Paginator {
	constructor (maxPage, elem) {
    this.totalPage = null;
    this.maxPage = maxPage;
    this.activePage = null;
    this.elem = elem;
	}

	update (totalPage, activePage) {
    this.totalPage = totalPage ;
    this.activePage = activePage;
    this.calcPage()
	}

	calcPage () {
		console.log(this.totalPage, this.activePage)
    if (this.totalPage < this.maxPage) {
      this.createdPage(new Array(this.totalPage).fill(1).map((x, index) => x + index));
    } 
    else if (this.activePage <= Math.ceil(this.maxPage / 2)) this.createdPage([1, 2, 3, 4, 5]);
    
    else if (this.activePage + 2 >= this.totalPage) {
      this.createdPage(new Array(this.maxPage).fill(this.totalPage).map((x, index) => x - index).reverse());
    } 
    else this.createdPage(new Array(this.maxPage).fill(this.activePage - 2).map((x, index) => x + index));

	}

	 createdPage(key) {
	 	this.elem.empty()
	 	const fragment = $(document.createDocumentFragment())
	 	if (this.totalPage > this.maxPage && this.activePage > Math.ceil(this.maxPage / 2)) {
	 		fragment.append(createDomPage(1)).append(createDomPage('...').addClass('disabled first-page'));
	 	}

    key.forEach(item => fragment.append(createDomPage(item)));

    if (this.totalPage > this.maxPage && (this.activePage + 2) < this.totalPage) {
	 		fragment.append(createDomPage('...').addClass('disabled last-page')).append(createDomPage(this.totalPage));
	 	}
	 	fragment.find(`[data-page="${this.activePage}"]`)[0].parentNode.classList.add('active');
    this.elem.append(fragment);
  }

}