# Transferring Files from a Network Share to Unraid

Open a [terminal session with SSH or Telnet](Terminal_Access)
to unRAID, and login as root. Create a temporary directory on the
server:

`mkdir /work`

Mount a remote directory to the new directory:

`mount -t cifs //workstation/share /work`

(Substitute name of your workstation for 'workstation', and it will
probably prompt you for a workstation user name/password).

Copy all the files and folders from the workstation's share to a disk
share on the server:

`cp -r /work/* /mnt/disk1`

(Of course you can copy from the workstation share to any disk/share.
Eg. /mnt/user/`<sharename>`{=html})

Edit: Another option is to use rsync to get speed/progress information:

`rsync -av --stats --progress /work/ /mnt/disk1/`

When done:

`umount /work`\
`rmdir /work`

Caution: If you have directory or file names with non-English
characters, commonly found in titles and names for media files from
European and South American countries, I would recommend to use Windows
Explorer. The Linux commands either skip the whole file or directory, or
replaces the "strange" letter with an underscore. Also, the cp command
may set all file attributes to system and hidden, so the files don't
show up in Windows Explorer. This may be corrected with chmod command,
but I found it better to avoid this altogether by sticking to the
Explorer in Windows.

## Another method using Netcat and Tar

See also [this
post](http://lime-technology.com/forum/index.php?topic=5045.msg47257#msg47257)
for an alternative method of data transfer between Linux systems, such
as unRAID.

## Unicode issues

If you have any kind of foreign characters in your filenames (for
instance, an accented letter in a movie title), you want to mount the
cifs share with the UTF-8 option as shown below, otherwise the mount
will give you a garbled character when doing the copy/rsync. When this
garbling happens, your directory will also be unlistable from a Mac
(tested on 10.9) over AFP or SMB.

`mount -t cifs //workstation/share /work -o iocharset=utf8`

## Permission issues after copying

Because your SSH copy or rsync process is typically run as root, you may
experience 'Access Denied' messages with users writing to directories
that have been created as part of this job. This can be rectified by
running the 'New Permissions' job from the tools menu in the web admin
after the copy process has completed.
