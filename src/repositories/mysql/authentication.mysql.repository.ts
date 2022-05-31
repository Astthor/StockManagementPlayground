import { InterfaceAuthentication } from "../interface-authentication.repository";
import { PlayerDto } from "../../models/dto/player.dto";
import { prismaMySql } from "../../database-connection/mysql.database-connection";
import { SignupDto } from "../../models/dto/signup.dto";
import {  stringify } from "uuid";
import { convertUUIDToBin } from "../../utils/uuid-management";

export const authenticationMySqlRepository: InterfaceAuthentication = {
  async signupPlayer(signupDto: SignupDto): Promise<PlayerDto | null> {
    const player = await prismaMySql.player
      .create({
        data: {
          ...signupDto,
          playerId: convertUUIDToBin(signupDto.playerId),
        },
      })
      .catch((reason) => {
        throw Error(reason);
      });
    return player
      ? {
          playerId: stringify(player.playerId),
          name: player.name,
          email: player.email,
          phone: player.phone,
          password: player.password,
        }
      : null;
  },
  async loginPlayer(email: string): Promise<PlayerDto | null> {
    const player = await prismaMySql.player
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch((reason) => {
        throw Error(reason);
      });
    return player
      ? {
          playerId: stringify(player.playerId),
          name: player.name,
          email: player.email,
          phone: player.phone,
          password: player.password,
        }
      : null;
  },
};
