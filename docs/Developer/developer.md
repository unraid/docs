# Creating and Submitting Apps and Plugins to the Unraid Community Applications Store

Community Applications (CA) is a plugin for Unraid that provides a curated catalog of Docker containers (apps) and plugins. This guide explains how developers can create, test, and submit their own apps and plugins for inclusion in CA. Submissions are moderated to ensure safety, compatibility, and a positive user experience. Follow the steps below to prepare and submit your work.

## Prerequisites
- Install the Community Applications plugin on your Unraid system via the **Plugins** tab in the Unraid web UI.
- Create a GitHub account and enable two-factor authentication (2FA) on your repositories—this is required for security.
- Create a support thread for your app or plugin on the Unraid forums (post in any relevant section; a moderator will move it to the appropriate forum, such as Docker Containers or Plugin Support).
- For Docker apps, enable **Docker Authoring Mode** in ***Settings → Docker*** (stop the Docker service first, enable Advanced View, toggle Authoring Mode, then restart the service).
- Familiarize yourself with CA policies at [CA Application Policies](https://forums.unraid.net/topic/87144-ca-application-policies/) to avoid rejection or blacklisting.

## Creating and Submitting Docker Apps
Docker apps are defined by XML template files that specify the container's configuration, such as ports, volumes, environment variables, and metadata.

### Step 1: Create the Docker Template XML
1. Go to the **Docker** tab and select **Add Container**.
2. Fill in the details based on your Docker image (e.g., from Docker Hub):
   - **Repository**: The Docker image name (e.g., `domistyle/idrac6`).
   - **Network Type**: Typically `bridge`.
   - **Privileged**: Set to `true` only if necessary (e.g., for hardware access).
   - Add ports, volumes, and variables using **Add another Path, Port, Variable or Device**.
     - **Ports**: Use container ports (e.g., 5800 for WebUI). Set **Host Port** to blank or optional.
     - **Volumes/Paths**: Use container paths (e.g., `/config`); avoid host paths to prevent auto-creating shares.
     - **Variables**: Define keys (e.g., `IDRAC_HOST`), defaults, and descriptions.
   - **WebUI**: Use format like `http://[IP]:[PORT:5800]` to dynamically map host ports.
   - **Icon**: URL to a PNG or JPG image (host on GitHub for reliability).
   - **Overview/Description**: Provide a clear, Markdown-formatted summary (no HTML).
   - **Category**: Select from official options (e.g., `Tools: Network:Management`).
   - **Support**: Link to your Unraid forums support thread.
   - **Project**: Link to the project's GitHub or webpage.
3. Click **Save** to generate the XML. Copy it from the displayed text (in Authoring Mode).
4. Clean the XML:
   - Remove unnecessary tags (e.g., empty `<MyIP/>`, `<DateInstalled>`).
   - Use `<Config>` elements for ports, volumes, and variables (v2 format preferred over legacy v1 sections like `<Data>` or `<Environment>`).
   - Ensure no HTML tags; use Markdown for formatting.

Example cleaned XML for a sample app:
```
<?xml version="1.0"?>
<Container version="2">
  <Name>idrac6</Name>
  <Repository>domistyle/idrac6</Repository>
  <Registry>https://hub.docker.com/r/domistyle/idrac6/</Registry>
  <Network>bridge</Network>
  <Privileged>false</Privileged>
  <Support>https://github.com/DomiStyle/docker-idrac6/issues</Support>
  <Project>https://github.com/DomiStyle/docker-idrac6/</Project>
  <Overview>Allows access to the iDRAC 6 console without installing Java or messing with Java Web Start. Java is only run inside of the container and access is provided via web interface or directly with VNC.</Overview>
  <Category>Tools: Network:Management</Category>
  <WebUI>http://[IP]:[PORT:5800]</WebUI>
  <Icon>https://raw.githubusercontent.com/user/repo/master/icon.png</Icon>
  <ExtraParams/>
  <PostArgs/>
  <Config Name="idrac host" Target="IDRAC_HOST" Default="" Mode="" Description="Host for your iDRAC instance." Type="Variable" Display="always" Required="true" Mask="false"/>
  <!-- Additional <Config> elements for other variables, ports, and paths -->
</Container>
```

### Step 2: Test the Template
- Install the container on your Unraid system using the template.
- Verify ports, volumes, and variables work as expected.
- Check for errors in CA's **Statistics** section (e.g., template errors or invalid templates).

### Step 3: Host the Template on GitHub
- Create a new GitHub repository (use "master" or "main" branch).
- Upload the XML file (name it descriptively, e.g., `my-app.xml`).
- Optionally, add a developer profile with `ca_profile.xml` in the repo root for enhanced visibility in CA searches.

Example `ca_profile.xml`:
```
<?xml version="1.0" encoding="utf-8"?>
<Maintainer>
  <Icon>https://raw.githubusercontent.com/user/repo/master/avatar.jpg</Icon>
  <Profile>Creating Docker containers with a focus on simplicity and auto-updates.</Profile>
  <DonateLink>https://www.paypal.me/user</DonateLink>
  <DonateText>Support my work with a donation.</DonateText>
  <Forum>https://forums.unraid.net/topic/your-support-thread/</Forum>
</Maintainer>
```

### Step 4: Submit to Community Applications
1. Create a support thread on the Unraid forums.
2. Fill out the online submission form: [CA Submission Form](https://form.asana.com/?k=qtIUrf5ydiXvXzPI57BiJw&d=714739274360802).
3. Provide your GitHub repo URL, support thread link, and other details.
4. Moderators review the submission (may request fixes). Approved templates appear in CA within ~2 hours.
5. For updates, push changes to GitHub; CA syncs automatically every 2 hours.

## Update Process and Sync Frequency
CA maintains a centralized feed of approved apps and plugins, hosted at [https://raw.githubusercontent.com/Squidly271/AppFeed/master/applicationFeed.json](https://raw.githubusercontent.com/Squidly271/AppFeed/master/applicationFeed.json). This feed is aggregated from developer GitHub repositories and updated by moderators.

- **Sync Frequency**: CA checks and syncs with developer GitHub repositories approximately every 2 hours. Users can manually trigger a refresh in the CA interface via the **Refresh Apps** button (under the Apps tab) to pull the latest feed sooner.
- **Time for New Submissions to Appear**: After moderator approval (which can take from hours to days depending on review queue and any required fixes), the app or plugin typically becomes visible in the CA store within ~2 hours of feed update.
- **Time for Updates to Appear**: Once changes are pushed to your GitHub repository (e.g., XML updates, new versions), they propagate to the CA store within 2 hours during the next automated sync. If the update involves moderator review (e.g., significant changes to plugin code), expect additional delay for approval.
- **Local Caching**: Users' local CA instances cache the feed; manual refreshes or restarts may be needed to see updates immediately. In cases of issues (e.g., DNS or network problems), check diagnostics or forum support threads for troubleshooting.

For plugins, new submissions or major updates trigger a manual notification and code review by moderators like @Squid, which may extend timelines beyond the automated sync.

## Creating and Submitting Plugins
Plugins are `.plg` files (XML-based) that install software or features directly on Unraid. They have stricter moderation due to root access.

### Step 1: Create the Plugin PLG File
- PLG files define installation steps, such as downloading binaries, setting permissions, and integrating with the Unraid UI.
- Use an existing PLG as a template (e.g., from GitHub repos).

Example basic PLG structure:
```
<?xml version='1.0' standalone='yes'?>
<!DOCTYPE PLUGIN [
<!ENTITY name "MyPlugin">
<!ENTITY author "YourName">
<!ENTITY version "2025.10.18">
<!ENTITY pluginURL "https://github.com/user/repo">
<!ENTITY icon "plug">
]>
<PLUGIN name="&name;" author="&author;" version="&version;" pluginURL="&pluginURL;" icon="&icon;" min="6.12.0">
  <DESCRIPTION>Short description of the plugin.</DESCRIPTION>
  <CHANGES>Changelog here.</CHANGES>
  <FILE Name="/boot/config/plugins/&name;/install.sh" Run="up">
    <!-- Installation script content -->
  </FILE>
  <!-- Additional FILE elements for downloads, configs, etc. -->
</PLUGIN>
```

- Include scripts for installation, updates, and removal.
- Test on a local Unraid system by placing the `.plg` in `/config/plugins` on the flash drive and rebooting.

### Step 2: Host on GitHub
- Create a GitHub repo and upload the `.plg` file.
- Add `ca_profile.xml` if desired (same as for Docker apps).

### Step 3: Submit to Community Applications
- Plugins follow similar submission rules as Docker apps but are ineligible if better suited as Dockers.
- Create a support thread on the Unraid forums.
- Submit via PM to moderator @Squid or use the Docker submission form (adapt for plugins).
- Moderators review for security, openness (open-source preferred), and compatibility. Closed-source plugins are rarely accepted.

## Best Practices
- **Ports**: Reference container ports in WebUI (e.g., `[PORT:8080]`) for dynamic mapping.
- **Volumes**: Avoid host paths; use container paths to let users configure.
- **Environment Variables**: Provide defaults and clear descriptions; mask passwords.
- **Icons and Descriptions**: Use reliable URLs for icons; write concise, informative descriptions with Markdown.
- **Compatibility**: Include `<Requires>` for dependencies (e.g., hardware plugins).
- **Updates**: Set `<TemplateURL>false</TemplateURL>` in Docker XML to prevent auto-overwrites.
- **Security**: No HTML tags, no extra bash commands, no affiliate links.
- **Testing**: Use Authoring Mode; check CA Statistics for errors.
- **Uniqueness**: Avoid duplicates in saturated categories (e.g., media servers) unless offering unique features.

## Policies and Moderation
- All submissions must comply with CA policies: open-source preferred, no malicious code, 2FA required.
- Blacklisting occurs for violations (e.g., security issues, repository changes).
- Appeals: PM @Squid; escalate to @SpencerJ if needed.
- Abandoned apps/plugins may be removed without notice.
- For full details, see [CA Application Policies](https://forums.unraid.net/topic/87144-ca-application-policies/).

This documentation follows Unraid's style guide for clarity and structure. Submit updates or corrections via the Unraid forums or GitHub pull requests to relevant repos.