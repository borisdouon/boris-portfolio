"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  HistogramSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type HistogramData,
} from "lightweight-charts";
import { motion } from "framer-motion";

type TradingViewChartProps = {
  symbol?: string;
  height?: number;
  accent?: string;
};

const DEFAULT_SYMBOL = "BTC/USDT";

export function TradingViewChart({
  symbol = DEFAULT_SYMBOL,
  height = 520,
  accent = "rgba(59,130,246,0.95)",
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const [latestPrice, setLatestPrice] = useState(0);
  const [latestChange, setLatestChange] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "hsl(var(--foreground))",
      },
      grid: {
        vertLines: { color: "hsl(var(--border) / 0.2)" },
        horzLines: { color: "hsl(var(--border) / 0.2)" },
      },
      width: containerRef.current.clientWidth,
      height,
      rightPriceScale: {
        borderColor: "hsl(var(--border) / 0.3)",
      },
      timeScale: {
        borderColor: "hsl(var(--border) / 0.3)",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "rgba(59,130,246,0.3)",
      priceFormat: { type: "volume" },
      priceScaleId: "",
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    const now = Math.floor(Date.now() / 1000);
    let price = 45000;

    const mockCandles: CandlestickData[] = [];
    const mockVolume: HistogramData[] = [];

    for (let i = 200; i >= 0; i--) {
      const time = now - i * 300;
      const open = price;
      const volatility = price * 0.002;
      const change = (Math.random() - 0.5) * volatility;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * volatility * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * 0.5;

      mockCandles.push({
        time,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
      });

      mockVolume.push({
        time,
        value: Math.round(200 + Math.random() * 800),
        color: change >= 0 ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)",
      });

      price = close;
    }

    candleSeries.setData(mockCandles);
    volumeSeries.setData(mockVolume);

    setLatestPrice(mockCandles[mockCandles.length - 1].close);
    setLatestChange(((mockCandles[mockCandles.length - 1].close - mockCandles[0].open) / mockCandles[0].open) * 100);

    const updateInterval = setInterval(() => {
      const lastBar = mockCandles[mockCandles.length - 1];
      const newVolatility = lastBar.close * 0.0015;
      const newClose = lastBar.close + (Math.random() - 0.5) * newVolatility;
      const newHigh = Math.max(lastBar.close, newClose) + Math.random() * newVolatility * 0.5;
      const newLow = Math.min(lastBar.close, newClose) - Math.random() * newVolatility * 0.5;

      const newBar: CandlestickData = {
        time: (Math.floor(Date.now() / 1000) + 300) as number,
        open: lastBar.close,
        high: Number(newHigh.toFixed(2)),
        low: Number(newLow.toFixed(2)),
        close: Number(newClose.toFixed(2)),
      };

      mockCandles.push(newBar);
      mockCandles.shift();

      candleSeries.update(newBar);
      setLatestPrice(newBar.close);
      setLatestChange(((newBar.close - mockCandles[0].open) / mockCandles[0].open) * 100);

      const volumeBar: HistogramData = {
        time: newBar.time,
        value: Math.round(200 + Math.random() * 800),
        color: newBar.close >= newBar.open ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)",
      };

      mockVolume.push(volumeBar);
      mockVolume.shift();
      volumeSeries.update(volumeBar);
    }, 4000);

    const handleResize = () => {
      if (!containerRef.current || !chartRef.current) return;
      chartRef.current.applyOptions({ width: containerRef.current.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(updateInterval);
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [height, symbol]);

  const trendColor = latestChange >= 0 ? "text-emerald-400" : "text-rose-400";
  const trendBg = latestChange >= 0 ? "bg-emerald-400/15" : "bg-rose-400/15";

  return (
    <div className="relative h-full w-full rounded-2xl border border-border/60 bg-background/60 dark:bg-background/40 backdrop-blur">
      <div className="absolute top-0 left-0 right-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-border/30 bg-background/70 px-4 py-3 text-sm">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-foreground">{symbol}</p>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">5m</span>
        </div>
        <div className="flex items-center gap-6 text-xs sm:text-sm">
          <div>
            <p className="text-muted-foreground">Last</p>
            <p className="text-foreground font-semibold">${latestPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Change</p>
            <p className={`font-medium ${trendColor} ${trendBg} rounded px-2 py-0.5`}>
              {latestChange >= 0 ? "+" : ""}
              {latestChange.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="w-full h-full pt-12" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5 shadow-[0_0_60px_rgba(59,130,246,0.25)]"
        style={{ boxShadow: `0 0 60px ${accent}` }}
      />
    </div>
  );
}

