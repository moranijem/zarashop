const express = require('express')
const app = express()


var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'))



const menu = [
    {name: 'https://static.zara.net/photos///2020/I/0/1/p/7878/699/250/4/w/787/7878699250_1_1_1.jpg?ts=1595948232292',price: 170.99, ID: uid()},
    {name: 'https://static.zara.net/photos///2020/I/0/1/p/7736/878/800/2/w/787/7736878800_1_1_1.jpg?ts=1595948232506',price: 200.00, ID: uid()},
    {name: 'https://static.zara.net/photos///2020/I/0/1/p/4437/251/420/2/w/787/4437251420_1_1_1.jpg?ts=1596197301080',price: 350.00, ID: uid()},
    {name: 'https://static.zara.net/photos///2020/I/0/1/p/9479/247/250/2/w/787/9479247250_1_1_1.jpg?ts=1596181899599',price: 160.99, ID: uid()}
   
  ];


  function uid() {

    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
app.get('/getmenu', function (req,res) {
    res.send(menu);
  });

  app.put('/updateprice', (req, res, next) => {
    const {id , val} = req.body;
    menu.forEach(element => {
        if(element.ID==id){
            element.price=val;
        }
    });

    res.send('Got a PUT request at user')
})

app.post('/api/addClothe', (request, response) => {
  //request com from the client
  const {  url , price } = request.body;
  console.log(url )
  //check if name is in names
  let wordExist=false;
  for (let i=0 ; i<menu.length ; i++){ 
      if(menu[i].name===url && menu[i].price===price){
          wordExist=true
      }

  }
  if(wordExist==true){
   response.send({wordExist})}
  else{
    menu.push({name:url , price:price, ID:uid()})
      response.send({wordExist})
  }
 
  //send response to client
  
})

app.put('/api/deleteTheClothe', (request, response) => {
  //request com from the client
  const { ItemId } = request.body;
  const index=menu.findIndex(item =>item.ID===ItemId);
  console.log(index);
  if(index!=-1){
  menu.splice(index,1)}
  response.send('Got a PUT request at user')
})



  
app.listen(3001, () => { console.log("App is Listening to 3000")})