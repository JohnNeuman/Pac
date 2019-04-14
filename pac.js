class Pac {
    constructor(x,y,direction,color,state,r) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.color = color;
        this.state = state;
	    this.r = r;
    }
}

class Ghost {
    constructor(x,y,direction,color,r) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.prev_direction = direction;
        this.color = color;
        this.r = r;
    }
}
    
var ctx = document.getElementById("ctx").getContext("2d");
	ctx.canvas.width = window.innerWidth - 15;
	ctx.canvas.height = window.innerHeight - 20;
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.rect(0,0,window.innerWidth,window.innerHeight);
	ctx.fill();

        let x, y, count = 0, range = 0;
        let coord;
        var state = "open";
	var step; 
        var micro_step;
        let curr_direction = "up";
        let obj;
	let r, a;
	let pac;
    let red_Ghost;
	if (ctx.canvas.width > ctx.canvas.height) {
          r = ctx.canvas.width / 60;
	      a = 1.2*r;
	      y = ctx.canvas.height - 1.2*a;
	      x = ctx.canvas.width / 2;
	      step = ctx.canvas.width * 0.006;	
	} else {
	      r = ctx.canvas.height / 60;
	      a = 1.2*r;
	      y = ctx.canvas.height - 1.2*a;
	      x = ctx.canvas.width / 2;
	      step = ctx.canvas.height * 0.006;
	}
    pac = new Pac(x,y,"up","yellow","open",r);
    red_Ghost = new Ghost(24*a,9*a,"left","red",r);
    blue_Ghost = new Ghost(27*a,9*a,"right","blue",r);
    brown_Ghost = new Ghost(24*a,12*a,"left","Sienna",r);
    violet_Ghost = new Ghost(27*a,12*a,"right","DarkOrchid",r);
    
        let map = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
                   [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,0,0],
                   [0,0,1,2,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,2,0,1,0,0],
                   [0,0,1,2,0,1,1,1,1,1,1,2,0,1,1,1,1,2,0,1,1,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,1,2,0,1,1,2,0,1,0,0],
                   [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,2,2,2,2,2,2,2,0,1,2,2,2,2,2,0,1,0,0],
                   [0,0,1,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,1,2,0,0,0,0,2,0,0,1,2,0,0,0,2,0,1,0,0],
                   [0,0,1,2,0,1,1,1,1,1,1,1,1,1,2,0,1,2,0,1,2,0,1,1,1,1,1,1,1,2,0,1,2,0,1,1,1,2,0,1,1,2,0,1,1,2,0,1,0,0],
                   [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,0,1,2,0,1,2,0,0,0,0,1,0,0,0,2,2,2,2,2,2,0,1,2,2,2,2,2,2,0,1,2,0,1,0,0],
                   [0,0,1,2,0,0,0,0,2,0,0,2,0,0,2,0,1,2,0,1,2,0,0,0,0,1,0,0,0,2,0,0,0,0,2,0,1,2,0,0,0,0,2,2,2,2,0,1,0,0],
                   [0,0,1,2,0,1,1,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,1,1,1,1,1,1,2,0,1,1,1,2,0,1,2,0,1,1,1,2,0,0,2,0,1,0,0],
                   [0,0,1,2,2,2,2,2,2,0,1,2,0,1,2,0,1,2,0,1,2,0,0,0,0,1,0,0,0,2,0,1,2,2,2,0,1,2,2,2,2,2,2,0,1,2,0,1,0,0],
		           [0,0,1,2,0,0,0,0,2,0,1,2,0,1,2,0,1,2,0,1,2,0,0,0,0,1,0,0,0,2,2,2,2,0,0,0,1,2,0,0,0,0,2,2,2,2,0,1,0,0],
                   [0,0,1,2,0,1,1,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,1,1,1,1,1,1,2,0,0,2,0,1,1,1,2,0,1,1,1,2,0,0,2,0,1,0,0],
                   [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,2,2,2,2,2,2,2,2,2,2,0,1,2,2,2,2,2,2,0,1,2,2,2,0,1,2,0,1,0,0],
                   [0,0,1,2,0,0,0,0,0,2,0,0,0,0,2,0,0,2,0,1,0,0,0,0,2,0,0,0,0,0,0,1,2,0,0,0,0,2,0,1,2,0,0,0,1,2,0,1,0,0],
                   [0,0,1,2,0,1,1,1,1,2,0,1,1,1,2,0,1,2,0,1,1,1,1,1,2,0,1,1,1,1,1,1,2,0,1,1,1,2,0,1,2,0,1,1,1,2,0,1,0,0],
                   [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,2,2,2,2,2,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,0,0],
                   [0,0,1,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,2,0,1,0,0,0,0,2,0,1,2,0,0,2,0,0,0,0,0,0,2,0,0,0,2,0,1,0,0],
		           [0,0,1,2,0,1,1,1,1,2,0,1,1,1,2,0,1,1,1,1,1,2,0,1,1,1,1,1,2,0,1,2,0,1,2,0,1,1,1,1,1,2,0,1,1,2,0,1,0,0],
                   [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,2,2,2,2,2,2,2,2,2,2,2,2,0,1,0,0],
                   [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
                   [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
	
	
	function get_block_coord(i,j,a) {
	    return {x1: j*a, y1: i*a,x2: j*a+a, y2: i*a+a};

	}	
    
    function check_ghost_pos(ghost,a) {
        let coord,x,y;
        for(let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[0].length; j++) {
                if (map[i][j] == 1) {
                    coord = get_block_coord(i,j,a);
                    
                    //point 11
                    
                    //block in ghost
                    if ((coord.x1 >= (ghost.x - ghost.r))&&(coord.x1 <= (ghost.x + ghost.r))&&(coord.y1 >= (ghost.y - ghost.r))&&(coord.y1 <= (ghost.y + ghost.r))) {
                        return true;
                    }
                    //ghost in block
                    if (((ghost.x - ghost.r) >= coord.x1)&&((ghost.x - ghost.r) <= coord.x2)&&((ghost.y - ghost.r) >= coord.y1)&&((ghost.y - ghost.r) <= coord.y2)) {
                        return true;
                    }
                    
                    //point 12
                    //block in ghost
                    if ((coord.x2 >= (ghost.x - ghost.r))&&(coord.x2 <= (ghost.x + ghost.r))&&(coord.y1 >= (ghost.y - ghost.r))&&(coord.y1 <= (ghost.y + ghost.r))) {
                        return true;
                    }
                    //ghost in block
                    if (((ghost.x + ghost.r) >= coord.x1)&&((ghost.x + ghost.r) <= coord.x2)&&((ghost.y - ghost.r) >= coord.y1)&&((ghost.y - ghost.r) <= coord.y2)) {
                        return true;
                    }
                    
                    //point 21
                    //ghost in block
                    if (((ghost.x - ghost.r) >= coord.x1)&&((ghost.x - ghost.r) <= coord.x2)&&((ghost.y + ghost.r) >= coord.y1)&&((ghost.y + ghost.r) <= coord.y2)) {
                        return true;
                    }
                    //block in ghost
                    if ((coord.x1 >= (ghost.x - ghost.r))&&(coord.x1 <= (ghost.x + ghost.r))&&(coord.y2 >= (ghost.y - ghost.r))&&(coord.y2 <= (ghost.y + ghost.r))) {
                        return true;
                    }
                    
                    //point 22
                    //ghost in block
                    if (((ghost.x + ghost.r) >= coord.x1)&&((ghost.x + ghost.r) <= coord.x2)&&((ghost.y + ghost.r) >= coord.y1)&&((ghost.y + ghost.r) <= coord.y2)) {
                        return true;
                    }
                    //block in ghost
                    if ((coord.x2 >= (ghost.x - ghost.r))&&(coord.x2 <= (ghost.x + ghost.r))&&(coord.y2 >= (ghost.y - ghost.r))&&(coord.y2 <= (ghost.y + ghost.r))) {
                        return true;
                    }


                    if (ghost.y < 2*a + ghost.r) {
		    	         return true;
		            }
                    
                    if (ghost.y > 21*a + ghost.r) {
                        return true;
                    }
                    
                } else if (map[i][j] == 2) {
                    /*
                    coord = get_block_coord(i,j,a);
                    x = coord.x1 + a;
                    y = coord.y1 + a;
                    if (Math.sqrt(Math.pow(ghost.x - x,2) + Math.pow(ghost.y - y,2)) <= 2*r) {
                        draw_circle(a*j,a*i,"IndianRed",r);
                    }
                    */
                }
            }
        }
    }

	function check_pac_pos(x,y,r,a) {
	    let coord;
	    let x1,x2,y1,y2,x3,y3;
	    for(let i = 0; i < map.length; i++) {
	    	for(let j = 0; j < map[0].length; j++) {
              if (map[i][j] == 1) {
		          coord = get_block_coord(i,j,a);		
		if ((((x + r) >= coord.x1) && ((x - r) <= coord.x1))&&((y + r >= coord.y1)&&(y - r <= coord.y2))) {
		    y1 = (2*y + Math.sqrt(4*Math.pow(y,2) - 4*(Math.pow(coord.x1 - x,2) - Math.pow(r,2) + Math.pow(y,2))))/2;
		    y2 = (2*y - Math.sqrt(4*Math.pow(y,2) - 4*(Math.pow(coord.x1 - x,2) - Math.pow(r,2) + Math.pow(y,2))))/2;
	            if ((y1 >= coord.y1)&&(y1 <= coord.y2)) {
                //try to find nearer block 
		        return {bool: true, row: i, col: j};
		    }
		    if ((y2 >= coord.y1)&&(y2 <= coord.y2)) {
                //try to find nearer block
		        return {bool: true, row: i, col: j};
		    }
		}
	
		if ((((y + r) >= coord.y1) && ((y - r) <= coord.y1))&&((x + r >= coord.x1)&&(x - r <= coord.x2))) {
		    x1 = (2*x + Math.sqrt(4*Math.pow(x,2) - 4*(Math.pow(coord.y1 - y,2) - Math.pow(r,2) + Math.pow(x,2))))/2;
		    x2 = (2*x - Math.sqrt(4*Math.pow(x,2) - 4*(Math.pow(coord.y1 - y,2) - Math.pow(r,2) + Math.pow(x,2))))/2;
		    if ((x1 >= coord.x1)&&(x1 <= coord.x2)) {
                //try to find nearer block
		        return {bool: true, row: i, col: j};
		    }
		    if ((x2 >= coord.x1)&&(x2 <= coord.x2)) {
                //try to find nearer block
		        return {bool: true, row: i, col: j};
		    }
		}
		
		if ((((x + r) >= coord.x2) && ((x - r) <= coord.x2))&&((y + r >= coord.y1)&&(y - r <= coord.y2))) {	
		    y1 = (2*y + Math.sqrt(4*Math.pow(y,2) - 4*(Math.pow(coord.x2 - x,2) - Math.pow(r,2) + Math.pow(y,2))))/2;
		    y2 = (2*y - Math.sqrt(4*Math.pow(y,2) - 4*(Math.pow(coord.x2 - x,2) - Math.pow(r,2) + Math.pow(y,2))))/2;
		    if ((y1 >= coord.y1)&&(y1 <= coord.y2)) {
                //try to find nearer block
		        return {bool: true, row: i, col: j};
		    }
		    if ((y2 >= coord.y1)&&(y2 <= coord.y2)) {
                //try to find nearer block
		        return {bool: true, row: i, col: j};
		    }
		}
		
		if ((((y + r) >= coord.y2) && ((y - r) <= coord.y2))&&((x + r >= coord.x1)&&(x - r <= coord.x2))) {
		    x1 = (2*x + Math.sqrt(4*Math.pow(x,2) - 4*(Math.pow(coord.y2 - y,2) - Math.pow(r,2) + Math.pow(x,2))))/2;
		    x2 = (2*x - Math.sqrt(4*Math.pow(x,2) - 4*(Math.pow(coord.y2 - y,2) - Math.pow(r,2) + Math.pow(x,2))))/2;
		    if ((x1 >= coord.x1)&&(x1 <= coord.x2)) {
                //try to find nearer block
		        return {bool: true, row: i, col: j};
		    }
		    if ((x2 >= coord.x1)&&(x2 <= coord.x2)) {
                //try to find nearer block
		        return {bool: true, row: i, col: j};
		    }
		}

        } else if (map[i][j] == 2) {
            
            coord = get_block_coord(i,j,a);
            x3 = coord.x1 + a;
            y3 = coord.y1 + a;
            
            if (Math.sqrt(Math.pow(x3 - x,2) + Math.pow(y3 - y,2)) <= 3*r/2) {
                map[i][j] = 0;
                draw_circle(coord.x1, coord.y1,"black",r);
                //return {bool: true, row: i, col: j};
            } 
            
        }
	    }
	  }
        return {bool: false, row: -1, col: -1};
	}   

    
	function clear_arc(x,y) {
            ctx.arc(x,y,r,0, 2*Math.PI);
            ctx.strokeStyle = "black";
            ctx.fillStyle = "black";
            ctx.stroke();
            ctx.fill();
        }
        
        function draw_smth() {
            for(let i = 0; i < map.length; i++) {
                for(let j = 0; j < map[i].length; j++) {
                    if (map[i][j] == 2) {
                        draw_circle(a*j,a*i,"IndianRed",r);
                    }
                }
            }
        }

        function draw_map(first_time) {
           ctx.canvas.width = window.innerWidth - 15;
	       ctx.canvas.height = window.innerHeight - 20;
	       ctx.beginPath();
          // if (first_time) {
	           ctx.fillStyle = "black";
	           ctx.rect(0,0,window.innerWidth,window.innerHeight);
	           ctx.fill();
          // }
            for(let i = 0; i < map.length; i++) {
                for(let j = 0; j < map[i].length; j++) {
                    if (map[i][j] == 1) {
                        draw_block(a*j,a*i, "green");
                    } else if (map[i][j] == 2) {
                        draw_circle(a*j,a*i,"IndianRed",r);
                    }
                }
            }
            //draw_pac(pac); 
        }
        function draw_block(x,y,color) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            x += 0;
            y += 0;
            ctx.rect(x, y, a, a);
            ctx.stroke();
            ctx.fill();
        }  
        function draw_circle(x,y,color,r) {
            ctx.beginPath();
            ctx.fillStyle = color;
            if (color == "black") {
                ctx.arc(x + a,y + a,r/2 + 1,0,2*Math.PI);
            } else {
                ctx.arc(x + a,y + a,r/2,0,2*Math.PI);
            }
            ctx.fill();
        }
        function draw_pac(pac,color,state) {
            let region = new Path2D();
            let add = 1;
           // if (color != "black") {
                ctx.beginPath();
            //}
	        ctx.strokeStyle = color || pac.color;
            ctx.strokeWidth = 10;
            ctx.lineWidth = 10;
            ctx.fillStyle = color || pac.color;
            if (((pac.state == "open")||(state == "open"))&&(state != "close")) {
                if (pac.direction == "right") { 
                    //ctx.beginPath();
                        
                    if (color != "black") {
                        region.arc(pac.x,pac.y,pac.r,Math.PI/5, 9*Math.PI/5);
                        region.lineTo(pac.x,pac.y);
                        region.lineTo(pac.x + Math.cos(Math.PI/5)*pac.r,pac.y + Math.cos(3*Math.PI/10)*pac.r);
                    } else {
                        region.arc(pac.x,pac.y,pac.r + add,Math.PI/5, 9*Math.PI/5);
                        region.lineTo(pac.x,pac.y);
                        region.lineTo(pac.x + Math.cos(Math.PI/5)*(pac.r + add),pac.y + Math.cos(3*Math.PI/10)*(pac.r + add));
                    }
                        region.closePath();
                       // ctx.closePath();
                        //ctx.stroke();
                    //ctx.beginPath();
                        ctx.fill(region,'evenodd');
                        //ctx.stroke(region);
                        if (color != "black") {
                            pac.state = "close";
                        }
                    
                } else if (pac.direction == "up") {
                    //ctx.beginPath();
                        if (color != "black") {
                            region.arc(pac.x,pac.y,pac.r,-3*Math.PI/10,13*Math.PI/10);
                            region.lineTo(pac.x,pac.y);
                            region.lineTo(pac.x+Math.cos(3*Math.PI/10)*pac.r,pac.y - Math.cos(Math.PI/5)*pac.r);
                            region.closePath();
                        } else {
                            region.arc(pac.x,pac.y,pac.r+add,-3*Math.PI/10,13*Math.PI/10);
                            region.lineTo(pac.x,pac.y);
                            region.lineTo(pac.x+Math.cos(3*Math.PI/10)*(pac.r + add),pac.y - Math.cos(Math.PI/5)*(pac.r + add));
                            region.closePath();
                        }
                        
                    //ctx.beginPath();
                        //ctx.closePath();
                        /*
                        if (color == "black") {
                            ctx.lineWidth = 15;
                            ctx.stroke(region);
                        }
                        */
                        ctx.fill(region,'evenodd');
                        //ctx.stroke(region);
                        if (color != "black") {
                            pac.state = "close";
                        } 
                    
                } else if (pac.direction == "left") {
                   // ctx.beginPath();
                        if (color != "black") {
                            region.arc(pac.x,pac.y,pac.r,6*Math.PI/5, 4*Math.PI/5);
                            region.lineTo(pac.x,pac.y);
                            region.lineTo(pac.x - Math.cos(Math.PI/5)*pac.r, pac.y - Math.cos(3*Math.PI/10)*pac.r);
                        } else {
                            region.arc(pac.x,pac.y,pac.r + add,6*Math.PI/5, 4*Math.PI/5);
                            region.lineTo(pac.x,pac.y);
                            region.lineTo(pac.x - Math.cos(Math.PI/5)*(pac.r + add), pac.y - Math.cos(3*Math.PI/10)*(pac.r + add));
                        }
                        region.closePath();
                        //ctx.stroke();
                   // ctx.beginPath();
                        //ctx.closePath();
                        ctx.fill(region,'evenodd');
                        //ctx.stroke(region);
                        if (color != "black") {
                            pac.state = "close";
                        }
                } else if (pac.direction == "down") {
                   // ctx.beginPath();
                        if (color != "black") {
                            region.arc(pac.x,pac.y,pac.r,7*Math.PI/10, 3*Math.PI/10);
                            region.lineTo(pac.x,pac.y);
                            region.lineTo(pac.x - Math.cos(3*Math.PI/10)*pac.r,pac.y + Math.cos(Math.PI/5)*pac.r);
                        } else {
                            region.arc(pac.x,pac.y,pac.r + add,7*Math.PI/10, 3*Math.PI/10);
                            region.lineTo(pac.x,pac.y);
                            region.lineTo(pac.x - Math.cos(3*Math.PI/10)*(pac.r + add),pac.y + Math.cos(Math.PI/5)*(pac.r + add));
                        }
                        region.closePath();    
                        //ctx.stroke();
                       // ctx.closePath();
                        ctx.fill(region,'evenodd');
                        //ctx.stroke(region);
                        if (color != "black") {
                            pac.state = "close";
                        }
                }
                
            } else {
                //ctx.beginPath();
                    if (color != "black") {
                        region.arc(pac.x,pac.y,pac.r,0, 2*Math.PI);
                    } else {
                        region.arc(pac.x,pac.y,pac.r + add,0, 2*Math.PI);
                    }
                    region.closePath();
                    //ctx.closePath();
                    ctx.fill(region,'evenodd');
                    //ctx.stroke(region);
                    if (color != "black") {
                        pac.state = "open";
                    }
                    count = 0;   
            } 
            
	    return pac;       
        }
