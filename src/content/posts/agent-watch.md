---
title: "Agent Watch"
description: "Agent Watch"
pubDate: 2026-11-12
tags: []
draft: false
audio: true
---

## Premise

An agent monitor that sits between commands and agents as an external
source to check and see what the agent is doing and raise alerts or block
the risky commands.

It uses C++ for ebpf module integration and python manages the built binary.

Demo Video:

<video controls width="100%" preload="metadata">
  <source src="/videos/agent-monitor.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

### Short Summary

EBPF is used to capture the commands and block them via hooks. This is done
in C++ and then python wraps around it to run the binary and do housekeeping.

1. Agent Runs commands.
2. Agent Monitor logs it/ compares with rules and allows it.
3. The logs can be seen on command line and elastic search
