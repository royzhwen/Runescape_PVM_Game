

function stopatk2() 
{
elem1=document.getElementById("player2");
  setTimeout(function () 
    {
     elem1.src="gifs/" + monsterAbbreviation + "stand.gif";
    }, 500);
}

var firstHitAnimation;
var attackcount = 0;
var phase = 1;
var attackGIFname
function attack2()
{
if (hp1 != 0) //Prevents additional action if hp1 is 0
{
elem2=document.getElementById("player2");
	if (elem2.src.match("gifs/" + monsterAbbreviation + "stand.gif"))
	{ //scim interval timer
		 if (monsterAbbreviation == "drag" || monsterAbbreviation == "jad" || monsterAbbreviation == "brid") {
			 firstHitAnimation = Math.random();
			 if (firstHitAnimation > 0.5) {
				attackGIFname = "atk";
				if (monsterAbbreviation == "jad") magerangeatk = "mage";
				else if (monsterAbbreviation == "brid") {magerangeatk = "range"; attackcount++;}
				else magerangeatk = "melee";
			 }
			 else {
				attackGIFname = "atk2";
				if (monsterAbbreviation == "jad") magerangeatk = "range";
				else if (monsterAbbreviation == "brid") {magerangeatk = "mage"; attackcount++;}
				else magerangeatk = "melee";
			 }
			 elem2.src="gifs/" + monsterAbbreviation + attackGIFname +".gif";
		 }
		 else elem2.src="gifs/" + monsterAbbreviation + "atk.gif";
		 if (monsterAbbreviation == "me") monsterMax = 50+Math.floor((100-hp2)/2);
		 firstdmg1 = self.setTimeout(function(){
			 setdmg1(monsterMax);
			 clearTimeout(firstdmg1);//A solution to PROBLEM 1, unfortunately it's not foolproof
			 clearTimeout(firstdmg1);//A solution to PROBLEM 1, unfortunately it's not foolproof
			 dmg1 = self.setInterval("setdmg1(monsterMax)",monsterTime);	
		},monsterFirsthitTime);  
	}
	else if (monsterAbbreviation == "me") monsterMax = 50+Math.floor((100-hp2)/2);
}
}

