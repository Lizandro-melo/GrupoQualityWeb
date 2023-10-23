import { Component } from "react";
import Logo from "../img/medalha.png";
import { Link } from "react-router-dom";

export default class LogoGQ extends Component {
  render() {
    return (
      <Link to="/home">
        <img src={Logo} className="w-14 ml-2" alt="Logo Grupo Quality" />
      </Link>
    );
  }
}
