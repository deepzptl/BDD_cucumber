import mysql, { RowDataPacket, FieldPacket } from 'mysql2/promise';

export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

export class DatabaseHelper {
  private static instance: DatabaseHelper;
  private connection: mysql.Pool | null = null;
  private config: DatabaseConfig;

  private constructor(config: DatabaseConfig) {
    this.config = { port: 3306, ...config };
  }

  static getInstance(config?: DatabaseConfig): DatabaseHelper {
    if (!DatabaseHelper.instance && config) {
      DatabaseHelper.instance = new DatabaseHelper(config);
    }
    return DatabaseHelper.instance;
  }

  async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = mysql.createPool({
        host: this.config.host,
        user: this.config.user,
        password: this.config.password,
        database: this.config.database,
        port: this.config.port || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    }
  }

  async query<T extends RowDataPacket[]>(sql: string, params?: any[]): Promise<[T, FieldPacket[]]> {
    if (!this.connection) await this.connect();
    return this.connection!.execute<T>(sql, params);
  }

  async getTestData(tableName: string, testName: string): Promise<any[]> {
    const sql = `SELECT * FROM ?? WHERE test_name = ?`;
    const [rows] = await this.query<RowDataPacket[]>(sql, [tableName, testName]);
    return rows;
  }

  async getAllTestData(tableName: string): Promise<any[]> {
    const sql = `SELECT * FROM ??`;
    const [rows] = await this.query<RowDataPacket[]>(sql, [tableName]);
    return rows;
  }

  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}

export function createDatabaseConnection(): DatabaseHelper {
  const config: DatabaseConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test_data',
    port: parseInt(process.env.DB_PORT || '3306')
  };
  return DatabaseHelper.getInstance(config);
}
