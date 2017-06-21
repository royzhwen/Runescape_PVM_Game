var tipcount = 0;
var tipcount2 = 0;
var furyshark = false;
function restart()
{
	//if (player1killpoints >= 10000) alert("Congratulations! Getting a kill point of 10000+ proves that you've mastered the game! \nFor more, see rs018231.com/RS/membership.png");
	notfrozen = true;
	if (typeof(freezeanimation) != 'undefined') clearInterval(freezeanimation);
	if (!won) praypoint = 40;
	else if (praypoint < 40) praypoint = 40;
	if (monsterAbbreviation == "jad" || monsterAbbreviation == "brid") {
		if (tipcount == 0) {
			tipcount++;
			$("#msg").css({"opacity": defaultopacity});
			document.getElementById("msg").innerHTML="&nbsp;Tip: 1 and 3 are keybinds for inventory and prayer."; 
			gamemsg = setInterval(function () {
				defaultopacity -= 0.002;
				$("#msg").css({"opacity": defaultopacity});
				if (defaultopacity <= 0) {
					if (typeof(gamemsg) != 'undefined') clearInterval(gamemsg);
					defaultopacity = 1;
					document.getElementById("msg").innerHTML="";
				}
			}, 10);		
		}
	}
	if (monsterAbbreviation == "nope") {
		if (tipcount2 == 0) {
			tipcount2++;
			defaultopacity = 1;
			$("#msg").css({"opacity": defaultopacity});
			document.getElementById("msg").innerHTML="&nbsp;Tip: Put on Protect from Range as soon as you see projectile"; 
			gamemsg = setInterval(function () {
				defaultopacity -= 0.002;
				$("#msg").css({"opacity": defaultopacity});
				if (defaultopacity <= 0) {
					if (typeof(gamemsg) != 'undefined') clearInterval(gamemsg);
					defaultopacity = 1;
					document.getElementById("msg").innerHTML="";
				}
			}, 10);		
		}
		else {
			if (typeof(gamemsg) != 'undefined') clearInterval(gamemsg); 
			defaultopacity = 1;
			document.getElementById("msg").innerHTML="";
		}
	}
	if (monsterAbbreviation == "brid") {
		healcount = 0; attackcount = 0;
	}
	if (monsterAbbreviation == "ele") {
		monsterDefenceRank = 2.6;
		monsterAccuracyLevel = 3;
		maxhitdrain = 0;
		fightele = false;
		$("#player2div").css({"visibility": "hidden"});
		$("#player1div").css({"visibility": "hidden"});
		monsterBackground = "url('images/bgele.gif')";
		$("#game").css('background-image', monsterBackground);
		$("#game").css({"background-size": "629px 528px"});
		$("audio").attr( "src", "audio/" + monsterAbbreviation + ".mp3" );
		if (won) praypoint = 50;
	}
	if (monsterAbbreviation == "ogre") {
		if (typeof(gamemsg) != 'undefined') clearInterval(gamemsg);
		iceopacity = 0;
		$("#player1frozen").css({"opacity": 1});
		opacityone = false;
		stopcount = 0;
		defaultopacity = 1; document.getElementById("msg").innerHTML="";
		monsterDefenceRank = 5;
	}
		prayertime = 0;
	if (monsterAbbreviation == "nope") {
		//if (typeof(gamemsg) != 'undefined') clearInterval(gamemsg); //Commented because of new pop-up tip showing after first Araxxor fight
		ThirdphaseDefRank = 2.3;
		protectcacoon = false;	
		stopcount = 0; stopcount2 = 0; stopcount3 = 0;
		/*defaultopacity = 1; document.getElementById("msg").innerHTML="";*/ //Commented because of new pop-up tip showing after first Araxxor fight
		attackcount = 0; phase = 1; monsterTime = 2200; monsterMax = 22; 
		monsterFirsthitTime = 2200; 
		monsterAccuracyLevel = 5; monsterDefenceRank = 2.5;//For the spider
	}
	if (typeof(jadheal) != 'undefined') clearInterval(jadheal);
	JadHealersAppear = false;
	$("#jadhealer1").css({"visibility": "hidden"});
	$("#jadhealer2").css({"visibility": "hidden"});
	$("#jadhealer3").css({"visibility": "hidden"});
	$("#jadhealer4").css({"visibility": "hidden"});
	healersalive = 4;
	if (typeof(firsthit) != 'undefined') clearTimeout(firsthit); //Note stopdmg gets activated multiple times
	if (typeof(magerangehits) != 'undefined') clearInterval(magerangehits);
	$("#jadmode").attr( "onclick", "toggleJadMode()" );
	$("#selectmonster").css({"visibility": ""});
	$("#redbutton").attr( "onclick", "autofight2()" );
	$("#redbutton").css({"background-color": "red"});
	$("#restart").css({"visibility": "hidden"});
	hp1=99;//hp2=99;
	hp2=monsterHP; //For pvm
	document.getElementById("hpcount1").innerHTML=hp1;
	document.getElementById("praycount1").innerHTML=Math.round(praypoint);
	document.getElementById("praycountinven").innerHTML=Math.round(praypoint);
	$("#bluepray1").css({"height": 50 - praypoint*5/4}); 	
	$("#redhp1").css({"height": 50 - hp1/2});
	$("#redhp2").css({"height": 50 - hp2/2});
	$("#greenhp1").css({"width": (hp1*10/33)});
	$("#greenhp2").css({"width": (hp2*monsterHPbarDRAINAGE)});
	$(".item1").css({"display": ""});  
	$("#hphp1").css({"display": ""});
	$("#hphp2").css({"display": ""});
	refill_at_restart();
	refills1 -= 1; //Changed for pvm
	document.getElementById("refillsPVM").innerHTML=refills1; 
	furyshark = false;
	for (var k=1;k<=5;k++)
	{
	   $("#fastfood1" + k).css({"visibility": "visible"});
	   fastfood = document.getElementById("fastfood1" + k);
	   if (monsterAbbreviation == "brid" && won) {
			fastfood.src="images/foodPVM3.png";
			furyshark = true;
	   }
	   else fastfood.src="images/foodPVM2.png";
	}
	element1=document.getElementById("player1");
	element2=document.getElementById("player2");
	element3=document.getElementById("2h1");
	element1.src="gifs/rangestand.gif";
	element2.src="gifs/" + monsterAbbreviation + "stand.gif";
	element3.src="images/dharoks.png";
	clearInterval(autoattack2); 
	clearInterval(autoeat2);    //Incase autofight2() does not clear it
}
function restart2() //Ensures this line of code is always executed upon restart
{                   //incase clearing auto attack crashes due to not auto attacking.
	stopdmg2();     //My best solution to PROBLEM 3 
}
function restart3() //Ensures this line of code is always executed upon restart
{                   //incase clearing auto attack crashes due to not auto attacking.
	stopdmg1();     //My best solution to PROBLEM 3 
}
function restart4() //The .src line won't work if src doesn't exist (when player1frozen 
{					//variable is created but its src isn't set to something in function)
	player1frozen=document.getElementById("player1frozen");
	player1frozen.src="gifs/invisible.gif"
}

