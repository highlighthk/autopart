$(document).ready(function(){
	
	$(".fa-ellipsis-v").click(function(){

		$("#wrapper #sidebar").toggleClass("menu-height");
	});
});
function preloader(){

	$(window).on("load", function(){

		$("#preloader").css({
			"visibility":"hidden",
			"opacity":"0",
			"transition":"0.5s"
		});
	});
}

$(document).ready(function() {
    // Get today's date
    var today = new Date();

    // Calculate the date 7 days ago
    var sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Format the date as YYYY-MM-DD for setting the input value
    var formattedDate = sevenDaysAgo.toISOString().split('T')[0];

    // Set the minimum attribute of the input element to 7 days ago
    $("#fromdate").attr("min", formattedDate);
});