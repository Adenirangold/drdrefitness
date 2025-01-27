import connectToDatabase from "@/lib/database";

export default async function Home() {
   await connectToDatabase()
  return (
    <>
      <main>
        <div>road</div>
      </main>
    </>
  );
}
