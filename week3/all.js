var app = new Vue({
	el: '#app',
	data: {	
		products:[
			{
				id: 1586934917210,
        unit: '張',
        category: '桌子',
        title: '木頭扁形桌',
        origin_price: 1090,
        price: 899,
        description: '簡約設計，可搭配多種佈置風格，經測試，符合最嚴格的穩定性、耐用度和安全標準，經久耐用，適合日常居家使用',
        content: '桌子x1',
        is_enabled: 1,
				imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
				options: [
					{
						stars: 5,
						comments: [
							{
								name: '華倫',
								avator: 'https://randomuser.me/api/portraits/men/3.jpg',
								comment: '這是我用過最好用的桌子了，又特別有質感',
							},
							{
								name: '莊娜',
								avator: 'https://randomuser.me/api/portraits/women/48.jpg',
								comment: '大家都詢問我在那裡買的，超棒',
							}
						]
					},
					{
						stars: 4,
						comments: [
							{
								name: '羅菈',
								avator: 'https://randomuser.me/api/portraits/women/21.jpg',
								comment: '跟我想像的不一樣，但是還不錯',
							},
						]
					},
					{
						stars: 3,
						comments: [
							{
								name: '杰',
								avator: 'https://randomuser.me/api/portraits/men/49.jpg',
								comment: '不行，買回來樣子根本不是我要的，但質感還可以',
							},
						]
					}
				]
			},
			{
				id: 1573424926310,
        unit: '組',
        category: '傢俱組合',
        title: '簡約收納櫃',
        origin_price: 1599,
        price: 1399,
        description: '簡約百搭、經濟實用，使用最常見的白色，打造舒適空間，輕鬆佈置創造日常幸福感 ',
        content: '櫃子x1、椅子x1',
        is_enabled: 0,
				imageUrl: 'https://images.unsplash.com/photo-1511389026070-a14ae610a1be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE3MzYxfQ&auto=format&fit=crop&w=1950&q=80',
				options: [
					{
						stars: 5,
						comments: [
							{
								name: '麥凱蒂',
								avator: 'https://randomuser.me/api/portraits/women/42.jpg',
								comment: '是我剛好缺少的櫃子，和我家剛剛好位子！而且椅子也好有質感，超喜歡',
							},
						]
					},
					{
						stars: 4,
						comments: [
							{
								name: '章力',
								avator: 'https://randomuser.me/api/portraits/men/57.jpg',
								comment: '買給我女朋友的，還行，只可惜沒桌子搭配，有的話會更好',
							},
						]
					},
					{
						stars: 2,
						comments: [
							{
								name: '大衛',
								avator: 'https://randomuser.me/api/portraits/men/1.jpg',
								comment: '這質感普普，一下就不能用了，而且也不能放很多東西，請加強謝謝',
							},
						]
					}
				]
			}
		],
		tempProduct:{
			imageUrl:[],
		},
		tempOptions:[],
		optionTarget:'all',
	},
	methods: {
		openModal(isNew,item){
			switch (isNew){
				case 'new':
					this.tempProduct={
						imageUrl:[],
					},
					this.isNew = true;
          $('#updateModal').modal('show');
					break;
				case 'edit':
					//防止vmmv
					this.tempProduct = Object.assign({}, item);
					this.isNew = false;
					$('#updateModal').modal('show');
					break;
				case 'del':
					this.tempProduct = Object.assign({}, item);
					$('#delModal').modal('show');
					break;
				case 'option':
					this.tempProduct = JSON.parse(JSON.stringify(item));
					if(this.tempProduct.options){
						this.tempOptions = JSON.parse(JSON.stringify(item.options));
					}else{
						this.tempOptions=[];
					}	
					$('#optionModal').modal('show');
					break;
			}
		},
		updateProduct(){
			if(this.isNew){
				const id = new Date().getTime();
				this.tempProduct.id=id;
				this.products.push(this.tempProduct);
			}
			else{
				const id=this.tempProduct.id;
				this.products.forEach((item,i) => {
					if(item.id===id){
						this.products[i]=this.tempProduct;
					}
				});
			}
			this.tempProduct = {};
			$('#updateModal').modal('hide');
		},
		delProduct(){
			const id=this.tempProduct.id;
			this.products.forEach((item,i) => {
				if(item.id===id){
					this.products.splice(i,1);
				}
			});
			this.tempProduct = {};
			$('#delModal').modal('hide');
		},
		getOptionTarget(optionItem){
			// this.tempProduct.options.forEach((item,i,arr)=>{
			// 	if(this.tempProduct.options[i].stars==optionItem){
			// 		this.tempOptions=this.tempProduct.options[i];
			// 	}				
			// })
		},
		changeOptionTarget(item){
			switch (item){
				case 5 :
					this.optionTarget='5';
					break;
				case 4 :
					this.optionTarget='4';
					break;
				case 3 :
					this.optionTarget='3';
					break;
				case 2 :
					this.optionTarget='2';
					break;
				case 1 :
					this.optionTarget='1';
					break;	
				default:
					break;
			}
			this.getOptionTarget(item);
		},
		close(){
			this.optionTarget='all';
		}
		
	},
	computed: {
		activeOptions(){
			return this.tempOptions.filter(item=>{
				if(this.optionTarget=='all'){
					return item;
				}
				if(item.stars==this.optionTarget){
					console.log(item);
					return item
				}
				
			})
			
		},
	},
})
