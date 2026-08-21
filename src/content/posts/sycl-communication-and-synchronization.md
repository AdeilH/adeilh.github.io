---
title: "Sycl: Communication and Synchronization"
description: "Sycl: Communication and Synchronization"
pubDate: 2026-08-21
tags: []
draft: false
audio: true
---

       Dimension 1 of nd - range
               ------>
              |
dimension 0 of|
 nd-range     |
              |

Divided into four work groups each work group has work-items
work-items in same workgroup have additional scheduling guarantees

## Synchronization via Barriers

Two main purposes

1. Syncs execution of work-items in a work group.
2. Syncs how each work item vies memory.

Enforcing memory consistency/ fencing memory.

### Notes

1. Isn't on by default because expensive to implement.
2. All work-items in the group have barriers or none else others would
be waiting.
3. **Collective** **Function** is the one executed by all work-ites in a group.

## Work Group Local Memory

Same concept as global and local memory if you think about it the local
memory can be ram and global can be ssd if we go a bit down it can be l1
l2 cache. Ends when work group ends.

Some devices have it only as a software abstraction so it's just convenience
whereas other devices implement it hardware level we have to take care of
that.

### Local Memory in ND Range

#### Local Accessors

-> declared within command group handler should always be read_write because
as it's short term and kernel needs a way to assign

#### Synchronization Functions

**group_barrier** explicit scope isn't required default scope is mostly good
as determined by the function to make sure all work items have finished a phase.

## Sub Groups

Example of sub group similar barriers as work itenms for groups.

### NOTES

subgroups don't have specific local memory like groups
they work with collective functions

```cpp

[=](nd_item<1> item){}
    auto sg = item.get_sub_group();
}

group_barrier(sg);

```

#### Examples of collective functions for subgroup Communication

BroadCast
Votes
Shuffle

1. group_broadcast() -> One work-item to all
2. any_of_group(), all_of_group(), none_of_group() (Votes)
3. joint_any_of(), joint_all_of(), joint_none_of() (Over a range)
4. select_from_group(), shift_group_left(), shift_group_right() (shuffle)
5. permute_group_by_xor() -> work item's subgroups local id and a constant

Shuffle ability to communicate directly within subgroup since they are very
specialized they are only available for subgroups.
