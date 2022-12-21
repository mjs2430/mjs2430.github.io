$(document).ready(function() {
	
let wrestlersPerPlayer;
let numberOfPlayers;
let playerNames; 
let wrestlerNames;
let wrestlerName;
let extra = [];
let value;
let count = -1;

    

//Get player names from input field, split into an array
  $('#players').keyup(function() {
  let string =  $('#players').val();
	playerNames = string.split('\n');
	}); 


//assign names to players
 $('#submit-players').click(function() {
	
	 for (let x in playerNames) {
			 $(".player-grid").append(`<div class="player${x} player-section"><h2>${playerNames[x]}</h2><div class="list-of-wrestlers"></div><button class="addExtra">Add extra wrestler</button></div>`);
	 }   
	 //create extra player space
	 $(".player-grid").append(`<div class="extra-wrestlers hidden"><h2>Extra Wrestlers</h2><div class="list-of-wrestlers"></div></div>`);
	  numberOfPlayers = playerNames.length;//set number of players integer
	 	$("#names").val("");	//clear the names input field when done
    $("#player-amount").removeClass("show").addClass("hidden");
	 $("#wrestler-amount").removeClass("hidden").addClass("show");
	});    //end




//get number of wrestlers per player. function triggers on change of wrestlers each select dropdown
$("#wrestlers").change(function () {
$(".list-of-wrestlers").html("");//clear grid
let wrestlers = $('#wrestlers').val(); // get value of drodown
wrestlersPerPlayer = parseInt(wrestlers); //convert value string to integer
	$("#wrestler-amount").removeClass("show").addClass("hidden");
	$("#wrestler-assignment").removeClass("hidden").addClass("show");
    });
 
	

//get array of wrestlers by picking a year in the dropdown
$("#year").change(function () { 
value = $('#year').val(); // get value of drodown
let showYear = $('#year option:selected').text();
SHUFFLE(year[value]); //run shuffle function, which includes function to create multidimensional array
CREATE_WRESTLER_GRID(); // run function that puts wrestlers in DOM   
    $("#wrestler-assignment").removeClass("show").addClass("hidden");
	$(".player-grid").removeClass("hidden").addClass("show");
	 $("header").addClass("slideUp");
	 $("#in-the-ring").removeClass("hidden").addClass("show");
	//$(".new-button").removeClass("hidden").addClass("show");
	$("#show-year").append(`<h3>${showYear}</h3>`);
	       setTimeout(function(){ $("#show-year").removeClass("hidden").addClass("show") }, 1000);

    }); //end
    


	
	//mark wrestlers as entered when clicked on DEPRECIATED
/*
$('section').on('click', '.inactive', function() { 
 $(this).addClass("active");
 wrestlerName = $(this).find("p").html();
let wrestlerClass = wrestlerName.replace(/[^A-Z0-9]+/ig, "");
  $("#in-the-ring").append(`<span class="${wrestlerClass}">${wrestlerName}</span>`);
});  */
	
    
    
//add another wrestler to player when .addExtra is clicked
$('.player-grid').on('click', '.addExtra', function() { 
	 if (extra.length > 0) {
    let wrestlerClass = extra[0].replace(/^[^A-Z]+|[\W]+/ig, "")
	$(".extra-wrestlers .list-of-wrestlers ." + wrestlerClass).remove();
$(this).siblings(".list-of-wrestlers").append(`<div class='wrestler-card inactive ${wrestlerClass}'><button type='button' class=''></button><p>${extra[0]}</p></div>`);
extra.shift();
	 } else {   
         let  merged = [].concat.apply([], wrestlerNames); // merge our multidimensional array to one
		 merged = merged.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);	//shuffle that array
         let excessWrestlers = [];
         let addedWrestler;
         addedWrestler = merged[0].replace(/^[^A-Z]+|[\W]+/ig, "") // addedWrestler is the first name in array
         excessWrestlers.push(addedWrestler); //push to an array to check against
         if (excessWrestlers.includes(addedWrestler)) { //if array includes new wrestler name
             addedWrestler = merged[1].replace(/^[^A-Z]+|[\W]+/ig, "") //get next wrestler name
                          $(this).siblings(".list-of-wrestlers").append(`<div class='wrestler-card inactive ${addedWrestler}'><button type='button' class=''></button><p>${merged[1]}</p></div>`);

         } else {
             $(this).siblings(".list-of-wrestlers").append(`<div class='wrestler-card inactive ${addedWrestler}'><button type='button' class=''></button><p>${merged[0]}</p></div>`);
         }
     }
}); 
	
    
	
//mark wrestlers as entered when click "add new" button
$('#in-the-ring').on('click', '#next-wrestler', function() { 
	playAudio("http://matthewsasso.com/royalrumble/sounds/crowd.wav");
count++; //add to the count so we can use that integer to reference a position in the wrestler array
let wrestler = year[value][count]; // year object, wrestler name, array position
let wrestlerClass = wrestler.replace(/^[^A-Z]+|[\W]+/ig, "") //remove spaces and special chars
 $("#in-the-ring").append(`<span class="${wrestlerClass} pill">${wrestler}</span>`);//add the wrestler to the top bar
	
    let nl = document.querySelectorAll(".list-of-wrestlers > ." + wrestlerClass); // get nodelist
    let arr = [];
    let names = [];
    for(let i = nl.length; i--; arr.unshift(nl[i])); // convert nodelist to array
    for (let x in arr) {
    let userName = $(arr[x]).parent().parent().find("h2").html();
    names.push(userName);
    }   
    
    names = names.toString();
    names = names.replace(/,/g, ', ');
    
    let fullscreen = `<div class="fullscreen"><h3>Now entering the ring</h3><h2 class="${wrestlerClass}">${wrestler}!</h2><p class="userName">Start drinking: <span>${names}</span></p></div>`;//create a variable that is a fullscreen overlay
     $(fullscreen).appendTo('main'); //append it to main area of html
	setTimeout(function(){ $(".fullscreen").addClass("reveal") }, 100); //after 100ms, fade in
	 $(".inactive." + wrestlerClass).addClass("active");//change wrestler in grid to active colors
  setTimeout(function(){ $(".fullscreen").removeClass("reveal").addClass("fade") }, 4000);
	setTimeout(function(){ $(".fullscreen").removeClass("fade").addClass("hide") }, 5000);//after 4 seconds, hide overlay
});   //end	 
    
    

//mark wrestlers as exited when pill clicked on
$('#in-the-ring').on('click', '.pill', function() { 
		playAudio("http://matthewsasso.com/royalrumble/sounds/explosion.wav");

 $(this).remove();
	wrestlerName = $(this).html(); 
	let wrestlerClass = wrestlerName.replace(/^[^A-Z]+|[\W]+/ig, "")
    let nl = document.querySelectorAll(".list-of-wrestlers > ." + wrestlerClass); // get nodelist
    let arr = [];
    let names = [];
    for(let i = nl.length; i--; arr.unshift(nl[i])); // convert nodelist to array
    for (let x in arr) {
    let userName = $(arr[x]).parent().parent().find("h2").html();
    names.push(userName);
    }   
    
    names = names.toString();
    names = names.replace(/,/g, ', ');
    
    $(".list-of-wrestlers ." + wrestlerClass).removeClass("active").addClass("dead");
 let fullscreen = `<div class="fullscreen red"><h2>${wrestlerName}</h2><h3>Is dead!</h3><p class="userName">Finish drinking: <span>${names}!</span></p></div>`;//create a variable that is a fullscreen overlay
     $(fullscreen).appendTo('main'); //append it to main area of html
	setTimeout(function(){ $(".fullscreen").addClass("reveal") }, 100); //after 100ms, fade in
	 $(".inactive." + wrestlerClass).addClass("active");//change wrestler in grid to active colors
	setTimeout(function(){ $(".fullscreen").removeClass("reveal").addClass("fade") }, 4000);
	setTimeout(function(){ $(".fullscreen").removeClass("fade").addClass("hide") }, 5000);//after 4 seconds, hide overlay
});
	
	
//revive accidental deaths
$('section').on('click', '.dead', function() { 
 $(this).removeClass("dead").addClass("active");
$(this).find("p").removeClass("dead");
	wrestlerName = $(this).find("p").html(); 
	let wrestlerClass = wrestlerName.replace(/^[^A-Z]+|[\W]+/ig, "")
	$("#in-the-ring").append(`<span class="${wrestlerClass} pill">${wrestlerName}</span>`);
}); 
    
    

	
/********************
reusable functions 
*******************/
	
///play audio
	function playAudio(url) {
  new Audio(url).play();
}
	
//take an array and make it a multidimensional array based on how many wrestlers per player we set	
let squash = (arr, num) => {
 let results = [];
 let start, end;
 for (let i = 1; i < arr.length; i++) {
  start = (i - 1) * num;
  end = i * num;
  let sliced = arr.slice(start, end);
  if (start >= arr.length) { // need to make sure we don't go passed the end
   break;
  }
  results.push(sliced);
 }
 return results;
}; //end
	

//shuffle wrestler list array
const SHUFFLE = (names) => {
  wrestlerNames = names;    
	wrestlerNames = wrestlerNames.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);	
  wrestlerNames = squash(wrestlerNames, wrestlersPerPlayer);// runs function that creates multidimensional array
	return wrestlerNames;
}; //end
	
	  

 //loop through the array of wrestler names to get x which is an integer, loop through the sub arrays to get strings which is y
