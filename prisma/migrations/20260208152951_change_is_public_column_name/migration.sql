/*
  Warnings:

  - You are about to drop the column `isPublic` on the `comments` table. All the data in the column will be lost.
  - Added the required column `type` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "isPublic",
ADD COLUMN     "type" "CommentType" NOT NULL;
