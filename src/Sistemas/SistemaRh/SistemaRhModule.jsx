import { Component } from "react";
import SistemaRhMain from "./SistemaRhMain";
import Header from "../../components/Header";


export default class SistemaRhModule extends Component {



    render() {
        return (
            <section className=" flex flex-col w-full h-screen">
                <Header />
                <SistemaRhMain />
               
            </section>
        )
    }
}