import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        src="/andhra-pradesh-state--emblem-seeklogo.svg"
        alt="Government of Andhra Pradesh"
        style={{objectFit:"contain"}}
        width={500}
        height={500}
      />
    </div>
  );
}
