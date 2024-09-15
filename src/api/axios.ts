import axios from "axios";
import { isLocal } from "../utils/isLocal";
import { hosts } from "./hosts";
import { getCookie } from "../utils/cookie";

const instance = axios.create({
  baseURL: isLocal() ? `${hosts.dev}/api/` : `${hosts.prod}/api/`,
  timeout: 1000,
  headers: { "x-access-token": getCookie("token") },
});

export default instance;
