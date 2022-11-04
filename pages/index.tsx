import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Link href="/Appliances">Appliances</Link>
      <br />
      <Link href="/Audio">Audio</Link>
      <br />
      <Link href="/Video%20Games">Video Games</Link>
      <br />
      <Link href="/Cameras%20%26%20Camcorders">Cameras & Camcorders</Link>
    </div>
  );
};

export default Page;
