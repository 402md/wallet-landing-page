import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { resourceServer } from "@/lib/x402-server";

const BASE_PAY_TO = process.env.X402_BASE_PAY_TO!;

const handler = async (_req: NextRequest) => {
  return NextResponse.json({
    message: "Payment verified on Base Sepolia!",
    network: "eip155:84532",
    timestamp: new Date().toISOString(),
  });
};

export const GET = withX402(
  handler,
  {
    accepts: {
      scheme: "exact",
      price: "$0.05",
      network: "eip155:84532",
      payTo: BASE_PAY_TO,
    },
    description: "x402 test endpoint — Base Sepolia",
  },
  resourceServer,
  undefined,
  undefined,
  false,
);
