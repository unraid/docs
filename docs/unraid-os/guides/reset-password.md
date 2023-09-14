# Resetting your Unraid password

Whether you have forgotten your password, or are not using a password manager, forgetting your root password can be a problem and bring everything to a standstill.

To reset your Unraid server password you'll need access to another computer:

1. Shutdown your server.
2. Plug your USB flash device into a Windows or Mac computer.
3. Open the USB device in Explorer / Finder.
4. Locate and delete the files `config/shadow` and `config/smbpasswd` (do **not** delete `config/passwd`). This will reset all user passwords, including the root user, to blank entries.
5. Securely eject your USB device and connect it to the Unraid server again.
6. Boot up the Unraid server and it will ask you to set up a new password, as if you'd just completed a first boot of Unraid.
7. (Optional) If you have any user accounts configured in ***Users > Shares Access*** (or ***Settings > Users***), select each user and enter a new password. Be sure to select **Change** after this.

Your server passwords are reset and your server is secured.

