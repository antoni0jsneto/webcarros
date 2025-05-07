import { FiTrash2 } from "react-icons/fi";
import { Container } from "../../components/container";
import { DashboardHeader } from "../../components/panelheader";
import {
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db, storage } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

interface CarsProps {
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
  uid: string;
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Dashboard() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) return;

      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

      getDocs(queryRef).then((snapshot) => {
        const listcars = [] as CarsProps[];

        snapshot.forEach((doc) => {
          listcars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid,
          });
        });

        setCars(listcars);
      });
    }

    loadCars();
  }, [user]);

  async function handleDeleteCar(car: CarsProps) {
    if (window.confirm("Deseja realmente deletar este veículo?")) {
      const docRef = doc(db, "cars", car.id);
      await deleteDoc(docRef);

      car.images.map(async (image) => {
        const imagePath = `images/${image.uid}/${image.name}`;
        const imageRef = ref(storage, imagePath);

        try {
          await deleteObject(imageRef);
          toast.success("Veículo deletado com sucesso!");
        } catch (error) {
          console.log(error);
          toast.error("Erro ao deletar o veículo.");
        }
      });

      setCars(cars.filter((item) => item.id !== car.id));
    }
  }

  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  return (
    <Container>
      <DashboardHeader />
      <main className="grid gris-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        {cars.map((car) => (
          <section key={car.id} className="w-full bg-white rounded-lg relative">
            <button
              onClick={() => handleDeleteCar(car)}
              className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center top-2 right-2 drop-shadow cursor-pointer hover:bg-gray-100"
            >
              <FiTrash2 size={26} color="#000" />
            </button>
            <div
              className="w-full h-72 rounded-lg bg-slate-200 flex items-center justify-center"
              style={{
                display: loadImages.includes(car.id) ? "none" : "flex",
              }}
            >
              <span className="text-zinc-500 font-medium">SEM IMAGEM</span>
            </div>
            <img
              className="w-full rounded-lg mb-2 max-h-70 object-cover"
              src={car.images[0].url}
              alt={car.name}
              onLoad={() => handleImageLoad(car.id)}
              style={{
                display: loadImages.includes(car.id) ? "block" : "none",
              }}
            />
            <p className="font-bold mt-1 px-2 mb-2">{car.name}</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-700">
                Ano {car.year} | Km {car.km}
              </span>
              <strong className="text-black font-bold mt-4">
                R$ {car.price.toLocaleString("pt-BR")}
              </strong>
            </div>

            <div className="w-full h-px bg-slate-200 my-2"></div>

            <div className="px-2 pb-2">
              <span className="text-zinc-700">{car.city}</span>
            </div>
          </section>
        ))}
        {cars.length === 0 && loadImages.length === 0 && (
          <span className="text-zinc-700">Nenhum carro cadastrado</span>
        )}
      </main>
    </Container>
  );
}
