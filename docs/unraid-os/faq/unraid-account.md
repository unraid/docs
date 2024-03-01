# Unraid Account

## What is an Unraid.net Account?

An [Unraid.net account](https://account.unraid.net/) is the account you create to use the [Unraid forums](https://forums.unraid.net/), use [Unraid Connect](/connect/about.md), and to manage your Unraid keys. This account is _not the same_ as your server's root password that you use to login to the Unraid webgui. Users do not need to sign into this account to use Unraid.

## Unraid.net Account Sign In / Ups

The unraid.net account is a single-sign-on (SSO) system that is used for authenticating users to Unraid’s online systems with a single account. This system is accessed through the website located at account.unraid.net.

This SSO service is implemented on top of an AWS Cognito OAuth server, which is a private user pool database. User privacy is a top priority for us, and all data is stored securely and encrypted. User data is only accessible by Unraid employees.

The AWS Cognito user pool database stores the following data about registered users:

* User ID, Username, Email address, Unraid Forum ID, User authorized to download Unraid prereleases
* This database also stores attributes used for login, such as Password hash, MFA details, and Google/Apple SSO information.
