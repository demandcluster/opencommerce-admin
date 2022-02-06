import sha256 from 'crypto-js/sha256';
import Hex from "crypto-js/enc-hex";

const hashPassword = (password: string) => {
  return Hex.stringify(sha256(password));
}

export default hashPassword;
