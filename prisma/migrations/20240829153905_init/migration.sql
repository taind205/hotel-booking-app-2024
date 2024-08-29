/*
  Warnings:

  - You are about to drop the column `amount` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Booking_Detail_Type" AS ENUM ('ACCEPTED_AT', 'REJECTED_AT', 'REJECTED_REASON', 'CANCELED_AT', 'CANCELED_REASON', 'DISCOUNT', 'DISCOUNT_REASON');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "amount",
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Booking_Detail" (
    "booking_id" INTEGER NOT NULL,
    "detail_type" "Booking_Detail_Type" NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Booking_Detail_pkey" PRIMARY KEY ("booking_id","detail_type")
);

-- AddForeignKey
ALTER TABLE "Booking_Detail" ADD CONSTRAINT "Booking_Detail_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
