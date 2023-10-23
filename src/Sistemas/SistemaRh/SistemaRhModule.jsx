import { Component } from "react";
import ModuleHeader from "../../Header/ModuleHeader";
import SistemaRhMain from "./SistemaRhMain";


export default class SistemaRhModule extends Component {



    render() {
        return (
            <section className=" flex flex-col w-full h-screen">
                <ModuleHeader />
                <SistemaRhMain />
            </section>
        )
    }
}