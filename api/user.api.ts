import { request } from "playwright";
import type {
  SignUpRequest,
  SignInRequest,
  SignInResponse,
} from "../types/auth";

const baseURL = "https://airbnbnew.cybersoft.edu.vn";
const headers = {
  tokenCyberSoft: process.env.CYBERSOFT_TOKEN!,
  "Content-Type": "application/json",
  accept: "application/json",
};
// Sign up
export async function signUpUser(userData: Partial<SignUpRequest>) {
  const apiContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: headers,
  });
  const res = await apiContext.post("/api/auth/signup", {
    data: userData,
  });
  return res;
}
// Sign in
export async function signInRequest(userData: SignInRequest) {
  const apiContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: headers,
  });
  const res = await apiContext.post("api/auth/signin", {
    data: userData,
  });
  return res;
}

// Get Token
export async function signInAndGetToken(userData: SignInRequest) {
  const apiContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: headers,
  });

  const res = await apiContext.post("api/auth/signin", {
    data: userData,
  });

  const body: SignInResponse = await res.json();

  const token = body.content.token;

  if (!token) {
    throw new Error("Token not found in response");
  }

  return token;
}
