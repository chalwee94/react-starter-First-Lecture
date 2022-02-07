import * as React from "react";
import {useState} from "react";
import {useState, useEffect} from "react";
import * as ReactDOM from "react-dom";
import {Routes, Route, Link, BrowserRouter, useNavigate} from "react-router-dom";

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
function ListMovies({moviesApi}) {
    const [movies, setMovies] = useState();
    useEffect(async () => {
        console.log("hello");
        setMovies(undefined);
        setMovies(await moviesApi.listMovies());
    }, []);

    if (!movies) {
        return  <div>Loading...</div>
    }
}
function Newmovie({moviesApi}) {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    const navigate = useNavigate();



        async function handleSubmit(e) {
            e.preventDefault();
            onAddmovie({title, year, plot});
            await moviesApi.onAddMovie({title, year, plot});
            navigate("/");
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
    const moviesApi = {
        onAddMovie: async (m) =>  MOVIES.push(m),
        listMovies: async () => MOVIES
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}/>
            <Route path="/movies/new" element={<Newmovie onAddMovie={m => MOVIES.push(m)}/>}/>
            <Route path="/movies" element={<ListMovies movies={MOVIES}/>}/>
            <Route path="/movies/new" element={<Newmovie moviesApi={moviesApi}/>}/>
            <Route path="/movies" element={<ListMovies moviesApi={moviesApi}/>}/>
        </Routes>
    </BrowserRouter>;
}
ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);