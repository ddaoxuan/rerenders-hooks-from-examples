import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Link href="/appliances">Appliances</Link>
      <br />
      <Link href="/audio">Audio</Link>
      <br />
      <Link href="/Video Games">Video Games</Link>
      <br />
      <Link href="/Cameras & Camcorders">Cameras & Camcorders</Link>
    </div>
  );
};

export default Page;
