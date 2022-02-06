import * as React from "react";
import * as ReactDOM from "react-dom";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";


const movies = [
    {
        title: "De urørlige",
        plot: " De urørlige er en oppløftende komedie om vennskap, tillit og menneskelige muligheter, og er den sanne historien om to menn som aldri skulle ha møtt hverandre.",
        year: 2011
    },
    {
        title: "The Color Purple",
        plot: "A black Southern woman (Whoopi Goldberg) struggles to find her identity after suffering years of abuse from her father and others over 40 years.",
        year: 1985
    }
];

function FrontPage() {
    return <div>
        <h1>my react movie</h1>
        <ul>
            <li><Link to="/movies">List movies</Link></li>
            <li><Link to="/movies/new">New Movie</Link></li>
        </ul>
    </div>;
}


function NewListMovies() {
    return <div>
        <h1>List movies</h1>
        {movies.map(m =>
            <>
                <h2>{m.title} ({m.year})</h2>
                <div>{m.plot}</div>
            </>
        )}
    </div>;
}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/movies/new" element={<h1>New movie</h1>}/>
            <Route path="/movies" element={<h1><NewListMovies/></h1>}/>
        </Routes>
    </BrowserRouter>;
}




ReactDOM.render(
    <Application/>,
    document.getElementById("app")

);
