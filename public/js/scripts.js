$(function() {
	$("#image").change(function(){
		// var fileName = $(this).val();
		// fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
		// var listItem = "<li class='list-group-item'>" + fileName + "</li>"
		// $("#fileName").append(listItem);
		$("#upload_form").submit();
	});

	$("login_btn_container").mouseenter(function() {
		$("login_text").css({opacity: 1});
	});
});

function submitForm(action) {
    document.getElementById('login_form').action = action;
    document.getElementById('login_form').submit();
}