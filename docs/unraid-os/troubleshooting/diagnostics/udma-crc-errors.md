---
sidebar_position: 2
sidebar_label: UDMA CRC errors
---

# UDMA CRC errors

**UDMA CRC errors** (SMART attribute 199) are typical for Unraid users and often appear in drive health reports. For most users, these errors indicate a communication problem between the drive and the server rather than a failure of the drive itself.

When a CRC error occurs, the drive detects that data was not received correctly from the host. Unraid automatically tries to recover by resending the data. If the resend is successful, the operation continues as usual, though you might notice slower write speeds due to the retry. These events are logged in the syslog.

If recovery attempts fail after several retries, Unraid treats it as a read error. In parity-protected arrays, Unraid will attempt to rewrite the affected sector using parity and data from other drives. If this rewrite is successful, operation resumes; if not, the drive is disabled and marked with a red 'x' in the WebGUI.

<details>
<summary><strong>What is a CRC error? (technical explanation)</strong></summary>

A **cyclic redundancy check (CRC)** is a mathematical checksum that detects accidental changes to raw data during transmission. In the context of UDMA (ultra direct memory access), CRC errors mean the data sent between your drive and controller failed this integrity check. This usually indicates a physical communication issue—such as a loose or faulty cable—rather than a problem with the drive's platters or flash memory.
</details>

---

## Possible causes of UDMA CRC errors

- **Loose or poorly seated SATA cables:** SATA connectors aren’t very robust and can easily work loose due to vibration or cable tension. Avoid tightly bundling cables, as this can lead to crosstalk and interference.
- **Faulty SATA cables:** Damaged or low-quality cables are common sources of CRC errors.
- **Power delivery issues:** Insufficient or unstable power, often due to splitter cables or an overloaded power supply, can cause intermittent errors.
- **Unseated disk controller:** Communication errors may occur if the controller card isn't fully inserted into its slot.
- **Drive hardware faults:** While rare, a failing drive can also produce CRC errors.

---

## Recovery process

When you notice CRC errors, the first step is to carefully check and reseat both the SATA and power cables to your drives. Replace any cables that appear damaged or don’t fit securely. If errors persist, check your power supply and controller connections, and consider swapping cables or ports to isolate the problem.

If CRC errors continue after addressing cabling and power, further investigation may be needed to rule out a failing controller or drive.

---

## Understanding CRC Error Indicators

### Occasional vs. Frequent Errors

<details>
<summary>Click to expand/collapse</summary>

A few CRC errors over a long period are not typically a concern. However, if you see CRC errors happening regularly or the count is increasing quickly, investigate your cabling and power setup immediately to prevent more serious issues.
</details>

### Pending Sector Count

<details>
<summary>Click to expand/collapse</summary>

If you notice the **Current Pending Sector Count** (SMART attribute 197) increasing alongside CRC errors, this is a red flag. Pending sectors mean some disk areas may not be reliably readable, which can jeopardize data recovery if another drive fails.
</details>

### CRC Count Persistence

<details>
<summary>Click to expand/collapse</summary>

The CRC error count in your drive’s SMART data never resets—it only increases. Even after fixing a cable or power issue, the number remains as a historical record.
</details>

### Dashboard Warning Icon

<details>
<summary>Click to expand/collapse</summary>

When Unraid detects a CRC error, the Dashboard displays a warning icon next to the affected drive. This is a SMART warning that should prompt you to review and address the issue.
</details>

### Acknowledging SMART Warnings

<details>
<summary>Click to expand/collapse</summary>

To clear the warning, click the orange icon and choose **Acknowledge**. The icon turns green, and Unraid will only alert you again if the CRC count increases further.
</details>
