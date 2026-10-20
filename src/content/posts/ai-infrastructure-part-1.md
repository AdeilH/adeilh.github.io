---
title: "AI Inference Part 1"
description: "Infrastructure and Maths Behind AI"
pubDate: 2026-10-19
tags: []
draft: false
audio: true
---

I have been thinking about how AI is served and what is the maths
behind it, so these are basically what I have read with my thoughts.
I am not too sure if all I understand is correct but I am trying to
put into words about my own knowledge on how.

Basically it's about mapping probabilities you train a model you freeze
it's weights and then after freezing you use that model to generate
responses for unknown data or input that you provide.

You provide an input, it's converted into token ids lets say "text" becomes
1234 in terms of token id, and then each id maps to an embedding vector which on
it's own is a very different topic but lets just say it maps it to a floating
point number so "text" becomes "token id" which then maps to embedding vector.
Which is then passed through the layers that are stacked where each layer has
an attention block when tokens look at each other and then it pass through
feedforward network for each layer. Layer receives raw input passes it through
other layers and gets proper response.

A forward pass outputs logits raw score per token which is then passed through
softmax. $P(\text{token}_i) = \frac{e^{\text{logit}_i}}{\sum_{j} e^{\text{logit}_j}}$
and then these probabilities are used to predict next this just magnifies the distance
or the probabilities a logit gap lets say x becomes 8x after softmax that makes
the difference more obvious which is then normalized normalization is like getting
every token probability to a sum of 1 by dividing individual score with sum of
all the scores.

Different ways of choosing a token.

1. Greedy -> one with the best score
2. Temperature -> T < 1 sharpens T > 1 more creative T = 0 greedy.
(just division to enhance).
3. Top-k -> Only the best k tokens then renormalize
4. Top-p -> Only the ones with probabilities above a threshold for example
smallest set of tokens with probabilities summing to 1.

The standard recipe: temperature shapes the distribution → top-p cuts the tail → sample.

After that what it goes through generating next token in a naive way what will
happen is after every token generated it uses all the previous tokens to generate
the next token so if it is at token 5 it will use token 1-4 to predict the token
5 which becomes resource heavy as the number of tokens increase, So then we look
Q/K/V Query -> What am I looking for, Key -> What do I contain, Value -> what do
I pass along. K and V don't change so we can cache them and use them rather than
generating by using all the previous tokens. This is a topic on it's own which I
will go into details separately.
