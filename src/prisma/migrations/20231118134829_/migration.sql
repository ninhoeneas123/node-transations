-- CreateTable
CREATE TABLE "Deposit" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
