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
      <goods-item v-for="good in goods" v-bind:key="good.id" :good="good"></goods-item>
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
	methods: {
		onClose() {
			this.$emit('close')			
		}
	},
	template: `<div class="cart-list">
	            <div class="close" @click="onClose">X</div>
			   </div>`
});
//компонент поиск			  
Vue.component('search', {
	data: ()=>({
		searchLine:""
	}),
	methods: {
		onSubmit(){
			this.$emit("submit", this.searchLine)
		}
	},
	template: `<form class="search" @submit.prevent="onSubmit">
				<input type="text" v-model.trim="searchLine" placeholder="Введите текст">
				<button type="submit" class="search-btn"></button>
			</form>`
});


//компонент ошибка
Vue.component('error-message', {
	props: ["message"],
	methods: {
		setCloseTimeout() {
			setTimeout(() => {
				this.$emit("close")
			}, 3000)
		}
	},
	mounted() {
		this.setCloseTimeout()
	},
	template: `<div class="error-message">{{ message }}</div>`
});



const app = new Vue({
	el: '#app',
	data: {
		goods: [],
		filteredGoods: [],
		cartGoods: [],
		searchLine: '',
		isVisibleCart: false,
		isVisibleError: false,
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

		filterGoods(searchLine) {
			const regexp = new RegExp(searchLine, 'i');
			this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));

		},
		showCart() {
			this.isVisibleCart = true
		},
		hideCart() {
			this.isVisibleCart = false

		},
		
		showError() {
			this.isVisibleError = true
		},
		hideError() {
			this.isVisibleEror = false

		},
		
	
	},
	mounted() {
		this.makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
			this.goods = goods;
			this.filteredGoods = goods;
		}).catch((err) => {
			this.message = err;
			this.showError();
		})
	}
});
