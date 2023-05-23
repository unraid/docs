# Transferring Files Within the Unraid Server

If you are using Windows Explorer to move files between drives, you are
actually copying the files TWICE across the network, from the unRAID
server to your Windows machine, and back again. For copying a few files,
this is not a problem. But if you are moving a lot of data, here are
faster methods.

## Midnight Commander - Easy to Use GUI Tool

Use Midnight Commander and PuTTY instead. Type mc at the command prompt
in a telnet/PuTTy session to start the GUI. Midnight Commander is built
into unRAID v4.3 and up. For earlier versions, and a link to PuTTY (an
alternative to Telnet that allows use of a mouse within **mc**), see
[this thread](http://lime-technology.com/forum/index.php?topic=1341.0)).
Midnight Commander is a Linux console tool, and needs to be run from
either the physical console on your unRAID server, or from a Telnet
console on your desktop station. For more information, see the
[Telnet](Terminal_Access.md#telnet) page, which includes information on
[PuTTY](Terminal_Access.md#PuTTY).

## Move Files Overnight

If you go to the unRAID server and run Midnight Commander from there,
you can use it to move a bunch of files overnight. But if you use **mc**
from a Telnet prompt from your Windows (or other) workstation, you will
have to leave the computer on and the Telnet session open until the disk
operations are complete. If the Telnet session ends, so does the copy or
move operation.

But with a little knowledge of Unix commands, you can easily start
moving files around your unRAID server and then shut down Telnet and
your workstation. The key is the "nohup" command (nohup means "no
[don't] hang up"). If you put "nohup" before any command and an
ampersand (&) afterwards, the command will run in the background until
it is complete. Your command prompt will return immediately.

So, for example, if you wanted to move a bunch of movies from Disk1 to
Disk2, you could use this command from a Telnet (PuTTY or otherwise)
prompt \...

``**`nohup mv /mnt/disk1/Movies/* /mnt/disk2/Movies &`**

Do a quick check to see that files are starting to appear in the
destination folder to make sure you didn't have a typo in the command,
and then exit from the Telnet session. The files will continue to be
moved as fast as unRAID can move them, and use ZERO network bandwidth.
Make sure it is complete before shutting down your unRAID server, as
copying hundreds of gigs can take a long time to complete even at the
fastest speed.

nohup can also be used with the "cp" (copy) command (see Unix Commands
section below)

nohup creates a log file called 'nohup.out' with the command output.
The basic "mv" command doesn't create any output, but "cp" outputs
the name of each file it copies. If you use "cp" to copy a LOT of
small files (300,000+), you risk having nohup.out get quite large -
large enough to fill up your unRAID server ramdisk - not a good thing.

## Unix Commands=

There are two effective methods available to move files from one drive
to another from within unRAID (v4.x and later).

### Copying files

1\) Copy the files from disk# (where '#' is the number of the disk in
unRAID)

`cp -r /mnt/disk# /mnt/disk#`

Example:

`cp -r /mnt/disk4 /mnt/disk8`

Copies all contents of disk4 to disk8. All files/directories on disk4
remain.

Note the above example will create a dir named 'disk4' on disk8 with
the contents underneath it. The original file date/time stamps will not
be preserved.

See below for syntax to copy the root directory names only with all
files underneath them and preserve the original file date/time stamps.

The **-r** option causes the **cp** command to copy directories
recursively. It is not necessary with a simple file copy.

If you want to follow along as the copy proceeds, add the **-v** option
(requesting verbose output).

To copy the root directory names only and everything under them,
preserve the original file date/time stamps and log the output to a text
file on the flash drive in a format readable by an editor like windows
notepad use this syntax:

`cp -r -v -p /mnt/disk4/* /mnt/disk8 | todos > /boot/disk1copy.txt`

### Moving files

2\) Move the contents of disk1 to disk2 using the mv command

`mv /mnt/disk#/ /mnt/disk#`

Example:

`mv /mnt/disk1 /mnt/disk4`

Moves all contents from disk1 to disk4. All files/directories on disk1
are now gone.

Caution: Using the `<b>`{=html}move`</b>`{=html} command may be
potentially dangerous as it will copy to the destination drive and then
delete your data file(s) from the source drive. In the interest of
maximum safety, you may want to use `<b>`{=html}copy`</b>`{=html}
instead.

### Quotes

If you want to copy or move entire folders from one drive to another,
and the folder names have spaces in them, you need to use "quotes"
around the folder name, as in this example:

`mv /mnt/disk2/"The Empire Strikes Back" /mnt/disk3`

In the above example, the entire folder called **The Empire Strikes
Back** would be moved from Disk 2 to Disk 3 with the same sub-folder
structure.

### Wildcards

Wildcards are available as well. For example, if you want to copy all of
the files from Disk 2 over to Disk 3, use the **mv** command like this:

`mv /mnt/disk2/* /mnt/disk3`

In this example, all files and folders on Disk 2 would be relocated over
to Disk 3 in the exact same folder structure as it was on Disk 2.
