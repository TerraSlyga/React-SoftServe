import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch } from "../../redux/reducers/cinema";
import { logOutAccount } from "../../redux/reducers/user";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.user);

  const handleChange = (e) => {
    dispatch(changeSearch(e.target.value));
  };

  return <header className="header"></header>;
};

export default Header;
