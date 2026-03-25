import { x402ResourceServer } from "@x402/next";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactStellarScheme } from "@x402/stellar/exact/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const facilitatorClient = new HTTPFacilitatorClient({
  url: process.env.X402_FACILITATOR_URL ?? "https://x402.org/facilitator",
});

export const resourceServer = new x402ResourceServer(facilitatorClient)
  .register("stellar:testnet", new ExactStellarScheme())
  .register("eip155:84532", new ExactEvmScheme());
