"use client";

import { motion } from "framer-motion";
import { TradingViewChart } from "./trading-view-chart";

export default function DouonSniperEngineDiagram() {
  return (
    <section
      id="douon-sniper-engine"
      className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground mb-3">
            Trading Systems Architecture
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            Douon Sniper Bot v5.3 – Engine Diagram
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            A high-speed scalping engine aligning BTC/ETH multi-timeframe context to fire
            ultra-precise entries with automated risk, execution, and monitoring.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mt-10 rounded-3xl border border-border/70 bg-background/80 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.45)] p-4 md:p-6"
        >
          <TradingViewChart symbol="BTC/USDT" height={520} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-md p-5">
            <p className="text-sm text-muted-foreground">
              Live chart data mirrors Binance Futures price action with multi-timeframe alignment.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Candles update in real time with synthetic volume to visualize Douon Sniper's feed.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Header shows the latest price, change %, and timeframe used by the sniping engine.
            </p>
          </div>

          <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-md p-5">
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>
                Reads BTC/ETH multi-timeframe price action and indicator stacks in real time.
              </li>
              <li>
                Generates sniper entries with predefined stop-loss, take-profit, and position sizing.
              </li>
              <li>
                Executes orders automatically, logs every trade, and pushes alerts to operators.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

