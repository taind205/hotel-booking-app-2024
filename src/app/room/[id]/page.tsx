import { PrismaClient } from "@prisma/client";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BookingForm } from "@/components/client/BookingForm";

const prisma = new PrismaClient();

export default async function Page({ params }: { params: { id: string } }) {
    const room = await prisma.room.findUnique({where:{id:Number(params.id)},include:{bookings:true,location:true},});

    return (
    <main className="view-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center place-items-center	">
        {room? <Room {...room}/>
        :
        <p>404 - Not found</p>}
        <BookingForm price={room?.price||0} roomId={Number(params.id)} userId={1}/>
        </div>
    </main>
    )
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
      <Card className="max-w-96">
        <div className="h-96 w-full">
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
          <Typography gutterBottom variant="h5" component="h3">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
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
  
    )
  }
