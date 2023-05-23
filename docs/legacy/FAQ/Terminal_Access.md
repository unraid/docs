# Terminal Access

**What is "Terminal access"?**

*Synonyms for 'terminal': console, shell, command window, DOS box,
command prompt, Windows cmd shell, Telnet window*

It's the opening of a terminal session and obtaining a command line
prompt, at which you can enter commands directly on the system,
whether you are on the system itself using its keyboard and monitor,
or on a different machine using SSH or Telnet. It's called by
different things, such as a 'shell' or 'console' or 'terminal'
or 'command window', but always is line driven and has a command
prompt. It's very similar to an MS-DOS command prompt in Windows, a
'DOS box', except this is Linux, so you can't use DOS commands.
Linux terminal sessions usually always require a login with
password.

If you have a monitor attached to your unRAID server, then when you
boot normally (not the boot GUI), you end up at the console with a
login prompt. This console is a terminal session.

For terminal access from other machines, unRAID includes both Telnet
and SSH support. Telnet is no longer recommended however, because it
is older and easier to attack. SSH is recommended instead as more
secure. There are instructions below for disabling Telnet, but
Telnet does make it easier the first time you want to access your
server from another machine. But please remember that it is more
secure to disable Telnet, and set up SSH for all further terminal
access.

Linux and Mac stations already have terminal access built in. For
Windows, PuTTY is the recommended package, with enhanced support for
both Telnet and SSH. Instructions and links in the PuTTY section
below. Another recommendation, for Windows or Mac, is
[Xshell](http://www.netsarang.com/products/xsh_overview.html),
similar to PuTTY.

**Naturally, you should already have entered a password for 'root'
on your unRAID server!**

*Note: this page assumes you are running unRAID v6. The Telnet
sections should work for all versions of unRAID, but the SSH
sections are only useful for systems with SSH installed and working.
SSH is included and set up in v6, but it will only work with earlier
versions if you install an SSH package.*

## SSH

unRAID v6 and later automatically sets up the SSH keys necessary for
SSH access

For terminal access from a Windows station, use the PuTTY
instructions below to install, configure, and set up the SSH
connection

*more help needed? ssh setup help? (WIP)*

## Telnet

### Using Telnet

The unRAID Server software includes a built-in Telnet server, which
may be used to open a command window (also called a *shell* or
*console*) on your server. Access to this console is through a
Telnet program from your desktop station. The Telnet tool is usually
a part of most operating systems, and generally immediately
available, but in Windows Vista and Windows 7 and probably later
versions too, it needs to be 'turned on' through the "Turn
Windows features on or off" tool. Please see [this
thread](http://lime-technology.com/forum/index.php?topic=4092) for
comments on Telnet usage in Vista, Windows 7, and the Mac. Instead
of the built-in Telnet tool, we recommend installing PuTTY, with
enhanced Telnet services.

## PuTTY

Linux and Mac have their own built in terminal access programs, but
Windows needs a little help. Windows does have a Telnet client, but
it is a bare bones function, and usually hidden and needing to be
turned on. For Windows, we strongly recommend the **PuTTY** program
package. It's free and includes enhanced support for both Telnet
and SSH. Unlike Windows Telnet, PuTTY allows you to use the mouse
and advanced keys, such as the arrow and function keys. PuTTY can
also be setup with your unRAID server name or IP and SSH host key.

* [PuTTY web site](http://www.chiark.greenend.org.uk/~sgtatham/putty/)

* [Direct download of PuTTY for
Windows](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)

* [PuTTY downloads
page](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) -
for other downloads, such as other OS's, beta versions, or a Windows
installer version

Because PuTTY is just an enhanced Telnet and SSH program, it can be
used instead of Windows Telnet anywhere that Telnet or SSH is
mentioned, such as anywhere in the Wiki or the unRAID forums. It is
used the same way as Windows Telnet, but because it supports the
mouse and arrow and function keys, it is much easier to use in
programs like MC (Midnight Commander, a dual pane commander-like
file manager). For an example, see [Transferring Files Within the
unRAID
Server](/legacy/FAQ/Transferring_Files_Within_the_unRAID_Server).

*Note for UnRAID v5 and v6 users: some have found that Midnight
Commander looks funny, with accented letters (mostly a little 'a'
with a hat) where line drawing characters should be. In your PuTTY
configuration, go to Window-\>Translation and set Remote Character
Set to something like UTF-8, then restart MC (thanks to Wody for
this tip, see
[this](http://lime-technology.com/forum/index.php?topic=18157)).
Wody has an additional PuTTY tip in [this
post](http://lime-technology.com/forum/index.php?topic=18157.msg162943#msg162943).*

PuTTY has a number of settings, but the defaults are usually fine.
On the **Window** tab, I set **Columns** to 120, **Rows** to 60, and
**Lines of scrollback** to 2000. On the **Translate** tab, I set
**Remote character set** to UTF-8.

First time SSH connection: set **Connection type** to SSH, then
enter your exact unRAID server name or IP (if static), then enter a
**Saved Session** name (such as *SSH Tower*), then click the
**Save** button. You are ready to click your session name and
connect! When you do this the first time, you will be informed about
the host key and whether you trust this server and want to cache its
host key. Click **Yes** and the host key will be saved, and you
won't be asked again. (This creates a secure connection that can't
be spoofed.) Then a terminal session box will open up with a login
prompt. Enter *root* and press `<Enter>`, then enter your
password and the `<Enter>` key again. You are now in a Linux
terminal session at a command prompt! Type *exit* to quit.

First time Telnet connection: set **Connection type** to Telnet,
then enter your exact unRAID server name or IP (if static), then
enter a **Saved Session** name (such as *Telnet Tower*), then click
the **Save** button. You are ready to click your session name and
connect! When you do, a Telnet terminal session box will open up
with a login prompt. Enter *root* and press `<Enter>`, then
enter your password and the `<Enter>` key again. You are now
in a Linux terminal session at a command prompt! Type *exit* to
quit.

On subsequent uses, just start PuTTY and click the session name you
want to use, and you will immediately be at the login prompt.

*Note: [Xshell](http://www.netsarang.com/products/xsh_overview.html)
is a commercial alternative to PuTTY, similar and possibly more
powerful, free for home use.*

## Opening a terminal session with the Windows Telnet tool

To open a Telnet session from Windows click Start -\> Run. In the
dialog box type:

`telnet tower`

If you renamed your server from tower, enter that name instead.
Also, you may enter the server's IP address instead of its name. A
command window will open and you will be presented with a login
prompt. The login name is *root*, and by default, there is no
password. To terminate the session, just close the window. You may
have multiple Telnet sessions to the same server. You can
select/copy/paste the text from a Windows Telnet window by
right-clicking the title bar. Notes regarding the command shell:

* commands and arguments are case-sensitive
* commands and arguments must be separated with spaces
* commands are executed after pressing the Enter key

## Related links

* [SSH vs
Telnet](http://lime-technology.com/forum/index.php?topic=30273) -
discussion of the merits of both, why many want Telnet disabled
* [Google search of "how to secure your ssh
server"](http://www.google.com/search?q=how+to+secure+your+ssh+server)
* [Console](Console.md) - basics of console usage, plus
commands for drives, networking, system management, files and
folders, and system information
