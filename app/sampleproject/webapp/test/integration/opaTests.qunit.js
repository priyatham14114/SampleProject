sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/app/sampleproject/test/integration/FirstJourney',
		'com/app/sampleproject/test/integration/pages/BooksList',
		'com/app/sampleproject/test/integration/pages/BooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksList, BooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/app/sampleproject') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksList: BooksList,
					onTheBooksObjectPage: BooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);