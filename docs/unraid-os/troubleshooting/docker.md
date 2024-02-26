---
sidebar_position: 8
---

# Docker

_THIS SECTION IS STILL UNDER CONSTRUCTION_

_A lot more detail still needs to be added_

## Docker Image Full

Unraid expects docker containers to be configured so that only the
binaries for the container are held in the _docker.img_ file. All
locations within the container that write variable data are then
expected to be mapped to locations external to the docker.img file.

The default size of 20GB is enough for all but the most demanding users
so if you find that your _docker.img_ file is running out of space it
definitely sounds as if you have at least one container incorrectly
configured so it is writing internally to the docker image rather than
to storage external to the image.

Common mistakes are:

- Leaving off the leading / on the container side of a path mapping so
  it is relative rather than absolute
- Case mismatch on either side of a path mapping as Linux pathnames
  are case-significant.

If you cannot spot the error then you can try:

- Go to the docker tab and click the Container size button. often this
  will highlight the problem docker container(s) so you now know where
  to look.

If that is not enough to identify the culprit then:

- Make sure all containers are stopped and not set to auto-start
- Stop docker service
- delete current docker image and set a more reasonable size (e.g.
  20G)
- Start docker service
- Use Apps-\>Previous apps to re-install your containers (with
  all their settings intact).
- Go to docker tab and click the Container size button

: This will give you a starting point for the space each container is
using.

- Enable one container, let it run for a short while, and then press
  the Container size button again to see if that particular container
  is consuming space when it runs.
- Repeat the above step until you track down the rogue container(s)

## How do I move docker.img?

The normal reason for wanting to move the _docker.img_ file is because
it has ended up on a drive that is not the one you want it to use.

**Note:** In many cases it is easier to just recreate the _docker.img_
file from scratch rather than to try and move it.

The way to move _docker.img_ is:

- Go to _Settings -\> Docker -\> Enable Docker_, and set to **No**,
  then click the **Apply** button  (this disables Docker support).
  This is required because othewise the Docker service will keep this
  file open which stops you from moving it elsewhere.
- Using mv or any file manager or the command line, move docker.img to
  the desired location (/mnt/cache/docker.img is recommended)
- In Settings -\> Docker, change the path for _docker.img_ to the
  exact location you just copied to
- Set Enable Docker back to Yes, and click the Apply button again
   (re-enabling Docker support)

## How do I recreate docker.img?

The commonest reason for wanting to recreate the _docker.img_ file is
because it has been corrupted. This is typically indicated by seeing
error messages in the syslog relating to the _loop2_ device (which is
the mount point for the _docker.img_ file).

Other common reasons for recreating the _docker.img_ file is because you
want to change the amount of space that you have allocated to it or to
change its location.

- Go to _Settings -\> Docker -\> Enable Docker_, and set to **No**,
  then click the **Apply** button  (this disables Docker support)
- Switch to Advanced View, then check off the box and press **Delete**
- Make sure that the settings for the size and location are what you
  want them to be.
- Now set Enable Docker back to **Yes**, and click the **Apply**
  button again  (re-enabling Docker support) and a new empty
  _docker.img_ file will be created.

## Restoring your Docker Applications

It is very easy to reinstall the binaries for all your Docker containers
and get back your containers with their settings intact if you have
installed them via Community Applications.

- Go to the **Apps** Tab
- Select the **Previous Apps** Section.
- Check off all of your previous applications that you want to be
  reinstalled and hit **Instal**l.

This will download the binaries for all of your Docker containers into
the _docker.img_ file and reinstate them with their settings intact.

## Further Information

A wealth of further information and some common problems with docker
(and the solutions) can be found in the [Docker
FAQ](https://forums.unraid.net/topic/57181-docker-faq/) on the forum.
