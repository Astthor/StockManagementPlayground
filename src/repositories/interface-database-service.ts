/**
 * Used to pass in an object ot repository service for determining the db to use
 */
import { DatabaseService } from "./database-registry.repository";

// NOTE: Where to put this one
export interface InterfaceDatabaseService {
  MySQL: DatabaseService;
  MongoDB: DatabaseService;
  Neo4j: DatabaseService;
  DefaultDB: DatabaseService;
}
