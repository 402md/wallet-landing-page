import { x402ResourceServer } from "@x402/next";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { ExactStellarScheme } from "@x402/stellar/exact/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import type { PaymentPayload, PaymentRequirements } from "@x402/core/types";

// EVM continues using the public x402.org facilitator (default cap is fine
// for EVM contract calls).
const evmFacilitator = new HTTPFacilitatorClient({
  url: process.env.X402_FACILITATOR_URL ?? "https://x402.org/facilitator",
});

// Stellar routes to the OZ-hosted facilitator. The default x402.org
// facilitator has a 50k stroop fee cap which rejects OpenZeppelin Smart
// Account contract calls (~500k stroops). The OZ facilitator has a higher
// cap but requires a Bearer relayer key — set OZ_RELAYER_KEY in env.
const stellarAuthHeaders = {
  Authorization: `Bearer ${process.env.OZ_RELAYER_KEY ?? ""}`,
};
const stellarFacilitator = new HTTPFacilitatorClient({
  url: "https://channels.openzeppelin.com/x402/testnet",
  createAuthHeaders: async () => ({
    verify: stellarAuthHeaders,
    settle: stellarAuthHeaders,
    supported: stellarAuthHeaders,
  }),
});

// Routes verify/settle calls to the appropriate facilitator based on the
// requirement's network. Implements the same surface that x402ResourceServer
// expects from a facilitator client.
const facilitatorClient = {
  async verify(payload: PaymentPayload, requirements: PaymentRequirements) {
    const f = requirements.network.startsWith("stellar:")
      ? stellarFacilitator
      : evmFacilitator;
    return f.verify(payload, requirements);
  },
  async settle(payload: PaymentPayload, requirements: PaymentRequirements) {
    const f = requirements.network.startsWith("stellar:")
      ? stellarFacilitator
      : evmFacilitator;
    return f.settle(payload, requirements);
  },
  async getSupported() {
    const [evm, stellar] = await Promise.all([
      evmFacilitator.getSupported().catch(() => ({ kinds: [] })),
      stellarFacilitator.getSupported().catch(() => ({ kinds: [] })),
    ]);
    return { kinds: [...evm.kinds, ...stellar.kinds] };
  },
};

export const resourceServer = new x402ResourceServer(facilitatorClient as never)
  .register("stellar:testnet", new ExactStellarScheme())
  .register("eip155:84532", new ExactEvmScheme());
