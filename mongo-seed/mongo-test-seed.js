db.createCollection('parcours');

db.parcours.createIndex({ description: 'text' });
