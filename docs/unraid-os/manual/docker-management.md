---
sidebar_position: 5
---

# Docker Management

Docker is a technology that allows users to provide each application
with its own isolated operating Linux environment, isolating
compatibility or coexistence conflicts with other applications. If you
want more information on docker and its underlying technology than is
provided in this guide then you should visit the [docker web
site](https://www.docker.com/). There is also a [Docker
FAQ](https://forums.unraid.net/topic/57181-docker-faq/page/2/?tab=comments#comment-934358)
in the Unraid forums that covers many commonly asked questions.

Using Docker Unraid can run any Linux application regardless of the
distribution format as long as it is available as a Docker container.
That means whether an app was written for Ubuntu, CentOS, Arch, Red Hat,
or any other variant, Unraid can run it. This is accomplished through
the use of Docker Containers, which allows each application to be
provided with its own isolated operating environment in which it cannot
create software compatibility or coexistence conflicts with other
applications. This also means that the application is isolated from the
hosting Unraid system so that it is not affected by new releases of
Unraid, and conversely, it will not install software components into
Unraid that might lead to system instability

**Prerequisites**

- A system up and running with Unraid 6 and you are connected via a
    web browser to the Unraid webGui
- A share created called "appdata" that will be used to store
    application metadata (also often referred to as an applications
    *working set*). Strictly speaking you could use any name for the
    share to store application metadata but it is wise to stick to the
    recommended name as it simplifies any support questions/issues if
    you conform to the recommended name.

*NOTE: Applications are made available and supported by both the Docker
and Unraid user communities respectively.*

\

# Concepts in Unraid Docker Implementation {#concepts_in_unraid_docker_implementation}

There are a number of concepts about the Unraid implementation of Docker
support that you want to make sure you understand as it makes running
Docker containers much easier.

**appdata**

Normally each container has a 'working storage

The folder the container puts in appdata contains the \"working
storage\" for the application. By convention the **appdata** share is
used for this purpose, with each container using a container specific
sub-folder in this location. This will be the data that the application
itself uses to keep track of what it is doing. For example, plex keeps
its library there, which is a database it uses to keep track of all your
media.

**Templates**

Typically, you will install a new docker by going to the Apps page and
clicking the download icon on the listing for the docker. This takes you
to the Add/Edit Container page, a form with many things already filled
in. The Apps page (Community Applications) fills those in for you based
on a template the docker author has provided. After you make any needed
changes or additions and submit the form by clicking the Apply button,
the contents of the form, including your changes and additions, is
stored on the flash drive as a template, which can be used again to edit
the docker or even reinstall it exactly as it was, using the
aforementioned Previous Apps feature on the Apps page.

**Container binaries**

Each container will have its own unique set of binaries that are the
programs used within the container. Under Unraid the contents of the
template form (Add Container) are used to put together the docker run
command with its parameters taken from that form. The docker run command
downloads the executable code of the docker and stores that code in the
docker.img, then runs the container.

# Adding Applications as Containers {#adding_applications_as_containers}

By default, you will have access to any and all applications that Lime
Technology publishes to its public Docker repository. To add them to
your system, perform the following steps:

- Click **Add Container** on the **Docker** tab in the webGui.
- Click the *Template* drop-down and select an application.
- Read the description and instructions for using this application.
- Click **Create** to begin downloading the application to your system
    as a Docker container.

**This method is now deprecated and the recommended way to add all
containers is via Community Applications**

## Community Applications {#community_applications}

To gain access to a wider set of applications, see [this
post](http://lime-technology.com/forum/index.php?topic=40262.0) in the
Lime Technology forums for information on installing the Community
Applications plugin. This plugin will allow you to add more applications
to your system through an app store interface.

*NOTE: The applications available on this store come in multiple forms
(containers and plugins) and are not directly supported by Lime
Technology. Support for community-maintained Docker containers can be
found in the [Docker Containers
subforum](http://lime-technology.com/forum/index.php?board=56.0).*

## Configuring a container {#configuring_a_container}

### Network Type {#network_type}

If the Bridge type is selected, the application's network access will be
restricted to only communicating on the ports specified in the port
mappings section. If the Host type is selected, the application will be
given access to communicate using **any port** on the host that isn\'t
already mapped to another in-use application/service. Generally
speaking, it is recommended to leave this setting to its default value
as specified per application template.

### Volume Mappings {#volume_mappings}

Applications can be given read and write access to files on the host by
mapping a directory path from the container to a directory path on the
host.

When looking at the volume mappings section

- The Container volume represents the path from the container that
    will be mapped.
- The Host path represents the path the Container volume will map to
    on your Unraid system.
- The Access Mode specifier what the container can do with the
    files/folders to which it has been given access. It is good practice
    to give the most restrictive access that is consistent with the
    container being able to run successfully.

Clicking on the **Edit** button brings up a dialog allowing you to alter
a volume mapping. Clicking inside the resulting fields provides a
"picker" that will let you navigate to where the mapping should point.

For applications that are installed via Community Applications (i.e. the
Apps tab) then you are typically provided with many of the settings for
a particular container pre-set to sensible values. You should review
these as being what you actually want on your system. Additional
mappings can be manually created by clicking the *Add another Path,
Port, Variable, Label or Device* option.

Note that this means that the path to any particular file/folder can be
different when viewed from insides the container to that when viewed
from the host level.

All applications should require at least one volume mapping to store
application metadata (e.g., media libraries, application settings, user
profile data, etc.). The expectation is that all dynamic data will be
configured to exist outside the container (although docker does no make
this mandatory) so that the docker image file ends up only containing
all the binaries associated with the docker container and none of the
variable data.

Most applications will need you to specify additional mappings in order
for the application to interact with other data on the system (e.g.,
with Plex Media Server, you should specify an additional mapping to give
it access to your media files). It is important that when naming
Container volumes that you specify a path that won't conflict with
already existing folders present in the container. If unfamiliar with
Linux, using a prefix such as "unraid_" for the volume name is a safe
bet (e.g., "/unraid_media" is a valid Container volume name).

Special points to note when setting up volume mappings are:

- Path names are case significant both at the host level and the
    container level.
- Container paths should start with a / character. If this is omitted
    the path is a realize path so it will not be clear where inside the
    container the path can be found.
- If you are setting up a mapping that will use an Unassigned Device
    at the host level then it is important that you set the Access Mode
    to use on if the Slave access modes. If you do not do this then
    dynamic paths nay not be seen until the docker sub-system is
    restarted.

Host paths mentioned in a container\'s volume mappings are created when
the container starts if they do not already exist. If you find that you
get unexpected folders appearing at the Unraid level then this can be a
good indication that you have got a container mapping wrong and so the
folder gets recreated every time the container is run.

### Port Mappings {#port_mappings}

While applications may internally be configured to talk to a specific
port by default, we can remap those to different ports on our host with
Docker.

When the network type is set to Bridge, you will be given the option of
customizing what ports the container will use. This means that while
three different apps may all want to use port 8000 internally, we can
map each app to a unique port at the host level (e.g., 8000, 8001, and
8002).

When the network type is set to Host, the container will be allowed to
use any available port on your system. In this case, it is up to you to
make sure that you are not trying to run two containers using the same
port as they would then interfere with each other.

Additional Port mappings can be created, similar to Volume mappings,
although this is not typically necessary when working with containers
using templates provided through Community Applications as port mappings
expected by the container should already be specified.

*IMPORTANT NOTE: If adjusting port mappings, do **not** modify the
settings for the Container port as only the Host port can be adjusted.*

### Environment Variables {#environment_variables}

TBD

## Container Creation Process {#container_creation_process}

With your network, volume and port mappings and environment variables
configured, you are now ready to create your first Docker container.
Click the **Create** button and the download process will begin. A few
things worth noting while the image is downloading:

- After clicking Create, do not close your browser window or attempt
    to navigate to other tabs using the browser until the download is
    complete.
- Initial downloads per template repository may take longer than
    subsequent downloads per repository.
- When the download process completes, you can click the Done button
    to return to the Docker page and continue adding applications.

# Controlling container auto-start {#controlling_container_auto_start}

On the Docker page, you can set the Auto-Start option to **ON** for any
docker container you want to always be started whenever the Array is
started.

The default behavior when starting up the Docker sub-system is to simply
attempt to start all the Docker containers that are listed on the Docker
tab to be auto-started as fast as possible in the order they are listed.

There are times when the order in which containers are started and their
timing with relation to other containers becomes important.

Example cases that spring to mind are:

- Starting a container running a database before any application that
    attempts to use it is started.
- Starting a container that runs a specialist network link (e.g. a
    VPN) before any other container attempts to use it.

You can alter the container start-up behavior from the default in the
following ways:

- **Changing the order**:

:   The simplest capability is to simply change the order in which the
    docker containers are listed on the Docker tab. If you use a mouse
    to click-and-hold on the container name then you will find that you
    can use drag-and-drop to move the container to another position in
    the list.

- **Adding wait times**:

:   If simply changing the startup order is not sufficient because some
    containers take a while to finish their startup process then you can
    also add delays into the start-up sequence. You can do this by the
    following steps.
    -   Switch to Advanced View using the toggle at the top right.
    -   A *wait* field will appear in the *AutoStart* column. It will
        initially be set to 0 indicating no delay before starting the
        next container.
    -   Enter a value into the *wait* field indicating the delay (in
        seconds) to be used before attempting to start the **next**
        container in the list. That gives this container time to finish
        its startup process. You may have to do some trial-and-error to
        determine what are appropriate values for this wait time.

Using these mechanisms should allow you to control the container startup
process to achieve the results that you want.

\

# Controlling Your Application {#controlling_your_application}

Once the download is complete, the application is started automatically.
To interact with your application, we begin by clicking on the icon
visible on the Docker page of the unRAID web interface or on the icon
for the docker on the dashboard page. Doing so will make a context menu
appear with multiple options:

![](/docs/legacy/Dockerguide-controlling.png "File:Dockerguide-controlling.png")

- **WebUI**
  - Most apps added through Docker will have a web interface that
        you can access to configure and use them, but not all.
  - Clicking this option will launch a new browser tab/window
        directly to the application\'s web interface.
  - For apps that do NOT have a web interface, read the description
        when adding the container for instructions on how to make use of
        the app once it's running.
- **Update**
  - This option only appears after clicking Check for Updates (if
        available).
- **Start/Stop**
  - This will toggle the active state of the container.
- **Logs**
  - If you are having difficulties with your application, useful
        information may be present in the application's log.
  - Logs for applications are stored separately from unRAID's system
        log itself.
- **Edit**
  - Container settings such as port and volume mappings can be
        changed by clicking this option.
  - Once changes are applied, the container will start
        automatically, even if it is stopped initially.
- **Enable/Disable autostart**
  - Toggling this will change the default behavior of the
        application when the Docker service is started.
- **Remove**
  - Allows you to remove either the entire application or just the
        container.
  - Removing a container without its "image" will make adding the
        application again later a much faster process (as it will not
        need to be redownloaded).

# Accessing a Volume Mapping Inside a Container {#accessing_a_volume_mapping_inside_a_container}

One of the first things you will do after your application is running
will be to configure it. Configuration typically will involve specifying
storage locations from within the application\'s web interface. When
doing so, remember to look for the volume mappings you defined when
adding your container. For example, if I needed to specify a folder path
in the BT Sync app that would point to my Media share, I would specify
the path of "/unraid_media" in the application\'s interface, as depicted
below.

![](/docs/legacy/Dockerguide-usingvolumes.png "Dockerguide-usingvolumes.png"){width="500"}

# Re-Create the Docker image file {#re_create_the_docker_image_file}

If for any reason your docker image file gets corrupted it is easy to
recreate it from scratch. The commonest cause for this seems to be the
case where the docker image file is located on the cache and the cache
runs out of free space. Probably the next most common cause is when an
unclean shutdown has occurred for some reason.

Since a properly set up docker container stores all its variable data
externally to the docker image. The docker image file should only hold
the binaries for the container so it is easy to get back to the last
working state with the applications in the same state they were before
the problem occurred.

The steps to recreate the docker image file are:

- Go to Settings-\>Docker in the Unraid GUI
- Set the **Enable Docker** option to **No** and click **Apply** to
    stop the docker service
- Select the option to delete the Docker vdisk file and click apply
    (you can also delete this file manually if you prefer).
- Check that the location for the docker vdisk file points to where
    you want the new file to be placed. Note that this setting includes
    the filename for the vdisk file not just the path to the folder
    where it is to be located.
- Check that the amount of space to be allocated to the disk file is
    what you want. Unless you are an exceptionally heavy user of docker
    applications the default value is likely to be fine.
- Set the **Enable Docker** option to **Yes** and click **Apply** to
    start the docker service. A new vdisk file will be created and
    formatted internally to BTRFS as part of starting the service.

At his point, you will probably want to re-install your applications
with the same settings as previously used. This is easily achieved as
described below.

# Re-Installing Docker Applications {#re_installing_docker_applications}

Every time an application is installed as a docker container then a
template with the settings used is stored on the flash drive. this
template will be updated any time you edit the settings for this
container.

If you ever need to re-install an application (perhaps after deleting
the docker.img file) with the same settings as you used previously then
this can be done by:

- Go to the **Apps** tab in the Unraid GUI.
- Go to the **Previous Apps** section. Any apps you have installed
    previously that are not currently installed will be displayed.
- Indicate which apps you want to re-install
- Proceed with the installation and the docker container will be
    re-downloaded and your previous settings applied.

# Docker Custom Networks {#docker_custom_networks}

For any Docker Custom Networks created, it is necessary to recreate
these networks if a vDisk is deleted. They do no persist.

Please make note of any Docker Custom Networks before deleting and it is
necessary to recreate these network(s) \*with the same name(s)\* prior
to re-adding the containers.

Normally Docker does not allow Docker containers to directly access the
same subnet as the one used by the host. You can allow this under
*Settings-\>Docker* by changing **Host access to custom networks** from
**disabled** to **enabled**.

# Starting and stopping Docker containers on a schedule {#starting_and_stopping_docker_containers_on_a_schedule}

A number of users have requested a way to start and/or stop their docker
containers on a specified schedule. This is not currently a standard
feature of Unraid but is easy to achieve using the **User Scripts**
plugin.

The basic process is:

- Install the [User
    Scripts](https://forums.unraid.net/topic/48286-plugin-ca-user-scripts/)
    plugin via the *Apps* tab if you do not already have it installed.
- Go to *Settings -\> User Scripts* to setup and control your scripts.
- Create a new script for each separate time you want to schedule. A
    single script can be used to start and/or stop multiple Docker
    containers if you want them on the same schedule point.
- Set the schedule at which the script is to be run. If (as is likely)
    the simple scheduling options available via the dropdown list then
    you can set up a Custom schedule by creating an entry in
    [crontab](https://en.wikipedia.org/wiki/Cron#Overview) format as
    this provides far more precise control.
- Hit **Apply** to activate the new script together with its schedule.

**Command to start a docker**

In most cases this is the simply a command of the form:

`docker start "container-name"`

where *container-name* is the name you gave the container on the Docker
tab. This starts an existing docker container that you have previously
set up.

You can also see the *container-name* in the *docker run* command that
unRaid uses to both create a container (if it does not exist) and also
start it with the parameters provided via the docker template for that
container. The *container-name* is that provided via the *name*
parameter to the *docker run* command. You can see what the d*ocker run*
command that unRaid will use when you install / edit the application
(you can always make any change and then change it back and hit Apply to
get the docker run command to appear). The following is an example of
what this might look like:

![](/docs/legacy/Docker_run.png "Docker_run.png"){width="800" height="60"}

**Command to stop a docker**

This is the simply a command of the form:

`docker stop "container-name"`

where *container-name* is the name you gave the container on the Docker
tab.\
=Other Tips and Tricks=

Using Docker containers to run applications on Unraid is incredibly easy
and very powerful. Here are some additional tips to improve your
experience:

- Using a cache device or pool for storing your Docker virtual disk
    image and application data can improve performance.
- Run multiple instances of the same app at the same time, which is
    useful for testing out alternate versions before upgrading.
- Click the **Advanced View** toggle on the top right when viewing the
    Docker page or adding applications to see additional configuration
    options.
- Learn more about Docker containers from our [helpful user
    community](http://lime-technology.com/forum/index.php?board=56.0).
