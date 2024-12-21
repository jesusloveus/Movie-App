document.addEventListener( 'DOMContentLoaded', () =>
{
    // Handle form submission
    document.getElementById( 'movie-form' ).addEventListener( 'submit', function ( event )
    {
        event.preventDefault();

        const title = document.getElementById( 'title' ).value.trim();
        const rating = parseFloat( document.getElementById( 'rating' ).value );

        // Validation
        if ( title.length < 2 )
        {
            alert( 'Title must be at least 2 characters long.' );
            return;
        }

        if ( rating < 0 || rating > 10 || isNaN( rating ) )
        {
            alert( 'Rating must be a number between 0 and 10.' );
            return;
        }

        // Append movie to the DOM
        const moviesList = document.getElementById( 'movies-list' );

        const movieDiv = document.createElement( 'div' );
        movieDiv.classList.add( 'movie' );

        const titleDiv = document.createElement( 'div' );
        titleDiv.innerHTML = `<strong>Title:</strong> ${ title }`;

        const ratingDiv = document.createElement( 'div' );
        ratingDiv.innerHTML = `<strong>Rating:</strong> ${ rating }`;

        const removeButton = document.createElement( 'button' );
        removeButton.textContent = 'Remove';
        removeButton.classList.add( 'remove' );
        removeButton.addEventListener( 'click', () =>
        {
            movieDiv.remove();
        } );

        movieDiv.appendChild( titleDiv );
        movieDiv.appendChild( ratingDiv );
        movieDiv.appendChild( removeButton );
        moviesList.appendChild( movieDiv );

        // Clear inputs
        document.getElementById( 'title' ).value = '';
        document.getElementById( 'rating' ).value = '';
    } );

    // Sorting functions
    const sortMovies = ( comparator ) =>
    {
        const moviesList = document.getElementById( 'movies-list' );
        const movies = Array.from( moviesList.querySelectorAll( '.movie' ) );
        movies.sort( comparator );
        moviesList.innerHTML = '';
        movies.forEach( ( movie ) => moviesList.appendChild( movie ) );
    };

    document.getElementById( 'sort-title-asc' ).addEventListener( 'click', () =>
    {
        sortMovies( ( a, b ) =>
        {
            const titleA = a.querySelector( 'div' ).textContent.toLowerCase();
            const titleB = b.querySelector( 'div' ).textContent.toLowerCase();
            return titleA.localeCompare( titleB );
        } );
    } );

    document.getElementById( 'sort-title-desc' ).addEventListener( 'click', () =>
    {
        sortMovies( ( a, b ) =>
        {
            const titleA = a.querySelector( 'div' ).textContent.toLowerCase();
            const titleB = b.querySelector( 'div' ).textContent.toLowerCase();
            return titleB.localeCompare( titleA );
        } );
    } );

    document.getElementById( 'sort-rating-asc' ).addEventListener( 'click', () =>
    {
        sortMovies( ( a, b ) =>
        {
            const ratingA = parseFloat( a.querySelectorAll( 'div' )[ 1 ].textContent.split( ': ' )[ 1 ] );
            const ratingB = parseFloat( b.querySelectorAll( 'div' )[ 1 ].textContent.split( ': ' )[ 1 ] );
            return ratingA - ratingB;
        } );
    } );

    document.getElementById( 'sort-rating-desc' ).addEventListener( 'click', () =>
    {
        sortMovies( ( a, b ) =>
        {
            const ratingA = parseFloat( a.querySelectorAll( 'div' )[ 1 ].textContent.split( ': ' )[ 1 ] );
            const ratingB = parseFloat( b.querySelectorAll( 'div' )[ 1 ].textContent.split( ': ' )[ 1 ] );
            return ratingB - ratingA;
        } );
        
    } );
} );
