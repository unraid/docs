# Understanding SMART Reports

`under construction, only slightly usable so far`

**_Disclaimer: this page is based on personal experience gained from
examining numerous SMART reports, therefore it should not be considered
authoritative. Accuracy however is highly desired, so please feel free
to correct it as needed, or suggest corrections or question its
statements on the associated Talk page._**

## Prologue

There is a lot of ignorance and misinformation out there about SMART
reports, so this will be an effort to help users to a better
understanding of the content of SMART reports.

Consider the following SMART report extract:

    Vendor Specific SMART Attributes with Thresholds:
    ID# ATTRIBUTE_NAME          FLAG     VALUE WORST THRESH TYPE      UPDATED  WHEN_FAILED RAW_VALUE
      1 Raw_Read_Error_Rate     0x000f   112   099   006    Pre-fail  Always       -       42208416
      3 Spin_Up_Time            0x0003   096   096   000    Pre-fail  Always       -       0
      4 Start_Stop_Count        0x0032   100   100   020    Old_age   Always       -       7
      5 Reallocated_Sector_Ct   0x0033   100   100   036    Pre-fail  Always       -       0
      7 Seek_Error_Rate         0x000f   056   055   030    Pre-fail  Always       -       25772440425
      9 Power_On_Hours          0x0032   100   100   000    Old_age   Always       -       72
     10 Spin_Retry_Count        0x0013   100   100   097    Pre-fail  Always       -       0
     12 Power_Cycle_Count       0x0032   100   100   020    Old_age   Always       -       7
    183 Runtime_Bad_Block       0x0032   100   100   000    Old_age   Always       -       0
    184 End-to-End_Error        0x0032   100   100   099    Old_age   Always       -       0
    187 Reported_Uncorrect      0x0032   100   100   000    Old_age   Always       -       0
    188 Command_Timeout         0x0032   100   100   000    Old_age   Always       -       0
    189 High_Fly_Writes         0x003a   100   100   000    Old_age   Always       -       0
    190 Airflow_Temperature_Cel 0x0022   057   048   045    Old_age   Always       -       43 (Min/Max 36/43)
    191 G-Sense_Error_Rate      0x0032   100   100   000    Old_age   Always       -       0
    192 Power-Off_Retract_Count 0x0032   100   100   000    Old_age   Always       -       5
    193 Load_Cycle_Count        0x0032   100   100   000    Old_age   Always       -       19
    194 Temperature_Celsius     0x0022   043   052   000    Old_age   Always       -       43 (0 28 0 0)
    197 Current_Pending_Sector  0x0012   100   100   000    Old_age   Always       -       0
    198 Offline_Uncorrectable   0x0010   100   100   000    Old_age   Offline      -       0
    199 UDMA_CRC_Error_Count    0x003e   200   200   000    Old_age   Always       -       0
    240 Head_Flying_Hours       0x0000   100   253   000    Old_age   Offline      -       260348032581703
    241 Total_LBAs_Written      0x0000   100   253   000    Old_age   Offline      -       423266408125
    242 Total_LBAs_Read         0x0000   100   253   000    Old_age   Offline      -       97907054046

Looks rather intimidating, doesn't it, with huge scary numbers! But
with a little knowledge from this page, you should be able to quickly
say "That drive looks fine! A little warm though!"

## Introduction to SMART

From [SMART on Wikipedia](http://en.wikipedia.org/wiki/S.M.A.R.T),
"S.M.A.R.T. (Self-Monitoring, Analysis and Reporting Technology; often
written as SMART) is a monitoring system for computer hard disk drives
to detect and report on various indicators of reliability, in the hope
of anticipating failures." It was a laudable effort by the drive
manufacturers to provide standard ways to both report current drive
parameters and status, and also indicate issues, especially those that
might be predictive of imminent drive failure. Unfortunately, the
standard had considerable ambiguity, and the various drive engineers
have often differed greatly in their interpretations and implementations
of both the common attributes, and the introduction of new attributes.

This page is primarily a guide to understanding SMART attributes, in
real world usage. They are unfortunately very inconsistent in their
behavior, not only between the different attributes, but between the
various drive models, and especially between brands. In some cases, the
RAW_VALUE is the counter to watch, in others, it is more important to
watch what the VALUE does, and there are yet other behaviors too. To
understand a particular attribute report line, you have to understand
how that SMART attribute is usually handled, keeping in mind who the
manufacturer is, and to a lesser extent, what drive model it is. You can
try researching it online, but information is really skimpy, nothing
authoritative at all from the manufacturers themselves. The table of
SMART attributes below should help you understand them, but every
manufacturer uses a different set of SMART attributes, even using the
common ones in differing ways, even across their own drive models.

