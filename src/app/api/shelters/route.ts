// File: app/api/shelters/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { checkAdminSession } from '@/lib/checkAdminSession';

// GET all shelters
export async function GET(request: Request) {
  try {
    const { authorized, response } = await checkAdminSession(request);
    if (!authorized) return response;

    const sheltersSnapshot = await getDocs(collection(db, 'shelters'));
    const shelters = sheltersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(shelters, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar abrigos' }, { status: 500 });
  }
}

// POST create a new shelter
export async function POST(request: Request) {
  try {
    const { authorized, response } = await checkAdminSession(request);
    if (!authorized) return response;

    const data = await request.json();
    const docRef = doc(db, 'shelters', data.id);

    const shelterData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      whatsapp: data.whatsapp,
      address: data.address,
      capacity: data.capacity,
      status: data.status,
      is_contact_done: data.is_contact_done || false,
      admin_contacter: data.admin_contacter || '',
    };

    await setDoc(docRef, shelterData);

    return NextResponse.json({ message: 'Abrigo criado com sucesso' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao criar abrigo' }, { status: 500 });
  }
}
