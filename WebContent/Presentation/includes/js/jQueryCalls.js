var gridSqaureIDName = "field_"; //id name for each grid square, allows for easy UI updates
var winningCombinations = [[0,1,2],
					        [3,4,5],
					        [6,7,8],
					        [0,3,6],
					        [1,4,7],
					        [2,5,8],
					        [0,4,8],
					        [2,4,6],
					        ]; //possible winning combinations
var playerChar = "X"; //will keep letter value of player (X or O)
var aiChar = "O"; //will keep letter value of AI (X or O)

jQuery(document).ready(function()
{//used when document is readys
	
	//defaultValues for AJAX calls	
	jQuery.ajaxSetup (
	{
		cache: false
	});
	
	setupTTTGrid();//setup 3x3 TTT grid
	setupClickHandlers(); //creates clicking functionality for each square
	
	resetGloabls();
	
});//end jQuery(document).ready

function setupTTTGrid()
{//setup 3x3 TTT grid
	
	for(var a=0; a < 9; a++)
	{
		jQuery("#mainGrid")
		.append("<td id='"+gridSqaureIDName + a+"' class='TTTGrid'></td>");		
		
		switch(a%3)
		{
			case 0:
				jQuery("#mainGrid #"+gridSqaureIDName + a)
				.before("<tr>");
				break;		
		}//end switch
	}//end for(var a=0; a < 9; a++) 
}//end setupTTTGrid()

function setupClickHandlers()
{//creates clicking functionality for each square
	
	jQuery("td[id^="+gridSqaureIDName+"]").on("click", "", "", function()
	{
		xoPlacement(jQuery(this));
	});
}//end setupClickHandlers()

function resetGlobals()
{
	winningCombinations  = [[0,1,2],
					        [3,4,5],
					        [6,7,8],
					        [0,3,6],
					        [1,4,7],
					        [2,5,8],
					        [0,4,8],
					        [2,4,6],
					        ]; //possible winning combinations
}//resetGlobals

function xoPlacement(selectedFieldObject)
{//method to place human and AI selection	
		
	var cellValue = selectedFieldObject.text();
	
	if(cellValue == "")
	{
		resetMsg(); //clear the ai messages
		
		setGridTextVal(selectedFieldObject, playerChar); //place odd move's (1, 3, 5...) before even
		
		aiMove(selectedFieldObject);//determine AI's move
		
	}//end if(cellText == "")
	else
	{		
		switch (cellValue)
		{
			case aiChar:
			{
				setBottomMessage("Come on! You can't erase my move.");
				break;
			}
			case playerChar:
			{
				setBottomMessage("You can't take your move back!");
				break;
			}
		}//end switch
	}//end if(cellValue == "")
}// end xoPlacement(selectedField)

function setGridTextVal(selectedFieldObject, xORo)
{
	selectedFieldObject.text(xORo); //place selection in grid
	updateWinningComboArray(selectedFieldObject); //update winning combo nested array's with X or O
	
}//end setGridTextVal(selectedFieldObject, xORo)

function aiMove(selectedFieldObject)
{	
	var humanMoves = jQuery("#mainGrid > td[id^="+gridSqaureIDName+"]:contains('"+playerChar+"')").length;
		
	//AI take center square if available and only 1 human value is on the board
	if( (jQuery("#"+gridSqaureIDName+"4").text() == "") && (humanMoves == 1) )
	{
		setGridTextVal(jQuery("#"+gridSqaureIDName+"4"), aiChar); //set grid value
	}//end if( (jQuery("#"+gridSqaureIDName+"4").text() == "") && (humanMoves == 1) )
	else if(humanMoves == 1)
	{//if human took center square on move #1 then randomly take a corner value
		var cornerFields = [0, 2, 6, 8];		
		setGridTextVal(jQuery("#"+gridSqaureIDName+(cornerFields[Math.floor(Math.random() * cornerFields.length)])), aiChar);	//set grid value
	}//end else if (humanMoves == 1)
	else if(humanMoves > 1)
	{	
		var winORblock = canWin(aiChar, playerChar, "AI");
		if(winORblock == -1)
			{winORblock = canLose(aiChar, playerChar, "AI");} //throw the block
		
		setGridTextVal(jQuery("#"+gridSqaureIDName+winORblock), aiChar); //set grid value		
	}//end else if(humanMoves > 1)
	
			
}//end aiMove(selectedField)

