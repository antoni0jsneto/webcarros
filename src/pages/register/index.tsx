import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../../public/assets/images/logo.svg";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const { handleInfoUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });

        handleInfoUser({
          name: data.name,
          email: data.email,
          uid: user.user.uid,
        });
        toast.success("Bem vindo(a) ao WebCarros!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao fazer o cadastro.");
      });
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
        <Link className="mb-6 max-w-sm w-full" to="/">
          <img className="w-full" src={logoImg} alt="Logo da WebCarros" />
        </Link>
        <form
          className="bg-white max-w-xl w-full rounded-lg p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Digite seu nome completo..."
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite seu email..."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium hover:bg-zinc-800 cursor-pointer transition-all duration-300 ease-in-out"
          >
            Acessar
          </button>
        </form>

        <Link to="/login" className="">
          Já possui uma conta? Faça o login!
        </Link>
      </div>
    </Container>
  );
}
