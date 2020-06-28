const obj={
    data:{
        apiPath:'https://course-ec-api.hexschool.io',
        uuid:'bc4c7f65-dcb1-4e02-97a6-6740e37fc6f8',
        products:[],
    },
    getData(){
        const vm=this;
        const api=`${vm.data.apiPath}/api/${vm.data.uuid}/ec/products`;
        axios.get(api)
        .then((res)=>{
            vm.data.products=res.data.data;
            vm.render();
            // vm.updata();
        })
        
    },
    render(){
        const vm=this;
        const list=document.querySelector('.list');
        let str='';
        vm.data.products.forEach((item)=>{
            str+=`
            <li>
                <div class="bg" style="background-image:url('${item.imageUrl[0]}')"></div>
                <h3>${item.title}</h3>
                <p>${item.category}</p>
                <div class="listPrice">
                    <span class="price">${item.price}</span><span class="originPrice">${item.origin_price}</span>
                    <button class="btn">加入購物車</button>
                </div>
                
            </li>
            `
        })
        list.innerHTML=str;
    },
}
obj.getData();

