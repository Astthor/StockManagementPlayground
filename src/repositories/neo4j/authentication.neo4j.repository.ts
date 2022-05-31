import { InterfaceAuthentication } from "../interface-authentication.repository";
import { PlayerDto } from "../../models/dto/player.dto";
import { SignupDto } from "../../models/dto/signup.dto";
import { neo4jConnection } from "../../database-connection/neo4j.database-connection";

export const authenticationNeo4jRepository: InterfaceAuthentication = {
  async loginPlayer(email: string): Promise<PlayerDto | null> {
    const queryResult = (
      await neo4jConnection(
        `MATCH (player:Player {email: $email}) RETURN player, id(player) as playerId`,
        { email: email }
      )
    ).records[0];
    if (queryResult) {
      const result = queryResult.get(0).properties;
      result.playerId = queryResult.get("playerId");
      return result;
    } else return null;
  },
  async signupPlayer(signupDto: SignupDto): Promise<PlayerDto | null> {
    return (
      await neo4jConnection(
        `CREATE (player: Player {email: $email, password: $password, phone: $phone, name: $name, playerId: $playerId}) RETURN player`,
        {
          email: signupDto.email,
          password: signupDto.password,
          phone: signupDto.phone,
          name: signupDto.name,
          playerId: signupDto.playerId,
        }
      )
    ).records[0].get(0).properties;
  },
};
