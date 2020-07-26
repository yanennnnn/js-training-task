export default{
  template:`
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">{{tempProduct.title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img :src="tempProduct.imageUrl[0]" class="img-fluid mx-auto d-block" alt="" style="width:150px; height:150px">
          <p>{{tempProduct.description}}</p>
          <span>{{tempProduct.price|currency}}</span>
          <select class="custom-select" v-model="tempProduct.num">
            <option v-for="num in 10" :key="num" :value="num">
              選購 {{ num }} {{ tempProduct.unit }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="addCart(tempProduct.id,tempProduct.num)">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
  `,
  props:{
    tempProduct:{
      type:Object,
      default() {
        return {
          imageUrl: [],
        };
      },
    },
  },
  data(){
    return{};
  },
  methods:{
    addCart(id,num) {
      this.$emit('add',{id,num});
      $('#productModal').modal('hide');
    }
  }
}
