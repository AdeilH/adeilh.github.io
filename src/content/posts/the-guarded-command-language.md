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
