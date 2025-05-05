import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import movieService from "../../services/movieService"; // для API
import "/src/pages/HomePage/HomePage.css";
import Slider from "../../components/Slider/Slider"; // Імпорт компонента Slider


export default function HomePage() {
  const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Тимчасове мокове наповнення
        setMovies([
            {
                id: "1",
                title: "Dune: Part Two",
                description: "Paul Atreides unites with Chani and the Fremen to seek revenge.",
                posterUrl: "https://m.media-amazon.com/images/I/71A5bgOjgQL._AC_SY679_.jpg",
                rating: 8.9,
            },
            {
                id: "2",
                title: "Oppenheimer",
                description: "The story of J. Robert Oppenheimer and the atomic bomb.",
                posterUrl: "https://m.media-amazon.com/images/I/81zXG2UQVEL._AC_SY679_.jpg",
                rating: 9.0,
            },
            {
                id: "3",
                title: "Barbie",
                description: "Barbie suffers a crisis that leads her to the real world.",
                posterUrl: "https://m.media-amazon.com/images/I/61V1j5FhGFL._AC_SY679_.jpg",
                rating: 7.3,
            },
            {
                id: "4",
                title: "Avatar: The Way of Water",
                description: "Jake Sully lives with his new family on Pandora.",
                posterUrl: "https://m.media-amazon.com/images/I/91wDRL+glzL._AC_SY679_.jpg",
                rating: 7.7,
            },
            {
                id: "5",
                title: "John Wick: Chapter 4",
                description: "John Wick uncovers a path to defeating The High Table.",
                posterUrl: "https://m.media-amazon.com/images/I/91m+VVhrMIL._AC_SY679_.jpg",
                rating: 8.2,
            },
            {
                id: "6",
                title: "The Batman",
                description: "Batman uncovers corruption in Gotham while pursuing the Riddler.",
                posterUrl: "https://m.media-amazon.com/images/I/71vZxchNTgL._AC_SY679_.jpg",
                rating: 8.1,
            },
            {
                id: "7",
                title: "Spider-Man: No Way Home",
                description: "Peter Parker seeks Doctor Strange's help to fix his identity reveal.",
                posterUrl: "https://m.media-amazon.com/images/I/71YX1TyG7KL._AC_SY679_.jpg",
                rating: 8.5,
            },
            {
                id: "8",
                title: "Top Gun: Maverick",
                description: "Maverick trains elite graduates for a special mission.",
                posterUrl: "https://m.media-amazon.com/images/I/81U-J0wM9-L._AC_SY679_.jpg",
                rating: 8.6,
            },
            {
                id: "9",
                title: "Guardians of the Galaxy Vol. 3",
                description: "The Guardians face new enemies and Rocket's past.",
                posterUrl: "https://m.media-amazon.com/images/I/81YY5pD+sTL._AC_SY679_.jpg",
                rating: 8.0,
            },
            {
                id: "10",
                title: "The Super Mario Bros. Movie",
                description: "Mario travels through the Mushroom Kingdom.",
                posterUrl: "https://m.media-amazon.com/images/I/71QkjmcWSML._AC_SY679_.jpg",
                rating: 7.1,
            },
            {
                id: "11",
                title: "Wonka",
                description: "The origin story of the world's most famous chocolatier.",
                posterUrl: "https://m.media-amazon.com/images/I/81mNu3SwRwL._AC_SY679_.jpg",
                rating: 7.5,
            },
            {
                id: "12",
                title: "The Marvels",
                description: "Carol Danvers, Kamala Khan, and Monica Rambeau team up.",
                posterUrl: "https://m.media-amazon.com/images/I/81tOlZ0jeNL._AC_SY679_.jpg",
                rating: 6.2,
            },
            {
                id: "13",
                title: "Mission: Impossible – Dead Reckoning",
                description: "Ethan Hunt faces AI threats across the globe.",
                posterUrl: "https://m.media-amazon.com/images/I/81E14ZCydcL._AC_SY679_.jpg",
                rating: 7.8,
            },
            {
                id: "14",
                title: "Killers of the Flower Moon",
                description: "A murder mystery in the Osage Nation of the 1920s.",
                posterUrl: "https://m.media-amazon.com/images/I/71Ln5LRYcdL._AC_SY679_.jpg",
                rating: 8.2,
            },
            {
                id: "15",
                title: "Napoleon",
                description: "The story of Napoleon Bonaparte’s rise to power.",
                posterUrl: "https://m.media-amazon.com/images/I/71nHygeADHL._AC_SY679_.jpg",
                rating: 7.0,
            },
        ]);
    }, []);

    return (
        <main className="homepage">
            <Slider />

            <section className="homepage__section">
                <h2 className="homepage__title">Зараз у кіно</h2>
                <div className="homepage__grid">
                    {movies.map((movie) => (
                        <div key={movie.id} className="homepage__grid-item">
                            <MovieCard movie={movie}>
                                <Link to={`/movies/${movie.id}`} className="movie-card__button">
                                    Детальніше
                                </Link>
                            </MovieCard>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