//ctx.canvas.width/2,r + 10
        function draw_ghost(red_Ghost, color) {
            let add = 1;
            ctx.beginPath();
            
            if (color === undefined) {
                ctx.fillStyle = red_Ghost.color;
            } else {
                ctx.fillStyle = "black";
                ctx.rect(red_Ghost.x - red_Ghost.r - add,red_Ghost.y - red_Ghost.r - add,2*red_Ghost.r + 2*add,2*red_Ghost.r + 2*add);
                ctx.fill();
                return;
            }
            
            ctx.arc(red_Ghost.x,red_Ghost.y,red_Ghost.r,0,Math.PI,true);
            
            ctx.rect(red_Ghost.x - red_Ghost.r,red_Ghost.y,2*red_Ghost.r,red_Ghost.r/2);
            
            ctx.fill();
            
            
            ctx.moveTo(red_Ghost.x - red_Ghost.r, red_Ghost.y + red_Ghost.r/2);
            ctx.lineTo(red_Ghost.x - red_Ghost.r + red_Ghost.r/4, red_Ghost.y + red_Ghost.r);
            ctx.lineTo(red_Ghost.x - red_Ghost.r + red_Ghost.r/2, red_Ghost.y + red_Ghost.r/2);
            ctx.lineTo(red_Ghost.x - red_Ghost.r + 3*red_Ghost.r/4, red_Ghost.y + red_Ghost.r);
            ctx.lineTo(red_Ghost.x - red_Ghost.r + red_Ghost.r, red_Ghost.y + red_Ghost.r/2);
            ctx.lineTo(red_Ghost.x - red_Ghost.r + 5*red_Ghost.r/4,red_Ghost.y + red_Ghost.r);
            ctx.lineTo(red_Ghost.x - red_Ghost.r + 3*red_Ghost.r/2, red_Ghost.y + red_Ghost.r/2);
            ctx.lineTo(red_Ghost.x - red_Ghost.r + 7*red_Ghost.r/4, red_Ghost.y + red_Ghost.r);
            ctx.lineTo(red_Ghost.x - red_Ghost.r + 2*red_Ghost.r, red_Ghost.y + red_Ghost.r/2);
            
            ctx.fill();
            
            
            
            ctx.beginPath();
            if (color === undefined) {
                ctx.fillStyle = "white";
            }
            ctx.arc(red_Ghost.x - 2*red_Ghost.r/5, red_Ghost.y, red_Ghost.r/5, 0, 2*Math.PI);
            ctx.arc(red_Ghost.x + 2*red_Ghost.r/5,red_Ghost.y,red_Ghost.r/5,0,2*Math.PI);
            ctx.fill();
        
            
            ctx.beginPath();
            if (color === undefined) {
                ctx.fillStyle = "black";
            }
            ctx.arc(red_Ghost.x - 2*red_Ghost.r/5,red_Ghost.y,red_Ghost.r/10,0,2*Math.PI);
            ctx.arc(red_Ghost.x + 2*red_Ghost.r/5,red_Ghost.y,red_Ghost.r/10,0,2*Math.PI);
            ctx.fill();
            
            
        }
        
        function clear_ghost(ghost) {
            ctx.clearRect(ghost.x - ghost.r,ghost.y - ghost.r, 2*ghost.r, 2*ghost.r);
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect(ghost.x - ghost.r,ghost.y - ghost.r,2*ghost.r, 2*ghost.r);
            ctx.fill();
        }
        
        function get_opposite_direct(direct) {
            switch (direct) {
                case "up": return "down";
                case "down": return "up";
                case "left": return "right";
                case "right": return "left";
            } 
        }

        function get_direct(ghost,deadend) {
            let d;
            if (ghost.direction == "down") {
                if (deadend) {
                    if (ghost.direction == ghost.prev_direction) {
                        d = Math.random();                     
                        if (d < 0.5) {
                            return "left";
                        } else {
                            draw_ghost(ghost,"black");
                            return "right";
                        }
                    } else {
                        return get_opposite_direct(ghost.prev_direction);
                    }
                } else {
                    d = Math.random();
                    if (d > 0.8) {
                        return "down";
                    } else if (d > 0.5) {
                       
                        ghost.x += step;    
                        if (!check_ghost_pos(ghost,a)) {
                            ghost.x -= step;
                            return "right";
                        } else {
                            ghost.x -= step;
                            return "down";
                        }
                    } else {
                        ghost.x -= step;
                        if (!check_ghost_pos(ghost,a)) {
                            ghost.x += step;
                            return "left";
                        } else {
                            ghost.x += step;
                            return "down";
                        }
                    }
                    
                }
            } else if (ghost.direction == "left") {
                if (deadend) {
                    if (ghost.direction == ghost.prev_direction) {
                        d = Math.random();
                       
                        if (d < 0.5) {
                            return "down";
                        } else {
                            return "up";
                        }
                    } else {
                        return get_opposite_direct(ghost.prev_direction);
                    }
                } else {
                    d = Math.random();
                    if (d > 0.8) {
                        return "left";
                    } else if (d > 0.5) {
                        
                        ghost.y += step;
                        if (!check_ghost_pos(ghost,a)){
                            ghost.y -= step;
                            return "down"
                        } else {
                            ghost.y -= step;
                            return "left";
                        }
                    } else {
                        ghost.y -= step;
                        if (!check_ghost_pos(ghost,a)){
                            ghost.y += step;
                            return "up"
                        } else {
                            ghost.y += step;
                            return "left";
                        }
                    }
                }
                    
                
            } else if (ghost.direction == "right") {
                if (deadend) {
                    if (ghost.direction == ghost.prev_direction) {
                        d = Math.random();
                       
                        if (d < 0.5) {
                            return "down";
                        } else {
                            return "up";
                        }
                    } else {
                        return get_opposite_direct(ghost.prev_direction);
                    }
                } else {
                    d = Math.random();
                    if (d > 0.8) {
                        return "right";
                    } else if (d > 0.5) {
                       
                        ghost.y += step;
                        if (!check_ghost_pos(ghost,a)){
                            ghost.y -= step;
                            return "down"
                        } else {
                            ghost.y -= step;
                            return "right";
                        }
                    } else {
                        ghost.y -= step;
                        if (!check_ghost_pos(ghost,a)){
                            ghost.y += step;
                            return "up"
                        } else {
                            ghost.y += step;
                            return "right";
                        }
                    }
                    
                }
            } else if (ghost.direction == "up") {
                if (deadend) {
                    if (ghost.direction == ghost.prev_direction) {
                        d = Math.random();
                        if (d < 0.5) {
                            return "left";
                        } else {
                            return "right";
                        }
                    } else {
                        return get_opposite_direct(ghost.prev_direction);
                    }
                } else {
                     d = Math.random();
                    if (d > 0.8) {
                        return "up";
                    } else if (d > 0.5) {
                        
                        ghost.x += step;    
                        if (!check_ghost_pos(ghost,a)) {
                            ghost.x -= step;
                            return "right";
                        } else {
                            ghost.x -= step;
                            return "up";
                        }
                    } else {
                        ghost.x -= step;
                        if (!check_ghost_pos(ghost,a)) {
                            ghost.x += step;
                            return "left";
                        } else {
                            ghost.x += step;
                            return "up";
                        }
                    }
                }
            }
        }
        
        function move_ghost(ghost_obj) {
            
            if (ghost_obj.direction == "down") {
                draw_ghost(ghost_obj, "black");
                ghost_obj.y += step;
                if (!check_ghost_pos(ghost_obj,a)) {                   
                    ghost_obj.prev_direction = ghost_obj.direction;
                    draw_smth();
                    draw_ghost(ghost_obj);
                    ghost_obj.direction = get_direct(ghost_obj,false);
                } else {
                    ghost_obj.y -= step;
                    ghost_obj.direction = get_direct(ghost_obj,true);
                }
            } else if (ghost_obj.direction == "left") {
                draw_ghost(ghost_obj, "black");
                ghost_obj.x -= step;
                if (!check_ghost_pos(ghost_obj,a)) {
                    ghost_obj.prev_direction = ghost_obj.direction;
                    draw_smth();
                    draw_ghost(ghost_obj);
                    ghost_obj.direction = get_direct(ghost_obj,false);
                } else {
                    ghost_obj.x += step;
                    ghost_obj.direction = get_direct(ghost_obj,true);                    
                }
            } else if (ghost_obj.direction == "right") {
                draw_ghost(ghost_obj, "black");
                ghost_obj.x += step;
                if (!check_ghost_pos(ghost_obj,a)) {
                    ghost_obj.prev_direction = ghost_obj.direction;
                    draw_smth();
                    draw_ghost(ghost_obj);
                    ghost_obj.direction = get_direct(ghost_obj,false);
                } else {
                    ghost_obj.x -= step;
                    ghost_obj.direction = get_direct(ghost_obj,true);
                }
            } else if (ghost_obj.direction == "up") {
                draw_ghost(ghost_obj, "black");
                ghost_obj.y -= step;
                if (!check_ghost_pos(ghost_obj,a)) {
                    ghost_obj.prev_direction = ghost_obj.direction;
                    draw_smth();
                    draw_ghost(ghost_obj);
                    ghost_obj.direction = get_direct(ghost_obj,false);
                } else {
                    ghost_obj.y += step;
                    ghost_obj.direction = get_direct(ghost_obj,true);
                }
            }


        }

        function clear_pac(pac) {
            if (pac.state == "open") {
                draw_pac(pac,"black","close");
            } else {
                draw_pac(pac,"black","open");
            }
        }

        function loop() {
            move_ghost(red_Ghost);
            move_ghost(blue_Ghost);
            move_ghost(brown_Ghost);
            move_ghost(violet_Ghost);
        }

        draw_map(true);
	    pac = draw_pac(pac);

        setInterval(loop, 1000.0/30.0);

        window.onkeydown = function(event) {
           switch (event.keyCode) {
               case 37:
                   if ((pac.x - 70) > 0) {
                        if ((pac.direction == "left") && (count >= range)) {
                            count = 0;
                            obj = check_pac_pos(pac.x - step,pac.y,pac.r,a);
                            if (!obj.bool) {
                                clear_pac(pac);
                                pac.x -= step;
                                
                                //ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                                //draw_map();
                                pac = draw_pac(pac);
                            } else {
                                coord = get_block_coord(obj.row,obj.col,a);
                                if (map[obj.row][obj.col] == 2) {
                                if ((pac.y >= coord.y1) && (pac.y <= coord.y2)) {
                                    micro_step = pac.x - coord.x2 - pac.r - 2;
                                    clear_pac(pac);
                                    pac.x -= micro_step;
                                    
                                    //ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                                    //draw_map();
                                    pac = draw_pac(pac);
                                }
                                } else if (map[obj.row][obj.col] == 2) {
                                    
                                }

                            }
                        }  else if (pac.direction != "left") {
                            pac.direction = "left";
                            count = 1;
                        } else {
                            count++;
                        }
                   }
                   break;
               case 38:
                   if ((pac.y - 70) > 0) {
                       if ((pac.direction == "up") && (count >= range)) {
                            count = 0;
                           obj = check_pac_pos(pac.x,pac.y - step,pac.r,a);
                            if (!obj.bool) {
                                clear_pac(pac);
                                pac.y -= step;
                                pac = draw_pac(pac);
                            } else {
                                coord = get_block_coord(obj.row, obj.col);
                                if (map[obj.row][obj.col] == 1) {
                                if ((pac.x >= coord.x1)&&(pac.x <= coord.x2)) {
                                    micro_step = pac.y - coord.y2 - pac.r - 2;
                                    clear_pac(pac);
                                    pac.y -= micro_step;
                                    
                                   // ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                                    //draw_map();
                                    pac = draw_pac(pac);
                                }
                                } else if (map[obj.row][obj.col] == 2) {
                                    
                                    
                                    
                                    draw_circle(coord.x1, coord.y1,"black",r);
                                    clear_pac(pac);
                                    pac.y -= step;
                                    pac = draw_pac(pac);
                                    
                                }
                            }
                        }  else if (pac.direction != "up") {
                            pac.direction = "up";
                            count = 1;
                        } else {
                            count++;
                        }
                   }
                   break;
               case 39:
                   if ((pac.x + 70) < ctx.canvas.width) {
                       if ((pac.direction == "right") && (count >= range)) {
                            count = 0;
                           obj = check_pac_pos(pac.x + step,pac.y,pac.r,a);
                            if (!obj.bool) {
                                clear_pac(pac);
                                pac.x += step;
                                
                                //ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                                //draw_map();
                                pac = draw_pac(pac);
                            } else {
                                coord = get_block_coord(obj.row,obj.col);
                                if (map[obj.row][obj.col] == 1) {
                                if ((pac.y >= coord.y1)&&(pac.y <= coord.y2)) {
                                    micro_step = coord.x1 - pac.r - pac.x + 2;
                                    clear_pac(pac);
                                    pac.x += micro_step;
                                    
                                    //ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                                    //draw_map();
                                    pac = draw_pac(pac);
                                }
                                } else if (map[obj.row][obj.col] == 2) {
                                    
                                }
                            }
                        }  else if (pac.direction != "right") {
                            pac.direction = "right";
                            count = 1;
                        } else {
                            count++;
                        }
                   }
                   break;
               case 40:
                   if ((pac.y + 70) < ctx.canvas.height) {
                       if ((pac.direction == "down") && (count >= range)) {
                           count = 0;
                           obj = check_pac_pos(pac.x,pac.y + step,pac.r,a);
                           if (!obj.bool) {
                                clear_pac(pac);
                                pac.y += step;
                                
                                //ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                                //draw_map();
                                pac = draw_pac(pac);
                           } else {
                               coord = get_block_coord(obj.row,obj.col);
                               if (map[obj.row][obj.col] == 1) {
                               if ((pac.x >= coord.x1)&&(pac.x <= coord.x2)) {
                                   micro_step = coord.y1 - pac.r - pac.y + 2;
                                   clear_pac(pac);
                                   pac.y += micro_step;
                                   
                                   //ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                                   //draw_map();
                                   pac = draw_pac(pac);
                               }
                               } else if (map[obj.row][obj.col] == 2) {
                                   
                               }
                           }
                       }  else if (curr_direction != "down") {
                            pac.direction = "down";
                            count = 1;
                       } else {
                            count++;
                       }
                   }
                   break;
           }   
        }
