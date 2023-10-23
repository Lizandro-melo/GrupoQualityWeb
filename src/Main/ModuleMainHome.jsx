import { Component } from "react";
import ModuleSistemas from "./ModuleSistemas";

export default class ModuleMain extends Component {
  render() {
    return (
      <main className="flex justify-center z-0">
        <section className="w-full flex flex-wrap gap-20 justify-center mt-24">
          <ModuleSistemas />
        </section>
      </main>
    );
  }
}
