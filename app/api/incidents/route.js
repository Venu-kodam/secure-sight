import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get('resolved');

    console.log('Fetching incidents with resolved filter:', resolved);

    const incidents = await prisma.incident.findMany({
      where: {
        resolved: resolved === 'true' ? true : resolved === 'false' ? false : undefined
      },
      include: {
        camera: true
      },
      orderBy: {
        tsStart: 'desc'
      }
    });

    console.log('Found incidents:', incidents.length);

    return Response.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return Response.json({ 
      error: 'Failed to fetch incidents',
      details: error.message 
    }, { status: 500 });
  }
}