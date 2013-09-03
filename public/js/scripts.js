$(function() {
	$("#image").change(function(){
		var fileName = $(this).val();
		fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
		var listItem = "<li class='list-group-item'>" + fileName + "</li>"
		$("#fileName").append(listItem);
		$("#submit_button").val("Start Upload")
	});

	// $("#upload_btn").click(function() {
	// 	$("#image").trigger("click");
	// });

	$("login_btn_container").mouseenter(function() {
		$("login_text").css({opacity: 1});
	});
});