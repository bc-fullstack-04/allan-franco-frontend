import CloseButton from '@/assets/close.png';
import LoadingIcon from '@/assets/loadingIcon.svg'

import Logo from "@/components/logo";
import Input from "@/components/input";
import ButtonWithStyle from "@/components/buttonWithStyle";
import LinkWithoutStyle from "@/components/linkWithoutStyle";
import MainBackground from '@/components/mainBackground';

import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from '@/context/authContext';
import Sign from '@/components/sign';

export default function index() {
  const { login, createdEmail } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(createdEmail || "");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(e: FormEvent){
    e.preventDefault();
    setIsSubmitting(true);

    login(email, password).then(() => {
      toast.success('Login efetuado com sucesso!');

      setTimeout(() => {
        navigate('/profile', {replace: true});
        setIsSubmitting(false)
      }, 2000)
    }).catch(() => {
      toast.error('Erro ao efetuar o login!');
      setIsSubmitting(false)
    });
  }

  return (
    <MainBackground blur={true}>
        {/* MAIN / BODY */}
        <main className="flex flex-col w-full h-full ">
          <section className="flex flex-row items-center justify-center h-full w-full relative">
            <Sign title='Acesse sua conta'>
              {/* FORMS */}
              <form onSubmit={handleLogin} className="flex flex-col relative items-center mb-8 gap-4 w-full">
                <Input onChange={e => setEmail(e.target.value)} type="email" value={email} required>E-mail</Input>
                <Input onChange={e => setPassword(e.target.value)} type="password" required>Password</Input>
                <ButtonWithStyle disabled={isSubmitting}>{isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <img src={LoadingIcon} className="h-5 w-5 animate-spin fill-white" />
                    Aguarde...
                  </span>
                ) : ('Entrar')}</ButtonWithStyle>
              </form>
              
              {!isSubmitting && (
                  <div>
                    <p className="text-sm text-zinc-500">
                      Ainda não tem uma conta?{" "}
                      <LinkWithoutStyle path="/sign-up" underline>Inscrever-se</LinkWithoutStyle>
                    </p>
                  </div>
              )}
            </Sign>
          </section>
        </main>
    </MainBackground>
  );
}