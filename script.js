var jsonUrl = "pi.json";

var viewHandler = function () {

	var currentPerson = -1;

	this.set = function () {
		if ( $( this ).data( "index" ) !== undefined ) {
			$( "#student-" + currentPerson ).removeClass( "current-person" );
			currentPerson = $( this ).data( "index" );
			$( "#student-" + currentPerson ).addClass( "current-person" );
			displayPerson();
			console.log( currentPerson );
		}
		resetTimer();
	};

	this.next = function () {
		if( ( currentPerson + 1 ) < $( ".studentButton" ).length ) {
			$( "#student-" + currentPerson ).removeClass( "current-person" );
			currentPerson++;
			$( "#student-" + currentPerson ).addClass( "current-person" );
			displayPerson();
			console.log( currentPerson );
		} else {
			$( "#student-" + currentPerson ).removeClass( "current-person" );
			currentPerson = 0;
			$( "#student-" + currentPerson ).addClass( "current-person" );
			displayPerson();
			console.log( currentPerson );
		}
		return true;
	};

	this.prev = function () {
		if( ( currentPerson - 1 ) >= 0 ) {
			$( "#student-" + currentPerson ).removeClass( "current-person" );
			currentPerson--;
			$( "#student-" + currentPerson ).addClass( "current-person" );
			console.log( currentPerson );
			displayPerson();
		} else {
			$( "#student-" + currentPerson ).removeClass( "current-person" );
			currentPerson = ( $( ".studentButton" ).length - 1);
			$( "#student-" + currentPerson ).addClass( "current-person" );
			displayPerson();
			console.log( currentPerson );
		}
		return true;
	};

	this.current = function () {
		return currentPerson;
	};
};

var displayPerson = function () {
	$( "#person-current" ).html( view.current() + 1 );
};

var view = new viewHandler();

var timer = setInterval( view.next, 2000 );

var resetTimer = function () {
	clearInterval( timer );
	timer = setInterval( view.next, 2000 );
};

$(document).ready( function () {

	console.log( "Document Ready!" );

	$.getJSON( jsonUrl, function( data ) {
		
		console.log( data );

		var container = $(".buttonsContainer");
		var prevBtn = $("<button />", { class: "previous" } ).on( "click", view.prev ).html( "Previous" );
			prevBtn.on( "click", resetTimer );
		var nextBtn = $("<button />", { class: "next" } ).on( "click", view.next ).html( "Next" );
			nextBtn.on( "click", resetTimer );
		container.append( prevBtn );

		for ( var i=0; i < data.students.length; i++ ) {

			var button = $("<button />", { class: "studentButton" });
				button.attr( "id", "student-" + i );
				button.data( "index", i );
				button.data( "first-name", data.students[i].first_name );
				button.data( "last-name", data.students[i].last_name );
				button.data( "info", data.students[i].info );
				button.html( data.students[i].first_name );
				button.on( "click", view.set );


			// Add the button to the container
			container.append( button );
		}

		container.append( nextBtn );

		$("#student-0").trigger( "click" );

		$("#person-count").html( $(".studentButton").length );

	});} );