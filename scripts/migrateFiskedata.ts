import { connectMongo } from "../app/data/mongodb";
import { FangstModel, FishingModel } from "../app/data/mongoFishingModel";

async function migrateFiskeData() {
  await connectMongo();

  const allUsers = await FishingModel.find({});

  for (const user of allUsers) {
    const userId = user._id;

    for (const fangst of user.fiskeData) {
      // Tilføj userId til hver fangst
      const newFangst = {
        ...fangst.toObject(), // sikrer vi har plain object
        userId,
      };

      // Gem i ny kollektion
      await FangstModel.create(newFangst);
    }

    // (Valgfrit) Ryd gamle fiskeData-array:
    user.fiskeData = [];
    await user.save();
  }

  console.log("Migrering færdig ✅");
}

migrateFiskeData()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Fejl under migrering:", err);
    process.exit(1);
  });
