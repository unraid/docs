---
sidebar_position: 4
sidebar_label: Securing your connection
---

# Securing your connection

Securing your Unraid %%WebGUI|web-gui%% with %%SSL|ssl%% encryption protects sensitive data—such as login credentials and configuration details—from interception or tampering on your local network or the internet. You can use wildcard %%SSL|ssl%% certificates provisioned by [Let's Encrypt](https://letsencrypt.org/) for both local and [Unraid Connect Remote Access](../../../unraid-connect/remote-access.md) scenarios.

:::important The importance of SSL

%%SSL|ssl%% (Secure Sockets Layer) encrypts all traffic between your browser and the Unraid server, preventing eavesdropping and man-in-the-middle attacks. Without %%SSL|ssl%%, anyone with access to your network could potentially intercept sensitive data or hijack your session. Using %%SSL|ssl%% is strongly recommended for both local and remote management of your Unraid server.
:::

---

## SSL parameters

Several parameters in Unraid affect how %%SSL|ssl%% is configured and used. Understanding these helps you choose the right certificate and connection method for your needs.

| Parameter         | Description                                                                                          |
|-------------------|------------------------------------------------------------------------------------------------------|
| **Server name**    | Set in ***Settings → Identification***. Default is `tower`.                                            |
| **Local TLD**      | Set in ***Settings → Management Access***. Default is `local`.                                         |
| **Use SSL/TLS**   | Set in ***Settings → Management Access***. Controls whether %%SSL&#124;ssl%% is enabled.                            |
| **HTTP port**     | Set in ***Settings → Management Access***. Default is `80`.                                            |
| **HTTPS port**    | Set in ***Settings → Management Access***. Default is `443`.                                           |
| **Certificate**   | Type of %%SSL&#124;ssl%% certificate used (see below).                                                            |
| **Lan ip**        | Your server's LAN IP address, formatted for use in URLs.                                             |
| **Wan ip**        | Your server's public IP address, formatted for use in URLs.                                          |
| **%%Hash&#124;hash%%**          | Unique 40-character identifier assigned to your server's certificate.                                |

### SSL certificate types

| Type      | When to use                                                                                         | Pros/Cons                                                                                     |
|----------------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| **Self-signed**      | For local-only access when you don't need a trusted certificate.                                    | Easy to set up, but browsers show warnings. Traffic is encrypted once the warning is accepted.   |
| **Myunraid.net**     | For secure local and remote access, especially with Unraid Connect or if you want a trusted cert.   | Trusted by browsers, no warnings. Enables secure remote access via Unraid Connect.           |
| **Custom**    | For advanced users who want a wildcard or custom domain certificate (requires %%DNS&#124;dns-name-resolution%% configuration).   | Trusted, flexible, but requires additional setup.                                            |

---

## Ways to access your WebGUI

Below are the main ways to access your Unraid %%WebGUI|web-gui%%, depending on your %%SSL|ssl%% configuration:

#### HTTP-only (unencrypted)

<details>
<summary><strong>Click to expand/collapse</strong></summary>

With HTTP only, traffic between your browser and the server is not encrypted.

1. Go to ***Settings → Management Access***.
2. Set **Use SSL/TLS** to *No*.
3. Keep **Local TLD** as `local` unless you have your own DNS.
4. Access URLs:
   - `http://[server name].[local TLD]` (e.g., `http://tower.local`)
   - `http://[ip address]` (e.g., `http://192.168.100.1`)
5. Click **Apply**.

:::warning
Anyone on your network can intercept data sent over HTTP. Use HTTPS whenever possible.
:::
</details>

---

#### HTTPS with self-signed certificate

<details>
<summary><strong>Click to expand/collapse</strong></summary>

Traffic is encrypted, but browsers will display a warning because the certificate is not signed by a trusted authority.

1. Go to ***Settings → Management Access***.
2. Set **Use SSL/TLS** to *Yes*.
3. Keep **Local TLD** as `local` unless you have your own DNS.
4. Access URLs:
   - `https://[server name].[local TLD]` (e.g., `https://tower.local`)
   - `https://[ip address]` (e.g., `https://192.168.100.1`)
5. Click **Apply**.

:::important
Browsers will show a certificate error. All traffic is still encrypted after you accept the warning.
:::
</details>

---

#### HTTPS with Myunraid.net certificate and fallback URL

<details>
<summary><strong>Click to expand/collapse</strong></summary>

You can access your server securely via the %%WebGUI|web-gui%% using a Myunraid.net certificate, and configure a fallback URL in case your %%DNS|dns-name-resolution%% resolution is down. All traffic will be encrypted, and the server is configured to fall back to a secondary method when %%DNS|dns-name-resolution%% is unavailable.

1. Go to ***Settings → Management Access***.
2. Keep **Local TLD** at the default of `local` unless you can provide your own DNS name resolution (this is used for the fallback certificate).
3. Leave **Use SSL/TLS** set to either *No* or *Yes*.
4. Press **Provision** to generate the myunraid.net certificate.

**Your primary URLs when Use SSL/TLS is set to *No*:**

- `http://[servername].[localTLD]` (example: `http://tower.local`)
- `http://[ipaddress]` (example: `http://192.168.100.1`)

**Your primary URLs when Use SSL/TLS is set to *Yes* (uses self-signed certificate):**

- `https://[servername].[localTLD]` (example: `https://tower.local`)  
- `https://[ipaddress]` (example: `https://192.168.100.1`)

**Your alternate myunraid.net URL:**

- `https://[lan-ip].[hash].myunraid.net` (example: `https://192-168-100-1.a1b2c3d4e5.myunraid.net`)
- This URL is shown in the **Local access URLs** field on the **Management Access** page.
- If you install the [Unraid Connect plugin](../../../unraid-connect/overview-and-setup.md), it will also be shown on the Connect dashboard.

:::info
The myunraid.net certificate is trusted by browsers and does not display warnings. The URL uses your LAN IP address with dots changed to dashes, plus a unique 40-character %%hash|hash%% assigned to your server.
:::

:::tip Fallback access
If %%DNS|dns-name-resolution%% resolution becomes unavailable (e.g., your Internet goes down), you can use the local URLs with your server name or IP address as backup access methods.
:::

</details>

#### HTTPS with Myunraid.net certificate and with no fallback URL

<details>
<summary><strong>Click to expand/collapse</strong></summary>

This method provides the highest level of %%SSL|ssl%% enforcement by requiring all %%WebGUI|web-gui%% access to use the Myunraid.net certificate and URL. It is ideal for users who want maximum security and do not need to access their server via local IP or hostname if %%DNS|dns-name-resolution%% is unavailable.

1. Go to ***Settings → Management Access*** in the %%WebGUI|web-gui%%.
2. Keep **LocalTLD** set to `local` unless you have your own %%DNS|dns-name-resolution%% name resolution (this is used for the fallback certificate if you later run the `use_ssl` command).
3. Click **Provision** to generate a Myunraid.net certificate.
4. If your network does not have %%DNS|dns-name-resolution%% rebinding issues, the *Strict* option for **Use SSL/TLS** will be available.
5. Set **Use SSL/TLS** to *Strict* (or *Auto* in earlier Unraid versions).
6. Your access URL will be:  
   `https://[lan-ip].[hash].myunraid.net` (e.g., `https://192-168-100-1.a1b2c3d4e5.myunraid.net`)

   If you install the [Unraid Connect plugin](../../../unraid-connect/overview-and-setup.md), it will also be shown on the Connect dashboard.

:::caution
If %%DNS|dns-name-resolution%% resolution becomes unavailable (e.g., your Internet connection goes down), you will not be able to access the %%WebGUI|web-gui%% using the Myunraid.net URL.  

To regain access:

- Use Telnet, %%SSH|ssh%%, or a local keyboard/monitor to log in.
- Run `use_ssl no` to switch to HTTP (`http://[servername].[localTLD]` or `http://[ipaddress]`).
- Run `use_ssl yes` to switch to HTTPS using a self-signed certificate (`https://[servername].[localTLD]` or `https://[ipaddress]`). See [HTTPS with a self-signed certificate](#https-with-self-signed-certificate) above for more details.
- Once %%DNS|dns-name-resolution%% is restored, set **Use SSL/TLS** back to *Strict* for full security.

:::

</details>

---

## Redirects

When you access `http://[servername].[localTLD]`, the redirect behavior depends on your **Use SSL/TLS** setting:

- **Strict**: You will be redirected to `https://[lan-ip].[hash].myunraid.net`.  
  :::note
  This can make local access difficult if %%DNS|dns-name-resolution%% is unavailable. See the caution under [HTTPS with Myunraid.net certificate and with no fallback URL](#https-with-myunraidnet-certificate-and-with-no-fallback-url).
  :::

- **Yes**: You will be redirected to `https://[servername].[localTLD]`. This will still work even if your internet connection is down.

- **No**: The HTTP URL will load directly, with no redirect or encryption.

:::tip
Redirects only work when you start from HTTP URLs, not HTTPS URLs.
:::

---

## Custom certificates

Custom certificates allow you to secure your Unraid %%WebGUI|web-gui%% with your own %%SSL|ssl%% certificate, such as one issued by a commercial certificate authority or a wildcard certificate for your domain.

A custom certificate is any %%SSL|ssl%% certificate that you provide and manage yourself, rather than one generated by Unraid or Let's Encrypt. This is useful if you want to use your own domain name, a wildcard certificate, or integrate with your organization's PKI infrastructure.

:::info When using a custom certificate, you are responsible for...

- Procuring the certificate from a trusted certificate authority (CA)
- Managing %%DNS|dns-name-resolution%% records for your chosen domain
- Uploading and renewing the certificate as needed
- Ensuring the certificate matches your server's domain name (in the Subject or Subject Alternative Name fields)
:::

If your certificate is invalid or does not match the server's URL, Unraid will delete it and revert to a default certificate.

### HTTPS with custom certificate (with optional Unraid Connect remote access)

<details>
<summary><strong>Access via HTTPS with custom certificate</strong> - Click to expand/collapse</summary>

1. Go to ***Settings → Management Access***.
2. Set **Use SSL/TLS** to *Yes*.
3. Set **Local TLD** to the domain name used in your certificate's Subject.
4. Access your server at `https://[servername].[localTLD]` (e.g., `https://tower.mydomain.com`). You must manage DNS for this URL.
5. Upload your certificate to `/boot/config/ssl/certs/[servername]_unraid_bundle.pem`.
6. The certificate must be valid for `[servername].[localTLD]` or as a wildcard `*.[localTLD]` (where `[localTLD]` matches exactly what you entered in the **Local TLD** field).
   - The domain must appear in the Subject or Subject Alternative Name fields (Unraid 6.10.3+ supports SANs).
   - If the certificate does not match, Unraid will delete it.
7. Optionally, enable [Unraid Connect remote access](../../../unraid-connect/remote-access.md) for secure, browser-trusted remote management.

:::tip
For wildcard certificates, ensure the certificate's Subject Alternative Name or Subject field contains `*.[localTLD]` where `[localTLD]` is the exact value you entered in the **Local TLD** field in **Management Access**.
:::

</details>

---

## SSL troubleshooting and advanced configuration

This section covers common SSL-related issues and advanced configuration options that apply when using myunraid.net certificates, regardless of whether you have Unraid Connect installed.

### DNS rebinding protection

DNS rebinding protection is a security feature on many routers that prevents public DNS entries from resolving to local IP addresses. This helps protect your network from certain attacks, but can cause issues when trying to use %%SSL|ssl%% certificates for local access to the Unraid %%WebGUI|web-gui%%.

If you encounter a DNS rebinding error while trying to provision an %%SSL|ssl%% certificate (e.g., after clicking the **Provision** button), consider the following steps:

- Click **OK** on the error message, wait for 2 to 5 minutes, and try again.
- If the error continues, check your router settings for options related to "DNS rebinding protection" or similar terms.
- Allow DNS rebinding for the `myunraid.net` domain.
- Keep in mind that DNS changes can take time to propagate, so you may see the error again after making updates.

The exact steps may vary based on your router model and firmware.

### Accessing your server when DNS is down

When %%SSL|ssl%% is enabled with a myunraid.net certificate, you typically access your Unraid server using a fully qualified domain name (FQDN), such as:

```
https://ip.yourpersonalhash.myunraid.net
```

Or, if you're using a custom HTTPS port:

```
https://ip.yourpersonalhash.myunraid.net:<https_port>
```

This ensures you're using a valid %%SSL|ssl%% certificate for secure access. However, if your Internet connection goes down and your browser hasn't cached the DNS entry, you may lose access to the %%WebGUI|web-gui%%.

If you lose DNS or Internet access:

- If **Use SSL/TLS** is set to **Yes**, try accessing your server at:
  ```
  https://[servername].[localTLD]
  ```
  Or with a custom port:
  ```
  https://servername.[localTLD]:<https_port>
  ```

- If this doesn't work, or if **Use SSL/TLS** is set to **Strict**:
   1. Use telnet, %%SSH|ssh%%, or a directly connected keyboard/monitor to log into your server.
   2. Run the command:
      ```bash
      use_ssl no
      ```
   3. You can now access the %%WebGUI|web-gui%% at:
      ```
      http://<ip_address>
      ```
      Or, if using a custom port:
      ```
      http://<server_ip>:<http_port>
      ```
      (Note: this uses HTTP, not HTTPS.)

Once Internet access is restored, go to ***Settings → Management Access*** and set **Use SSL/TLS** back to **Strict** to re-enable local SSL.

### Disabling SSL for local access

You should disable %%SSL|ssl%% for local access if you prefer a simple HTTP connection on your trusted home network or if you're facing ongoing issues with %%SSL|ssl%% certificate provisioning, DNS rebinding, or browser compatibility.

To disable %%SSL|ssl%% for local access:

1. Go to ***Settings → Management Access*** in the WebGUI.
2. Set **Use SSL/TLS** to **No**.
3. Click **Apply**.

This change will also disable the Remote Access feature, as %%SSL|ssl%% is necessary for secure remote connections.

:::caution
Disabling %%SSL|ssl%% means your %%WebGUI|web-gui%% will be accessible over unencrypted HTTP. This exposes your login credentials and session data to anyone on your local network and is not recommended unless you are confident your network is secure and you do not need remote access. For the best security, keep %%SSL|ssl%% enabled whenever possible.
:::

:::note
%%SSL|ssl%% management is a core feature of Unraid and does not rely on the Unraid Connect plugin. You can disable %%SSL|ssl%% without affecting other Unraid functionality.
:::