There are many computer professionals with a very low opinion of SMART
reporting, and they generally discount SMART reports, partly because of
all the inconsistency, but also because many drives fail with no SMART
warnings at all. I find that once you understand the inconsistencies,
and keep some perspective, there is much that can still be learned. For
one example, the Seek_Error_Rate (a critical attribute) on Seagate
drives generally starts and stays in the mid 50's to high 60's
(attribute values generally start at 100 and drop to 1). Not knowing
this, you might immediately think there is a serious issue with your new
Seagate drive. But now that you do know this, you won't be concerned
until it drops into the low 50's or below. The same Seek_Error_Rate
value on any other brand would be immediately concerning. Hopefully the
table below will help you understand what 'normal' looks like, for the
different attributes on different drives by different makers.

## SMART report structure

_Each section below includes an example of
that section, in a gray box with dotted border. It's just an example,
yours may greatly differ._

### General information section

- Identifying information for the SMART program and the drive - its
  model, serial number, firmware, capacity/size, time of this report,
  and SMART support status

  ```shell
  smartctl 5.39.1 2010-01-28 r3054 [i486-slackware-linux-gnu] (local build)
  Copyright (C) 2002-10 by Bruce Allen, http://smartmontools.sourceforge.net

  === START OF INFORMATION SECTION ===
  Device Model:     ST1500DL003-9VT16L
  Serial Number:    5YD3D71H
  Firmware Version: CC32
  User Capacity:    1,500,301,910,016 bytes
  Device is:        Not in smartctl database [for details use: -P showall]
  ATA Version is:   8
  ATA Standard is:  ATA-8-ACS revision 4
  Local Time is:    Fri Nov 18 16:11:43 2011 EST
  SMART support is: Available - device has SMART capability.
  SMART support is: Enabled
  ```

### SMART overall health test

- Basic overall health test of the drive, only 2 choices - PASSED or
  FAILED
- If test result is FAILED, then that means the SMART firmware
  believes that the drive is in imminent danger of catastrophic
  failure, so it is imperative to copy off ALL important data.
  Usually, it is best to copy off the most important files, then the
  next most important files, then the next, and so on, because the
  drive may completely quit before you finish copying.

  ```shell
  SMART overall-health self-assessment test result: PASSED
  ```

### SMART parameters section

- These are generally of little interest to us
- They do include the recommended polling time for the short and long
  tests, in other words don't request a SMART report any sooner than
  this recommendation
- Unfortunately the original standard must have stipulated using a
  single byte to store the polling times, which caps their maximum
  value at 255. That makes the 'Extended self-test' (the long
  test) polling time of 255 rather useless.
- I have seen a case where an unusually long 'Total time to complete
  Offline data collection' for one unusually slow drive was the only
  indication of a faulty drive. The SMART reports for other drives
  that were exactly the same model had essentially identical SMART
  reports, with no issues, except for the difference in this
  parameter.

  ```shell
  Offline data collection status:  (0x82) Offline data collection activity
                      was completed without error.
                      Auto Offline Data Collection: Enabled.
  Self-test execution status:      (   0) The previous self-test routine completed
                      without error or no self-test has ever
                      been run.
  Total time to complete Offline
  data collection:         ( 623) seconds.
  Offline data collection
  capabilities:            (0x7b) SMART execute Offline immediate.
                      Auto Offline data collection on/off support.
                      Suspend Offline collection upon new
                      command.
                      Offline surface scan supported.
                      Self-test supported.
                      Conveyance Self-test supported.
                      Selective Self-test supported.
  SMART capabilities:            (0x0003) Saves SMART data before entering
                      power-saving mode.
                      Supports SMART auto save timer.
  Error logging capability:        (0x01) Error logging supported.
                      General Purpose Logging supported.
  Short self-test routine
  recommended polling time:    (   1) minutes.
  Extended self-test routine
  recommended polling time:    ( 255) minutes.
  Conveyance self-test routine
  recommended polling time:    (   2) minutes.
  ```

### SMART attributes section