const CREATE_WRESTLER_GRID = () => {
    for (let x in wrestlerNames) {
		 for (let y in wrestlerNames[x]) {
		let wrestlerClass = wrestlerNames[x][y].replace(/^[^A-Z]+|[\W]+/ig, "")
			 	$(".player" + x +  " .list-of-wrestlers").append(`<div class='wrestler-card inactive ${wrestlerClass}'><button type='button' class=''></button><p>${wrestlerNames[x][y]}</p></div>`);
		 }
	 };
	  
	//if not enough players 
	 if (numberOfPlayers * wrestlersPerPlayer < 30) {
		 for (let x = numberOfPlayers; x<=wrestlerNames.length; x++) {
			 for (let y in wrestlerNames[x]) {		 
				 let wrestlerClass = wrestlerNames[x][y].replace(/^[^A-Z]+|[\W]+/ig, "")
                 extra.push(wrestlerNames[x][y]); //add names to array that keeps extra unused wrestlers;
				 	$(".extra-wrestlers").removeClass('hidden');
			 	$(".extra-wrestlers .list-of-wrestlers").append(`<div class='wrestler-card inactive ${wrestlerClass}'><button type='button' class=''></button><p>${wrestlerNames[x][y]}</p></div>`);
			 }
		 }
	 } else if (numberOfPlayers * wrestlersPerPlayer > 30){ //if too many players
		 let  merged = [].concat.apply([], wrestlerNames); // merge our multidimensional array to one
		 merged = merged.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);	//shuffle that array
		  let excessWrestlers = [];

       excessWrestlers = squash(merged, wrestlersPerPlayer);//call remerge array function
		 
		    let startLoop = Math.ceil(30/wrestlersPerPlayer); // divide the total num of wrestlers by WPP, round up.
		    let stopLoop = numberOfPlayers - startLoop; //stop after number of players minus start. basically get how many iterations we need to do
		 		//loop through our new array, stop after we finish adding wrestlers to the remaining players
		 		 for (let x = 0; x <= excessWrestlers.length && x <= stopLoop; x++) {
					 let z = x + startLoop; // get an integer based on the remaining players so we can assign them the proper class in css
					 for (let y in excessWrestlers[x]) {
						 let wrestlerClass = excessWrestlers[x][y].replace(/^[^A-Z]+|[\W]+/ig, "")
				 	$(".player" + z +  " .list-of-wrestlers").append(`<div class='wrestler-card inactive ${wrestlerClass}'><button type='button' class=''></button><p>${excessWrestlers[x][y]}</p></div>`);
					 }
		 }
	 }
    
    
}//end
	

