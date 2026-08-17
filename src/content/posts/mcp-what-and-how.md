---
title: "MCP: What and How"
description: "MCP: What and How"
pubDate: 2026-08-17
tags: []
draft: false
audio: true
---

## What it is?

A server that runs tools in remote server basically sort of a rest
server but you wrap functionalities for llm tools. It sort of wraps
around the usage of some api. You can technically run it over
any protocol as it is transport agnostic but mostly the protocol
that is used is [json-rpc](https://modelcontextprotocol.info/docs/concepts/transports/) as wire format and two transport
types Standard Input Output (stdio) same machine and SSE
(Server Sent Events) different machines the use cases for both are
defined in the link shared.

### Basic Flow

MCP client is local it sends request to mcp server which can also run
locally basically moving it to server side.

MCP Client ⬅➡ MCP Server(tools, prompts, resources) ⬅➡ AWS/GCP/Slack

Basic flow then there is llm that calls the mcp client as per need. Saves time
on integrating API directly as schema and tools are defined.

## Coding up an MCP

So in python you can use the fastmcp SDK to define tools, resources, prompts
you write a server using @mcp.tools, @mcp.resources etc.

### Server

The tools at server end are basically list_tools, call_tools, list_tools you
guessed it will list all the tools part of the server, call_tools() will call
the tool as needed.

Resources are basically files or anything that provides context to the llm
instead of llm going and getting context mcps can directly use a resource to
provide context, you will need a uri to provide location. Can be file, database,
images etc.

Prompts are reusable templates for client to provide to users and llms.

### Client

Root is a uri that client can ask server to focus on. Guidance Clarity Organization.

Sampling is a way for server to call llm through client for security and privacy.

Resource:

1. [Mcp Docs](https://modelcontextprotocol.info/docs)
