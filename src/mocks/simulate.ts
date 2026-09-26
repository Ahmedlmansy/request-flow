// for rolback and loading
export async function simulateNetwork(options?: {
  minDelay?: number;
  maxDelay?: number;
  failureRate?: number; // 0 to 1
}) {
  const { minDelay = 200, maxDelay = 1200, failureRate = 0.1 } = options ?? {};

  const delay = minDelay + Math.random() * (maxDelay - minDelay);
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (Math.random() < failureRate) {
    throw new Error("Simulated network failure");
  }
}
