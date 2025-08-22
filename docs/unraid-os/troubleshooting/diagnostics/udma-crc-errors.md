---
sidebar_position: 2
sidebar_label: UDMA CRC errors
---

# UDMA CRC errors

**%%UDMA|udma%% %%CRC errors|crc-errors%%** ([%%SMART|smart%% attribute 199](../../system-administration/monitor-performance/smart-reports-and-disk-health.md)) are typical for Unraid users and often appear in drive health reports. For most users, these errors indicate a communication problem between the drive and the server rather than a failure of the drive itself.

When a %%CRC error|crc-errors%% occurs, the drive detects that data was not received correctly from the host. Unraid automatically tries to recover by resending the data. If the resend is successful, the operation continues as usual, though you might notice slower write speeds due to the retry. These events are logged in the %%syslog|syslog%%.

If recovery attempts fail after several retries, Unraid treats it as a read error. In %%parity|parity%%-protected %%arrays|array%%, Unraid will attempt to rewrite the affected sector using %%parity|parity%% and data from other drives. If this rewrite is successful, operation resumes; if not, the drive is disabled and marked with a red 'x' in the %%WebGUI|web-gui%%.

<details>
<summary><strong>What is a CRC error? (technical explanation)</strong> - Click to expand/collapse</summary>

A **%%cyclic redundancy check (CRC)|crc%%** is a mathematical checksum that detects accidental changes to raw data during transmission. In the context of %%UDMA|udma%% (ultra direct memory access), %%CRC errors|crc-errors%% mean the data sent between your drive and controller failed this integrity check. This usually indicates a physical communication issue - such as a loose or faulty cable - rather than a problem with the drive's platters or flash memory.
</details>

---

## Possible causes of UDMA CRC errors

UDMA CRC errors indicate data transmission problems between your drives and the system. These errors can cause data corruption, slow performance, and drive failures if left unchecked. Understanding the root causes helps you implement targeted fixes rather than guessing at solutions.

<h4>Common causes to investigate</h4>

- **Loose or poorly seated SATA cables:** SATA connectors aren’t very robust and can easily work loose due to vibration or cable tension. Avoid tightly bundling cables, as this can lead to crosstalk and interference.
- **Faulty SATA cables:** Damaged or low-quality cables are common sources of %%CRC errors|crc-errors%%.
- **Power delivery issues:** Insufficient or unstable power, often due to splitter cables or an overloaded power supply, can cause intermittent errors.
- **Unseated disk controller:** Communication errors may occur if the controller card isn't fully inserted into its slot.
- **Drive hardware faults:** While rare, a failing drive can also produce CRC errors.

---

## Recovery process

When you notice %%CRC errors|crc-errors%%, the first step is to carefully check and reseat both the SATA and power cables to your drives. Replace any cables that appear damaged or don’t fit securely. If errors persist, check your power supply and controller connections, and consider swapping cables or ports to isolate the problem.

If %%CRC errors|crc-errors%% continue after addressing cabling and power, further investigation may be needed to rule out a failing controller or drive.

---

## Understanding CRC Error Indicators

### Occasional vs. Frequent Errors

<details>
<summary><strong>Click to expand/collapse</strong></summary>

Understanding the frequency and pattern of %%CRC errors|crc-errors%% helps you determine the urgency of your response. Not all errors require immediate action, but patterns can reveal underlying problems that need attention.

<h4>Occasional errors (low concern)</h4>
A few %%CRC errors|crc-errors%% over weeks or months are typically not a concern. These isolated incidents may be caused by temporary power fluctuations, cable movement during maintenance, or other transient issues that resolve themselves.

<h4>Frequent errors (high concern)</h4>
%%CRC errors|crc-errors%% occurring daily or weekly, or rapidly increasing error counts, indicate a persistent problem that needs immediate investigation. This pattern often points to hardware issues like loose connections, failing cables, or power supply problems that will only worsen over time.

<h4>When to take action</h4>
Investigate immediately if errors are frequent or increasing. Check your cabling and power setup for intermittent issues, and monitor error rates to identify worsening conditions. Consider preventive maintenance if errors persist, as these problems rarely resolve on their own and can lead to more serious failures.
</details>

### Pending Sector Count

<details>
<summary><strong>Click to expand/collapse</strong></summary>

The **Current Pending Sector Count** ([%%SMART|smart%% attribute 197](../../system-administration/monitor-performance/smart-reports-and-disk-health.md)) is a critical indicator that often appears alongside %%CRC errors|crc-errors%%. This combination signals a serious problem that requires immediate attention and careful monitoring.

Pending sectors indicate unreliable disk areas that may not be readable when accessed. These are sectors that have experienced read errors and are now marked as potentially problematic by the drive's firmware. When pending sectors appear alongside %%CRC errors|crc-errors%%, it suggests that communication problems are causing physical damage to the drive's ability to store and retrieve data reliably.

<h4>Why this combination is dangerous</h4>
%%CRC errors|crc-errors%% indicate communication issues between the drive and controller, while pending sectors show that some areas of the disk are becoming unreliable. Together, they create a high-risk situation where your data protection may be compromised. If another drive fails while this one has pending sectors, your ability to recover data could be severely limited, potentially jeopardizing [data recovery](../../troubleshooting/common-issues/data-recovery.md) efforts.

When you see this combination, you should:

- **Immediately** backup any critical data that isn't already protected.
- Check the drive's health using extended %%SMART|smart%% tests, and consider drive replacement if pending sectors continue to increase.
- Monitor the situation closely for additional warning signs, and be prepared to rebuild your array if the drive becomes unreliable.
 
</details>

### CRC Count Persistence

<details>
<summary><strong>Click to expand/collapse</strong></summary>

The %%CRC errors|crc-errors%% count in your drive's [%%SMART|smart%% data](../../system-administration/monitor-performance/smart-reports-and-disk-health.md) never resets - it only increases.

This cumulative nature means:

- The count represents the total lifetime errors for that drive
- Monitor the rate of increase to identify worsening conditions
- Once an error occurs, it's permanently recorded
- Use the count to schedule preventive maintenance before problems escalate

Don't panic if you see a few CRC errors, but do track the rate of increase. A sudden spike in errors often indicates a new problem that needs immediate attention.
</details>

### Dashboard Warning Icon

<details>
<summary><strong>Click to expand/collapse</strong></summary>

When Unraid detects a %%CRC error|crc-errors%%, the **Dashboard** displays a warning icon next to the affected drive. This is a %%SMART|smart%% warning that should prompt you to review and address the issue.

<h4>Why this matters</h4>

- Early warning system for potential hardware issues
- Helps prevent data loss by catching problems early
- Indicates when preventive maintenance is needed
- Part of Unraid's proactive monitoring system

Click the warning icon to view detailed %%SMART|smart%% information and acknowledge the warning.
</details>

### Acknowledging SMART Warnings

<details>
<summary><strong>Click to expand/collapse</strong></summary>

To acknowledge and clear SMART warnings:

1. Click the **orange warning icon** next to the affected drive
2. Select **Acknowledge** from the options menu
3. Confirm the action if prompted
4. The icon will turn **green** to indicate acknowledgment

<h4>What acknowledgment does</h4>

- Clears the warning from your immediate view
- Tracks that you've seen the issue
- Only re-alerts if the error count increases further
- Maintains monitoring of the underlying problem

:::important 
Acknowledging a warning doesn't fix the underlying issue - it just tells Unraid you're aware of it. You should still investigate and resolve the root cause of the %%CRC errors|crc-errors%%.
:::
</details>
