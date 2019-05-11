let diceRoll;
let espacioentrecochesotherlane= 300;
let espacioentrecochessamelane= 174;
let carholder;
let caso2timer=0;
let caso3timer=0;
let score=0;
let truescore=000;
let loosesongtimer=0;
let TimeSlower=0;
let savedSpeed,tracker1,PowerUpon=false;
let duracionPowerUp=115; //37,5 x seg mas o menos.


function drawbck(){
    if(faseruta==1){
    image(roadarray[currentbkg],0,0);
    currentbkg++;
    if(currentbkg>5){
        currentbkg=1;
    }
}
   if(faseruta==2){
    image(roaddriftarray[currentbkg],0,0); 
    currentbkg++;
    if(currentbkg>5){
        currentbkg=1;   
   }
}
}

function loosingmsg() {
    //console.log(choco);
 if(choco==true){
     textSize(64);
     fill(0,255,255);
     text('You Loose', canvas.width/8, canvas.height/2);
     mySong.stop();
     loosesound.setVolume(0.1);
     if (loosesongtimer==0 && sonido==true){
     loosesound.play();
     loosesongtimer++;
 }
 }
} 

function carspawning() {
    rolldado(3); // Tira un dado para ver q tipo de situacion va a spawner 1= Other lane 2= Same lane 3= Nada, 2 y 3 estan limitadas, para q 1 sea mas comun.
    if (bubbles[bubbles.length-1].y > espacioentrecochesotherlane && diceRoll==1)  // Timer para detectar si hay espacio para otro spawn.
        {
        // print("Se puede spawnear coche");    // DEBUG
        // print(bubbles[bubbles.length-1].y);  // DEBUG
       if(bubbles[bubbles.length-1].x == posicionx[0]){ x= posicionx[1];}
       if(bubbles[bubbles.length-1].x == posicionx[1]){ x= posicionx[0];}
       let y=  -100;
       let imagenactual = random(cararray);
       carholder = new Bubble(x,y,imagenactual);
       bubbles.push(carholder);
       print("S: Diffe Lane");
        caso2timer=0; // Reseteo q habilita de nuevo las otras tiradas. 
        caso3timer=0;    
       }
    if(bubbles[bubbles.length-1].y > espacioentrecochessamelane && diceRoll==2 && caso2timer<2){  // CASO 2
      //  print("S: Same lane");
       let x = bubbles[bubbles.length-1].x;
       let y=  -100;
       let imagenactual = random(cararray);
       carholder = new Bubble(x,y,imagenactual);
       bubbles.push(carholder);
       caso2timer++;
    }
    if(diceRoll==3 && caso3timer<1000){  // CASO 3
     //   print("S: Nada");  // Agregar timer aca?
        caso3timer++;
    }
}

function rolldado(caras){
	diceRoll = floor(random(1,caras+1));
	//	printf("%d ,",diceRoll);

}

function scoreDisplay(){
    textFont(font);
    textSize(64);
    //fill(226, 122, 185);
    fill(random(0,50),random(200,255),random(0,255));
    stroke(255, 204, 0);
    strokeWeight(4);
    text(truescore,250,100);
    score++;
    if(score%50==0){   // El valor ese cambia q tan rapido sube el score , mientras mas grande mas lento sube.
        truescore++;
    }
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
          if(player1.x ==posicionx[0])
       {
         player1.x = posicionx[1];
          // print("Ding");
       }
   }
        if (keyCode == LEFT_ARROW) {
           if(player1.x==posicionx[1]){
               player1.x = posicionx[0];
            //   print("Dong");
           }
      }
    if (keyCode == 32) {  // This is the power up code 32 is Space.
        //print("SpaceBar Pressed");
            if(TimeSlower>=1){  
                //TimeSlower++;
                savedSpeed=carspeed;
                carspeed=3;
                TimeSlower--;
                tracker1=score;
                PowerUpon=true;
                print("debug carspeed:");
                print(carspeed);
                //print("Set Interval se activo");
            }
     }
 }  
   

function speedincrease() {
    //print(PowerUpon);
    if(PowerUpon==false){
    let temporal = Math.pow(truescore,2);
    carspeed= savedSpeed;  
    carspeed = (0.002*temporal)+3;
}else {
    //print((tracker1+duracionPowerUp));  ///Debug Stuff
    //print(score);                       //Debug Stuff
    if((tracker1+duracionPowerUp)<=score)
    {
        carspeed=savedSpeed;
        PowerUpon=false;
    }
}
   
   
    console.log(carspeed);
    textSize(32);
    fill(0,255,0);
    stroke("red");
    text("speed",250,150);
    fill(255,0,255);
    stroke(255, 204, 0);
    text(Math.floor(carspeed),350,150);
    
}

function faseswapper(){ //Does the fase swapping stuff like, deletting the arrays, regenerating the player etc
if(truescore==15){
    faseruta=2;
    }
if(truescore==25){  // Para que vuelva
    faseruta=1;
    }
}

function powerUp(){ //Un poder q cambia la velocidad x un corto periodo de tiempo para hacer mas facil pasar.
if(score%1000==0){
    TimeSlower++;
}
fill(0,255,0);
stroke("red");
text("P",250,50);
fill(255,0,255);
stroke(255, 204, 0);
text(TimeSlower,300,50);
}
