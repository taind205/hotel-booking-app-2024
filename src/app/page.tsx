import TopBar from "@/components/client/TopBar";
import { RoomList } from "@/components/server/RoomList";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SearchParams = {[key:string]:string|undefined};
export default async function Home(props:{searchParams:SearchParams}) {

  const locations = await prisma.location.findMany({select:{id:true,name:true}})
  console.log(props.searchParams);
  return (
    <main className="view-screen">
      <TopBar locationSearchData={locations}/>
      <RoomList searchParams={props.searchParams}/>
    </main>
  );
}
