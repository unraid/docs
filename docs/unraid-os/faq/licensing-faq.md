# Licensing

## Do I own my software license?

When you purchase an Unraid OS license, you own a perpetual copy of the software forever. 

## How do I Purchase Unraid?

You have two options: 

1. If you've already started a trial, you can purchase licenses and upgrades from the top right drop-down within Unraid.
2. You can purchase an Unraid license "activation code" from the Buy Now buttons above and [activate](https://docs.unraid.net/unraid-os/faq/licensing-faq/#how-to-redeem-a-license-activation-code) your license later. Activation codes do not expire.
The pricing listed is per server. All sales are final. Please utilize our free 30-day trial before purchasing!

## How to Redeem a License Activation Code

First, buy an activation code via [our website.](https://unraid.net/pricing) Your unique activation code will be listed on your purchase receipt.

Next, follow our [Getting Started guide](../getting-started/getting-started.md) to set up an Unraid server.

Once your server is up and running:

Login to your Unraid server's WebGUI. (`http://tower` or `http://tower.local` from Mac by default)
For Unraid 6.10 and newer, Sign in to your Unraid.net account (or create one) from the top-right of the WebGUI and select "Redeem Activation Code" and enter the activation code to activate your license. For Unraid 6.9 and older, navigate to the Tools -> Registration page in the WebGUI and click "Purchase Key."
Select the corresponding license you purchased via activation code and enter the activation code in the "Your Activation Code" box to complete the activation process. Your registration key will be emailed to you with instructions for installation! Note: Activation Codes are one-time use for generating your Unraid license keyfile.
If you have any issues or questions with the above, there is also a walk through video: [Activation Code Instructional Video](https://www.loom.com/share/3ceb40440240474aaa80a0b7e3e69cb2)

## How do I Upgrade my Unraid License?

If you want or need to upgrade your license to a higher tier, upgrades
are done from within the OS WebGUI via the Tools → Registration page or
via the top right corner of the page.

![](../assets/Upgrade-UPC.png)

**Unraid Starter** allows for up to _6 attached storage devices<sup>1</sup>._

**Unraid Unleashed** allows for _unlimited<sup>2</sup> attached storage
devices<sup>1</sup>._

**Unraid Lifetime** allows for _unlimited<sup>2</sup> attached storage
devices<sup>1</sup>._

Annual Extension Fee for Starter and Unleashed: $36

License upgrades are priced as follows:

* Starter → Unleashed: _$69 USD_
* Starter → Lifetime: _$209 USD_
* Unleashed → Lifetime: _$149 USD_
* Basic → Unleashed: _$49 USD_
* Plus → Unleashed: _$19 USD_
* Basic → Plus: _$59 USD_
* Basic → Pro: _$99 USD_
* Plus → Pro: _$69 USD_

<sup>1</sup> <b>Attached storage devices</b> refer to the total number of
storage devices you are allowed to have attached to the server before
starting the array, not counting the USB Flash boot device. There are
_no other limitations_ in the software based on license type.
Prices are subject to change _at any time._

<sup>2</sup> <b>Unlimited devices</b> see [below](#what-does-unlimited-mean-for-attached-storage-devices)

## Is Unraid OS a subscription?

No- we don't like forced subscriptions either. Once you purchase a license, you own it. 
Your purchase of Starter or Unleashed includes one free year of updates, and a Lifetime license includes a lifetime of updates. 
After one year, an optional $36 license extension fee will get you an additional year of OS updates. 
Don’t want to pay? No problem. You still own your license and will simply stay on that minor version of Unraid unless or until you pay your extension fee again.

## What happens if I don't extend my Starter or Unleashed license?

When you purchase a Starter or Unleashed License, you automatically get a free year of Unraid OS updates. 
If you choose not to extend, you still own a copy of the software at the current version, but your update eligibility changes. See next FAQ for details.

## What happens with security updates if I don't extend my Starter or Unleashed license?

If your license extension lapses (as in, you do not pay your annual fee), you can download patch releases within the same minor OS version that was available to you at the time of the lapse. 

Our naming convention for releases is: `<major>.<minor>.<patch>`. 

For example: Your system is eligible for Unraid 7.1.0 when your extension lapses. You qualify for the remaining patch releases of the Unraid 7.1.x series. 
Once Unraid 7.2.0 is released, the 7.1.x patch releases will only include security patches. Once Unraid 7.3 is released, version 7.1.0 will be EOL, and there will be no more 7.1.x updates.

## What happens if I choose to extend my Starter or Unleashed license at a later date?

No problem—just pay the extension fee and jump back in (subject to the current extension pricing).

## What does "Unlimited" mean for attached storage devices?

Unraid Pro, Unleashed and Lifetime licenses support up to 30 storage devices in the parity-protected
array (28 data and 2 parity) and up to 35 named pools, of up to 30
storage devices in the [cache pool(s)](/unraid-os/release-notes/6.9.0.md#multiple-pools).
Additional storage devices can still be utilized directly with other
Unraid features such as [Virtual Machines](../manual/vm/vm-management.md) or the unassigned devices
plugin.

## What Happens if My USB Fails? Do I Have to Repurchase a License?

If your USB Flash boot device fails, you can [transfer
your license](/unraid-os/manual/changing-the-flash-device/) to a new USB
Flash device initially at any time, and subsequently using the automated
transfer system once per 12 months.

If you need to make another license transfer before 12 months has
elapsed, [you need to contact us](https://unraid.net/contact) and we
will transfer your license manually. Please provide the old and new USB
GUIDs [with your support ticket.](https://unraid.net/contact)

**IMPORTANT:** Please ensure you routinely back up your USB device!
We recommend using [Unraid Connect](../../connect/about.md) for this.

## How do I Manually Install my License keyfile to my USB Flash?

First, ensure you have a recent backup of your USB drive via
Main → Flash → Flash Backup.

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
registration key file into the config directory. Next, using the WebGUI,
**Stop** the array, and then **Start** the array again.

## I'm getting an error registering my flash device: '####-####-####-#############' is already registered to another user. What do I do?

The flash device you are trying to use with Unraid OS doesn't have a
unique ID, and therefore is ineligible for registration. Please obtain a
different USB flash device for use with Unraid OS. A few brands that
work best include Lexar, Samsung, Kingston, or PNY.

## How do I determine what registration type I have?

Simple! Navigate to the Tools → Registration page and you can review
your current key type and registration information.

## Unraid OS Trial

### How do Unraid Trials work?

Trial licenses last 30 days and provide the full functionality of an Unraid Pro license with no attached storage device limit.

To begin, you must have a quality USB drive ready and download our USB creator tool. Then, follow our Getting Started Guide to be up and running in minutes. Trial licenses require an internet connection upon server boot to validate.

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
left of the header, _Stop the array_.

Next, go to the Tools → _Registration_ page, and now a button shows up
where you can click for a 15 day extension. Please remember that you are
only allotted up to two extensions, each for two weeks. No further
extensions can be issued thereafter.

_Note: You cannot change the USB flash device for Unraid Trials if you
wish to continue where you left off._

## I'm a Reseller/OEM that needs to Purchase a License on Behalf of my Customer: How do I do that?

You will need to [purchase a license either via the Unraid
WebGUI](#how-do-i-purchase-unraid)
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
