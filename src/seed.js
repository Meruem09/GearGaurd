import sql from './db.js';

async function seedDatabase() {
  try {
    // Insert departments
    await sql`INSERT INTO departments (name) VALUES ('Production'), ('Office'), ('IT') ON CONFLICT DO NOTHING`;

    // Insert users
    await sql`INSERT INTO users (name, email, role) VALUES 
      ('John Doe', 'john@example.com', 'technician'),
      ('Jane Smith', 'jane@example.com', 'technician'),
      ('Bob Johnson', 'bob@example.com', 'manager') ON CONFLICT DO NOTHING`;

    // Insert teams
    await sql`INSERT INTO teams (name) VALUES ('Mechanics'), ('IT Support'), ('Electricians') ON CONFLICT DO NOTHING`;

    // Insert team_members
    await sql`INSERT INTO team_members (team_id, user_id) VALUES 
      (1, 1), (2, 2) ON CONFLICT DO NOTHING`;

    // Insert equipment
    await sql`INSERT INTO equipment (name, serial_number, purchase_date, warranty_info, location, department_id, employee_id, maintenance_team_id, technician_id) VALUES 
      ('CNC Machine 01', 'CN001', '2020-01-01', '2 years', 'Factory Floor', 1, 1, 1, 1),
      ('Printer 01', 'PR001', '2021-05-10', '1 year', 'Office', 2, 2, 2, 2) ON CONFLICT DO NOTHING`;

    // Insert requests
    await sql`INSERT INTO requests (type, subject, equipment_id, scheduled_date, duration, stage, assigned_user_id) VALUES 
      ('corrective', 'Leaking Oil', 1, '2023-12-25', 2, 'new', 1),
      ('preventive', 'Routine Check', 2, '2023-12-28', 1, 'new', 2) ON CONFLICT DO NOTHING`;

    console.log('Database seeded');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();