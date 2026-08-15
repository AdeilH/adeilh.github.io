---
title: "Fine Tuning For Classification"
description: "Fine Tuning For Classification"
pubDate: 2026-08-15
tags: []
draft: false
audio: true
---

Fine tuning a model for classification feels similar to
machine learning using test and training data. Instruction fine
tuning is also a type of fine tuning but it requires bigger
data and more resources basically classification -> pretty
specialized instruction -> a bit general but instructionx.

Basically in this chapter we break down the outer layers of
llm to fine tune we use a dataset with spam and ham sms.

We undersample the data to make sure we have similar numbers
for each label to create a balanced dataset.

Same as ml we split into training validation and test data,
training 70 validation 10 and test 20%

## Creating Data Loaders

Uniformly Sized Text Chunks (Sliding Window) -> Batching
Same question here lose data by truncating to the smallest
or padding messages to the longest message to get everything
in order to not lose data.
