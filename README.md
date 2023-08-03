# docker-essentials

# What's containers?

Container is just a few features of the Linux Kernel that works together to achieve "isolation".
Which means that you can isolate part of your computer resources to run a specific job, for example, a database like Postgres.
Besides that, you don't have to install anything locally, you can use containers to package all the dependecies that you need to run this service.

## The Secret of chroot or better, "change root".

The "change root" commands works like a container, where you can create a new directory and all the linux commands that you need to run it. For example, ls and cat command.


If you run: 

```shell

chroot new-directory/ bash

```

It will run a new process of Linux inside this directory, where will isolate the new process. So, you can not see the Linux directories like /mnt /home because they are not created.

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

Unfortunately, chroot is dangerous because you share the same process with other users. Therefore, your process can be killed by other user.

# What's Namespaces and how they protect you?

Namespace provide isolation for running processes, limiting their access to system resources.

For example, you are running node.js process inside the server, and this server there are other users working with other process. 
How do we garantee that other users don't kill your node.js process? Exactly, using namespace.

With namespace you can protect your activity and run applications without being attacked by other user.

Keep in your mind, using namespaces to restrict capabilities of containers to interfering with other containers.

# Limiting process with "cgroups" or control groups

Following the same example above, there are so many users using the server and we need to limit the process to garantee that won't shut down by usage.

So, the cgroups works directly with the hardware, where you can limit the CPU, Memory, Disk and, MORE IMPORTANTLY, that a single container cannot bring the system dwon by exhausting one of those resources. 

Obviously, Docker was developed to control everything by itself. If you need to configure namespace and cgroups with your own hands it can took a while, so docker control it to reduce the time and focus on what really matters.

# Reference 

[repository](https://github.com/btholt/projects-for-complete-intro-to-containers.git)

