import { InterfaceDatabaseService } from "./interface-database-service";
import { InterfacePlayerDatabaseService } from "../database-service/interface-player.database-service";
import { InterfaceWalletDatabaseService } from "../database-service/interface-wallet.database-service";
import { InterfaceWalletStockDatabaseService } from "../database-service/interface-wallet-stock.database-service";
import { InterfaceStockDatabaseService } from "../database-service/interface-stock.database-service";
import { InterfaceOrderDatabaseService } from "../database-service/interface-order.database-service";
import { stockMysqlService } from "../database-service/mysql/stock.mysql.service";
import { orderMysqlService } from "../database-service/mysql/order.mysql.service";
import { playerMysqlService } from "../database-service/mysql/player.mysql.service";
import { walletMysqlService } from "../database-service/mysql/wallet.mysql.service";
import { walletStockMysqlService } from "../database-service/mysql/wallet-stock.mysql.service";
import { playerMongodbService } from "../database-service/mongodb/player.mongodb.service";
import { walletMongodbService } from "../database-service/mongodb/wallet.mongodb.service";
import { walletStockMongodbService } from "../database-service/mongodb/wallet-stock.mongodb.service";
import { stockMongodbService } from "../database-service/mongodb/stock.mongodb.service";
import { orderMongodbService } from "../database-service/mongodb/order.mongodb.service";
import { orderNeo4jService } from "../database-service/neo4j/order.neo4j.service";
import { walletStockNeo4jService } from "../database-service/neo4j/wallet-stock.neo4j.service";
import { stockNeo4jService } from "../database-service/neo4j/stock.neo4j.service";
import { walletNeo4jService } from "../database-service/neo4j/wallet.neo4j.service";
import { playerNeo4jService } from "../database-service/neo4j/player.neo4j.service";
import { InterfaceAuthenticationDatabaseService } from "../database-service/interface-authentication-database.service";
import { authenticationMongodbService } from "../database-service/mongodb/authentication.mongodb.service";
import { authenticationMySqlService } from "../database-service/mysql/authentication.mysql.service";
import { authenticationNeo4jService } from "../database-service/neo4j/authentication.neo4j.service";
import { playerDefaultDbService } from "../database-service/default-db/player.default-db.service";
import { walletDefaultDbService } from "../database-service/default-db/wallet.default-db.service";
import { walletStockDefaultDbService } from "../database-service/default-db/wallet-stock.default-db.service";
import { stockDefaultDbService } from "../database-service/default-db/stock.default-db.service";
import { orderDefaultDbService } from "../database-service/default-db/order.default-db.service";
import { authenticationDefaultDbService } from "../database-service/default-db/authentication.default-db.service";

export interface DatabaseService {
  Player: InterfacePlayerDatabaseService;
  Wallet: InterfaceWalletDatabaseService;
  WalletStock: InterfaceWalletStockDatabaseService;
  Order: InterfaceOrderDatabaseService;
  Stock: InterfaceStockDatabaseService;
  authentication: InterfaceAuthenticationDatabaseService;
}

export const SERVICES: InterfaceDatabaseService = {
  MySQL: {
    Player: playerMysqlService,
    Wallet: walletMysqlService,
    WalletStock: walletStockMysqlService,
    Stock: stockMysqlService,
    Order: orderMysqlService,
    authentication: authenticationMySqlService,
  },
  MongoDB: {
    Player: playerMongodbService,
    Wallet: walletMongodbService,
    WalletStock: walletStockMongodbService,
    Stock: stockMongodbService,
    Order: orderMongodbService,
    authentication: authenticationMongodbService,
  },
  Neo4j: {
    Player: playerNeo4jService,
    Wallet: walletNeo4jService,
    WalletStock: walletStockNeo4jService,
    Stock: stockNeo4jService,
    Order: orderNeo4jService,
    authentication: authenticationNeo4jService,
  },
  DefaultDB: {
    Player: playerDefaultDbService,
    Wallet: walletDefaultDbService,
    WalletStock: walletStockDefaultDbService,
    Stock: stockDefaultDbService,
    Order: orderDefaultDbService,
    authentication: authenticationDefaultDbService,
  },
};
