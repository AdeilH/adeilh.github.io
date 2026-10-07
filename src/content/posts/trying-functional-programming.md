---
title: "-- Trying Functional Programming"
description: "-- Trying Functional Programming"
pubDate: 2026-10-06
tags: [Functional Programming, F#]
draft: false
audio: true
---

So i have been interested in functional paradigm for a while now
but haven't had the time to experiment with it or learn more about
it beyond the usual pure functions and immutability, i have read
words like monad but not actually dove deep into them. The goal for
today is to learn these concepts with the help of AI and OCaml.

List of things i am learning and will add.

1. Immutability.
2. Pure Functions.
3. Types and Expressions
4. ADTs.
5. Type Driven Design

And etc that I come across while building the goal is to build a simple
matching engine in F# and see how far it goes. I feel it will be a good
exercise as a deterministic easy to follow output is important, and also
some extra understanding for myself.

## Basics

Basic language constructs of F# that will help in developing the matching
engine eventually.

Functions and function calling guards and Sum Types

```fsharp

// Defining a function

let crosses buyLimit bestAsk = buyLimit >= bestAsk

// calling a function

crosses 100 101 

// Guards and Branching

let marginCall equity requirement =
    if equity < 0 then "liquidate"
    elif equity < requirement then "margin call"
    elif equity < 2 * requirement then "watch"
    else "healthy"

// naming intermediate values

let netProceeds qty px feeBPS =
    let gross = qty * px
    let fee = gross * feeBPS / 10000
    gross - fee

// Sum Types

type Side =
    | Buy
    | Sell

let flip side =
    match side with
    | Buy -> Sell
    | Sell -> Buy

// distince types

type Ticks = Ticks of int

let bestBidPx = Ticks 20000

```

Record Types

```fsharp

// can have additional fields too but minimal

type Order = 
    { OrderId: int
      Side: Side
      Px: Ticks
    }

```

Pattern Matching improves readability and tests shapes and binds of it's
parts. Replaces accessors

```fsharp

type OrderType =
    | Limit of price: int 
    | Market
    | IOC
    | FOK

// usage

let restInBook b =
    match t with
    | Limit -> true 
    | Market -> false
    | IOC -> false
    | FOK -> false

```

### I said maybeeeee

Absent type that may or may not be present

`type Option<a></a> = | None | Some of a`

## Lists

```fsharp

let fills = [(10000, 5), (100, 3), (10, 1)]

let lastFillPx = fills |> List.rev |> List.head |> fst

```
