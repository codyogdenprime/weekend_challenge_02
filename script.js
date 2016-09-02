var jsonUrl = "pi.json";

var studentBtnHandler = function () {

	console.log( "Student Button Handler", $( this ).data("first-name") );

	$("#firstName").html( $( this ).data("first-name") );
	$("#lastName").html( $( this ).data("last-name") );
	$("#studentInfo").html( $( this ).data("info") );	

};

$(document).ready( function () {

	console.log( "Document Ready!" );

	$.getJSON( jsonUrl, function( data ) {
		
		console.log( data );

		var container = $(".buttonsContainer");
		var prevBtn = $("<button />", { class: "previous" } ).html( "Previous" );
		var nextBtn = $("<button />", { class: "next" } ).html( "Next" );

		container.append( prevBtn );

		for ( var i=0; i < data.students.length; i++ ) {

			var button = $("<button />", { class: "studentButton" });

			button.data( "first-name", data.students[i].first_name );
			button.data( "last-name", data.students[i].last_name );
			button.data( "info", data.students[i].info );
			button.html( data.students[i].first_name );
			button.on( "click", studentBtnHandler );

			// Add the button to the container
			container.append( button );
		}

		container.append( nextBtn );

	});} );