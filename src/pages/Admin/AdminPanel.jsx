import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminFilms from "./AdminFilms/AdminFilms";
import AdminUsers from "./AdminUsers/AdminUsers";

const AdminPanel = () => {
  const [filmsShow, setFilmsShow] = useState("films");

  return <section className="admin"></section>;
};

export default AdminPanel;
