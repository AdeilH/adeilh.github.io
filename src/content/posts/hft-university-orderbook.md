---
title: "HFT University OrderBook Challenge Part 1"
description: "Understanding Order Book"
pubDate: 2026-09-29
tags: [hft, cpp]
draft: false
audio: true
---

## What is an OrderBook

In my own words orderbook is a data structure that holds information
about stock market orders. It is linked to limit orders which are based
on how much one is willing to buy a specific stock for or how much one is
willing to sell a stock for.

### How it is constructed

OrderBook is constructed by taking the best placed bids, which are defined
by basically the maximum in the market and sorted by high to low, and best
placed asks which are basically the minimum in the market and sorted by low
to high.

#### Example

| Asks   | Bids    |
|--------------- | --------------- |
| 103   | 102   |
| 105   | 101.5   |
| 107   | 100.25   |

If best ask is 103 and somebody places an order less than that then it is not
fulfilled till the best ask matches the best bid remember we are talking about
limit orders it is possible that somebody places a sell order lower than best bid
then it will be fulfilled at lower bid.

Buy and Sell aren't same as Bid and Ask Buy and Sell show what trader wants to
do and bids and asks are part of the orderbook which are updated when trader
places an order.

## Alpha Beta

Alpha is the base asset. Beta is the quote asset. Base asset is buyer and quote
asset is seller. Alpha/Beta basically you get X beta for X alpha. Opposite for
sell? I am not sure I am confused about this I will read more from other sources

## Limit Order Vs Market Order

Limit orders make the book by limit order we mean that the trader provides a very
specific price to buy or sell their position, whereas market orders are orders that
are executed at market price they are not kept in the book.

## Priority

In case two orders are present with the same price the order which arrived early
is given the priority, similarly limit orders can be matched at better prices.

## Time In Force

This manages how long the stock is valid for there are different values like Day,
valid till trading session ends, GTC (Good Till Cancel) IOC (Immediate or Cancel),
FOK (can't recall/Fill or Kill),

## Example Order

- Instrument ID
- Order ID
- Side
- Price
- Quantity
- Type
