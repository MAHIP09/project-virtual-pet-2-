var dog, dogImage,dogImage1
var foodS,foodStock,feed,addFood,foodObj,fedTime,lastFed 
function preload(){
  dogImage=loadImage("images/dogImg.png")
  dogImage1=loadImage("images/dogImg1.png")
}

function setup() {
   database=firebase.database()
   
  createCanvas(1000, 400);

  foodObj=new Food()

  dog=createSprite(800,200,150,150)
  dog.addImage(dogImage)
  dog.scale=0.15
  foodStock=database.ref('Food')
  foodStock.on("value",readStock);
  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("add food") 
  addFood.position(800,95)
  addFood.mousePressed(addFoods)


}


function draw() {  
  background("blue");
  foodObj.display()
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
   textSize(15)

   if(lastFed>=12){
    text("last feed:"+lastFed%12+"PM",350,30)
   } else if(lastFed===0){
    text("last feed:+12 AM",350,30)
   } else {
    text("last feed:"+lastFed+"AM",350,30)
   }

  drawSprites();
  

}
function readStock(data){
  foodS=data.val()
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
   dog.addImage(dogImage)
   foodObj.updateFoodStock(foodObj.getFoodStock()-1)
   database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
   })
}
 function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })


 }

