// app/api/signup/route.ts
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = "mongodb+srv://mongodb:Nilesh123@mydatabase.sgxomt2.mongodb.net/"
//process.env.MONGODB_URI;
const client = new MongoClient(uri!);

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  
  try {
    await client.connect();
    const db = client.db("mydb");
    const collection = db.collection("mytable");

    await collection.insertOne({ name, email, password });
    return NextResponse.json({ message: 'User added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Failed to add user' }, { status: 500 });
  } finally {
    await client.close();
  }
}
