import { FormDataType } from "@/components/client/BookingForm";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type BookingInput = {
    id?:number
    room_id: number;
    user_id: number;
    customer_id: number;
    check_in_date: Date;
    check_out_date: Date;
    total_price: number;
}

type Customer_Input = {
    id?:number,
    firstname:string,
    lastname:string,
    email:string,
    phone:string,
    user_id:number
}

export async function POST(request: Request) {
    const data:Omit<FormDataType,'checkInDate'|'checkOutDate'>&{checkInDate:string, checkOutDate:string} = await request.json();
    console.log(data);
    try {
        if(!data.checkInDate || !data.checkOutDate || !data.roomId || !data.userId) return Response.error();
        const customerInput:Customer_Input = {
            id:Date.now()/1000,
            firstname:data.firstName,
            lastname:data.lastName,
            email:data.email,
            phone:data.phone,
            user_id:Number(data.userId)
        }
        const insertedCustomer = await prisma.customer.create({data:customerInput});
        const room = await prisma.room.findUnique({where:{id:data.roomId}});
        if(!room || !insertedCustomer) return Response.error();
        const total_price = Math.ceil((new Date(data.checkOutDate).getTime()-new Date(data.checkInDate).getTime())/1000/60/60/24)*room?.price;
        if(!total_price) return Response.error();

        const bookingInput:BookingInput = {
            id:Date.now()/1000,
            user_id:data.userId,
            room_id:data.roomId,
            check_in_date:new Date(data.checkInDate),
            check_out_date:new Date(data.checkOutDate),
            customer_id:insertedCustomer.id,
            total_price: total_price,
        }
        const inserted = await prisma.booking.create({data:bookingInput})
        console.log('insert:',inserted);
        if(inserted.id)
        return Response.json({msg:"ok"});
      } catch (error) {
        console.error(error);
        return Response.error();
      }
   
    return Response.json({ data })
  }