- This is the table of SMART attributes for this drive. The columns
  are described below the example. Yours may greatly differ from this
  example, as some drives report more attributes, and some drives
  report considerably fewer. The newest drives often introduce new
  attributes.

  ```shell
  SMART Attributes Data Structure revision number: 10
  Vendor Specific SMART Attributes with Thresholds:
  ID# ATTRIBUTE_NAME          FLAG     VALUE WORST THRESH TYPE      UPDATED  WHEN_FAILED RAW_VALUE
    1 Raw_Read_Error_Rate     0x000f   111   100   006    Pre-fail  Always       -       32796080
    3 Spin_Up_Time            0x0003   095   095   000    Pre-fail  Always       -       0
    4 Start_Stop_Count        0x0032   100   100   020    Old_age   Always       -       5
    5 Reallocated_Sector_Ct   0x0033   100   100   036    Pre-fail  Always       -       0
    7 Seek_Error_Rate         0x000f   100   253   030    Pre-fail  Always       -       265367
    9 Power_On_Hours          0x0032   100   100   000    Old_age   Always       -       19
   10 Spin_Retry_Count        0x0013   100   100   097    Pre-fail  Always       -       0
   12 Power_Cycle_Count       0x0032   100   100   020    Old_age   Always       -       5
  183 Runtime_Bad_Block       0x0032   100   100   000    Old_age   Always       -       0
  184 End-to-End_Error        0x0032   100   100   099    Old_age   Always       -       0
  187 Reported_Uncorrect      0x0032   100   100   000    Old_age   Always       -       0
  188 Command_Timeout         0x0032   100   100   000    Old_age   Always       -       0
  189 High_Fly_Writes         0x003a   100   100   000    Old_age   Always       -       0
  190 Airflow_Temperature_Cel 0x0022   070   069   045    Old_age   Always       -       30 (Lifetime Min/Max 26/31)
  191 G-Sense_Error_Rate      0x0032   100   100   000    Old_age   Always       -       0
  192 Power-Off_Retract_Count 0x0032   100   100   000    Old_age   Always       -       4
  193 Load_Cycle_Count        0x0032   100   100   000    Old_age   Always       -       5
  194 Temperature_Celsius     0x0022   030   040   000    Old_age   Always       -       30 (0 26 0 0)
  195 Hardware_ECC_Recovered  0x001a   037   029   000    Old_age   Always       -       32796080
  197 Current_Pending_Sector  0x0012   100   100   000    Old_age   Always       -       0
  198 Offline_Uncorrectable   0x0010   100   100   000    Old_age   Offline      -       0
  199 UDMA_CRC_Error_Count    0x003e   200   200   000    Old_age   Always       -       0
  240 Head_Flying_Hours       0x0000   100   253   000    Old_age   Offline      -       172868138696723
  241 Total_LBAs_Written      0x0000   100   253   000    Old_age   Offline      -       2919100768
  242 Total_LBAs_Read         0x0000   100   253   000    Old_age   Offline      -       572998840
  ```

- Column 1 is the attribute number, usually a decimal number between 1
  and 255. Some SMART tools report it in hex, from 01 to FF. These are
  relatively standard ID's, except that different manufacturers will
  occasionally introduce a new one, unused by anyone else. Generally,
  the only ones you can count on seeing are: 1, 3, 4, 5, 7, 9, 10,
  187, 190 or 194, 193, 195, 197, 198, and 199.
- Column 2 is the relatively standardized attribute name. There are a
  few that seem only used by a single manufacturer.
- Column 3 is the attribute handling flag, of no interest to us -
  ignore it.
