import { auth, connectPromise } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const { POST: authPOST, GET: authGET } = toNextJsHandler(auth);

export const GET = async (request) => {
  await connectPromise;
  return authGET(request);
};

export const POST = async (request) => {
  await connectPromise;
  return authPOST(request);
};
