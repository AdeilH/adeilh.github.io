---
title: "Inference Engineering: Review Chapter 2"
description: "Inference Engineering: Review Chapter 2"
pubDate: 2026-11-27
tags: []
draft: false
audio: true
---

Chapter 2 talks about neural networks and how they work it starts of
with history of neural networks and deep neural networks and how the
paper "Attentions is all you need" introduced the transformer architecture
Transformers are not only part of generative aibut also of all modalities
Autoregressive token generation (predict next likely token) Iterative 
denoising are two ways transformers work.

Neural networks are basically the building blocks of llms they comprise
of neurons aka node a group of nodes form a layer and the llm works like
this there is an **input layer -> Hidden layers -> output layer** input
layer takes user inputs hidden layers pass them one by one and output
layer generates the output. Encoder and Decoder architecture **Encoder**
takes input like text or image and create an internal representation with
more context, **Decoder** uses that internal representation to generate an output.
Modern llms are mostly decoder only.

The most essential part is matrix muliplication **y = Wx + b** which is linear
matmul which is multiplying by Weight and adding bias There is some additional
maths part of the book which is better understood while reading the book. It
talks about tokenizer and how it works by converting tokens into mathematical
representation and then mathematical representation into tokens this is not
exactly part of neural networks. Then it goes into details of different terms
like input sequence, reasoning, output sequence and prefill and decode. prefill
is basically calculate attention for each token and store it in kv cache. Decode
is autoregressive part hich takes all tokens and generates the next token.
Temperature, top k and top p respectively. Lower values make response more
predictable high values make llms more creative.

It dives into details of llm architecture and how to calculate attention and QKV
Queries -> Embedded representation of token being generated, Key is basically
representation of all previous tokens and values are basically calculated attention
of previous tokens, different types of attention self attention and cross attention.

The rest of the chapter dives deep into how inference functions I am trying to understand
how that works and will update this.
