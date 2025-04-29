import MovieCard from "../components/MovieCard/MovieCard";

const mockMovies = [
  {
    id: 1,
    title: "Minecraft: The Movie",
    posterUrl: "https://via.placeholder.com/200x300?text=Minecraft",
    year: 2025,
    rating: 8.5,
  },
  {
    id: 2,
    title: "Фатальний місяць",
    posterUrl: "https://via.placeholder.com/200x300?text=Фатальний+Місяць",
    year: 2024,
    rating: 7.8,
  },
  {
    id: 3,
    title: "Квітка Карпат",
    posterUrl: "https://via.placeholder.com/200x300?text=Квітка+Карпат",
    year: 2024,
    rating: 8.1,
  },
  {
    id: 4,
    title: "Minecraft: The Movie",
    posterUrl: "https://via.placeholder.com/200x300?text=Minecraft",
    year: 2025,
    rating: 8.5,
  },
  {
    id: 5,
    title: "Фатальний місяць",
    posterUrl: "https://via.placeholder.com/200x300?text=Фатальний+Місяць",
    year: 2024,
    rating: 7.8,
  },
  {
    id: 6,
    title: "Квітка Карпат",
    posterUrl: "https://via.placeholder.com/200x300?text=Квітка+Карпат",
    year: 2024,
    rating: 8.1,
  },
];

export default function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      {/* Header */}
      <header className="navbar navbar-dark bg-secondary p-3">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">SiteName</span>
          <div>
            <button className="btn btn-outline-light me-2">🔍</button>
            <button className="btn btn-outline-light me-2">👤</button>
            <button className="btn btn-outline-light">☰</button>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section
        className="bg-light text-center"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1200x300')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        {/* Банер */}
      </section>

      {/* Body */}
      <main className="container my-4">
        <h2 className="mb-4">Зараз у кіно</h2>

        <div className="row g-4">
          {mockMovies.map((movie) => (
            <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white mt-auto p-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>SiteName</h5>
              <p>© {new Date().getFullYear()} Всі права захищено</p>
            </div>
            <div className="col-md-6 text-md-end">
              <h6>Наші соцмережі:</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white">
                    Link1
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Link2
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white">
                    Link3
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
