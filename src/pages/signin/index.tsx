import CloseButton from '@/assets/close.png';
import LoadingIcon from '@/assets/loadingIcon.svg'

import Logo from "@/components/logo";
import Input from "@/components/input";
import ButtonWithStyle from "@/components/buttonWithStyle";
import LinkWithoutStyle from "@/components/linkWithoutStyle";

import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from '@/context/authContext';

export default function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e: FormEvent){
    e.preventDefault();
    setIsSubmitting(true);

    login(email, password).then(() => {
      toast.success('Login efetuado com sucesso!');

      setTimeout(() => {
        navigate('/profile');
        setIsSubmitting(false)
      }, 2000)
    }).catch(() => {
      toast.error('Erro ao efetuar login!');
      setIsSubmitting(false)
    });
  }

  return (
    // BACKGROUND IMAGE DIV ONLY
    <div className="h-screen bg-backgroundGeneral bg-no-repeat bg-cover">
      {/* MAIN / BODY */}
      <main className="flex flex-col absolute w-screen h-screen backdrop-brightness-50 backdrop-blur-sm">
        <section className="flex flex-row items-center justify-center h-full w-full">
          {/* CONTENT */}
          <div className="flex flex-col items-center justify-center relative bg-white w-[420px] h-fit rounded-3xl shadow-lg px-12 py-4">
            {/* CLOSE BUTTON */}
            <div className="flex items-center justify-end w-full h-fit">
              <Link to="/" className="absolute top-0 right-0 p-4"><img src={CloseButton} alt="Close Button" className="p-1 bg-zinc-50 hover:bg-zinc-100 rounded-full" /></Link>
            </div>

            {/* TITLE */}
            <div className="flex flex-col items-center gap-2 w-full py-6">
              <Logo />
              <h1 className="text-2xl font-medium">Acesse sua conta</h1>
            </div>

            {/* FORMS */}
            <form onSubmit={handleLogin} className="flex flex-col relative items-center mb-8 gap-4 w-full">
              <Input onChange={e => setEmail(e.target.value)} type="email" required>E-mail</Input>
              <Input onChange={e => setPassword(e.target.value)} type="password" required>Password</Input>
              <ButtonWithStyle disabled={isSubmitting}>{isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <img src={LoadingIcon} className="h-5 w-5 animate-spin fill-white" />
                  Aguarde...
                </span>
              ) : ('Entrar')}</ButtonWithStyle>
            </form>

            {/* FOOTER */}
            {!isSubmitting && (
                <div>
                  <p className="text-sm text-zinc-500">
                    Ainda não tem uma conta?{" "}
                    <LinkWithoutStyle path="/sign-up" underline>Inscrever-se</LinkWithoutStyle>
                  </p>
                </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