function getMonsterInfo() {
	document.getElementById("info").removeAttribute("onclick");
	document.getElementById("redbutton").removeAttribute("onclick"); //So cutscene for ele can't get messed when check for into and then suddenly FIGHT
	if (monsterAbbreviation == "ele") {
		  if (fightele) monsterBackground = "url('images/bg" + monsterAbbreviation + "4.gif')";
		  else monsterBackground = "url('images/bg" + monsterAbbreviation + "2.gif')";
	}
	else monsterBackground = "url('images/bg" + monsterAbbreviation + "2.png')";
	$("#game").css('background-image', monsterBackground);
	setTimeout(function () 
	 {   
		  if (monsterAbbreviation == "ele") {
			if (fightele) monsterBackground = "url('images/bg" + monsterAbbreviation + "3.gif')";
			else monsterBackground = "url('images/bg" + monsterAbbreviation + ".gif')";
		  }
		  else monsterBackground = "url('images/bg" + monsterAbbreviation + ".png')";
		  $("#game").css('background-image', monsterBackground);
		  $("#info").attr( "onclick", "getMonsterInfo()" );
		  $("#redbutton").attr( "onclick", "autofight2()" );
	 },5000);
}

window.onkeypress = function(event) {	//Keyboard tab control
	if (event.keyCode == 49) showtab("inven"); //key 1
	if (event.keyCode == 51) showtab("pray");  //key 3
}
function showtab(tab) {
	if (tab == "inven") {
		$("#prayInnerBox1").css({"visibility": "hidden"});   //If css is on default "display none" in css file, switch to display blank doesn't display it
		$("#invenInnerBox1").css({"visibility": "visible"}); //Therefore, I switched it to visiblity
		$("#invenButton").attr("src", "images/invenSel.PNG");
		$("#prayButton").attr("src", "images/prayUnsel.PNG");
	}
	else {
		$("#prayInnerBox1").css({"visibility": "visible"}); 
		$("#invenInnerBox1").css({"visibility": "hidden"}); 
		$("#invenButton").attr("src", "images/invenUnsel.PNG");
		$("#prayButton").attr("src", "images/praySel.PNG");		
	}
}

