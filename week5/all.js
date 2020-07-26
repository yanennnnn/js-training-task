import pagination from './pagination.js';
import navbar from './nav.js';
import currencyFilter from './currency.js'
import singleProduct from './singleProduct.js'
// 匯入語系檔案
import zh_TW from './zh_TW.js';

Vue.use(VueLoading);
// 全域註冊 VueLoading 並標籤設定為 loading
Vue.component('loading', VueLoading);
Vue.component('pagination',pagination);
Vue.component('navbar',navbar);
Vue.component('singleProduct',singleProduct);
Vue.filter('currency',currencyFilter);
// 註冊全域的表單驗證元件
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);
// 加入至 VeeValidate 的設定檔案
VeeValidate.localize('tw', zh_TW);
// Class 設定檔案
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});
new Vue({
  el:'#app',
  data(){
    return{
      products:[],
      tempProduct:{
        imageUrl: [],
        num:0,
      },
      carts:[],
      totalPrice:0,
      pagination:{},
      isLoading:false,
      category:'',
      user:{
        token:'',
        uuid:'bc4c7f65-dcb1-4e02-97a6-6740e37fc6f8',
        path:'https://course-ec-api.hexschool.io',
      },
      form:{
        name:'',
        email:'',
        phone:'',
        address:'',
        payment:'',
        message: '',
      }
    }
  },
  methods: {
    getProducts(page=1){
      const vm=this;
      vm.isLoading=true;
      axios.get(`${vm.user.path}/api/${vm.user.uuid}/ec/products?page=${page}`)
        .then((res)=>{
          if(res.status===200){
            if(vm.category===''){
              vm.products=res.data.data;
            }else{
              let filterProducts=res.data.data.filter((item)=>{
                
                return vm.category==item.category;
              })
              // console.log()
              vm.products=filterProducts;
            }
            vm.pagination=res.data.meta.pagination;
            vm.isLoading=false;
          }
        })
    },
    getCart(){
      const vm=this;
      vm.isLoading=true;
      axios.get(`${vm.user.path}/api/${vm.user.uuid}/ec/shopping`)
        .then((res)=>{
          vm.carts=res.data.data;
          vm.isLoading=false;
          vm.getTotalPrice();
        })
    },
    getTotalPrice(){
      const vm=this;
      vm.totalPrice=0;
      vm.carts.forEach((item)=>{
        vm.totalPrice+=item.product.price*item.quantity
      })
    },
    addCart(item,quantity=1){
      const vm=this;
      const data={
        product:item.id,
        quantity,
      }
      vm.isLoading=true;
      axios.post(`${vm.user.path}/api/${vm.user.uuid}/ec/shopping`,data)
        .then((res)=>{
          console.log(res);
          vm.getCart();
          vm.isLoading=false;
        }).catch((error) => {
          // this.status.loadingItem = '';
          console.log(error.response.data.errors);
          vm.isLoading=false;
        });
    },
    delCart(id){
      const vm=this;
      vm.isLoading=true;
      axios.delete(`${vm.user.path}/api/${vm.user.uuid}/ec/shopping/${id}`)
      .then((res)=>{
        vm.getCart();
        vm.isLoading=false;
      })
    },
    updateQty(id,qty){
      const vm=this;
      vm.isLoading=true;
      const data={
        product:id,
        quantity:qty,
      }
      axios.patch(`${vm.user.path}/api/${vm.user.uuid}/ec/shopping`,data)
        .then((res)=>{
          vm.getCart();
          vm.isLoading=false;
        }).catch((error)=>{
          console.log(error.response.data.errors);
          vm.isLoading=false;
        })
    },
    submitForm(){
      const vm=this;
      vm.isLoading=true;
      axios.post(`${vm.user.path}/api/${vm.user.uuid}/ec/orders`,this.form)
        .then((res)=>{
          vm.getCart();
          vm.isLoading=false;
        })
    },
    goTargetProduct(){
    
    },
    targetcategory(item){
      switch (item){
        case '' :
          this.category='';
          break;
        case '碗盤':
          this.category='碗盤';
          break;
        case '杯子':
          this.category='杯子';
          break;
        case '餐具':
          this.category='餐具';
          break;
      }
      this.getProducts();
    },
    activeProducts(){
      if(this.category===''){
        return
      }
      this.products.filter((item)=>{
        return item.category===this.category;
      })
    },
    goCart(){
      window.location = 'Cart.html';
    },
    goProducts(){
      window.location = 'FrontProducts.html';
    },
    openModal(id) {
      const vm=this;
      vm.isLoading=true;
      axios.get(`${vm.user.path}/api/${vm.user.uuid}/ec/product/${id}`)
      .then((res)=>{
        console.log(res);
        vm.tempProduct=res.data.data;
        vm.$set(vm.tempProduct, "num", 1);
        $('#productModal').modal('show');
        vm.isLoading=false;
      })
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  },
})
