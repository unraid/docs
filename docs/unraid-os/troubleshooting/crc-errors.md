---
sidebar_position: 9
---

# UDMA CRC Errors

Users frequently see that they are getting UDMA CRC errors (SMART
attribute 199) reported for some drives.

A CRC error indicates that the drive has noted that it has not correctly
received the data from the host, and typically indicates a connection
issue of some sort. This will normally trigger Unraid to attempt a
recovery by resending the data. If this resend succeeds then Unraid will
continue as normal, but the retry will have the end effect of slowing
down the perceived write speed due to the delay caused by the retry.
These retry attempts will show up as entries in the syslog.

If the recovery attempt fails then after several retries Unraid will
decide it has a Read error on the drive. If the array is parity
protected this will then trigger Unraid to attempt to rewrite the
problem sector with the correct data based on the parity data and the
corresponding sector on all the 'good' data drives. If this write
succeeds then Unraid will continue as normal, but if the write fails
Unraid will disable the drive and stop using it. This disabled state is
indicated in the GUI by the fact that the drive is flagged with a red
'x'.

Possible causes of such errors are:

- Badly seated SATA cables. The SATA connector is not a very robust
  connector and can easily work slightly loose due to vibration or
  tension on the cables. It is also a good idea to avoid 'bundling'
  the cables together in an attempt to tidy up the cabling as this can
  result in cross-talk interference between the cables.
- Bad SATA cables.
- Insufficient power to the drive. Quite frequently associated with
  splitter cables on the power lines, but also possible if the power
  supply is insufficient to power all drives simultaneously so that
  power dips occur.
- Badly seated disk controller
- Genuine disk problem (least likely but not unknown).

The first guidance that is always given in the forum when a user reports
CRC errors is to first carefully check the SATA and Power cabling to the
drives as this is by far the commonest cause of such issues.

Points to note are:

- Occasional CRC errors are not really a cause for concern but if they
  are happening regularly or in large numbers then this definitely
  needs looking into to determine the cause and fix the issue.
- It is not unusual for the **Current pending sector count** (SMART
  attribute ) 197 to also be incremented when getting a lot of CRC
  errors. This is more of a cause for concern as it means these
  sectors may not be read reliably if another disk fails and a
  recovery action needs to be performed as error-free recovery
  requires all 'non-failed' drives to be read without error.
- The CRC count is stored internally in the drive's SMART information
  and never resets to zero - it can only ever increase.
- A CRC error will result in the Dashboard page indicating a SMART
  related issue has happened by an orange 'thumbs-down' symbol
  against the drive.
- The user can acknowledge they have seen such an error by clicking on
  the orange symbol and choosing the 'Acknowledge' option from the
  resulting menu that is displayed. This will result in the icon
  turning green again and Unraid will only prompt you again if the
  value of the CRC count increases.
