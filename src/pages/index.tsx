import {Inter} from "next/font/google";
import "@/styles/Home.module.css";
import ImageUpload from "@/components/image-upload/ImageUpload";
import Banner from "@/components/banner/Banner";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  return (
    <main className={inter.className}>
      <Banner />
      <ImageUpload />
    </main>
  );
}
