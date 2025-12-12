import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const items = await db.collection('items').find({}).toArray();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('items').insertOne(data);
  return NextResponse.json({ insertedId: result.insertedId });
}
