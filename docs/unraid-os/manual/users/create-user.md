---
sidebar_position: 2
---

# Creating a user in Unraid

You can create new user accounts quickly and easily. Once created, the root user can assign share access to individual user accounts.

1. Navigate to the ***Users*** menu, and select **ADD USER**.
2. In the **Add User** screen, enter a **User name** for the new user.

:::tip

Due to the way different operating systems handle user credentials, we recommend the user name (not the password) be written in lowercase, and not contain more than 30 characters (the Windows limit on user name length).

:::

3. *(Optional)* Enter a **Description** for the user, and select a **Custom image** - a PNG file - that visually identifies the user.
4. Lastly, enter a **Password** for this user, and retype it in **Retype password**. A password security indicator tells you how strong the password is. The stronger, the better.
5. Select **ADD** to finish user creation.

Once the user account is created, you can begin assigning access to shares. See [Network Access](../shares/network-access.md#share-security).

The user name and password defined here are the credentials required to access shares on Unraid, when connecting from another device on the network. This is not the same as any individual user credential used to access containerized applications, which may have their own set of credentials.