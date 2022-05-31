import { prismaMongodb } from "../../database-connection/mongodb.database-connection";
import { PlayerDto } from "../../models/dto/player.dto";
import { SignupDto } from "../../models/dto/signup.dto";
import { InterfaceAuthentication } from "../interface-authentication.repository";

export const authenticationMongodbRepository: InterfaceAuthentication = {
  async signupPlayer(signupDto: SignupDto): Promise<PlayerDto | null> {
    const player = await prismaMongodb.player
      .create({
        data: { ...signupDto, playerId: signupDto.playerId },
      })
      .catch((reason) => {
        throw Error(reason);
      });
    return player ? player : null;
  },
  async loginPlayer(email: string): Promise<PlayerDto | null> {
    const player = await prismaMongodb.player
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch((reason) => {
        throw Error(reason);
      });
    return player ? player : null;
  },
};