var praypoint = 40;
var prayer = "off";
function togglepray(pray) {
  if (praypoint > 0) {
		if (pray == "mage") {	
			magepray=document.getElementById("magepray");
			if (magepray.src.match("images/mageprayoff.png")) {
			    prayer = "mage";	
				$("#prayOverhead").attr("src", "images/magepray.png");	
				$("#magepray").attr("src", "images/mageprayon.png");
				$("#rangepray").attr("src", "images/rangeprayoff.png");	
                praypointdrain("on");				
			}
			else {
				prayer = "off";					
				$("#magepray").attr("src", "images/mageprayoff.png");		
                $("#prayOverhead").attr("src", "gifs/invisible.gif");		
                praypointdrain("off");					
			}
		}
		else {
			rangepray=document.getElementById("rangepray");
			if (rangepray.src.match("images/rangeprayoff.png")) {
			    prayer = "range";				
				$("#prayOverhead").attr("src", "images/rangepray.png");	
				$("#rangepray").attr("src", "images/rangeprayon.png");
				$("#magepray").attr("src", "images/mageprayoff.png");	
                praypointdrain("on");	
			}
			else {
			    prayer = "off";
				$("#rangepray").attr("src", "images/rangeprayoff.png");
				$("#prayOverhead").attr("src", "gifs/invisible.gif");	
                praypointdrain("off");			
			}
		}
  }
}

var prayertime = 0; //All 3 variables are for Araxxor only
var ThirdphaseDefRank = 2.3;
var stopcount3 = 0;
function praypointdrain(onoff) {
  if (onoff == "on") {
	  if (typeof(praydrain) == 'undefined') {
		  praydrain = self.setInterval(function () 
			 {   
				 if (praypoint > 0) {
					  praypoint -= 0.25;
					  if (praypoint <= 0.50) praypoint = 0;
					  document.getElementById("praycount1").innerHTML=Math.round(praypoint); 
					  document.getElementById("praycountinven").innerHTML=Math.round(praypoint); 
					  $("#bluepray1").css({"height": 50 - praypoint*5/4}); 	 
					  if (praypoint == 0) { 
						  prayer = "off";  
						  clearInterval(praydrain); 
						  delete praydrain;
						  $("#magepray").attr("src", "images/mageprayoff.png");
						  $("#rangepray").attr("src", "images/rangeprayoff.png");
						  $("#prayOverhead").attr("src", "gifs/invisible.gif");
					  }	     
				   if (prayertime < 10000) prayertime += 750;
				   else {				   
				   		  if (stopcount3 == 0 && hp2 <= 400 && monsterAbbreviation == "nope") {	
							  defaultopacity = 1;
							  $("#msg").css({"opacity": defaultopacity});
							  document.getElementById("msg").innerHTML="&nbsp;Araxxor takes note of your prolonged prayer use."; 	
							  stopcount3++;
						  }
						  if (hp2 <= 400 && monsterAbbreviation == "nope") ThirdphaseDefRank = 2.1;
				   }
				   //document.getElementById("test").innerHTML=prayertime+" "+ThirdphaseDefRank;
				  }
			 },750);	
	  }
  }
  else {
	clearInterval(praydrain); 
	prayertime = 0;
	delete praydrain;
  }
}

var protectedpray = false;
var protectwaittime;
var prayupdatetime;
function protectpray() {
		if (monsterAbbreviation == "jad") {
			protectwaittime = 500;
			prayupdatetime = monsterTime;
		}
		else if (monsterAbbreviation == "brid") {
			protectwaittime = 0;
			prayupdatetime = monsterTime;
		}
		else { //Spider
			protectwaittime = 0;
			prayupdatetime = 1;
		}
		firsthit = self.setTimeout(function(){
			if (prayer == magerangeatk) protectedpray = true;
			else protectedpray = false;
			magerangehits = self.setInterval(function(){      
					if (prayer == magerangeatk) protectedpray = true;
					else protectedpray = false;								
			},prayupdatetime);	
		},(monsterTime-protectwaittime));
}

function toggleJadMode() {
      if (jadhardmode == "Normal") {jadhardmode = "Hard"; monsterKillPoint = 10000;}
      else if (jadhardmode == "Hard") {jadhardmode = "Impossible"; monsterKillPoint = 1000000;}	
	  else if (jadhardmode == "Impossible") {jadhardmode = "Normal"; monsterKillPoint = 100;}
	  //else if (jadhardmode == "Hard") {jadhardmode = "Normal"; monsterKillPoint = 100;}
	  document.getElementById("jadmode2").innerHTML=jadhardmode;
}

var healersalive = 4;
var RandMargGen1;var RandMargGen2;var RandMargGen3;var RandMargGen4;
var RandMargGen5;var RandMargGen6;var RandMargGen7;var RandMargGen8;	
function killhealer(healerNum) {
	$("#jadhealer"+healerNum).css({"visibility": "hidden"});
	healersalive--;
}

function jadhealfunc() { //Cannot be same as variable for interval timer "jadheal"
    hp2+=10;
	if (hp2 >= 250) hp2 = 250;
	$("#greenhp2").css({"width": (hp2*monsterHPbarDRAINAGE)});
}