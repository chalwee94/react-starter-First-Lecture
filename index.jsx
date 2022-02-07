import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";

const MOVIES = [
    {
        title: "When They See Us",
        plot: " is a 2019 American crime drama television miniseries created, co-written, and directed by Ava DuVernay for Netflix, that premiered in four parts on May 31, 2019. It is based on events of the 1989 Central Park jogger case and explores the lives and families of the five Black and Latino male suspects who were falsely accused then prosecuted on charges related to the rape and assault of a white woman in Central Park, New York City. The series features an ensemble cast, including Jharrel Jerome, Asante Blackk, Jovan Adepo, Michael K. Williams, Logan Marshall-Green, Joshua Jackson, Blair Underwood, Vera Farmiga, John Leguizamo, Felicity Huffman, Niecy Nash, Aunjanue Ellis, Marsha Stephanie Blake, and Kylie Bunbury",
        year: 2019
    },
    {
        title: "De urørlige",
        plot: "De urørlige er en oppløftende komedie om vennskap, tillit og menneskelige muligheter, og er den sanne historien om to menn som aldri skulle ha møtt hverandre.",
        year: 2011

    }
];
function FrontPage() {
    return <div>
        <h1>my react movies</h1>
        <ul>
            <li><Link to="/movies">List movies</Link></li>
            <li><Link to="/movies/new">New Movie</Link></li>
        </ul>
    </div>;
}
function ListMovies({movies}) {
    return <div>
        <h1>List movies</h1>
        {movies.map(m =>
            <div key={m.title}>
                <h2>{m.title} ({m.year})</h2>
                <div>{m.plot}</div>
            </div>
        )}
    </div>;
}


function Newmovie() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        MOVIES.push({title, year, plot});
}
    return <form onSubmit={handleSubmit}>
        <h1>New movie</h1>
        <div>
            <label>Title: <input value={title} onChange={e => setTitle(e.target.value)} /></label>
        </div>
        <div>
            <label>Year: <input value={year} onChange={e => setYear(e.target.value)} /></label>
        </div>
        <div>
            <label>Plot: <textarea value={plot} onChange={e => setPlot(e.target.value)} /></label>
        </div>
        <button>Submit</button>
        <pre>
            {JSON.stringify({title, year, plot})}
        </pre>
    </form>;
}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/movies/new" element={<Newmovie/>}/>
            <Route path="/movies" element={<ListMovies movies={MOVIES}/>}/>
        </Routes>
    </BrowserRouter>;
}
ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);