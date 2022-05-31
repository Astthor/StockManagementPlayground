import { InterfaceAuthenticationDatabaseService } from "../interface-authentication-database.service";
import { PlayerDto } from "../../models/dto/player.dto";
import { SignupDto } from "../../models/dto/signup.dto";
import { authenticationNeo4jRepository } from "../../repositories/neo4j/authentication.neo4j.repository";
import { authenticationMySqlRepository } from "../../repositories/mysql/authentication.mysql.repository";
import { authenticationMongodbRepository } from "../../repositories/mongodb/authentication.mongodb.repository";

export const authenticationDefaultDbService: InterfaceAuthenticationDatabaseService =
  {
    loginPlayer(email: string): Promise<PlayerDto | null> {
      return Promise.race([
        authenticationNeo4jRepository.loginPlayer(email),
        authenticationMySqlRepository.loginPlayer(email),
        authenticationMongodbRepository.loginPlayer(email),
      ]);
    },
    signupPlayer(signupDto: SignupDto): Promise<PlayerDto | null> {
      return Promise.race([
        authenticationNeo4jRepository.signupPlayer(signupDto),
        authenticationMySqlRepository.signupPlayer(signupDto),
        authenticationMongodbRepository.signupPlayer(signupDto),
      ]);
    },
  };
