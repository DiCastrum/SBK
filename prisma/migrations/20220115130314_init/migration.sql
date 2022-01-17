/*
  Warnings:

  - You are about to drop the column `venuesId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the `Venues` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `venueId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_venuesId_fkey";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "venuesId",
ADD COLUMN     "venueId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Venues";

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "styles" TEXT[],
    "venueType" TEXT[],
    "contact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postedBy" TEXT NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