- Column 4 is the VALUE, one of the most important values in the
  table. It is stored in a single byte on the drive for each SMART
  attribute, so its range is from 0 to 255.
  - However, the values of 0, 254, and 255 are reserved for internal
    use, so you never see them.
  - The value of 253 usually always means "Not Used Yet", so when
    you see it, you are probably looking at a brand new drive.
    Sometimes though, there can be a few attributes that take awhile
    before they are used, so may stay 253 for longer.
  - VALUE is almost always used as a normalized scale of perfectly
    good to perfectly bad, usually starting at VALUE=100, then
    dropping toward a worst case of VALUE=1. You can generally think
    of it as representing a scale starting at 100% good, then slowly
    dropping until failure at some predetermined percentage number,
    in the THRESHOLD column.
  - Someone realized that if the values only run from 100 to 1, then
    they are wasting the possible values from 101 to 252, so some
    SMART programmers have decided to stretch the scale for certain
    attributes to start at 200 instead of 100, providing twice the
    data points. Unfortunately, which attributes are scaled from 200
    to 1 is completely inconsistent, with almost all SMART reports
    showing some attributes starting at 100, and other attributes
    starting at 200. In addition, there are a few Maxtor and Samsung
    drives that took the start of the scale all the way to 252 or
    253! Above, you see all but 1 attribute using 100, the exception
    being attribute 199 which starts at 200. In general, you can
    think of 200-type scales as 100 times 2 (just divide the number
    by 2), and from now on, that is what we are going to do in most
    of the discussion.
  - The temperature attributes 190 and 194 are exceptions to the
    scaling. They are either temperatures or forms of the
    temperature, and they don't scale (their WORST value may look
    like it scales though).
  - The error rate attributes 1 and 7 are also exceptions, although
    of a different kind. Raw read and seek errors are a natural part
    of normal operation, so even in a brand new and perfect drive,
    there is a factory-determined optimal rate of read and seek
    errors. They are nothing to worry about, they're the natural
    result of temperature expansion and other things, and they are
    used to help the drive constantly recalibrate itself. But
    because these error rates are non-zero, you essentially cannot
    have a perfect error rate of zero that you declare is a VALUE
    of 100. So manufacturers determine what an optimal error rate
    should be and call it 100. But often, drives may achieve an
    error rate (especially when they are new) that is even better
    than the optimal one set by the manufacturer, which results in
    an error rate that is HIGHER than 100! For an example, see the
    VALUE above of attribute 1, the Raw_Read_Error_Rate. It's as if
    the drive is performing at 111%!
- Column 5 is WORST, the lowest VALUE ever recorded (except for a few
  unusual and uncommon cases).
  - _[incomplete]_
- Column 6 is THRESH, the manufacturer determined lowest value that
  WORST should be allowed to fall to, before reporting it as a FAILED
  quantity. Some are counters, some are informational such as
  temperature or hours used or
  - _[incomplete]_
- Column 7 is TYPE, the type of attribute. It can either be _Pre-fail_
  or _Old_age_.
  - If it is _Pre-fail_, then the attribute is considered a critical
    attribute, one that participates in the overall SMART health
    assessment (PASSED/FAILED) of the drive. If the value of WORST
    falls below THRESH, then the drive FAILS the overall SMART
    health test, and complete failure may be imminent. The
    _Pre-fail_ term means that if this attribute fails, then the
    drive is considered 'about to fail'.
  - If it is _Old_age_, then the attribute is considered (for SMART
    purposes) a noncritical attribute, one that does not fail the
    drive. The _Old_age_ term means that the attribute is related to
    normal aging, normal wear and tear of the drive.
  - When new attributes are introduced, they may seem like a
    critical item, perhaps even with an appropriate THRESH set. But
    if they are marked as _Old_age_, then they do NOT fail the
    drive, even if WORST falls below THRESH. Naturally, this could
    be highly concerning, but there is no authoritative
    interpretation available, so no definitive conclusions can be
    made. These attributes should be considered _Experimental_.
  - _[incomplete]_
- Column 8 is UPDATED. Supposedly, this is an indicator when the
  attribute is updated, _Always_ or _Offline_. If _Always_, then it is
  assumed that the attribute is updated whenever a relevant event
  occurs. In other words, it is always 'live'. If _Offline_, then
  supposedly the attribute is only updated when offline tests are
  being performed. But in real life, our experience is that these are
  inaccurate. Just look at the example above, at attributes 241
  and 242. They appear to be live counters of LBA's read and written,
  yet the test section of that particular SMART report indicates that
  there have been no offline tests performed!
- Column 9 is WHEN_FAILED, usually and thankfully blank! If not blank,
  then it indicates the last operational hour (from attribute 9
  Power_On_Hours) that this attribute failed!
- Column 10 is RAW_VALUE, a manufacturer controlled raw number, which
  may or may not be of interest to us. From now on, we will often
  shorten its name and refer to it only as 'the RAW'.
  - _[incomplete]_

### Error Log section

- _[incomplete]_

  ```shell
  SMART Error Log Version: 1
  No Errors Logged
  ```

- _[incomplete, need example with errors]_

### Test results section

- _[incomplete]_

  ```shell
  SMART Self-test log structure revision number 1
  No self-tests have been logged.  [To run self-tests, use: smartctl -t]

  SMART Selective self-test log data structure revision number 1
   SPAN  MIN_LBA  MAX_LBA  CURRENT_TEST_STATUS
      1        0        0  Not_testing
      2        0        0  Not_testing
      3        0        0  Not_testing
      4        0        0  Not_testing
      5        0        0  Not_testing
  Selective self-test flags (0x0):
    After scanning selected spans, do NOT read-scan remainder of disk.
  If Selective self-test is pending on power-up, resume after 0 minute delay.
  ```