var iceopacity = 0;
var opacityone = false;
var mageatk = false;
var protectcacoon = false;
var notfrozen = true;
var player1frozen;
var chance2;
var magerangeatk;
var player2kills=0;
var hp1 = 99; //Note, variables must be set outside of function for it to be called by another function
function setdmg1(maxhit) //Prevents additional action if hp2 is 0
{
 //document.getElementById("test").innerHTML="";
 if (hp1 != 0)
 {
  elem=document.getElementById("player1");
  var rand = Math.floor(Math.random()*(maxhit+1));
  var chance = Math.floor(Math.random()*(monsterAccuracyLevel-1));
  if (chance == 0) rand = 0;
  if (monsterAbbreviation == "nope" && protectedpray) rand = 0; 
  else if (monsterAbbreviation == "nope" && attackcount == 6 && phase == 3) { //Araxxor phase 3 swipe
	rand = 25 + Math.floor(Math.random()*21);
	attackcount = 0;
  }
  else if (monsterAbbreviation == "nope" && attackcount >= 6 && attackcount < 9 && phase == 1) { //Araxxor phase 1 web
	if (reflected == 0) {
		hp2+=15;
		if (hp2 > 1000) hp2 = 1000;
		$("#greenhp2").css({"width": (hp2*monsterHPbarDRAINAGE)});
	}
	rand = reflected;
	if (attackcount == 8) {
		monsterDefenceRank = 2.5;
	}
  }
  else if (monsterAbbreviation == "nope" && attackcount >= 13 && phase == 1) { //Araxxor phase 1 cacoon
	if (prayer == "mage" && attackcount == 13) protectcacoon = true; //I wouldn't reach this else if condition if I use protectedpray bool
	//if (protectcacoon == false) rand = 20; //Old implementation
	//else rand = 10;
	rand = 20;
	if (attackcount == 15) {
		protectcacoon = false;
		notfrozen = true;
		player1frozen.src="gifs/invisible.gif"; 
		attackcount = 0;
	}
  }
  else if (mageatk && monsterAbbreviation == "ogre") {
	  rand = 5;
	  mageatk = false;
	  monsterDefenceRank = 3;
	  if (stopcount == 0) {
		  $("#msg").css({"opacity": defaultopacity});
		  document.getElementById("msg").innerHTML="Your accuracy has been weakened by the ice."; 
		  gamemsg = setInterval(function () {
			 defaultopacity -= 0.002;
			 if (defaultopacity < -100) defaultopacity = 0; //To prevent non-stop decrementation
			 $("#msg").css({"opacity": defaultopacity});
		  }, 10);	
	      stopcount++;
	  }
  }
  else if (monsterAbbreviation == "jad") { 
	  if (protectedpray && jadhardmode != "Normal") rand = Math.round(rand/2);
	  else if (protectedpray) rand = 0;
	  if (!protectedpray && jadhardmode == "Hard") rand = 50 + Math.round(rand*0.48);
	  if (!protectedpray && jadhardmode == "Impossible") rand = 97;
	  if (protectedpray && jadhardmode == "Impossible" && rand < 20) rand += 30;
  }
  else if (monsterAbbreviation == "brid") { 
	  if (protectedpray) rand = 0;
  }
  else if (monsterAbbreviation == "ele") {
	  monsterDefenceRank -= 0.01;
	  monsterAccuracyLevel += 0.01;
  }
  if (rand >= hp1) //Sets what rand is based on hp1
  {
   rand = hp1;
   if (hp1 == 0)//Prevents additional 0s that randomly appear
   {
   rand = null;
   }
  }
  hp1 = hp1 - rand; //This line is the reason why "if (hp1==0)" appears twice
		if (monsterAbbreviation == "drag") {
			chance2 = Math.floor(Math.random()*100);
			if (chance2 % 2 == 0) {attackGIFname = "atk";}
			else {attackGIFname = "atk2";}
		}
		if (monsterAbbreviation == "brid") {
			if (attackcount <= 5) {
				if (attackGIFname == "atk2") {attackGIFname = "atk"; magerangeatk = "range";}
				else if (attackGIFname == "atk") {attackGIFname = "atk2"; magerangeatk = "mage";}
			}
			else {
				chance2 = Math.floor(Math.random()*100);
				if (chance2 % 2 == 0) {attackGIFname = "atk"; magerangeatk = "range";} 
				else {attackGIFname = "atk2"; magerangeatk = "mage";}
			}
			attackcount++;
			if (attackcount == 10) attackcount = 0;
		}
		else if (monsterAbbreviation == "jad") {
			chance2 = Math.floor(Math.random()*100);
			if (chance2 % 2 == 0) {attackGIFname = "atk"; magerangeatk = "mage";}
			else {attackGIFname = "atk2"; magerangeatk = "range"; }
		}
		else if (monsterAbbreviation == "nope") {
			chance2 = Math.floor(Math.random()*100);
			if (attackcount == 5 && phase == 3) { //Araxxor mechanic checks for protectedpray so magerangeatk is needed
				attackGIFname = "swipe"; magerangeatk = "melee";
			}
			else if (attackcount == 5 && phase == 1) { 
				attackGIFname = "web1"; magerangeatk = "reflect";
				reflected = 0;
				monsterDefenceRank = 10;
			}
			else if (attackcount == 6 && phase == 1) { 
				attackGIFname = "web2";  
			}
			else if (attackcount == 7 && phase == 1) { 
				attackGIFname = "web3"; 
			}
			else if (attackcount == 12 && phase == 1) {  
				stopatk1();
				stopdmg1();
				notfrozen = false;
				magerangeatk = "bleed";
				attackGIFname = "cacoon1";		
				player1frozen=document.getElementById("player1frozen");
				setTimeout(function () 
				{     
					player1frozen.src="gifs/cacoon.png"
				}, 1000);
			}
			else if (attackcount == 13 && phase == 1) { 
				attackGIFname = "cacoon2"; 
				if (protectcacoon == true) attackcount++; //New implementation makes cacoon hit 2x instead of 3x if protected
			}
			else if (attackcount == 14 && phase == 1) { 
				attackGIFname = "cacoon3"; 
			}
			else if (phase >= 2) {
				if (chance2 % 2 == 0) {attackGIFname = "atk3"; magerangeatk = "melee";}
				else {attackGIFname = "atk4"; magerangeatk = "range"; }	
			}
			else if (chance2 % 2 == 0) {attackGIFname = "atk"; magerangeatk = "melee";}
			else {attackGIFname = "atk2"; magerangeatk = "range"; }
			if (phase == 3 || phase == 1) attackcount++;
		}
		else if (monsterAbbreviation == "ogre") {
			chance2 = Math.floor(Math.random()*100);
			if (chance2 % 2 == 0) {
				if (prayer != "mage") { //Using protectedpray code mechanic works too, but no need (too much work for this monster)
					stopatk1();
					stopdmg1();
					notfrozen = false;
					mageatk = true;
					attackGIFname = "atk2"; //Same as stand animation, but stand is used in other code so using it here will cause disruptions
					if (typeof(freezeanimation) != 'undefined') clearInterval(freezeanimation);
					iceopacity = 0;
					opacityone = false;
					freezeanimation = setInterval(function () {
						player1frozen=document.getElementById("player1frozen");
						player1frozen.src="gifs/barrage.png"
						if (opacityone) iceopacity -= 0.005;
						else iceopacity += 0.005;
						if (iceopacity > 1) opacityone = true;
						if (iceopacity < -100) iceopacity = 0; //To prevent non-stop decrementation 
						$("#player1frozen").css({"opacity": iceopacity});
					}, 10);		
				}
				else {
					notfrozen = true;
					attackGIFname = "atk";
				}
			}
			else {
				notfrozen = true;
				attackGIFname = "atk";
			}
		}
		else attackGIFname = "atk";	 	
		elem3=document.getElementById("player2");
		elem3.src="gifs/" + monsterAbbreviation + attackGIFname +".gif";
   if (hp1 == 0)   //Prevents eating when dead
   {
	won = false;
    if (monsterAbbreviation == "me") player1killpoints = 0;
	document.getElementById("killsPVM").innerHTML=player1killpoints;
    player2kills += 1;
	document.getElementById("deathsPVM").innerHTML=player2kills; 
    stopatk1();
	stopatk2();
	setTimeout(function () 
	{
	stopdmg1(); 
	stopdmg2();	
	}, 1);
	$(".item1").css({"display": "none"}); 							 
    document.getElementById("player2").removeAttribute("onclick");		
	allowattack = false;
    setTimeout(function () 
      {     
	   $("#hphp1").css({"display": "none"});
       elem.src="gifs/rangedeath.gif";	
      }, 3000);
	 setTimeout(function () 
      {     
	   player1frozen=document.getElementById("player1frozen"); 
	   player1frozen.src="gifs/invisible.gif";
	   elem.src="gifs/youlose.gif"; 
	   $("#restart").css({"visibility": "visible"});
      }, 5000);
   }
  document.getElementById("hpcount1").innerHTML=hp1;//Note: Always make sure that the logic is correct before outputting
  $("#redhp1").css({"height": 50 - hp1/2}); 
  $("#hitsplat1").css({"visibility": "visible"});
  if (rand == 0) 
  {
  $("#hitsplat1").css({"background-image": "url('images/dmg0.gif')"});
  $(".singledigitdmg1").css({"display": "none"});
  $(".leftsplathalf1").css({"display": "none"});
  $(".rightsplathalf1").css({"display": "none"});
  } 
  else {$("#hitsplat1").css({"background-image": "url('images/dmg.gif')"});}//The else must be there for damages to not stay blue
  if (rand < 10 && rand > 0) //Single digit damage number
  { //dmg#-width,0-6,1-4,2-6,3-5,4-5,5-5,6-6,7-5,8-6,9-6,
   $(".leftsplathalf1").css({"display": "none"});
   $(".rightsplathalf1").css({"display": "none"});  
   if (rand == 0 || rand == 2 || rand == 6 || rand == 8 || rand == 9)
   {
   $(".singledigitdmg1").attr("width", "6");  //Adjusting the gif width of the single digit number
   $(".singledigitdmg1").css({"margin-left": "9px"}); //Adjusting the position of the single digit number
   }
   else if (rand == 3 || rand == 4 || rand == 5 || rand == 7)
   {
   $(".singledigitdmg1").attr("width", "5");
   $(".singledigitdmg1").css({"margin-left": "9.5px"});
   }
   else 
   {
   $(".singledigitdmg1").attr("width", "4");
   $(".singledigitdmg1").css({"margin-left": "10px"});
   }
   $(".singledigitdmg1").css({"display": ""});
   $(".singledigitdmg1").attr("src", "images/" + rand + ".gif");
  }
  else if (rand >= 10)
  {//dmg#-width,0-6,1-4,2-6,3-5,4-5,5-5,6-6,7-5,8-6,9-6,
  leftdigit = Math.floor(rand / 10); //Split 2 digit damages to a left number and right number
  rightdigit = rand % 10;
  $(".singledigitdmg1").css({"display": "none"});
  if (leftdigit == 0 || leftdigit == 2 || leftdigit == 6 || leftdigit == 8 || leftdigit == 9) //Adjusting the gif width of the number
   {$(".leftsplathalf1").attr("width", "6");}
  else if (leftdigit == 3 || leftdigit == 4 || leftdigit == 5 || leftdigit == 7)
   {$(".leftsplathalf1").attr("width", "5");}
  else {$(".leftsplathalf1").attr("width", "4");}
  if (rightdigit == 0 || rightdigit == 2 || rightdigit == 6 || rightdigit == 8 || rightdigit == 9)
   {$(".rightsplathalf1").attr("width", "6");}
  else if (rightdigit == 3 || rightdigit == 4 || rightdigit == 5 || rightdigit == 7)
   {$(".rightsplathalf1").attr("width", "5");}
  else {$(".rightsplathalf1").attr("width", "4");}
  $(".leftsplathalf1").css({"display": ""});
  $(".leftsplathalf1").attr("src", "images/" + leftdigit + ".gif");
  $(".rightsplathalf1").css({"display": ""});  
  $(".rightsplathalf1").attr("src", "images/" + rightdigit + ".gif");
  }
  $("#greenhp1").css({"width": (hp1*10/33)});
  if (monsterTime > 2000) 
  {
	  setTimeout(function () //Commented out because hits are too fast
	  {     
			$(".singledigitdmg1").css({"display": "none"});
			$(".leftsplathalf1").css({"display": "none"});
			$(".rightsplathalf1").css({"display": "none"});
			$("#hitsplat1").css({"visibility": "hidden"});
	   }, 2000);
  }
 }
}

