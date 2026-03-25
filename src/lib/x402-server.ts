import { x402ResourceServer } from "@x402/next";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactStellarScheme } from "@x402/stellar/exact/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";

const evmFacilitator = new HTTPFacilitatorClient({
  url: process.env.X402_FACILITATOR_URL ?? "https://facilitator.x402.org",
});

const stellarFacilitator = new HTTPFacilitatorClient({
  url:
    process.env.X402_STELLAR_FACILITATOR_URL ??
    "https://channels.openzeppelin.com/x402/testnet",
  createAuthHeaders: async () => {
    const headers = {
      Authorization: `Bearer ${process.env.X402_STELLAR_FACILITATOR_KEY}`,
    };
    return { verify: headers, settle: headers, supported: headers };
  },
});

export const resourceServer = new x402ResourceServer([
  stellarFacilitator,
  evmFacilitator,
])
  .register("stellar:testnet", new ExactStellarScheme())
  .register("eip155:84532", new ExactEvmScheme());
