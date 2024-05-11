import CloseButton from '@/assets/close.png';
import LoadingIcon from '@/assets/loadingIcon.svg'

import Logo from "@/components/logo";
import Input from "@/components/input";
import ButtonWithStyle from "@/components/buttonWithStyle";
import LinkWithoutStyle from "@/components/linkWithoutStyle";

import toast from 'react-hot-toast';

import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from 'react';
import { useAuth } from '@/context/authContext';
import Sign from '@/components/sign';

export default function index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(e: FormEvent){
    e.preventDefault();
    setIsSubmitting(true);

    register(name, email, password).then(() => {
      toast.success('Registro efetuado com sucesso!');

      setTimeout(() => {
        navigate('/sign-in', {replace: true});
        setIsSubmitting(false)
      }, 2000)
    }).catch(() => {
      toast.error('Erro ao efetuar o registro!');
      setIsSubmitting(false)
    });
  }


  return (
    // BACKGROUND IMAGE DIV ONLY
    <div className="h-screen bg-backgroundGeneral bg-no-repeat bg-cover">
      {/* MAIN / BODY */}
      <main className="flex flex-col absolute w-screen h-screen backdrop-brightness-50 backdrop-blur-sm">
        <section className="flex flex-row items-center justify-center h-full w-full">
          <Sign title='Criar conta'>
            {/* FORMS */}
            <form onSubmit={handleRegister} className="flex flex-col items-center mb-8 gap-4 w-full">
              <Input onChange={e => setName(e.target.value)} type="text" required>
                Nome Completo
              </Input>
              <Input onChange={e => setEmail(e.target.value)} type="email" required>
                E-mail
              </Input>
              <Input onChange={e => setPassword(e.target.value)} type="password" required>
                Password
              </Input>
              <ButtonWithStyle disabled={isSubmitting}>{isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <img src={LoadingIcon} className="h-5 w-5 animate-spin fill-white" />
                  Aguarde...
                </span>
              ) : ('Criar conta')}</ButtonWithStyle>
            </form>

            {/* FOOTER */}
            {!isSubmitting && (
            <div>
              <p className="text-sm text-zinc-500">
                Já tem uma conta?{" "}
                <LinkWithoutStyle path="/sign-in" underline>Entrar</LinkWithoutStyle>
              </p>
            </div>
            )}
          </Sign>
        </section>
      </main>
    </div>
  );
}
