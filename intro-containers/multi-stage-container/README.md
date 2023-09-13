# Multi-stage builds

Is used to optimize Dockerfiles, is a good way to read and maintain.

# How to use it 

To start with multi-stage builds, you need to specify the steps with multiples "FROM" statements in your Dockerfile.

For each "FROM" instruction you define a new stage of the build.

