-- CreateTable
CREATE TABLE "Tech" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "index" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "stage" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tech_index_key" ON "Tech"("index");
