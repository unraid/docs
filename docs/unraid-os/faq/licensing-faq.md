
# Licensing

## Is Pricing for Unraid OS "one time"? Are There Additional Fees for OS Updates?

Unraid OS license pricing is a one-time fee and updates are included.

## How do I Purchase Unraid?

Unraid OS can be purchased from within the OS via the Tools-\>
Registration page or, in OS version 6.10 and beyond, via the top right
corner of the page.

You can also purchase a [license activation code directly from our
website](https://unraid.net/pricing) and redeem the code for a license
later when your server is up and running. The activation code will be on
your receipt.

## How to Redeem a License Activation Code

First, buy an activation code via [our website.](https://unraid.net/pricing) Your unique activation code will be listed on your purchase receipt.

Next, follow our [Getting Started guide](/unraid-os/manual/getting-started.md) to set up an Unraid server.

Once your server is up and running:

Login to your Unraid server's webgui. (`http://tower` or `http://tower.local` from Mac by default)
For Unraid 6.10 and newer, Sign in to your Unraid.net account (or create one) from the top-right of the webgui and select "Redeem Activation Code" and enter the activation code to activate your license. For Unraid 6.9 and older, navigate to the Tools -> Registration page in the webGui and click "Purchase Key."
Select the corresponding license you purchased via activation code and enter the activation code in the "Your Activation Code" box to complete the activation process. Your registration key will be emailed to you with instructions for installation! Note: Activation Codes are one-time use for generating your Unraid license keyfile.
If you have any issues or questions with the above, there is also a walk through video: [Activation Code Instructional Video](https://www.loom.com/share/3ceb40440240474aaa80a0b7e3e69cb2)

## How do I Upgrade my Unraid License?

If you want or need to upgrade your license to a higher tier, upgrades
are done from within the OS WebGUI via the Tools → Registration page or
via the top right corner of the page.

![](/docs/legacy/Upgrade-UPC.png "Upgrade-UPC.png")

**Unraid Basic** allows for up to *6 attached storage
devices<sup>1</sup>.*

**Unraid Plus** allows for up to *12 attached storage
devices<sup>1</sup>.*

**Unraid Pro** allows for *unlimited<sup>2</sup> attached storage
devices<sup>1</sup>.*

License upgrades are priced as follows:

Basic license → Plus license: *$39 USD*

Basic license → Pro license: *$79 USD*

Plus license → Pro license: *$49 USD*

<sup>1</sup> <b>Attached storage devices</b> refer to the total number of
storage devices you are allowed to have attached to the server before
starting the array, not counting the USB Flash boot device. There are
*no other limitations* in the software based on license type.

## What does "Unlimited" mean for trial and Pro licenses?

Unraid OS Pro supports up to 30 storage devices in the parity-protected
array (28 data and 2 parity) and up to 35 named pools, of up to 30
storage devices in the [cache
pool(s)](/unraid-os/release-notes/6.9.0.md#multiple-pools).
Additional storage devices can still be utilized directly with other
Unraid features such as [Virtual
Machines](/unraid-os/manual/vm-management.md) or the unassigned devices
plugin.

## What Happens if my USB Fails? Do I Have to Repurchase a License?

If your USB Flash boot device fails, you can [transfer
your](/unraid-os/manual/changing-the-flash-device.md) license to a new USB
Flash device initially at any time, and subsequently using the automated
transfer system once per 12 months.

If you need to make another license transfer before 12 months has
elapsed, [you need to contact us](https://unraid.net/contact) and we
will transfer your license manually. Please provide the old and new USB
GUIDs [with your support ticket.](https://unraid.net/contact)

**IMPORTANT:** Please ensure you routinely back up your USB device!
We recommend using [Unraid Connect](/connect/about.md) for this.

## How do I Manually Install my License keyfile to my USB Flash?

First, ensure you have a recent backup of your USB drive via
Main-\>Flash-\> Flash Backup.

To install the license key manually, first save the key file (.key file)
to a different PC/Mac.

Next:

1. Shutdown the server, remove the USB flash and install the USB into
    the other computer.
2. Open the USB folder and drag and drop the .key file into the /config
    folder. Please ensure this is the only .key file present (delete any
    others).
3. Then, safely eject/remove the flash and reinstall in your server and
    reboot.

Alternately, if your server is running and your flash share is visible
on the network, navigate to the flash share under Network, and drag the
registration key file into the config directory. Next, using the webGUI,
**Stop** the array, and then **Start** the array again.

## I'm getting an error registering my flash device: '####-####-####-#############' is already registered to another user. What do I do?

The flash device you are trying to use with Unraid OS doesn't have a
unique ID, and therefore is ineligible for registration. Please obtain a
different USB flash device for use with Unraid OS. A few brands that
work best include Lexar, Samsung, Kingston, or PNY.

## How do I determine what registration type (Basic, Plus, or Pro) I have?

Simple! Navigate to the Tools \> Registration page and you can review
your current key type and registration information.

## Unraid OS Trial

### Can I Transfer my Trial Key to a New Flash Device?

No. Trial registrations are only valid on the USB flash device that
initiated the trial. If you wish to purchase a license, you can transfer
your Trial configuration to a new flash device and then purchase a
registration key, but you cannot continue using a Trial configuration on
a new USB flash device without purchasing.

### How Do I Extend My Unraid Trial?

Did you know that you can extend the [30 day free
trial](https://unraid.net/download) of Unraid? Hardware can be
ill-suited. Things break. Life happens. We get it. To try out Unraid a
little longer, once your original trial shows "expired" in the upper
left of the header, *Stop the array*.

Next, go to the Tools-\> *Registration* page, and now a button shows up
where you can click for a 15 day extension. Please remember that you are
only allotted up to two extensions, each for two weeks. No further
extensions can be issued thereafter.

*Note: You cannot change the USB flash device for Unraid Trials if you
wish to continue where you left off.*

## I'm a Reseller/OEM that needs to Purchase a License on Behalf of my Customer: How do I do that?

You will need to [purchase a license either via the Unraid
webGui](#how-do-i-purchase-unraid)
or you can [purchase an activation code via the
website](https://unraid.net/pricing).

At checkout, you will be presented with three options:

- Individual
- Business/Organization
- OEM

Select 'OEM', enter your purchase details, and then enter your customer
name and email address in the Customer section. The purchase will be
made by you but the license key will be in your customer’s name and sent
to them. There will also be an invoice download link upon completion of
the checkout.

For bulk OEM/reseller pricing of 10 licenses or more, [please contact
us](https://unraid.net/contact)!
