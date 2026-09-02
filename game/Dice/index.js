function diceGame(){
    var p1 = Math.random();//Player 1
    p1 = p1 * 6;
    p1 = Math.floor(p1) + 1;

    var p2 = Math.random();//Player 2
    p2 = p2 * 6;
    p2 = Math.floor(p2)+1;

    //setting The Image for Player 1

    var player1Image="images/dice"+p1+".png";
    document.querySelectorAll("img")[0].setAttribute("src",player1Image);

    /* if (p1 == 1){
        document.querySelector(".img1").setAttribute("src","images/dice1.png");
    }
    else if (p1 == 2){
        document.querySelector(".img1").setAttribute("src","images/dice2.png");
    }
    else if (p1 == 3){
        document.querySelector(".img1").setAttribute("src","images/dice3.png");
    }
    else if (p1 == 4){
        document.querySelector(".img1").setAttribute("src","images/dice4.png");
    }
    else if (p1 == 5){
        document.querySelector("h2").textContent="";(".img1").setAttribute("src","images/dice5.png");
    }
    else{
        document.querySelector(".img1").setAttribute("src","images/dice6.png");
    } */

    //setting The Image for Player 2

    var player2Image = "images/dice"+p2+".png";

    document.querySelectorAll("img")[1].setAttribute("src",player2Image);

    /* if (p2 == 1){
        document.querySelector(".img2").setAttribute("src","images/dice1.png");
    }
    else if (p2 == 2){
        document.querySelector(".img2").setAttribute("src","images/dice2.png");
    }
    else if (p2 == 3){
        document.querySelector(".img2").setAttribute("src","images/dice3.png");
    }
    else if (p2 == 4){
        document.querySelector(".img2").setAttribute("src","images/dice4.png");
    }
    else if (p2 == 5){
        document.querySelector(".img2").setAttribute("src","images/dice5.png");
    }
    else{
        document.querySelector(".img2").setAttribute("src","images/dice6.png");
    }*/

    //to Check Who wins

    if (p1 > p2)//to Check Who wins
    {
        document.querySelector("h2").textContent="We Won...!";
    }
    else if (p1 < p2)
    {
        document.querySelector("h2").textContent="You Won...!";
    }
    else
    {
        document.querySelector("h2").textContent="It's a Draw..!";
    }

    document.querySelector("p").textContent="Try again???";
}
 //# sourceURL=snippet:///diceGame
