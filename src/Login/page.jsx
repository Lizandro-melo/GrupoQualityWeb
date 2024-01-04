import { useState } from "react";
import EfetuarLogin from "../Controller/cadastro/Authentication";
import ReactModal from "react-modal";

export default function FormLogin() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemError, setmensagemError] = useState("");
  const [modalMensagemError, setModalMensagemError] = useState(false);

  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="plano-fundo-login absolute"></section>
      <ReactModal
        className="bg-transparent"
        isOpen={modalMensagemError}
        onRequestClose={setModalMensagemError}
        shouldCloseOnOverlayClick={false}
      >
        <form className="text-sky-950 z-50 w-1/2 border-2 border-stone-200 bg-white p-20 text-center items-center flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <h2 className="font-semibold mb-6 text-xl">{mensagemError}</h2>
          <button
            onClick={() => setModalMensagemError(true)}
            type="submit"
            className="mt-8 border  border-blue-950 w-32 h-9 m-5 hover:text-white hover:bg-blue-950 transition-colors font-semibold"
          >
            OK
          </button>
        </form>
      </ReactModal>
      <section className="bg-white items-center justify-center max-sm:w-full w-3/5 h-3/4 rounded-xl shadow-2xl shadow-stone-800 spawnModal absolute">
        <form
          onSubmit={(e) =>
            EfetuarLogin(
              e,
              login,
              senha,
              setModalMensagemError,
              setmensagemError
            )
          }
          className="flex justify-center gap-7 flex-col items-center h-full"
        >
          <section>
            <img
              className="w-24"
              src="/icon/profileIcon.svg"
              alt="icon Profile"
            />
          </section>
          <section className="flex flex-col gap-3">
            <section className="flex flex-col gap-0.5">
              <label htmlFor="login">Login</label>
              <input
                placeholder="Digite seu login"
                className="w-72 text-sm max-sm:w-60 outline-none border border-blue-950 h-8 pl-2 peer/login"
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
                value={login}
                id="login"
                type="text"
                required
              />
              {/* <span className="text-red-500 w-0 hidden overflow-hidden whitespace-nowrap">Seu primeiro e ultimo nome</span> */}
            </section>
            <section className="flex flex-col gap-0.5">
              <label htmlFor="senha">Senha</label>
              <input
                placeholder="Digite sua senha"
                className="w-72 text-sm max-sm:w-60 outline-none border border-blue-950 h-8 pl-2"
                onChange={(e) => {
                  setSenha(e.target.value);
                }}
                value={senha}
                id="senha"
                type="password"
                required
              />
            </section>
            <section className="flex justify-center mt-6">
              <button
                className="border w-28 h-9 hover:bg-blue-950 hover:text-white transition-all border-blue-950 active:scale-90 font-bold text-sm"
                type="submit"
              >
                Entrar
              </button>
            </section>
          </section>
        </form>
      </section>
    </main>
  );
}