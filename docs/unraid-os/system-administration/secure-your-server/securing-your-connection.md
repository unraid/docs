---
sidebar_position: 4
sidebar_label: Securing your connection
---

# Securing your connection

Securing your Unraid **WebGUI** with SSL encryption protects sensitive data—such as login credentials and configuration details—from interception or tampering on your local network or the internet. You can use wildcard SSL certificates provisioned by [Let's Encrypt](https://letsencrypt.org/) for both local and [Unraid Connect Remote Access](/connect/remote-access.md) scenarios.

:::important The importance of SSL

SSL (Secure Sockets Layer) encrypts all traffic between your browser and the Unraid server, preventing eavesdropping and man-in-the-middle attacks. Without SSL, anyone with access to your network could potentially intercept sensitive data or hijack your session. Using SSL is strongly recommended for both local and remote management of your Unraid server.
:::

---

## SSL parameters

Several parameters in Unraid affect how SSL is configured and used. Understanding these helps you choose the right certificate and connection method for your needs.

| Parameter         | Description                                                                                          |
|-------------------|------------------------------------------------------------------------------------------------------|
| **Server name**    | Set in **Settings > Identification**. Default is `tower`.                                            |
| **Local TLD**      | Set in **Settings > Management Access**. Default is `local`.                                         |
| **Use ssl/tls**   | Set in **Settings > Management Access**. Controls whether SSL is enabled.                            |
| **HTTP port**     | Set in **Settings > Management Access**. Default is `80`.                                            |
| **HTTPS port**    | Set in **Settings > Management Access**. Default is `443`.                                           |
| **Certificate**   | Type of SSL certificate used (see below).                                                            |
| **Lan ip**        | Your server's LAN IP address, formatted for use in URLs.                                             |
| **Wan ip**        | Your server's public IP address, formatted for use in URLs.                                          |
| **Hash**          | Unique 40-character identifier assigned to your server's certificate.                                |

### SSL certificate types

| Type      | When to use                                                                                         | Pros/Cons                                                                                     |
|----------------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| **Self-signed**      | For local-only access when you don't need a trusted certificate.                                    | Easy to set up, but browsers show warnings. Traffic is encrypted once the warning is accepted.   |
| **Myunraid.net**     | For secure local and remote access, especially with Unraid Connect or if you want a trusted cert.   | Trusted by browsers, no warnings. Enables secure remote access via Unraid Connect.           |
| **Let's Encrypt**    | For advanced users who want a wildcard or custom domain certificate (requires DNS configuration).   | Trusted, flexible, but requires additional setup.                                            |

---

## Ways to access your WebGUI

Below are the main ways to access your Unraid WebGUI, depending on your SSL configuration:

#### HTTP-only (unencrypted)

<details>
<summary><strong>Access via HTTP (not recommended)</strong></summary>

With HTTP only, traffic between your browser and the server is not encrypted.

1. Go to **Settings > Management Access**.
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
<summary><strong>Access via HTTPS with a self-signed certificate</strong></summary>

Traffic is encrypted, but browsers will display a warning because the certificate is not signed by a trusted authority.

1. Go to **Settings > Management Access**.
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
<summary><strong>Access via HTTPS with Myunraid.net certificate</strong></summary>

This method allows secure access without warnings.

1. Go to **Settings > Management Access**.
2. Set **Use SSL/TLS** to *Yes*.
3. Keep **Local TLD** as `local` unless you have your own DNS.
4. Access URLs using:
   - `https://[server name].[local TLD]` (e.g., `https://tower.local` for external access)
   - Fallback option: `http://[wan ip]` (to access in case of issues)
5. Click **Apply**.

:::info
This certificate is trusted by browsers and does not display warnings.
:::
</details>

#### HTTPS with Myunraid.net certificate and with no fallback URL

<details>
<summary><strong>Access via HTTPS with Myunraid.net certificate (Strict mode, no fallback)</strong></summary>

This method provides the highest level of SSL enforcement by requiring all WebGUI access to use the Myunraid.net certificate and URL. It is ideal for users who want maximum security and do not need to access their server via local IP or hostname if DNS is unavailable.

1. Go to **Settings > Management Access** in the **WebGUI**.
2. Keep **LocalTLD** set to `local` unless you have your own DNS name resolution (this is used for the fallback certificate if you later run the `use_ssl` command).
3. Click **Provision** to generate a Myunraid.net certificate.
4. If your network does not have DNS rebinding issues, the *Strict* option for **Use SSL/TLS** will be available.
5. Set **Use SSL/TLS** to *Strict* (or *Auto* in earlier Unraid versions).
6. Your access URL will be:  
   `https://[lan-ip].[hash].myunraid.net`  
   (e.g., `https://192-168-100-1.a1b2c3d4e5.myunraid.net`)
   This URL is displayed in the **Local access URLs** field on the **Management Access** page and in the [Unraid Connect](/connect/index.md) dashboard if installed.

:::caution
If DNS resolution becomes unavailable (e.g., your Internet connection goes down), you will not be able to access the WebGUI using the Myunraid.net URL.  
To regain access:

- Use Telnet, SSH, or a local keyboard/monitor to log in.
- Run `use_ssl no` to switch to HTTP (`http://[servername].[localTLD]` or `http://[ipaddress]`).
- Run `use_ssl yes` to switch to HTTPS using a self-signed certificate (`https://[servername].[localTLD]` or `https://[ipaddress]`).  
  See [HTTPS with a self-signed certificate](#https-with-self-signed-certificate) above for more details.
- Once DNS is restored, set **Use SSL/TLS** back to *Strict* for full security.

:::

</details>

---

## Redirects

The way your Unraid server handles WebGUI redirects depends on your **Use SSL/TLS** setting:

- **Strict**:  
  If you access `http://[ipaddress]` or `http://[servername].[localTLD]`, you will be redirected to `https://[lan-ip].[hash].myunraid.net`.  
  :::note
  This can make local access difficult if DNS is unavailable. See the caution under [HTTPS with Myunraid.net certificate and with no fallback URL](#https-with-myunraidnet-certificate-and-with-no-fallback-url).
  :::

- **Yes**:  
  You will be redirected to `https://[ipaddress]` or `https://[servername].[localTLD]`. This will still work even if your internet connection is down.

- **No**:  
  The HTTP URL will load directly, with no redirect or encryption.

:::tip
Redirects only work when you start from HTTP URLs, not HTTPS URLs.
:::

---

## Custom certificates

Custom certificates allow you to secure your Unraid WebGUI with your own SSL certificate, such as one issued by a commercial certificate authority or a wildcard certificate for your domain.

A custom certificate is any SSL certificate that you provide and manage yourself, rather than one generated by Unraid or Let's Encrypt. This is useful if you want to use your own domain name, a wildcard certificate, or integrate with your organization's PKI infrastructure.

:::info When using a custom certificate, you are responsible for
- Procuring the certificate from a trusted certificate authority (CA)
- Managing DNS records for your chosen domain
- Uploading and renewing the certificate as needed
- Ensuring the certificate matches your server's domain name (in the Subject or Subject Alternative Name fields)
:::

If your certificate is invalid or does not match the server's URL, Unraid will delete it and revert to a default certificate.

### HTTPS with custom certificate (with optional Unraid Connect remote access)

1. Go to **Settings > Management Access**.
2. Set **use SSL/TLS** to *Yes*.
3. Set **LocalTLD** to the domain name used in your certificate's Subject.
4. Access your server at `https://[servername].[localTLD]` (e.g., `https://tower.mydomain.com`). You must manage DNS for this URL.
5. Upload your certificate to `/boot/config/ssl/certs/[servername]_unraid_bundle.pem`.
6. The certificate must be valid for `[servername].[localTLD]` or as a wildcard (e.g., `*.mydomain.com`).
   - The domain must appear in the Subject or Subject Alternative Name fields (Unraid 6.10.3+ supports SANs).
   - If the certificate does not match, Unraid will delete it.
7. Optionally, enable [Unraid Connect remote access](#unraid-connect-remote-access) for secure, browser-trusted remote management.
