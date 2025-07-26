import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
  try {
    const { id } = params;

    const incident = await prisma.incident.findUnique({
      where: { id },
      include: { camera: true }
    });

    if (!incident) {
      return Response.json({ error: 'Incident not found' }, { status: 404 });
    }

    const updatedIncident = await prisma.incident.update({
      where: { id },
      data: {
        resolved: !incident.resolved
      },
      include: {
        camera: true
      }
    });

    return Response.json(updatedIncident);
  } catch (error) {
    console.error('Error updating incident:', error);
    return Response.json({ error: 'Failed to update incident' }, { status: 500 });
  }
} 