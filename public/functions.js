const ResultMsg = document.getElementById('ResultMsg');
getClothes();

function getClothes() {


    fetch('/getmenu', {
        method: 'GET',
        
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res=>res.json())
    .then(data=>{
        let menu = data;
        
        let menuStr = '';
        menu.forEach(item => {
          menuStr += `<img src=" ${item.name}" style="width: 150px; height:150px ;"></img> ID:${item.ID} , Price:${item.price}  NIS    <input id=${item.ID} type='number' placeholder="New Price">   <button id=${item.ID} onclick=updatePrice(event,${item.ID},this.id) style="background-color: beige;"> Update Price </button><br><br>`
        })
        document.getElementById('root').innerHTML = menuStr;


    })
  }
  function addNewClothe(e){
    e.preventDefault();

    const url = e.target.elements.nurl.value;
    const price = e.target.elements.nPrice.value;

    fetch('/api/addClothe', {
        method: 'POST',
        body: JSON.stringify({ url ,price }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            const { wordExist } = data;
            console.log(wordExist)
            //print to DOM
            if(wordExist == true){
             ResultMsg.innerText = `Item Already exist`}
             else {
            ResultMsg.innerText = `Succesfully Added` 
             }
        }) 
        getClothes();
}


function deleteClothe(e){
  e.preventDefault();

  const ItemId = e.target.elements.ItemId1.value;


  fetch('/api/deleteTheClothe', {
      method: 'PUT',
      body: JSON.stringify({ ItemId }),
      headers: {
          "Content-Type": "application/json"
      }
  }).then(res=>res.json())
    .then(data=>{
      const {success} = data;

      console.log(success)


  })
  getClothes();
}



        function updatePrice(e,itemV,id)
{
  e.preventDefault();

    const val = itemV[0].value;
    console.log(val)
    try{
    fetch('/updateprice', {
        method: 'PUT',
        body: JSON.stringify({ id,val }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res=>res.json())
    .then(data=>{
        const {success} = data;

        console.log(success)


    })
    getClothes();
}
catch(error){
    console.error();
}
}

   