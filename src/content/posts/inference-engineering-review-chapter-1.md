---
title: "Inference Engineering: Review Chapter 1"
description: "Inference Engineering: Review Chapter 1"
pubDate: 2026-11-25
tags: []
draft: false
audio: true
---

Inference is the second part of the process in Generative AI after training.
In traditional machine learning models it is basically straight forward and different
than generative AI which this book talks about. This involves infrastructure, runtime
and tooling. There are many methods implemented to improve inference. Batching (requests
in parallel), Caching (caching kv), Quantization (reducing model precision) Disaggregation
(separating prefill(startup) and decode(token generation)), Speculation (a small model
generating tokens as suggestions to enhance response time) and Parallelism.

Issues pop up when running clusters like co-ordination between them overusage of one cluster
underusage of another it's important to take care of that in infrastructure.

The book then talks about prereqs like things like model requirements, latency, input/output
methods aka application interface, costs and usage patterns. Also talks about shared inference
vs dedicated deployments. Decision should be based on scale, Specialization and orchestration
you have more control over dedicated deployment but more responsibility as well. Latency vs
throughput latency makes it faster throughput makes it cost effective there is a tradeoff in there
somewhere. Things like data sovereignty, user privacy and regulatory compliance should
also be considered.

It also talks about model evals and things like making sure data is consistent and quality.
Fine tuning a model to a domains needs. Fine tuning is basically using new data to make model
more useful for specific cases. After that it talks about distillation. Which is the process
of teaching a smaller model via probabilty distibution of responses of a bigger model. 

Then it talks about metrics like TTFT and TPS (Time to first token) and (Tokens per second)
Perceived TPS -> Observed by user, Total TPS -> Total number of tokens generated per second
ITL -> Intertoken Latency (time between two tokens).

All in all chapter 1 talks about whys and hows of which infrastructure, what tooling to use
and different metrics that can help in making decisions related to generative ai deployment.
