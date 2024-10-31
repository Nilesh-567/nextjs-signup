// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://mongodb:Nilesh123@mydatabase.sgxomt2.mongodb.net/");

async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db("mydb"); // Replace with your database name
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const db = await connectToDatabase();
      const { name, email, password } = req.body;

      // Insert the data into the "users" collection (create the collection if it doesn’t exist)
      const result = await db.collection("mytable").insertOne({ name, email, password });

      if (result.insertedId) {
        res.status(200).json({ message: "Signup successful!" });
      } else {
        res.status(500).json({ message: "Signup failed." });
      }
    } catch (error) {
      console.error("Database connection error:", error);
      res.status(500).json({ message: "Database connection failed." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
