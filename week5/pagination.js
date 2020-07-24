export default{
  template:`
    <nav aria-label="Page navigation" >
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled':page.current_page===1}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getPage(page.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="item in page.total_pages" :class="{'active':page.current_page===item}" :key="item">
          <a class="page-link" href="#" @click.prevent="getPage(item)">{{item}}</a>
        </li>
        <li class="page-item" :class="{'disabled':page.current_page===page.total_pages}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getPage(page.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  props:{
    page:{
      type:Object,
      default() {
        return {
        };
      },
    }
  },
  data(){
    return{};
  },
  methods:{
    getPage(page){
      this.$emit('emit-page',page);
    }
  }
}
