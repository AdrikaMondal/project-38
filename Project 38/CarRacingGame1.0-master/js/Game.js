class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1=createSprite(200,200);
    car1.addImage(car1Img);

    car2=createSprite(400,200);
    car2.addImage(car2Img);

    car3=createSprite(600,200);
    car3.addImage(car3Img);

    car4=createSprite(800,200);
    car4.addImage(car4Img);

    car=[car1,car2,car3,car4];
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(groundImg);
      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5)
      var index=0, x=200, y;
      //var display_position = 130;
      for(var plr in allPlayers){
        x = x+250, y = displayHeight - allPlayers[plr].distance
        index = index + 1
        car[index - 1].x = x
        car[index - 1].y = y
        if (index === player.index){
car[index - 1].shapeColor = "red"
camera.position.y = car[index-1].y
camera.position.x = displayWidth/2

rectMode(CENTER);
fill("white");
rect(x,y,60,90);

        //display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position) 
        }
    }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance > 3000){
      gameState = 2
      player.rank = player.rank + 1
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();

  }
  end(){
    console.log(player.rank);
  }
}