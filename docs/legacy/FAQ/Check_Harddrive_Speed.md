The native Linux command **hdparm** (Hard Disk Parameters) can be used
to determine your hard disk drive read speed.

Here is an example of the command:

`hdparm -tT /dev/hda`

You will need to change *hda* to match the disk you want to check. You
will see a two line report with various numbers and timings, but the
only one you are interested in is the very last number, in MB/sec.

However, you should probably perform this test at least 5 times and look
at the average. The following one-liner will conduct the test 12 times:

`for ((i=0;i<12;i++)) do hdparm -tT /dev/hda; done`

Convenient way of testing all drives read performance is provided by
script **diskspeed.sh**, listed on this [Wiki
page](http://lime-technology.com/wiki/index.php?title=UnRAID_Add_Ons#Disk_Speed)
and downloadable from this [forum
thread](http://lime-technology.com/forum/index.php?topic=31073). The
script creates reports and graphs of drive read speeds, at multiple
points across the surface of each drive.

[Category: Hard drives](Category:_Hard_drives "wikilink")
