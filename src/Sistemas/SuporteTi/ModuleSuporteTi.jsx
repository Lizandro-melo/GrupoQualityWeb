import React, { Component } from "react";
import ModuleHeader from "../../Header/ModuleHeader";
import Chamadas from "./Chamadas";

export default class ModuleSuporteTi extends Component {
  render() {
    return (
      <section className={`flex flex-col bg-stone-100 h-screen w-full`}>
        <ModuleHeader />
        <Chamadas />
      </section>
    );
  }
}
