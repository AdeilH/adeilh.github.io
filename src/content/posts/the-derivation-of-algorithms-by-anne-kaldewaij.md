---
title: "The Derivation of Algorithms by Anne Kaldewaij"
description: "The Derivation of Algorithms by Anne Kaldewaij"
pubDate: 2026-07-27
tags: [mynotes, programming]
draft: false
audio: true
---

So I have been reading some old text books recently and came across the derivation
of algorithms by Anne Kaldewaij.

## Chapter 0 introduction

It is introduction and goes through some details of the guarded programming language
and dijkstra's influence while talking about how the rest of the book deals with
it. It also talks a bit about pre-condition P and post-condition Q which refers
to the way the program state changes and can be used for verification. {P}S{Q}

## Chapter 1 Predicate Calculus

Predicate = boolean function P: X {false, true} it talks about the operators defined
on predicate like ⨇ conjugate true when P and Q both true,⨈ disjunction false
when P and Q both false, ≡ equivalence true when P and Q are same, ⟹ implication
false when P s true and Q is false, ¬ negation true when P is false negation has
highest priority then dis and con and then implication ad equivalence then there
are different rules like idempotency, commuttavity, associativity, distributivity,
absorption, De morgan etc then it also talks about proofs of different matter
and how it works then it talks about existential and universal quantification
which are generalization of disjunction P.0 ⨈ ..⨈P.(n-1) and generalizaztion of
conjunction respectively.

### Golden Rule proof

P ⨈ Q ≡ P ≡ Q ≡ P ⨇ Q

Assuming P and Q both are false

disjunction P ⨈ Q = false
conjunction P ⨇ Q = false

We can construct a truth table too to show equivalence
