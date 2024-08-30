import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from "next/link";

const prisma = new PrismaClient();

export async function RoomList(props:{searchParams:{[key:string]:string|undefined}}) {
  const {location, checkin, checkout}:{location?:string, checkin?:string, checkout?:string} = props.searchParams;
  const rooms = await prisma.room.findMany({take:20,include:{location:true},
    where: !Number.isNaN(Number(location)) ? {location:{id:Number(location)}} : undefined });

  return (
    <div className="bg-slate-900 w-full">
      <div className="w-full grid grid-cols-1	xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5
       gap-2 p-2 md:gap-4 md:p-4 xl:gap-6 xl:p-6">
        { rooms.length>0?
        rooms.map(room=><Room key={room.id} {...room}/>)
        : <p className="w-full text-center">No result found</p>}
      </div>
    </div>
  );
}

type Room = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  location_id: number;
}

type Location = {
    id: number;
    name: string;
    description: string;
}

function Room(props:Room&{location:Location}){
  return(
    <Link href={`./room/${props.id}`}>
    <Card className="max-w-80">
      <div className="h-48 w-full">
        <div className="relative h-full">
          <Image
            fill
            className="object-cover"
            alt="Room Image"
            src={props.image_url}
          />
          </div>
      </div>
      <CardContent className="p-1 m-1">
        <Typography gutterBottom variant="h5" component="h3" className="truncate">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="line-clamp-2">
          {props.description}
        </Typography>
      </CardContent>
      <div className="flex justify-around items-center p-2">
        <b>{props.price} USD</b>
        <div className="flex">
          <LocationOnIcon className="text-red-500"/>
          <p>{props.location.name}</p>
        </div>
      </div>
    </Card>
    </Link>
  )
}