function canWin(charToCheck, blocker, player)
{//check if all possible value could win before checking to lose [block]
	var winblockValue = -1; //-1 is false
	
	for(var a=0; a < winningCombinations.length; a++)
	{	
		var countCharToCheck = winningCombinations[a].reduce(function(n, val) 
				{
		    return n + (val === charToCheck);
				}, 0
		);
		
		var countBlocker = winningCombinations[a].reduce(function(n, val) 
				{
		    return n + (val === blocker);
				}, 0
		);

		if( (countCharToCheck == 2) && (countBlocker == 0) )
		{//true: beat player			
			setBottomMessage("I win! Try your luck again?");
			winblockValue = getWinBlockValue(charToCheck, winningCombinations[a]);
			break; //stop loop
		}//end if( (countCharToCheck == 2) && (countBlocker == 0) )
	}//for(var a=0; a < winningCombinations.length; a++)
	
	return winblockValue;
}//end canWin(charToCheck, blocker, player)

function canLose(charToCheck, blocker, player)
{
	var winblockValue = -1; //-1 is false
	
	for(var a=0; a < winningCombinations.length; a++)
	{	
		var countCharToCheck = winningCombinations[a].reduce(function(n, val) 
				{
		    return n + (val === charToCheck);
				}, 0
		);
		
		var countBlocker = winningCombinations[a].reduce(function(n, val) 
				{
		    return n + (val === blocker);
				}, 0
		);

		if( (countCharToCheck == 0) && (countBlocker == 2) )
		{//true: block player				
			winblockValue = getWinBlockValue(blocker, winningCombinations[a]);
			break; //stop loop
		}//end else if( (countCharToCheck == 0) && (countBlocker == 2) )	
						
	}//for(var a=0; a < winningCombinations.length; a++)
	
	return winblockValue;
}//end canLose

function getWinBlockValue(remove, winnComboArr)
{
	var val = -1;
	
	for(var b=0; b < winnComboArr.length; b++)
	{//remove X's or O's
		val = winnComboArr;
		val.splice(jQuery.inArray(remove, val) , 1);		
	}//end for
	
	return val;
}//end getWinBlockValue(remove, winnComboArr)

function updateWinningComboArray(selectedFieldObject)
{
	for(var a=0; a < winningCombinations.length; a++)
	{//loop through each winning combination to replace values w/ X or O
		
		var fieldNumValue = parseInt(selectedFieldObject.attr('id').replace(gridSqaureIDName,''));
		
		if(jQuery.inArray(fieldNumValue, winningCombinations[a]) != -1)
		{//replace
			var indexVal = winningCombinations[a].indexOf(fieldNumValue);
			winningCombinations[a][indexVal] = selectedFieldObject.text();
		}//end if		
	}//for(var a=0; a < winningCombinations.length; a++)
}//end 

function setBottomMessage(value)
{//sets msg below the TTT grid
	jQuery("#messages").text(value);
}//setBottomMessage(value)

function resetGrid()
{
	//will clear the grid of X's and O's
	for(var a=0; jQuery("#mainGrid > td[id^="+gridSqaureIDName+"]").length; a++)
	{
		jQuery("#"+gridSqaureIDName+a).text("");
	}//end for
	
}//end resetGrid

function resetMsg()
{
	jQuery("#messages").text(""); //reset msg text
}//end resetMsg()

function resetGame()
{
}//end resetGame