const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function getXhr() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

Vue.component('goods-list', {
	props: ['goods'],
	template: `<div class="goods-list grid">
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>`
});

Vue.component('goods-item', {
	props: ['good'],
	template: `<div class="goods-item">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
	  <button class="add-to-cart">Добавить в корзину</button>
    </div>`
});
//компонент корзина
Vue.component('cart-list', {
	props: [],
	template: `<div class="cart-list" v-if="isVisibleCart">
	            <button class="btn" @click="showCart">Корзина</button>
				<div class="close" @click="hideCart">X</div>
				<div class="cart-item">
					<div class="cart-info" v-for="good in cartGoods">
						<h3>{{ good.product_name }}</h3>
						<p>{{ good.price }}</p>
					</div>
				</div>
			</div>`
});
//компонент поиск			  
Vue.component('search', {
	props: [],
	template: `<form class="search" @submit.prevent="filterGoods">
				<input type="text" v-model.trim="searchLine" placeholder="Введите текст">
				<button type="submit" class="search-btn"></button>
			</form>`
});

const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		cartGoods: [],
		searchLine: '',
		isVisibleCart: false,

	},
	computed: {
		noData() {
			return this.filteredGoods.length === 0;
		}
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
			const regexp = new RegExp(this.searchLine, 'i');
			this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));

		},
		showCart() {
			this.isVisibleCart = true
		},
		hideCart() {
			this.isVisibleCart = false

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
