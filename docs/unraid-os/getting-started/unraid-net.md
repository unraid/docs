---
sidebar_position: 2
sidebar_label: Unraid.net
---

# Unraid.net

An Unraid.net account is your access point to Unraid’s online services, including forums, Unraid Connect, and license management. While it's not required for basic server functions, having an account provides several benefits such as streamlined license management, access to prerelease builds, and enhanced support.
 
#### Benefits of an Unraid.net account include:
 
- **<u>Single Sign-On (SSO)</u>:** Access Unraid's systems with one set of credentials.
- **License Management:** Easily manage your license keys and server registrations.
- **Access to Prereleases:** Download and test prerelease versions of Unraid.
- **Enhanced Support:** Engage in forums and receive updates on your account.
- **Secure Authentication:** Enjoy secure login with options for multi-factor authentication (MFA).
 
### Your Account and the Data that's Stored
 
Unraid.net uses a SSO system at account.unraid.net for secure authentication via <u>AWS Cognito</u>. Your data is stored securely and encrypted. The AWS Cognito <u>user pool database</u> retains the following information for registered users:

| Data Type                  | Description                                               |
|----------------------------|-----------------------------------------------------------|
| User ID                    | Unique identifier for your account                        |
| Username                   | Your chosen Unraid.net username                           |
| Email address              | Used for communication and account recovery               |
| Unraid Forum ID            | Links your account to forum activity                      |
| Prerelease authorization   | Indicates if you can download Unraid prereleases          |
| Password hash              | Secure, encrypted version of your password                |
| MFA details                | Information for multi-factor authentication               |
| Google/Apple SSO info      | Third-party sign-in attributes (if used)                  |
