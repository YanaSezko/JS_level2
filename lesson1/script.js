const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
    let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
    xhr.open("GET", url, true);
    xhr.onload = () => resolve(callback(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
		
   });
}
/*function makeGETRequest(url, callback) {
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}

*/
class GoodsItem {
	constructor(product_name="Без названия", price="цена не указана") {
		this.product_name = product_name;
		this.price = price;
	}
	render() {
		return `<div class="goods-item">
<h3>${this.product_name}</h3>
<p>${this.price}</p>
<img src="http://dummyimage.com/120" />
<button class="btn">Добавить в корзину</button>
</div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = []
	}
	
	fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
	  cb();	
    })
  }
	
	/*
	calcPrice(){
		return this.goods.reduce((sum,curr) => {
			if(!curr.price) return sum;
			return sum + curr.price
		},0)
		
	}
	*/
	render() {
    const listHtml = this.goods.reduce((renderString, good) => {
		const goodItem = new GoodsItem(good.product_name, good.price)
		return renderString += goodItem.render()
	},'');
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

class Cart extends GoodsList {
	add(){
		
	}
	update(index, newCount){
		this.goods[index].setCount(newCount)
	}
	remove(index){
		
	}
}

class CartItem extends GoodsItem {
	constructor(product_name="Без названия", price = "") {
		let count = 1;
		super();
	}
	getCount() {
		return count;
	}
	setCount(newCount) {
		count = newCount
	}
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});

