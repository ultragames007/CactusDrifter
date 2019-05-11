let bubbles = [];
let maxbubbles = 1;
let cararray = [];
let roadarray = [];
let roaddriftarray = [];
let imagenactual;
let posicionx = [85,210];
let player1;
let currentbkg= 1;
let choco=false;
let carspeed=7;
let font;
let mySong, loosesound;
let showhitbox=false; // Shows the car hitboxes for debbuging
let sonido=true; // Turns on sound.
let PlaywithMouse=false; // Prender apagar el mouse.
let faseruta=1;


function preload() {
    font = loadFont("font/ARCADECLASSIC.TTF"); //Cargo la font del Score
  soundFormats('mp3', 'ogg');
  mySong = loadSound("music/RunningInThe90s.mp3");
  loosesound =  loadSound("music/loose.mp3"); 
  for (let i = 0; i < 4; i++) {
    cararray[i] = loadImage("images/car" + (i+1) + ".png");
  }
  for (let i = 0; i < 6; i++){
    roadarray[i] = loadImage("images/roadl" + (i+1) + ".png");
  } 
  for (let i = 0; i < 6; i++){
    roaddriftarray[i] = loadImage("images/drift" + (i+1) + ".png");
  }
 }


function setup() {
  createCanvas(400, 800);
  for (let i = 0; i < maxbubbles; i++) {
      let x = random(posicionx);
      let y=  -100;
      let imagenactual = random(cararray);
    bubbles[i] = new Bubble(x,y,imagenactual);
    //print(bubbles.x, bubbles.y); //imprime la posicion de la burbuja
  }
  player1 = new Player(posicionx[0],canvas.height-170,cararray[0]);
  mySong.setVolume(0.1);
  if(sonido==true){
  mySong.play();
  }
}



function draw() {
    if (choco==false){
  //background(0);
  drawbck();
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
   // bubbles[i].outofscreen();
    bubbles[i].crashdetection();  
  }
 player1.show();
 player1.move();
 scoreDisplay();        
carspawning();
speedincrease();
//faseswapper(); //Apagado xq no se como girar imagenes :c    
powerUp();      
}
 loosingmsg();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Bubble { //Cuando creas la clase no se usan los ()
  constructor(tx,ty,timage) {
    this.x = tx;  //Cuando nos referimos a variables dentro de una clase hay que usar siempre "this.vaiable"
    this.y = ty; 
    this.width = 108;
    this.height = 154;  
    this.imageofcar = timage;
   
  }
    
  outofscreen() {
          if(this.y>canvas.height)
              {
                  this.y = -100;
              }
        }
          
  move() {
    this.y = this.y + carspeed; ////////////////////
  }

  show() {
      imagenactual=this.imageofcar;
      if(showhitbox==true){
        noFill();
        stroke(255, 204, 0);
        strokeWeight(4);
        rect(this.x,this.y,this.width,this.height);}
   image(this.imageofcar, this.x, this.y);

  }

   crashdetection(){
    if(
        ((player1.y + player1.height) < (this.y)) ||
        (player1.y > (this.y + this.height)) ||
        ((player1.x + player1.width) < this.x) ||
        (player1.x > (this.x + this.width))
    ) return true;
        
    if (true){
    print("Choque detectado");
     choco=true;
    } else{
        choco =false;
    }
}
    
}
 /////////////////////////////////////////////////////
class Player {
    constructor(px,py,pimage){
        this.x = px;
        this.y = py;
        this.imageofplayer = pimage;
    }
    move() {
        if(PlaywithMouse==true)  // HABILITAR ESTA LINEA PARA JUGAR CON EL MOUSE.
        {
          this.x = mouseX-50;  
        }               
        this.y = canvas.height-170;
        this.width = 108;   
        this.height = 154;
        if(this.x>200)
           {
                this.x =posicionx[1];
            } else{
               this.x =posicionx[0];
           }
    }
    
    show() {
        this.imageofplayer = cararray[0];
        if(showhitbox==true){rect(this.x,this.y,this.width,this.height);}
        image(this.imageofplayer, this.x, this.y);
        

    }
    
 }
