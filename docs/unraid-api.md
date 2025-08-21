---
sidebar_position: 3
sidebar_label: Unraid API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Unraid API

The Unraid API is designed for advanced users, system administrators, and developers. It allows you to automate, monitor, and enhance your Unraid server environment. With a modern %%GraphQL|graphql%% interface, this API provides powerful access to Unraid’s core functions, making it easy to integrate with third-party tools, create custom dashboards, and set up automation scripts.

Whether you want to develop management apps, monitor system health, manage Docker containers, or automate everyday tasks, the Unraid API offers a flexible and secure foundation. Strong typing, granular permissions, and robust authentication make it a reliable and user-friendly solution.

:::info Who is this for?
The Unraid API is aimed at:

- Developers looking to build custom tools or integrations
- Power users who want automation and scripting capabilities
- System administrators overseeing multiple Unraid servers
- Anyone interested in monitoring, scripting, or extending Unraid beyond the web interface
:::

---

## How to access the API

To access the Unraid API through Unraid Connect:

1. Install the [Unraid Connect plugin](https://unraid.net/community/apps/p3?q=unraid+connect#r:~:text=device%3D/dev/dri%22.-,Unraid%20Connect,-beta) from the **Apps** tab.
2. [Configure the plugin](#enabling-the-%%GraphQL|graphql%%-sandbox) to enable API access.
3. Use the [%%GraphQL|graphql%% Sandbox](#enabling-the-graphql-sandbox) for interactive queries, testing, and development.

---

## What the API enables

With the Unraid API, you can:

- Automate routine or complex server tasks using scripts or external tools.
- Monitor system health, resource usage, and events programmatically.
- Integrate Unraid with third-party platforms, dashboards, or notification systems.
- Manage %%array|array%% operations, Docker containers, and %%VMs|vm%% remotely.
- Test and develop using the built-in %%GraphQL|graphql%% sandbox for rapid prototyping.

The API supports secure authentication through API keys or session cookies, as well as role-based access control, enabling effective management of permissions.

---

## CLI commands

The `unraid-api` CLI provides command-line tools for managing, configuring, and troubleshooting the Unraid API service.

:::note
Most commands require the Unraid API service to be installed and running. Some actions may need %%root|root-user%% permissions.
:::

Some important CLI commands advanced users should always keep in mind include:

<Tabs>
  <TabItem value="service-control" label="Service control">

Use these commands to start, stop, or check the status of the Unraid API service. This is often the first step when troubleshooting or applying configuration changes.

<details>
<summary><strong>`start` - Starts the Unraid API service.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api start [--log-level <level>]
```

| Option        | Description                                              |
|---------------|---------------------------------------------------------|
| --log-level   | Set logging level (`trace`, `debug`, `info`, `warn`, `error`). Use `debug` for troubleshooting. |

**Example:**
```
unraid-api start --log-level debug
```
*Starts the Unraid API service and sets the logging level to "debug" for detailed troubleshooting information.*
</details>

<details>
<summary><strong>`stop` - Stops the Unraid API service.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api stop [--delete]
```

| Option    | Description                                         |
|-----------|----------------------------------------------------|
| --delete  | Remove the PM2 home directory (advanced; only use if you need to reset the service state). |

**Example:**
```
unraid-api stop --delete
```
*Stops the Unraid API service and deletes the PM2 home directory, resetting any saved process state.*
</details>

<details>
<summary><strong>`restart` - Restarts the Unraid API service.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api restart
```
</details>

<details>
<summary><strong>`logs` - Displays recent log output from the API service.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api logs [-l <lines>]
```

| Option        | Description                              |
|---------------|-----------------------------------------|
| -l, --lines   | Number of lines to show (default: 100). Increase for more history. |

**Example:**
```
unraid-api logs -l 50
```
*Displays the last 50 lines of the Unraid API service logs for review or troubleshooting.*
</details>

  </TabItem>

  <TabItem value="configuration" label="Configuration">

Configuration commands help you view or adjust the API environment. Use these when setting up, troubleshooting, or developing integrations.

<details>
<summary><strong>`config` - Displays the current API configuration.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api config
```

**Why use this?**  
Check environment variables, port settings, and other runtime configurations. Helpful for confirming setup or diagnosing issues.
</details>

<details>
<summary><strong>`switch-env` - Switches the API between production and staging environments.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api switch-env [-e <environment>]
```

| Option        | Description                           |
|---------------|--------------------------------------|
| -e, --environment | Target environment (`production` or `staging`). Use `staging` for safe testing. |

**Why use this?**  
Test new features or debug issues in a non-production setting.

**Example:**
```
unraid-api switch-env -e staging
```
*Switches the API environment to "staging" (useful for testing without affecting production).*
</details>

<details>
<summary><strong>`developer` - Enables developer mode, unlocking features like the GraphQL sandbox.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api developer
```

**Why use this?**  
Ideal for developers constructing or testing %%GraphQL|graphql%% queries and mutations in a secure environment.
</details>

  </TabItem>

  <TabItem value="apikey" label="API key management">

API keys allow secure, token-based access to the Unraid API. Use these for automation scripts, third-party tools, or when integrating with other services.

:::caution
Always keep API keys secure. Anyone with an API key can access your system with the permissions you assign.
:::

<details>
<summary><strong>`apikey` - Create or manage API keys.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api apikey [options]
```

| Option        | Description                             |
|---------------|----------------------------------------|
| --name        | Assign a name to the API key (for easy identification). |
| --create      | Generate a new key.                    |
| -r, --roles   | Comma-separated list of assigned roles (e.g., `admin`). |
| -p, --permissions | Comma-separated list of permissions (e.g., `read,write`). |
| -d, --description | Add an optional description for the key (recommended). |

**Example:**
```
unraid-api apikey --create --name backup-script -r admin -p read,write -d "Used for nightly backups"
```
*Creates a new API key named "backup-script" with admin role and read/write permissions, adding a description for clarity.*

</details>

  </TabItem>

  <TabItem value="sso" label="SSO management">

Single sign-on (%%SSO|sso%%) lets you manage user authentication through a central identity provider. This is useful for organizations or anyone managing multiple users across systems.

%%SSO|sso%% configuration changes may require a service restart.

<details>
<summary><strong>`sso` - Base command for SSO operations.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api sso
```
</details>

<details>
<summary><strong>`sso add-user` - Adds a new user to the SSO configuration.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api sso add-user
```

**or**

```
unraid-api sso add
```

**or**

```
unraid-api sso a
```
</details>

<details>
<summary><strong>`sso remove-user` - Removes an existing SSO user or all users.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api sso remove-user
```

**or**

```
unraid-api sso remove
```

**or**

```
unraid-api sso r
```
</details>

<details>
<summary><strong>`sso list-users` - Lists all configured SSO users.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api sso list-users
```

**or**

```
unraid-api sso list
```

**or**

```
unraid-api sso l
```
</details>

<details>
<summary><strong>`sso validate-token` - Validates a provided SSO token and returns its status.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api sso validate-token <token>
```

**or**

```
unraid-api sso validate
```

**or**

```
unraid-api sso v
```

**Example:**
```
unraid-api sso validate-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*Validates the provided %%SSO|sso%% token and returns its status (e.g., valid or expired).*
</details>

  </TabItem>

  <TabItem value="report" label="Report generation">

Generate a system report to collect configuration, environment, and diagnostic information. Useful for troubleshooting, support, or auditing.

<details>
<summary><strong>`report` - Generates a system report.</strong> - Click to expand/collapse</summary>

**Syntax:**
```
unraid-api report [-r] [-j]
```

| Option        | Description                        |
|---------------|-----------------------------------|
| -r, --raw     | Display raw output (unformatted).  |
| -j, --json    | Output the report in JSON format.  |

**Why use this?**  
Collect diagnostic data for support or to audit system state.

**Example:**
```
unraid-api report --json
```
*Generates a system report and outputs it in JSON format, summarizing server version, uptime, %%array|array%% status, resource usage, and more.*

**Example Output (truncated):**
```
{
"unraid_version": "7.0.1",
"uptime": "3 days, 4 hours",
"array_status": "Started",
"docker_containers": 12,
"vms": 2,
"cpu_usage": "15%",
"memory_usage": "42%"
}
```
</details>

  </TabItem>
</Tabs>

---

## Using the Unraid API

The Unraid API offers a modern %%GraphQL|graphql%% interface, enabling you to manage your Unraid server effectively.

### Enabling the GraphQL sandbox

To get started with the %%GraphQL|graphql%% sandbox and interactive playground, follow these steps:

1. Enable developer mode using the command line interface (CLI):

    ```bash
    unraid-api developer
    ```

2. Follow the prompts to enable the sandbox. This will unlock access to the Apollo Sandbox interface.
3. Open your web browser and navigate to the following URL:

    ```txt
    http://YOUR_SERVER_IP/graphql
    ```

### Authentication

Most queries and mutations you'll perform require authentication. There are two primary methods for authenticating:

1. API keys
2. Cookies (this is the default method when logged into the %%WebGUI|web-gui%%)

### Creating an API key

To create an API key, follow the **API key management** guidance in [CLI commands section](#cli-commands) above


Follow the prompts to set up your API key by specifying:

- Name
- Description
- Roles
- Permissions

Once generated, you should include the API key in your %%GraphQL|graphql%% requests as a header:

```json
{
    "x-api-key": "YOUR_API_KEY"
}
```

### Available Schemas

Unraid’s %%GraphQL|graphql%% API exposes multiple schemas, each grouping related queries and mutations. Use the tabs below to explore the capabilities of each schema.

<Tabs>
  <TabItem value="system-info" label="System information">

**System information** lets you explore your server’s core hardware and OS details.

- Retrieve CPU, memory, and operating system information  
- Monitor overall system status and health  
- Access baseboard and hardware details  

</TabItem>

<TabItem value="array-management" label="Array management">

**%%Array|array%% management** provides controls and insights for your storage %%array|array%%.

- Check %%array|array%% status and configuration  
- Start or stop the %%array|array%%  
- Monitor individual disk health and status  
- Run and review %%parity check|parity-check%%s  

</TabItem>

<TabItem value="docker-management" label="Docker management">

**Docker management** enables listing and control of container workloads.

- List and manage Docker containers  
- View container state and status  
- Configure and inspect Docker networks  

</TabItem>

<TabItem value="remote-access" label="Remote access">

**Remote access** covers configuration for Unraid Connect and %%SSO|sso%%.

- Configure dynamic or static remote access settings  
- Manage single sign-on (%%SSO|sso%%) users and tokens  
- Define and review permitted origins for API or web access  

</TabItem>
</Tabs>

#### Example Queries

Use these sample %%GraphQL|graphql%% queries in the Apollo Sandbox or your preferred client. Each tab shows the query and its purpose.

<Tabs>
  <TabItem value="system-status" label="Check system status">

**Purpose:** Retrieve OS details and CPU information.

```graphql
query {
    info {
        os {
            platform
            distro
            release
            uptime
        }
        cpu {
            manufacturer
            brand
            cores
            threads
        }
    }
}
```

  </TabItem>

  <TabItem value="array-status" label="Monitor array status">

**Purpose:** Get %%array|array%% state, capacity summary, and per-disk details.

```graphql
query {
    array {
        state
        capacity {
            disks {
                free
                used
                total
            }
        }
        disks {
            name
            size
            status
            temp
        }
    }
}
```

  </TabItem>

  <TabItem value="docker-list" label="List Docker containers">

**Purpose:** List all Docker containers with their status and auto-start setting.

```graphql
query {
    dockerContainers {
        id
        names
        state
        status
        autoStart
    }
}
```

  </TabItem>
</Tabs>

### Schema types

The API includes several core types:

<Tabs>
  <TabItem value="base-types" label="Base types">

**Base types** are foundational %%GraphQL|graphql%% types used across the API:

| Type      | Description                                 |
|-----------|---------------------------------------------|
| `Node`    | Interface for objects with unique IDs       |
| `JSON`    | Arbitrary JSON data                         |
| `DateTime`| Timestamp values                            |
| `Long`    | 64-bit integer                              |

  </TabItem>

  <TabItem value="resource-types" label="Resource types">

**Resource types** represent distinct areas of server management:

| Type      | Purpose                                      |
|-----------|----------------------------------------------|
| `%%Array&#124;array%%`   | Manage %%array&#124;array%%s, disks, and %%parity&#124;parity%% operations  |
| `Docker`  | List and control Docker containers and networks|
| `Info`    | Retrieve system details (OS, CPU, memory)    |
| `Config`  | Access and modify server configuration values|
| `Connect` | Configure remote access and Unraid Connect   |

  </TabItem>

  <TabItem value="roles" label="Role-based access">

**Roles** define permission levels for API keys:

| Role     | Permissions                   | Typical use cases                          |
|----------|-------------------------------|--------------------------------------------|
| `admin`  | Full read/write, manage all   | Automation scripts, admin dashboards       |
| `connect`| Remote access settings only   | Managing Unraid Connect and %%SSO&#124;sso%% features   |
| `guest`  | Read-only access              | Monitoring dashboards, analytics tools     |

  </TabItem>
</Tabs>

### Best practices

1. **Explore the Apollo Sandbox:** Use the Apollo Sandbox to interactively browse the schema, test out various queries, and see live responses. This visual environment helps you quickly discover available fields, types, and query structures.
   
2. **Start simple, then expand:** Begin with basic queries to ensure connectivity and understand the data structure. As your needs grow, incrementally add additional fields or nested data to your queries. This approach makes troubleshooting and optimization easier.
   
3. **Monitor query complexity:** Large or deeply nested queries can affect server performance and may hit rate limits quickly. Request only the fields you need and avoid pulling large datasets unnecessarily.

4. **Use roles and permissions carefully:** Assign the minimum roles and permissions to each API key or session for security. For example, assign read-only keys to dashboards or integrations that don’t need write access.

5. **Secure and rotate API keys:** Treat API keys as sensitive information: never share them publicly, commit them to version control, or expose them in client-side code. Rotate keys regularly, especially after suspected exposure or when changing integrations.

6. **Document and comment queries:** Add comments to your saved queries, scripts, or dashboards to simplify future troubleshooting and sharing.

---

### Rate limiting

The API contains limits on the number of requests to ensure stable and fair server usage for all users.

- If you exceed a limit, the API will respond with an HTTP 429 status code and include a `Retry-After` header indicating when to retry.
  
- Design your applications to handle rate limit responses gracefully:
  - Implement exponential backoff or a pause before retrying.
  - Check for HTTP 429 errors in your client code and respond accordingly.
  - Monitor your API usage to avoid hitting limits unintentionally.

- For processes like dashboards or polling scripts, fetch only what you need and avoid unnecessary repetitive queries.

### Error handling

When an error occurs, the API returns a structured %%GraphQL|graphql%% error response.

Common error types include:

| Error type        | Typical cause                                          | Recommended action                   |
|-------------------|-------------------------------------------------------|--------------------------------------|
| Unauthenticated    | Invalid or missing credentials                        | Check the API key or session; re-authenticate. |
| Forbidden          | Insufficient role or permission for the operation     | Review the API key permissions and roles. |
| Bad user input     | Required parameters missing, invalid field values     | Correct the input data and types.   |
| Rate limited       | Too many requests sent in a short time               | Wait and retry after the indicated delay. |
| Internal error     | Unexpected server error                               | Retry or contact support if it keeps happening. |

**Error response format:**
```json
{
  "errors": [
    {
      "message": "Error description",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["fieldName"]
    }
  ]
}
```

:::tip Effective error handling

- Always check the `errors` array within your GraphQL responses.
- Log error messages and inspect the `message`, `locations`, and `path` fields for troubleshooting.
- Provide user-friendly feedback or automatic retries based on the error type.
- Consult the API schema or documentation for detailed field requirements and permissions where possible.
:::

### Additional resources

- Use the Apollo Sandbox's schema explorer to browse through available types and fields.
- Refer to the documentation tab in Apollo Sandbox for detailed descriptions of each field.
- To monitor the API's health, run:

    ```bash
    unraid-api status
    ```

- For troubleshooting purposes, you can generate reports using:

    ```bash
    unraid-api report
    ```

For more detailed information about commands and configuration options, check the [CLI documentation](#cli-commands) or run `unraid-api --help`.
