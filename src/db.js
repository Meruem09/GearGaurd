import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://username:password@hostname/database?sslmode=require');

export default sql;