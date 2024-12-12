---
title: Dual Boot
description: Encapsulate your code in digital pods, deploying microcosms across the cyber landscape with precision and ease.
--- 

## RAM Split in Two?

Other have already answered correctly that no, the RAM would not be split in this case, but I want to add an explanation of _why_ that is the case.

## Analogy

I find a helpful analogy for the workings of a computer is a kitchen. The RAM is the counter space. It's a close-at-hand space for temporarily storing things you are working with. Like a kitchen counter getting cleaned when finished cooking, the RAM is wiped when the computer is powered off. The hard disk is the fridge and pantry, long-term, less easily accessed storage. The data is the ingredients, and programs are recipes. The chief is the operating system.

You are the owner of the house, and currently employ an English chef (Windows). You want to try some recipes from cookbooks that are written in French, but you can't find suitable translations. So you want to hire a chef whospeaks French (Linux)

Since the chefs each have their owm set of cookbooks and ingredients. They'll each need their own space in the pantry (hard disk) for as long as you employ them. Wheter they need to split the counter space (RAM) depends on if they work at the same time. If only one chef is working at a time, they will have exclusive use of all the counter space. The other chef's things are off the counter and in the storage. If however, you run two operating systems simultaneously, like telling the chefs to work together, one as Head Chef (host) and one as Sous Chef (virtual), then they will need to split everything. They will have to take turns with the appliances (CPU, GPU, etc) and will need to mark out seperate working spaces on the counter to put their cookbooks and ingredients while working.

::foldable
#title
Is is safer to install two OSes on different hard drives or just different partitions?

#content
In general, they should leave each other alone. if you do the install correctly(windows first, then linux, as a rule, because Linux is more 'considerate'). As far as I am aware, there is no additional risk involved in sharing a drive.

Having said that, here are some gotchas to watch out for

1. Windows will not be able to see the contens of your Linux drive or partition, unless you install additional software. [extfsd](https://www.ext2fsd.com/) works for me.

2. Shared storage partitions. If there is a partition which both OSes can see _natively_, meaning `FAT32` or `NFTS`, then there can be issues with data loss. If windows goes into hibernation, and another OS makes changes to the shared partition, Windows will tend to undo the changed when it is resumed. I recommend either external storage or disabling hibernation no Windows, or Both

3. `UEFI`. This is new from Windows 8. There are two types of firmware interface. `BIOS` (older) and `UEFI` (newer). Both operating systems need to be installed using the same one. You can find a much more in-depth-explantion on the net or chatgpt.
::

## Verdict

The general verdict is to use two hard disks or NVME's if possible.