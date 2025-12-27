import sql from './db.js';

async function setupDatabase() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        role VARCHAR(50) NOT NULL
      );
    `;

    // Create departments table
    await sql`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;

    // Create teams table
    await sql`
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;

    // Create team_members table
    await sql`
      CREATE TABLE IF NOT EXISTS team_members (
        id SERIAL PRIMARY KEY,
        team_id INT REFERENCES teams(id),
        user_id INT REFERENCES users(id)
      );
    `;

    // Create equipment table
    await sql`
      CREATE TABLE IF NOT EXISTS equipment (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        serial_number VARCHAR(255),
        purchase_date DATE,
        warranty_info TEXT,
        location VARCHAR(255),
        department_id INT REFERENCES departments(id),
        employee_id INT REFERENCES users(id),
        maintenance_team_id INT REFERENCES teams(id),
        technician_id INT REFERENCES users(id)
      );
    `;

    // Create requests table
    await sql`
      CREATE TABLE IF NOT EXISTS requests (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL, -- 'corrective' or 'preventive'
        subject VARCHAR(255) NOT NULL,
        equipment_id INT REFERENCES equipment(id),
        scheduled_date DATE,
        duration INT, -- hours
        stage VARCHAR(50) NOT NULL DEFAULT 'new', -- 'new', 'in_progress', 'repaired', 'scrap'
        assigned_user_id INT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log('Database setup complete');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();