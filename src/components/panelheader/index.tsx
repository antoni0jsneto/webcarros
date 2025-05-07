import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import toast from "react-hot-toast";

export function DashboardHeader() {
  async function handleLogout() {
    await signOut(auth);
    toast.success("Obrigado por usar o WebCarros. Volte sempre!");
  }

  return (
    <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
      <Link className="cursor-pointer" to="/dashboard">
        Dashboard
      </Link>
      <Link className="cursor-pointer" to="/dashboard/new">
        Cadastrar Carro
      </Link>

      <button className="ml-auto cursor-pointer" onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
}