let year = {
	eightEight: ["Tito Santana", "Bret Hart", "Butch Reed", "Jim Niedhart", "Jake Roberts", "Harley Race", "jim Brunzell", "Sam Houston", "Danny Davis", "Boris Zhukov", "Don Muraco", "Nikolai Volkoff", "Jim Duggan", "Ron Bass", "B. Brian Blair", "Hillybilly Jim", "Dino Bravo", "Ultimate Warrior", "One Man Gang", "Junkyard Dog"],
	eightNine: ["Demolition Axe", "Demolition Smash", "Andre the Giant", "Mr. Perfect", "Ronnie Garvin", "Greg Valentine", "Jake Roberts", "Ron Bass", "Shawn Michaels", "Butch Miller", "Honkytonk Man", "Tito Santana", "Bad News Brown", "Marty Jannetty", "Randy Savage", "Arn Anderson", "Tully Blanchard", "Hulk Hogan", "Luke Williams", "Koko B. Ware", "The Warlord", "Big Bossman", "Akeem", "Brutus Beefcake", "Red Rooster", "The Barbarian", "John Studd", "Hercules", "Rick Martel", "Ted DiBiase"],
	nineZero: ["Ted DiBiase", "Koko B. Ware", "Marty Jannetty", "Jake Roberts", "Randy Savage", "Roddy Piper", "The Warlord", "Bret Hart", "Bad News Brown", "Dusty Rhodes", "Andre the Giant", "Red Rooster", "Demolition Smash", "Akeem", "Jimmy Snuka", "Dino Bravo", " Earthquake", "Jim Niedhart", "Ultimate Warrior", "Rick Martel", "Tito Santana", "Honkytonk Man", "Hulk Hogan", "Shawn Michaels", "Rick Rude", "Hercules", "Mr. Perfect"],
	nineOne: ["Bret Hart", "Dino Bravo", "Greg Valentine", "Paul Roma", "Kerry Von Erich", "Rick Martel", "Sama Simba", "Butch Miller", "Jake Roberts", "Hercules", "Tito Santana", "The Undertaker", "Jimmy Snuka", "Davey Boy Smith", "Demolition Smash", "LOD Hawk", "Shane Douglas", "Randy Savage", "LOD Animal", "Demolition Crush", "Jim Duggan", "Earthquake", "Mr. Perfect", "Hulk Hogan", "Haku", "Jim Niedhart", "Luke Williams", "Brian Knobbs", "The Warlord", "Tugboat"],
	nineTwo: ["The British Bulldog", "Ted DiBiase", "Ric Flair", "Jerry Sags", "Haku", "Shawn Michaels", "Tito Santana", "The Barbarian", "Kerry Von Erich", "Repo Man", "Greg Valentine", "Nikolai Volkoff", "Big Bossman", "Hercules", "Roddy Piper", "Jake Roberts", "Jim Duggan", "Irwin R Schyster", "Jimi Snuka", "The Undertaker", "Randy Savage", "The Berzerker", "Virgil", "Col. Mustafa", "Rick Martel", "Hulk Hogan", "Skinner", "Sgt Slaughter", "Sid Justice", "The Warlord"],
	nineThree: ["Ric Flair", "Bob Backlund", "Papa Shango", "Ted DiBiase", "Brian Knobbs", "Virgil", "Jerry Lawler", "Max Moon", "Genichiro Tenryu", "Mr. Perfect", "Skinner", " Koko B Ware", "Headshrinker Samu", "The Berzerker", "The Undertaker", " Terry Taylor", "Damien Demento", "Irwin R Schyster", "Tatanka", "Jerry Saga", "Typhoon", "Headshrinker Fatu", "Earthquake", "Carlos Colon", "Tito Santana", "Rick Martel", "Yokozuna", "Owen Hart", " Repo Man", "Randy Savage"],
	nineFour: ["Scott Steiner", "Headshrinker Samu", "Rick Steiner", "Kwang", "Owen Hart", "Bart Gunn", "Diesel", "Bob Backlund", "Billy Gunn", "Virgil", "Randy Savage", "Jeff Jarrett", " Crush", "Doink", "Bam Bam Bigelow", "Mabel", "Sparky Plugg", "Shawn Michaels", "Mo", "Greg Valentine", "Tatanka", "Great Kabuki", "Lex Luger", "Genichiro Tenryu", "Bastian Booger", "Rick Martel", "Bret Hart", "Headshrinker Fatu", "Marty Jannetty", "Adam Bomb"],
	nineFive: ["Shawn Michaels", "Davey Boy Smith", "Eli Blue", "Duke Droese", "Jimmy Del Ray", "Headshrinker Sionne", "Tom Pritchard", "Doink", "Kwang", "Rick Martel", "Owen Hart", "Timothy Well", "Luke Williams", "Jaco Blue", "King Kong Bundy", "Mo", "Mabel", "Butch Miller", "Lex Luger", "Mantaur", "Aldo Montoya", "Henry Godwinn", "Billy Gunn", "Bob Backlund", "Steven Dunn", "Dick Murdoch", "Adam Bomb", "Headshrinker Fatu", "Crush"],
	nineSix: ["Hearst Hunter Helmsley", "Henry Godwinn", "Bob Backlund", "Jerry Lawler", "Bob Holly", "King Mabel", "Jake Roberts", "Dory Funk, Jr.", "Yokozuna", "1-2-3-Kid", "Takao Omori", "Savio Vega", "Vader", "Doug Gilbert", "Squat Team #1", "Squat Team #2", "Owen Hart", "Shawn Michaels", "Hakushi", "Tatanka", "Aldo Montoy", "Diesel", "Kama", "Steve Austin", "Barry Horowitz", "Fatu", "Isaac Yankem", "Marty Jannetty", "British Bulldog", "Duke Droese"],
	nineSeven: ["Crush", "Ahmed Johnson", "Razor Ramon II", "Phinneas Godwinn", "Steve Austin", "Bart Gunn", "Jake Roberts", "British Bulldog", "Pierroth, Jr.", "The Sultan", "Mil Mascaras", "Hunter Hearst Helmsley", "Owen Hart", "Goldust", "Cibernetico", "Marc Mero", "Latin Lover", "Farooq", "Savio Vega", "Jesse James", "Bret Hart", "Jerry Lawler", "Diesel II", "Terry Funk", "Rocky Maivia", "Mankind", "Flash Funk", "Vader", "Henry Godwinn", "The Undertaker"],
	nineEight: ["Cactus Jack", "Chainsaw Charlie", "Tom Brandi", "Rocky Maivia", "Headbanger Mosh", "Phinneas Godwinn", "DOA 8-Ball", "Blackjack Bradshaw", "Owen Hart", "Steve Blackman", "D-Lo Brown", "Kurrgan", "Marc Mero", "Ken Shamrock", "Headbanger Thrasher", "Mankind", "Goldust", "Jeff Jarrett", "Honkytonk Man", "Ahmed Johnson", "Mark Henry", "DOA Skull", "Kama Mustafa", "Steve Austin", "Henry Goodwinn", "Savio Vega", "Farooq", "Dude Love", "DOA Chainz", "Vader"],
	nineNine: ["Steve Austin", "Vince McMahon", "Golga", "Darren Drosdov", "Edge", "Gillburg", "Steve Blackman", "Dan Severn", "Tiger Ali Singh", "Blue Meanie", "Mabel", "Jesse James", "Gangrel", "Kurrgan", "Al Snow", "Goldust", "The Godfather", "Kane", "Ken Shamrock", "Billy Gunn", "Test", "Big Bossman", "Hunter Hearst Helmsley", "Val Venis", "X-Pac", "Mark Henry", "Jeff Jarrett", "D-Lo Brown", "Owen Hart", "Chyna"],
  ohOh: ["D'lo Brown", "Grand Master Sexay", "Mosh" , "Christian", "Rikishi", "Scotty 2 Hotty", "Steve Blackman", "Viscera", "Big Boss Man", "Test", "The British Bulldog", "Gangrel", "Edge", "Bob Backlund", "Chris Jericho", "Crash Holly", "Chyna", "Faarooq", "Road Dogg", "Al Snow", "Val Venis", "Prince Albert", "Hardcore Holly", "The Rock", "Billy Gunn", "Big Show", "Bradshaw", "Kane", "The Godfather", "X-Pac"],
	ohOne: ["Jeff Hardy", "Bull Buchanan", "Matt Hardy", "Farooq", "Drew Carey", "Kane", "Raven", "Al Snow", "Perry Saturn", "Steve Blackman", "Grand Master Sexay", "Honkytonk Man", "The Rock", "The Godfather", "Tazz", "Bradshaw", "Prince Albert", "Hardcore Holly", "K-Kwik", "Val Venis", "William Regal", "Test", "Big Show", "Crash Holly", "The Undertake", "Scotty Too Hotty", "Steve Austin", "Billy Gunn", "Haku", "Rikishi"],
	ohTwo: ["Rikishi", "Goldust", "Big Bossman", "Bradshaw", "Lance Storm", "Al Snow", "Billy Gunn", "The Undertaker", "Matt Hardy", "Jeffy Hardy", "Maven", "Scotty Too Hotty", "Christian", "Diamond Dallas Page", "Chuck Palumbo", "The Godfather", "Albert", "Perry Saturn", "Steve Austin", "Val Venis", "Test", "Triple H", "Hurricane", "Farooq", "Mr. Perfect", "Kurt Angle", "The Big Show", "Kane", "Rob Van Dam", "Booker T"],
	ohThree: ["Shawn Michaels", "Chris Jericho", "Christopher Nowinski", "Rey Mysterio", "Edge", "Christian", "Chavo Guerrero", "Yoshihiro Tajiri", "Bill DeMott", "Tommy Dreamer", "Bull Buchanan", "Rob Van Dam", "Matt Hardy", "Eddie Guerrero", "Jeff Hardy", "Rosey", "Test", "John Cena", "Charlie Haas", "Rikishi", "Jamal", "Kane", "Shelton Benjamin", "Booker T", "A-Train", "Maven", "Goldust", "Dave Batista", "Brock Lesnar", "The Undertaker"],
	ohFour: ["Chris Benoit", "Randy Orton", "Mark Henry", "Yoshihiro Tajiri", "Bradshaw", "Rhyno", "Matt Hardy", "Scott Steiner", "Matt Morgan", "Hurricane", "Booker T", "Kane", "Spike Tudley", "Rikishi", "Rene Dupre", "A-Train", "Shelton Benjamin", "Ernest Miller", "Kurt Angle", "Rico", "Mick Foley", "Christian", "Nunzio", "The Big Show", "Chris Jericho", "Charlie Haas", "Billy Gunn", "John Cena", "Rob Van Dam", "Bill Goldberg"],
	ohFive: ["Eddie Guerrero", "Chris Benoit", "Daniel Puder", "Bob Holly", "Hurricane", "Kenzo Suzuki", "Edge", "rey Mysterio", "Shelton Benjamin", "Booker T", "Chris Jericho", "Luther Reigns", "Muhammad Hassan", "Orlando Jordan", "Scotty Too Hotty", "Charlie Haas", "Rene Dupre", "Simon Dean", "Shawn Michaels", "Kurt Angle", "Jonathon Coachman", "Mark Jindrak", "Viscera", "Paul London", "John Cena", "Gene Snitsky", "Kane", "Batista", "Christian", "Ric Flair"],
	ohSix: ["Triple H", "Rey Mysterio", "Simon Dean", "Psicosis", "Ric Flair", "The Big Show", "Jonathon Coachman", "Bobby Lashley", "Kane", "Sylvan Grenier", "Carlito", "Chris Benoit", "Booker T", "Joey Mercury", "Tatanka", "Johnny Nitro", "Trevor Murdoch", "Eugene", "Road Warrior Animal", "Rob Van Dam", "Orlando Jordan", "Chavo Guerrero", "Matt Hardy", "Super Crazy", "Shawn Michaels", "Chris Masters", "Viscera", "Shelton Benjamin", "Goldust", "Randy Orton"],
	ohSeven: ["Ric Flair", "Fit Finlay", "Kenny Dykstra", "Matt Hardy", "Edge", "Tommy Dreamer", "Sabu", "Gregory Helms", "Shelton Benjamin", "Kane", "CM Punk", "Booker T", "Super Crazy", "Jeff Hardy", "Sandman", "Randy Orton", "Chris Benoit", "Rob Van Dam", "Viscera", "Johnny Nitro", "Kevin Thorn", "Hardcore Holly", "Shawn Michaels", "Chris Masters", "Chavo Guerrero", "MVP", "Carlito", "The Great Khali", "The Miz", "The Undertaker"],
	ohEight: ["The Undertaker", "Shawn Michaels", "Santino Marella", "The Great Khali", "Hardcore Holly", "John Morrison", "Tommy Dreamer", "Batista", "Hornswoggle", "Chuck Palumbo", "Jaime Noble", "CM Punk", "Cody Rhodes", "Umaga", "Gene Snitsky", "The Miz", "Shelton Benjamin", "Jimmy Snuka", "Roddy Piper", "Kane", "Carlito", "Mick Foley", "Mr. Kennedy", "Big Daddy V", "Mark Henry", "Chavo Guerrero", "Fit Finlay", "Elijah Burke", "Triple H", "John Cena"],
	ohNine: ["Rey Mysterio", "John Morrison", "Carlito Colon", "MVP", "The Great Khali", "Vladimir Kozlov", "Triple H", "Randy Orton", "JTG", "Ted DiBiase, Jr.", "Chris Jericho", "Mike Knox", "The Miz", "Fit Finlay", "Cody Rhodes", "The Undertaker", "Goldust", "CM Punk", "Mark Henry", "Shelton Benjamin", "William Regal", "Kofi Kingston", "Kane", "R-Truth", "Rob Van Dam", "Brian Kendrick", "Dolph Zigglar", "Santino Marella", "Jim Duggan", "The Big Show"],
	ohTen: ["Dolph Ziggler", "Evan Bourne", "CM Punk", "JTG", "The Great Khali", "Beth Phoenix", "Zack Ryder", "Triple H", "Drew McIntyre", "Ted Dibiase, Jr.", "John Morrison", "Kane", "Cody Rhodes", "MVP", "Carlito", "The Miz", "Matt Hardy", "Shawn Michaels", "John Cena", "Shelton Benjamin", "Yoshi Tatsu", "The Big Show", "Mark Henry", "Chris Masters", "R-Truth", "Jack Swagger", "Kofi Kingston", "Chris Jericho", "Edge", "Batista"],
    seventeen: ["Big Cass", "Chris Jericho", "Kalisto" , "Mojo Rawley" , "Jack Gallagher" , "Mark Henry" , "Braun Strowman" , "Sami Zayn" , "Big Show" , "Tye Dillinger" , "James Ellsworth" , "Dean Ambrose" , "Baron Corbin" , "Kofi Kingston" , "The Miz" , "Sheamus" , "Big E" , "Rusev",  "Cesaro" , "Xavier Woods" , "Bray Wyatt" , "Apollo Crews" , "Randy Orton" , "Dolph Ziggler", "Luke Harper" , "Brock Lesnar" , "Enzo Amore" , "Goldberg" , "The Undertaker" , "Roman Reigns"]
};
	
	
	
	});