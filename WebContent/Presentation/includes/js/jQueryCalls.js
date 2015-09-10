jQuery(document).ready(function() //used when document is ready
{
	//defaultValues for AJAX calls	
	jQuery.ajaxSetup (
	{
		cache: false
	});
	
	setupTTTGrid();//setup 3x3 TTT grid
	setupClickHandlers(); //creates clicking functionality for each square	
	
});//end jQuery(document).ready

function setupTTTGrid()
{//setup 3x3 TTT grid
	
	for(var a=0; a < 9; a++)
	{
		jQuery("#mainGrid")
		.append("<td id='field"+a+"' class='TTTGrid'></td>");		
		
		switch(a%3)
		{
			case 0:
				jQuery("#mainGrid #field"+a)
				.before("<tr>");
				break;		
		}//end switch
	}//end for(var a=0; a < 9; a++) 
}//end setupTTTGrid()

function setupClickHandlers()
{//creates clicking functionality for each square
	jQuery("td[id^=field]").on("click", "", "", function()
	{
		xoPlacement(jQuery(this).attr("id"));
	});
}//end setupClickHandlers()

function xoPlacement(selectedField)
{
	//Places user selection and AI selection
	
}