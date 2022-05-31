import bcryptjs from "bcryptjs";
import { PlayerDto } from "../models/dto/player.dto";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import "dotenv/config";
import { SignupDto } from "../models/dto/signup.dto";
import { switchSelectDatabaseService } from "./repository.service";
import { currentDatabase } from "../global/database-control";
import { v4 } from "uuid";

export async function getPlayerDtoByEmail(email: string): Promise<PlayerDto> {
  const playerDto = await authentication.loginPlayer(email);
  if (playerDto) return playerDto;
  else throw Error("Player not found");
}

const passwordDecrypted = (receivedPassword: string, savedPassword: string) => {
  return bcryptjs.compareSync(receivedPassword, savedPassword);
};

export const generateJwtToken = (data: Object, options: SignOptions) => {
  return jsonwebtoken.sign(
    { ...data },
    process.env.SESSION_SECRET + "",
    options
  );
};

export const loginAuthentication = async (email: string, password: string) => {
  const playerDto = await getPlayerDtoByEmail(email);
  if (passwordDecrypted(password, playerDto.password))
    return generateJwtToken(
      { playerId: playerDto.playerId },
      { expiresIn: "1d" }
    );
  else throw Error("password and mail does not matched");
};

export const verifyJwt = (jwt: string) => {
  try {
    return jsonwebtoken.verify(
      prepareJwt(jwt),
      process.env.SESSION_SECRET + ""
    );
  } catch (error) {
    throw Error;
  }
};

const prepareSignupPlayer = (signupDto: SignupDto) => {
  return {
    ...signupDto,
    password: bcryptjs.hashSync(signupDto.password),
    playerId: v4(),
  };
};

export const signupPlayer = async (signupDto: SignupDto) => {
  return authentication.signupPlayer(prepareSignupPlayer(signupDto));
};

export const prepareJwt = (bearerToken: string) =>
  bearerToken.replace(/^Bearer\s+/, "");

// should be able to change it to any db connection that implement the Authentication interface
const { authentication } = switchSelectDatabaseService(currentDatabase);
