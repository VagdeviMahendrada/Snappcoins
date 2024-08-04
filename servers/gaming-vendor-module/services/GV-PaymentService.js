import { MongoClient } from "mongodb";

export async function performTransaction(
  vendor_id,
  vendor_coins,
  transaction_id,
  transaction_status
) {
  console.log("Entered the performTransaction function");

  const uri = process.env.ATLAS_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const session = client.startSession();

    try {
      session.startTransaction();
      const db = client.db("test");

      const collection1Query = { vendor_id: vendor_id };
      const collection1Update = { $inc: { vendor_coins: vendor_coins } };
      await db.collection("gaming_vendor_wallets").updateOne(collection1Query, collection1Update, { session });

      const collection2Query = { transaction_id: transaction_id };
      const collection2Update = {
        $set: {
          transaction_status: transaction_status,
        },
      };
      await db.collection("gaming_vendor_transactions").updateOne(collection2Query, collection2Update, { session, upsert: true });

      const collection3Query = { transaction_id: transaction_id };
      const collection3Update = {
        $set: {
          transaction_status: transaction_status,
        },
      };
      await db.collection("snappcoin-bank").updateOne(collection3Query, collection3Update, { session, upsert: true });

      await session.commitTransaction();
    } catch (error) {
      console.error("Error updating collections:", error);
      if (error.errorLabels && error.errorLabels.includes("TransientTransactionError")) {
        console.log("Transient transaction error occurred. Retrying transaction...");
        await session.abortTransaction();
        // Implement retry logic here, such as exponential backoff
      } else {
        await session.abortTransaction();
      }
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}


export async function updateTransactionStatus(
  transaction_id,
  transaction_status
) {
  const uri = process.env.ATLAS_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const session = client.startSession();

    try {
      session.startTransaction();
      const db = client.db("test");

      const collection2Query = { transaction_id: transaction_id };
      const collection2Update = {
        $set: {
          transaction_status: transaction_status,
        },
      };
      await db.collection("gaming_vendor_transactions").updateOne(
        collection2Query,
        collection2Update,
        { session, upsert: true }
      );

      const collection3Query = { transaction_id: transaction_id };
      const collection3Update = {
        $set: {
          transaction_status: transaction_status,
        },
      };
      await db.collection("snappcoin-bank").updateOne(
        collection3Query,
        collection3Update,
        { session, upsert: true }
      );

      await session.commitTransaction();
    } catch (error) {
      console.error("Error updating collections:", error);
      if (
        error.errorLabels &&
        error.errorLabels.includes("TransientTransactionError")
      ) {
        console.log("Transient transaction error occurred. Retrying transaction...");
        await session.abortTransaction();
        // Implement retry logic here, such as exponential backoff
      } else {
        await session.abortTransaction();
      }
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}
