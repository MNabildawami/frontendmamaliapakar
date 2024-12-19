import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"; // Mengimpor Button dari Material UI

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home"); // Menggunakan hook navigate untuk berpindah halaman
  };

  return (
    <header className="flex items-center justify-center min-h-screen bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-secondaryBlack">
      <div className="text-center px-5 py-12 sm:py-16 lg:py-24 max-w-lg w-full">
        <h1 className="text-3xl font-heading text-gray-800 sm:text-4xl lg:text-5xl">
          Sistem Pakar Mamalia
        </h1>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl lg:text-2xl">
          By Kelompok 2
          Dwi Mahdini
          M.Nabil Dawami
          M,Rafly Wirayudha
        </p>
        <Button
          size="large" // Menetapkan ukuran tombol
          onClick={handleClick} // Fungsi yang dijalankan saat tombol ditekan
          variant="contained" // Tombol dengan gaya 'contained'
          color="primary" // Menetapkan warna tombol sesuai tema
          className="mt-8 h-12 text-base font-heading sm:h-14 sm:text-lg lg:h-16 lg:text-xl"
        >
          Mulai
        </Button>
      </div>
    </header>
  );
}
