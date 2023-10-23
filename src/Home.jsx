import { Component } from "react";
import ModuleHeader from "./Header/ModuleHeader";
import ModuleMain from "./Main/ModuleMainHome";

// A Home como nome ja diz é a pagina principal onde se encontra todos os sistemas, nela como todos os objetos que você verá por aqui tera modulos importados como o ModuleHeader responsavel pelo header do site.

// Dito isso é bom dizer que se quiser alterar algo no header, não irá precisar mudar em varios lugares, é so ir no header modulo e alterar o que você quiser.
export class Home extends Component {
  
  render() {
    return (
      <section>
        <ModuleHeader />
        <ModuleMain />
      </section>
    );
  }
}
