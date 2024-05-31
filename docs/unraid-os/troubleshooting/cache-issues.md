---
sidebar_position: 10
---

# Cache/Pool issues

## Mover is not moving files

The commonest cause for this is simply new users misunderstanding the
_Use_ _Cache_ setting for a share and getting the **Yes** and **Prefer**
settings back-to-front. If you want files to initially be written to the
cache and later moved to the array then you ned to use the **Yes**
setting and not the **Prefer** setting.

Another common mis-conception is that changing the _Use Cache_ setting
to **Only** or **No** will trigger mover to transfer files to/from their
current location to match the new _Use Cache_ setting. In fact mover
takes no action on shares that have this setting so the files are left
in their current location.

Another point is not realizing that the Docker and VM services keep
certain files permanently open (particularly in the **system**,
**domains**, and **appdata** shares) and this can stop mover acting on
those files. It is not enough to simply stop all running containers
and/or VMs - you actually need to disable the services themselves to
allow such files to be moved.

###Files end up on a pool (cache) despite Use Cache=No setting for a share

This behaviour is the one that new users find most perplexing.

It arises when a 'move' action is attempted at the Linux level. (This
can be either from the command line or within a container (since all
container are Linux based).) It arises from the fact that Linux is not
aware of _User Shares_ combined with the way that Linux implements a
'move' operation. If Linux thinks that both source and target are on
the same mount point (and all _User Shares_ are under the **/mnt/user**
mount point) then it first tries a _rename_ command and for speed and
only if that fails does it revert to trying a _copy + delete_ operation.
In the case of a cache/pool this 'rename' succeeds so the file is left
on the same drive but under a new folder name corresponding to the
target share name. Since User Shares are simply an amalgamated view of
the top level folders on all drives this means that suddenly the file(s)
in question can end up on a drive that has the _Use Cache=No_ setting.
Since _mover_ ignores shares with the _Use Cache_ setting of _No_ or
_Only_ this will result in the files being left stranded on a pool that
the target share has not been configured to use for caching purposes.

**\*This behaviour can also occur if you try and move files between two
User Shares that are set to use different Pools for caching purposes**.\*
Once again this can result in the files ending up on the wrong pool.

Workarounds to this issue are by doing any of the following:

- Manually move the file(s) in question to the drive where you want it
  to be finally located.
- Set the share that the file has ended up in to have the _Use
  Cache=Yes_ setting and then when mover runs the file will get
  transferred to the array following the rules for that share to pick
  the array drive. You can either start mover manually from the Main
  tab or wait until it runs automatically at its next scheduled time.
  Once mover has been run you can either leave the _Use Cache_ setting
  as _Yes_ or change it to the setting you want to use long term.
- Do an explicit copy + delete operation.
- Do the move over the network as at the network level two different
  User Share will never appear to be on the same mount point so a
  copy + delete is done automatically.
- Make sure the mount points for source and target appear to be
  different at the Linux level.
- Move between physical drives rather than at the User Share level.
