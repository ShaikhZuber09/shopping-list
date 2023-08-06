const cl=console.log;

const shoppingForm=document.getElementById("shoppingForm");
const shoppingInput=document.getElementById("shoppingInput");
const addBtn=document.getElementById("addBtn");
const updateBtn=document.getElementById("updateBtn");
const filterItem=document.getElementById("filterItem");
const shoppingList=document.getElementById("shoppingList");
const clearAll=document.getElementById("clearAll")

const templating=(arr)=>{
    shoppingList.innerHTML= arr.reduce((accu,cv)=>{
        accu +=` <div class="col-6 mt-2" id="${cv.itemId}">
                     <div class=" item d-flex px-3 font-weight-bold ">
                       <p class="m-0 p-2 flex-grow-1" onclick="onEditItem(this)">${cv.itemName}</p>
                       <button type="button" class="p-2 close text-danger" aria-label="Close">
                         <span aria-hidden="true" onclick="onDeleteItem(this)">&times;</span>
                       </button>
                     </div>
                   </div>`
                   return accu
    },"")
}

let shoppingListArray=[]

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

const onItemAdd=(eve)=>{
    eve.preventDefault();
    let obj={
itemId:uuidv4(),
itemName:shoppingInput.value
    }
    shoppingListArray.unshift(obj)
    cl(shoppingListArray)
    templating(shoppingListArray)
    eve.target.reset()
}

const onEditItem=(eve)=>{
    let editId=eve.closest(".col-6").id
let editObj=shoppingListArray.find((obj)=>obj.itemId === editId)
localStorage.setItem("editObj", JSON.stringify(editObj))
shoppingInput.value=editObj.itemName;
addBtn.classList.add("d-none");
updateBtn.classList.remove("d-none")
eve.closest(".col-6").style.opacity="0.4"
}

const onUpdateItem=(eve)=>{
    let updateObj=JSON.parse(localStorage.getItem("editObj"))
    for (let i = 0; i < shoppingListArray.length; i++) {
        if(shoppingListArray[i].itemId===updateObj.itemId){
          shoppingListArray[i].itemName=shoppingInput.value
        }
    }
    templating(shoppingListArray)
    shoppingForm.reset()
    addBtn.classList.remove("d-none")
updateBtn.classList.add("d-none")

}

const onDeleteItem=(eve)=>{
  let deleteId=eve.closest(".col-6").id
  if (confirm("Are you sure")) {
    shoppingListArray=shoppingListArray.filter(obj=> obj.itemId != deleteId)
   templating(shoppingListArray)
  } else {
    return false;
  }
}


filterItem.addEventListener("keyup",(eve)=>{
// let search=eve.target.value.toLowerCase()
//     let filterArr=shoppingListArray.filter((obj)=>{
// return obj.itemName.toLowerCase().includes(search)
//     })
//     templating(filterArr)
templating(shoppingListArray.filter(obj=>obj.itemName.toLowerCase().includes(eve.target.value.toLowerCase())))
})

clearAll.addEventListener("click",(eve)=>{
  if(confirm("Are you really want to delete All")){
    shoppingListArray.length=0;
    cl(shoppingListArray)
    templating(shoppingListArray)
  }else {
    return false;
  }
  
})

shoppingForm.addEventListener("submit", onItemAdd);
updateBtn.addEventListener("click", onUpdateItem)