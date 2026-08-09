---
title: "The Guarded Command Language"
description: "The Guarded Command Language"
pubDate: 2026-08-08
tags: []
draft: false
audio: true
---

## Intro

Program => Pre Condition -> State Space -> Post Condition

```text
[[var x, y: int;
{X>0 ^ Y>0 ^ x = X ^ y = Y}
S
{X gcd Y}
]]
```

Pre Condition State Post condition starting in state {X>0 ^ Y>0 ^ x = X ^ y = Y}
ends up satisfying X gcd Y.

### Rules

1. Execution of S starting in state P when post is false ends
up terminating in a state satisfying false that is in no state.

2. Pre condition May be strengthened. Post condition may be weakened.

3. Conjunction ⨇ and Disjoint ⨈

Weak allows non determinism like ⟹ etc.

## First Statement Skip

P Skip Q is P implies Q since weakest solution of X skip Q is Q |wp skip Q ≡ Q|
Stronger condition is x>10 over x>0.

## Second Statement Assignment

Assigns value to a variable := it is like

```text

{P}x := E{Q} is equivalent to [P⟹ Q{x:=E} ]

+ - * min max mod div

a div b = q⨇ a mod b = r ≡ a = b * q + r > 0󰥽 r󰥽|b|

```

Similar examples in text.

Date: 2026-08-09

## Catenation

Describes sequence of actions first S is executed then T
{P}S then T{Q} we need to find a predicate R such that P{S}R R{T}Q hold.

{P}S;T{Q} ; isn't the terminator you think it is it separates two statements
like in C++

```text

var a, b: bool;
{(a≡A) ^ (b≡B)},
a := a ≡ b
;b := a ≡ b
;a := a ≡ b
{(a≡B) ^ (b≡A)}

```

associative we choose the weakest predicate start by last statement and go
backwards.

## Selection

Form

if b0 -> s0 ... bn -> sn fi

basically boolean all guards evaluated none true everything terminates
in case of false it's non deterministic as it follows the path of true(truth)

even though the execution is nondeterministic, the result is deterministic.

"Don't invent a program and then prove it. Derive the program from what you want
it to accomplish."
