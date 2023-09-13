# Resetting your Unraid password

Whether you have forgotten your password, or are not using a password manager, forgetting your root password can be a problem and bring everything to a standstill.

To reset your Unraid server password you'll need access to another computer:

1. Shutdown your server.
2. Plug your USB flash device into a Windows or Mac computer.
3. Open the USB device in Finder / Explorer.
4. Locate and delete the files `config/shadow` and `config/smbpasswd` (do **not** delete `config/passwd`). This will reset all user passwords, including the root user, to blank entries.
5. Securely eject your USB device and connect it to the Unraid server again.
6. Boot up the Unraid server and it will log you in automatically.
7. Immediately set a new password.
   1. In ***Users*** select the root user under **Management Access**.
   3. In the **Password** field enter a new password, then retype it in the next field to confirm.
   4. Select **Change**.

Your password is reset and your server is secured.