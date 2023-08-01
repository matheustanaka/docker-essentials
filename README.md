# docker-essentials

# What's containers?

Container is just a few features of the Linux Kernel that works together to achieve "isolation".
Which means that you can isolate part of your computer resources to run a specific job, for example, a database like Postgres.
Besides that, you don't have to install anything locally, you can use containers to package all the dependecies that you need to run this service.

# The Secret of chroot or better, "change root".

The "change root" commands works like a container, where you can create a new directory and all the linux commands that you need to run it. For example, ls and cat command.


If you run: 

```shell

chroot new-directory/ bash

```

It will run a new process of Linux inside this directory, where will isolate the new process. So you can not see the Linux directories like /mnt /home because they are not created.

If you need to use cat or ls copy this step below:

```shell
# List dependencies
ldd /bin/cat

# it will show all the dependencies, they are separated by lib and lib64. These files should be created on new-directory before it.
# copy all the dependencies with lib and lib64 folders and paste it on their respective directories.

cp /lib/linux.so1 new-directory/lib

# Don't forget to copy the binary on new directory and paste it.
cp /bin/cat new-directory/bin

```

Following the example, you will see the concept of isolation. You will be able to run cat and ls. If you need more commands, repeat the process with others.


# Reference 

[repository](https://github.com/btholt/projects-for-complete-intro-to-containers.git)

