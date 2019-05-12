class GoodsItem {
	constructor(title="Без названия", price="цена не указана") {
		this.title = title;
		this.price = price;
	}
	render() {
		return `<div class="goods-item">
<h3>${this.title}</h3>
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
	fetchGoods() {
		this.goods = [
	{ title:"Shirt", price:"200" },
	{ title:"Socks", price:"100" },
	{ title:"Jacket", price:"300" },
	{ title:"Shoes" },
	{ title:"Shirt", price:"200" },
	{ title:"Socks", price:"100" },
	{ price:"300" },
	{ title:"Shoes", price:"400" },
	{ title:"Shirt", price:"200" },
	{ title:"Socks", price:"100" },
	{ title:"Jacket", price:"300" },
	{ title:"Shoes", price:"400" }
		];
	}
	
	render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}



/*  //Класс элемента корзины товаров
class BasketItem {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}

// Класс корзины товаров
class Basket {
    constructor() {
        this.cartGoods = [];
    }
	
    // Добавление товара в корзину 
  
    // Удаление товара из корзины */
   
const list = new GoodsList();
list.fetchGoods();
list.render();