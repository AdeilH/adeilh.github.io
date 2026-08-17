---
title: "Sycl Chapter 5- Error Handling"
description: "Sycl Chapter 5- Error Handling"
pubDate: 2026-08-12
tags: []
draft: false
audio: true
---

## Error Types

Two types of errors:

1. Synchronous (example explains better)
2. Asynchronous

### Synchronous Example Sub Buffer is bigger than buffer

```cpp

    sycl::buffer<int> test_buffer{sycl::range{16}};
    sycl::buffer sub_test_buffer{test_buffer, sycl::id{8}, sycl::range{16}};

```

### Asynchronous Example throwing from kernel

```cpp

namespace {
    auto handle_async_error = [](sycl::exception_list elist) {
        for (auto &e: elist) {
            try {
                std::rethrow_exception(e);
            } catch (...) {
                std::cout << "Caught Async Exception" << std::endl;
            }
        }
    };

    void say_device(const sycl::queue &Q) {
        std::cout << "Device: " << Q.get_device().get_info<sycl::info::device::name>();
    }
    class something_went_wrong: std::exception{};
}

    sycl::queue q{sycl::cpu_selector_v, handle_async_error};
    say_device(q);

    q.submit([](sycl::handler &h) {
        h.host_task([]() { throw(something_went_wrong{}); });
    }).wait_and_throw();

```

Basically a pretty small chapter discussing sync and async errors sync errors
are std::exception in essence and async errors should be caught using wait_and_throw()
there is also a concept of context which can be passed handler but I will need to
read about it.
