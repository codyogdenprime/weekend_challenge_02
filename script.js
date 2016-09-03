var jsonUrl = "pi.json";

var viewHandler = function () {

	// Start currentPerson at -1 because there are no people yet.
	var currentPerson = -1;

	// Method: .set() - Individual Button Handler
	this.set = function () {

		// If the current button's data-index is undefined, don't do anything.
		if ( $( this ).data( "index" ) !== undefined ) {

			// Remove the current-person class from the current displayed person's button
			$( "#student-" + currentPerson ).removeClass( "current-person" );

			// Change the currentPerson number
			currentPerson = $( this ).data( "index" );

			// Add the class to the next student's button
			$( "#student-" + currentPerson ).addClass( "current-person" ).focus();

			// Display the person
			displayPerson();

		}

		resetTimer();

	};

	// Method: .next() - Add or wrap the next person on the list.
	this.next = function () {

		// If the current person plus one would put is beyond the number of people given to us
		if( ( currentPerson + 1 ) < $( ".studentButton" ).length ) {

			// Remove the current-person class from the current displayed person's button
			$( "#student-" + currentPerson ).removeClass( "current-person" );

			// Add one to the currentPerson
			currentPerson++;

			// Add the class to the next student's button
			$( "#student-" + currentPerson ).addClass( "current-person" ).focus();

			// Display the person
			displayPerson();

		} else {

			// Remove the current-person class from the current displayed person's button
			$( "#student-" + currentPerson ).removeClass( "current-person" );

			// Set the current person equal to zero
			currentPerson = 0;

			// Add the class to the next student's button
			$( "#student-" + currentPerson ).addClass( "current-person" ).focus();

			// Display the person
			displayPerson();
		}

		// Return something useful if no errors.
		return true;

	};

	// Method: .prev() - Go back to the previous person's view
	this.prev = function () {

		// If the current person minus one would be outside of the indexes in the array
		if( ( currentPerson - 1 ) >= 0 ) {

			// Remove the current-person class from the current displayed person's button
			$( "#student-" + currentPerson ).removeClass( "current-person" );

			// Subtract one from the currentPerson number
			currentPerson--;

			// Add the class to the next student's button
			$( "#student-" + currentPerson ).addClass( "current-person" );

			// Display the person
			displayPerson();

		} else {

			// Remove the current-person class from the current displayed person's button
			$( "#student-" + currentPerson ).removeClass( "current-person" );

			// Set the person equal to the last person in our array
			currentPerson = ( $( ".studentButton" ).length - 1);

			// Add the class to the next student's button
			$( "#student-" + currentPerson ).addClass( "current-person" );

			// Display the person
			displayPerson();
		}

		// Return something useful
		return true;
	};

	// Method: .current() - get the current number of people
	this.current = function () {
		return currentPerson;
	};
};

// Display the person on the DOM
var displayPerson = function () {
	$("#student-info").fadeOut();
	$( "#person-current" ).html( view.current() + 1 );
	$("#firstName").html( $("#student-" + view.current() ).data("first-name") );
	$("#lastName").html( $("#student-" + view.current() ).data("last-name") );
	$("#studentInfo").html( $("#student-" + view.current() ).data("info") );
	$("#student-info").fadeIn();

};

// View Object
var view = new viewHandler();

// Timer Variable
var timer = setInterval( view.next, 10000 );

// Reset Timer Function
var resetTimer = function () {
	// Clear out the interval
	clearInterval( timer );

	// Reset the interval
	timer = setInterval( view.next, 10000 );
};

$(document).ready( function () {

	// Let's get some stuff!!
	$.getJSON( jsonUrl, function( data ) {

		// Container element
		var container = $(".buttonsContainer");

		// Creat a previous button
		var prevBtn = $("<button />", { class: "previous" } ).on( "click", view.prev ).html( "Previous" );
			prevBtn.on( "click", resetTimer );

		// Create a next button
		var nextBtn = $("<button />", { class: "next" } ).on( "click", view.next ).html( "Next" );
			nextBtn.on( "click", resetTimer );

		// Build the button DOM area

		// Append the previous button
		container.append( prevBtn );

		// For every student in the object.students array
		for ( var i=0; i < data.students.length; i++ ) {

			// Build a new button and add some stuff
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

		// Append the next button
		container.append( nextBtn );

		// Hide student-info container
		$("#student-info").hide(0);

		// Load the first student when the DOM is ready
		$("#student-0").trigger( "click" );

		// Update the person counter when the DOM is ready
		$("#person-count").html( $(".studentButton").length );

	} );
} );