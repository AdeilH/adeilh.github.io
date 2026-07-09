---
title: "Setting up sycl for development"
description: "Initial Setup for sycl"
pubDate: 2026-07-09
tags: ["c++", "sycl", "parallel programming", "heterogenous programming"]
draft: false
---

My setup for SYCL development on linux. I have a minimal setup to play around
and work on SYCL.

## What is SYCL?

- SYCL is basically cross platform framework that enables parallel
programming same code to run on different gpus and cpus. It isn't
used much but it is helpful in learning about parallel programming
and gpu programming. In case you only have Intel integrated gpus
this can be a good alternative.

## How I installed it?

- There are a couple of ways to install and run sycl one is adaptivecpp
which I haven't used the other is [Intel One Api Toolkit](https://www.intel.com/content/www/us/en/developer/tools/oneapi/oneapi-toolkit-download.html)
You can download a script that when I executed I got compiler and other stuff
installed in home directory I added source env_var to ~/.bashrc to make my
system simpler.

```sh
source ~/intel/oneapi/setvars.sh
```

I haven't used modules but I have setup my cmake to enable modules as well
this is my minimal cmake setup

```cmake
cmake_minimum_required(VERSION 4.3.2)
set(CMAKE_EXPERIMENTAL_CXX_IMPORT_STD "451f2fe2-a8a2-47c3-bc32-94786d8fc91b")
project(one_api)

project(one_api LANGUAGES CXX)

set(CMAKE_CXX_MODULE_STD ON)
SET(BOOST_UT_CXX_MODULES ON)

set(CMAKE_CXX_STANDARD 26)

set(CMAKE_BUILD_WITH_INSTALL_RPATH TRUE)

add_executable(my_program main.cpp)
target_compile_features(my_program PRIVATE cxx_std_26)
target_compile_options(my_program PRIVATE -fsycl -Wno-reserved-module-identifier)
target_link_options(my_program PRIVATE -fsycl -Wno-reserved-module-identifier)

#target_sources(my_program PUBLIC FILE_SET all_my_modules TYPE CXX_MODULES FILES)
```

## A note on code

Just to test my setup i have this code to find number of cores in gpu and
cpu, it uses c++20 onwards.

```cpp
#include<print>
#include<sycl/sycl.hpp>
int main() {
    const sycl::device dev{sycl::gpu_selector_v};
    const sycl::device host{sycl::cpu_selector_v};
    auto dev_cores = dev.get_info<sycl::info::device::max_compute_units>();
    auto host_cores = host.get_info<sycl::info::device::max_compute_units>();
    std::println("gpu cores {}", dev_cores);
    std::println("cpu cores {}", host_cores);
}
```

## Helpful Links

- [Sycl Academy](https://sycl.tech/getting-started/academy/1-what-is-sycl/lesson)
- [Sycl Workshops](https://enccs.github.io/sycl-workshop/what-is-sycl/)
