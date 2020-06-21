const getInput=document.querySelector('.text');
const addBtn=document.querySelector('.submit');
const allDelBtn=document.querySelector('.allDel');
const countTodo=document.querySelector('.countTodo');
const todoList=document.querySelector('#todoList_list');
addBtn.addEventListener('click',addTodo);
allDelBtn.addEventListener('click',delAllTodo);
todoList.addEventListener('click',doSomething);
getInput.addEventListener("keyup",function(e){
	if(e.keyCode===13){
		addTodo();
	}
})

let todoData=JSON.parse(localStorage.getItem('todoList'))||[];
updatetoDo(todoData);
function addTodo(){
	let getText=getInput.value.trim();
	const getTime=Math.floor(Date.now());
	if(getText!==''){
		todoData.push({
			id:getTime,
			text:getText,
			completed:false,
		})
	}
	getInput.value='';
	localStorage.setItem('todoList', JSON.stringify(todoData));
	updatetoDo(todoData);
}
function doSomething(e){
	const action=e.target.parentNode.dataset.action;
	const eId=e.target.parentNode.dataset.id;
	if(action=='delete'){
		deleteList(eId);
	}else if(action=='completed'){
		completedList(eId);
	}
}

function deleteList(id){
	todoData.forEach((item,index)=>{
		if(id==item.id){
			todoData.splice(index,1);
		}
	})
	localStorage.setItem('todoList', JSON.stringify(todoData));
	updatetoDo(todoData);
}

function completedList(id){
	todoData.forEach((item,index)=>{
		if(id==item.id){
			item.completed=item.completed?false:true;
		}
	})
	localStorage.setItem('todoList', JSON.stringify(todoData));
	updatetoDo(todoData);
}
function delAllTodo(){
	todoData=[];
	localStorage.removeItem("todoList");
	updatetoDo(todoData);
}
function updatetoDo(data){
	let count=0;
	let str='';
	data.forEach(item=>{
		str+=`
		<li class="todoList_list_item">
			<label class="${item.completed?'completed':''}" data-action='completed' data-id="${item.id}"><input type="checkbox" class="item_check" ${item.completed?'checked':''}>${item.text}</label>
			<button class="del" data-action="delete" data-id="${item.id}"><li class="fas fa-times"></li></button>
		</li>
		`
		if(!item.completed){
			count++;
		}
	})
	todoList.innerHTML=str;
	countTodo.innerHTML=count;
}
