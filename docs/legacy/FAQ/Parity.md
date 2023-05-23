# Parity

Parity is used by unRAID to protect against data loss. If a drive in the
array fails, the data on the other drives can be combined with the
parity data to reconstruct the missing data.

Why have parity? Because there are only two types of hard disks in the
world:

- Disks that have already failed.
- Disks that have not yet failed\... but just need a bit more time
    until they do.

## How parity works

In general, a parity process is designed to detect a single bit change
across a given set of bits, by setting the value of an added bit such
that a summation across that set of bits is forced to a known value. The
added bit is known as a **parity bit**.

In unRAID, the parity bits are stored on a **parity drive** independent
of the data drives. This parity bit works across the set of bits in the
same relative bit position on each drive. So the 57th bit of the parity
drive is the parity bit for the 57th bit of all of the data drives. A
parity check of the 57th bit position therefore adds up all of the 57th
bits of every drive including the parity drive, and checking to see
total is an EVEN number. If the value returned is not EVEN, then the
parity bit is toggled so that the parity check WILL return an EVEN
number.

Why an EVEN number? unRAID uses 'even parity', which simply means that
the summation process (using a mathematical operation called 'exclusive
OR' or 'XOR') across that set of bits must return a value that is an
EVEN number.

- [PCGuide discussion of
    XOR](http://www.pcguide.com/ref/hdd/perf/raid/concepts/genParity-c.html)
- [Wikipedia on XOR](http://en.wikipedia.org/wiki/Exclusive_or)

Digital data is stored as a 1 or a 0. So, for example:

- If you have 4 drives with bit values 1,1,1,1 the parity will be 0
    (1+1+1+1+0=even).
- If the bit values are 1,0,0,0 the parity will be 1 (1+0+0+0+1=even).

When a drive is added to a parity-protected unRAID array, it is first
cleared by writing zeroes to all bits of all sectors of that drive. A
zero value will not impact parity. Once the new drive is full of zeros,
unRAID can silently slip it into the array without needing to rebuild
parity. Several disks can be added simultaneously in this way.

## Reconstructing data

There are only two situations that the parity data is used by unRAID to
reconstruct data:

- when a disk is being reconstructed; and
- when a bad sector is detected.

At these times, all of the disks (including parity) are read to
reconstruct the data to be written to the target disk. As the sum of the
bits is always even, unRAID can reconstruct any ONE missing piece of
data (the parity or a data disk), as long as the other pieces are
correct.

In the two examples above, say the 2nd drive fails.

- 1+x+1+1+0=even, x must equal 1
- 1+x+0+0+1=even, x must equal 0

As parity is so important for data reconstruction, ensure that parity is
correct by running parity checks periodically.

If you physically remove a single disk from your array you will still be
able to read and write to it. It is 'simulated' by reading all the other
data disks and parity. In the same way, the parity disk is updated as
needed when writing to the simulated disk. If you now install a
replacement disk, it can be completely rebuilt from the re-constructed
contents based on parity and all the other data drives.

## Checking parity

In a **parity sync**, the system reads all the data disks and writes the
computed parity to the parity disk.

In a **parity check**, the system reads all the data disks and the
parity disk, comparing computed parity with stored parity. This
operation has a flag:

`CORRECT - if a parity mismatch occurs, write parity disk with computed parity and report in syslog`\
`NOCORRECT - just report in syslog`

Only the first 100 parity check errors are reported. (The messages in
the system log are generated for each sector address where a parity
mis-match occurs. So if you tried a parity-check on an array that
doesn't have valid parity, the system log would quickly become massive;
hence the limit to 100 messages.)

These parity mis-matches are called 'sync errors' or 'parity sync
errors'. They are a count of how many block addresses were found where
computed parity did not 'synchronize' with (i.e., match) stored parity.
(A 'block' is 4096 bytes. This is also the linux PAGE size - the
fundamental unit of I/O.)

Parity disk being **valid** means that there is a parity disk present,
and sometime in the past a parity sync completed without error (or being
cancelled). Once parity sync has completed, the parity disk will always
be 'valid' (and have a green dot). 'Valid' in this sense means that it
can be used to reconstruct a failed data disk.

(Actually, 'valid' is a status that applies to all array disks, both
data disks and the parity disk. If all array disks are valid except for
one of them, it means that the one that's not valid can be
reconstructed using the data from all the other ones.)

When a parity check/nocorrect produces errors, why is the Parity disk
still marked 'valid'? This is because if the system marked the parity
disk 'invalid' because of a handful of parity errors, and then another
disk failed, that other disk could not be reconstructed (because now
there would be 2 invalid disks in the array). So the entire parity disk
isn't marked invalid because of detected parity errors. Of course, a
user can always deem parity invalid by un-assigning it.

Once parity has been calculated there should only be 2 ways that there
should be parity check errors:

- a non-clean shutdown, ie, sudden power loss or system reset. What
    happens here is that there could be pending writes to the parity
    and/or data disks that don't get completed, leaving the
    corresponding stripe with inconsistent parity.
- an undetected hardware fault (such as silent memory corruption).

## Parity disk

### Size

The size of the parity disk must be equal to or larger than the largest
data drive.

### Performance

Using parity to protect your data inevitably has an impact on
performance when you are writing data to the array. Any time a data disk
is written to, the parity disk needs to be updated as well. Each write
to a parity-protected unRAID data disk results in 4 disk operations: a
read and write for parity, and a read and write for data. The platter of
each disk has to make a full revolution after reading to position the
disk head back over the sector being written.

Writing to the unRAID array is also limited by the slowest (rotational
speed) drive involved. If only the parity drive is a 7200 RPM drive,
then you are still limited by the speed of the data drive. You'll see
no improvement in write speed unless there are multiple slower data
drives being written to simultaneously, and one faster 7200 RPM parity
drive trying to keep up with both of them.

## Dual parity

For large arrays, 'dual parity' -- or, the facility to have a second
parity disc is not simply a mirror of the first. This permits two
simultaneous drive failures without losing data.

In a P + Q redundancy system (as in a RAID-6 system), there would be two
redundancy disks: 'P', which is the ordinary XOR parity, and 'Q', which
is a Reed-Solomon code. This allows unRAID to recover from any 2 disk
errors, with minimal impact on performance.(Requires Clarification that
this is actually used)

Further discussion:
[1](http://lime-technology.com/forum/index.php?topic=2634.msg21695#msg21695)
