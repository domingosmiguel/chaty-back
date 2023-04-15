/*
  Warnings:

  - You are about to drop the column `deleteForAll` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `deleteForMe` on the `message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "favoriteMessage" DROP CONSTRAINT "favoriteMessage_messageId_fkey";

-- DropForeignKey
ALTER TABLE "favoriteMessage" DROP CONSTRAINT "favoriteMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "friend" DROP CONSTRAINT "friend_friendId_fkey";

-- DropForeignKey
ALTER TABLE "friend" DROP CONSTRAINT "friend_userId_fkey";

-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "groupConfig" DROP CONSTRAINT "groupConfig_groupId_fkey";

-- DropForeignKey
ALTER TABLE "groupMember" DROP CONSTRAINT "groupMember_groupId_fkey";

-- DropForeignKey
ALTER TABLE "groupMember" DROP CONSTRAINT "groupMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "login" DROP CONSTRAINT "login_userId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_from_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_to_fkey";

-- DropForeignKey
ALTER TABLE "pinnedConversation" DROP CONSTRAINT "pinnedConversation_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "pinnedConversation" DROP CONSTRAINT "pinnedConversation_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "userConfig" DROP CONSTRAINT "userConfig_userId_fkey";

-- AlterTable
ALTER TABLE "message" DROP COLUMN "deleteForAll",
DROP COLUMN "deleteForMe",
ADD COLUMN     "deletedForAll" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedForMe" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "from" DROP NOT NULL,
ALTER COLUMN "to" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pinnedConversation" ALTER COLUMN "recipientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "favoriteMessage" ADD CONSTRAINT "favoriteMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoriteMessage" ADD CONSTRAINT "favoriteMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupConfig" ADD CONSTRAINT "groupConfig_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupMember" ADD CONSTRAINT "groupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupMember" ADD CONSTRAINT "groupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login" ADD CONSTRAINT "login_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_from_fkey" FOREIGN KEY ("from") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_to_fkey" FOREIGN KEY ("to") REFERENCES "recipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinnedConversation" ADD CONSTRAINT "pinnedConversation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinnedConversation" ADD CONSTRAINT "pinnedConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userConfig" ADD CONSTRAINT "userConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