- _[incomplete, need example with tests]_

## Table of attributes

For a fuller description of each attribute, please see [Known ATA
S.M.A.R.T. attributes on
Wikipedia](http://en.wikipedia.org/wiki/S.M.A.R.T#Known_ATA_S.M.A.R.T._attributes).
_[incomplete]_

### 1 Raw_Read_Error_Rate

- This is an indicator of the current rate of errors of the low level
  physical sector read operations. In normal operation, there are
  ALWAYS a small number of errors when attempting to read sectors, but
  as long as the number remains small, there is NO issue with the
  drive. Error correction information and retry mechanisms are in
  place to catch and fix these errors. Manufacturers therefore
  determine an optimal level of errors for each drive model, and set
  up an appropriate scale for monitoring the current error rate. For
  example, if 3 errors per 1000 read operations seems near perfect to
  the manufacturer, then an error rate of 3 per 1000 ops might be set
  to an attribute VALUE of 100. If the rate increased to 10 per 1000,
  then the rate might be scaled to 80 (completely under manufacturer
  control, and NEVER revealed or explained to us!).
- They are called Raw Reads to distinguish them from the more common
  term 'read errors', which represent a much higher level read
  operation. What we usually refer to as a 'read error' is an error
  returned by a read process, that has attempted a series of one or
  more seeks and raw reads, plus optional error corrections and
  retries. It either returns an indicator of total success plus the
  sector data (considered to be in perfect shape), or it returns an
  error code, and no sector data.
- **PLEASE completely ignore the RAW_VALUE number!** Only Seagates
  report the raw value, which yes, does appear to be the number of raw
  read errors, but should be ignored, completely. All other drives
  have raw read errors too, but do not report them, leaving this value
  as zero only. To repeat, Seagates are not worse than other drives
  because they appear to have raw read errors, rather they are the
  only one to report the number. I suspect that others do not report
  the number to avoid a lot of confusion, and questions for their tech
  support people. Seagate leaves those of us who provide tech support
  the job of answering the constant questions about this number.
  Hopefully now that you understand this, you will never bother a kind
  IT person with questions about the Raw_Read_Error_Rate RAW_VALUE
  again?
- _[incomplete?]_
- **Critical attribute - if its WORST falls below its THRESH, then the
  drive will be considered FAILED**

### 3 Spin_Up_Time

- _[incomplete]_

### 4 Start_Stop_Count

- _[incomplete]_

### 5 Reallocated_Sector_Ct

- _[incomplete]_

### 7 Seek_Error_Rate

- _[incomplete]_

### 9 Power_On_Hours

- _[incomplete]_

_[the most important part of this whole page is completely
incomplete!]_

## Additional info

- also known more accurately as **S.M.A.R.T.** or **Self-Monitoring,
  Analysis and Reporting Technology**
- Reference materials
  - http://en.wikipedia.org/wiki/S.M.A.R.T. - all about
    S.M.A.R.T., from Wikipedia; **recommended reading!**
  - http://en.wikipedia.org/wiki/S.M.A.R.T#Known_ATA_S.M.A.R.T._attributes -
    table of S.M.A.R.T. attributes, from Wikipedia
  - http://www.linuxjournal.com/article/6983 - an excellent
    article on SMART and smartctl, from Linux Journal
  - http://smartmontools.sourceforge.net/ - smartmontools Home
    Page
  - http://smartmontools.sourceforge.net/faq.html - smartmontools
    FAQ Page
  - http://smartmontools.sourceforge.net/man/smartctl.8.html - MAN
    Page for smartmontools
- UnRAID related (some are marked _\<\< old \>\>_, meaning some part
  may be obsolete or incompatible with current releases of UnRAID)
  - https://forums.unraid.net/forum/index.php?topic=13054.msg53337#msg53337 -
    keeping SMART values in perspective, and how to properly
    interpret them - a series of posts to help users alarmed by the
    very large numbers they find in a SMART report or 'diff'
  - https://forums.unraid.net/forum/index.php?topic=2135.msg15733#msg15733 -
    a script for grabbing dated SMART reports for all drives
  - [Data Recovery](/unraid-os/manual/troubleshooting#data-recovery)
  - https://forums.unraid.net/forum/index.php?topic=2708 - the
    MyMain thread; an UnMENU plugin; after installing UnMENU,
    install this next; has a Smart View that provides color-coded
    SMART info for all drives
