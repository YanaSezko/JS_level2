const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function getXhr() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		cartGoods: [],
		searchLine: '',
		isVisibleCart: '',

	},
	methods: {
		makeGETRequest(url) {
			return new Promise((resolve, reject) => {
				let xhr = getXhr();
				xhr.onreadystatechange = function () {
					if (xhr.readyState !== 4) return;

					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.responseText))
					} else {
						reject("Request error")
					}
				};
				xhr.open("GET", url, true);
				xhr.send();

			})
		},

		filterGoods() {
			let regexp = new RegExp(this.searchLine, 'i');
			this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
		},
		viewCart() {
			switch (this.isVisibleCart) {
				case (false):
					{
						this.isVisibleCart = true;
						break;
					}
				case (true):
					{
						this.isVisibleCart = false;
						break;
					}
			}
		}

	},
	mounted() {
		this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
			this.goods = goods;
			this.filteredGoods = goods;
		})
	}
});

/*const app = new Vue({
    el: '#app',
    data: {
		goods: [],
  		filteredGoods: [],
  		searchLine: ''
    },
	methods: {
    makeGETRequest(url, callback) {
    	const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
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
    },
	mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
    this.goods = goods;
    this.filteredGoods = goods;
        });
    }

	
});
*/
/*



function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
    let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
	  xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      if (xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject("Request error")
      }
    };
    xhr.open("GET", url, true);
    xhr.send();

   });
}
class GoodsItem {
	constructor(id,product_name="Без названия", price="цена не указана") {
		this.id = id;
		this.product_name = product_name;
		this.price = price;
	}
	render() {
		return `<div class="goods-item">
<h3>${this.product_name}</h3>
<p>${this.price}</p>
<img src="http://dummyimage.com/120" />
<button data-id="${this.id}" class="add-to-cart">Добавить в корзину</button>
</div>`;
	}
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.filteredGoods = []
  }
  fetchGoods() {
    return makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
      this.goods = JSON.parse(goods)
      this.filteredGoods = JSON.parse(goods)
    }).catch((err) => console.error(err));
  }
  filterGoods(value) {
    const regexp = new RegExp(value, "i")
    this.filteredGoods = this.goods.filter(good =>  regexp.test(good.product_name));
    this.render();
  }
  addEvents(cart) {
    const buttons = [...document.querySelectorAll('.add-to-cart')]
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.target.getAttribute("data-id");
        const product = this.goods.find(item => item.id_product == id)
        cart.add(product)
      })
    })
  }
  calcPrice() {
    return this.goods.reduce((sum, curr) => {
      if (!curr.price) return sum;
      return sum + curr.price
    }, 0)
  }
	render(cart) {
    const listHtml = this.filteredGoods.reduce((renderString, good) => {
		const goodItem = new GoodsItem(good.id_product, good.product_name, good.price)
		return renderString += goodItem.render()
	},'');
    document.querySelector('.goods-list').innerHTML = listHtml;
	this.addEvents(cart)
  }
}

class Cart extends GoodsList {
  add(product) {
    makeGETRequest(`${API_URL}/addToBasket.json`).then(() => {
      console.log(product)
    }).catch(err => console.error(err))
  }
  update(index, newCount) {
    this.goods[index].setCount(newCount)
  }
  remove(index) {
    this.goods.splice(index, 1)
  }
}

class CartItem extends GoodsItem {
  constructor(title = "Без имени", price = "", count = 1) {
    super();
    this.count = count
  }
  getCount() {
    return this.count;
  }
  setCount(newCount) {
    this.count = newCount
  }
}

const list = new GoodsList();
const cart = new Cart();
list.fetchGoods().then(() => {
  list.render(cart);
}).catch((err) => console.error(err));

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.goods-search');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = searchInput.value
  list.filterGoods(value)
})

//ФОРМА
let link = document.querySelector(".btn-write");
let popup = document.querySelector(".form-write-us");
let close = document.querySelector(".form-close");
let user = document.querySelector(".users-name");
let form = document.querySelector(".form");
let password = document.querySelector(".users-email");
let storage = localStorage.getItem(".users-name");

link.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("form-show");

    if (storage) {
        user.value = storage;
        password.focus();
    } else {
        user.focus();
    }
});

close.addEventListener("click", function(evt) {
    evt.preventDefault();
    form.classList.remove("form-show");
});

function regText() {
    let text = document.getElementById('regtext').value;
    let regexpAllPoints = new RegExp('\'', 'gm');
    let regexpReturnApostroph = /\b\"\b/gm;
    let newstr = text.replace(regexpAllPoints, '"');
    newstr = newstr.replace(regexpReturnApostroph, '\'');
    document.getElementById('regtext').value = newstr;
}
document.getElementById('regtext').addEventListener("keyup", regText);  */
