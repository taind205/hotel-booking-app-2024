import TopBar from "@/components/client/TopBar";
import { RoomList } from "@/components/server/RoomList";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SearchParams = {[key:string]:string|undefined};
export default async function Home(props:{searchParams:SearchParams}) {

  // const locations = await prisma.location.findMany({select:{id:true,name:true}})
  const locations = data; // fix err while deploying
  console.log(props.searchParams);
  return (
    <main className="view-screen">
      <TopBar locationSearchData={locations}/>
      <RoomList searchParams={props.searchParams}/>
    </main>
  );
}

const data = [
  {
    "id": 0,
    "name": "Ho Chi Minh City",
  },
  {
    "id": 1,
    "name": "Hanoi",
  },
  {
    "id": 2,
    "name": "Da Nang",
  },
  {
    "id": 3,
    "name": "Can Tho",
  },
  {
    "id": 4,
    "name": "Hai Phong",
  },
  {
    "id": 5,
    "name": "Ha Long",
  },
  {
    "id": 6,
    "name": "Nha Trang",
  },
  {
    "id": 7,
    "name": "Vung Tau",
  },
  {
    "id": 8,
    "name": "Hue",
  },
  {
    "id": 9,
    "name": "Quy Nhon",
  },
  {
    "id": 10,
    "name": "Phu Quoc",
  },
  {
    "id": 11,
    "name": "Hoi An",
  },
  {
    "id": 12,
    "name": "Sapa",
  },
  {
    "id": 13,
    "name": "Dalat",
  },
  {
    "id": 14,
    "name": "Mui Ne",
  },
  {
    "id": 15,
    "name": "Bac Ninh",
  },
  {
    "id": 16,
    "name": "Bac Giang",
  },
  {
    "id": 17,
    "name": "Binh Duong",
  },
  {
    "id": 18,
    "name": "Dong Nai",
  },
  {
    "id": 19,
    "name": "Long An",
  },
  {
    "id": 20,
    "name": "Tien Giang",
  },
  {
    "id": 21,
    "name": "Ben Tre",
  },
  {
    "id": 22,
    "name": "Tra Vinh",
  },
  {
    "id": 23,
    "name": "Ca Mau",
  },
  {
    "id": 24,
    "name": "Bac Lieu",
  },
  {
    "id": 25,
    "name": "Soc Trang",
  },
  {
    "id": 26,
    "name": "An Giang",
  },
  {
    "id": 27,
    "name": "Dong Thap",
  },
  {
    "id": 28,
    "name": "Can Tho City",
  },
  {
    "id": 29,
    "name": "Tuyen Quang",
  },
  {
    "id": 30,
    "name": "Cao Bang",
  },
  {
    "id": 31,
    "name": "Lang Son",
  },
  {
    "id": 32,
    "name": "Ha Giang",
  },
  {
    "id": 33,
    "name": "Lao Cai",
  },
  {
    "id": 34,
    "name": "Dien Bien Phu",
  },
  {
    "id": 35,
    "name": "Son La",
  },
  {
    "id": 36,
    "name": "Lai Chau",
  },
  {
    "id": 37,
    "name": "Hoa Binh",
  },
  {
    "id": 38,
    "name": "Thanh Hoa",
  },
  {
    "id": 39,
    "name": "Nghe An",
  },
  {
    "id": 40,
    "name": "Ha Tinh",
  },
  {
    "id": 41,
    "name": "Quang Binh",
  },
  {
    "id": 42,
    "name": "Quang Tri",
  },
  {
    "id": 43,
    "name": "Thua Thien Hue",
  },
  {
    "id": 44,
    "name": "Da Nang City",
  },
  {
    "id": 45,
    "name": "Quang Nam",
  },
  {
    "id": 46,
    "name": "Quang Ngai",
  },
  {
    "id": 47,
    "name": "Binh Dinh",
  },
  {
    "id": 48,
    "name": "Phu Yen",
  },
  {
    "id": 49,
    "name": "Khanh Hoa",
  },
  {
    "id": 50,
    "name": "Ninh Thuan",
  },
  {
    "id": 51,
    "name": "Binh Thuan",
  },
  {
    "id": 52,
    "name": "Lam Dong",
  },
  {
    "id": 53,
    "name": "Dak Nong",
  },
  {
    "id": 54,
    "name": "Dak Lak",
  },
  {
    "id": 55,
    "name": "Gia Lai",
  },
  {
    "id": 56,
    "name": "Kon Tum",
  },
  {
    "id": 57,
    "name": "Tay Ninh",
  },
  {
    "id": 58,
    "name": "Binh Phuoc",
  },
  {
    "id": 59,
    "name": "Ba Ria - Vung Tau",
  }
]