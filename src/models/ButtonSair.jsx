import { Component } from "react";
import { Link } from "react-router-dom";

export default class ButtonSair extends Component {
  render() {
    return (
      <Link
        to="/home"
        className="absolute left-Button-sair left-2/4 -translate-x-2/4 bg-zinc-200 w-32 h-12 rounded-lg font-semibold flex justify-center items-center cursor-pointer hover:bg-zinc-300 transition-colors"
      >
        <span>Voltar</span>
      </Link>
    );
  }
}
