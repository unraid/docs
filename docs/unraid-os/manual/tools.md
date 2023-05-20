# Tools

*THIS SECTION IS STILL UNDER CONSTRUCTION*

The Tools section of the Unraid GUI is used to access a number of Tools
to help with managing an Unraid server on a day-to-day basis. The list
of tools available is often extended by 3rd party supplied plugins.

# Unraid Standard Tools

This section covers tools that are supplied as standard with an Unraid
installation. They are grouped into a number of sections for ease of
selection.

## Unraid OS

### Diagnostics

### Hardware Profile

### New Config

**IMPORTANT:** *This tool is not part of the standard process for
recovering from a disk failure. In most cases since the procedure
normally invalidates parity it will have the opposite effect and stop
you being able to recover the contents of a failed disk intact.*

This option is used to put the array back into a state where disk drives
can be assigned as wanted and then parity rebuilt to match the new
assignments. It exploits the fact that Unraid can recognise drives that
have previously been used by Unraid and will leave their contents
untouched (as long as the drive is not assigned as a parity drive).

When using this option you are given the option to preserve previous
assignments at various levels. It is not important which you use but
using one can minimise the amount of re-selecting drives to specific
slots (and thus reduce the chance of you making an error) by selecting
one of them. After you have run this option you can then return to the
Main tab and make any further adjustments you want. The assignments then
get committed when you start the array.

The basic process is therefore:

- Select the New Config tool from the Tools tab in the Unraid GUI
- Click the Check box that says you want to proceed to use this tool.
- Set the level of assignments you initially want to keep. In most
    cases selecting the option to keep all assignments is the best
    choice as it puts you in a state where you just need make any
    desired changes from your current assignments.

Press the **Apply** button to run the tool. After doing this there is no
obvious feedback that anything has been done.

- Return to the Main tab and change the drive assignments to how you
    now want them to be set. This can involve adding new drives,
    removing drives or changing the slots to which drives are assigned.
- Make sure you have not accidentally assigned a drive containing data
    to a parity slot as if you do so when you start the array the
    contents will be destroyed.
- There is a checkbox next to the Start button to allow you to say
    that parity is already valid. You should **not** check this box
    unless advised to do so by a knowledgeable Unraid user as in most
    cases making changes to the drive assignments will invalidate
    parity. There are special cases where using this option can be
    sensible after something has gone wrong with the array but only the
    more experienced Unraid users will know what these are.
- There is also a checkbox option to start the array in Maintenance
    mode. You probably only need this if you have been advised to use it
    as part of a non-standard data recovery action.
- Press the Start button to commit the new drive assignments.
- If you have encrypted file systems the array will not start at this
    point, but instead change to allow you to enter your encryption
    details. Enter these and press Start again to start the array.
- If you were starting in normal mode (i.e. not Maintenance mode) then
    the drives will now be mounted.
- Unraid will now start building new parity based on this current set
    of assignments.

### New Permissions

### Archived Notifications

### Processes

### System Devices

### System Log

## webGUI

### Language

### Page Map

### Vars

## About

### Credits

### EULA

### Registration

### Update OS

# 3rd Party Tools

**DISCLAMER**: The tools listed here are not provided or supported by
Limetech. There is always a risk that installing one /f these tools can
cause system instability (although tis is unlikely for the more widely
used ones)

The unRaid community is very active and has contributed a wide variety
of additional tools to add extra functionality to an unRaid server. The
following section covers some of the more commonly installed 3rd party
tools. It is by no means an exhaustive list but will give an indication
of the breadth of the tools available

These 3rd party tools would normally be installed by using Community
Applications (the Apps tab). Such tools will each have a support thread
in the Plugins Support section of the unRaid GUI and users should use
this thread to raise queries, concerns, or suggestions for improvement.

## Unraid OS

### Config File Editor

CA Config Editor is a simple file editor for advanced users that will
allow you to edit within your browser any of the Unraid configuration
files (or any file on your server - useful for easily editing
application's appdata config files without utilizing the command
prompt)

### Docker Safe New Perms

This is part of the Fix Common Problems plugin.

It differs from the standard Unraid New Permissions tool in that it will
never change permissions on the appdata folder/share that is normally
used to store working files for docker containers.

## About

### Update Assistant
