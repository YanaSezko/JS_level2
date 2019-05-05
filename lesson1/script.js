const goods = [
	{ title:"Shirt", price:"200" },
	{ title:"Socks", price:"100" },
	{ title:"Jacket", price:"300" },
	{ title:"Shoes", price:"400" },
	{ title:"Shirt", price:"200" },
	{ title:"Socks", price:"100" },
	{ title:"Jacket", price:"300" },
	{ title:"Shoes", price:"400" },
	{ title:"Shirt", price:"200" },
	{ title:"Socks", price:"100" },
	{ title:"Jacket", price:"300" },
	{ title:"Shoes", price:"400" }
]

const renderGoodsItem = (title, price) => {
 return `<div class="goods-item">
<h3>${title}</h3>
<p>${price}</p>
<img src="http://dummyimage.com/120" />
</div>`;
}

const renderGoodsList = (list) => {
const goodsList = list.map(item =>
renderGoodsItem(item.title, item.price));
document.querySelector('.goods-list').innerHTML=goodsList.join('');
}

renderGoodsList(goods)
