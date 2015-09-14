var gridSqaureIDName = "field"; //id name for each grid square, allows for easy UI change
var selectedXIDs = []; //will store 
var selectedOIDs = []; //will store
var winningCombinations = [
                           [0,1,2],
                           [3,4,5],
                           [6,7,8],
                           [0,3,6],
                           [1,4,7],
                           [2,5,8],
                           [0,4,8],
                           [2,4,6]
                           ];

jQuery(document).ready(function() //used when document is ready
{
	
	//defaultValues for AJAX calls	
	jQuery.ajaxSetup (
	{
		cache: false
	});
	
	setupTTTGrid();//setup 3x3 TTT grid
	setupClickHandlers(); //creates clicking functionality for each square	
	
	Globals.setXs();
	Globals.getOs();
	
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

function xoPlacement(selectedField)
{
	//Places user selection and AI selection	
	var cellValue = selectedField.text();
	
	if(cellValue == "")
	{
		resetMsg(); //clear the ai messages
		
		selectedField.text("X"); //place player's selection in grid		
		
		aiMove(selectedField);//determine AI's move
		
	}//end if(cellText == "")
	else
	{		
		switch (cellValue)
		{
			case "O":
				jQuery("#messages").text("Come on! You can't erase my move.");
			case "X":
				jQuery("#messages").text("You can't take your move back!");
		}//end switch
	}//end else else if(cellText == "X" || cellText == "O")

}// end xoPlacement(selectedField)

function resetMsg()
{
	jQuery("#messages").text(""); //reset msg text
}//end resetMsg()

function aiMove(selectedField)
{	
	//take center square if available
	if(jQuery("#"+gridSqaureIDName+"4").text() == "")
	{
		jQuery("#"+gridSqaureIDName+"4").text("O");
	}
	
	
}//end aiMove(selectedField)

function canWin()
{
	//function checks to see wheter player or AI can win on the next move
}

function resetArrays()
{
	//reset X, O arrays
	selectedXIDs = [];  
	selectedOIDs = []; 
}//end resetArrays()

function resetGrid()
{
	//will clear the grid of X's and O's
	for(var a=0; jQuery("#mainGrid > td[id^="+gridSqaureIDName+"]").length; a++)
	{
		jQuery("#"+gridSqaureIDName+a).text("");
	}//end for
	
}//end resetGrid()