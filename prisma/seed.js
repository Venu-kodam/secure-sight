import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create cameras
  const camera1 = await prisma.camera.create({
    data: {
      name: 'Camera - 01',
      location: 'Shop Floor Camera A'
    }
  });

  const camera2 = await prisma.camera.create({
    data: {
      name: 'Camera - 02',
      location: 'Vault'
    }
  });

  const camera3 = await prisma.camera.create({
    data: {
      name: 'Camera - 03',
      location: 'Entrance'
    }
  });

  // Create incidents
  const incidents = [
    {
      cameraId: camera1.id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T14:35:00Z'),
      tsEnd: new Date('2025-07-07T14:37:00Z'),
      thumbnailUrl: '/api/placeholder/1',
      resolved: false
    },
    {
      cameraId: camera1.id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T15:20:00Z'),
      tsEnd: new Date('2025-07-07T15:22:00Z'),
      thumbnailUrl: '/api/placeholder/2',
      resolved: false
    },
    {
      cameraId: camera2.id,
      type: 'Gun Threat',
      tsStart: new Date('2025-07-07T16:15:00Z'),
      tsEnd: new Date('2025-07-07T16:17:00Z'),
      thumbnailUrl: '/api/placeholder/3',
      resolved: false
    },
    {
      cameraId: camera3.id,
      type: 'Face Recognised',
      tsStart: new Date('2025-07-07T09:30:00Z'),
      tsEnd: new Date('2025-07-07T09:32:00Z'),
      thumbnailUrl: '/api/placeholder/4',
      resolved: true
    },
    {
      cameraId: camera1.id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T11:45:00Z'),
      tsEnd: new Date('2025-07-07T11:47:00Z'),
      thumbnailUrl: '/api/placeholder/5',
      resolved: false
    },
    {
      cameraId: camera2.id,
      type: 'Gun Threat',
      tsStart: new Date('2025-07-07T13:20:00Z'),
      tsEnd: new Date('2025-07-07T13:22:00Z'),
      thumbnailUrl: '/api/placeholder/6',
      resolved: false
    },
    {
      cameraId: camera3.id,
      type: 'Face Recognised',
      tsStart: new Date('2025-07-07T08:15:00Z'),
      tsEnd: new Date('2025-07-07T08:17:00Z'),
      thumbnailUrl: '/api/placeholder/7',
      resolved: true
    },
    {
      cameraId: camera1.id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T10:30:00Z'),
      tsEnd: new Date('2025-07-07T10:32:00Z'),
      thumbnailUrl: '/api/placeholder/8',
      resolved: false
    },
    {
      cameraId: camera2.id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T12:00:00Z'),
      tsEnd: new Date('2025-07-07T12:02:00Z'),
      thumbnailUrl: '/api/placeholder/9',
      resolved: false
    },
    {
      cameraId: camera3.id,
      type: 'Face Recognised',
      tsStart: new Date('2025-07-07T07:45:00Z'),
      tsEnd: new Date('2025-07-07T07:47:00Z'),
      thumbnailUrl: '/api/placeholder/10',
      resolved: true
    },
    {
      cameraId: camera1.id,
      type: 'Gun Threat',
      tsStart: new Date('2025-07-07T17:30:00Z'),
      tsEnd: new Date('2025-07-07T17:32:00Z'),
      thumbnailUrl: '/api/placeholder/11',
      resolved: false
    },
    {
      cameraId: camera2.id,
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-07T18:15:00Z'),
      tsEnd: new Date('2025-07-07T18:17:00Z'),
      thumbnailUrl: '/api/placeholder/12',
      resolved: false
    }
  ];

  for (const incident of incidents) {
    await prisma.incident.create({
      data: incident
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });