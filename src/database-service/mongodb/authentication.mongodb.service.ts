import { InterfaceAuthenticationDatabaseService } from "../interface-authentication-database.service";
import { PlayerDto } from "../../models/dto/player.dto";
import { authenticationMongodbRepository } from "../../repositories/mongodb/authentication.mongodb.repository";
import { SignupDto } from "../../models/dto/signup.dto";

export const authenticationMongodbService: InterfaceAuthenticationDatabaseService =
  {
    loginPlayer(email: string): Promise<PlayerDto | null> {
      return authenticationMongodbRepository.loginPlayer(email);
    },
    signupPlayer(signupDto: SignupDto): Promise<PlayerDto | null> {
      return authenticationMongodbRepository.signupPlayer({
        ...signupDto,
      });
    },
  };
