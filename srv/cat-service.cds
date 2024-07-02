using my.bookshop as my from '../db/data-model';

service CatalogService {
    @restrict: [
        {
            grant: '*',
            to   : 'Admin'
        },
        {
            grant: 'READ',
            to   : 'User'
        }

    ]
    entity Books as projection on my.Books;
}

// annotate CatalogService.Books with @(UI: {
//     HeaderInfo: {
//         $Type         : 'UI.HeaderInfoType',
//         TypeName      : 'Book Details',
//         TypeNamePlural: 'BookDetails',
//     },
//     LineItem  : [
//         {Value: ID},
//         {Value: title}

//     ],

// });
