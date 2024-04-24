import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-full flex gap-2 flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Trolde fishing</h1>
      <p className="text-xl">Fishing App til at track de største og sejeste fisk</p>
      <p className="text-sm text-gray-700">Coming soon...</p>
    </div>
  );
}