var eats1 = 0; 
function fasteat1(num)
{
 if (notfrozen) {
	 document.getElementById("fastfood1" + num).removeAttribute("onclick");
	 eats1++;  
	 document.getElementById("foodseatenPVM").innerHTML=eats1; 
	 $("#fastfood1" + num).css({"opacity": "0.3"});
	 setTimeout(function () 
	  {     
	  $("#fastfood1" + num).css({"visibility": "hidden"}); 
	  $("#fastfood1" + num).attr( "onclick", "fasteat1('"+num+"')" );
	  $("#fastfood1" + num).css({"opacity": "1"})
	  },400)
	 if (furyshark) hp1+=25; 
	 else hp1+=18; 
	 if (hp1 >= 99)
	 {
	 hp1=99;
	 }
	 document.getElementById("hpcount1").innerHTML=hp1;
	 $("#redhp1").css({"height": 50 - hp1/2});
	 $("#greenhp1").css({"width": (hp1*10/33)});
 }
}


function eatfood1(num)
{ 
 if (notfrozen) {
	 eats1++;  
	 document.getElementById("foodseatenPVM").innerHTML=eats1; 
	 setTimeout(function () 
	 { 
	 stopdmg1();stopatk1();
	 }, 1);
	 $("#food1" + num).css({"opacity": "0.3"});
	 setTimeout(function () 
	  {     
	  $("#food1" + num).css({"visibility": "hidden"}); 
	  $("#food1" + num).css({"opacity": "1"}); //When refilled, the opacity will be 0.3 without this line
	  },400)
	 hp1+=20; 
	 if (hp1 >= 99)
	 {
	 hp1=99;
	 }
	 document.getElementById("hpcount1").innerHTML=hp1;
	 $("#redhp1").css({"height": 50 - hp1/2});
	 for (i = 6;i<=27;i++)
	 {
	   document.getElementById("food1" + i).removeAttribute("onclick");
	 }
	 document.getElementById("player2").removeAttribute("onclick"); 
	setTimeout(function ()  
	   {     
		  for (i = 6;i<=27;i++)
		  {
		  $("#food1" + i).attr( "onclick", "eatfood1('" + i + "')" );
		  }
	   }, 2000);
	setTimeout(function ()  
	   {
		  if (allowattack) $('#player2').attr( "onclick", "attack1()" );
	   }, 1000);  
	 $("#greenhp1").css({"width": (hp1*10/33)});
 }
}

function stopdmg2()
{
      setTimeout(function () 
      {     
	    $(".singledigitdmg1").css({"display": "none"}); //Making all damage number gifs and splats disappear
		$(".leftsplathalf1").css({"display": "none"});
		$(".rightsplathalf1").css({"display": "none"});
	    $("#hitsplat1").css({"visibility": "hidden"});
      }, 1700); 
	  if (typeof(firstdmg1) != 'undefined') clearTimeout(firstdmg1);
      if (typeof(dmg1) != 'undefined') clearInterval(dmg1); 
} 