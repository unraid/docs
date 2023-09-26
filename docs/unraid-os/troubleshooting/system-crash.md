---
sidebar_position: 5
---

# Crash Issues

_THIS SECTION IS STILL UNDER CONSTRUCTION_

## RAM Issues

It is known that RAM degrades over time. RAM issues can be
elusive to track down and cause unpredictable errors. A somewhat common
effect is unexpected file system level corruption.

The Unraid boot menu includes a version of memtest for testing RAM. This
version will only work if booting in Legacy mode. If you try to run this
when running in UEFI mode it will immediately reboot again.

If you want a version that can be used in UEFI mode then you can
download a newer version from memtest's website. Note that the version
of memtest built into Unraid is a much older version that doesn't have
the newer testing capabilities of the current version located on
memtest's website. This is no fault of Unraid, the people behind
memtest won't allow anything newer to be installed by 3rd parties.

## Overclocking RAM

Many people want to run their RAM at the maximum rated speed quoted in
the specification of the RAM they have purchased. They tend to forget
that many motherboard/CPU combinations have a max speed at which they
can reliably drive RAM regardless of the fact that the RAM may be rated
for a higher theoretical maximum clock rate.
