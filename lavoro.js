var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);  // Aggiorna la scena ogni 20 ms (50 fps)
    },
    draw: function(component) {
        this.context.drawImage(component.image, component.x, component.y, component.width, component.height);
    },

    clearCanva: function()
    {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);  // Pulisce la scena
    }
  };
  
  var animatedObject = {
    speedX: 0,
    speedY: 0,
    width: 60,
    height: 60,
    x: 10,
    y: 120,
    imageList: [],
    contaFrame: 0,
    actualFrame: 0,
  
    loadImages: function() {
        for (imgPath of running) {
            var img = new Image(this.width, this.height);
            img.src = imgPath;
            this.imageList.push(img);
        }
        this.image = this.imageList[this.actualFrame];
    },
   
    crashWith: function(otherobj) {
        var myleft = this.tryX;
        var myright = this.tryX + this.width;
        var mytop = this.tryY;
        var mybottom = this.tryY + this.height;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + otherobj.width;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + otherobj.height;
        var crash = true;
    
        //NON HO COLLISIONI SE: Un oggetto è sopra oppure sotto oppure a destra oppure a sinistra dell’altro
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
          this.x = this.tryX; //Se non ho collisioni sposto realmente l’oggetto
          this.y = this.tryY;
        }
        else //HO COLLISIONI MA PER ORA NON FACCIO NIENTE
        {
        }
      },
  
    update: function() {
        this.tryY = this.y + this.speedY;
        this.tryX = this.x + this.speedX;
    
        //Prima di spostarmi realmente verifico che non ci siano collisioni
        this.crashWith(bushObject);
        
        this.contaFrame++;
  
        if (this.contaFrame == 5) {
            this.contaFrame = 0;
            this.actualFrame = (1 + this.actualFrame) % this.imageList.length;
            this.image = this.imageList[this.actualFrame];
        }
    }
    
  };

  function moveup() {
    animatedObject.speedY = -3; 
  }
  function movedown() {
    animatedObject.speedY = 3;  
  }
  
  function moveleft() {
    animatedObject.speedX = -3;  
  }
  
  function moveright() {
    animatedObject.speedX = 3; 
  }
  
  function clearmove() {
    animatedObject.speedX = 0; 
    animatedObject.speedY = 0;  
  }
  
  function updateGameArea() {
    myGameArea.clearCanva();
    animatedObject.update(); 
    myGameArea.draw(animatedObject);  
    //disegna cespuglio
    myGameArea.draw(bushObject);
  }

  
  function startGame() {
    myGameArea.start(); 
    animatedObject.loadImages(); 
    //caricare immagine cespuglio 
    bushObject.loadImages();
  }
  

     
  