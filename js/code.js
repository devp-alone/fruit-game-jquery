let playing=false;
let score;
let trialLeft;
let step;
let action;
let fruits=["apple","banana","berry","cherries","grapes","mango","orange","peach","pear","pineapple","watermelon"];
$(()=>
{
    //click on start / Reset Button 
    $("#startreset").click(()=>
    {
        //if we are playing
        if(playing)
        {
            //reload page 
            location.reload();
            playing=false;
        }
        else
        {
            //if we are not palying
            //hide the game over box 
            $("#gameover").hide();
            // change the text to Reset Game 
            $("#startreset").html("Reset Game");
            // start playing game
            playing=true;
            //score initialize to 0
            score=0;
            $("#scorevalue").html(score);
            //show the trial or life left 
            $("#trialleft").show();
            //setting initial trial value 
            trialLeft=3;
            //Adding trial hearts 
            addHearts(); 
            //Start sending fruits 
            startAction();
        }
    });
    function addHearts()
    {
        //clear hearts 
        $("#trialleft").empty();
        //fill with hearts 
        for(let i=0;i<trialLeft;i++)
        {
            $("#trialleft").append('<img src="img/heart.png" class="heart">');
        }
    }
    //start sending fruits 
    function startAction()
    {
        //genrate fruits 
        $("#fruit").show();
        //genrate random fruits 
        chooseFruit();
        //random position 
        $("#fruit").css({"left":Math.round(650 * Math.random()),"top":-50});
        //genrate steps 
        step=1 + Math.round( 5 * Math.random());
        //move fruit down by steps every 10ms 
        action=setInterval(()=>{
            $("#fruit").css("top",$("#fruit").position().top + step);
            //to check that fruit is too slow 
            if($("#fruit").position().top > $("#fruitContainer").height())
            {
                // to check we have life left 
                if(trialLeft > 1)
                {
                    $("#fruit").show();
                    chooseFruit();
                    $("#fruit").css({"left":Math.round(650 * Math.random()),"top":-50});
                    step=1 + Math.round( 5 * Math.random());
                    //reduce the the life or trial 
                    trialLeft--;
                    //populate hearts 
                    addHearts();
                }
                else //game over
                {
                    playing=false;
                    //we are not playing 
                    $("#startreset").html("Start Game");
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over !</p><p>Your Score is " + score + "</p>");
                    //hide the trial or life left: 
                    $("#trialleft").hide();
                    stopAction();
                }
            }
        },10)
    }
    //genrate random fruit 
    function chooseFruit()
    {
        let rand=fruits[Math.round(9*Math.random())];
        // console.log(rand);
        $("#fruit").attr('src','img/' + rand + '.png');
    }
    function stopAction()
    {
        clearInterval(action);
        //hide the fruits 
        $("#fruit").hide();
    }

 //slice the fruits 
   
    $("#fruit").on("mouseover touchstart", function () { 
        // Increase the score by one
        score++;
    
        // Update score value
        $("#scorevalue").html(score);
    
        // Play the slice sound
        $("#slicesound")[0].play();
    
        // Stop fruit movement
        clearInterval(action);
    
        // Hide fruit with an explosion effect
        $("#fruit").hide("explode", 200);
    
        // Send a new fruit after a short delay
        setTimeout(startAction, 400);
    });
    


   
})

