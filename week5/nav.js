export default{
    template:`
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">la vie</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#">首頁 <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="goProducts">商品</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="goCart">購物車</a>
            </li>
        </ul>
        </div>
    </nav>`,
    data(){
      return{};
    },
    methods:{
			goCart(){
				window.location = 'Cart.html';
			},
			goProducts(){
				window.location = 'FrontProducts.html';
			},
    }
  }