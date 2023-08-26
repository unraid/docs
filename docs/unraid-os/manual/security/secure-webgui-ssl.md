---
sidebar_position: 2
---

# Securing webGUI connections (SSL)

As of Unraid 6.10, you can improve the security of the SSL implementation for both local access and [Unraid Connect Remote Access](/connect/remote-access.md) using wildcard SSL Certificates provisioned by [Let's Encrypt](https://letsencrypt.org/).

## SSL parameters

When it comes to SSL security, there are different parameters across the Unraid settings pages that affect the behavior of your connection to an Unraid server.

| Parameter | Description|
|:--|:--|
| **servername** | Can be changed in ***Settings > Identification***. The default value is *tower*. |
| **localTLD** | Can be changed in ***Settings > Management Access***. Default value is *local*. |
| **Use SSL/TLS** | Can be changed in ***Settings > Management Access***. Default value is *No*. |
| **HTTP port** | Can be changed in ***Settings > Management Access***. Default value is *80*. If you change this, add `:[HTTP port]` to any of the HTTP URLs in the scenarios below. (example: `http://tower.local:8080`) |
| **HTTPS port** | Can be changed in ***Settings > Management Access*** page. It defaults to "443". If you change this, add `:[HTTPS port]` to any of the HTTPS URLs in the scenarios below. (example: `https://tower.local:3443`) |
| **certificate** | Refers to either a self-signed SSL Certificate, or a SSL certificate issued by a Certificate Authority (Let's Encrypt) |
| **lan-ip** | This is your server's LAN IP address with dots changed to dashes (example 192-168-100-1) |
| **wan-ip** | This is your internet-facing IP address with dots changed to dashes (example 136-26-144-139) |
| **hash** | This is a random 40 character hex string (160 bits) uniquely assigned to your server when a certificate is first issued |

## How to access the Unraid server webGUI on your LAN

### HTTP-only

With HTTP only, traffic between the browser and the server will not be encrypted, but you will not need a certificate.

1. Go to ***Settings > Management Access***.
2. Set **Use SSL/TLS** to *No*.
3. **LocalTLD** should be kept at the default of `local` unless you can provide your own DNS name resolution.
4. Your URLs:
    * `http://[servername].[localTLD]` (example: `http://tower.local`)
    * `http://[ipaddress]` (example: `http://192.168.100.1`)
5. Select **Apply**.

---

### HTTPS with self-signed certificate

With HTTPS and a self-signed certificate, traffic to and from the server is encrypted. Unraid generates a certificate for you.

1. Go to ***Settings > Management Access***.
2. Set **Use SSL/TLS** to *Yes*.
3. **LocalTLD** should be kept at the default of `local` unless you can provide your own DNS name resolution
4. Your URLs:
    * `https://[servername].[localTLD]` (example: `https://tower.local`)
    * `https://[ipaddress]` (example: `https://192.168.100.1`)
5. Select **Apply**.

:::important

When you use self-signed certificates, browsers will show a certificate error because they cannot verify the authenticity of self-signed certificates. All traffic will be encrypted once users acknowledge the browser warning.

:::

---

### HTTPS with Myunraid.net certificate and fallback URL if DNS is unavailable

You can access your server securely via the webGUI using a Myunraid.net certificate, and configure a fallback URL in case your DNS resolution is down. All traffic will be encrypted and the server is configured to fallback to a secondary method when DNS is down.

1. Go to ***Settings > Management Access***.
2. **LocalTLD** should be kept at the default of `local` unless you can provide your own DNS name resolution (this is used for the fallback certificate).
3. Leave **Use SSL/TLS** set to either *No* or *Yes*.
4. Press **Provision**.
5. Your primary URLs when **Use SSL/TLS** set to *No*:
    * `http://[servername].[localTLD]` (example: `http://tower.local`)
    * `http://[ipaddress]` (example: `http://192.168.100.1`)
6. Your primary URLs when **Use SSL/TLS** set to *Yes*. Note that these URLs use a self-signed certificate.
    * `https://[servername].[localTLD]` (example: `https://tower.local`)
    * `https://[ipaddress]` (example: `https://192.168.100.1`)
7. Your alternate URL will be `https://[lan-ip].[hash].myunraid.net` (example: `https://192-168-100-1.a1b2c3d4e5.myunraid.net`). This URL is shown in the **Local access URLs** field on the **Management Access** page. If you install the [Unraid Connect](/connect/about.md) plugin it will also be shown on the [Connect dashboard](https://connect.myunraid.net/).

---

### HTTPS with Myunraid.net certificate and with no fallback URL

1. Go to ***Settings > Management Access***.
2. **LocalTLD** should be kept at the default of `local` unless you can provide your own DNS name resolution (this is used for the fallback certificate if you run the `use_ssl` command mentioned below).
3. Press **Provision**.
4. If DNS Rebinding is not an issue, the *Strict* option for **Use SSL/TLS** will be available.
5. Set **Use SSL/TLS** to *Strict* (or *Auto* in earlier versions of Unraid).
6. Your URL will be `https://[lan-ip].[hash].myunraid.net` (example: `https://192-168-100-1.a1b2c3d4e5.myunraid.net`). This URL is shown in the **Local access URLs** field on the **Management Access** page. If you install the optional [Unraid Connect](/connect/about.md) plugin it will also be shown on the [Connect dashboard](https://connect.myunraid.net/).

:::caution

If at any point DNS resolution becomes unavailable (e.g., your Internet goes down), you can use Telnet, SSH or local keyboard/monitor to login. Then:

* Type `use_ssl no` to access the webGUI via `http://[servername].[localTLD]` or `http://[ipaddress]`.
* Type `use_ssl yes` to access the webGUI via `https://[servername].[localTLD]` or `https://[ipaddress]` using a self-signed certificate (See [HTTPS with a self-signed certificate](#https-with-self-signed-certificate) above).
* Once DNS resolution is available again, change **Use SSL/TLS** back to *Strict*.

:::

---

## Redirects

When you access `http://[ipaddress]` or `http://[servername].[localTLD]`, the behavior will change depending on the value of the **Use SSL/TLS** setting:

* If **Use SSL/TLS** is set to *Strict*, you will be redirected to `https://[lan-ip].[hash].myunraid.net` However, this behavior makes it more difficult to access your server when DNS is unavailable (your Internet goes down). If that happens see the cautionary note under [HTTPS with Myunraid.net certificate - with no fallback URL](#https-with-myunraidnet-certificate-and-with-no-fallback-url) above.
* If **Use SSL/TLS** is set to *Yes*, you will be redirected to `https://[ipaddress]` or `https://[servername].[localTLD]` as that will likely work even if your Internet goes down.
* If **Use SSL/TLS** is set to *No*, then the HTTP URL will load directly.

:::tip

For the redirects to work, you must start from HTTP URLs, not HTTPS URLs.

:::

---

## Unraid Connect remote access

Looking for setup instructions for Unraid Connect remote access? See our [dedicated page](/docs/connect/remote-access.md).

<!--

1. Install the [Unraid Connect](/connect/about.md) plugin.
2. Navigate to the ***Settings > Management Access*** page.
3. Click **Provision** if you haven't already.
4. Regardless of the value of **Use SSL/TLS**, you will have the option to access the server using `https://[lan-ip].[hash].myunraid.net:[wan-port]` (example: `https://192-168-100-1.a1b2c3d4e5.myunraid.net`).
5. Navigate to ***Settings > Management Access > Unraid Connect*** page.
6. Set **Allow Remote Access** to *Yes*.
7. Set the **WAN port** you want to use. For added security we recommend you choose a random port over 1000 rather than using the default of 443. i.e. something like 13856, 48653, and so on.
8. Select **Apply**.
9. Setup your router to port forward the **WAN port** you specified to the LAN IP address and **HTTPS port** used by the server. There is a note on the screen telling you the exact port and IP to use.
10. Select the **Check** button. If the port is forwarded correctly you will see a message saying "Your Unraid Server is reachable from the Internet".
11. Select **Apply**.

To access your server using Remote Access, log in to the Unraid Connect Dashboard and select the **Remote Access** link. The URL will be `https://[wan-ip].[hash].myunraid.net:[wan-port]` (example: `https://136-26-144-139.a1b2c3d4e5.myunraid.net:13856`).

-->

---

## Custom certificates

### HTTPS with custom certificate - with option to have Unraid Connect Remote Access

1. Navigate to the ***Settings > Management Access*** page.
2. Set **Use SSL/TLS** to *Yes*.
3. Set the **LocalTLD** to the domain name used in the "Subject" of the certificate.
4. Your URL will be `https://[servername].[localTLD]` (example: `https://tower.mydomain.com`). You are responsible for managing DNS for this URL.
5. You are responsible for managing the certificate. Upload it to `/boot/config/ssl/certs/[servername]_unraid_bundle.pem`.
6. The certificate must be valid for `[servername].[localTLD]` (example: `tower.mydomain.com`). For a wildcard cert it must be `*.[localTLD]` (example: `*.mydomain.com`). This url can be specified in either the "Subject" of the certificate or one of the "Subject Alternative Name" fields (prior to 6.10.3, only the "Subject" field was used). If you find that Unraid deletes your certificate, it is because the server's URL is not specified in the certificate.
7. As an option, use [Unraid Connect Remote Access](#unraid-connect-remote-access).
