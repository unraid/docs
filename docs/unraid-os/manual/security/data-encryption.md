---
sidebar_position: 3
---

# Data Encryption

Unraid supports the use of encrypted drives in both the cache and the array. It does this using the Linux LUKS ([Linux Unified Key System](https://en.wikipedia.org/wiki/Linux_Unified_Key_Setup)) encryption modules.

LUKS is the standard for Linux hard disk encryption. By providing a standard on-disk-format, it does not only facilitate compatibility among distributions but also provides secure management of multiple user passwords. In contrast to an existing solution, LUKS stores all necessary setup information in the partition header, enabling you to transport or migrate your data seamlessly.

The home page for LUKS can be found [here](https://gitlab.com/cryptsetup/cryptsetup)

Because it is a Linux standard drives that are encrypted using LUKS can be read on any standard Linux system even when removed from Unraid as long as one has the key phrase/file needed to unlock the drive.

The Unraid implementation expects the same key to be used for encrypting all drives being used by Unraid. The key for the encryption can be either a pass phrase, or provided via a key file. When using a key file it is a good idea to use something like an image as there is no chance of that ever being guessed. You must make sure that you do not lose the encryption key as without it you will not be able to access the data on encrypted drives.

---

To encrypt a drive (Note that this will erase any content already on the drive).

1. Go to the **Main** tab.
2. Stop the array.
3. Select the drive.
4. In **File system type** change the file system to the encrypted type that you want.
5. Select **Apply** to commit the change.
6. Select **Done** to return to the **Main** tab. The drive will now show as unmountable and the option to format unmountable drives will be present.
7. Check that the drive is the one you are expecting to be encrypted and if it is correct, format it.

Once you have set up encryption then it will be necessary to provide the encryption key when starting the array. Once this has been done and the array successfully started then you can access the data without being aware of the fact that any drive is encrypted.

:::caution

Encrypting data is good from a security perspective, but users should be aware of the fact that it can complicate recovering from certain types of hardware failure without data loss. On that basis only use encryption if you feel you have a real need for it, and more importantly, you have a good data backup system.

:::