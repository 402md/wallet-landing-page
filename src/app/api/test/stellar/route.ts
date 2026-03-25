import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { resourceServer } from "@/lib/x402-server";

const STELLAR_PAY_TO = process.env.X402_STELLAR_PAY_TO!;

const handler = async (_req: NextRequest) => {
  return NextResponse.json({
    message: "Payment verified on Stellar Testnet!",
    network: "stellar:testnet",
    timestamp: new Date().toISOString(),
  });
};

export const GET = withX402(
  handler,
  {
    accepts: {
      scheme: "exact",
      price: "$0.05",
      network: "stellar:testnet",
      payTo: STELLAR_PAY_TO,
    },
    description: "x402 test endpoint — Stellar Testnet",
  },
  resourceServer,
  undefined,
  undefined,
  false,
);
